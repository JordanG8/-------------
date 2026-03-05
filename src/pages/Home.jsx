import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { localArticles, articlesData } from "../data/articles";
import useScrollReveal from "../hooks/useScrollReveal";
import VideoModal from "../components/VideoModal";

/* ─── small reusable scroll-reveal wrapper ─── */
function Reveal({ children, className = "", stagger = false }) {
  const ref = useScrollReveal(0.1);
  return (
    <div ref={ref} className={`${stagger ? "stagger-children" : "fade-in-up"} ${className}`}>
      {children}
    </div>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* background image */}
      <div className='absolute inset-0'>
        <img
          src='/assets/images/photo_2026-03-03_20-15-22.jpg.jpeg'
          alt='טייס חיל האוויר עומד מול מטוס F-16 בבסיס רמת דוד'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900' />
        <div className='absolute inset-0 bg-gradient-to-r from-navy-900/50 to-transparent' />
      </div>

      {/* content */}
      <div className='relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-32'>
        <img
          src='/assets/images/kanaf-1.png'
          alt='סמל כנף 1 - בסיס חיל האוויר רמת דוד'
          className='w-20 h-20 mx-auto mb-6 hero-badge drop-shadow-2xl'
        />
        <p className='text-gold-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4'>
          כנף 1 | בסיס חיל האוויר רמת דוד
        </p>
        <h1 className='text-5xl sm:text-6xl md:text-8xl font-barlev font-bold text-white leading-[1.1] mb-6'>
          מבצע{" "}
          <span className='gradient-text'>שאגת הארי</span>
        </h1>
        <p className='text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10'>
          העולם כולו ראה מה שאתם עשיתם.
          <br />
          הנה ההוכחה.
        </p>

        {/* operation logo */}
        <img
          src='/assets/images/מבצע-שאגת-הארי.jpg'
          alt='לוגו מבצע שאגת הארי - אריה עם דגל ישראל'
          className='w-48 sm:w-56 mx-auto rounded-xl shadow-2xl shadow-black/40 border border-white/10'
        />

        {/* scroll indicator */}
        <div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40'>
          <span className='text-xs tracking-widest'>גלול למטה</span>
          <div className='w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1'>
            <div className='w-1 h-2 bg-gold-400 rounded-full animate-bounce' />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── STATS BAR ─── */
function StatsBar() {
  const totalItems = articlesData.reduce((sum, cat) => sum + cat.items.length, 0);
  const videoCount = articlesData.reduce(
    (sum, cat) => sum + cat.items.filter((i) => i.type === "video").length,
    0
  );
  const ref = useScrollReveal(0.3);

  const stats = [
    { value: articlesData.length, label: "קטגוריות סיקור" },
    { value: totalItems, label: "פרסומים בתקשורת" },
    { value: videoCount + localArticles.filter((a) => a.video).length, label: "כתבות וידאו" },
    { value: "10+", label: 'כטב"מים שיורטו' },
  ];

  return (
    <section className='relative -mt-16 z-20'>
      <div
        ref={ref}
        className='fade-in-up max-w-5xl mx-auto px-6'>
        <div className='bg-navy-700/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/30'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, i) => (
              <div key={i} className='text-center'>
                <div className='text-3xl sm:text-4xl font-barlev font-bold shine-text'>
                  {stat.value}
                </div>
                <div className='text-sm text-gray-400 mt-1 font-medium'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURED STORIES (local articles with video) ─── */
function FeaturedStories() {
  const featured = localArticles.filter((a) => a.video);
  const nonFeatured = localArticles.filter((a) => !a.video);

  return (
    <section id='stories' className='max-w-7xl mx-auto px-6 pt-24 pb-12'>
      <Reveal>
        <div className='flex items-center gap-4 mb-12'>
          <div className='h-px flex-1 bg-gradient-to-l from-gold-500/30 to-transparent' />
          <h2 className='text-3xl sm:text-4xl font-barlev font-bold text-white text-center'>
            הסיפורים <span className='text-gold-400'>שלנו</span>
          </h2>
          <div className='h-px flex-1 bg-gradient-to-r from-gold-500/30 to-transparent' />
        </div>
      </Reveal>

      {/* main featured: first article full-width */}
      {featured[0] && (
        <Reveal className='mb-8'>
          <Link to='/article/0' className='group block'>
            <div className='relative rounded-2xl overflow-hidden aspect-[21/9] bg-navy-800'>
              <img
                src={featured[0].thumbnail}
                alt={featured[0].title}
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent' />
              <div className='absolute inset-0 bg-gradient-to-r from-navy-900/60 to-transparent' />

              {/* play icon */}
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-400/20'>
                <svg className='w-8 h-8 text-white mr-[-2px]' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                  <path d='M8 5v14l11-7z' />
                </svg>
              </div>

              <div className='absolute bottom-0 right-0 p-8 sm:p-12 max-w-2xl'>
                <span className='inline-block bg-accent-red/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-wider'>
                  כתבה ראשית
                </span>
                <h3 className='text-2xl sm:text-4xl font-barlev font-bold text-white leading-tight mb-3'>
                  {featured[0].title}
                </h3>
                <p className='text-gray-300 text-base sm:text-lg leading-relaxed'>
                  {featured[0].content}
                </p>
              </div>
            </div>
          </Link>
        </Reveal>
      )}

      {/* remaining featured articles in grid */}
      <Reveal stagger className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        {featured.slice(1).map((article) => {
          const realIndex = localArticles.indexOf(article);
          return (
            <Link to={`/article/${realIndex}`} key={realIndex} className='group block'>
              <div className='relative rounded-xl overflow-hidden aspect-video bg-navy-800'>
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent' />

                {/* play icon */}
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-400/20'>
                  <svg className='w-6 h-6 text-white mr-[-2px]' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                    <path d='M8 5v14l11-7z' />
                  </svg>
                </div>

                <div className='absolute bottom-0 right-0 p-6'>
                  <span className='inline-block bg-gold-500/20 text-gold-400 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 tracking-wider border border-gold-500/30'>
                    וידאו
                  </span>
                  <h3 className='text-xl font-barlev font-bold text-white leading-tight mb-1'>
                    {article.title}
                  </h3>
                  <p className='text-gray-400 text-sm line-clamp-2'>
                    {article.content}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </Reveal>

      {/* non-featured articles */}
      {nonFeatured.length > 0 && (
        <Reveal stagger className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {nonFeatured.map((article) => {
            const realIndex = localArticles.indexOf(article);
            return (
              <Link to={`/article/${realIndex}`} key={realIndex} className='group block'>
                <div className='bg-navy-700/50 border border-white/5 rounded-xl p-6 h-full flex flex-col transition-all duration-300 hover:bg-navy-700/80 hover:border-gold-500/20 hover:shadow-lg hover:shadow-gold-500/5'>
                  <h3 className='text-lg font-barlev font-bold text-white mb-3 group-hover:text-gold-400 transition-colors leading-snug'>
                    {article.title}
                  </h3>
                  <p className='text-gray-400 text-sm leading-relaxed flex-grow'>
                    {article.content}
                  </p>
                  <div className='mt-4 pt-4 border-t border-white/5 flex items-center text-gold-400 text-sm font-medium'>
                    <span>קרא עוד</span>
                    <svg className='w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24' aria-hidden='true'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M19 12H5m0 0l7 7m-7-7l7-7' />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </Reveal>
      )}
    </section>
  );
}

/* ─── QUOTE DIVIDER ─── */
function QuoteDivider() {
  return (
    <Reveal className='max-w-4xl mx-auto px-6 py-20'>
      <div className='relative text-center'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl text-gold-500/10 font-serif select-none' aria-hidden='true'>
          &ldquo;
        </div>
        <blockquote className='text-2xl sm:text-3xl font-barlev text-white/90 leading-relaxed'>
          &ldquo;בכל פעם שמטוס ממריא, אנחנו יודעים
          <br className='hidden sm:block' />
          שבלעדינו הוא לא יכול לעשות היסטוריה&rdquo;
        </blockquote>
        <cite className='block mt-6 text-gold-400 text-sm font-semibold not-italic tracking-wide'>
          רס&quot;ן פ&apos; - קצין טכני בטייסת 109
        </cite>
      </div>
    </Reveal>
  );
}

/* ─── MEDIA WALL ─── */
function MediaWall({ onPlayVideo }) {
  const typeIcon = (type) =>
    type === "video" ? (
      <span className='flex items-center gap-1 bg-accent-red/15 text-accent-red text-[10px] font-bold px-2 py-0.5 rounded-full border border-accent-red/20'>
        <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
          <path d='M8 5v14l11-7z' />
        </svg>
        וידאו
      </span>
    ) : (
      <span className='bg-white/5 text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10'>
        כתבה
      </span>
    );

  const isLocalVideo = (url) => url.startsWith("/assets/videos/");

  const handleClick = (e, item) => {
    if (isLocalVideo(item.url)) {
      e.preventDefault();
      onPlayVideo({ src: item.url, poster: item.thumbnail });
    }
  };

  return (
    <section id='media' className='max-w-7xl mx-auto px-6 py-20'>
      <Reveal>
        <div className='flex items-center gap-4 mb-4'>
          <div className='h-px flex-1 bg-gradient-to-l from-gold-500/30 to-transparent' />
          <h2 className='text-3xl sm:text-4xl font-barlev font-bold text-white text-center'>
            רמת דוד <span className='text-gold-400'>בתקשורת</span>
          </h2>
          <div className='h-px flex-1 bg-gradient-to-r from-gold-500/30 to-transparent' />
        </div>
        <p className='text-center text-gray-400 text-base mb-14 max-w-2xl mx-auto'>
          הנה כל מה שהתקשורת בישראל ובעולם פרסמה עלינו - ראיונות, כתבות, ותיעודים
          שמראים את התרומה שלכם למבצע.
        </p>
      </Reveal>

      <div className='space-y-16'>
        {articlesData.map((category, idx) => (
          <Reveal key={idx}>
            <div>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-1 h-8 bg-gold-500 rounded-full' />
                <h3 className='text-xl font-barlev font-bold text-white'>
                  {category.category}
                </h3>
                <span className='bg-white/5 text-gray-500 text-xs px-2.5 py-0.5 rounded-full border border-white/10'>
                  {category.items.length} פרסומים
                </span>
              </div>

              <Reveal stagger>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {category.items.map((item, itemIdx) => {
                    const isLocal = isLocalVideo(item.url);
                    return (
                      <a
                        href={item.url}
                        target={isLocal ? undefined : "_blank"}
                        rel={isLocal ? undefined : "noopener noreferrer"}
                        onClick={(e) => handleClick(e, item)}
                        key={itemIdx}
                        className='group bg-navy-700/40 border border-white/5 rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:bg-navy-700/70 hover:border-gold-500/20 hover:shadow-lg hover:shadow-gold-500/5 hover:-translate-y-0.5 cursor-pointer'>
                        {item.thumbnail && (
                          <div className='relative aspect-video bg-navy-800 overflow-hidden'>
                            <img
                              src={item.thumbnail}
                              alt={item.title || `תמונה מתוך פרסום ב${item.source}`}
                              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent' />
                            {item.type === "video" && (
                              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center'>
                                <svg className='w-4 h-4 text-white mr-[-1px]' fill='currentColor' viewBox='0 0 24 24' aria-hidden='true'>
                                  <path d='M8 5v14l11-7z' />
                                </svg>
                              </div>
                            )}
                          </div>
                        )}
                        <div className='p-4 flex flex-col flex-grow'>
                          <div className='flex items-center justify-between mb-2'>
                            <span className='text-[11px] font-bold text-gold-400 tracking-wide'>
                              {item.source}
                            </span>
                            {typeIcon(item.type)}
                          </div>
                          <h4 className='text-sm font-medium text-gray-300 group-hover:text-white transition-colors leading-relaxed line-clamp-3 flex-grow'>
                            {item.title || `פרסום ב${item.source}`}
                          </h4>
                          <div className='mt-3 pt-3 border-t border-white/5 flex items-center text-xs text-gray-500 group-hover:text-gold-400/70 transition-colors'>
                            <span>{isLocal ? "צפה בסרטון" : "פתח קישור"}</span>
                            <svg className='w-3 h-3 mr-1 transition-transform group-hover:-translate-x-0.5' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24' aria-hidden='true'>
                              {isLocal ? (
                                <path strokeLinecap='round' strokeLinejoin='round' d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' />
                              ) : (
                                <path strokeLinecap='round' strokeLinejoin='round' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                              )}
                            </svg>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── CLOSING MESSAGE ─── */
function ClosingMessage() {
  return (
    <Reveal className='py-24'>
      <div className='relative max-w-4xl mx-auto px-6'>
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gold-500/5 to-transparent rounded-3xl' />
        <div className='relative bg-navy-800/50 border border-gold-500/10 rounded-3xl p-10 sm:p-16 text-center backdrop-blur-sm'>
          <img
            src='/assets/images/מבצע-שאגת-הארי.jpg'
            alt='לוגו מבצע שאגת הארי'
            className='w-28 mx-auto mb-8 rounded-lg shadow-xl shadow-black/30 border border-white/10'
          />
          <h2 className='text-3xl sm:text-4xl font-barlev font-bold text-white mb-6'>
            לכל חייל וחיילת <span className='text-gold-400'>בכנף 1</span>
          </h2>
          <p className='text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto mb-4'>
            כל ראיון, כל כתבה, כל שניית שידור - זה בזכותכם.
            הטייסים, הטכנאים, אנשי המבצעים, הלוגיסטיקה, התחזוקה -
            כל אחד ואחת מכם הם חלק מההיסטוריה הזאת.
          </p>
          <p className='text-xl font-barlev font-bold text-gold-400'>
            עם כלביא - טייסת 105
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── HOME PAGE ─── */
export default function Home() {
  const [videoModal, setVideoModal] = useState(null);
  const closeVideo = useCallback(() => setVideoModal(null), []);

  return (
    <main id='main-content'>
      <Hero />
      <StatsBar />
      <FeaturedStories />
      <QuoteDivider />
      <MediaWall onPlayVideo={setVideoModal} />
      <ClosingMessage />

      {videoModal && (
        <VideoModal
          src={videoModal.src}
          poster={videoModal.poster}
          onClose={closeVideo}
        />
      )}
    </main>
  );
}
