import GinCard from '../components/GinCard'
import { GIN_PRODUCTS } from '../data/stock'
import { useCart } from '../hooks/useCart'

function Home() {
  const { addToCart } = useCart();

  return (
    <main className="flex-grow pt-20 md:pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section Simplified */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x py-2 leading-tight">
            GinStore
          </h1>
          <p className="mt-4 md:mt-6 text-neutral-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Selección exclusiva de gines artesanales. Destilados con pasión, diseñados para el paladar más exigente.
          </p>
        </div>

        {/* Section Divider/Title */}
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-xl md:text-2xl font-bold text-neutral-900">Nuestras Botellas</h2>
          <div className="h-px flex-grow mx-4 bg-neutral-200 hidden sm:block"></div>
          <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Filtrar</button>
        </div>

        {/* Product Grid Responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {GIN_PRODUCTS.map((product) => (
            <GinCard 
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
