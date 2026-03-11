import { ChevronDown } from 'lucide-react';
import { Input } from '../components/Input';

export default function Contacto() {
  return (
    <main className="flex-grow p-6 md:p-12 xl:p-16 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gold-500/5 border border-neutral-100">
        <form className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Columna Izquierda: Inputs Cortos (7 columnas en lg) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <Input label="Nombre" placeholder="Tu nombre completo" />
            <Input label="E-mail" type="email" placeholder="ejemplo@correo.com" />
            <Input label="Teléfono" type="tel" placeholder="+54 9 11 0000-0000" />
            <Input label="Provincia" placeholder="Ej: Santa Fe" />
            <Input label="Ciudad" placeholder="Ej: Santa Fe" />

            {/* Tipo de consulta */}
            <div className="flex flex-col">
              <label className="m-2 text-sm font-medium text-neutral-700">Tipo de consulta</label>
              <div className="relative group h-full">
                <select className="w-full appearance-none bg-white border rounded-xl px-4 py-2 outline-none focus:border-gold-500 transition-all text-neutral-900 cursor-pointer h-[42px]">
                  <option value="">Seleccionar...</option>
                  <option value="distribución">Distribución</option>
                  <option value="evento">Evento</option>
                  <option value="info">Información</option>
                  <option value="particular">Particular</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
              </div>
            </div>
          </div>

          {/* Columna Derecha: Mensaje y Botón (5 columnas en lg) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Mensaje */}
            <div className="flex flex-col flex-grow h-full">
              <label className="m-2 text-sm font-medium text-neutral-700">Mensaje</label>
              <textarea 
                className="w-full flex-grow bg-white border rounded-xl px-4 py-2 outline-none focus:border-gold-500 transition-all text-neutral-900 placeholder:text-neutral-300 resize-none min-h-[150px] lg:min-h-0" 
                placeholder="¿En qué podemos ayudarte?"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-neutral-900 text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-black/10 hover:bg-gold-600 hover:-translate-y-1 transition-all active:scale-[0.98] shrink-0">
              Enviar Mensaje
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}
