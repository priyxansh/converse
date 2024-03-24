import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FriendList from "./FriendList";
import { getFriends } from "@/actions/friends/getFriends";
import { getFriendRequests } from "@/actions/friends/getFriendRequests";
import FriendRequestList from "./FriendRequestList";

type FriendsPageTabsProps = {};

const FriendsPageTabs = async ({}: FriendsPageTabsProps) => {
  // Prefetch the user's friends
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const friends = await getFriends();
      return friends;
    },
  });

  // Prefetch the user's friend requests
  await queryClient.prefetchQuery({
    queryKey: ["friendRequests"],
    queryFn: async () => {
      const friendRequests = await getFriendRequests();
      return friendRequests;
    },
  });

  return (
    <Tabs defaultValue="friends" className="w-full flex-grow flex flex-col">
      <TabsList className="w-full flex flex-wrap h-auto">
        <TabsTrigger value="friends" className="flex-grow">
          Friends
        </TabsTrigger>
        <TabsTrigger value="requests" className="flex-grow">
          Requests
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="friends"
        className="flex-grow hidden data-[state=active]:flex"
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FriendList />
        </HydrationBoundary>
      </TabsContent>
      <TabsContent
        value="requests"
        className="hidden flex-grow data-[state=active]:flex"
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FriendRequestList />
        </HydrationBoundary>
      </TabsContent>
    </Tabs>
  );
};

export default FriendsPageTabs;
