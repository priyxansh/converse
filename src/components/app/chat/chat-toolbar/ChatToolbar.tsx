"use client";

import NewMessageForm from "./NewMessageForm";

type ChatToolbarProps = {
  chatId: string;
};

const ChatToolbar = ({ chatId }: ChatToolbarProps) => {
  return (
    <section className="w-full py-2 px-2">
      <NewMessageForm chatId={chatId} />
    </section>
  );
};

export default ChatToolbar;
