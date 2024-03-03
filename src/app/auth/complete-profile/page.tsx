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

type CompleteProfilePageProps = {};

const CompleteProfilePage = async ({}: CompleteProfilePageProps) => {
  // Redirection will be handled by the middleware
  const session = (await auth()) as Session;

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
