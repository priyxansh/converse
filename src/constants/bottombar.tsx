import {
  MessagesSquareIcon,
  UserSearchIcon,
  UsersRoundIcon,
} from "lucide-react";

export const BOTTOMBAR_ITEMS = [
  {
    id: 1,
    label: "Chats",
    icon: <MessagesSquareIcon size={20} />,
    path: "/chat",
  },
  {
    id: 2,
    label: "Search",
    icon: <UserSearchIcon size={20} />,
    path: "/search",
  },
  {
    id: 3,
    label: "Friends",
    icon: <UsersRoundIcon size={20} />,
    path: "/friends",
  },
];
