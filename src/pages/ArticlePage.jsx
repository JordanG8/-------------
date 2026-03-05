import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { localArticles } from "../data/articles";

export default function ArticlePage() {
  const { id } = useParams();
  const articleIndex = parseInt(id, 10);
  const article = localArticles[articleIndex];

  if (!article) {
    return <Navigate to='/' replace />;
  }

  return (
    <main className='min-h-screen bg-navy-900 pt-28 pb-20'>
      <div className='max-w-4xl mx-auto px-6'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-gold-400 hover:text-gold-500 mb-10 font-semibold transition-colors group text-sm'>
          <svg
            className='w-4 h-4 transition-transform group-hover:translate-x-1'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
          </svg>
          חזרה לעמוד הראשי
        </Link>

        <article>
          {/* Hero image if exists */}
          {article.thumbnail && (
            <div className='relative rounded-2xl overflow-hidden aspect-video mb-10 bg-navy-800'>
              <img
                src={article.thumbnail}
                alt={article.title}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent' />
            </div>
          )}

          <h1 className='text-3xl sm:text-4xl md:text-5xl font-barlev font-bold text-white mb-6 leading-tight'>
            {article.title}
          </h1>

          <div className='w-16 h-1 bg-gold-500 rounded-full mb-8' />

          <div className='text-lg sm:text-xl text-gray-300 leading-relaxed mb-12'>
            <p>{article.content}</p>
          </div>

          {article.video && (
            <div className='rounded-2xl overflow-hidden bg-black shadow-2xl shadow-black/50 border border-white/5'>
              <video
                controls
                className='w-full aspect-video object-contain'
                preload='metadata'
                poster={article.thumbnail}
                autoPlay>
                <source src={article.video} type='video/mp4' />
                הדפדפן שלך אינו תומך בתגית וידאו.
              </video>
            </div>
          )}
        </article>

        {/* Navigation to adjacent articles */}
        <div className='mt-16 pt-8 border-t border-white/5 flex justify-between items-center'>
          {articleIndex > 0 ? (
            <Link
              to={`/article/${articleIndex - 1}`}
              className='text-sm text-gray-400 hover:text-gold-400 transition-colors group flex items-center gap-2'>
              <svg className='w-4 h-4 transition-transform group-hover:translate-x-1' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
              </svg>
              {localArticles[articleIndex - 1].title}
            </Link>
          ) : <div />}
          {articleIndex < localArticles.length - 1 ? (
            <Link
              to={`/article/${articleIndex + 1}`}
              className='text-sm text-gray-400 hover:text-gold-400 transition-colors group flex items-center gap-2'>
              {localArticles[articleIndex + 1].title}
              <svg className='w-4 h-4 transition-transform group-hover:-translate-x-1' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </div>
    </main>
  );
}
