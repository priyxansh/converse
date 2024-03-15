import { getUserByUsername } from "@/actions/user/getUserByUsername";
import ButtonContainer from "@/components/global/ButtonContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type UserProfileDisplayProps = {
  username: string;
};

const UserProfileDisplay = async ({ username }: UserProfileDisplayProps) => {
  // Get the user by their username
  const user = await getUserByUsername({
    username: username,
    select: {
      username: true,
      name: true,
      image: true,
      bio: true,
    },
  });

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
        <Avatar
          className={`h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 my-auto row-span-2`}
        >
          <AvatarImage src={user.image as string} />
          <AvatarFallback className="text-2xl">
            {user.name?.split("")[0]}
          </AvatarFallback>
        </Avatar>
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
          <Button variant="default" size={"sm"} className="flex-grow">
            Add Friend
          </Button>
          <Button variant="secondary" size={"sm"} className="bg-secondary/50 flex-grow">
            Message Request
          </Button>
        </ButtonContainer>
      </div>
    </div>
  );
};

export default UserProfileDisplay;
