import { useCart } from '../hooks/useCart';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import presaleBottle from '../assets/GinBottle.png';
import Badge from '../components/Badge';
import { Button } from '../components/Button';
import { formatPrice } from '../utils/format';

export default function Presale() {
  const { addToCart } = useCart();
  const [cartState, setCartState] = useState<'idle' | 'loading' | 'added'>('idle');

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
      addToCart(product);
      setCartState('added');
      setTimeout(() => setCartState('idle'), 1400);
    }, 600);
  };

  return (
    <main className="flex-grow p-2 md:p-12 xl:p-16 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white p-5 md:p-12 rounded-[2.5rem] overflow-hidden border border-neutral-100 shadow-2xl shadow-gold-500/5">
        
        {/* Product Image Section */}
        <div className="relative bg-neutral-50 flex items-center justify-center p-8 md:p-16 overflow-hidden border-b md:border-b-0 md:border-r border-neutral-100">
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
            className="w-full h-auto max-w-[400px] object-contain drop-shadow-[0_20px_50px_rgba(185,154,65,0.2)] hover:scale-105 transition-transform duration-700"
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
            <h1 className="text-4xl md:text-6xl font-black text-neutral-900 ">
              {product.name}
            </h1>
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

          <div className="text-neutral-500 text-lg  italic space-y-2">
            <p>
              No buscamos que nos reconozcan por fuera, sino por dentro. Un nombre que aún no podes pronunciar, pero un sabor que no vas a olvidar. <br /> Sin etiquetas, sin nombre, solo sabor <br /> Sé de los primeros en descubrirlo. 
            </p>
            <p className="not-italic font-semibold text-neutral-900 uppercase text-sm tracking-widest mt-4">
              Fecha de lanzamiento: 04/04
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

            <Button 
              onClick={handleAddToCart}
              disabled={cartState !== 'idle'}
              size="big"
              variant={
                cartState === 'added' ? 'success' :
                cartState === 'loading' ? 'loading' :
                'neutral'
              }
              className="group relative overflow-hidden w-full"
            >
              {cartState === 'added' ? (
                <>
                  <Icon icon="ph:check-bold" width="24" height="24" />
                  Agregado al carrito
                </>
              ) : cartState === 'loading' ? (
                <span className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:300ms]" />
                </span>
              ) : (
                <>
                  <Icon icon="ph:shopping-cart-simple-bold" width="24" height="24" />
                  Reservar Ahora
                </>
              )}
            </Button>
            <p className="text-center text-xs text-neutral-400 font-medium tracking-wider">
              Prohibida su venta a menores de 18 años
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
