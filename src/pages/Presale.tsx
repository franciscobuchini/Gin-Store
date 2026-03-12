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
    <main className="flex-grow p-6 md:p-16 md:pt-2 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden border border-neutral-100 shadow-2xl shadow-gold-500/10">
        
        {/* Product Image Section */}
        <div className="relative bg-neutral-50 flex items-center justify-center p-8 md:p-16 overflow-hidden border-b md:border-b-0 md:border-r border-neutral-100">
          <div className="absolute top-8 left-8">
            <span className="bg-gold-500 text-white text-[10px] font-black  tracking-[0.2em] px-4 py-2 rounded-full shadow-lg shadow-gold-500/30">
              Unidades disponibles: 100
            </span>
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
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400"></span>
              <span className="text-gold-600 font-bold  tracking-[0.3em] text-[10px]">Preventa exclusiva</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-neutral-900 leading-none">
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

          <p className="text-neutral-500 text-lg leading-relaxed italic">
            No buscamos que nos reconozcan por fuera, sino por dentro. Un nombre que aún no podes pronunciar, pero un sabor que no vas a olvidar. <br /> Sin etiquetas, sin nombre, solor sabor <br /> Sé de los primeros en descubrirlo. 
              <p className="font-medium">Fecha de lanzamiento: 04/04.</p>
          </p>

          <div className="pt-4 space-y-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-neutral-900">
                ${formatPrice(product.price)}
              </span>
              <span className="text-neutral-400 line-through text-xl">
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
