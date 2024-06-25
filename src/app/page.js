"use client";

import React, { useState } from "react";
import Image from "next/image";
import FeedbackButton from "./components/FeedbackButton";

const cards = [
  {
    title: "re:movement",
    description: "come move and groove with us!",
    time: "Sun, 6:45 AM",
    location: "Vellenoweth Green, St Heliers",
    distance: "Varies",
    speed: "Varies",
    instagram: "https://instagram.com/re.movementclub",
    size: "M"
  },
  {
    title: "RUN4 | Running Community",
    description: "Running for all fitness levels",
    time: "Sun, 8:50 AM",
    location: "Victorica Park, CBD",
    distance: "5 - 7 km",
    speed: "5 - 7 min/km",
    instagram: "https://instagram.com/run4auckland",
    size: "Large"
  },
  {
    title: "445 RUN CLUB NZ",
    description: "445 AM WE MEET. 500 AM WE MOVE.",
    time: "Fri, 4:45 AM",
    location: "Akarana Eatery, Orakei",
    distance: "-",
    speed: "-",
    instagram: "https://instagram.com/445_run_club",
    size: "L"
  },
  {
    title: "Slow Sunday",
    description: "A relaxed, community-oriented running club.",
    date: "Sundays",
    time: "-",
    location: "Various locations in Auckland",
    distance: "Varies",
    speed: "Casual pace",
    instagram: "https://instagram.com/slowsundaysrunclub",
    size: "M"
  },
  {
    title: "Just Another Run Club",
    description: "Auckland based running group",
    time: "Sat, 8:00 AM",
    location: "Auckland Domain, Parnell",
    distance: " 7- 9 & 15 KM",
    speed: "-",
    instagram: "https://instagram.com/justanotherrun.club",
    size: "M"
  },
  {
    title: "NAARC (North Auckland Athletics & Running Club)",
    description: "A club focused on athletics and running in North Auckland.",
    date: "-",
    time: "-",
    location: "North Auckland",
    distance: "Varies",
    speed: "Varies",
    instagram: "-",
    size: "-"
  },
  {
    title: "NARC",
    description: "NOT A RUN CLUB",
    time: "-",
    location: "Varies",
    distance: "Varies",
    speed: "-",
    instagram: "https://instagram.com/runwithnarc",
    size: "L"
  },
  {
    title: "Beer Jerk Run Club",
    description: "🏃🏽A Running Club with a big social side",
    time: "Mon, 5:30 PM",
    location: "Small Gods Taproom, Eden Terrace",
    distance: "-",
    speed: "-",
    instagram: "https://instagram.com/beerjerkrunclub",
    size: "L"
  },
  {
    title: "Grave Runners",
    description: "Grave Runners™",
    time: "Wed, 6:00 PM",
    location: "Silo Park, Auckland CBD",
    distance: "6 KM",
    speed: "-",
    instagram: "https://instagram.com/graverunners",
    size: "Large"
  },
  {
    title: "Monday Underground™️💙👟",
    description:
      "Every Monday from the @northcotetavern 7.00pm (NEW TIME: 6.40pm for walkers) 🏃🏽‍♀️🏃🏽‍♂️",
    time: "Monday, 7:00 PM",
    location: "Northcote Tavern, Northcote",
    distance: "-",
    speed: "Casual pace",
    instagram: "https://instagram.com/mondayunderground",
    size: "L"
  },
  {
    title: "Fearless (261 Fearless)",
    description: "Be fearless, be free. Womens only running groups",
    time: "Sat, 9:00 AM",
    location: "Auckland Domain, Parnell",
    distance: "-",
    speed: "Social Pace",
    instagram: "https://instagram.com/261fearlessclubnz",
    size: "S"
  },
  {
    title: "Metrorun",
    description: "A casual Auckland-based running group.",
    time: "Sun, 8:00 AM",
    location: "Various locations in Auckland",
    distance: "Varies",
    speed: "Casual pace",
    instagram: "https://metrorun.nz/app/routes/calendar",
    size: "-"
  }
];

const Home = () => {
  const [emojiCounts, setEmojiCounts] = useState({
    "🏎️": 0,
    "💛": 0,
    "🥵": 0,
    "👫": 0,
    "🏞": 0
  });

  const handleEmojiClick = (emoji) => {
    setEmojiCounts((prevCounts) => ({
      ...prevCounts,
      [emoji]: prevCounts[emoji] + 1
    }));
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-purple-400 py-8">
      <div className="">
        {/* <h1 className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
          Running 4 Life
        </h1> */}
        <Image
          src="/Logo.png"
          alt="Running Club"
          width={400}
          height={400}
          className="m-0 p-0"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 pb-12">
        {cards.map((card, index) => (
          <div
            key={index}
            className="hover:bg-primary-focus aspect-w-16 aspect-h-9 card w-full max-w-4xl bg-base-100 shadow-xl transition-colors duration-300">
            <div className="card-body p-6">
              <div className="flex items-center justify-start gap-2">
                <h2 className="card-title text-secondary">{card.title}</h2>
                <a
                  href={`https://instagram.com/${card.instagram}`}
                  className="text-sm text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer">
                  🔗
                </a>
              </div>
              <p className="mb-4 text-accent">{card.description}</p>
              <div className="mt-2 border-t pt-2">
                <div className="w-full flex justify-center">
                  <table className="table w-full max-w-full text-black">
                    <thead className="bg-gray-200">
                      <tr>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Distance</th>
                        <th>Speed</th>
                        <th>Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{card.time}</td>
                        <td>{card.location}</td>
                        <td>{card.distance}</td>
                        <td>{card.speed}</td>
                        <td>{card.size}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-2 flex justify-around pt-2 gap-4">
                {Object.keys(emojiCounts).map((emoji, idx) => (
                  <div
                    key={emoji}
                    className={`flex items-center align-middle border-2 shadow-md border-pink-200 outline-offset-4 rounded-xl`}>
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