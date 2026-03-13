import { useMemo } from 'react';
import { useStore } from '../hooks/useStore';
import { GIN_PRODUCTS } from '../data/stock';

export default function CategoryMobileNav() {
  const { activeCategory, setActiveCategory } = useStore();

  const uniqueCategories = useMemo(() => {
    const categories = Array.from(new Set(GIN_PRODUCTS.map(p => 
      p.category ? p.category.charAt(0).toUpperCase() + p.category.slice(1).toLowerCase() : 'Otros'
    ))).sort();
    return ['Todos', ...categories];
  }, []);

  return (
    <nav className="md:hidden sticky top-[4rem] z-40 bg-white pt-1.5 mb-4 border-t border-white/10">
      <div className="flex overflow-x-auto no-scrollbar gap-6 px-4 pt-3 items-center flex-nowrap whitespace-nowrap">
        {uniqueCategories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                shrink-0 pb-2 text-sm transition-all duration-200 border-b-3 
                ${isActive 
                  ? 'text-neutral-900 border-neutral-900 font-bold' 
                  : 'text-neutral-400 border-transparent font-normal'}
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
