import {
  MessagesSquareIcon,
  UserCircle2Icon,
  UserCogIcon,
  UserSearchIcon,
  UsersRoundIcon,
} from "lucide-react";

export const SIDEBAR_LIST_ITEMS = [
  {
    id: 1,
    label: "Chats",
    icon: <MessagesSquareIcon size={24} />,
    path: "/chat",
  },
  {
    id: 2,
    label: "Search",
    icon: <UserSearchIcon size={24} />,
    path: "/search",
  },
  {
    id: 3,
    label: "Friends",
    icon: <UsersRoundIcon size={24} />,
    path: "/friends",
  },
  {
    id: 4,
    label: "Profile",
    icon: <UserCircle2Icon size={24} />,
    path: "/profile",
  },
  {
    id: 5,
    label: "Settings",
    icon: <UserCogIcon size={24} />,
    path: "/settings",
  },
];
