import FriendsPageTabs from "@/components/app/friends/FriendsPageTabs";

type FriendsPageProps = {};

const FriendsPage = ({}: FriendsPageProps) => {
  return (
    <main className="flex-grow py-4 px-2 sm:px-4 flex flex-col">
      <FriendsPageTabs />
    </main>
  );
};

export default FriendsPage;
