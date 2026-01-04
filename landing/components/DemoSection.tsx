import { ArrowRight } from 'lucide-react';

export default function DemoSection() {
  return (
    <section id="demo" className="py-24 bg-primary text-white overflow-hidden relative">
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white blur-3xl"></div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Experience it yourself</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Scan the QR code to see how a potential customer would view your product. No app download needed - it just works.
            </p>
            
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 border border-secondary/50">
                        <span className="font-bold text-secondary">1</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Open Camera</h4>
                        <p className="text-gray-400">Point your phone's camera at the QR code.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 border border-secondary/50">
                        <span className="font-bold text-secondary">2</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Tap Notification</h4>
                        <p className="text-gray-400">Click the banner that appears to launch the AR viewer.</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 border border-secondary/50">
                        <span className="font-bold text-secondary">3</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Place in Room</h4>
                        <p className="text-gray-400">Move your phone slightly to detect the floor and place the object.</p>
                    </div>
                </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white text-primary p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
                <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">Modern Armchair</h3>
                    <p className="text-gray-500 text-sm">Velvet Collection 2025</p>
                </div>
                
                {/* QR Code Placeholder */}
                <div className="aspect-square bg-gray-100 rounded-xl mb-6 flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden group">
                     {/* In a real app, this would be a real QR code */}
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <svg className="w-32 h-32 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5H5zm-8 8h6v6H3v-6zm2 2v2h2v-2H5zm8-2h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2z"/>
                        </svg>
                        <p className="text-xs text-gray-400 mt-2 font-mono">SCAN ME</p>
                     </div>
                </div>

                <button className="w-full bg-secondary text-white py-3 rounded-xl font-semibold hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2">
                    Or Click Here (Mobile) <ArrowRight size={18} />
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
