import Papa from 'papaparse';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { BatchQRItem, QROptions, QRType } from '@/types/qr';
import { QRGenerator } from '@/lib/qr/generator';

export interface BatchProcessOptions {
  format: 'png' | 'svg';
  size: number;
  includeLabels: boolean;
  zipFilename?: string;
  onProgress?: (progress: number, current: number, total: number) => void;
  onItemComplete?: (item: BatchQRItem) => void;
}

export interface CSVRow {
  type: string;
  data: string;
  label?: string;
  [key: string]: any;
}

export class BatchProcessor {
  private static readonly MAX_BATCH_SIZE = 20; // Free tier limit
  private static readonly WORKER_POOL_SIZE = 3;
  
  private qrGenerator: QRGenerator;
  private activeWorkers = 0;
  private queue: BatchQRItem[] = [];
  
  constructor() {
    this.qrGenerator = QRGenerator.getInstance();
  }

  async processCSV(file: File, options: BatchProcessOptions): Promise<void> {
    const rows = await this.parseCSV(file);
    const items = this.createBatchItems(rows);
    
    if (items.length > BatchProcessor.MAX_BATCH_SIZE) {
      throw new Error(`Batch size exceeds limit of ${BatchProcessor.MAX_BATCH_SIZE} items`);
    }
    
    return this.processBatch(items, options);
  }

  private parseCSV(file: File): Promise<CSVRow[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data as CSVRow[]);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  private createBatchItems(rows: CSVRow[]): BatchQRItem[] {
    return rows.map((row, index) => ({
      id: `item-${index}`,
      type: (row.type as QRType) || 'text',
      data: row.data,
      label: row.label,
      status: 'pending',
    }));
  }

  async processBatch(items: BatchQRItem[], options: BatchProcessOptions): Promise<void> {
    this.queue = [...items];
    const results: Map<string, { data: string; label?: string }> = new Map();
    
    // Process items with worker pool
    const processPromises: Promise<void>[] = [];
    
    for (let i = 0; i < Math.min(BatchProcessor.WORKER_POOL_SIZE, items.length); i++) {
      processPromises.push(this.processWorker(results, options));
    }
    
    await Promise.all(processPromises);
    
    // Create ZIP file
    await this.createZipFile(results, options);
  }

  private async processWorker(
    results: Map<string, { data: string; label?: string }>, 
    options: BatchProcessOptions
  ): Promise<void> {
    while (this.queue.length > 0) {
      const item = this.queue.shift();
      if (!item) break;
      
      item.status = 'processing';
      
      try {
        const qrOptions: QROptions = {
          type: item.type,
          data: item.data,
          size: options.size,
        };
        
        const result = options.format === 'svg' 
          ? await this.qrGenerator.generateSVG(qrOptions)
          : await this.qrGenerator.generateQR(qrOptions);
        
        if (result.success && result.data) {
          item.status = 'completed';
          item.result = result;
          results.set(item.id, { data: result.data, label: item.label });
        } else {
          item.status = 'error';
          item.result = result;
        }
      } catch (error) {
        item.status = 'error';
        item.result = {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
      
      // Report progress
      if (options.onItemComplete) {
        options.onItemComplete(item);
      }
      
      if (options.onProgress) {
        const completed = Array.from(results.keys()).length;
        const total = this.queue.length + completed;
        options.onProgress((completed / total) * 100, completed, total);
      }
    }
  }

  private async createZipFile(
    results: Map<string, { data: string; label?: string }>, 
    options: BatchProcessOptions
  ): Promise<void> {
    const zip = new JSZip();
    
    for (const [id, { data, label }] of results) {
      const filename = label ? `${label}.${options.format}` : `${id}.${options.format}`;
      
      if (options.format === 'png') {
        // Convert data URL to blob
        const base64 = data.split(',')[1];
        zip.file(filename, base64, { base64: true });
      } else {
        // SVG is text
        zip.file(filename, data);
      }
    }
    
    // Generate validation report
    const report = this.generateValidationReport(results);
    zip.file('validation_report.csv', report);
    
    // Generate ZIP and trigger download
    const blob = await zip.generateAsync({ type: 'blob' });
    const filename = options.zipFilename || `qr_batch_${Date.now()}.zip`;
    saveAs(blob, filename);
  }

  private generateValidationReport(
    results: Map<string, { data: string; label?: string }>
  ): string {
    const rows = [['ID', 'Label', 'Status', 'Size (bytes)']];
    
    for (const [id, { data, label }] of results) {
      const size = new Blob([data]).size;
      rows.push([id, label || '', 'Success', size.toString()]);
    }
    
    return Papa.unparse(rows);
  }

  static async downloadSampleCSV(): Promise<void> {
    const sampleData = [
      ['type', 'data', 'label'],
      ['url', 'https://example.com', 'Example Website'],
      ['text', 'Hello World', 'Sample Text'],
      ['wifi', '{"ssid":"MyNetwork","password":"pass123","security":"WPA"}', 'WiFi Network'],
      ['bitcoin', '{"address":"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa","amount":0.001}', 'Bitcoin Payment'],
    ];
    
    const csv = Papa.unparse(sampleData);
    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, 'qr_batch_sample.csv');
  }
}