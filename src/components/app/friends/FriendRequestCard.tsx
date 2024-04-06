import ButtonContainer from "@/components/global/ButtonContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import AcceptRequestButton from "./AcceptRequestButton";
import RejectRequestButton from "./RejectRequestButton";

type FriendRequestCardProps = {
  id: string;
  username: string;
  receiverUsername: string;
  receiverName: string;
  image: string | null;
  name: string;
  bio: string | null;
};

const FriendRequestCard = ({
  id,
  username,
  receiverUsername,
  receiverName,
  name,
  image,
  bio,
}: FriendRequestCardProps) => {
  return (
    <div className="shadow sm:shadow-md p-2 md:p-4 rounded-lg flex gap-4 border items-center flex-wrap">
      <Link
        href={`/profile/${username}`}
        className="flex gap-2 sm:gap-5 items-center flex-wrap flex-grow"
      >
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
          <AvatarImage
            src={image || ""}
            alt={`Profile picture of ${name}`}
            sizes="50px"
          />
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
      <ButtonContainer className="ml-auto flex w-full lg:w-auto">
        <AcceptRequestButton
          requestId={id}
          username={username}
          receiverUsername={receiverUsername}
          receiverName={receiverName}
        />
        <RejectRequestButton requestId={id} />
      </ButtonContainer>
    </div>
  );
};

export default FriendRequestCard;
