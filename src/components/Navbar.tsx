import { useState } from 'react';
import { ShoppingCart, User, Menu, X, ArrowLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isCheckout = location.pathname === '/checkout';

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Back Button */}
          <div className="flex-shrink-0 flex items-center gap-4">
            {isCheckout && (
              <button 
                onClick={() => navigate('/')}
                className="p-2 -ml-2 hover:bg-neutral-100 rounded-full transition-colors md:hidden"
              >
                <ArrowLeft size={20} className="text-neutral-600" />
              </button>
            )}
            <Link to="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent italic tracking-tighter">
                GinStore
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-bold transition-colors ${location.pathname === '/' ? 'text-emerald-600' : 'text-neutral-500 hover:text-neutral-900'}`}>Inicio</Link>
            <a href="#" className="text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors">Destilados</a>
            <a href="#" className="text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors">Combos</a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {!isCheckout && (
              <>
                <button className="text-neutral-500 hover:text-neutral-900 transition-colors p-2 hidden sm:block">
                  <User size={20} />
                </button>
                <button 
                  onClick={onCartClick}
                  className="relative text-neutral-500 hover:text-neutral-900 transition-colors p-2 group"
                >
                  <div className="bg-neutral-50 p-2 rounded-xl group-hover:bg-emerald-50 transition-colors">
                    <ShoppingCart size={20} className="group-hover:text-emerald-600 transition-colors" />
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-black text-white bg-emerald-500 rounded-full ring-2 ring-white">
                      {cartCount}
                    </span>
                  )}
                </button>
                
                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-neutral-500 hover:text-neutral-900 transition-colors p-2"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </>
            )}
            {isCheckout && (
              <Link to="/" className="text-sm font-black text-emerald-600 hover:text-emerald-700 underline underline-offset-4 hidden sm:block">
                Seguir comprando
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-neutral-100 ${isMenuOpen ? 'max-h-64 shadow-xl' : 'max-h-0'}`}>
        <div className="px-6 py-8 space-y-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg font-bold text-neutral-900">Inicio</Link>
          <a href="#" className="block text-lg font-bold text-neutral-500">Destilados</a>
          <a href="#" className="block text-lg font-bold text-neutral-500">Combos</a>
          <button onClick={() => { setIsMenuOpen(false); onCartClick(); }} className="w-full bg-emerald-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 mt-4">
            <ShoppingCart size={20} />
            Ver Carrito ({cartCount})
          </button>
        </div>
      </div>
    </nav>
  );
}
