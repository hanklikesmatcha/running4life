// src/components/LoadingIndicator.jsx
import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <style jsx>{`
        .loader {
          display: flex;
          justify-content: space-around;
          width: 4rem;
          height: 4rem;
        }
        .dot {
          width: 0.75rem;
          height: 0.75rem;
          margin: 0.25rem;
          background-color: #ff69b4; /* Pink color */
          border-radius: 50%;
          animation: bounce 1.2s infinite ease-in-out;
        }
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
        @media (max-width: 640px) {
          .loader {
            width: 2rem;
            height: 2rem;
          }
          .dot {
            width: 0.5rem;
            height: 0.5rem;
            margin: 0.15rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingIndicator;
