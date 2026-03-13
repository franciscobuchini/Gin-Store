import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function Contacto() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <main className="flex-grow p-2 md:p-12 xl:p-16 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white p-5 md:p-12 rounded-[2.5rem] shadow-2xl shadow-gold-500/5 border border-neutral-100">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Columna Izquierda: Inputs Cortos (7 columnas en lg) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <Input label="Nombre" placeholder="Tu nombre completo" required />
            <Input label="E-mail" type="email" placeholder="ejemplo@correo.com" required />
            <Input label="Teléfono" type="tel" placeholder="+54 9 11 0000-0000" required />
            <Input label="Provincia" placeholder="Ej: Santa Fe" required />
            <Input label="Ciudad" placeholder="Ej: Santa Fe" required />

            {/* Tipo de consulta */}
            <div className="flex flex-col">
              <label className="m-2 text-sm font-medium text-neutral-700">Tipo de consulta</label>
              <div className="relative group h-full">
                <select required className="w-full appearance-none bg-white border rounded-xl px-4 py-2 outline-none focus:border-gold-500 transition-all text-neutral-900 cursor-pointer h-[42px]">
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
                required
                className="w-full flex-grow bg-white border rounded-xl px-4 py-2 outline-none focus:border-gold-500 transition-all text-neutral-900 caret-neutral-900 placeholder:text-neutral-300 resize-none min-h-[150px] lg:min-h-0" 
                placeholder="¿En qué podemos ayudarte?"
              ></textarea>
            </div>

            {/* Submit Button */}
            <Button type="submit" size="big" variant="neutral">
              Enviar Mensaje
            </Button>
          </div>

        </form>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-lg w-full shadow-2xl relative text-center flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-gold-50 text-gold-500 rounded-full flex items-center justify-center mb-6">
              <Check className="w-10 h-10" strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight">¡Gracias por comunicarte!</h2>
            <p className="text-neutral-600 mb-8  text-lg">
              Tu mensaje fue enviado a nuestro equipo con éxito. Pronto nos pondremos en contacto contigo.
            </p>
            <Button 
              onClick={() => setIsModalOpen(false)}
              variant="neutral"
              className="w-full sm:w-auto px-10"
            >
              Aceptar
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
