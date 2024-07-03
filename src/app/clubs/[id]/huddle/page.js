import dynamic from "next/dynamic";
const Chat = dynamic(() => import("@/components/ChatRoom"), { ssr: false });

export default function Huddle() {
  return (
    <div className="container">
      <main>
        <h1 className="title">Huddle</h1>
        <Chat />
      </main>
    </div>
  );
}
