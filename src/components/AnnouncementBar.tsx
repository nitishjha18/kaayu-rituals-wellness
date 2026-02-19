import { useState, useEffect } from 'react';

const messages = [
  'Authentic Blends Made for Real Results',
  'AYUSH Approved · GMP Certified · ISO Certified',
  'Free Shipping on Orders Above ₹999'
];

const AnnouncementBar = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % messages.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(prev => (prev + dir + messages.length) % messages.length);
      setFade(true);
    }, 200);
  };

  return (
    <div className="bg-kaayu-primary h-9 flex items-center justify-center relative"
      style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-accent-hex, #8baa4c)' }}>
      <button onClick={() => go(-1)} className="absolute left-4 text-kaayu-accent hover:opacity-70 transition-opacity" aria-label="Previous">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <span className={`transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}
        style={{ color: '#8baa4c' }}>
        {messages[current]}
      </span>
      <button onClick={() => go(1)} className="absolute right-4 text-kaayu-accent hover:opacity-70 transition-opacity" aria-label="Next">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  );
};

export default AnnouncementBar;
