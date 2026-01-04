import { ScanLine, Layers, Zap, Globe, Lock, Palette } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap className="text-secondary" size={24} />,
      title: "Instant Processing",
      description: "Get production-ready AR models in under 2 minutes. Scale your catalog digitization effortlessly."
    },
    {
      icon: <Globe className="text-secondary" size={24} />,
      title: "Universal Compatibility",
      description: "Works natively on iOS (QuickLook) and Android (SceneViewer) without requiring any app download."
    },
    {
      icon: <Layers className="text-secondary" size={24} />,
      title: "High Fidelity Textures",
      description: "Our AI preserves fabric details and material properties for realistic furniture visualization."
    },
    {
      icon: <ScanLine className="text-secondary" size={24} />,
      title: "Seamless Integration",
      description: "Works with Shopify, WooCommerce, Magento, and custom stacks. Just copy and paste."
    },
    {
      icon: <Palette className="text-secondary" size={24} />,
      title: "Custom Branding",
      description: "Customize the AR viewer interface to match your brand's colors and style guidelines."
    },
    {
      icon: <Lock className="text-secondary" size={24} />,
      title: "Secure Hosting",
      description: "All assets are encrypted and served via a global CDN for lightning-fast loading speeds."
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Why Top Retailers Choose SpaceCheck</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built for performance, conversion, and ease of use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-accent/50 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
