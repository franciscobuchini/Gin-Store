import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import FreeShippingProgress from '../components/FreeShippingProgress';
import { formatPrice } from '../utils/format';
import { Button } from '../components/Button';
import { ShoppingCart, Ticket, Phone } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal } = useCart();

  // Still needed for sticky order summary calculations at the end of the file.
  const FREE_SHIPPING_THRESHOLD = 50000;
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  const handleFinishPurchase = () => {
    // Generate WhatsApp message
    const items = cart.map(item => `${item.name} x${item.quantity} - $${formatPrice(item.price * item.quantity)}`).join('%0A');
    const message = `Hola! Quiero finalizar mi compra:%0A%0A${items}%0A%0A*Total: $${formatPrice(cartTotal)}*`;
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
    <main className="flex-grow p-4 sm:p-6 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left Column: Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleFinishPurchase();
            }}
            className="space-y-6 md:space-y-8 lg:col-span-7 xl:col-span-8"
          >
            {/* Cart Summary (Mobile/Tablet show here) */}
            <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100 lg:hidden">
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900 border-b border-neutral-50 pb-4">
                <ShoppingCart size={20} />
                Resumen del pedido
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-contain bg-neutral-50 rounded-xl p-2 border border-neutral-100" />
                        <span className="absolute -top-2 -right-2 bg-neutral-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{item.quantity}</span>
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900 leading-tight">{item.name}</p>
                        <p className="text-neutral-500 text-xs">${formatPrice(item.price)}</p>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-900">${formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                
                <div className="pt-6 mt-6 border-t border-neutral-100">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 font-medium">Subtotal</span>
                      <span className="font-bold text-neutral-900">${formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-black pt-2 border-t border-neutral-50">
                      <span>Total</span>
                      <span className="text-gold-600">${formatPrice(cartTotal)}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-2">
                      <FreeShippingProgress />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Details */}
            <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white text-xs">1</span>
                Datos de contacto
              </h2>
              <div className="space-y-4 md:space-y-5">
                <Input label="E-mail" type="email" placeholder="ejemplo@correo.com" required />
                <Checkbox 
                  id="newsletter" 
                  label="Quiero recibir ofertas, lanzamientos y novedades exclusivas por e-mail" 
                />
              </div>
            </section>

            {/* Recipient Details */}
            <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white text-xs">2</span>
                Datos del destinatario
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <Input label="Nombre" placeholder="Tu nombre..." required />
                <Input label="Apellido" placeholder="Tu apellido..." required />

                <div className="sm:col-span-2">
                  <Input label="Calle" placeholder="Nombre de la calle" required />
                </div>

                <div>
                  <Input label="Número" placeholder="1234" required />
                </div>
                
                <Input label="Departamento (opcional)" placeholder="Piso 1, Depto A" />
                <Input label="Barrio (opcional)" placeholder="Nombre del barrio" />
                <Input label="Ciudad / Localidad" placeholder="Tu ciudad" required />
              </div>
            </section>

            {/* Coupon */}
            <section className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-neutral-100 border-dashed hover:border-gold-500 transition-colors group cursor-pointer group">
              <Button variant="ghost" className="w-full text-xs md:text-sm text-gold-600 group-hover:text-gold-500">
                <div className="bg-gold-50 p-2 rounded-lg group-hover:bg-gold-500 group-hover:text-white transition-all">
                  <Ticket size={16} />
                </div>
                Agregar cupón de descuento
              </Button>
            </section>

            {/* CTA */}
            <Button 
              type="submit"
              size="big"
              variant="primary"
            >
              <Phone size={24} className="animate-pulse" />
              Finalizar pago por WhatsApp
            </Button>
          </form>

          {/* Right Column: Sticky Summary (Desktop only side) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-28">
            <div className="bg-neutral-900 text-white p-8 xl:p-10 rounded-[2.5rem] shadow-2xl border border-white/5">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                Tu Pedido
                <span className="text-xs bg-gold-500 text-white px-2 py-1 rounded-full font-bold  tracking-wider">{cart.length}</span>
              </h2>
              <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-white/5 rounded-2xl p-2 border border-white/10 group-hover:scale-105 transition-transform" />
                        <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold shadow-lg shadow-gold-500/20 ring-2 ring-neutral-900">{item.quantity}</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-tight text-white/90">{item.name}</p>
                        <p className="text-white/40 text-[11px] font-medium tracking-wide mt-1">${formatPrice(item.price)}</p>
                      </div>
                    </div>
                    <span className="font-black text-sm text-gold-400">${formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/10 space-y-5">
                <div className="flex justify-between items-center text-white/50 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>${formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between items-center text-white/50 text-sm font-medium">
                  <span>Envío</span>
                  {remaining === 0 ? (
                    <span className="text-gold-400 font-black tracking-widest text-[10px] bg-gold-400/10 px-2 py-0.5 rounded-full border border-gold-400/20 ">GRATIS</span>
                  ) : (
                    <span className="text-white/80">A calcular</span>
                  )}
                </div>
                <div className="flex justify-between items-end pt-4">
                  <div>
                    <p className="text-white/40 text-[10px] font-black  tracking-[0.2em] mb-1 leading-none">Total Final</p>
                    <p className="text-3xl font-black tracking-tight leading-none">${formatPrice(cartTotal)}</p>
                  </div>
                  {remaining > 0 && (
                    <div className="text-right">
                      <p className="text-[10px] text-white/40 font-bold  tracking-widest mb-1 italic">Conseguí el</p>
                      <p className="text-[10px] font-black text-gold-400  tracking-widest leading-none">Bonificado</p>
                    </div>
                  )}
                </div>
              </div>

              {remaining > 0 && (
                <div className="mt-8">
                  <FreeShippingProgress />
                </div>
              )}
            </div>
          </div>
      </div>
    </main>
  );
}
