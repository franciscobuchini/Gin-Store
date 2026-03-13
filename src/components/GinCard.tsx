import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { Product } from '../types/product';
import Badge from './Badge';
import { Button } from './Button';
import { formatPrice } from '../utils/format';

interface GinProductProps {
  product: Product;
  onAddToCart: () => void;
}

export default function GinCard({ product, onAddToCart }: GinProductProps) {
  const { image, name, price, ml, flavor } = product;
  const [cartState, setCartState] = useState<'idle' | 'loading' | 'added'>('idle');

  const handleAddToCart = () => {
    if (cartState !== 'idle') return;
    setCartState('loading');
    setTimeout(() => {
      onAddToCart();
      setCartState('added');
      setTimeout(() => setCartState('idle'), 1400);
    }, 600);
  };

  
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/10">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden flex items-center justify-center p-2 sm:p-4">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-2 right-2">
          <Badge className="bg-white/80 backdrop-blur-sm border-white/20 shadow-sm">
            {ml}ml
          </Badge>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 space-y-2">
        <h3 className="text-base font-bold text-neutral-900 group-hover:text-gold-600 transition-colors line-clamp-2">
          {name}
        </h3>
        
        <p className="text-neutral-500 text-xs  line-clamp-2 min-h-[2rem]">
          {flavor}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-neutral-900">
            ${formatPrice(price)}
          </span>
          <Button 
            onClick={handleAddToCart}
            disabled={cartState !== 'idle'}
            size="icon"
            variant={
              cartState === 'added' ? 'success' :
              cartState === 'loading' ? 'loading' :
              'primary'
            }
            className="w-8 h-8 rounded-lg !p-0"
          >
            {cartState === 'added' ? (
              <Icon icon="ph:check-bold" width="16" height="16" />
            ) : cartState === 'loading' ? (
              <span className="flex gap-[3px] items-center">
                <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce [animation-delay:0ms]" />
                <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce [animation-delay:150ms]" />
                <span className="w-1 h-1 rounded-full bg-neutral-400 animate-bounce [animation-delay:300ms]" />
              </span>
            ) : (
              <Plus size={16} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
