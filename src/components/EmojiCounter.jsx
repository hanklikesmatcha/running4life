import React, { useState } from "react";

const EmojiCounter = ({ emoji, count, onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    await new Promise((resolve) => setTimeout(resolve, 710)); // Adjust the duration as needed
    onClick();
    setIsAnimating(false);
  };

  return (
    <div className="flex items-center rounded-xl border-0 border-purple-300 align-middle shadow-md outline-2 ring-2 ring-pink-200 ring-offset-4">
      <button
        onClick={handleClick}
        className={`flex transform text-2xl transition-transform ${
          isAnimating
            ? "animate-ring pointer-events-none rounded-full"
            : "rounded-full hover:scale-110 active:scale-90"
        }`}
        disabled={isAnimating}>
        {emoji}
      </button>
      <span className="ml-2 flex text-xl text-black">{count}</span>
    </div>
  );
};

export default EmojiCounter;
