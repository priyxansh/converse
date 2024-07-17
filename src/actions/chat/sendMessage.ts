"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

type SendMessageOptions = {
  chatId: string;
  message: string;
};

export const sendMessage = async ({ chatId, message }: SendMessageOptions) => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        content: message,
        chat: {
          connect: {
            id: chatId,
          },
        },
        sender: {
          connect: {
            id: session.user.id,
          },
        },
      },
      select: {
        chat: {
          select: {
            members: {
              select: {
                id: true,
                username: true,
              },
              where: {
                id: {
                  not: session.user.id,
                },
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      data: {
        recipients: newMessage.chat.members,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
