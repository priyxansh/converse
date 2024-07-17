"use client";

import { Input } from "@/components/ui/input";

type ChatToolbarProps = {
  chatId: string;
};

const ChatToolbar = ({ chatId }: ChatToolbarProps) => {
  return (
    <section className="w-full py-2 px-4 flex gap-2">
      <Input placeholder="Type a message" className="bg-muted" />
    </section>
  );
};

export default ChatToolbar;
