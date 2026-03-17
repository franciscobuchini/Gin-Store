import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function StockAlertModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <Icon icon="ph:x-bold" width="24" />
        </button>

        <div className="p-10 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <Icon icon="ph:warning-circle-bold" width="32" className="text-red-600 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black italic tracking-tighter text-neutral-900 leading-tight">
              ¡ÚLTIMAS UNIDADES!
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              La demanda está siendo altísima. No te quedes sin tu botella de la Edición Lanzamiento.
            </p>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black italic text-neutral-900 tracking-tighter tabular-nums">
                5
              </span>
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">
                Botellas disponibles
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-neutral-900 text-white h-14 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-gold-600 transition-all shadow-lg shadow-neutral-900/10"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
