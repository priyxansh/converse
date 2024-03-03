import EmailSignOutPrompt from "@/components/auth/EmailSignOutPrompt";
import SetPasswordForm from "@/components/auth/SetPasswordForm";
import { Suspense } from "react";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type SetPasswordPageProps = {};

const SetPasswordPage = async ({}: SetPasswordPageProps) => {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user.isUserCreated !== false) {
    redirect("/auth/complete-profile");
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle>Set Password</CardTitle>
        <CardDescription>Set a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <SetPasswordForm />
        <Suspense fallback={null}>
          <EmailSignOutPrompt />
        </Suspense>
      </CardContent>
    </>
  );
};

export default SetPasswordPage;
