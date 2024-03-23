import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

type FriendCardProps = {
  username: string;
  image: string | null;
  name: string;
  bio: string | null;
};

const FriendCard = ({ username, name, image, bio }: FriendCardProps) => {
  return (
    <Link
      href={`/profile/${username}`}
      className="shadow sm:shadow-md p-2 sm:p-4 rounded-lg flex gap-2 sm:gap-5 border items-center"
    >
      <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
        <AvatarImage src={image || ""} alt={`Profile picture of ${name}`} />
        <AvatarFallback>
          <span>{name[0]}</span>
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex gap-1 sm:gap-2 items-center">
          <h3 className="font-semibold sm:text-xl">{name}</h3>
          <span className="text-sm font-semibold leading-relaxed">
            (@{username})
          </span>
        </div>
        <span className="text-xs sm:text-sm text-gray-500 line-clamp-1 break-all">
          {bio}
        </span>
      </div>
    </Link>
  );
};

export default FriendCard;
