import { Icon } from '@iconify/react';

export default function Footer() {
  return (
    <footer className="py-16 bg-neutral-950 text-white mt-auto border-t border-neutral-800">
      <div className="w-full px-8 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          
          {/* Social Media Section - Left Aligned */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <span className="text-[10px] font-black  tracking-[0.4em] text-gold-500/80">Seguinos</span>
            <div className="flex items-center gap-4">
              <a href="#" className="p-3 bg-neutral-900 text-white border border-neutral-800 rounded-2xl transition-all hover:-translate-y-1 hover:bg-pink-600">
                <Icon icon="streamline:instagram-solid" width="22" height="22" />
              </a>
              <a href="#" className="p-3 bg-neutral-900 text-white border border-neutral-800 rounded-2xl transition-all hover:-translate-y-1 hover:bg-blue-600">
                <Icon icon="streamline-logos:facebook-logo-2-solid" width="22" height="22" />
              </a>
              <a href="#" className="p-3 bg-neutral-900 text-white border border-neutral-800 rounded-2xl transition-all hover:-translate-y-1 hover:bg-cyan-600">
                <Icon icon="streamline:tiktok-solid" width="22" height="22" />
              </a>
              <a href="#" className="p-3 bg-neutral-900 text-white border border-neutral-800 rounded-2xl transition-all hover:-translate-y-1 hover:bg-green-600">
                <Icon icon="streamline-logos:whatsapp-logo-solid" width="22" height="22" />
              </a>
            </div>
          </div>

          {/* Logo & Copyright Section - Right Aligned on Desktop */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4">
            <div className="space-y-1">
              <span className="text-2xl font-black text-white tracking-tighter italic">
                Gin sin nombre
              </span>
              <p className="text-gold-500/80 text-[10px]  tracking-[0.4em] font-medium">Destilería Premium</p>
            </div>
            <p className="text-[10px] text-neutral-500 font-medium tracking-tight ">
              © 2024 Gin sin nombre. Todos los derechos reservados.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
