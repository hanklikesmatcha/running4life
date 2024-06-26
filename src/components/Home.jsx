import React, { useEffect, useState } from "react";
import Image from "next/image";
import FeedbackButton from "@/components/FeedbackButton";
import ClubCard from "@/components/ClubCard";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Notification from "@/components/Notification";
import Modal from "@/components/Modal";
import { useClubs, useReactionMutation } from "@/hooks/useClubs";

const Home = () => {
  const { data: clubs, error, isLoading } = useClubs();
  const { mutate: reactToClub, error: mutationError } = useReactionMutation();
  const [visitorId, setVisitorId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const getFingerprint = async () => {
      const fpPromise = FingerprintJS.load();
      const fp = await fpPromise;
      const result = await fp.get();
      setVisitorId(result.visitorId);
    };

    getFingerprint();
  }, []);

  useEffect(() => {
    if (mutationError) {
      setNotification(mutationError.message);
    }
  }, [mutationError]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleReactionClick = (clubId, emoji) => {
    if (!visitorId) return;
    reactToClub({ clubId, emoji, userId: visitorId });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-purple-400 py-8">
      <Notification
        message={notification}
        onClose={() => setNotification("")}
      />
      <div>
        <Image
          src="/logo.png"
          alt="Running Club"
          width={400}
          height={400}
          className="m-0 p-0"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 pb-10">
        {clubs?.map((club, index) => (
          <ClubCard
            key={index}
            club={club}
            handleReaction={handleReactionClick}
          />
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
