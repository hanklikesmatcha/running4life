
import React from "react";
import EmojiCounter from "./EmojiCounter.jsx";

const ClubCard = ({ club, handleReaction }) => {
  return (
    <div className="hover:bg-primary-focus card w-full max-w-4xl bg-base-100 shadow-xl transition-colors duration-300">
      <div className="card-body p-6">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-secondary">{club.title}</h2>
          <a
            href={club.instagram}
            className="text-sm text-blue-500"
            target="_blank"
            rel="noopener noreferrer">
            🔗
          </a>
        </div>
        <p className="text-accent">{club.description}</p>
        <div className="mt-2 border-t pt-2">
          <div className="flex w-full justify-center">
            <table className="table w-full text-sm text-black md:text-base">
              <thead className="bg-red-200">
                <tr>
                  <th className="w-1/6 p-1 md:p-2">Date</th>
                  <th className="w-1/3 p-1 md:p-2">Location</th>
                  <th className="w-1/6 p-1 md:p-2">Distance</th>
                  <th className="w-1/6 p-1 md:p-2">Speed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-1/6 p-1 md:p-2">{club.time}</td>
                  <td className="w-1/3 p-1 md:p-2">{club.location}</td>
                  <td className="w-1/6 p-1 md:p-2">{club.distance}</td>
                  <td className="w-1/6 p-1 md:p-2">{club.speed}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="relative mt-2 flex flex-wrap justify-around gap-2 pt-10">
          <div className="md:sm absolute left-0 top-0 text-base font-bold text-cyan-500">
            Vibe 
          </div>
          {Object.entries(club.reactions).map(([emoji, count]) => (
            <EmojiCounter
              key={emoji}
              emoji={emoji}
              count={count}
              onClick={() => handleReaction(club._id, emoji)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
