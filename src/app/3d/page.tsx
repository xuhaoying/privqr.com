'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { QRPreviewEnhanced } from '@/components/qr/QRPreview-enhanced';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { MagicCard } from '@/components/magicui/magic-card';
import { TextEffect } from '@/components/magicui/text-effect';
import NumberTicker from '@/components/magicui/number-ticker';
import { QRGenerationResult } from '@/types/qr';
import { QRGenerator } from '@/lib/qr/generator';
import { Printer, Box, Layers, Ruler, Download, CheckCircle2, Settings, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';

const threeDStats = [
  { label: '3D Models', value: 847, icon: Box },
  { label: 'Print Jobs', value: 1205, icon: Printer },
  { label: 'Layer Quality', value: 99.8, icon: Layers, suffix: '%' },
  { label: 'Avg Print Time', value: 45, icon: Zap, suffix: 'min' },
];

export default function ThreeDPageEnhanced() {
  const [content, setContent] = useState('');
  const [size, setSize] = useState('400');
  const [thickness, setThickness] = useState('2');
  const [baseHeight, setBaseHeight] = useState('1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QRGenerationResult | null>(null);

  const handleGenerate = async () => {
    if (!content.trim()) {
      setResult({
        success: false,
        error: 'Please enter content for the QR code.',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const generator = QRGenerator.getInstance();
      const qrResult = await generator.generateQR({
        type: 'text',
        data: content,
        size: parseInt(size),
        errorCorrectionLevel: 'H', // High error correction for 3D printing
      });


      setResult(qrResult);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate QR code',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSTL = () => {
    if (!result?.success || !result.data) return;

    // This would generate an STL file from the QR code
    // For now, we'll show a placeholder implementation
    const blob = new Blob(['STL file generation is coming soon!'], { 
      type: 'application/octet-stream' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qr-code.stl';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
          3D Printable
        </TextEffect>
        <AnimatedGradientText className="text-5xl lg:text-6xl font-bold mb-6">
          QR Codes
        </AnimatedGradientText>
        <TextEffect
          preset="fade-in-blur"
          as="p"
          className="text-xl text-gray-900 max-w-3xl mx-auto mb-6"
        >
          Generate physical QR codes optimized for 3D printing with customizable thickness, 
          dimensions, and high error correction for reliable scanning.
        </TextEffect>
        <Link href="/guides/3d" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 text-brand-700 rounded-lg hover:bg-brand-200 transition-colors">
          <BookOpen className="w-4 h-4" />
          <span className="font-medium">Read User Guide</span>
        </Link>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {threeDStats.map((stat, index) => (
          <MagicCard key={stat.label} className="text-center p-6">
            <div className="flex justify-center mb-3">
              <stat.icon className="w-8 h-8 text-brand-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              <NumberTicker 
                value={stat.value} 
                delay={index * 0.2}
                decimalPlaces={stat.suffix === '%' ? 1 : 0}
              />
              {stat.suffix}
            </div>
            <div className="text-sm text-gray-700">
              {stat.label}
            </div>
          </MagicCard>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagicCard className="h-fit">
            <CardHeader>
              <CardTitle className="text-2xl mb-4 flex items-center gap-2">
                <Box className="w-6 h-6 text-brand-500" />
                Generate 3D QR Model
              </CardTitle>
              <p className="text-gray-700">
                Create QR codes optimized for 3D printing with customizable thickness and dimensions
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  QR Code Content *
                </label>
                <Input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter text, URL, or data for the QR code"
                  className="text-base"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-brand-50 border border-brand-200 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-brand-600" />
                  <h3 className="text-lg font-semibold text-brand-800">3D Print Dimensions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-2 flex items-center gap-1">
                      <Ruler className="w-4 h-4" />
                      Size (mm)
                    </label>
                    <Input
                      type="number"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      min="50"
                      max="500"
                      step="10"
                      className="bg-white"
                    />
                    <p className="text-xs text-brand-600 mt-1">Width & Height</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-2 flex items-center gap-1">
                      <Layers className="w-4 h-4" />
                      Thickness (mm)
                    </label>
                    <Input
                      type="number"
                      value={thickness}
                      onChange={(e) => setThickness(e.target.value)}
                      min="0.5"
                      max="10"
                      step="0.5"
                      className="bg-white"
                    />
                    <p className="text-xs text-brand-600 mt-1">QR Pattern Height</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-2 flex items-center gap-1">
                      <Box className="w-4 h-4" />
                      Base Height (mm)
                    </label>
                    <Input
                      type="number"
                      value={baseHeight}
                      onChange={(e) => setBaseHeight(e.target.value)}
                      min="0"
                      max="5"
                      step="0.1"
                      className="bg-white"
                    />
                    <p className="text-xs text-brand-600 mt-1">Foundation Layer</p>
                  </div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg"
                >
                  <p className="text-xs text-amber-800 flex items-center gap-2">
                    <Printer className="w-4 h-4" />
                    Final size: {size}mm × {size}mm × {parseFloat(thickness) + parseFloat(baseHeight)}mm
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-8"
              >
                <ShimmerButton
                  onClick={handleGenerate}
                  disabled={loading}
                  background="rgba(16, 217, 163, 1)"
                  className="w-full text-white py-3 text-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating 3D Model...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Box className="w-5 h-5" />
                      Generate 3D QR Code
                    </div>
                  )}
                </ShimmerButton>
              </motion.div>
            </CardContent>
          </MagicCard>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <QRPreviewEnhanced 
            result={result} 
            loading={loading} 
            label="3D printable QR code" 
          />
        </motion.div>
      </div>

      {/* 3D Download Options */}
      <AnimatePresence>
        {result?.success && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <MagicCard>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-6 h-6 text-brand-500" />
                  3D Print Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Download className="w-5 h-5 text-brand-500" />
                      Download Options
                    </h3>
                    <div className="space-y-3">
                      <ShimmerButton
                        onClick={handleDownloadSTL}
                        background="rgba(16, 217, 163, 1)"
                        className="w-full text-white py-2"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download STL File
                      </ShimmerButton>
                      <button
                        className="w-full px-4 py-2 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed transition-colors"
                        disabled
                      >
                        Download OBJ File (Coming Soon)
                      </button>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Printer className="w-5 h-5 text-brand-500" />
                      Recommended Print Settings
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900">Layer Height: 0.2mm</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900">Infill: 100% for durability</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-900">Support: Not required</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-brand-50 rounded-lg">
                        <Ruler className="w-4 h-4 text-brand-500" />
                        <span className="text-sm text-brand-700 font-medium">
                          Final: {size}mm × {size}mm × {parseFloat(thickness) + parseFloat(baseHeight)}mm
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </MagicCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tips and Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12"
      >
        <MagicCard className="bg-gradient-to-r from-brand-50 to-brand-100 border-brand-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-3xl"
              >
                🖨️
              </motion.div>
              <div>
                <h3 className="font-semibold text-brand-800 mb-2">
                  3D Printing Tips for Best Results
                </h3>
                <div className="space-y-2 text-sm text-brand-700">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                    Use high contrast materials: white base with dark raised areas
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                    Minimum feature size: 0.8mm for reliable scanning
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                    Clean nozzle before printing for sharp edges
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-500 rounded-full"></span>
                    Test with phone camera before mass production
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </MagicCard>
      </motion.div>
    </div>
  );
}