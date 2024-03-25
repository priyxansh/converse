import FriendsPageTabs from "@/components/app/friends/FriendsPageTabs";
import Spinner from "@/components/global/Spinner";
import { Suspense } from "react";

type FriendsPageProps = {};

const FriendsPage = ({}: FriendsPageProps) => {
  return (
    <main className="flex-grow py-4 px-2 sm:px-4 flex flex-col">
      <Suspense
        fallback={
          <div className="w-full flex-grow grid place-items-center">
            <Spinner />
          </div>
        }
      >
        <FriendsPageTabs />
      </Suspense>
    </main>
  );
};

export default FriendsPage;
