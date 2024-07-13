"use client";

type ChatToolbarProps = {
  chatId: string;
};

const ChatToolbar = ({ chatId }: ChatToolbarProps) => {
  return <section className="w-full h-12 bg-blue-300">Chat Toolbar</section>;
};

export default ChatToolbar;
