import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
      <div className="max-w-md w-full py-12 px-8 flex flex-col items-center gap-8">
        <div className="relative">
          <h1 className="text-9xl font-black text-neutral-200 leading-none select-none">
            404
          </h1>
          <p className="absolute inset-0 flex items-center justify-center text-2xl font-black text-neutral-900 tracking-wider">
            UPPS!
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-black text-neutral-900">Página no encontrada</h2>
          <p className="text-neutral-500 max-w-xs mx-auto">
            Parece que te has perdido. La página que buscas no existe o fue movida.
          </p>
        </div>

        <Link to="/" className="w-full">
          <Button variant="primary" size="big" fullWidth>
            <Home className="w-5 h-5" />
            Volver al inicio
          </Button>
        </Link>
      </div>

      <div className="mt-8 text-neutral-300 font-medium tracking-[0.2em] text-xs uppercase italic select-none">
        Gin Sin Nombre
      </div>
    </main>
  );
}
