import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/format';
import { Button } from '../components/Button';
import { useState } from 'react';
import { COUPONS, type Coupon } from '../data/coupons';

import { Icon } from '@iconify/react';

export default function CheckoutPresale() {
  const { cart, cartTotal, updateQuantity } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percentage') {
      return (cartTotal * appliedCoupon.discount) / 100;
    }
    return appliedCoupon.discount;
  };

  const discountAmount = calculateDiscount();
  const finalTotal = cartTotal - discountAmount;

  const handleVerifyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    const found = COUPONS.find(c => c.code === code);
    if (found) {
      setAppliedCoupon(found);
    } else {
      setAppliedCoupon(null);
    }
  };

  const handleFinishPurchase = () => {
    const items = cart.map(item => `${item.name} x${item.quantity} - $${formatPrice(item.price * item.quantity)}`).join('%0A');
    const discountText = appliedCoupon ? `%0A*Descuento (${appliedCoupon.code}): -$${formatPrice(discountAmount)}*` : '';
    const message = `Hola! Quiero finalizar mi compra de preventa:%0A%0A${items}${discountText}%0A%0A*Total Final: $${formatPrice(finalTotal)}*`;
    window.open(`https://wa.me/5493426395442?text=${message}`, '_blank');
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
    <main className="flex-grow flex items-center justify-center p-4 md:p-12">
      <div className="w-full max-w-xl space-y-8">

        {/* Order Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            {/* Product Brief */}
            <div className="flex items-center gap-5 pb-6 border-b border-neutral-50">
              <div className="shrink-0 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <img src={cart[0]?.image} alt={cart[0]?.name} className="w-16 h-16 object-contain" />
              </div>
              <div className="flex-grow">
                <h2 className="font-bold text-neutral-900">{cart[0]?.name}</h2>
                <p className="text-xs text-neutral-400 font-medium">{cart[0]?.ml}ml • Edición Especial</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center bg-neutral-50 rounded-lg border border-neutral-100 p-0.5">
                    <button 
                      type="button"
                      onClick={() => updateQuantity(cart[0]?.id, -1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-white rounded transition-colors disabled:opacity-20"
                      disabled={cart[0]?.quantity <= 1}
                    >
                      <Icon icon="ph:minus" width="14" />
                    </button>
                    <span className="w-8 text-center font-bold text-xs">{cart[0]?.quantity}</span>
                    <button 
                      type="button"
                      onClick={() => updateQuantity(cart[0]?.id, 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-white rounded transition-colors"
                    >
                      <Icon icon="ph:plus" width="14" />
                    </button>
                  </div>
                  <span className="font-bold text-sm text-neutral-900">${formatPrice(cart[0]?.price * cart[0]?.quantity)}</span>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-medium text-neutral-400">
                <span>Subtotal</span>
                <span className="tabular-nums text-neutral-600">${formatPrice(cartTotal)}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-xs font-bold text-green-600">
                  <span>Descuento ({appliedCoupon.code})</span>
                  <span className="tabular-nums">-${formatPrice(discountAmount)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-sm font-bold text-neutral-900">Total</span>
                <span className="text-2xl font-black text-gold-600 tabular-nums">
                  ${formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Coupon and CTA */}
            <div className="pt-6 border-t border-neutral-50 space-y-6">
              <div className="flex gap-2">
                <div className="flex-grow">
                  <input 
                    type="text"
                    placeholder="Código de descuento" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold-500 transition-all"
                  />
                </div>
                <button 
                  type="button" 
                  onClick={handleVerifyCoupon}
                  className="px-6 bg-neutral-900 text-white rounded-xl text-sm font-bold hover:bg-neutral-800 transition-colors"
                >
                  Aplicar
                </button>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleFinishPurchase}
                  size="big"
                  variant="primary"
                  className="w-full h-14 text-sm font-bold tracking-wide"
                >
                  <Icon icon="logos:whatsapp-icon" width="32" height="32" />
                  Finalizar por WhatsApp
                </Button>
                
                <p className="text-[10px] text-neutral-400 text-center uppercase tracking-widest font-medium">
                  Beber con moderación • +18 años
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
