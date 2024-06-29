"use client";

import Spinner from "@/components/global/Spinner";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import FriendCard from "./FriendCard";
import { getFriends } from "@/actions/friends/getFriends";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSocket } from "@/providers/SocketProvider";
import { useEffect } from "react";

type FriendListProps = {};

const FriendList = ({}: FriendListProps) => {
  // Fetch the user's friends using tanstack/react-query
  const {
    data: friends,
    isRefetching,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const friends = await getFriends();
      return friends;
    },
  });

  const { socket } = useSocket();

  const handleAcceptFriendRequest = () => {
    refetch();
  };

  const handleRemoveFriend = () => {
    refetch();
  };

  useEffect(() => {
    socket?.on("accept_friend_request", handleAcceptFriendRequest);
    socket?.on("remove_friend", handleRemoveFriend);

    return () => {
      socket?.off("accept_friend_request", handleAcceptFriendRequest);
      socket?.off("remove_friend", handleRemoveFriend);
    };
  }, [socket, handleAcceptFriendRequest, handleRemoveFriend]);

  // Show a loading spinner while fetching friends initially, or while refetching in case of an error. If the friends are being refetched without an error, we'll show the previous friends while the new friends are being fetched.
  if (isLoading || (isRefetching && isError)) {
    return (
      <section className="w-full flex-grow flex items-center justify-center">
        <Spinner />
      </section>
    );
  }

  // Show an error message if there was an error fetching friends
  if (isError) {
    return (
      <section className="w-full flex-grow flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            There was an error fetching your friends.
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

  // Show a message if no friends were found
  if (friends?.length === 0) {
    return (
      <section className="w-full flex-grow flex items-center justify-center text-sm sm:text-base">
        <p className="text-gray-600 dark:text-gray-400 text-center text-sm sm:text-base flex gap-1 flex-wrap items-center justify-center">
          No friends?
          <Link href="/search" className="font-semibold underline">
            Find some people to add.
          </Link>
        </p>
      </section>
    );
  }

  return (
    <ScrollArea className="h-full mb-6">
      <section className="py-6 px-0 md:px-6 lg:px-7 xl:px-10 grid sm:grid-cols-2 gap-2 sm:gap-4 flex-grow auto-rows-max">
        {friends?.map(({ id, username, name, image, bio }) => (
          <FriendCard
            key={id}
            username={username as string}
            name={name as string}
            image={image}
            bio={bio}
          />
        ))}
      </section>
    </ScrollArea>
  );
};

export default FriendList;
