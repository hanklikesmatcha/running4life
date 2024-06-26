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
    <div className="flex items-center rounded-xl border-0 border-purple-300 align-middle shadow-md outline-2 ring-2 ring-pink-200 ring-offset-4">
      <button
        onClick={handleClick}
        className={`flex transform text-2xl transition-transform ${isAnimating ? "emoji-bounce" : ""}`}
        disabled={isAnimating}>
        {emoji}
      </button>
      <span
        className={`ml-2 flex text-xl text-black ${isAnimating ? "emoji-pulse" : ""}`}>
        {count}
      </span>
    </div>
  );
};

export default EmojiCounter;
