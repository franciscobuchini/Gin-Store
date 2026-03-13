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
import { useCart } from './hooks/useCart'
import CartDropdown from './components/CartDropdown'

function AppContent() {
  const { cartCount, isCartOpen } = useCart();
  const location = useLocation();

  const isPresale = location.pathname === '/presale';

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans selection:bg-gold-100 selection:text-gold-900">
      <Navbar cartCount={cartCount} />
      
      {isCartOpen && <CartDropdown />}
      
      {!isPresale && <HeaderBanner />}

      <div className={`flex flex-grow w-full ${isPresale ? 'pt-24 md:pt-32' : 'px-2 md:px-6 py-6 overflow-hidden'}`}>
        <Sidebar />
        
        <div className="flex-grow flex flex-col min-w-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/promos" element={<Promos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/presale" element={<Presale />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
