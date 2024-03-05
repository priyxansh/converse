import CompleteProfileForm from "@/components/auth/CompleteProfileForm";
import EmailSignOutPrompt from "@/components/auth/EmailSignOutPrompt";
import { auth } from "@/lib/auth";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { redirect } from "next/navigation";
import UserAvatarEditableContextMenu from "@/components/UserAvatar/UserAvatarEditableContextMenu";
import UserAvatar from "@/components/UserAvatar/UserAvatar";

type CompleteProfilePageProps = {};

const CompleteProfilePage = async ({}: CompleteProfilePageProps) => {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  if (session?.user.isUserCreated === false) {
    redirect("/auth/set-password");
  }

  if (session?.user.isProfileComplete) {
    redirect("/chat");
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle>Complete Your Profile</CardTitle>
        <CardDescription>
          Complete your profile in a few easy steps.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <UserAvatarEditableContextMenu
          userAvatarComponent={
            <UserAvatar className="h-20 w-20 hover:brightness-90 cursor-pointer" />
          }
        />
        <CompleteProfileForm
          name={session.user.name}
          image={session.user.image}
        />
        <EmailSignOutPrompt />
      </CardContent>
    </>
  );
};

export default CompleteProfilePage;
