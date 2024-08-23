import { create } from "zustand";
import { type FormattedMessage } from "@/types/chat";
import { MessageStatus } from "@prisma/client";

type NewMessagesStore = {
  newMessages: FormattedMessage[];
  appendNewMessage: (message: FormattedMessage) => void;
  clearNewMessages: () => void;
  setMessageStatus: (messageId: string, status: MessageStatus) => void;
};

export const useNewMessagesStore = create<NewMessagesStore>((set) => ({
  newMessages: [],
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

export const useNewMessages = () =>
  useNewMessagesStore((state) => ({
    newMessages: state.newMessages,
    appendNewMessage: state.appendNewMessage,
    clearNewMessages: state.clearNewMessages,
    setMessageStatus: state.setMessageStatus,
  }));
