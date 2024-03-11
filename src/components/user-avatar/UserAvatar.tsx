import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";

type UserAvatarProps = {
  className?: string;
};

const UserAvatar = async ({ className }: UserAvatarProps) => {
  const session = await auth();

  if (!session) return null;

  return (
    <Avatar className={`h-7 w-7 ${className}`}>
      <AvatarImage src={session.user.image as string} />
      <AvatarFallback className={className}>
        {session.user.name?.split("")[0]}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
