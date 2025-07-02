import Link from 'next/link';

const features = [
  {
    icon: '₿',
    title: 'Crypto',
    description: 'Bitcoin, Lightning Invoice',
    href: '/crypto',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: '📡',
    title: 'Matter/IoT',
    description: 'Device Pairing Codes',
    href: '/matter',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: '📊',
    title: 'Bulk',
    description: 'CSV Batch Generation',
    href: '/bulk',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: '🎯',
    title: '3D Print',
    description: 'STL Export Ready',
    href: '/3d',
    color: 'bg-purple-100 text-purple-600',
  },
];

const trustBadges = [
  { icon: '🔒', text: 'Data Never Leaves Browser' },
  { icon: '⚡', text: 'Generate in <50ms' },
  { icon: '📱', text: 'Works Offline' },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Professional QR Generator
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Zero dependencies • Offline • Privacy-first
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group relative bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} text-3xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          {trustBadges.map((badge) => (
            <div key={badge.text} className="flex items-center space-x-2">
              <span className="text-lg">{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm border p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Why QR Toolkit?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Absolute Privacy
            </h3>
            <p className="text-gray-600">
              All processing happens in your browser. Your sensitive data never touches our servers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Professional Features
            </h3>
            <p className="text-gray-600">
              Industry-standard formats, batch processing, and validation reports for serious users.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Open Source
            </h3>
            <p className="text-gray-600">
              Fully transparent and auditable code. Verify our security claims yourself.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to start?
        </h2>
        <p className="text-gray-600 mb-8">
          Choose a tool above or try our most popular features
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/crypto"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Generate Crypto QR
          </Link>
          <Link
            href="/bulk"
            className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Batch Process CSV
          </Link>
        </div>
      </section>
    </div>
  );
}