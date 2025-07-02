'use client';

import { useState } from 'react';
import { QuotaInfo } from '@/components/ui/QuotaInfo';
import { QRPreview } from '@/components/qr/QRPreview';
import { MatterDeviceInfo, MatterValidationResult } from '@/types/matter';
import { QRGenerationResult } from '@/types/qr';
import { MatterQRGenerator } from '@/lib/matter/generator';
import { QRGenerator } from '@/lib/qr/generator';
import { UsageTracker } from '@/lib/utils/usage';

export default function MatterPage() {
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
    const tracker = UsageTracker.getInstance();
    if (!tracker.canGenerate()) {
      setResult({
        success: false,
        error: 'Daily limit reached. Please upgrade or try again tomorrow.',
      });
      return;
    }

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
      
      if (qrResult.success) {
        tracker.incrementDaily();
      }
      
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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Matter IoT Pairing</h1>
      
      <QuotaInfo />

      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Device Information</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vendor ID (VID) *
              </label>
              <input
                type="text"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                placeholder="0xFFF1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product ID (PID) *
              </label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="0x8001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Setup PIN *
              </label>
              <input
                type="text"
                value={setupPin}
                onChange={(e) => setSetupPin(e.target.value)}
                placeholder="20202021"
                maxLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <p className="text-xs text-gray-500 mt-1">8 digits, avoid sequential or repeated numbers</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discriminator *
              </label>
              <input
                type="text"
                value={discriminator}
                onChange={(e) => setDiscriminator(e.target.value)}
                placeholder="3840"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <p className="text-xs text-gray-500 mt-1">0-4095 (12 bits)</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">TLV Generation Options</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={includeVersion}
                  onChange={(e) => setIncludeVersion(e.target.checked)}
                  className="mr-2 text-brand-600"
                />
                <span className="text-sm text-gray-700">Include Version Info</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={validateVidPid}
                  onChange={(e) => setValidateVidPid(e.target.checked)}
                  className="mr-2 text-brand-600"
                />
                <span className="text-sm text-gray-700">Validate VID/PID Against CSA Database</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={generateNdef}
                  onChange={(e) => setGenerateNdef(e.target.checked)}
                  className="mr-2 text-brand-600"
                />
                <span className="text-sm text-gray-700">Generate NFC NDEF Payload</span>
              </label>
            </div>
          </div>

          {validation && (
            <div className={`mb-6 p-4 rounded-lg ${validation.valid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <h3 className={`text-sm font-medium mb-2 ${validation.valid ? 'text-green-800' : 'text-red-800'}`}>
                Validation Result: {validation.valid ? '✅ Passed' : '❌ Failed'}
              </h3>
              
              {validation.errors.length > 0 && (
                <div className="mb-2">
                  <p className="text-sm font-medium text-red-700">Errors:</p>
                  <ul className="list-disc list-inside text-sm text-red-600">
                    {validation.errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {validation.warnings.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-amber-700">Warnings:</p>
                  <ul className="list-disc list-inside text-sm text-amber-600">
                    {validation.warnings.map((warning, idx) => (
                      <li key={idx}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate & Download'}
            </button>
            
            {validation && (
              <button
                onClick={handleDownloadReport}
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Validation Report
              </button>
            )}
          </div>
        </div>
      </div>

      <QRPreview result={result} loading={loading} label="Matter Pairing Code" />

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-sm text-amber-800">
          ⚡ Professional features • TLV validation included • CSA compliant
        </p>
      </div>

      <div className="mt-4 bg-brand-50 border border-brand-200 rounded-lg p-4">
        <p className="text-sm text-brand-800">
          📐 Recommended: QR size ≥30mm² for reliable scanning<br />
          🎯 Test with Google Home, Apple Home, or Amazon Alexa apps
        </p>
      </div>
    </div>
  );
}