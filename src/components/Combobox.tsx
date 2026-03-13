import { ChevronDown, Search } from 'lucide-react';

interface ComboboxProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  isLoading?: boolean;
}

export function Combobox({
  label,
  value,
  onChange,
  options,
  placeholder = "Seleccionar o escribir...",
  disabled = false,
  required = false,
  className = "",
  isLoading = false
}: ComboboxProps) {
  // Generamos un ID único para el datalist
  const listId = `list-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`flex flex-col w-full relative ${className}`}>
      <label className="m-2 text-sm font-medium text-neutral-700">
        {label}
      </label>
      
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-gold-500 transition-colors">
          <Search size={16} />
        </div>
        
        <input
          type="text"
          list={listId}
          className={`bg-white border rounded-xl pl-10 pr-10 py-2 outline-none focus:border-gold-500 transition-all text-neutral-900 placeholder:text-neutral-300 w-full ${disabled ? 'opacity-50 cursor-not-allowed bg-neutral-50' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => {
            const val = e.target.value;
            // Si hay algo escrito pero no coincide con ninguna opción, limpiamos
            if (val && !options.some(opt => opt.label === val)) {
              onChange('');
            }
          }}
          disabled={disabled}
          required={required}
          autoComplete="off"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          {isLoading && (
            <div className="w-4 h-4 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
          )}
          <ChevronDown 
            size={16} 
            className="text-neutral-400" 
          />
        </div>
      </div>

      <datalist id={listId}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.label} />
        ))}
      </datalist>
      
      {/* Estilos adicionales para limpiar el icono nativo de datalist si se desea */}
      <style>{`
        input::-webkit-calendar-picker-indicator {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
