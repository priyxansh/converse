import CompleteProfileForm from "@/components/auth/CompleteProfileForm";
import EmailSignOutPrompt from "@/components/auth/EmailSignOutPrompt";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserAvatar from "@/components/user-avatar/UserAvatar";
import UserAvatarEditableDropdownMenu from "@/components/user-avatar/UserAvatarEditableDropdownMenu";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        <UserAvatarEditableDropdownMenu
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
