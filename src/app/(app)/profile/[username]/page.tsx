import UserProfileDisplay from "@/components/app/user/UserProfileDisplay";
import BackButton from "@/components/global/BackButton";

type UserProfilePageProps = {
  params: {
    username: string;
  };
};

const UserProfilePage = ({ params: { username } }: UserProfilePageProps) => {
  return (
    <main className="flex-grow py-4 px-2 sm:px-4 flex flex-col">
      <BackButton url="/search" variant="ghost" />
      <UserProfileDisplay username={username} />
    </main>
  );
};

export default UserProfilePage;
