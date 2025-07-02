import { QROptions, QRGenerationResult } from '@/types/qr';

interface WorkerTask {
  id: string;
  options: QROptions;
  resolve: (result: QRGenerationResult) => void;
  reject: (error: Error) => void;
}

export class WorkerPool {
  private workers: Worker[] = [];
  private availableWorkers: Worker[] = [];
  private taskQueue: WorkerTask[] = [];
  private taskMap = new Map<string, WorkerTask>();
  private initialized = false;

  constructor(private poolSize: number = 3) {}

  async initialize(): Promise<void> {
    if (this.initialized) return;

    for (let i = 0; i < this.poolSize; i++) {
      const worker = new Worker(
        new URL('./qr.worker.ts', import.meta.url),
        { type: 'module' }
      );

      worker.addEventListener('message', (event) => {
        const { id, payload } = event.data;
        const task = this.taskMap.get(id);
        
        if (task) {
          task.resolve(payload as QRGenerationResult);
          this.taskMap.delete(id);
          this.releaseWorker(worker);
        }
      });

      worker.addEventListener('error', (error) => {
        console.error('Worker error:', error);
        // Find and reject any pending tasks for this worker
        for (const [id, task] of this.taskMap.entries()) {
          task.reject(new Error('Worker error'));
          this.taskMap.delete(id);
        }
        this.releaseWorker(worker);
      });

      this.workers.push(worker);
      this.availableWorkers.push(worker);
    }

    this.initialized = true;
  }

  async generateQR(options: QROptions): Promise<QRGenerationResult> {
    if (!this.initialized) {
      await this.initialize();
    }

    return new Promise((resolve, reject) => {
      const task: WorkerTask = {
        id: `task-${Date.now()}-${Math.random()}`,
        options,
        resolve,
        reject,
      };

      this.taskQueue.push(task);
      this.processTasks();
    });
  }

  async generateBatch(optionsArray: QROptions[]): Promise<QRGenerationResult[]> {
    const promises = optionsArray.map(options => this.generateQR(options));
    return Promise.all(promises);
  }

  private processTasks(): void {
    while (this.taskQueue.length > 0 && this.availableWorkers.length > 0) {
      const task = this.taskQueue.shift();
      const worker = this.availableWorkers.shift();

      if (task && worker) {
        this.taskMap.set(task.id, task);
        
        worker.postMessage({
          id: task.id,
          type: 'generate',
          payload: task.options,
        });
      }
    }
  }

  private releaseWorker(worker: Worker): void {
    if (!this.availableWorkers.includes(worker)) {
      this.availableWorkers.push(worker);
    }
    this.processTasks();
  }

  terminate(): void {
    this.workers.forEach(worker => worker.terminate());
    this.workers = [];
    this.availableWorkers = [];
    this.taskQueue = [];
    this.taskMap.clear();
    this.initialized = false;
  }

  getStats() {
    return {
      totalWorkers: this.workers.length,
      availableWorkers: this.availableWorkers.length,
      queuedTasks: this.taskQueue.length,
      activeTasks: this.taskMap.size,
    };
  }
}

// Singleton instance
let workerPoolInstance: WorkerPool | null = null;

export function getWorkerPool(): WorkerPool {
  if (!workerPoolInstance) {
    workerPoolInstance = new WorkerPool();
  }
  return workerPoolInstance;
}