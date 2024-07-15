import FeedbackButton from "@/components/FeedbackButton";
import LoadingIndicator from "@/components/LoadingIndicator";
import Modal from "@/components/Modal";
import Notification from "@/components/Notification";
import ErrorPageComponent from "@/components/PageError";
import PageLoading from "@/components/PageLoading";
import WorkoutList from "@/components/WorkoutList";
import { useClubs } from "@/hooks/useClubs";
import { useReactionMutation } from "@/hooks/useReactionMutation";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SignOut } from "./SignOut";
import { SignIn } from "./SingIn";

export default function Home({ session }) {
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
  const [activeTab, setActiveTab] = useState("Runs");

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
      }, 2400); // Auto-hide notification after 2.4 seconds

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
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-200 to-purple-400 py-8">
      <div className="absolute right-0 top-0 z-10 p-4">
        {session ? <SignOut /> : <SignIn />}
      </div>
      {mutationIsLoading && <LoadingIndicator />}
      <Notification
        message={notification}
        type={notificationType}
        onClose={() => setNotification("")}
      />
      <div className="absolute top-10 mt-[-40px]">
        <Image
          src="/logo.png"
          alt="Running Club"
          width={300} // Default size for mobile
          height={300} // Default size for mobile
          className="mx-auto block sm:h-[400px] sm:w-[400px]" // Larger size for small screens and up
        />
      </div>
      <div className="mt-[300px] flex w-full flex-col items-center">
        <WorkoutList
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          clubs={clubs}
          handleReactionClick={handleReactionClick}
        />
      </div>
      <FeedbackButton />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
}
