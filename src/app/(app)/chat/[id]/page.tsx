import { getChatInformation } from "@/actions/chat/getChatInformation";
import Chat from "@/components/app/chat/Chat";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type ChatPageProps = {
  params: {
    id: string;
  };
};

const ChatPage = async ({ params: { id } }: ChatPageProps) => {
  // Prefetch the chat data
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["chat", id],
    queryFn: async () => {
      const chat = await getChatInformation(id);

      if (chat.success) {
        return chat.data;
      } else {
        throw new Error(chat.error);
      }
    },
  });

  return (
    <main className="flex-grow">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Chat id={id} />
      </HydrationBoundary>
    </main>
  );
};

export default ChatPage;
