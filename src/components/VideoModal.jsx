import React, { useEffect, useRef } from "react";

export default function VideoModal({ src, poster, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className='fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-8'
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role='dialog'
      aria-modal='true'
      aria-label='נגן וידאו'>
      <div className='relative w-full max-w-5xl'>
        <button
          onClick={onClose}
          className='absolute -top-12 left-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium'
          aria-label='סגור נגן וידאו'>
          <svg className='w-5 h-5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
          סגור
        </button>
        <div className='rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10'>
          <video
            controls
            autoPlay
            className='w-full aspect-video object-contain'
            preload='metadata'
            poster={poster}>
            <source src={src} type='video/mp4' />
            הדפדפן שלך אינו תומך בתגית וידאו.
          </video>
        </div>
      </div>
    </div>
  );
}
