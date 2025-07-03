'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRPreviewEnhanced } from '@/components/qr/QRPreview-enhanced';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { BorderBeam } from '@/components/magicui/border-beam';
import { MagicCard } from '@/components/magicui/magic-card';
import { TextEffect } from '@/components/magicui/text-effect';
import { CryptoType, BitcoinPaymentRequest, EthereumPaymentRequest, LightningInvoice } from '@/types/crypto';
import { QRGenerationResult } from '@/types/qr';
import { CryptoQRGenerator } from '@/lib/crypto/generator';
import { QRGenerator } from '@/lib/qr/generator';
import { Bitcoin, Zap, Cpu, Shield, Globe } from 'lucide-react';

type Tab = 'bitcoin' | 'ethereum' | 'lightning';

const tabs = [
  { 
    id: 'bitcoin' as Tab, 
    label: 'Bitcoin', 
    icon: Bitcoin, 
    color: 'from-orange-500 to-yellow-500',
    badge: 'BIP-21'
  },
  { 
    id: 'ethereum' as Tab, 
    label: 'Ethereum', 
    icon: Cpu, 
    color: 'from-blue-500 to-purple-500',
    badge: 'EIP-681'
  },
  { 
    id: 'lightning' as Tab, 
    label: 'Lightning', 
    icon: Zap, 
    color: 'from-yellow-400 to-orange-500',
    badge: 'BOLT-11'
  },
];

// Removed fake stats - all generation happens client-side

export default function CryptoPageEnhanced() {
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
          Crypto QR
        </TextEffect>
        <AnimatedGradientText className="text-5xl lg:text-6xl font-bold mb-6">
          Generator
        </AnimatedGradientText>
        <TextEffect
          preset="fade-in-blur"
          as="p"
          className="text-xl text-gray-900 max-w-3xl mx-auto mb-8"
        >
          Generate professional cryptocurrency payment QR codes with full compliance to industry standards. 
          Support for Bitcoin (BIP-21), Ethereum (EIP-681), and Lightning Network (BOLT-11).
        </TextEffect>
      </motion.div>

      {/* Removed fake stats section - all QR generation happens client-side */}


      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagicCard className="h-fit">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Generate Crypto QR Code</CardTitle>
              
              {/* Tab Navigation */}
              <div className="flex p-1 bg-gray-100  rounded-lg">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex-1 px-4 py-3 text-sm font-medium rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-white text-gray-900 shadow-lg'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    <span className="text-xs px-2 py-1 bg-brand-100 text-brand-700 rounded-full">
                      {tab.badge}
                    </span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white rounded-md shadow-lg -z-10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              <AnimatePresence mode="wait">
                {activeTab === 'bitcoin' && (
                  <motion.div
                    key="bitcoin"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Bitcoin Address *
                      </label>
                      <Input
                        type="text"
                        value={btcAddress}
                        onChange={(e) => setBtcAddress(e.target.value)}
                        placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Amount (BTC)
                        </label>
                        <Input
                          type="number"
                          value={btcAmount}
                          onChange={(e) => setBtcAmount(e.target.value)}
                          placeholder="0.001"
                          step="0.00000001"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Label
                        </label>
                        <Input
                          type="text"
                          value={btcLabel}
                          onChange={(e) => setBtcLabel(e.target.value)}
                          placeholder="Payment for services"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Message
                      </label>
                      <Input
                        type="text"
                        value={btcMessage}
                        onChange={(e) => setBtcMessage(e.target.value)}
                        placeholder="Optional message"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'ethereum' && (
                  <motion.div
                    key="ethereum"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Ethereum Address *
                      </label>
                      <Input
                        type="text"
                        value={ethAddress}
                        onChange={(e) => setEthAddress(e.target.value)}
                        placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f1b794"
                        className="font-mono text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Amount (ETH)
                        </label>
                        <Input
                          type="number"
                          value={ethAmount}
                          onChange={(e) => setEthAmount(e.target.value)}
                          placeholder="0.01"
                          step="0.000000000000000001"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                          Chain ID
                        </label>
                        <select
                          value={ethChainId}
                          onChange={(e) => setEthChainId(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white "
                        >
                          <option value="1">Mainnet (1)</option>
                          <option value="137">Polygon (137)</option>
                          <option value="10">Optimism (10)</option>
                          <option value="42161">Arbitrum (42161)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Gas Limit
                      </label>
                      <Input
                        type="text"
                        value={ethGasLimit}
                        onChange={(e) => setEthGasLimit(e.target.value)}
                        placeholder="21000"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === 'lightning' && (
                  <motion.div
                    key="lightning"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Lightning Invoice *
                      </label>
                      <textarea
                        value={lnInvoice}
                        onChange={(e) => setLnInvoice(e.target.value)}
                        placeholder="lnbc100n1p3..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white  dark:border-gray-600 font-mono text-sm"
                      />
                    </div>
                    
                    <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                        <p className="text-sm text-brand-800 dark:text-brand-300 font-medium">
                          Lightning Network Features
                        </p>
                      </div>
                      <ul className="text-sm text-brand-700 dark:text-brand-300 mt-2 space-y-1">
                        <li>• Instant payments with low fees</li>
                        <li>• Time-sensitive invoices</li>
                        <li>• BOLT-11 standard compliance</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8">
                <ShimmerButton
                  onClick={handleGenerate}
                  disabled={loading}
                  background="rgba(16, 217, 163, 1)"
                  className="w-full text-white py-3 text-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Shield className="w-5 h-5" />
                      Generate Secure QR Code
                    </div>
                  )}
                </ShimmerButton>
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
            label={`${activeTab} payment`} 
          />
        </motion.div>
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12"
      >
        <MagicCard className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand-100 dark:bg-brand-900/30 rounded-full">
              <Globe className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Universal Compatibility
              </h3>
              <p className="text-sm text-gray-900">
                Generated QR codes are {activeTab === 'bitcoin' ? 'BIP-21' : activeTab === 'ethereum' ? 'EIP-681' : 'BOLT-11'} compatible and work with all major wallets including Coinbase, MetaMask, Trust Wallet, and hardware wallets.
              </p>
            </div>
          </div>
        </MagicCard>
      </motion.div>
    </div>
  );
}