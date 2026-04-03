import React, { useState, useMemo } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { articles, stats, categories } from '../data/articles';

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

const EmptyStateIcon = () => (
  <svg className="w-20 h-20 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const statColors = {
  indigo: 'from-indigo-500 to-primary bg-indigo-50 text-indigo-600 border-indigo-100',
  emerald: 'from-emerald-500 to-teal-600 bg-emerald-50 text-emerald-600 border-emerald-100',
  amber: 'from-amber-500 to-orange-500 bg-amber-50 text-amber-600 border-amber-100',
  rose: 'from-rose-500 to-pink-600 bg-rose-50 text-rose-600 border-rose-100',
};

/**
 * Home page - Knowledge Base Dashboard
 * @param {Object} props
 * @param {string} props.activeCategory - current selected category filter
 * @param {function} props.onCreateNew - open the create article modal
 */
const Home = ({ activeCategory, onCreateNew }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let result = articles;

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((a) => a.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        return [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'popular':
        return [...result].sort((a, b) => b.views - a.views);
      case 'helpful':
        return [...result].sort((a, b) => b.helpful - a.helpful);
      default:
        return result;
    }
  }, [activeCategory, searchQuery, sortBy]);

  const activeCategoryLabel =
    categories.find((c) => c.id === activeCategory)?.label || 'All Articles';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const colorClasses = statColors[stat.color] || statColors.indigo;
          return (
            <div
              key={stat.label}
              className={`bg-white rounded-2xl border p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow ${colorClasses.split(' ').slice(2).join(' ')}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500">{stat.label}</p>
                <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-500">
                  <ArrowUpIcon />
                </span>
              </div>
              <p className="text-2xl font-extrabold text-slate-800">{stat.value}</p>
              <p className="text-[11px] text-slate-400">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{activeCategoryLabel}</h2>
          <p className="text-sm text-slate-500">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search - mobile */}
          <div className="relative flex-1 sm:w-52 md:hidden">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <SearchIcon />
            </span>
            <input
              id="mobile-search"
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Sort dropdown */}
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="helpful">Most Helpful</option>
          </select>

          <Button
            id="toolbar-create-btn"
            variant="primary"
            size="md"
            onClick={onCreateNew}
            icon={<PlusIcon />}
          >
            Create New
          </Button>
        </div>
      </div>

      {/* Featured article banner */}
      {activeCategory === 'all' && !searchQuery && (
        <div className="mb-8 rounded-3xl overflow-hidden bg-gradient-to-br from-secondary via-primary-900 to-primary p-6 sm:p-8 text-white relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-1/3 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-1/3 translate-y-1/2" />
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="max-w-lg">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-3 backdrop-blur-sm">
                ⭐ Featured Article
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold mb-2 leading-snug">
                Getting Started with Knowledge Base
              </h2>
              <p className="text-sm text-white/75 leading-relaxed">
                Set up your account, navigate the dashboard, and make the most out of all available features in just a few minutes.
              </p>
            </div>
            <button className="flex-shrink-0 px-5 py-2.5 bg-white text-primary text-sm font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-lg">
              Read Now →
            </button>
          </div>
        </div>
      )}

      {/* Articles grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredArticles.map((article) => (
            <Card key={article.id} article={article} />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div id="empty-state" className="flex flex-col items-center justify-center py-20 text-center">
          <EmptyStateIcon />
          <h3 className="text-lg font-bold text-slate-700 mt-4 mb-2">No articles found</h3>
          <p className="text-sm text-slate-400 max-w-xs mb-6">
            {searchQuery
              ? `No results for "${searchQuery}". Try a different search term.`
              : 'There are no articles in this category yet. Be the first to create one!'}
          </p>
          <Button
            id="empty-state-create-btn"
            variant="primary"
            onClick={onCreateNew}
            icon={<PlusIcon />}
          >
            Create First Article
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;
