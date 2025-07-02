'use client';

import { useState, useRef } from 'react';
import { QuotaInfo } from '@/components/ui/QuotaInfo';
import { BatchQRItem } from '@/types/qr';
import { BatchProcessor, BatchProcessOptions } from '@/lib/batch/processor';
import { UsageTracker } from '@/lib/utils/usage';

export default function BulkPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [completedItems, setCompletedItems] = useState<BatchQRItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const processor = useRef(new BatchProcessor());
  
  // Settings
  const [format, setFormat] = useState<'png' | 'svg'>('png');
  const [size, setSize] = useState('400');
  const [includeLabels, setIncludeLabels] = useState(true);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [errorCorrection, setErrorCorrection] = useState(true);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a CSV file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'text/csv') {
      setFile(droppedFile);
      setError(null);
    } else {
      setError('Please drop a CSV file');
    }
  };

  const handleProcess = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    const tracker = UsageTracker.getInstance();
    
    setProcessing(true);
    setProgress(0);
    setCompletedItems([]);
    setError(null);

    try {
      const options: BatchProcessOptions = {
        format,
        size: parseInt(size),
        includeLabels,
        onProgress: (prog, current, total) => {
          setProgress(prog);
          setCurrentItem(current);
          setTotalItems(total);
        },
        onItemComplete: (item) => {
          setCompletedItems(prev => [...prev, item]);
        },
      };

      // Check quota before processing
      const fileContent = await file.text();
      const rows = fileContent.split('\n').filter(row => row.trim()).length - 1; // Subtract header
      
      if (!tracker.canBatch(rows)) {
        throw new Error(`Batch size exceeds daily limit. You can process ${tracker.getRemainingDaily()} more items today.`);
      }

      await processor.current.processCSV(file, options);
      
      // Update usage stats
      tracker.incrementBatch(rows);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownloadSample = async () => {
    await BatchProcessor.downloadSampleCSV();
  };

  const previewItems = completedItems.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Bulk Generation</h1>
      
      <QuotaInfo />

      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="p-6">
          {/* Upload Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-6 bg-gray-50 hover:bg-blue-50 transition-colors"
          >
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload CSV File</h3>
            <p className="text-gray-600 mb-4">Drop your CSV here or click to browse</p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Choose File
            </button>
            
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <p className="text-xs text-amber-800">
                Format: type,data,label<br />
                Max 20 rows in free version
              </p>
            </div>
          </div>

          {file && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">
                ✅ File selected: <strong>{file.name}</strong>
              </p>
            </div>
          )}

          {/* Settings */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Output Settings</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as 'png' | 'svg')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="png">PNG</option>
                  <option value="svg">SVG</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="200">200x200</option>
                  <option value="400">400x400</option>
                  <option value="800">800x800</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeLabels}
                  onChange={(e) => setIncludeLabels(e.target.checked)}
                  className="mr-2 text-blue-600"
                />
                <span className="text-sm text-gray-700">Include labels in filenames</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.checked)}
                  className="mr-2 text-blue-600"
                />
                <span className="text-sm text-gray-700">High error correction</span>
              </label>
            </div>
          </div>

          {/* Progress */}
          {processing && (
            <div className="bg-white border rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Processing... ({currentItem} of {totalItems} items)
              </h4>
              
              {previewItems.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {previewItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex-1 border rounded p-3 text-center"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded mx-auto mb-2" />
                      <p className="text-xs text-gray-600 truncate">
                        {item.label || item.id}
                      </p>
                    </div>
                  ))}
                  {totalItems > 3 && (
                    <div className="flex-1 border rounded p-3 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded mx-auto mb-2 flex items-center justify-center">
                        <span className="text-gray-400">+{totalItems - 3}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <p className="text-xs text-gray-600 mt-2 text-center">
                {Math.round(progress)}% complete
              </p>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">❌ {error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={handleProcess}
              disabled={!file || processing}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : 'Start Generation'}
            </button>
            
            <button
              onClick={handleDownloadSample}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Download Sample CSV
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">CSV Format Guide</h3>
        <pre className="text-xs text-blue-800 overflow-x-auto">
{`type,data,label
url,https://example.com,Example Website
text,Hello World,Sample Text
wifi,{"ssid":"MyNetwork","password":"pass123"},WiFi Network
bitcoin,{"address":"bc1q...","amount":0.001},Payment`}
        </pre>
      </div>
    </div>
  );
}