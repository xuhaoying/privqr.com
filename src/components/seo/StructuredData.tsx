interface StructuredDataProps {
  type?: 'organization' | 'webapp' | 'faq' | 'howto';
  data?: any;
}

export function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  let schema: any;

  switch (type) {
    case 'organization':
      schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "priv QR",
        "url": "https://privqr.com",
        "logo": "https://privqr.com/logo-transparent.svg",
        "description": "Privacy-first professional QR code generator for developers, crypto enthusiasts, and IoT engineers. Generate secure QR codes entirely in your browser.",
        "foundingDate": "2024",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "support@privqr.com",
          "contactType": "Customer Support"
        },
        "sameAs": [
          "https://github.com/xuhaoying/privqr.com"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        }
      };
      break;

    case 'webapp':
      schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "priv QR - Professional QR Code Generator",
        "url": "https://privqr.com",
        "description": "Free, privacy-first QR code generator supporting cryptocurrency payments, IoT device pairing, bulk processing, and 3D printing. Works completely offline.",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "creator": {
          "@type": "Organization",
          "name": "priv QR"
        },
        "browserRequirements": "Requires JavaScript. Modern browsers supported.",
        "permissions": "No special permissions required. All processing happens locally.",
        "featureList": [
          "Bitcoin QR Code Generation (BIP-21)",
          "Ethereum QR Code Generation (EIP-681)", 
          "Lightning Network Invoice QR (BOLT-11)",
          "Matter/Thread IoT Device Pairing Codes",
          "Bulk CSV Processing",
          "3D Printable QR Codes",
          "Offline Functionality",
          "Privacy-First Design"
        ]
      };
      break;

    case 'faq':
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is my data safe when using priv QR?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, your data is completely safe. All QR code generation happens entirely in your browser. We never see, store, or transmit your QR code content to our servers."
            }
          },
          {
            "@type": "Question", 
            "name": "Can I use priv QR offline?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Once the app loads, it works completely offline. You can generate QR codes anywhere without an internet connection."
            }
          },
          {
            "@type": "Question",
            "name": "What types of QR codes can I generate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "priv QR supports text, URLs, contact info, WiFi credentials, cryptocurrency payments (Bitcoin, Ethereum, Lightning), Matter/IoT device codes, and bulk generation from CSV files."
            }
          },
          {
            "@type": "Question",
            "name": "Are there any usage limits?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No usage limits! priv QR is completely free and unlimited. All QR code generation happens in your browser, so you can generate as many codes as you need."
            }
          },
          {
            "@type": "Question",
            "name": "Is priv QR really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, priv QR is completely free and open source. No hidden fees, subscriptions, or premium features."
            }
          }
        ]
      };
      break;

    case 'howto':
      schema = data || {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Generate a Secure QR Code",
        "description": "Step-by-step guide to generating secure QR codes using priv QR",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Choose QR Code Type",
            "text": "Select the type of QR code you want to generate: Text, URL, Crypto, Matter/IoT, or bulk processing."
          },
          {
            "@type": "HowToStep", 
            "name": "Enter Your Content",
            "text": "Input your content in the designated field. All processing happens locally in your browser."
          },
          {
            "@type": "HowToStep",
            "name": "Customize Settings",
            "text": "Adjust size, error correction level, and other settings as needed."
          },
          {
            "@type": "HowToStep",
            "name": "Generate and Download",
            "text": "Click generate to create your QR code, then download in PNG or SVG format."
          }
        ]
      };
      break;

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Specific structured data components for different pages
export function OrganizationSchema() {
  return <StructuredData type="organization" />;
}

export function WebAppSchema() {
  return <StructuredData type="webapp" />;
}

export function FAQSchema() {
  return <StructuredData type="faq" />;
}

export function HowToSchema(data?: any) {
  return <StructuredData type="howto" data={data} />;
}