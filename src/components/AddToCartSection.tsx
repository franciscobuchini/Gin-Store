import { Icon } from '@iconify/react';
import { Button } from './Button';

interface AddToCartSectionProps {
  quantity: number;
  onQuantityChange: (delta: number) => void;
  onAddToCart: () => void;
  cartState: 'idle' | 'loading' | 'added';
}

export default function AddToCartSection({
  quantity,
  onQuantityChange,
  onAddToCart,
  cartState
}: AddToCartSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      {/* Quantity Selector - Subtle and refined */}
      <div className="flex items-center justify-between sm:justify-start bg-white rounded-xl border border-neutral-200 h-14 shadow-sm px-1 sm:px-0">
        <button 
          onClick={() => onQuantityChange(-1)}
          disabled={quantity <= 1 || cartState !== 'idle'}
          className="w-12 h-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 disabled:opacity-30 transition-colors"
        >
          <Icon icon="ph:minus-bold" width="16" />
        </button>
        
        <div className="w-12 flex items-center justify-center">
          <span className="text-base font-bold text-neutral-900 tabular-nums">
            {quantity}
          </span>
        </div>

        <button 
          onClick={() => onQuantityChange(1)}
          disabled={cartState !== 'idle'}
          className="w-12 h-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 disabled:opacity-30 transition-colors"
        >
          <Icon icon="ph:plus-bold" width="16" />
        </button>
      </div>

      {/* Add to Cart Button - Clean and sober */}
      <Button 
        onClick={onAddToCart}
        disabled={cartState !== 'idle'}
        variant={
          cartState === 'added' ? 'success' :
          cartState === 'loading' ? 'loading' :
          'neutral'
        }
        className="flex-grow h-14 rounded-xl text-sm font-bold shadow-sm"
      >
        {cartState === 'added' ? (
          <span className="flex items-center gap-2">
            <Icon icon="ph:check-bold" width="18" /> ¡Reservado!
          </span>
        ) : cartState === 'loading' ? (
          <span className="flex items-center justify-center h-full"> {/* Adjust loading dots spacing */}
             <span className="flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:300ms]" />
            </span>
          </span>
        ) : (
          "Reservar ahora"
        )}
      </Button>
    </div>
  );
}
