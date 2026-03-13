import { useCart } from '../hooks/useCart';
import { GIN_PRODUCTS } from '../data/stock';
import GinCard from '../components/GinCard';

export default function Promos() {
  const { addToCart } = useCart();
  return (
    <main className="flex-grow p-2 sm:p-4 md:p-8">
      {/* Product Grid Responsive */}
            <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
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
