import React from "react";

const EmojiCounter = ({ emoji, count, onClick }) => {
  return (
    <div className="flex items-center rounded-xl border-0 border-purple-300 align-middle shadow-md outline-2 ring-2 ring-pink-200 ring-offset-4">
      <button
        onClick={onClick}
        className="flex transform text-2xl transition-transform hover:scale-110 active:scale-90">
        {emoji}
      </button>
      <span className="ml-2 flex text-xl text-black">{count}</span>
    </div>
  );
};

export default EmojiCounter;
