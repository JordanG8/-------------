import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-900/95 backdrop-blur-md shadow-lg shadow-black/30 py-3"
          : "bg-transparent py-5"
      }`}>
      <div className='max-w-7xl mx-auto px-6 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-3 group' aria-label='מגזין רמת דוד - עמוד הבית'>
          <img
            src='/assets/images/kanaf-1.png'
            alt='כנף 1'
            className='w-12 h-12 transition-transform duration-300 group-hover:scale-110'
          />
          <div className='hidden sm:block'>
            <span className='text-lg font-barlev font-bold text-white leading-none tracking-wide block'>
              מגזין רמת דוד
            </span>
            <p className='text-[11px] text-gold-400 font-medium tracking-widest mt-0.5'>
              כנף 1 | בסיס חיל האוויר
            </p>
          </div>
        </Link>
        <nav className='flex items-center gap-1' aria-label='ניווט ראשי'>
          <a
            href='#stories'
            className='px-3 py-1.5 text-sm text-gray-300 hover:text-gold-400 transition-colors rounded-lg hover:bg-white/5'>
            סיפורים
          </a>
          <a
            href='#media'
            className='px-3 py-1.5 text-sm text-gray-300 hover:text-gold-400 transition-colors rounded-lg hover:bg-white/5'>
            בתקשורת
          </a>
        </nav>
      </div>
    </header>
  );
}
