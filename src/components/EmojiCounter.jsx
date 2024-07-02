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

  const emojiLabels = {
    "💛": "Love",
    "🥵": "Intense",
    "👫": "Friendly"
  };

  const label = emojiLabels[emoji] || "Unknown";

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center rounded-xl border-0 border-purple-300 p-1 shadow-md ring-2 ring-pink-200 ring-offset-2 transition-transform sm:text-lg md:text-xl ${isAnimating ? "emoji-bounce" : ""}`}
      disabled={isAnimating}>
      <span
        className={`mr-1 text-xs text-black sm:ml-2 sm:text-sm md:text-base ${isAnimating ? "emoji-pulse" : ""}`}>
        {count}
      </span>
      <span
        className={`-m-2 p-2 text-base ${isAnimating ? "emoji-bounce" : ""}`}>
        {emoji}
      </span>
      <span className="ml-1 text-xs text-black sm:ml-2 sm:text-sm md:text-base">
        {label}
      </span>
    </button>
  );
};

export default EmojiCounter;
