import React, { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Image from "next/image";

import ClubCard from "@/components/ClubCard";
import FeedbackButton from "@/components/FeedbackButton";
import Modal from "@/components/Modal";
import Notification from "@/components/Notification";
import ErrorPageComponent from "@/components/PageError";
import PageLoading from "@/components/PageLoading";
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

  if (isLoading) return <PageLoading />;
  if (error) return <ErrorPageComponent message={error.message} />;

  const handleReactionClick = (clubId, emoji) => {
    if (!visitorId) return;
    const { data, isLoading, isError } = reactToClub({
      clubId,
      emoji,
      userId: visitorId
    });
    console.log(data, isLoading, isError);
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
      <div className="flex w-full flex-col items-center gap-6 px-8 pb-10 md:px-0">
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
