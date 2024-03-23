import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";

type UserAvatarProps = {
  className?: string;
  sizes?: string;
};

const UserAvatar = async ({ className, sizes = "50px" }: UserAvatarProps) => {
  const session = await auth();

  if (!session) return null;

  return (
    <Avatar className={`h-7 w-7 ${className}`}>
      <AvatarImage
        src={session.user.image as string}
        sizes={sizes}
        alt={`Profile picture of ${session.user.name}`}
        priority
      />
      <AvatarFallback className={className}>
        {session.user.name?.split("")[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
