"use client";

import { getFriendRequests } from "@/actions/friends/getFriendRequests";
import Spinner from "@/components/global/Spinner";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import FriendRequestCard from "./FriendRequestCard";
import { ScrollArea } from "@/components/ui/scroll-area";

type FriendRequestListProps = {};

const FriendRequestList = ({}: FriendRequestListProps) => {
  const {
    data: friendRequests,
    isRefetching,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: async () => {
      const friendRequests = await getFriendRequests();
      return friendRequests;
    },
  });

  // Show a loading spinner while fetching friend requests initially, or while refetching in case of an error. If the friend requests are being refetched without an error, we'll show the previous friend requests while the new friend requests are being fetched.
  if (isLoading || (isRefetching && isError)) {
    return (
      <section className="w-full flex-grow flex items-center justify-center">
        <Spinner />
      </section>
    );
  }

  // Show an error message if there was an error fetching friend requests
  if (isError) {
    return (
      <section className="w-full flex-grow flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            There was an error fetching your friend requests.
          </p>
          <Button
            onClick={() => {
              refetch();
            }}
            size={"sm"}
          >
            Try again
          </Button>
        </div>
      </section>
    );
  }

  // Show a message if no friend requests were found
  if (friendRequests?.length === 0) {
    return (
      <section className="w-full flex-grow flex items-center justify-center text-sm sm:text-base">
        <p className="text-gray-600 dark:text-gray-400 text-center text-sm sm:text-base flex gap-1 flex-wrap items-center justify-center">
          Nothing to see here.
        </p>
      </section>
    );
  }

  return (
    <ScrollArea className="h-full mb-6">
      <section className="py-6 px-0 md:px-6 lg:px-7 xl:px-10 grid sm:grid-cols-2 gap-2 sm:gap-4 flex-grow auto-rows-max">
        {friendRequests?.map(
          ({ id, sender: { username, name, image, bio }, receiver }) => (
            <FriendRequestCard
              key={id}
              id={id}
              username={username as string}
              receiverUsername={receiver.username as string}
              receiverName={receiver.name as string}
              name={name as string}
              image={image}
              bio={bio}
            />
          )
        )}
      </section>
    </ScrollArea>
  );
};

export default FriendRequestList;
