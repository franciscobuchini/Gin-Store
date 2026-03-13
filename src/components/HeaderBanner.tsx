import { useLocation } from 'react-router-dom';

export default function HeaderBanner() {
  const location = useLocation();
  
  if (location.pathname === '/presale') return null;
  
  let title = "Nuestra Colección";
  let subtitle = "Gines artesanales destilados con pasión, diseñados para el paladar más exigente.";

  if (location.pathname === '/promos') {
    title = "Promociones Especiales";
    subtitle = "Aprovechá nuestras ofertas exclusivas en combos y destilados seleccionados.";
  } else if (location.pathname === '/contacto') {
    title = "Contacto";
    subtitle = "Estamos aquí para asesorarte. Escribinos por cualquier consulta o pedido especial.";
  } else if (location.pathname === '/checkout') {
    title = "Finalizar Compra";
    subtitle = "Ya casi tenés tu Gin. Completá tus datos para coordinar el envío.";
  }

  return (
    <div className="w-full bg-white p-6 pt-20 md:h-[300px] flex flex-col justify-center items-center text-center">
      <div className="max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-gold-300 via-gold-600 to-gold-800 bg-clip-text text-transparent py-2 ">
          {title}
        </h1>
        <p className="mt-4 text-neutral-600 text-sm md:text-base max-w-xl mx-auto ">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
