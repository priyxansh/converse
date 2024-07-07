import { User } from "@/types/prisma";

type ParseChatNameOptions = {
  userId: string;
  isGroup?: boolean;
  name?: string | null;
  members: User<{
    select: {
      id: true;
      name: true;
    };
  }>[];
};

/**
 * Parses the chat name based on the provided options.
 * If the name is provided, it is returned as is.
 * If it is a group chat, the names of all members are joined with commas and the last comma is replaced with an ampersand.
 * If it is a one-on-one chat, the name of the other member is returned.
 *
 * @param options - The options for parsing the chat name.
 * @returns The parsed chat name.
 */
export const parseChatName = ({
  name,
  isGroup,
  members,
  userId,
}: ParseChatNameOptions) => {
  if (name) {
    return name;
  }

  if (isGroup) {
    return members
      .map((member) => member.name)
      .join(", ")
      .replace(/,(?=[^,]*$)/, " &");
  }

  return members.find((member) => member.id !== userId)?.name!;
};
