import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Modal from './components/Modal';
import Form from './components/Form';
import { useModal } from './hooks/useModal';

/**
 * Root application component
 * Manages global state: active category and modal visibility
 */
const App = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [activeCategory, setActiveCategory] = useState('all');

  const handleFormSubmit = (formData) => {
    // In a real app, you'd dispatch to state or call an API here
    console.log('New article submitted:', formData);
  };

  return (
    <>
      <MainLayout
        onCreateNew={openModal}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      >
        <Home
          activeCategory={activeCategory}
          onCreateNew={openModal}
        />
      </MainLayout>

      {/* Create Article Modal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Create New Article"
      >
        <Form onClose={closeModal} onSubmit={handleFormSubmit} />
      </Modal>
    </>
  );
};

export default App;
