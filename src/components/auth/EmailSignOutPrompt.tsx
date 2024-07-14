import { auth } from "@/lib/auth";
import SignOutButton from "./SignOutButton";

type EmailSignOutPromptProps = {};

const EmailSignOutPrompt = async ({}: EmailSignOutPromptProps) => {
  const session = await auth();

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-1 text-sm flex-wrap">
      <span>
        Not{" "}
        <span className="underline font-semibold">{session.user.email}</span>?
      </span>
      <SignOutButton className="text-primary text-sm" />
    </div>
  );
};

export default EmailSignOutPrompt;
