import ChatSideBar from "@/components/app/chat/sidebar/ChatSideBar";

type ChatLayoutProps = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="flex-grow flex">
      <ChatSideBar />
      {children}
    </div>
  );
};

export default ChatLayout;
