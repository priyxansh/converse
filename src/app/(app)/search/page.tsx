import SearchBar from "@/components/app/search/SearchBar";

type SearchPageProps = {};

const SearchPage = ({}: SearchPageProps) => {
  return (
    <main className="flex-grow p-4">
      <SearchBar />
    </main>
  );
};

export default SearchPage;
