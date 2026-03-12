import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState('Botellas');
  const location = useLocation();
  
  if (location.pathname === '/presale') return null;

  const isHome = location.pathname === '/';
  const isPromos = location.pathname === '/promos';

  if (!isHome && !isPromos) return null;

  return (
    <aside className="hidden md:flex flex-col w-[300px] bg-neutral-50 py-16 pl-6 pr-0 flex-shrink-0">
      <div className="flex-grow space-y-10">
        {/* Categories Section (Only Home/Products) */}
        {isHome && (
          <section className="space-y-4">
            <h3 className="font-semibold text-xl">Categorías</h3>
            <div className="space-y-2">
              {['Botellas', 'Merchandise', 'Kits'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`block w-full text-left px-4 py-2 rounded-xl transition-all ${cat === activeCategory ? 'bg-black text-white font-semibold' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Filters Section (Home and Promos) */}
        {(isHome || isPromos) && (
          <section className="space-y-4">
            <h3 className="font-semibold text-xl">Filtros</h3>
            

            {/* Sort By */}
            <div className="flex flex-col gap-2">
              <label>Ordenar por</label>
              <div className="relative group">
                <select className="w-full appearance-none bg-white border rounded-xl px-4 py-2 outline-none cursor-pointer">
                  <option>Recomendados</option>
                  <option>Menor Precio</option>
                  <option>Mayor Precio</option>
                  <option>Más nuevos</option>
                </select>
                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
              </div>
            </div>
          </section>
        )}
      </div>
    </aside>
  );
}
