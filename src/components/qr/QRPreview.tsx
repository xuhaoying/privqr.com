'use client';

import { useState } from 'react';
import { QRGenerationResult } from '@/types/qr';

interface QRPreviewProps {
  result: QRGenerationResult | null;
  loading?: boolean;
  label?: string;
}

export function QRPreview({ result, loading, label }: QRPreviewProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (format: 'png' | 'svg') => {
    if (!result?.data) return;
    
    setDownloading(true);
    try {
      if (format === 'png') {
        const link = document.createElement('a');
        link.href = result.data;
        link.download = `${label || 'qr-code'}.png`;
        link.click();
      } else {
        // For SVG, create a blob
        const blob = new Blob([result.data], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${label || 'qr-code'}.svg`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    if (!result?.data) return;
    
    try {
      await navigator.clipboard.writeText(result.data);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8">
      <div className="text-center">
        {loading ? (
          <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500" />
          </div>
        ) : result?.success && result.data ? (
          <>
            <div className="mb-4">
              {result.format === 'svg' ? (
                <div 
                  className="w-64 h-64 mx-auto"
                  dangerouslySetInnerHTML={{ __html: result.data }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.data}
                  alt="QR Code"
                  className="w-64 h-64 mx-auto"
                />
              )}
            </div>
            <p className="text-sm text-gray-700 mb-4">
              {label || 'QR Code generated'} • Offline generated
            </p>
          </>
        ) : result?.error ? (
          <div className="w-64 h-64 mx-auto bg-red-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl mb-2">❌</span>
              <p className="text-sm text-red-600">{result.error}</p>
            </div>
          </div>
        ) : (
          <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2 text-gray-500">⬜⬛⬜⬛⬜</div>
              <div className="text-4xl mb-2 text-gray-500">⬛⬜⬛⬜⬛</div>
              <div className="text-4xl mb-2 text-gray-500">⬜⬛⬜⬛⬜</div>
              <p className="text-sm text-gray-600">QR Preview</p>
            </div>
          </div>
        )}
      </div>

      {result?.success && result.data && (
        <div className="flex justify-center space-x-2 mt-6">
          <button
            onClick={() => handleDownload('png')}
            disabled={downloading}
            className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 disabled:opacity-50"
          >
            Download PNG
          </button>
          <button
            onClick={() => handleDownload('svg')}
            disabled={downloading}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            SVG
          </button>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}