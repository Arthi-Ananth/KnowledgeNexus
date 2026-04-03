import React from 'react';

const colorMap = {
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    badge: 'bg-indigo-100 text-indigo-700',
    avatar: 'bg-indigo-500',
    dot: 'bg-indigo-500',
    tag: 'bg-indigo-50 text-indigo-600',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    badge: 'bg-purple-100 text-purple-700',
    avatar: 'bg-purple-500',
    dot: 'bg-purple-500',
    tag: 'bg-purple-50 text-purple-600',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    badge: 'bg-blue-100 text-blue-700',
    avatar: 'bg-blue-500',
    dot: 'bg-blue-500',
    tag: 'bg-blue-50 text-blue-600',
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    badge: 'bg-rose-100 text-rose-700',
    avatar: 'bg-rose-500',
    dot: 'bg-rose-500',
    tag: 'bg-rose-50 text-rose-600',
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700',
    avatar: 'bg-emerald-500',
    dot: 'bg-emerald-500',
    tag: 'bg-emerald-50 text-emerald-600',
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    badge: 'bg-amber-100 text-amber-700',
    avatar: 'bg-amber-500',
    dot: 'bg-amber-500',
    tag: 'bg-amber-50 text-amber-600',
  },
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    badge: 'bg-teal-100 text-teal-700',
    avatar: 'bg-teal-500',
    dot: 'bg-teal-500',
    tag: 'bg-teal-50 text-teal-600',
  },
  violet: {
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    badge: 'bg-violet-100 text-violet-700',
    avatar: 'bg-violet-500',
    dot: 'bg-violet-500',
    tag: 'bg-violet-50 text-violet-600',
  },
};

const EyeIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ThumbsUpIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-3 h-3 fill-amber-400 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

/**
 * Article card component
 * @param {Object} props
 * @param {Object} props.article - article data object
 */
const Card = ({ article }) => {
  const colors = colorMap[article.color] || colorMap.indigo;

  const formatViews = (views) => {
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <article
      id={`article-card-${article.id}`}
      className={`
        group relative bg-white rounded-2xl border ${colors.border}
        shadow-sm hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 overflow-hidden cursor-pointer
        flex flex-col
      `}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${colors.dot}`} />

      {/* Featured badge */}
      {article.featured && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full border border-amber-200">
            <StarIcon />
            Featured
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Category badge */}
        <div className="mb-3">
          <span className={`badge ${colors.badge} text-[11px]`}>
            {article.categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-800 text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {article.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${colors.tag}`}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          {/* Author */}
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full ${colors.avatar} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
              {article.authorAvatar}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 leading-tight">{article.author}</p>
              <p className="text-[10px] text-slate-400 leading-tight">{article.date}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 text-slate-400">
            <span className="flex items-center gap-1 text-[11px]">
              <ClockIcon />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <EyeIcon />
              {formatViews(article.views)}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-500">
              <ThumbsUpIcon />
              {article.helpful}%
            </span>
          </div>
        </div>
      </div>

      {/* Read more hover effect */}
      <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-10 overflow-hidden transition-all duration-300 bg-gradient-to-t from-primary/5 to-transparent flex items-end justify-center pb-2.5">
        <span className="flex items-center gap-1 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Read Article <ArrowRightIcon />
        </span>
      </div>
    </article>
  );
};

export default Card;
