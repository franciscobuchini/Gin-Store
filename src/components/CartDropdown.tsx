import { Trash2, Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import FreeShippingProgress from './FreeShippingProgress';
import { formatPrice } from '../utils/format';
import { Button } from './Button';

export default function CartDropdown() {
  const { cart, removeFromCart, updateQuantity, cartTotal, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop for closing on desktop/mobile click-outside */}
      <div 
        className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Container */}
      <div className="fixed inset-0 z-[100] bg-white flex flex-col sm:inset-auto sm:top-24 sm:right-6 sm:w-96 sm:h-auto sm:max-h-[80vh] sm:rounded-3xl sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] sm:border border-neutral-100 overflow-hidden animate-in fade-in slide-in-from-right-4 sm:slide-in-from-top-4 duration-300">
        <div className="p-4 border-b border-neutral-50 flex items-center justify-between bg-neutral-50/50 shrink-0">
          <h3 className="font-bold text-neutral-900 flex items-center gap-2">
            <ShoppingCart size={18} className="text-gold-500" />
            Mi Carrito
          </h3>
          <Button 
            onClick={() => setIsCartOpen(false)}
            size="icon"
            variant="ghost"
            className="text-neutral-400 hover:bg-neutral-100 rounded-full"
          >
            <X size={18} />
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="py-12 text-center h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mb-4">
                <ShoppingCart size={32} />
              </div>
              <p className="text-neutral-900 font-bold text-lg">Carrito vacío</p>
              <p className="text-neutral-500">Agregá algo rico para empezar</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 bg-neutral-50 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2 border border-neutral-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-grow min-w-0 flex flex-col justify-between py-0.5">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-neutral-900 truncate pr-2">{item.name}</h4>
                    <Button 
                      onClick={() => removeFromCart(item.id)}
                      size="icon"
                      variant="ghost"
                      className="text-neutral-300 hover:bg-neutral-100 -mt-1 -mr-1 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center bg-neutral-50 rounded-lg p-0.5 border border-neutral-100">
                      <Button 
                        onClick={() => updateQuantity(item.id, -1)}
                        size="icon"
                        variant="ghost"
                        className="w-7 h-7 p-0 hover:text-gold-600 rounded-md"
                      >
                        <Minus size={12} />
                      </Button>
                      <span className="w-8 text-center text-sm font-bold text-neutral-700">{item.quantity}</span>
                      <Button 
                        onClick={() => updateQuantity(item.id, 1)}
                        size="icon"
                        variant="ghost"
                        className="w-7 h-7 p-0 hover:text-gold-600 rounded-md"
                      >
                        <Plus size={12} />
                      </Button>
                    </div>
                    <span className="font-black text-gold-600">
                      ${formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-neutral-100 space-y-4 shrink-0 pb-10 sm:pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
            <FreeShippingProgress />
            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-medium">Total estimado</span>
              <span className="font-black text-neutral-900 text-2xl">${formatPrice(cartTotal)}</span>
            </div>
            <Button 
              onClick={handleCheckout}
              variant="primary"
              fullWidth
              size="big"
              className="shadow-xl shadow-gold-500/20"
            >
              Continuar al pago
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
