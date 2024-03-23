import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FriendList from "./FriendList";
import { getFriends } from "@/actions/friends/getFriends";

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
      <TabsContent value="friends" className="flex-grow flex">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FriendList />
        </HydrationBoundary>
      </TabsContent>
      <TabsContent value="requests"></TabsContent>
    </Tabs>
  );
};

export default FriendsPageTabs;
