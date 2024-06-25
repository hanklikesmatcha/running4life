import React, { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onClose(), 450); // Additional delay to allow the animation to complete
      }, 1350);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen && !visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className={`relative transform rounded-lg bg-white p-6 shadow-lg transition-all duration-450 ${
          visible
            ? "rotate-6 scale-150 opacity-100"
            : "rotate-0 scale-90 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(() => onClose(), 500); // Additional delay to allow the animation to complete
          }}
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p className="text-black">{message}</p>
      </div>
    </div>
  );
};

export default Modal;
