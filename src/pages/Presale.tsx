import { useCart } from '../hooks/useCart';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import presaleBottle from '../assets/GinBottle.webp';
import Badge from '../components/Badge';
import { formatPrice } from '../utils/format';
import AddToCartSection from '../components/AddToCartSection';

export default function Presale() {
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [cartState, setCartState] = useState<'idle' | 'loading' | 'added'>('idle');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(17900); // Precio por defecto mientras carga

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data.price) setPrice(data.price);
      })
      .catch(err => console.error('Error fetching price:', err));
  }, []);

  // Producto específico para la preventa
  const product = {
    id: 999,
    name: "Gin sin Nombre",
    image: presaleBottle,
    price: price, // Usamos el precio que viene de la API
    ml: 750,
    flavor: ""
  };

  const handleAddToCart = () => {
    if (cartState !== 'idle') return;
    setCartState('loading');
    setTimeout(() => {
      clearCart();
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
    <main className="flex-grow flex items-start sm:items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl flex flex-col md:grid md:grid-cols-2 bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gold-900/5">
        
        {/* Product Image Section */}
        <div className="relative flex items-center justify-center p-8 sm:p-12 md:p-16 bg-neutral-50/50 min-h-[380px] sm:min-h-0">
          
          {/* Mobile Labels */}
          <div className="absolute top-2 left-6 md:hidden z-10 flex flex-col gap-2">
            <span className="text-gold-600 font-bold text-xs uppercase tracking-widest">Preventa Exclusiva</span>
          </div>

          <div className="absolute bottom-6 left-6 md:translate-x-0 md:top-8 md:left-8 md:bottom-auto z-10">
            <Badge variant="danger">
              Unidades disponibles: 20
            </Badge>
          </div>
          
          <img 
            src={product.image} 
            alt={product.name}
            className="w-[150px] sm:w-[200px] h-auto  object-contain drop-shadow-[0_32px_64px_rgba(185,154,65,0.15)] hover:scale-105 transition-transform duration-700 pointer-events-none"
          />
          
          {/* Subtle reflection effect */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-50/80 to-transparent opacity-60"></div>
        </div>

        {/* Product Details Section */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-8 sm:space-y-10">
          <div className="space-y-4 sm:space-y-6">
            <div className="hidden md:flex items-center gap-3">
              <span className="h-px w-8 bg-gold-400"></span>
              <span className="text-gold-600 font-bold text-sm whitespace-nowrap">Preventa Exclusiva</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black italic tracking-tighter text-neutral-900 leading-none">
              Gin sin nombre
            </h1>
            
            <div className="flex flex-wrap items-center gap-4">
              <Badge >
                {product.ml}ml
              </Badge>
              <div className="flex items-center gap-1 text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} icon="ph:star-fill" className="w-4 h-4" />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-neutral-500 text-base italic leading-relaxed">
              No buscamos que nos reconozcan por fuera, sino por dentro. Un nombre que aún no podes pronunciar, pero <span className="font-bold">un sabor que no vas a olvidar</span>.
            </p>
            <p className="text-neutral-500 text-base italic leading-relaxed">
              Sin etiquetas, sin nombre, solo sabor. Sé de los primeros en descubrirlo. 
            </p>
            <p className="font-bold text-neutral-500 text-base italic leading-relaxed">
              Lanzamiento: 11 de abril.
            </p>
          </div>

          <div className="pt-2 sm:pt-4 space-y-6 sm:space-y-8">
            <div className="flex flex-wrap items-end gap-4 sm:gap-6 text-neutral-900">
              <span className="text-4xl sm:text-4xl font-black tracking-tighter tabular-nums leading-none">
                ${formatPrice(product.price)}
              </span>
              <span className="text-neutral-400 line-through text-lg sm:text-xl font-bold italic tracking-tighter leading-none pb-1">
                ${formatPrice(22000)}
              </span>
            </div>

            <AddToCartSection
              quantity={quantity}
              onQuantityChange={handleQuantity}
              onAddToCart={handleAddToCart}
              cartState={cartState}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
