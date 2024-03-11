import { Input } from "@/components/ui/input";

type SearchBarProps = {};

const SearchBar = ({}: SearchBarProps) => {
  return (
    <div>
      <Input placeholder="Find people" className="w-full max-w-lg mx-auto" />
    </div>
  );
};

export default SearchBar;
