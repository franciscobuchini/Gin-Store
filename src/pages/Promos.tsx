import { useCart } from '../hooks/useCart';
import { GIN_PRODUCTS } from '../data/stock';
import GinCard from '../components/GinCard';

export default function Promos() {
  const { addToCart } = useCart();
  return (
    <main className="flex-grow p-2 md:p-8">
      {/* Product Grid Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 md:gap-6">
              {GIN_PRODUCTS.map((product) => (
                <GinCard 
                  key={product.id}
                  product={product}
                  onAddToCart={() => addToCart(product)}
                />
              ))}
            </div>
    </main>
  );
}
