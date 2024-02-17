import SetPasswordForm from "@/components/auth/SetPasswordForm";

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
      </CardContent>
    </>
  );
};

export default SetPasswordPage;
