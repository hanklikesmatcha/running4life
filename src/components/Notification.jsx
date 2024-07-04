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

  const getGradientClass = (type) => {
    switch (type) {
      case "success":
        return "from-pink-400 via-pink-300 to-purple-300";
      case "error":
        return "from-red-500 via-red-400 to-orange-400";
      default:
        return "from-gray-400 via-gray-300 to-gray-500";
    }
  };

  return (
    <div className="animate-fadeIn fixed left-1/2 top-16 z-50 -translate-x-1/2 transform">
      <div
        className={`alert rounded-lg bg-gradient-to-r ${getGradientClass(
          type
        )} p-4 shadow-lg`}>
        <div>
          <span className="font-mono text-zinc-50">{message}</span>
        </div>
      </div>
      <style>{`
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
