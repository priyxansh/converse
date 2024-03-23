"use client";

import { searchUsersByUsername } from "@/actions/user/searchUsersByUsername";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import SearchResultCard from "./SearchResultCard";
import Spinner from "@/components/global/Spinner";
import { Button } from "@/components/ui/button";

type SearchResultsProps = {};

const SearchResults = ({}: SearchResultsProps) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  // If the search query starts with an @, we'll assume the user is searching for a username and remove the @ symbol
  const usernameSearchQuery = searchQuery.startsWith("@")
    ? searchQuery.slice(1)
    : searchQuery;

  // Fetch search results using tanstack/react-query
  const {
    data: searchResults,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["searchUsersByUsername", usernameSearchQuery],
    queryFn: async () => {
      const data = await searchUsersByUsername(usernameSearchQuery, {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          bio: true,
        },
      });

      return data;
    },
  });

  // If the search query is empty, we'll show a message asking the user to enter a search query
  if (!usernameSearchQuery) {
    return (
      <section className="w-full flex-grow flex items-center justify-center">
        <p className="text-gray-500 text-center text-sm sm:text-base">
          Find people by entering their username in the search bar above.
        </p>
      </section>
    );
  }

  // Show a loading spinner while fetching search results initially, or while refetching in case of an error. If the results are being refetched without an error, we'll show the previous search results while the new results are being fetched.
  if (isLoading || (isRefetching && isError)) {
    return (
      <section className="w-full flex-grow flex items-center justify-center">
        <Spinner />
      </section>
    );
  }

  // Show an error message if there was an error fetching search results
  if (isError) {
    return (
      <section className="w-full flex-grow flex items-center justify-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-center text-gray-500 text-sm sm:text-base">
            There was an error fetching search results.
          </p>
          <Button
            onClick={() => {
              refetch();
            }}
            size={"sm"}
          >
            Try again
          </Button>
        </div>
      </section>
    );
  }

  // Show a message if no search results were found
  if (searchResults?.length === 0) {
    return (
      <section className="w-full flex-grow flex items-center justify-center text-sm sm:text-base">
        <p className="text-gray-500 text-center">No users found.</p>
      </section>
    );
  }

  return (
    <section className="py-6 px-0 md:px-10 grid sm:grid-cols-2 gap-2 sm:gap-4">
      {searchResults?.map((user) => (
        <SearchResultCard
          key={user.id}
          name={user.name as string}
          username={user.username as string}
          image={user.image}
          bio={user.bio}
        />
      ))}
    </section>
  );
};

export default SearchResults;
