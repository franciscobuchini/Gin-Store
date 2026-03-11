import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import { useCart } from './hooks/useCart'

function AppContent() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <Footer />

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div 
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900">Tu Carrito</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 p-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  </div>
                  <div>
                    <p className="text-neutral-900 font-bold text-lg">Tu carrito está vacío</p>
                    <p className="text-neutral-500 text-sm">¿Todavía no has elegido tu gin favorito?</p>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-neutral-900">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                        </button>
                      </div>
                      <p className="text-sm text-neutral-500">{item.ml}ml</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-2 py-1 hover:bg-neutral-50 text-neutral-600"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-sm font-medium border-x border-neutral-200">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-2 py-1 hover:bg-neutral-50 text-neutral-600"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-neutral-900">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-100 bg-neutral-50 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-neutral-600">Total</span>
                  <span className="font-black text-neutral-900">${cartTotal.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      )}
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
