import { Icon } from '@iconify/react';
import { Button } from './Button';
import { formatPrice } from '../utils/format';
import type { CartItem } from '../types/product';
import type { Coupon } from '../types/coupon';

interface WhatsAppButtonProps {
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  discountAmount: number;
  finalTotal: number;
}

export default function WhatsAppButton({ 
  cartItems, 
  appliedCoupon, 
  discountAmount, 
  finalTotal 
}: WhatsAppButtonProps) {
  
  const handleFinishPurchase = () => {
    const items = cartItems.map(item => `${item.name} x${item.quantity} - $${formatPrice(item.price * item.quantity)}`).join('%0A');
    
    // Aquí el mensaje de descuento y código (si aplica)
    const couponText = appliedCoupon ? `%0A*Cupón: ${appliedCoupon.code}*` : '';
    const discountText = appliedCoupon ? `%0A*Descuento: -$${formatPrice(discountAmount)}*` : '';
    
    const message = `Hola! Quiero finalizar mi compra de preventa:%0A%0A${items}${couponText}${discountText}%0A%0A*Total Final: $${formatPrice(finalTotal)}*`;
    
    window.open(`https://wa.me/5493424666830?text=${message}`, '_blank');
  };

  return (
    <Button 
      onClick={handleFinishPurchase}
      size="big"
      variant="primary"
      className="w-full h-16 text-sm font-bold"
    >
      <Icon icon="logos:whatsapp-icon" width="36" height="36" />
      Finalizar por WhatsApp
    </Button>
  );
}
