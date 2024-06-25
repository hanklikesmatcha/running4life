"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import FeedbackButton from "./components/FeedbackButton";

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const [emojiCounts, setEmojiCounts] = useState({
    "💛": 0,
    "🏎️": 0,
    "🥵": 0,
    "👫": 0,
    "🏞": 0
  });

  useEffect(() => {
    if(clubs.length === 0) {
      fetch("/api/clubs")
        .then((res) => res.json())
        .then((data) => setClubs(data))
        .catch((error) => console.error(error));
    }
  }, [clubs]);

  const handleEmojiClick = (emoji) => {
    setEmojiCounts((prevCounts) => ({
      ...prevCounts,
      [emoji]: prevCounts[emoji] + 1
    }));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-purple-400 py-8">
      <div className="">
        <Image
          src="/logo.png" // Ensure the file name and path are correct
          alt="Running Club"
          width={400}
          height={400}
          className="m-0 p-0"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 pb-10">
        {clubs.map((card, index) => (
          <div
            key={index}
            className="hover:bg-primary-focus aspect-w-16 aspect-h-9 card w-full max-w-4xl bg-base-100 shadow-xl transition-colors duration-300">
            <div className="card-body p-6">
              <div className="flex items-center justify-start gap-2">
                <h2 className="card-title text-secondary">{card.title}</h2>
                <a
                  href={card.instagram}
                  className="text-sm text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer">
                  🔗
                </a>
              </div>
              <p className="text-accent">{card.description}</p>
              <div className="mt-2 border-t pt-2">
                <div className="w-full flex justify-center">
                  <table className="table w-full max-w-full text-black">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="w-1/6">Date</th>
                        <th className="w-1/3">Location</th>
                        <th className="w-1/6">Distance</th>
                        <th className="w-1/6">Speed</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="w-1/6">{card.time}</td>
                        <td className="w-1/3">{card.location}</td>
                        <td className="w-1/6">{card.distance}</td>
                        <td className="w-1/6">{card.speed}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-2 flex justify-around pt-2 gap-4">
                {Object.keys(emojiCounts).map((emoji, idx) => (
                  <div
                    key={emoji}
                    className="flex items-center align-middle border-0 shadow-md border-purple-300 ring-pink-200 rounded-xl outline-2 ring-2 ring-offset-4">
                    <button
                      onClick={() => handleEmojiClick(emoji)}
                      className="flex transform text-2xl transition-transform hover:scale-110 active:scale-90">
                      {emoji}
                    </button>
                    <span className="ml-2 flex text-xl text-black">
                      {emojiCounts[emoji]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <FeedbackButton />
    </div>
  );
};

export default Home;