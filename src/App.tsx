import Navbar from './components/Navbar'
import Footer from './components/Footer'
import GinCard from './components/GinCard'

// Importación de imágenes de las botellas
import gin1 from './assets/1.webp'
import gin2 from './assets/2.webp'
import gin3 from './assets/3.webp'
import gin4 from './assets/4.webp'
import gin5 from './assets/5.webp'

const GIN_PRODUCTS = [
  {
    id: 1,
    name: "Gin Heredero",
    image: gin1,
    price: 4500,
    ml: 750,
    flavor: "Enebro intenso con notas cítricas de bergamota y un final especiado."
  },
  {
    id: 2,
    name: "London Dry Gin",
    image: gin2,
    price: 5200,
    ml: 700,
    flavor: "Infusión de pétalos de rosa y frutos rojos, dulce y suave al paladar."
  },
  {
    id: 3,
    name: "Gordon's Gin",
    image: gin3,
    price: 4800,
    ml: 750,
    flavor: "Explosión de lima, limón siciliano y un toque de jengibre fresco."
  },
  {
    id: 4,
    name: "Royale Gin",
    image: gin4,
    price: 5500,
    ml: 750,
    flavor: "Mezcla secreta de hierbas serranas, romero y un toque de cardamomo."
  },
  {
    id: 5,
    name: "Malaria Gin",
    image: gin5,
    price: 6000,
    ml: 700,
    flavor: "Destilado con botánicos marinos y pimienta rosa, con un toque salino único."
  }
];

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      
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
                image={product.image}
                name={product.name}
                price={product.price}
                ml={product.ml}
                flavor={product.flavor}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
