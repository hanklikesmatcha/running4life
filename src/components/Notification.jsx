import React, { useEffect } from "react";

const Notification = ({
  message,
  type = "error",
  duration = 3000,
  onClose
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="animate-fadeIn fixed left-1/2 top-16 z-50 -translate-x-1/2 transform">
      <div
        className={`alert alert-${type} rounded-lg bg-gradient-to-r from-pink-400 via-pink-300 to-purple-300 p-4 shadow-lg`}>
        <div>
          <span className="font-mono text-zinc-50">{message}</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Notification;
