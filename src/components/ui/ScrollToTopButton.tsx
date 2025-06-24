import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-partner-500 text-white shadow-lg transition-opacity duration-300 hover:bg-partner-600 focus:outline-none ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton; 