import { Icon } from '@iconify/react';

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-950 py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="text-neutral-500 text-md font-medium flex items-center gap-2">
          <Icon icon="ph:map-pin" width="24" height="24" />
          Santa Fe, Argentina
        </div>

        <div className="flex items-center gap-6">
          <a href="https://www.instagram.com/ginsinnombre" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
            <Icon icon="ph:instagram-logo" width="24" height="24" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors">
            <Icon icon="ph:whatsapp-logo" width="24" height="24" />
          </a>
        </div>
        
      </div>
    </footer>
  );
}
