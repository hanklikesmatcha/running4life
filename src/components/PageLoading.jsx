import React from "react";

const PageLoading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-pink-200 to-purple-400">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-pink-400 border-t-transparent md:h-32 md:w-32 md:border-8"></div>
        <div className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center md:h-32 md:w-32">
          <span className="animate-pulse text-3xl text-pink-400 md:text-6xl">
            ❤️
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
