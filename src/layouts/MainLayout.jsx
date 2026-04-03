import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

/**
 * Main layout wrapper that provides Header + Sidebar + content area
 */
const MainLayout = ({ children, onCreateNew, activeCategory, onCategoryChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header
        onCreateNew={onCreateNew}
        onMenuToggle={() => setSidebarOpen((prev) => !prev)}
      />

      <div className="flex flex-1">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main id="main-content" className="flex-1 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
