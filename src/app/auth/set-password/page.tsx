import SetPasswordForm from "@/components/auth/SetPasswordForm";
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

  // Redirect to /auth if no session found
  if (!session) {
    redirect("/auth");
  }

  // Redirect to /auth/complete-profile if user is created in the database and profile is incomplete
  if (session.user.isUserCreated !== false) {
    if (session.user.isProfileComplete === false) {
      redirect("/auth/complete-profile");
    }

    // Redirect to /chat if user profile is complete
    redirect("/chat");
  }

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
