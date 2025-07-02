'use client';

import { useState } from 'react';
import { QuotaInfo } from '@/components/ui/QuotaInfo';
import { QRPreview } from '@/components/qr/QRPreview';
import { CryptoType, BitcoinPaymentRequest, EthereumPaymentRequest, LightningInvoice } from '@/types/crypto';
import { QRGenerationResult } from '@/types/qr';
import { CryptoQRGenerator } from '@/lib/crypto/generator';
import { QRGenerator } from '@/lib/qr/generator';
import { UsageTracker } from '@/lib/utils/usage';

type Tab = 'bitcoin' | 'ethereum' | 'lightning';

export default function CryptoPage() {
  const [activeTab, setActiveTab] = useState<Tab>('bitcoin');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QRGenerationResult | null>(null);
  
  // Bitcoin state
  const [btcAddress, setBtcAddress] = useState('');
  const [btcAmount, setBtcAmount] = useState('');
  const [btcLabel, setBtcLabel] = useState('');
  const [btcMessage, setBtcMessage] = useState('');
  
  // Ethereum state
  const [ethAddress, setEthAddress] = useState('');
  const [ethAmount, setEthAmount] = useState('');
  const [ethGasLimit, setEthGasLimit] = useState('');
  const [ethChainId, setEthChainId] = useState('1');
  
  // Lightning state
  const [lnInvoice, setLnInvoice] = useState('');

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

    try {
      let cryptoOptions;
      
      switch (activeTab) {
        case 'bitcoin': {
          if (!btcAddress) {
            throw new Error('Bitcoin address is required');
          }
          
          const btcData: BitcoinPaymentRequest = {
            address: btcAddress,
            amount: btcAmount ? parseFloat(btcAmount) : undefined,
            label: btcLabel || undefined,
            message: btcMessage || undefined,
          };
          
          if (!CryptoQRGenerator.validateCryptoAddress('bitcoin', btcAddress)) {
            throw new Error('Invalid Bitcoin address');
          }
          
          cryptoOptions = CryptoQRGenerator.generateCryptoQR({
            payment: { type: 'bitcoin', data: btcData },
          });
          break;
        }
        
        case 'ethereum': {
          if (!ethAddress) {
            throw new Error('Ethereum address is required');
          }
          
          const ethData: EthereumPaymentRequest = {
            address: ethAddress,
            amount: ethAmount || undefined,
            gasLimit: ethGasLimit || undefined,
            chainId: parseInt(ethChainId),
          };
          
          if (!CryptoQRGenerator.validateCryptoAddress('ethereum', ethAddress)) {
            throw new Error('Invalid Ethereum address');
          }
          
          cryptoOptions = CryptoQRGenerator.generateCryptoQR({
            payment: { type: 'ethereum', data: ethData },
          });
          break;
        }
        
        case 'lightning': {
          if (!lnInvoice) {
            throw new Error('Lightning invoice is required');
          }
          
          const lnData: LightningInvoice = {
            invoice: lnInvoice,
          };
          
          if (!CryptoQRGenerator.validateCryptoAddress('lightning', lnInvoice)) {
            throw new Error('Invalid Lightning invoice');
          }
          
          cryptoOptions = CryptoQRGenerator.generateCryptoQR({
            payment: { type: 'lightning', data: lnData },
          });
          break;
        }
      }

      const generator = QRGenerator.getInstance();
      const qrResult = await generator.generateQR(cryptoOptions);
      
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

  const tabs: { id: Tab; label: string }[] = [
    { id: 'bitcoin', label: 'Bitcoin' },
    { id: 'ethereum', label: 'Ethereum' },
    { id: 'lightning', label: 'Lightning' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Crypto QR Generator</h1>
      
      <QuotaInfo />

      <div className="bg-white rounded-lg shadow-sm border mb-8">
        <div className="border-b">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'bitcoin' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bitcoin Address *
                </label>
                <input
                  type="text"
                  value={btcAddress}
                  onChange={(e) => setBtcAddress(e.target.value)}
                  placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (BTC)
                  </label>
                  <input
                    type="number"
                    value={btcAmount}
                    onChange={(e) => setBtcAmount(e.target.value)}
                    placeholder="0.001"
                    step="0.00000001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label
                  </label>
                  <input
                    type="text"
                    value={btcLabel}
                    onChange={(e) => setBtcLabel(e.target.value)}
                    placeholder="Payment for services"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <input
                  type="text"
                  value={btcMessage}
                  onChange={(e) => setBtcMessage(e.target.value)}
                  placeholder="Optional message"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'ethereum' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ethereum Address *
                </label>
                <input
                  type="text"
                  value={ethAddress}
                  onChange={(e) => setEthAddress(e.target.value)}
                  placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f1b794"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (ETH)
                  </label>
                  <input
                    type="number"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    placeholder="0.01"
                    step="0.000000000000000001"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chain ID
                  </label>
                  <select
                    value={ethChainId}
                    onChange={(e) => setEthChainId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1">Mainnet (1)</option>
                    <option value="137">Polygon (137)</option>
                    <option value="10">Optimism (10)</option>
                    <option value="42161">Arbitrum (42161)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gas Limit
                </label>
                <input
                  type="text"
                  value={ethGasLimit}
                  onChange={(e) => setEthGasLimit(e.target.value)}
                  placeholder="21000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'lightning' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lightning Invoice *
                </label>
                <textarea
                  value={lnInvoice}
                  onChange={(e) => setLnInvoice(e.target.value)}
                  placeholder="lnbc100n1p3..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <p className="text-sm text-blue-800">
                  💡 Lightning invoices are time-sensitive. Generate and use them quickly to avoid expiration.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate QR Code'}
            </button>
          </div>
        </div>
      </div>

      <QRPreview result={result} loading={loading} label={`${activeTab} payment`} />

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          💡 Generated QR codes are {activeTab === 'bitcoin' ? 'BIP-21' : activeTab === 'ethereum' ? 'EIP-681' : 'BOLT-11'} compatible and work with all major wallets
        </p>
      </div>
    </div>
  );
}