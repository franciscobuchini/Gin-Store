import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import type { Product } from '../types/product';

interface GinProductProps {
  product: Product;
  onAddToCart: () => void;
}

export default function GinCard({ product, onAddToCart }: GinProductProps) {
  const { image, name, price, ml, flavor } = product;
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  
  return (
    <div className="group relative bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-gold-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/5">
      {/* Product Image */}
      <div className="aspect-square overflow-hidden flex items-center justify-center p-4">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base font-bold text-neutral-900 group-hover:text-gold-600 transition-colors line-clamp-1">
            {name}
          </h3>
          <span className="text-[10px] text-neutral-400 font-medium whitespace-nowrap bg-neutral-100 px-1.5 py-0.5 rounded uppercase">
            {ml}ml
          </span>
        </div>
        
        <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2 min-h-[2rem]">
          {flavor}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-neutral-900">
            ${price.toLocaleString()}
          </span>
          <button 
            onClick={handleAddToCart}
            disabled={added}
            className={`flex items-center justify-center w-8 h-8 rounded-lg font-semibold transition-all active:scale-95 shadow-sm ${
              added 
                ? 'bg-green-500 text-white cursor-default' 
                : 'bg-gold-500 hover:bg-gold-600 text-white shadow-gold-500/20'
            }`}
          >
            {added ? (
              <Icon icon="ph:check-bold" width="16" height="16" />
            ) : (
              <Plus size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
