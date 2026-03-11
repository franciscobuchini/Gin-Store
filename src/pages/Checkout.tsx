import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { Input } from '../components/Input';

export default function Checkout() {
  const { cart, cartTotal } = useCart();
  const [shippingMethod, setShippingMethod] = useState<'domicilio' | 'punto'>('domicilio');
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

  const FREE_SHIPPING_THRESHOLD = 50000;
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  const handleFinishPurchase = () => {
    // Generate WhatsApp message
    const items = cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}`).join('%0A');
    const message = `Hola! Quiero finalizar mi compra:%0A%0A${items}%0A%0A*Total: $${cartTotal.toLocaleString()}*%0A%0AModo de entrega: ${shippingMethod === 'domicilio' ? 'A domicilio' : 'Punto de retiro'}`;
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
          <div className="space-y-6 md:space-y-8 lg:col-span-7 xl:col-span-8">
            {/* Cart Summary (Mobile/Tablet show here) */}
            <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100 lg:hidden">
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900 border-b border-neutral-50 pb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
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
                        <p className="text-neutral-500 text-xs">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="font-bold text-neutral-900">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                
                <div className="pt-6 mt-6 border-t border-neutral-100">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500 font-medium">Subtotal</span>
                      <span className="font-bold text-neutral-900">${cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-black pt-2 border-t border-neutral-50">
                      <span>Total</span>
                      <span className="text-gold-600">${cartTotal.toLocaleString()}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-2 bg-gold-50 p-4 rounded-xl border border-gold-100/50">
                      <div className="flex justify-between text-[11px] font-black mb-2 uppercase tracking-wider text-gold-700">
                        <span>{remaining > 0 ? `Faltan $${remaining.toLocaleString()} para el Envío Gratis` : '¡Envío Gratis Activado!'}</span>
                        <span>$50.000</span>
                      </div>
                      <div className="h-1.5 bg-white rounded-full overflow-hidden shadow-inner">
                        <div 
                          className="h-full bg-gold-500 transition-all duration-700 ease-out shadow-sm" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Options */}
            <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white text-xs">1</span>
                Opción de envío
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <button 
                  onClick={() => setShippingMethod('domicilio')}
                  className={`p-4 md:p-5 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col gap-1 ${shippingMethod === 'domicilio' ? 'border-gold-500 bg-gold-50/50 ring-4 ring-gold-500/10' : 'border-neutral-100 hover:border-neutral-200'}`}
                >
                  <div className="font-bold text-sm md:text-base">A domicilio</div>
                  <div className="text-[11px] md:text-xs text-neutral-500">Recibí en tu casa u oficina</div>
                </button>
                <button 
                  onClick={() => setShippingMethod('punto')}
                  className={`p-4 md:p-5 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col gap-1 ${shippingMethod === 'punto' ? 'border-gold-500 bg-gold-50/50 ring-4 ring-gold-500/10' : 'border-neutral-100 hover:border-neutral-200'}`}
                >
                  <div className="font-bold text-sm md:text-base">Punto de retiro</div>
                  <div className="text-[11px] md:text-xs text-neutral-500">Retirá en sucursales físicas</div>
                </button>
              </div>
            </section>

            {/* Contact Details */}
            <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white text-xs">2</span>
                Datos de contacto
              </h2>
              <div className="space-y-4 md:space-y-5">
                <Input label="E-mail" type="email" placeholder="ejemplo@correo.com" />
                <Input 
                  type="checkbox" 
                  id="newsletter" 
                  label="Quiero recibir ofertas, lanzamientos y novedades exclusivas por e-mail" 
                />
              </div>
            </section>

            {/* Recipient Details */}
            <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white text-xs">3</span>
                Datos del destinatario
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                <Input label="Nombre" placeholder="Tu nombre..." />
                <Input label="Apellido" placeholder="Tu apellido..." />
                <div className="sm:col-span-2">
                  <Input label="Teléfono de contacto" type="tel" placeholder="+54 9 11 0000-0000" />
                </div>
                
                <div className="sm:col-span-2 bg-neutral-50 p-4 md:p-5 rounded-2xl flex items-center justify-between border border-neutral-200/50 mt-2">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm border border-neutral-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-600"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm font-black text-neutral-900">C.P. 3000</p>
                      <p className="text-[10px] md:text-xs text-neutral-500 font-bold uppercase tracking-widest text-gold-700/60">Santa Fe, Argentina</p>
                    </div>
                  </div>
                  <button className="text-[10px] md:text-xs font-black text-gold-600 bg-gold-50 px-3 py-2 rounded-lg hover:bg-gold-100 transition-colors uppercase tracking-widest">Cambiar</button>
                </div>

                <div className="sm:col-span-2">
                  <Input label="Calle" placeholder="Nombre de la calle" />
                </div>

                <div>
                  <Input label="Número" placeholder="1234" />
                  <div className="mt-3">
                    <Input 
                      type="checkbox" 
                      id="sin-numero" 
                      label="Sin número" 
                    />
                  </div>
                </div>
                
                <Input label="Departamento (opcional)" placeholder="Piso 1, Depto A" />
                <Input label="Barrio (opcional)" placeholder="Nombre del barrio" />
                <Input label="Ciudad / Localidad" placeholder="Tu ciudad" />
              </div>
            </section>

            {/* Billing Details */}
            <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white text-xs">4</span>
                Datos de facturación
              </h2>
              <div className="space-y-5 md:space-y-6">
                <Input label="DNI o CUIT" placeholder="Ej: 20-12345678-9" />
                <Input 
                  type="checkbox" 
                  id="same-data" 
                  checked={useShippingAsBilling}
                  onChange={(e) => setUseShippingAsBilling(e.target.checked)}
                  label="Mis datos de facturación y entrega son los mismos" 
                />
              </div>
            </section>

            {/* Coupon */}
            <section className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-neutral-100 border-dashed hover:border-gold-500 transition-colors group cursor-pointer group">
              <button className="w-full text-xs md:text-sm font-bold text-gold-600 flex items-center justify-center gap-3">
                <div className="bg-gold-50 p-2 rounded-lg group-hover:bg-gold-500 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-1.41 1.41L15.17 8H2V10H15.17l-1.58 1.59L15 13l4-4-4-4zM22 9h-2M22 13h-2M22 5h-2M22 17h-2"></path></svg>
                </div>
                <span className="uppercase tracking-widest font-black">Agregar cupón de descuento</span>
              </button>
            </section>

            {/* CTA */}
            <button 
              onClick={handleFinishPurchase}
              className="w-full bg-gold-500 hover:bg-gold-600 text-white font-black py-5 md:py-6 rounded-2xl text-lg md:text-xl shadow-2xl shadow-gold-500/30 transition-all flex items-center justify-center gap-4 active:scale-[0.98] border-b-4 border-gold-700/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              Finalizar pago por WhatsApp
            </button>
          </div>

          {/* Right Column: Sticky Summary (Desktop only side) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 sticky top-28">
            <div className="bg-neutral-900 text-white p-8 xl:p-10 rounded-[2.5rem] shadow-2xl border border-white/5">
              <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
                Tu Pedido
                <span className="text-xs bg-gold-500 text-white px-2 py-1 rounded-full font-bold uppercase tracking-wider">{cart.length}</span>
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
                        <p className="text-white/40 text-[11px] font-medium tracking-wide mt-1">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="font-black text-sm text-gold-400">${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/10 space-y-5">
                <div className="flex justify-between items-center text-white/50 text-sm font-medium">
                  <span>Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-white/50 text-sm font-medium">
                  <span>Envío</span>
                  {remaining === 0 ? (
                    <span className="text-gold-400 font-black tracking-widest text-[10px] bg-gold-400/10 px-2 py-0.5 rounded-full border border-gold-400/20 uppercase">GRATIS</span>
                  ) : (
                    <span className="text-white/80">A calcular</span>
                  )}
                </div>
                <div className="flex justify-between items-end pt-4">
                  <div>
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1 leading-none">Total Final</p>
                    <p className="text-3xl font-black tracking-tight leading-none">${cartTotal.toLocaleString()}</p>
                  </div>
                  {remaining > 0 && (
                    <div className="text-right">
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1 italic">Conseguí el</p>
                      <p className="text-[10px] font-black text-gold-400 uppercase tracking-widest leading-none">Bonificado</p>
                    </div>
                  )}
                </div>
              </div>

              {remaining > 0 && (
                <div className="mt-8 bg-white/5 p-6 rounded-3xl border border-white/10 overflow-hidden relative">
                  <div className="relative z-10">
                    <p className="text-[10px] font-black text-gold-300 mb-3 uppercase tracking-[0.2em]">Casi listo</p>
                    <p className="text-xs font-medium text-white/80 leading-relaxed mb-4">Estás a solo <span className="text-white font-black px-1.5 py-0.5 bg-white/10 rounded-md text-sm">${remaining.toLocaleString()}</span> de bonificar el costo de envío.</p>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gold-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 blur-[50px] rounded-full -mr-10 -mt-10" />
                </div>
              )}
            </div>
            
            <p className="mt-6 text-[10px] text-neutral-400 text-center uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gold-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Compra 100% Protegida
            </p>
          </div>
      </div>
    </main>
  );
}
