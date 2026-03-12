import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/format';

export default function FreeShippingProgress() {
  const { cartTotal } = useCart();
  
  const FREE_SHIPPING_THRESHOLD = 50000;
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  return (
    <div className="p-4 rounded-xl w-full">
      <div className="flex justify-between text-xs font-medium mb-2">
        <span>
          {remaining > 0 
            ? `Te faltan $${formatPrice(remaining)} para el Envío Gratis` 
            : '¡Envío Gratis Activado!'}
        </span>
      </div>
      <div className="h-1.5 bg-white rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gold-500 transition-all duration-700 ease-out shadow-sm" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
