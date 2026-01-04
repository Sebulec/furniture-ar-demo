import { Upload, Cpu, Smartphone, ScanLine, Share2, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Upload size={32} className="text-secondary" />,
      title: "1. Upload Product Photos",
      description: "Simply upload your existing high-quality product images. No complex 3D scanning equipment required."
    },
    {
      icon: <Cpu size={32} className="text-secondary" />,
      title: "2. AI Generates 3D Model",
      description: "Our advanced AI analyzes geometry and textures to reconstruct a photorealistic 3D model in seconds."
    },
    {
      icon: <Smartphone size={32} className="text-secondary" />,
      title: "3. Embed AR Viewer",
      description: "Copy a simple code snippet to your product page. Customers can now view the item in their room instantly."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">From Photo to AR in Minutes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Forget expensive 3D studios. SpaceCheck makes AR accessible for every retailer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-secondary/20 via-secondary/50 to-secondary/20 border-t-2 border-dashed border-secondary/30 -z-10"></div>

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-2 border-gray-100 rounded-2xl shadow-lg flex items-center justify-center mb-6 group-hover:border-secondary transition-colors duration-300 relative">
                {step.icon}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed px-4">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
