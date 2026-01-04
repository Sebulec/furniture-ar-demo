import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "/month",
      description: "Perfect for testing the waters.",
      features: [
        "3 Product Uploads/mo",
        "Standard Resolution",
        "Web AR Viewer",
        "Community Support"
      ],
      cta: "Start Free",
      highlighted: false
    },
    {
      name: "Growth",
      price: "$49",
      period: "/month",
      description: "For growing e-commerce stores.",
      features: [
        "50 Product Uploads/mo",
        "High Resolution 4K Textures",
        "Custom Branding",
        "Analytics Dashboard",
        "Priority Email Support"
      ],
      cta: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large catalogs and custom needs.",
      features: [
        "Unlimited Uploads",
        "API Access",
        "White-label Solution",
        "Dedicated Success Manager",
        "SLA Guarantee"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start for free, upgrade as you grow. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`relative rounded-2xl p-8 border ${plan.highlighted ? 'border-secondary shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm'} bg-white flex flex-col`}>
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-primary">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>
              <div className="mb-8">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                    <Check size={18} className="text-secondary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition-colors ${plan.highlighted ? 'bg-secondary text-white hover:bg-secondary/90' : 'bg-gray-100 text-primary hover:bg-gray-200'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
