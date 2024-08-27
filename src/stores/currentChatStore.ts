import { create } from "zustand";
import { type FormattedMessage } from "@/types/chat";
import { MessageStatus } from "@prisma/client";

type CurrentChatStore = {
  chatId: string;
  newMessages: FormattedMessage[];
  setChatId: (chatId: string) => void;
  appendNewMessage: (message: FormattedMessage) => void;
  clearNewMessages: () => void;
  setMessageStatus: (messageId: string, status: MessageStatus) => void;
};

const useCurrentChatStore = create<CurrentChatStore>((set) => ({
  newMessages: [],
  chatId: "",
  setChatId: (chatId) => set({ chatId }),
  appendNewMessage: (message) =>
    set((state) => ({ newMessages: [...state.newMessages, message] })),
  clearNewMessages: () => set({ newMessages: [] }),
  setMessageStatus: (messageId, status) => {
    set((state) => ({
      newMessages: state.newMessages.map((message) =>
        message.id === messageId ? { ...message, status } : message
      ),
    }));
  },
}));

export const useCurrentChat = () =>
  useCurrentChatStore((state) => ({
    chatId: state.chatId,
    setChatId: state.setChatId,
    newMessages: state.newMessages,
    appendNewMessage: state.appendNewMessage,
    clearNewMessages: state.clearNewMessages,
    setMessageStatus: state.setMessageStatus,
  }));
