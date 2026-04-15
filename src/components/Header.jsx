import React, { useState } from 'react';
import Button from './Button';

// Icons as inline SVG components
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
  </svg>
);

/**
 * Header component
 * @param {Object} props
 * @param {function} props.onCreateNew - callback to open create modal
 * @param {function} props.onMenuToggle - callback to toggle sidebar on mobile
 */
const Header = ({ onCreateNew, onMenuToggle }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header
      id="main-header"
      className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 gap-4">
        {/* Left: Logo + Menu toggle */}
        <div className="flex items-center gap-3">
          <button
            id="sidebar-menu-toggle"
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            aria-label="Toggle sidebar"
          >
            <MenuIcon />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-900 flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-secondary leading-tight">KnowledgeNexus</h1>
              <p className="text-xs text-slate-400 leading-tight">Help Center</p>
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <SearchIcon />
            </span>
            <input
              id="header-search"
              type="search"
              placeholder="Search articles, guides..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            id="notification-btn"
            className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {/* User avatar */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary-900 flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer hover:scale-105 transition-transform">
            A
          </div>

          <Button
            id="create-new-btn"
            variant="primary"
            size="sm"
            onClick={onCreateNew}
            icon={<PlusIcon />}
            className="hidden sm:inline-flex ml-1"
          >
            Create New
          </Button>

          {/* Mobile create button */}
          <button
            id="create-new-mobile-btn"
            onClick={onCreateNew}
            className="sm:hidden p-2 rounded-xl bg-primary text-white hover:bg-primary-600 transition-colors shadow-md"
            aria-label="Create new article"
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
