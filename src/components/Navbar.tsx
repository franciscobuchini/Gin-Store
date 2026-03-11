import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, User, Menu, X, ArrowLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartDropdown from './CartDropdown';

interface NavbarProps {
  cartCount: number;
}

export default function Navbar({ cartCount }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isCartOpen, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const isCheckout = location.pathname === '/checkout';
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Si el carrito está abierto y el clic NO fue dentro del contenedor del ref, lo cerramos
      if (isCartOpen && cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isCartOpen, setIsCartOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="w-full px-6">
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
              <span className="text-xl md:text-2xl font-black italic tracking-tighter">
                Gin sin nombre
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/presale" className={`font-medium transition-colors ${location.pathname === '/presale' ? 'text-gold-600' : 'text-neutral-700 hover:text-neutral-900'}`}>Preventa</Link>
            <span>-</span>
            <Link to="/" className={`font-medium transition-colors ${location.pathname === '/' ? 'text-gold-600' : 'text-neutral-700 hover:text-neutral-900'}`}>Inicio</Link>
            <Link to="/promos" className={`font-medium transition-colors ${location.pathname === '/promos' ? 'text-gold-600' : 'text-neutral-700 hover:text-neutral-900'}`}>Promos</Link>
            <Link to="/contacto" className={`font-medium transition-colors ${location.pathname === '/contacto' ? 'text-gold-600' : 'text-neutral-700 hover:text-neutral-900'}`}>Contacto</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {!isCheckout && (
              <>
                <button className="text-neutral-500 hover:text-neutral-900 transition-colors p-2 hidden sm:block">
                  <User size={20} />
                </button>
                <div className="relative" ref={cartRef}>
                  <button 
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="relative text-neutral-500 hover:text-neutral-900 transition-colors p-2 group"
                  >
                    <div className="bg-neutral-50 p-2 rounded-xl group-hover:bg-gold-50 transition-colors">
                      <ShoppingCart size={20} className="group-hover:text-gold-600 transition-colors" />
                    </div>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-black text-white bg-gold-500 rounded-full ring-2 ring-white">
                        {cartCount}
                      </span>
                    )}
                  </button>

                  {isCartOpen && (
                    <div className="z-[100] absolute right-0">
                      <CartDropdown />
                    </div>
                  )}
                </div>
                
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
              <Link to="/" className="text-sm font-black text-gold-600 hover:text-gold-700 underline underline-offset-4 hidden sm:block">
                Seguir comprando
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-neutral-100 ${isMenuOpen ? 'max-h-64 shadow-xl' : 'max-h-0'}`}>
        <div className="px-6 py-8 space-y-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className={`block text-lg font-bold ${location.pathname === '/' ? 'text-gold-600' : 'text-neutral-900'}`}>Inicio</Link>
          <Link to="/promos" onClick={() => setIsMenuOpen(false)} className={`block text-lg font-bold ${location.pathname === '/promos' ? 'text-gold-600' : 'text-neutral-500'}`}>Promos</Link>
          <Link to="/presale" onClick={() => setIsMenuOpen(false)} className={`block text-lg font-bold ${location.pathname === '/presale' ? 'text-gold-600' : 'text-neutral-500'}`}>Preventa</Link>
          <Link to="/contacto" onClick={() => setIsMenuOpen(false)} className={`block text-lg font-bold ${location.pathname === '/contacto' ? 'text-gold-600' : 'text-neutral-500'}`}>Contacto</Link>
          <button onClick={() => { setIsMenuOpen(false); setIsCartOpen(true); }} className="w-full bg-gold-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 mt-4">
            <ShoppingCart size={20} />
            Ver Carrito ({cartCount})
          </button>
        </div>
      </div>
    </nav>
  );
}
