import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import HeaderBanner from './components/HeaderBanner'
import Home from './pages/Home'
import Promos from './pages/Promos'
import Contacto from './pages/Contacto'
import Checkout from './pages/Checkout'
import Presale from './pages/Presale'
import NotFound from './pages/NotFound'
import { useCart } from './hooks/useCart'
import CartDropdown from './components/CartDropdown'
import CategoryMobileNav from './components/CategoryMobileNav'
import ScrollToTop from './components/ScrollToTop'

function AppContent() {
  const { cartCount, isCartOpen } = useCart();
  const location = useLocation();

  const isPresale = location.pathname === '/presale';
  const knownRoutes = ['/', '/promos', '/contacto', '/checkout', '/presale'];
  const isNotFound = !knownRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans selection:bg-gold-100 selection:text-gold-900">
      <Navbar cartCount={cartCount} />
      
      {isCartOpen && <CartDropdown />}
      
      <main className="flex-grow">
        {!isPresale && !isNotFound && <HeaderBanner />}
        
        {location.pathname === '/' && <CategoryMobileNav />}

        <div className={`flex w-full ${isPresale ? 'pt-8 md:pt-12' : 'px-0 sm:px-4 md:px-6 py-6'}`}>
          <Sidebar />
          
          <div className="flex-grow flex flex-col min-w-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/promos" element={<Promos />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/presale" element={<Presale />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App
