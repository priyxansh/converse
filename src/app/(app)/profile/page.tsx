import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

type ProfilePageProps = {};

const ProfilePage = async ({}: ProfilePageProps) => {
  const session = await auth();

  if (!session) {
    return redirect("/auth/signin");
  }

  // Redirect to the user's profile page
  return redirect(`/profile/${session.user.username}`);
};

export default ProfilePage;
