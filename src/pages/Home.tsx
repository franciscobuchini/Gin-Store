import GinCard from '../components/GinCard'
import { GIN_PRODUCTS } from '../data/stock'
import { useCart } from '../hooks/useCart'
import { useStore } from '../hooks/useStore'
import { Package } from 'lucide-react'

function Home() {
  const { addToCart } = useCart();
  const { activeCategory } = useStore();

  const filteredProducts = GIN_PRODUCTS.filter(product => {
    if (activeCategory === 'Todos') return true;
    const cat = product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1).toLowerCase() : 'Otros';
    return cat === activeCategory;
  });

  return (
    <main className="flex-grow p-16">
      {/* Product Grid Responsive */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <GinCard 
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center text-neutral-400">
          <Package className="w-12 h-12 mb-4 text-neutral-300" strokeWidth={1.5} />
          <p className="text-lg font-medium">No hay productos en esta categoría</p>
          <p className="text-sm">Vuelve pronto para descubrir nuevas opciones.</p>
        </div>
      )}
    </main>
  );
}

export default Home;
