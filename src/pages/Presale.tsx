import { useCart } from '../hooks/useCart';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import presaleBottle from '../assets/GinBottle.png';
import Badge from '../components/Badge';
import { Button } from '../components/Button';
import { formatPrice } from '../utils/format';

export default function Presale() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [cartState, setCartState] = useState<'idle' | 'loading' | 'added'>('idle');
  const [quantity, setQuantity] = useState(1);

  // Producto específico para la preventa
  const product = {
    id: 999,
    name: "Gin sin Nombre",
    image: presaleBottle,
    price: 18500,
    ml: 750,
    flavor: ""
  };

  const handleAddToCart = () => {
    if (cartState !== 'idle') return;
    setCartState('loading');
    setTimeout(() => {
      addToCart(product, quantity);
      setCartState('added');
      // Redirect to checkout after a brief moment to show the success state
      setTimeout(() => navigate('/checkout-presale'), 800);
    }, 600);
  };

  const handleQuantity = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Product Image Section */}
        <div className="relative flex items-center justify-center p-8 md:p-16 overflow-hidden">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 md:hidden z-10 w-full text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-6 bg-gold-400"></span>
              <span className="text-gold-600 font-bold tracking-[0.3em] text-[10px] uppercase">Preventa exclusiva</span>
              <span className="h-px w-6 bg-gold-400"></span>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:top-8 md:left-8 md:bottom-auto z-10">
            <Badge variant="gold" className="px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold tracking-[0.15em] whitespace-nowrap">
              Unidades disponibles: 100
            </Badge>
          </div>
          
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-auto max-w-[600px] object-contain drop-shadow-[0_20px_50px_rgba(185,154,65,0.2)] hover:scale-105 transition-transform duration-700"
          />
          
          {/* Subtle reflection effect */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent opacity-60"></div>
        </div>

        {/* Product Details Section */}
        <div className="p-8 md:p-16 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="hidden md:flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400"></span>
              <span className="text-gold-600 font-bold tracking-[0.3em] text-[10px] uppercase">Preventa exclusiva</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge>
                {product.ml}ml
              </Badge>
              <div className="flex items-center gap-0.5 text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} icon="ph:star-fill" className="w-4 h-4" />
                ))}
              </div>
            </div>
          </div>

          <div className="text-neutral-500 text-lg italic space-y-2">
            <p>
              No buscamos que nos reconozcan por fuera, sino por dentro. Un nombre que aún no podes pronunciar, pero <br /> <span className="font-black"> un sabor que no vas a olvidar</span>. <br /> Sin etiquetas, sin nombre, solo sabor. <br /> Sé de los primeros en descubrirlo. 
            </p>
            <p className="not-italic font-semibold text-neutral-900 uppercase text-sm tracking-widest mt-4">
              Fecha de lanzamiento: 11/04
            </p>
          </div>

          <div className="pt-4 space-y-6">
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <span className="text-4xl md:text-6xl font-black text-neutral-900 ">
                ${formatPrice(product.price)}
              </span>
              <span className="text-neutral-400 line-through text-lg md:text-2xl font-medium">
                ${formatPrice(product.price * 1.25)}
              </span>
            </div>

            <div className="flex gap-4 items-center">
              {/* Quantity Selector - Black themed, refined size */}
              <div className="flex-grow flex items-center justify-between bg-neutral-950 rounded-2xl px-3 h-16 md:h-20 border border-white/10">
                <Button 
                  onClick={() => handleQuantity(-1)}
                  variant="ghost" 
                  size="icon"
                  className="rounded-xl hover:bg-white/10 h-12 w-12 text-white/50 hover:text-white"
                  disabled={quantity <= 1 || cartState !== 'idle'}
                >
                  <Icon icon="ph:minus" width="24" height="24" />
                </Button>
                
                <span className="text-xl md:text-2xl font-black italic tracking-tighter tabular-nums text-white">
                  {quantity}
                </span>

                <Button 
                  onClick={() => handleQuantity(1)}
                  variant="ghost" 
                  size="icon"
                  className="rounded-xl hover:bg-white/10 h-12 w-12 text-white/50 hover:text-white"
                  disabled={cartState !== 'idle'}
                >
                  <Icon icon="ph:plus" width="24" height="24" />
                </Button>
              </div>

              {/* Add to Cart Button - Gold & Larger Icon */}
              <Button 
                onClick={handleAddToCart}
                disabled={cartState !== 'idle'}
                size="big"
                variant={
                  cartState === 'added' ? 'success' :
                  cartState === 'loading' ? 'loading' :
                  'primary'
                }
                className="group relative overflow-hidden w-16 md:w-20 h-16 md:h-20 flex-shrink-0 rounded-[2rem] shadow-lg shadow-gold-500/20"
              >
                {cartState === 'added' ? (
                  <Icon icon="ph:check-bold" width="32" height="32" />
                ) : cartState === 'loading' ? (
                  <span className="flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:150ms]" />
                  </span>
                ) : (
                  <Icon icon="ph:shopping-cart-simple-bold" width="40" height="40" />
                )}
              </Button>
            </div>
            <p className="text-center text-xs text-neutral-400 font-medium tracking-wider">
              Prohibida su venta a menores de 18 años
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
