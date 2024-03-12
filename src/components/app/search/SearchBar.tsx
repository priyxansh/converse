"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDebounceValue } from "usehooks-ts";

type SearchBarProps = {};

const SearchBar = ({}: SearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get search query from query params
  const searchQuery = searchParams.get("q") || "";

  // Debounce search query
  const [debouncedSearchQuery, setValue] = useDebounceValue(searchQuery, 300);

  // Update query params when debounced search query changes
  useEffect(() => {
    if (!debouncedSearchQuery) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${debouncedSearchQuery}`);
  }, [debouncedSearchQuery]);

  return (
    <div>
      <Input
        placeholder="Find people"
        className="w-full max-w-lg mx-auto"
        defaultValue={searchQuery}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
