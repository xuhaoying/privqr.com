'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { QRPreview } from '@/components/qr/QRPreview';
import { QRGenerationResult } from '@/types/qr';
import { QRGenerator } from '@/lib/qr/generator';
import { UsageTracker } from '@/lib/utils/usage';

export default function ThreeDPage() {
  const [content, setContent] = useState('');
  const [size, setSize] = useState('400');
  const [thickness, setThickness] = useState('2');
  const [baseHeight, setBaseHeight] = useState('1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QRGenerationResult | null>(null);

  const handleGenerate = async () => {
    const tracker = UsageTracker.getInstance();
    if (!tracker.canGenerate()) {
      setResult({
        success: false,
        error: 'Daily limit reached. Please upgrade or try again tomorrow.',
      });
      return;
    }

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

      if (qrResult.success) {
        tracker.incrementDaily();
      }

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent mb-8">
        3D Printable QR Codes
      </h1>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Generate 3D QR Code</CardTitle>
          <p className="text-gray-600 dark:text-gray-300">
            Create QR codes optimized for 3D printing with customizable thickness and dimensions
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              QR Code Content *
            </label>
            <Input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter text, URL, or data for the QR code"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Size (mm)
              </label>
              <Input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                min="50"
                max="500"
                step="10"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thickness (mm)
              </label>
              <Input
                type="number"
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
                min="0.5"
                max="10"
                step="0.5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Base Height (mm)
              </label>
              <Input
                type="number"
                value={baseHeight}
                onChange={(e) => setBaseHeight(e.target.value)}
                min="0"
                max="5"
                step="0.1"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <ShimmerButton
              onClick={handleGenerate}
              disabled={loading}
              background="rgba(16, 217, 163, 1)"
              className="px-8 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate 3D QR Code'}
            </ShimmerButton>
          </div>
        </CardContent>
      </Card>

      {/* QR Preview */}
      <QRPreview result={result} loading={loading} label="3D QR Code" />

      {/* 3D Download Options */}
      {result?.success && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>3D Print Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Download Options</h3>
                <div className="space-y-2">
                  <button
                    onClick={handleDownloadSTL}
                    className="w-full px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-colors"
                  >
                    Download STL File
                  </button>
                  <button
                    className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    disabled
                  >
                    Download OBJ File (Coming Soon)
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Print Settings</h3>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p>• Layer Height: 0.2mm recommended</p>
                  <p>• Infill: 100% for durability</p>
                  <p>• Support: Not required</p>
                  <p>• Size: {size}mm × {size}mm × {thickness}mm</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-8 bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20 border-brand-200 dark:border-brand-800">
        <CardContent>
          <p className="text-sm text-brand-800 dark:text-brand-300 flex items-center gap-2">
            <span className="text-lg">🖨️</span>
            3D printed QR codes work best with high contrast materials. Use white or light-colored filament for the base and dark filament for the raised areas.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}