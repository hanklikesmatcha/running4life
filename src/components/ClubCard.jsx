import React from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { FaInstagram, FaLink } from "react-icons/fa";
import EmojiCounter from "./EmojiCounter.jsx";

const placeholderImage = "/examples/pink-frame.png";

const isInstagramUrl = (url) => {
  return url.includes("instagram.com");
};

const ClubCard = ({ club, handleReaction }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/clubs/${club._id}/huddle`);
  };

  return (
    <div className="hover:bg-primary-focus card w-full max-w-4xl bg-base-100 shadow-xl transition-colors duration-300">
      <div className="card-body p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="card-title relative inline-block text-secondary-content">
              <span className="shine-text animate-shine">{club.title}</span>
            </h2>
            <button
              onClick={handleButtonClick}
              className="btn btn-sm btn-primary ml-2"
            >
              Join the Fun Club!
            </button>
          </div>
          <a
            href={club.instagram}
            className="text-2xl text-gray-800 hover:text-gray-900 lg:text-4xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {isInstagramUrl(club.instagram) ? (
              <FaInstagram className="text-pink-600" />
            ) : (
              <FaLink className="text-blue-600" />
            )}
          </a>
        </div>
        <p className="text-accent-content">{club.description}</p>
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
          <div className="animate-rainbow absolute left-0 right-0 top-0 flex justify-center text-base font-semibold text-zinc-950">
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
        {club.photos && club.photos.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {club.photos.map((photo, index) => (
              <div
                key={index}
                className="pb-9by16 relative w-full overflow-hidden rounded-lg">
                <Image
                  src={photo.url || placeholderImage}
                  alt={`Club photo ${index + 1}`}
                  layout="fill"
                  className="absolute h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubCard;