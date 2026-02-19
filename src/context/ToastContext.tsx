import { createContext, useContext, useState, ReactNode } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
  toasts: { id: number; message: string }[];
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useKaayuToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useKaayuToast must be used within ToastProvider');
  return ctx;
};

let toastId = 0;

export const KaayuToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const showToast = (message: string) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast, toasts }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
        {toasts.map(t => (
          <div key={t.id}
            className="bg-kaayu-primary border-l-4 border-kaayu-accent px-6 py-4 rounded shadow-lg animate-slide-in-right"
            style={{ color: 'white', fontFamily: 'var(--font-body)', fontSize: '15px', minWidth: '280px' }}
          >
            {t.message}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right { animation: slideInRight 0.3s ease forwards; }
      `}</style>
    </ToastContext.Provider>
  );
};
