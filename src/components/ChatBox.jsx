// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";
import { useChannel, useAbly } from "ably/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";

export default function ChatBox({ roomId }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return router.push("/");
  }
  const ably = useAbly(); // Use the Ably hook to get the client

  const [clubTitle, setClubTitle] = useState("");
  const inputBoxRef = useRef(null);
  const messageEndRef = useRef(null);
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const { channel } = useChannel(roomId, (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  const sendChatMessage = (messageText) => {
    const message = {
      text: messageText,
      userId: session.user.id,
      userName: session.user.name,
      userImage: session.user.image
    };
    channel.publish({ name: "chat-message", data: message });
    setMessageText("");
    inputBoxRef.current.focus();
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (!messageTextIsEmpty) {
      sendChatMessage(messageText);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !messageTextIsEmpty) {
      sendChatMessage(messageText);
      event.preventDefault();
    }
  };

  const messages = receivedMessages.map((message, index) => {
    const author = message.data.userId === session.user.id ? "me" : "other";
    const userImage = message.data.userImage || "default-avatar.png"; // Fallback to a default image if userImage is not available
    return (
      <div
        key={index}
        className={`my-1 flex ${author === "me" ? "justify-end" : "justify-start"}`}>
        {author === "other" && (
          <Image
            src={userImage}
            alt={message.data.userName}
            width={32}
            height={32}
            className="mr-2 h-8 w-8 rounded-full"
          />
        )}
        <div
          className={`rounded p-2 ${author === "me" ? "bg-purple-500 text-white" : "bg-pink-200 text-black"}`}>
          {author === "other" && (
            <span className="block text-xs font-semibold">
              {message.data.userName}
            </span>
          )}
          <span className="block">{message.data.text}</span>
        </div>
        {author === "me" && (
          <Image
            src={userImage}
            alt={message.data.userName}
            width={32}
            height={32}
            className="ml-2 h-8 w-8 rounded-full"
          />
        )}
      </div>
    );
  });

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [receivedMessages]);

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await fetch(`/api/clubs/${roomId}`);
        const data = await response.json();
        setClubTitle(data.title); // Assuming the API response contains the title
      } catch (error) {
        console.error("Failed to fetch club details:", error);
      }
    };

    const fetchPreviousMessages = async () => {
      try {
        const channel = ably.channels.get(roomId);
        const messagesPage = await channel.history({
          limit: 10,
          direction: "backwards"
        });
        const historicalMessages = messagesPage.items.map((message) => ({
          ...message,
          data: {
            text: message.data.text,
            userId: message.data.userId,
            userName: message.data.userName,
            userImage: message.data.userImage || "default-avatar.png"
          }
        }));
        setMessages(historicalMessages.reverse());
      } catch (error) {
        console.error("Failed to fetch previous messages:", error);
      }
    };

    fetchClubDetails();
    fetchPreviousMessages();
  }, [roomId, ably.channels]);

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-pink-100 via-pink-300 to-purple-100 text-white">
      <div className="m-4 flex h-5/6 w-11/12 max-w-3xl flex-col rounded-lg bg-gradient-to-b from-pink-300 via-pink-200 to-pink-300 text-white shadow-2xl">
        <header className="flex items-center justify-between rounded-t-lg bg-gradient-to-br from-rose-300 via-pink-200 to-rose-300 p-4 shadow-lg">
          <button
            onClick={() => router.back()}
            className="flex items-center text-white hover:text-gray-300">
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="shine-text-for-huddle-title animate-shine text-xl font-bold">
            {clubTitle}
          </h1>
        </header>
        <div className="flex-grow overflow-y-auto p-4">
          <div className="flex flex-col space-y-2">
            {messages}
            <div ref={messageEndRef}></div>
          </div>
        </div>
        <form
          onSubmit={handleFormSubmission}
          className="flex items-center space-x-2 rounded-b-lg bg-white p-4 text-black shadow-lg">
          <textarea
            ref={inputBoxRef}
            value={messageText}
            placeholder="Type a message..."
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow resize-none rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <button
            type="submit"
            className="rounded-lg bg-purple-300 p-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={messageTextIsEmpty}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
