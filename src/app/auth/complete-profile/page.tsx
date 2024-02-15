import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type CompleteProfilePageProps = {};

const CompleteProfilePage = async ({}: CompleteProfilePageProps) => {
  const session = await auth();

  // Redirect to /auth if no session found
  if (!session) {
    redirect("/auth");
  }

  // Redirect to /auth/set-password if user is not created in the database, in case of OAuth
  if (session.user.isUserCreated === false) {
    redirect("/auth/set-password");
  }

  // Redirect to /chat if user profile is complete
  if (session.user.isProfileComplete) {
    redirect("/chat");
  }

  return <div>CompleteProfilePage</div>;
};

export default CompleteProfilePage;
