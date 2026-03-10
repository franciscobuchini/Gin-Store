import { useState } from 'react';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              GinStore
            </span>
          </div>

          {/* Navigation Links - Desktop (Simplified) */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8 text-sm font-medium">
              <a href="#" className="text-neutral-900 hover:text-emerald-600 transition-colors">Inicio</a>
              <a href="#" className="text-neutral-500 hover:text-neutral-900 transition-colors">Ofertas</a>
              <a href="#" className="text-neutral-500 hover:text-neutral-900 transition-colors">Contacto</a>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <button className="text-neutral-500 hover:text-neutral-900 transition-colors p-2">
              <User size={20} />
            </button>
            <button className="relative text-neutral-500 hover:text-neutral-900 transition-colors p-2">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-emerald-500 rounded-full">
                0
              </span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-neutral-500 hover:text-neutral-900 transition-colors p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 border-b border-neutral-200' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-white">
          <a href="#" className="block px-3 py-2 text-base font-medium text-neutral-900 hover:bg-neutral-50 rounded-lg">Inicio</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg">Ofertas</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg">Contacto</a>
        </div>
      </div>
    </nav>
  );
}
