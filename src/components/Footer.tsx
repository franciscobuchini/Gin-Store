import { Facebook, Instagram, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-10">
          
          {/* Logo Section */}
          <div className="space-y-1">
            <span className="text-2xl font-bold text-neutral-900 tracking-tight">
              GinStore
            </span>
            <p className="text-neutral-400 text-[10px] uppercase tracking-[0.2em] font-medium">Premium Distillery</p>
          </div>
          
          {/* Social Links Section - Solid Colors, No Fantasy */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* Instagram */}
            <a 
              href="#" 
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              <Instagram size={20} />
              <span className="text-sm font-semibold">Instagram</span>
            </a>

            {/* Facebook */}
            <a 
              href="#" 
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              <Facebook size={20} fill="currentColor" />
              <span className="text-sm font-semibold">Facebook</span>
            </a>

            {/* Tik Tok */}
            <a 
              href="#" 
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              <Music2 size={20} />
              <span className="text-sm font-semibold">TikTok</span>
            </a>
          </div>

          {/* Final Copyright */}
          <p className="text-[10px] text-neutral-300 font-medium tracking-tight">
            © 2024 GINSTORE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
