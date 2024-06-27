import React, { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Image from "next/image";

import { useQueryClient } from "@tanstack/react-query";
import ClubCard from "@/components/ClubCard";
import FeedbackButton from "@/components/FeedbackButton";
import Modal from "@/components/Modal";
import Notification from "@/components/Notification";
import ErrorPageComponent from "@/components/PageError";
import PageLoading from "@/components/PageLoading";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useClubs } from "@/hooks/useClubs";
import { useReactionMutation } from "@/hooks/useReactionMutation";

const Home = () => {
  const { data: clubs, error, isLoading } = useClubs();
  const [visitorId, setVisitorId] = useState(null);
  const {
    mutate: reactToClub,
    error: mutationError,
    isPending: mutationIsLoading,
    isSuccess,
    data: mutationData
  } = useReactionMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("error");

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
      setNotificationType("error");
    } else if (isSuccess && mutationData) {
      setNotification(mutationData.message);
      setNotificationType("success");
    }
  }, [mutationError, isSuccess, mutationData]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 3000); // Auto-hide notification after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (isLoading) return <PageLoading />;
  if (error) return <ErrorPageComponent message={error.message} />;

  const handleReactionClick = (clubId, emoji) => {
    if (!visitorId) return;
    reactToClub({
      clubId,
      emoji,
      userId: visitorId
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-purple-400 py-8">
      {mutationIsLoading && <LoadingIndicator />}
      <Notification
        message={notification}
        type={notificationType}
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
