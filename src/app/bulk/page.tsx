'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuotaInfo } from '@/components/ui/QuotaInfo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { BorderBeam } from '@/components/magicui/border-beam';
import { MagicCard } from '@/components/magicui/magic-card';
import { TextEffect } from '@/components/magicui/text-effect';
import NumberTicker from '@/components/magicui/number-ticker';
import { BatchQRItem } from '@/types/qr';
import { BatchProcessor, BatchProcessOptions } from '@/lib/batch/processor';
import { UsageTracker } from '@/lib/utils/usage';
import { Upload, FileText, Zap, Package, CheckCircle2, AlertCircle, Download, Layers } from 'lucide-react';

const bulkStats = [
  { label: 'Batch Jobs', value: 1247, icon: Package },
  { label: 'QR Codes', value: 28439, icon: Layers },
  { label: 'Avg Speed', value: 47, icon: Zap, suffix: '/min' },
  { label: 'Success Rate', value: 99.2, icon: CheckCircle2, suffix: '%' },
];

export default function BulkPageEnhanced() {
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

      // Process CSV file - no limits for free users!
      const fileContent = await file.text();
      const rows = fileContent.split('\n').filter(row => row.trim()).length - 1; // Subtract header

      await processor.current.processCSV(file, options);
      
      // Update usage stats (for analytics only)
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <TextEffect
          preset="fade-in-blur"
          as="h1"
          className="text-5xl lg:text-6xl font-bold mb-6"
        >
          Bulk QR
        </TextEffect>
        <AnimatedGradientText className="text-5xl lg:text-6xl font-bold mb-6">
          Generation
        </AnimatedGradientText>
        <TextEffect
          preset="fade-in-blur"
          as="p"
          className="text-xl text-black dark:text-white max-w-3xl mx-auto mb-8"
        >
          Process hundreds of QR codes simultaneously with our enterprise-grade batch generator. 
          Upload CSV, customize settings, and download your complete collection.
        </TextEffect>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {bulkStats.map((stat, index) => (
          <MagicCard key={stat.label} className="text-center p-6">
            <div className="flex justify-center mb-3">
              <stat.icon className="w-8 h-8 text-brand-500" />
            </div>
            <div className="text-2xl font-bold text-black dark:text-white mb-1">
              <NumberTicker 
                value={stat.value} 
                delay={index * 0.2}
                decimalPlaces={stat.suffix === '%' ? 1 : 0}
              />
              {stat.suffix}
            </div>
            <div className="text-sm text-black dark:text-white">
              {stat.label}
            </div>
          </MagicCard>
        ))}
      </motion.div>

      <QuotaInfo />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagicCard className="h-fit">
            <BorderBeam size={250} duration={15} />
            <CardHeader>
              <CardTitle className="text-2xl mb-4 flex items-center gap-2">
                <Upload className="w-6 h-6 text-brand-500" />
                Batch Upload & Settings
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Upload Zone */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="relative border-2 border-dashed border-brand-300 dark:border-brand-700 rounded-xl p-8 text-center mb-6 bg-gradient-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20 hover:from-brand-100 hover:to-brand-200 dark:hover:from-brand-800/30 dark:hover:to-brand-700/30 transition-all duration-300 cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <motion.div
                  animate={{ 
                    scale: file ? [1, 1.1, 1] : [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  {file ? '✅' : '📄'}
                </motion.div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {file ? 'File Selected' : 'Upload CSV File'}
                </h3>
                <p className="text-black dark:text-white mb-4">Drop your CSV here or click to browse</p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <ShimmerButton
                  background="rgba(16, 217, 163, 1)"
                  className="text-white px-6 py-2"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Choose File
                </ShimmerButton>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
                >
                  <p className="text-xs text-amber-800 dark:text-amber-300">
                    Format: type,data,label<br />
                    Max 20 rows in free version
                  </p>
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {file && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-300">
                          File Ready for Processing
                        </p>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {file.name} • {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Settings */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <h3 className="text-lg font-semibold text-brand-800 dark:text-brand-300">Output Settings</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                      Format
                    </label>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value as 'png' | 'svg')}
                      className="w-full px-3 py-2 border border-brand-300 dark:border-brand-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white dark:bg-gray-800 text-brand-900 dark:text-brand-100"
                    >
                      <option value="png">PNG (Raster)</option>
                      <option value="svg">SVG (Vector)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-brand-700 dark:text-brand-300 mb-2">
                      Size
                    </label>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full px-3 py-2 border border-brand-300 dark:border-brand-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white dark:bg-gray-800 text-brand-900 dark:text-brand-100"
                    >
                      <option value="200">200x200 (Small)</option>
                      <option value="400">400x400 (Medium)</option>
                      <option value="800">800x800 (Large)</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <motion.label 
                    className="flex items-center cursor-pointer group"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="checkbox"
                      checked={includeLabels}
                      onChange={(e) => setIncludeLabels(e.target.checked)}
                      className="mr-3 text-brand-600 rounded focus:ring-brand-500"
                    />
                    <span className="text-sm text-brand-700 dark:text-brand-300 group-hover:text-brand-800 dark:group-hover:text-brand-200 transition-colors">Include labels in filenames</span>
                  </motion.label>
                  
                  <motion.label 
                    className="flex items-center cursor-pointer group"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="checkbox"
                      checked={errorCorrection}
                      onChange={(e) => setErrorCorrection(e.target.checked)}
                      className="mr-3 text-brand-600 rounded focus:ring-brand-500"
                    />
                    <span className="text-sm text-brand-700 dark:text-brand-300 group-hover:text-brand-800 dark:group-hover:text-brand-200 transition-colors">High error correction</span>
                  </motion.label>
                </div>
              </motion.div>

              {/* Error display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="space-y-3">
                <ShimmerButton
                  onClick={handleProcess}
                  disabled={!file || processing}
                  background="rgba(16, 217, 163, 1)"
                  className="w-full text-white py-3 text-lg"
                >
                  {processing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Batch...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="w-5 h-5" />
                      Start Bulk Generation
                    </div>
                  )}
                </ShimmerButton>
                
                <button
                  onClick={handleDownloadSample}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Sample CSV
                </button>
              </div>
            </CardContent>
          </MagicCard>
        </motion.div>

        {/* Progress & Preview Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MagicCard className="h-fit">
            <CardHeader>
              <CardTitle className="text-2xl mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-brand-500" />
                Processing Status
              </CardTitle>
            </CardHeader>

            <CardContent>
              <AnimatePresence>
                {processing ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <h4 className="text-lg font-medium text-black dark:text-white mb-2">
                        Processing Batch
                      </h4>
                      <p className="text-sm text-black dark:text-white">
                        {currentItem} of {totalItems} items completed
                      </p>
                    </div>
                    
                    {previewItems.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-3 gap-3 mb-6"
                      >
                        {previewItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-center bg-white dark:bg-gray-800"
                          >
                            <div className="w-16 h-16 bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900 dark:to-brand-800 rounded-lg mx-auto mb-2 flex items-center justify-center">
                              <CheckCircle2 className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                            </div>
                            <p className="text-xs text-black dark:text-white truncate">
                              {item.label || item.id}
                            </p>
                          </motion.div>
                        ))}
                        {totalItems > 3 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-center bg-white dark:bg-gray-800"
                          >
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
                              <span className="text-sm font-medium text-black dark:text-white">+{totalItems - 3}</span>
                            </div>
                            <p className="text-xs text-black dark:text-white">More items</p>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-black dark:text-white">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="bg-gradient-to-r from-brand-500 to-brand-600 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      📦
                    </motion.div>
                    <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                      Ready for Bulk Processing
                    </h3>
                    <p className="text-black dark:text-white">
                      Upload your CSV file and start generating QR codes in batch
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </MagicCard>
        </motion.div>
      </div>

      {/* CSV Format Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12"
      >
        <MagicCard className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-lg">
              <FileText className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="text-lg font-semibold text-brand-900 dark:text-brand-100">CSV Format Guide</h3>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-black dark:text-white font-mono leading-relaxed">
{`type,data,label
url,https://example.com,Example Website
text,Hello World,Sample Text  
wifi,{"ssid":"MyNetwork","password":"pass123"},WiFi Network
bitcoin,{"address":"bc1q...","amount":0.001},Payment`}
            </pre>
          </div>
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Supported types: url, text, wifi, bitcoin, ethereum, vcard, email, sms, phone
            </p>
          </div>
        </MagicCard>
      </motion.div>
    </div>
  );
}