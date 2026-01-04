import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
              SpaceCheck<span className="text-secondary">.app</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How it Works</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</Link>
            <Link href="/login" className="text-gray-600 hover:text-primary transition-colors font-medium">Login</Link>
            <Link href="/register" className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
              Get Started
            </Link>
          </div>

          <div className="md:hidden">
            <button className="text-gray-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
