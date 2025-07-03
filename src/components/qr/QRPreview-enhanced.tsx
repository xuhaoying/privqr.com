'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRGenerationResult } from '@/types/qr';
import { BorderBeam } from '@/components/magicui/border-beam';
import { LoadingDots } from '@/components/magicui/loading-dots';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { MagicCard } from '@/components/magicui/magic-card';
import { Download, Copy, Share2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QRPreviewEnhancedProps {
  result: QRGenerationResult | null;
  loading?: boolean;
  label?: string;
}

export function QRPreviewEnhanced({ result, loading, label }: QRPreviewEnhancedProps) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    if (!result?.data || !navigator.share) return;
    
    try {
      await navigator.share({
        title: 'QR Code',
        text: `Generated QR Code for ${label || 'content'}`,
        url: result.data,
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <MagicCard className="relative overflow-hidden">
      
      <div className="p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-6 text-gray-900">
            QR Code Preview
          </h3>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-64 h-64 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center"
              >
                <div className="text-center">
                  <LoadingDots size="lg" />
                  <p className="text-sm text-gray-900 mt-4">
                    Generating QR Code...
                  </p>
                </div>
              </motion.div>
            ) : result?.success && result.data ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative"
              >
                <div className="w-64 h-64 mx-auto mb-4 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-brand-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-white rounded-xl p-4 shadow-2xl">
                    {result.format === 'svg' ? (
                      <div 
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: result.data }}
                      />
                    ) : (
                      <img
                        src={result.data}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </div>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-gray-900 mb-6"
                >
                  {label || 'QR Code'} • Generated offline
                </motion.p>
              </motion.div>
            ) : result?.error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-64 h-64 mx-auto bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center border border-red-200"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">❌</div>
                  <p className="text-sm text-red-600 px-4">
                    {result.error}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-64 h-64 mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 space-x-1">
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    >
                      ⬜
                    </motion.span>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    >
                      ⬛
                    </motion.span>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                    >
                      ⬜
                    </motion.span>
                  </div>
                  <p className="text-sm text-gray-900">
                    QR Preview
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <AnimatePresence>
          {result?.success && result.data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              <ShimmerButton
                onClick={() => handleDownload('png')}
                disabled={downloading}
                background="rgba(16, 217, 163, 1)"
                className="text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                PNG
              </ShimmerButton>
              
              <ShimmerButton
                onClick={() => handleDownload('svg')}
                disabled={downloading}
                background="rgba(16, 185, 129, 1)"
                className="text-white flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                SVG
              </ShimmerButton>
              
              <button
                onClick={handleCopy}
                className={cn(
                  "px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2",
                  copied && "border-green-500 bg-green-50"
                )}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={handleShare}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MagicCard>
  );
}