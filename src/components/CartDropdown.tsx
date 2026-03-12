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
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <div className="p-4 border-b border-neutral-50 flex items-center justify-between bg-neutral-50/50">
        <h3 className="font-bold text-neutral-900 flex items-center gap-2">
          <ShoppingCart size={18} className="text-gold-500" />
          Mi Carrito
        </h3>
        <Button 
          onClick={() => setIsCartOpen(false)}
          size="icon"
          variant="ghost"
          className="text-neutral-400"
        >
          <X size={18} />
        </Button>
      </div>

      <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
        {cart.length === 0 ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mx-auto mb-3">
              <ShoppingCart size={24} />
            </div>
            <p className="text-neutral-900 font-bold">Carrito vacío</p>
            <p className="text-neutral-500 text-sm">Agregá algo rico para empezar</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex gap-3 group">
              <div className="w-16 h-16 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-1 border border-neutral-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-neutral-900 text-sm truncate pr-2">{item.name}</h4>
                  <Button 
                    onClick={() => removeFromCart(item.id)}
                    size="icon"
                    variant="ghost"
                    className="text-neutral-300 hover:bg-neutral-100"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-neutral-50 rounded-lg p-0.5">
                    <Button 
                      onClick={() => updateQuantity(item.id, -1)}
                      size="icon"
                      variant="ghost"
                      className="p-1 hover:text-gold-600 hover:bg-neutral-200"
                    >
                      <Minus size={12} />
                    </Button>
                    <span className="w-6 text-center text-xs font-bold text-neutral-700">{item.quantity}</span>
                    <Button 
                      onClick={() => updateQuantity(item.id, 1)}
                      size="icon"
                      variant="ghost"
                      className="p-1 hover:text-gold-600 hover:bg-neutral-200"
                    >
                      <Plus size={12} />
                    </Button>
                  </div>
                  <span className="font-bold text-gold-600 text-sm">
                    ${formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-4 bg-neutral-50 border-t border-neutral-100 space-y-3">
          <FreeShippingProgress />
          <div className="flex items-center justify-between pt-2">
            <span className="text-neutral-500 font-medium text-sm">Total estimado</span>
            <span className="font-black text-neutral-900 text-lg">${formatPrice(cartTotal)}</span>
          </div>
          <Button 
            onClick={handleCheckout}
            variant="primary"
            fullWidth
          >
            Continuar
          </Button>
        </div>
      )}
    </div>
  );
}
