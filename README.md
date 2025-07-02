# QR Toolkit - Professional QR Code Generator

🔒 **Zero dependencies** • ⚡ **Offline-first** • 🌐 **Privacy-focused**

A professional-grade QR code generator for developers, crypto enthusiasts, and IoT engineers. Generate secure QR codes entirely in your browser - your data never leaves your device.

## ✨ Features

### 🚀 Core Features
- **Universal QR Generation** - Text, URLs, WiFi credentials, contacts
- **Crypto Support** - Bitcoin (BIP-21), Ethereum (EIP-681), Lightning Invoice
- **Matter/IoT** - Device pairing codes with TLV encoding and validation
- **Batch Processing** - Import CSV files and generate up to 20 QR codes at once
- **High Performance** - Sub-50ms generation with Web Worker pool

### 🔐 Privacy & Security
- **100% Client-Side** - All processing happens in your browser
- **No Data Collection** - We don't track, store, or transmit your data
- **Open Source** - Fully auditable code
- **Offline Capable** - Works without internet connection (PWA)

### 🎯 Professional Tools
- **Logo Embedding** - Add custom logos with error correction
- **Multiple Formats** - Export as PNG, SVG, PDF, or EPS
- **3D QR Codes** - Generate STL files for 3D printing
- **Validation Reports** - CSV export with detailed error tracking

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/xuhaoying/privqr.com.git
cd privqr.com

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the app.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📖 Usage Examples

### Basic QR Generation
```typescript
import { QRGenerator } from '@/lib/qr/generator';

const generator = QRGenerator.getInstance();
const result = await generator.generateQR({
  type: 'url',
  data: 'https://example.com',
  size: 400,
  errorCorrectionLevel: 'M'
});
```

### Crypto QR Codes
```typescript
import { CryptoQRGenerator } from '@/lib/crypto/generator';

// Bitcoin
const btcQR = CryptoQRGenerator.generateCryptoQR({
  payment: {
    type: 'bitcoin',
    data: {
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      amount: 0.001,
      label: 'Payment'
    }
  }
});

// Lightning
const lnQR = CryptoQRGenerator.generateCryptoQR({
  payment: {
    type: 'lightning',
    data: {
      invoice: 'lnbc100n1p3...'
    }
  }
});
```

### Matter Device Codes
```typescript
import { MatterQRGenerator } from '@/lib/matter/generator';

const matterQR = MatterQRGenerator.generateMatterQR({
  device: {
    vendorId: 0xFFF1,
    productId: 0x8001,
    setupPin: '20202021',
    discriminator: 3840
  },
  validateVidPid: true
});
```

### Batch Processing
```typescript
import { BatchProcessor } from '@/lib/batch/processor';

const processor = new BatchProcessor();
await processor.processCSV(csvFile, {
  format: 'png',
  size: 400,
  onProgress: (progress) => console.log(`${progress}% complete`)
});
```

## 🎨 UI Components

The project includes reusable React components:

- `<QRPreview />` - Display and download QR codes
- `<QuotaInfo />` - Show usage limits and quotas
- `<Header />` - Navigation and branding
- `<Layout />` - Page wrapper with consistent styling

## 🏗️ Architecture

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # Generic UI components
│   ├── qr/          # QR-specific components
│   └── layout/      # Layout components
├── lib/             # Core business logic
│   ├── qr/          # QR generation engine
│   ├── crypto/      # Cryptocurrency modules
│   ├── matter/      # Matter/IoT modules
│   ├── batch/       # Batch processing
│   ├── workers/     # Web Workers
│   └── utils/       # Utilities
└── types/           # TypeScript definitions
```

## 🔧 Configuration

### Environment Variables
```env
# Optional - for analytics or future features
NEXT_PUBLIC_GA_ID=your-ga-id
```

### Usage Limits (Free Tier)
```javascript
const limits = {
  dailyGeneration: 50,
  batchSize: 20,
  logoFileSize: 2, // MB
  concurrent: 3
};
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## 📊 Performance Benchmarks

| Operation | Target | Actual |
|-----------|--------|---------|
| Single QR | < 50ms | ~35ms |
| Batch 20 | < 2s | ~1.5s |
| Batch 500 | < 8s | ~6s |
| Memory (500 QR) | < 200MB | ~150MB |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [qrcode](https://github.com/soldair/node-qrcode) - QR code generation
- [three.js](https://threejs.org/) - 3D visualization
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 🔗 Links

- [Live Demo](https://qr-toolkit.example.com)
- [Documentation](https://docs.qr-toolkit.example.com)
- [API Reference](https://api.qr-toolkit.example.com)
- [Changelog](CHANGELOG.md)

---

Made with ❤️ by the QR Toolkit Team