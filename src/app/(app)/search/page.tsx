import SearchBar from "@/components/app/search/SearchBar";
import SearchResults from "@/components/app/search/SearchResults";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

type SearchPageProps = {};

const SearchPage = ({}: SearchPageProps) => {
  return (
    <main className="overflow-hidden flex-grow py-4 px-2 sm:px-4 flex flex-col">
      <Suspense fallback={<Skeleton className="w-full max-w-lg mx-auto" />}>
        <SearchBar />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full flex-grow" />}>
        <SearchResults />
      </Suspense>
    </main>
  );
};

export default SearchPage;
