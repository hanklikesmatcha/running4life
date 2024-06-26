import React, { useState } from "react";

const EmojiCounter = ({ emoji, count, onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Duration matches the CSS animation duration
    onClick();
    setIsAnimating(false);
  };

  return (
    <div className="flex items-center justify-center rounded-xl border-0 border-purple-300 shadow-md p-1 ring-2 ring-pink-200 ring-offset-2">
      <button
        onClick={handleClick}
        className={`text-base sm:text-lg md:text-xl transition-transform ${isAnimating ? "emoji-bounce" : ""}`}
        disabled={isAnimating}>
        {emoji}
      </button>
      <span className={`ml-1 sm:ml-2 text-xs sm:text-sm md:text-base text-black ${isAnimating ? "emoji-pulse" : ""}`}>
        {count}
      </span>
    </div>
  );
};

export default EmojiCounter;