"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import FeedbackButton from "@/components/FeedbackButton";
import ClubCard from "@/components/ClubCard";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Modal from "@/components/Modal";

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const [visitorId, setVisitorId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await fetch("/api/clubs");
        const data = await res.json();
        setClubs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClubs();
  }, []);

  useEffect(() => {
    const getFingerprint = async () => {
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;
      const result = await fp.get();
      setVisitorId(result.visitorId);
    };

    getFingerprint();
  }, []);

  const handleReaction = async (clubId, emoji) => {
    if (!visitorId) return;

    // Optimistically update state
    setClubs((prevClubs) =>
      prevClubs.map((club) => {
        if (club._id === clubId) {
          const updatedReactions = { ...club.reactions };

          // Find previous reaction by the user and decrement its count
          for (const [key, value] of Object.entries(updatedReactions)) {
            if (value > 0 && key !== emoji) {
              updatedReactions[key] -= 1;
              break;
            }
          }

          // Increment the count of the new reaction
          updatedReactions[emoji] = (updatedReactions[emoji] || 0) + 1;

          return {
            ...club,
            reactions: updatedReactions
          };
        }
        return club;
      })
    );

    try {
      const response = await fetch("/api/reactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ clubId, emoji, userId: visitorId })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setModalMessage(data.message);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error:", error);
      setModalMessage(error.message);
      setIsModalOpen(true);

      // Revert the optimistic update on error
      setClubs((prevClubs) =>
        prevClubs.map((club) => {
          if (club._id === clubId) {
            const updatedReactions = { ...club.reactions };

            // Revert the changes by resetting the reactions
            for (const [key, value] of Object.entries(updatedReactions)) {
              if (key === emoji) {
                updatedReactions[key] -= 1;
              }
            }

            return {
              ...club,
              reactions: updatedReactions
            };
          }
          return club;
        })
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-purple-400 py-8">
      <div>
        <Image
          src="/logo.png" // Ensure the file name and path are correct
          alt="Running Club"
          width={400}
          height={400}
          className="m-0 p-0"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 pb-10">
        {clubs.map((club, index) => (
          <ClubCard key={index} club={club} handleReaction={handleReaction} />
        ))}
      </div>
      <FeedbackButton />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default Home;
