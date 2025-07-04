'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Printer,
  Layers,
  Ruler,
  Download,
  CheckCircle2,
  AlertTriangle,
  Box,
  Settings2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TextEffect } from '@/components/magicui/text-effect';

interface ContentItem {
  type: string;
  title: string;
  text?: string;
  applications?: string[];
  specs?: { parameter: string; value: string; reason: string; }[];
  materials?: { type: string; pros: string; cons: string; bestFor: string; }[];
  steps?: string[];
  settings?: { setting: string; value: string; note: string; }[];
  tips?: string[];
}

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  content: ContentItem[];
}

const sections: Section[] = [
  {
    id: 'overview',
    title: '3D Printable QR Codes',
    icon: Printer,
    content: [
      {
        type: 'overview',
        title: 'What are 3D QR Codes?',
        text: '3D printable QR codes are specially generated STL files that can be printed on any 3D printer. They create raised QR patterns perfect for signage, keychains, business cards, and tactile applications.'
      },
      {
        type: 'applications',
        title: 'Popular Applications',
        applications: [
          'Durable outdoor signage',
          'Branded keychains and promotional items',
          'Tactile QR codes for accessibility',
          'Embedded product labels',
          'Decorative wall art',
          'Educational materials'
        ]
      }
    ]
  },
  {
    id: 'technical-specs',
    title: 'Technical Specifications',
    icon: Layers,
    content: [
      {
        type: 'dimensions',
        title: 'Recommended Dimensions',
        specs: [
          {
            parameter: 'Minimum Size',
            value: '30mm × 30mm',
            reason: 'Ensures QR modules are printable and scannable'
          },
          {
            parameter: 'Base Thickness',
            value: '2-3mm',
            reason: 'Provides structural stability'
          },
          {
            parameter: 'QR Code Depth',
            value: '1-2mm',
            reason: 'Creates sufficient contrast for scanning'
          },
          {
            parameter: 'Module Size',
            value: '≥1mm per module',
            reason: 'Prevents detail loss during printing'
          }
        ]
      },
      {
        type: 'materials',
        title: 'Material Recommendations',
        materials: [
          {
            type: 'PLA',
            pros: 'Easy to print, biodegradable, good detail',
            cons: 'Not weather resistant',
            bestFor: 'Indoor use, prototypes'
          },
          {
            type: 'PETG',
            pros: 'Weather resistant, durable, good adhesion',
            cons: 'Slight stringing',
            bestFor: 'Outdoor signage'
          },
          {
            type: 'ABS',
            pros: 'Strong, heat resistant',
            cons: 'Requires enclosure, warping',
            bestFor: 'Automotive, industrial'
          },
          {
            type: 'TPU',
            pros: 'Flexible, impact resistant',
            cons: 'Difficult to print',
            bestFor: 'Keychains, wearables'
          }
        ]
      }
    ]
  },
  {
    id: 'step-by-step',
    title: 'Creating 3D QR Codes',
    icon: Box,
    content: [
      {
        type: 'steps',
        title: 'Generation Process',
        steps: [
          'Navigate to the 3D Print page',
          'Enter your QR code data (URL, text, etc.)',
          'Set physical dimensions (width × height in mm)',
          'Choose base thickness (2-3mm recommended)',
          'Select QR code depth/height (1-2mm)',
          'Enable "Inverted" for raised background if desired',
          'Click "Generate 3D Model"',
          'Preview the 3D model in the viewer',
          'Download STL file for printing'
        ]
      },
      {
        type: 'print-settings',
        title: 'Recommended Print Settings',
        settings: [
          {
            setting: 'Layer Height',
            value: '0.2mm',
            note: 'Balance between quality and speed'
          },
          {
            setting: 'Infill',
            value: '20-30%',
            note: 'Higher for load-bearing applications'
          },
          {
            setting: 'Print Speed',
            value: '40-60mm/s',
            note: 'Slower for better detail'
          },
          {
            setting: 'Nozzle Temperature',
            value: 'Material dependent',
            note: 'PLA: 200-220°C, PETG: 230-250°C'
          },
          {
            setting: 'Support',
            value: 'Not required',
            note: 'QR codes are designed support-free'
          }
        ]
      }
    ]
  },
  {
    id: 'optimization',
    title: 'Optimization Tips',
    icon: Settings2,
    content: [
      {
        type: 'contrast',
        title: 'Maximizing Contrast',
        tips: [
          'Use contrasting filament colors (black on white, white on black)',
          'Consider dual-color printing for best results',
          'Paint recessed areas after printing for enhanced contrast',
          'Sand the top surface lightly for matte finish'
        ]
      },
      {
        type: 'durability',
        title: 'Enhancing Durability',
        tips: [
          'Apply clear coat or epoxy resin for outdoor use',
          'Increase wall thickness for structural parts',
          'Use higher infill percentage for heavy-use items',
          'Consider embedding magnets for mounting'
        ]
      },
      {
        type: 'scanning',
        title: 'Ensuring Scannability',
        tips: [
          'Test scan before mass production',
          'Ensure adequate lighting angle for shadows',
          'Keep minimum module size above 1mm',
          'Use high error correction level (H) for complex prints'
        ]
      }
    ]
  }
];

const troubleshooting = [
  {
    issue: 'QR code won\'t scan after printing',
    solution: 'Increase contrast by painting recesses or using contrasting materials. Ensure module size is at least 1mm.'
  },
  {
    issue: 'Details are lost during printing',
    solution: 'Reduce layer height to 0.1-0.15mm, slow down print speed, and ensure nozzle is clean.'
  },
  {
    issue: 'Model is too large for print bed',
    solution: 'Scale down in slicer while maintaining minimum module size, or split into multiple parts.'
  },
  {
    issue: 'Warping or lifting corners',
    solution: 'Ensure bed is level, use appropriate bed temperature, and consider using a brim or raft.'
  }
];

export default function ThreeDGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <Link 
          href="/guides" 
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Guides
        </Link>
        
        <TextEffect
          preset="fade-in-blur"
          as="h1"
          className="text-4xl lg:text-5xl font-bold mb-4"
        >
          3D Printing QR Codes
        </TextEffect>
        
        <p className="text-lg text-gray-900">
          Transform digital QR codes into physical objects with our 3D printing feature. 
          Create durable, tactile QR codes for signage, products, and more.
        </p>
      </motion.div>

      {/* Quick Start */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Box className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Quick Start</h3>
                <p className="text-sm text-gray-900">
                  Generate STL files instantly with optimized settings for 3D printing. 
                  Our models are designed to print support-free with excellent scannability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <div className="space-y-12">
        {sections.map((section, sectionIndex) => (
          <motion.section
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
            id={section.id}
            className="scroll-mt-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <section.icon className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
            </div>

            <div className="space-y-6">
              {section.content.map((item: ContentItem, index: number) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    {item.type === 'overview' && (
                      <>
                        <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                        <p className="text-gray-900">{item.text}</p>
                      </>
                    )}

                    {item.type === 'applications' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {item.applications?.map((app: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-gray-900">{app}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {item.type === 'dimensions' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <div className="space-y-3">
                          {item.specs?.map((spec: { parameter: string; value: string; reason: string; }, idx: number) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-3">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-gray-900">{spec.parameter}</span>
                                <span className="font-mono text-sm bg-white px-2 py-1 rounded">
                                  {spec.value}
                                </span>
                              </div>
                              <p className="text-sm text-gray-900">{spec.reason}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {item.type === 'materials' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <div className="space-y-4">
                          {item.materials?.map((material: { type: string; pros: string; cons: string; bestFor: string; }, idx: number) => (
                            <div key={idx} className="border rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">{material.type}</h4>
                              <div className="space-y-1 text-sm">
                                <p className="text-green-700">✓ {material.pros}</p>
                                <p className="text-red-700">✗ {material.cons}</p>
                                <p className="text-gray-900 font-medium mt-2">
                                  Best for: {material.bestFor}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {item.type === 'steps' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <ol className="space-y-3">
                          {item.steps?.map((step: string, idx: number) => (
                            <li key={idx} className="flex gap-3">
                              <span className="flex-shrink-0 w-7 h-7 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                                {idx + 1}
                              </span>
                              <span className="text-gray-900">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </>
                    )}

                    {item.type === 'print-settings' && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Setting</th>
                                <th className="text-left py-2">Value</th>
                                <th className="text-left py-2">Note</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.settings?.map((setting: { setting: string; value: string; note: string; }, idx: number) => (
                                <tr key={idx} className="border-b">
                                  <td className="py-2 font-medium">{setting.setting}</td>
                                  <td className="py-2 font-mono">{setting.value}</td>
                                  <td className="py-2 text-gray-900">{setting.note}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}

                    {(item.type === 'contrast' || item.type === 'durability' || item.type === 'scanning') && (
                      <>
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>
                        <ul className="space-y-2">
                          {item.tips?.map((tip: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              <span className="text-gray-900">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Troubleshooting */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
          <div className="space-y-4">
            {troubleshooting.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.issue}</h3>
                      <p className="text-gray-900">{item.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Example Gallery */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pro Tips</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Ruler className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Size Matters</p>
                    <p className="text-gray-900">QR codes smaller than 30mm may lose detail. Scale appropriately.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Layers className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Multi-Color</p>
                    <p className="text-gray-900">Use filament swap or dual extrusion for maximum contrast.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Start 3D Printing</h3>
              <p className="text-gray-900 mb-6">
                Create your first 3D printable QR code with optimized settings for any 3D printer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/3d">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Go to 3D Generator
                  </button>
                </Link>
                <Link href="/guides">
                  <button className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Explore Other Guides
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}