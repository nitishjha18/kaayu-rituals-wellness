import { useState, useEffect } from 'react';

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (!show) return null;

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-kaayu-primary flex items-center justify-center shadow-lg hover:bg-kaayu-olive transition-colors z-[1500]"
      aria-label="Back to top">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8baa4c" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
    </button>
  );
};

export default BackToTop;
