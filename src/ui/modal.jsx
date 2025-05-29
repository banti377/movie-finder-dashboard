import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-500"
            aria-label="Close modal"
          >
            ✕
          </button>

          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
