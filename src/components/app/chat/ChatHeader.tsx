import BackButton from "@/components/global/BackButton";

type ChatHeaderProps = {
  conversationName?: string;
};

const ChatHeader = ({ conversationName }: ChatHeaderProps) => {
  return (
    <header className="w-full py-2 px-2 flex items-center gap-1 sm:gap-2 border-b bg-background">
      <BackButton url="/chat" variant="ghost" className="" size={18} />
      <div className="">
        <h1 className="font-semibold sm:text-lg">{conversationName}</h1>
      </div>
    </header>
  );
};

export default ChatHeader;
