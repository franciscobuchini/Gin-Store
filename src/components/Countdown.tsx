import { useState, useEffect } from 'react';

const TARGET_DATE = new Date('2026-04-11T00:00:00').getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-neutral-950 text-white py-3 border-b border-gold-900/20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-3xl font-black italic tracking-tighter text-white">
              Gin sin Nombre
            </h1>
          </div>
          <div className="h-4 w-px bg-white/10 hidden md:block" />
          <p className="hidden md:block text-xs italic font-medium text-gold-500/80 uppercase tracking-widest">
            Lanzamiento: 11.04.26
          </p>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <Unit value={timeLeft.days} label="Días" />
          <Separator />
          <Unit value={timeLeft.hours} label="Horas" />
          <Separator />
          <Unit value={timeLeft.minutes} label="Min" />
          <Separator />
          <Unit value={timeLeft.seconds} label="Seg" />
        </div>
      </div>
    </div>
  );
}

function Unit({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[40px]">
      <span className="text-xl md:text-2xl font-black italic tracking-tighter tabular-nums text-white">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[8px] uppercase tracking-widest font-bold text-neutral-500">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-gold-500/30 font-thin text-xl animate-pulse">:</span>
  );
}
