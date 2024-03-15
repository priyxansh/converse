import { getUserByUsername } from "@/actions/user/getUserByUsername";
import ButtonContainer from "@/components/global/ButtonContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import AddFriendButton from "./AddFriendButton";
import RemoveFriendButton from "./RemoveFriendButton";
import UserProfileAvatar from "./UserProfileAvatar";

type UserProfileDisplayProps = {
  username: string;
};

const UserProfileDisplay = async ({ username }: UserProfileDisplayProps) => {
  // Get user session
  const session = await auth();

  // Get the user by their username
  const user = await getUserByUsername({
    username: username,
    select: {
      username: true,
      name: true,
      image: true,
      bio: true,
      friendsOf: true,
    },
  });

  // Check if user is friends with the current user
  const isFriend = user?.friendsOf?.some(
    (friend) => friend.username === session?.user.username
  );

  // If the user does not exist, return early
  if (!user) {
    return (
      <div className="sm:text-lg font-semibold flex items-center justify-center flex-grow text-gray-500 text-center">
        <p>User not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="grid grid-cols-[auto,1fr] gap-x-4 md:gap-x-12">
        <UserProfileAvatar
          imageUrl={user.image ? user.image : undefined}
          fallbackName={user.name as string}
          className="h-20 w-20 sm:h-24 sm:w-24 md:h-36 md:w-36 my-auto row-span-2 cursor-pointer"
        />
        <div className="flex flex-col sm:gap-2 justify-center col-start-2 row-start-1 row-end-3">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
            @{user.username}
          </h2>
          <div className="">
            <p className="text-sm sm:text-lg font-bold">{user.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.bio}
            </p>
          </div>
        </div>
        <ButtonContainer className="mt-6 sm:mt-2 col-start-1 col-end-3 sm:col-start-2 justify-start">
          {isFriend ? (
            <>
              <RemoveFriendButton username={user.username as string} />
              <Button size={"sm"} className="flex-grow">
                Send Message
              </Button>
            </>
          ) : (
            <>
              <AddFriendButton />
              <Button
                variant="secondary"
                size={"sm"}
                className="bg-secondary/50 flex-grow"
              >
                Message Request
              </Button>
            </>
          )}
        </ButtonContainer>
      </div>
    </div>
  );
};

export default UserProfileDisplay;
