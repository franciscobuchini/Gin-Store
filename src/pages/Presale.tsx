import { useCart } from '../hooks/useCart';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import presaleBottle from '../assets/GinBottle.png';

export default function Presale() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  
  // Producto específico para la preventa
  const product = {
    id: 999, // ID único para preventa
    name: "Gin sin Nombre",
    image: presaleBottle,
    price: 18500,
    ml: 750,
    flavor: ""
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="flex-grow p-6 md:p-16 md:pt-2 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] overflow-hidden border border-neutral-100 shadow-2xl shadow-gold-500/10">
        
        {/* Product Image Section */}
        <div className="relative bg-neutral-50 flex items-center justify-center p-8 md:p-16 overflow-hidden border-b md:border-b-0 md:border-r border-neutral-100">
          <div className="absolute top-8 left-8">
            <span className="bg-gold-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg shadow-gold-500/30">
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
              <span className="text-gold-600 font-bold uppercase tracking-[0.3em] text-[10px]">Edición Limitada</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-neutral-900 leading-none">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-bold text-neutral-400 border border-neutral-200 px-3 py-1 rounded-full">
                {product.ml}ml
              </span>
              <div className="flex text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <p className="text-neutral-500 text-lg leading-relaxed">
            No buscamos que nos reconozcan por fuera, sino por dentro. Un nombre que aún no podes pronunciar, pero un sabor que no vas a olvidar. <br /> Sin etiquetas, sin nombre, solor sabor <br /> Sé de los primeros en descubrirlo. Fecha de lanzamiento: 04/04/2026.
          </p>

          <div className="pt-4 space-y-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-neutral-900">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-neutral-400 line-through text-xl">
                ${(product.price * 1.25).toLocaleString()}
              </span>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={added}
              className={`w-full group relative overflow-hidden font-black uppercase tracking-widest py-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 ${
                added 
                ? 'bg-green-500 text-white cursor-default' 
                : 'bg-neutral-900 text-white hover:bg-gold-600 hover:-translate-y-1 shadow-2xl hover:shadow-gold-600/20'
              }`}
            >
              {added ? (
                <>
                  <Icon icon="ph:check-bold" width="24" height="24" />
                  Agregado al carrito
                </>
              ) : (
                <>
                  <Icon icon="ph:shopping-cart-simple-bold" width="24" height="24" />
                  Reservar Ahora
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
              * Envío gratís en preventa | Stock limitado a 100 unidades
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
