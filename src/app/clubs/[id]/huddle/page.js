"use client";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const Chat = dynamic(() => import("@/components/ChatRoom"), { ssr: false });

export default function Huddle() {
  const { id } = useParams();
  const roomId = `huddle:${id}`;

  return <Chat roomId={roomId} />;
}
