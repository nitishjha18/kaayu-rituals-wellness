import { useState, useEffect, useRef } from 'react';

const SearchOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center" style={{ background: 'rgba(24,90,66,0.90)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-[60%] max-w-[700px]">
        <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search rituals, ingredients..."
          className="w-full bg-transparent border-b-2 border-kaayu-accent text-white text-3xl font-heading py-4 outline-none placeholder:text-white/40"
        />
        <p className="text-white/50 text-sm mt-4 font-body">Press ESC to close</p>
      </div>
    </div>
  );
};

export default SearchOverlay;
