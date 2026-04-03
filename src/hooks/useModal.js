import { useState, useCallback } from 'react';

/**
 * Custom hook to manage modal open/close state
 * @returns {{ isOpen: boolean, openModal: function, closeModal: function }}
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return { isOpen, openModal, closeModal };
};
