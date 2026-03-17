import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CheckoutPresale from './pages/CheckoutPresale'
import Presale from './pages/Presale'
import Countdown from './components/Countdown'
import Footer from './components/Footer'
import StockAlertModal from './components/StockAlertModal'

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 font-sans selection:bg-gold-100 selection:text-gold-900">
      <StockAlertModal />
      <Countdown />
      <main className="flex-grow">
        <div className="flex w-full">
          <div className="flex-grow flex flex-col min-w-0">
            <Routes>
              <Route path="/" element={<Presale />} />
              <Route path="/checkout-presale" element={<CheckoutPresale />} />
              <Route path="/presale" element={<Presale />} />
              <Route path="*" element={<Navigate to="/" replace />} />
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
      <AppContent />
    </Router>
  );
}

export default App
