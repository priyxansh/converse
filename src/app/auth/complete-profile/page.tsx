import CompleteProfileForm from "@/components/auth/CompleteProfileForm";
import EmailSignOutPrompt from "@/components/auth/EmailSignOutPrompt";
import { auth } from "@/lib/auth";
import { Session } from "next-auth";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

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
