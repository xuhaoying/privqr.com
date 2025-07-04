'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRPreviewEnhanced } from '@/components/qr/QRPreview-enhanced';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { MagicCard } from '@/components/magicui/magic-card';
import { TextEffect } from '@/components/magicui/text-effect';
import { MatterDeviceInfo, MatterValidationResult } from '@/types/matter';
import { QRGenerationResult } from '@/types/qr';
import { MatterQRGenerator } from '@/lib/matter/generator';
import { QRGenerator } from '@/lib/qr/generator';
import { Cpu, Zap, Shield, AlertTriangle, Download, CheckCircle2, Smartphone, BookOpen } from 'lucide-react';
import Link from 'next/link';

// Removed fake stats - all pairing happens client-side

export default function MatterPageEnhanced() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QRGenerationResult | null>(null);
  const [validation, setValidation] = useState<MatterValidationResult | null>(null);
  
  // Device info state
  const [vendorId, setVendorId] = useState('0xFFF1');
  const [productId, setProductId] = useState('0x8001');
  const [setupPin, setSetupPin] = useState('20202021');
  const [discriminator, setDiscriminator] = useState('3840');
  
  // Options
  const [includeVersion, setIncludeVersion] = useState(true);
  const [validateVidPid, setValidateVidPid] = useState(true);
  const [generateNdef, setGenerateNdef] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setValidation(null);

    try {
      const device: MatterDeviceInfo = {
        vendorId,
        productId,
        setupPin,
        discriminator: parseInt(discriminator),
        commissioningFlow: 0, // Standard flow
        discoveryCapabilities: 0x04, // BLE
      };

      // Validate device info
      const validationResult = MatterQRGenerator.validateDevice(device, validateVidPid);
      setValidation(validationResult);

      if (!validationResult.valid) {
        throw new Error(validationResult.errors.join(', '));
      }

      // Generate Matter QR
      const matterOptions = MatterQRGenerator.generateMatterQR({
        device,
        includeVersionInfo: includeVersion,
        validateVidPid,
        generateNdefPayload: generateNdef,
      });

      const generator = QRGenerator.getInstance();
      const qrResult = await generator.generateQR(matterOptions);
      
      
      setResult(qrResult);
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate Matter QR code',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!validation) return;

    const report = [
      'Matter Device Validation Report',
      '================================',
      '',
      `Vendor ID: ${vendorId}`,
      `Product ID: ${productId}`,
      `Setup PIN: ${setupPin}`,
      `Discriminator: ${discriminator}`,
      '',
      'Validation Result:',
      validation.valid ? '✅ PASSED' : '❌ FAILED',
      '',
    ];

    if (validation.errors.length > 0) {
      report.push('Errors:');
      validation.errors.forEach(error => report.push(`- ${error}`));
      report.push('');
    }

    if (validation.warnings.length > 0) {
      report.push('Warnings:');
      validation.warnings.forEach(warning => report.push(`- ${warning}`));
    }

    const blob = new Blob([report.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'matter_validation_report.txt';
    link.click();
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
          Matter IoT
        </TextEffect>
        <AnimatedGradientText className="text-5xl lg:text-6xl font-bold mb-6">
          Pairing QR
        </AnimatedGradientText>
        <TextEffect
          preset="fade-in-blur"
          as="p"
          className="text-xl text-gray-900 max-w-3xl mx-auto mb-6"
        >
          Generate CSA-compliant Matter commissioning QR codes for seamless IoT device pairing. 
          Full TLV validation and industry-standard compatibility included.
        </TextEffect>
        <Link href="/guides/matter" className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 text-brand-700 rounded-lg hover:bg-brand-200 transition-colors">
          <BookOpen className="w-4 h-4" />
          <span className="font-medium">Read User Guide</span>
        </Link>
      </motion.div>

      {/* Removed fake stats section - all Matter pairing happens client-side */}


      <div className="grid lg:grid-cols-2 gap-8">

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagicCard className="h-fit">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Generate Matter QR Code</CardTitle>
            </CardHeader>

            <CardContent>
          
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-brand-500" />
                    Device Information
                  </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Vendor ID (VID) *
                    </label>
                    <Input
                      type="text"
                      value={vendorId}
                      onChange={(e) => setVendorId(e.target.value)}
                      placeholder="0xFFF1"
                      className="font-mono"
                    />
                  </div>
            
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Product ID (PID) *
                    </label>
                    <Input
                      type="text"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      placeholder="0x8001"
                      className="font-mono"
                    />
                  </div>
            
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Setup PIN *
                    </label>
                    <Input
                      type="text"
                      value={setupPin}
                      onChange={(e) => setSetupPin(e.target.value)}
                      placeholder="20202021"
                      maxLength={8}
                      className="font-mono"
                    />
                    <p className="text-xs text-gray-900 mt-2">8 digits, avoid sequential or repeated numbers</p>
                  </div>
            
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Discriminator *
                    </label>
                    <Input
                      type="text"
                      value={discriminator}
                      onChange={(e) => setDiscriminator(e.target.value)}
                      placeholder="3840"
                      className="font-mono"
                    />
                    <p className="text-xs text-gray-900 mt-2">0-4095 (12 bits)</p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-brand-50 border border-brand-200 rounded-lg p-6 mt-8"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Zap className="w-5 h-5 text-brand-600" />
                    <h3 className="text-sm font-medium text-brand-800">TLV Generation Options</h3>
                  </div>
                  <div className="space-y-4">
                    <motion.label 
                      className="flex items-center cursor-pointer group"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="checkbox"
                        checked={includeVersion}
                        onChange={(e) => setIncludeVersion(e.target.checked)}
                        className="mr-4 text-brand-600 rounded focus:ring-brand-500 w-4 h-4"
                      />
                      <span className="text-sm font-medium text-brand-700 group-hover:text-brand-800 transition-colors">Include Version Info</span>
                    </motion.label>
                    
                    <motion.label 
                      className="flex items-center cursor-pointer group"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="checkbox"
                        checked={validateVidPid}
                        onChange={(e) => setValidateVidPid(e.target.checked)}
                        className="mr-4 text-brand-600 rounded focus:ring-brand-500 w-4 h-4"
                      />
                      <span className="text-sm font-medium text-brand-700 group-hover:text-brand-800 transition-colors">Validate VID/PID Against CSA Database</span>
                    </motion.label>
                    
                    <motion.label 
                      className="flex items-center cursor-pointer group"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="checkbox"
                        checked={generateNdef}
                        onChange={(e) => setGenerateNdef(e.target.checked)}
                        className="mr-4 text-brand-600 rounded focus:ring-brand-500 w-4 h-4"
                      />
                      <span className="text-sm font-medium text-brand-700 group-hover:text-brand-800 transition-colors">Generate NFC NDEF Payload</span>
                    </motion.label>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {validation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-6 p-4 rounded-lg border ${validation.valid 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {validation.valid ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        )}
                        <h3 className={`text-sm font-medium ${validation.valid 
                          ? 'text-green-800' 
                          : 'text-red-800'
                        }`}>
                          Validation {validation.valid ? 'Passed' : 'Failed'}
                        </h3>
                      </div>
                      
                      {validation.errors.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-red-700 mb-1">Errors:</p>
                          <ul className="space-y-1">
                            {validation.errors.map((error, idx) => (
                              <motion.li 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-sm text-red-600 flex items-start gap-1"
                              >
                                <span className="text-red-500">•</span>
                                <span>{error}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {validation.warnings.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-amber-700 mb-1">Warnings:</p>
                          <ul className="space-y-1">
                            {validation.warnings.map((warning, idx) => (
                              <motion.li 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-sm text-amber-600 flex items-start gap-1"
                              >
                                <span className="text-amber-500">•</span>
                                <span>{warning}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8 space-y-3">
                  <ShimmerButton
                    onClick={handleGenerate}
                    disabled={loading}
                    background="rgba(16, 217, 163, 1)"
                    className="w-full text-white py-3 text-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating Matter QR...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Shield className="w-5 h-5" />
                        Generate Secure Matter QR
                      </div>
                    )}
                  </ShimmerButton>
                  
                  <AnimatePresence>
                    {validation && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onClick={handleDownloadReport}
                        className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Validation Report
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
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
            label="Matter pairing code" 
          />
        </motion.div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <MagicCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Professional Features
                </h3>
                <p className="text-sm text-gray-900">
                  TLV validation included • CSA compliant • Industry standard commissioning
                </p>
              </div>
            </div>
          </MagicCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MagicCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-100 rounded-full">
                <Smartphone className="w-6 h-6 text-brand-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Universal Compatibility
                </h3>
                <p className="text-sm text-gray-900">
                  QR size ≥30mm² recommended • Test with Google Home, Apple Home, or Amazon Alexa
                </p>
              </div>
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </div>
  );
}