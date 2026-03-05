import React from "react";

export default function Footer() {
  return (
    <footer className='relative bg-navy-900 border-t border-white/5'>
      <div className='max-w-7xl mx-auto px-6 py-12'>
        <div className='flex flex-col items-center text-center gap-6'>
          <img
            src='/assets/images/kanaf-1.png'
            alt='כנף 1'
            className='w-16 h-16 opacity-40'
          />
          <div>
            <p className='text-xl font-barlev font-bold text-white/80'>
              מגזין רמת דוד
            </p>
            <p className='text-sm text-white/30 mt-1'>
              מבצע שאגת הארי | כנף 1 - בסיס חיל האוויר רמת דוד
            </p>
          </div>
          <div className='w-16 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent' />
          <p className='text-xs text-white/20'>
            &copy; {new Date().getFullYear()} כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
}
