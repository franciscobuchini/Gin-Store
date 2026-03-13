import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Checkbox } from '../components/Checkbox';
import FreeShippingProgress from '../components/FreeShippingProgress';
import { formatPrice } from '../utils/format';
import { Button } from '../components/Button';
import { ShoppingCart, CheckCircle2, AlertCircle } from 'lucide-react';
import Badge from '../components/Badge';
import { useState, useEffect } from 'react';
import { COUPONS, type Coupon } from '../data/coupons';
import { Select } from '../components/Select';

import { Icon } from '@iconify/react';

export default function Checkout() {
  const { cart, cartTotal, updateQuantity } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState('');

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoadingProvinces, setIsLoadingProvinces] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  interface Province { id: string; nombre: string }
  interface City { id: string; nombre: string }

  // Fetch provinces on mount
  useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoadingProvinces(true);
      try {
        const res = await fetch('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre');
        const data = await res.json();
        setProvinces(data.provincias.sort((a: Province, b: Province) => a.nombre.localeCompare(b.nombre)));
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setIsLoadingProvinces(false);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch cities when province changes
  useEffect(() => {
    if (!selectedProvince) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      setIsLoadingCities(true);
      setSelectedCity(''); // Reset city when province changes
      try {
        const res = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${selectedProvince}&max=1000&campos=id,nombre`);
        const data = await res.json();
        setCities(data.localidades.sort((a: City, b: City) => a.nombre.localeCompare(b.nombre)));
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoadingCities(false);
      }
    };
    fetchCities();
  }, [selectedProvince]);

  // Still needed for sticky order summary calculations at the end of the file.
  const FREE_SHIPPING_THRESHOLD = 50000;
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

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
    if (!code) {
      setCouponError('Ingresa un código');
      return;
    }

    const found = COUPONS.find(c => c.code === code);
    if (found) {
      setAppliedCoupon(found);
      setCouponError('');
    } else {
      setAppliedCoupon(null);
      setCouponError('Código inválido');
    }
  };

  const handleFinishPurchase = () => {
    // Generate WhatsApp message
    const items = cart.map(item => `${item.name} x${item.quantity} - $${formatPrice(item.price * item.quantity)}`).join('%0A');
    const discountText = appliedCoupon ? `%0A*Descuento (${appliedCoupon.code}): -$${formatPrice(discountAmount)}*` : '';
    const message = `Hola! Quiero finalizar mi compra:%0A%0A${items}${discountText}%0A%0A*Total Final: $${formatPrice(finalTotal)}*`;
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
    <main className="flex-grow p-2 sm:p-4 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleFinishPurchase();
        }}
        className="w-full space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Column: Form Steps */}
          <div className="space-y-6 md:space-y-8 lg:col-span-7 xl:col-span-8">
            {/* Cart Summary (Mobile/Tablet show here) */}
            <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100 lg:hidden">
              <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 text-neutral-900 border-b border-neutral-50 pb-4">
                <ShoppingCart size={20} />
                Resumen del pedido
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 items-center text-sm py-1">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-contain bg-neutral-50 rounded-xl p-2 border border-neutral-100" />
                        <span className="absolute -top-2 -right-2 bg-neutral-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{item.quantity}</span>
                      </div>
                      <div className="truncate min-w-0">
                        <div className="flex items-center gap-2 mb-1 min-w-0">
                          <p className="font-bold text-neutral-900 truncate">{item.name}</p>
                          <Badge variant="neutral" className="text-[10px] px-1.5 py-0.5 tracking-tight shrink-0 border-neutral-200 text-neutral-500">
                             {item.ml}ml
                          </Badge>
                        </div>
                        <p className="text-neutral-500 text-xs">${formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                    
                    <Button 
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 p-0 bg-neutral-50 hover:bg-gold-500 hover:text-white border border-neutral-100 rounded-lg transition-all"
                      title="Sumar uno"
                    >
                      <Icon icon="ph:plus-bold" width="14" height="14" />
                    </Button>

                  </div>
                ))}
                
                <div className="pt-6 mt-6 border-t border-neutral-100">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center text-neutral-500 font-medium">
                      <span>Subtotal</span>
                      <span>${formatPrice(cartTotal)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between items-center text-neutral-500 font-medium">
                        <span>Descuento {appliedCoupon.type === 'percentage' ? `(${appliedCoupon.discount}%)` : `(${appliedCoupon.code})`}</span>
                        <span>-${formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-neutral-500 font-medium">
                      <span>Envío</span>
                      {remaining === 0 ? (
                        <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-0.5 rounded-full border border-green-100">GRATIS</span>
                      ) : (
                        <span className="text-neutral-900 border border-neutral-100 px-2 py-0.5 rounded-full text-xs bg-neutral-50 font-medium uppercase tracking-tight">A calcular</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-lg font-black pt-2 border-t border-neutral-50">
                      <span>Total</span>
                      <div className="text-right">
                        {appliedCoupon && (
                          <p className="text-xs text-neutral-400 font-medium line-through mb-1">
                            ${formatPrice(cartTotal)}
                          </p>
                        )}
                        <span className="text-gold-600">${formatPrice(finalTotal)}</span>
                      </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-4 md:gap-x-5 gap-y-1">
                <div className="sm:col-span-6">
                  <Input label="Nombre completo" placeholder="Tu nombre completo" required />
                </div>

                <div className="sm:col-span-3">
                  <Input label="Calle" placeholder="Nombre de la calle" required />
                </div>
                <div className="sm:col-span-1">
                  <Input label="Número" placeholder="1234" required />
                </div>
                <div className="sm:col-span-1">
                  <Input label="Piso/Depto" placeholder="1A" />
                </div>
                <div className="sm:col-span-1">
                  <Input label="Cod. Postal" placeholder="3000" required />
                </div>

                <div className="sm:col-span-3">
                  <Select 
                    label="Provincia" 
                    value={selectedProvince}
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      setSelectedCity(''); // Clear city while loading new ones
                    }}
                    options={provinces.map(p => ({ value: p.id, label: p.nombre }))}
                    disabled={isLoadingProvinces}
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <Select 
                    label="Ciudad / Localidad" 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    options={cities.map(c => ({ value: c.nombre, label: c.nombre }))}
                    disabled={!selectedProvince || isLoadingCities}
                    required
                  />
                </div>
              </div>
            </section>

            {/* Step 3: Coupon */}
            <section className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h2 className="text-lg md:text-xl font-bold mb-5 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white text-xs">3</span>
                Cupón de descuento
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-end gap-2 sm:gap-3">
                  <div className="flex-grow min-w-0">
                    <Input 
                      label="Código de cupón"
                      placeholder="Cupón..." 
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className={`!h-12 ${appliedCoupon ? 'border-green-500' : couponError ? 'border-red-500' : ''}`}
                    />
                  </div>
                  <Button 
                    type="button" 
                    onClick={handleVerifyCoupon}
                    variant="neutral"
                    className="!h-12 px-6 rounded-xl border border-transparent shadow-sm flex-shrink-0"
                  >
                    Verificar
                  </Button>
                </div>

                {appliedCoupon && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl border border-green-100 animate-in fade-in slide-in-from-top-1">
                    <CheckCircle2 size={18} />
                    <span className="text-sm font-bold">
                      ¡Cupón aplicado! Tenés {appliedCoupon.type === 'percentage' ? `${appliedCoupon.discount}%` : `$${formatPrice(appliedCoupon.discount)}`} de descuento.
                    </span>
                  </div>
                )}

                {couponError && !appliedCoupon && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-1">
                    <AlertCircle size={18} />
                    <span className="text-sm font-bold">{couponError}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Removed the button from here as it's now at the bottom */}
          </div>

          {/* Right Column: Sticky Summary (Desktop only side) */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
            <div className="bg-neutral-900 text-white rounded-xl border border-white/5 h-full flex flex-col overflow-hidden">
              <h2 className="text-2xl font-black flex items-center gap-3 shrink-0 p-8 xl:p-10 pb-4">
                Tu Pedido
                <span className="text-xs bg-gold-500 text-white px-2 py-1 rounded-full font-bold  tracking-wider">{cart.length}</span>
              </h2>
              <div className="space-y-6 overflow-y-auto custom-scrollbar flex-grow xl:p-8 pt-0">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 items-center group py-1">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative shrink-0">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain bg-white/5 rounded-2xl p-2 border border-white/10 group-hover:scale-105 transition-transform" />
                        <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-bold shadow-lg shadow-gold-500/20 ring-2 ring-neutral-900">{item.quantity}</span>
                      </div>
                      <div className="truncate min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 min-w-0">
                          <p className="font-bold text-sm text-white/90 truncate">{item.name}</p>
                          <Badge variant="gold" className="text-[9px] px-1.5 py-0.5 !text-[9px] h-auto shrink-0 ring-1 ring-white/10 shadow-none">
                            {item.ml}ml
                          </Badge>
                        </div>
                        <p className="text-white/40 text-[11px] font-medium tracking-wide mt-1">${formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>

                    <Button 
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8 p-0 bg-white/5 hover:bg-gold-500 hover:text-white border border-white/10 rounded-lg transition-all"
                      title="Sumar uno"
                    >
                      <Icon icon="ph:plus-bold" width="14" height="14" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto p-8 xl:p-10 border-t border-white/10 space-y-5 shrink-0">
                <div className="flex justify-between items-center text-white text-sm font-medium">
                  <span>Subtotal</span>
                  <span>${formatPrice(cartTotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between items-center text-white text-sm font-medium">
                    <span>Descuento {appliedCoupon.type === 'percentage' ? `(${appliedCoupon.discount}%)` : `(${appliedCoupon.code})`}</span>
                    <span>-${formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-white text-sm font-medium">
                  <span>Envío</span>
                  {remaining === 0 ? (
                    <span className="text-gold-400 font-black text-xs bg-gold-400/10 px-2 py-0.5 rounded-full border border-gold-400/20 ">GRATIS</span>
                  ) : (
                    <span className="text-white/80">A calcular</span>
                  )}
                </div>
                <div className="flex justify-between items-end pt-4">
                  <div>
                    <p className="text-white/40 text-xs font-medium mb-1">Total Final</p>
                    <p className="text-3xl font-black tracking-tight">${formatPrice(finalTotal)}</p>
                  </div>
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

        {/* Bottom Section: CTA */}
        <div className="mt-8 flex flex-col items-center">
          <div className="w-full p-4 md:p-8 flex flex-col items-center gap-6">
            <div className="text-center space-y-2">
              <p className="text-neutral-500">Al hacer clic, serás redirigido a WhatsApp para coordinar el pago y la entrega.</p>
            </div>
            
            <Button 
              type="submit"
              size="big"
              variant="primary"
              className="w-full md:max-w-md shadow-2xl shadow-gold-500/20"
            >
              <Icon icon="logos:whatsapp-icon" width="36" height="36" />
              Finalizar por WhatsApp
            </Button>
            
            <p className="text-xs text-neutral-400 font-medium tracking-wider">
              Prohibida su venta a menores de 18 años
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}
