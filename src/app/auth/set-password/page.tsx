import EmailSignOutPrompt from "@/components/auth/EmailSignOutPrompt";
import SetPasswordForm from "@/components/auth/SetPasswordForm";
import { Suspense } from "react";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SetPasswordPageProps = {};

const SetPasswordPage = ({}: SetPasswordPageProps) => {
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
