import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';

import { useState } from 'react';
import presaleBottle from '../assets/GinBottle.webp';
import type { Coupon } from '../types/coupon';
import WhatsAppButton from '../components/WhatsAppButton';

import { Icon } from '@iconify/react';

export default function CheckoutPresale() {
  const { cart, cartTotal, updateQuantity } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  // Find the presale item specifically to avoid issues with other items in cart
  const presaleItem = cart.find(item => item.id === 999) || cart[0];

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percentage') {
      return (cartTotal * appliedCoupon.discount) / 100;
    }
    return appliedCoupon.discount;
  };

  const discountAmount = calculateDiscount();
  const finalTotal = cartTotal - discountAmount;

  const handleVerifyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    setIsValidating(true);
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      
      if (data.valid) {
        setAppliedCoupon(data.coupon);
      } else {
        setAppliedCoupon(null);
        alert('Cupón no válido');
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      alert('Error en el servidor');
    } finally {
      setIsValidating(false);
    }
  };



  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Tu carrito está vacío</h2>
        <Link to="/" className="bg-gold-500 text-white px-6 py-2 rounded-lg font-bold">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <main className="flex-grow flex items-start sm:items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-xl space-y-6 sm:space-y-8">

        {/* Back Link */}
        <div className="mb-2 sm:mb-4">
          <Link to="/" className="inline-flex items-center text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-colors">
            <Icon icon="ph:arrow-left-bold" width="16" className="mr-2" />
            Volver a preventa
          </Link>
        </div>

        {/* Order Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            {/* Product Brief */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-neutral-50">
              <div className="shrink-0 p-3 bg-neutral-50 rounded-xl border border-neutral-100 w-24 h-24 flex items-center justify-center">
                <img src={presaleBottle} alt={presaleItem?.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-grow text-center sm:text-left space-y-4">
                <h2 className="font-bold text-neutral-900 text-lg">{presaleItem?.name}</h2>
                <p className="text-xs text-neutral-400 font-medium">750ml • Edición Lanzamiento</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 mt-4">
                  <div className="flex items-center bg-neutral-50 rounded-lg border border-neutral-100 p-0.5">
                    <button 
                      type="button"
                      onClick={() => updateQuantity(presaleItem?.id, -1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-white rounded-md transition-colors disabled:opacity-20"
                      disabled={presaleItem?.quantity <= 1}
                    >
                      <Icon icon="ph:minus" width="16" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm">{presaleItem?.quantity}</span>
                    <button 
                      type="button"
                      onClick={() => updateQuantity(presaleItem?.id, 1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                    >
                      <Icon icon="ph:plus" width="16" />
                    </button>
                  </div>
                  <span className="font-black text-lg text-neutral-900 tabular-nums">${formatPrice(presaleItem?.price * presaleItem?.quantity)}</span>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="space-y-1 pt-3">
              
              {appliedCoupon && (
                <div className="flex justify-between text-base text-green-600">
                  <span>Descuento ({appliedCoupon.code})</span>
                  <span className="tabular-nums font-medium">-${formatPrice(discountAmount)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-3">
                <span className="text-lg font-semibold text-neutral-900">Total</span>
                <span className="text-xl font-semibold text-neutral-900 tabular-nums">
                  ${formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Coupon and CTA */}
            <div className="pt-8 space-y-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow">
                  <input 
                    type="text"
                    placeholder="Código de descuento" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 h-14 text-sm font-medium outline-none focus:border-gold-500 transition-all placeholder:text-neutral-400"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleVerifyCoupon}
                  disabled={isValidating}
                  className="w-full sm:w-auto px-8 bg-neutral-900 text-white rounded-xl h-14 text-sm font-bold hover:bg-neutral-800 transition-colors disabled:opacity-50"
                >
                  {isValidating ? 'Verificando...' : 'Aplicar'}
                </button>
              </div>

              <div className="space-y-4 pt-2">
                <WhatsAppButton 
                  cartItems={cart}
                  appliedCoupon={appliedCoupon}
                  discountAmount={discountAmount}
                  finalTotal={finalTotal}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Info */}
        <p className="text-center text-neutral-500 text-sm leading-relaxed px-4">
          Los productos adquiridos estarán disponibles para retiro a partir del 11 de abril en todas las tiendas de <a href="https://maps.app.goo.gl/JKkejAzqNWLUybxz9" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-gold-600 transition-colors text-neutral-700">Gold Burger</a>. Agradecemos su comprensión.
        </p>
      </div>
    </main>
  );
}
