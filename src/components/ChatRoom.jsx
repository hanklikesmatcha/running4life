// @ts-nocheck
"use client";

import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";
import ChatBox from "./ChatBox";

export default function Chat({ roomId }) {
  const client = new Ably.Realtime({ authUrl: "/api/chat-service" });
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={roomId}>
        <ChatBox roomId={roomId} />
      </ChannelProvider>
    </AblyProvider>
  );
}
