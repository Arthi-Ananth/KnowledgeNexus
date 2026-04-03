import React from 'react';
import { navLinks } from '../data/articles';

// Navigation icons
const icons = {
  grid: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  rocket: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9m0 0L5 21M19 12H5" />
    </svg>
  ),
  graduation: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  code: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  wrench: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  card: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
};

/**
 * Sidebar navigation component
 * @param {Object} props
 * @param {string} props.activeCategory - currently active category id
 * @param {function} props.onCategoryChange - callback when category changes
 * @param {boolean} props.isOpen - whether sidebar is open on mobile
 * @param {function} props.onClose - callback to close sidebar on mobile
 */
const Sidebar = ({ activeCategory, onCategoryChange, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          id="sidebar-overlay"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        id="main-sidebar"
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200
          z-30 transform transition-transform duration-300 ease-in-out overflow-y-auto
          lg:sticky lg:top-16 lg:translate-x-0 lg:min-h-[calc(100vh-4rem)] lg:flex-shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-4">
          {/* Section label */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 px-2 mb-3">
            Browse
          </p>

          {/* Navigation links */}
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => {
                  onCategoryChange(link.id);
                  onClose?.();
                }}
                className={`
                  w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-medium transition-all duration-200 cursor-pointer group
                  ${
                    activeCategory === link.id
                      ? 'bg-primary-50 text-primary font-semibold'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }
                `}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`transition-colors duration-200 ${
                      activeCategory === link.id
                        ? 'text-primary'
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  >
                    {icons[link.icon]}
                  </span>
                  {link.label}
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                    activeCategory === link.id
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
                  }`}
                >
                  {link.count}
                </span>
              </button>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-5 border-t border-slate-100" />

          {/* Help section */}
          <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 px-2 mb-3">
            Support
          </p>
          <div className="space-y-1">
            {['Contact Us', 'Report a Bug', 'Feature Request'].map((item) => (
              <button
                key={item}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all duration-200 cursor-pointer text-left"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Bottom card */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-primary to-primary-900 text-white">
            <p className="text-xs font-semibold opacity-80 mb-1">Need more help?</p>
            <p className="text-sm font-bold mb-3">Talk to our support team 24/7</p>
            <button className="w-full py-2 bg-white text-primary text-xs font-bold rounded-xl hover:bg-primary-50 transition-colors">
              Get Support
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
