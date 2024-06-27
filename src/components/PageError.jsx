import React from "react";

const ErrorPageComponent = ({ message }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-purple-400">
      <div className="relative">
        <div className="h-16 w-16 animate-ping rounded-full md:h-32 md:w-32">
          <span className="absolute inset-0 flex items-center justify-center text-3xl text-pink-400 md:text-6xl">
            😢
          </span>
        </div>
      </div>

      <h2 className="text-3xl text-pink-500 md:text-xl">
        Sorry, we are currently unavailable!
      </h2>
      <h3 className="text-2xl text-pink-500 md:text-lg">
        We will be back with you soon!
      </h3>
      <p className="text-lg text-pink-700 md:text-lg">
        {message || "Something went wrong!"}
      </p>
    </div>
  );
};

export default ErrorPageComponent;
