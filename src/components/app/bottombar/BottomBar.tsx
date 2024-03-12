import { BOTTOMBAR_ITEMS } from "@/constants/bottombar";
import BottomBarItem from "./BottomBarItem";
import BottomBarDropdownMenu from "./BottomBarDropdownMenu";

type BottomBarProps = {};

const BottomBar = ({}: BottomBarProps) => {
  return (
    <nav
      className={`sm:hidden sticky bottom-0 w-full border-t p-1 bg-background mt-auto grid grid-cols-[repeat(4,1fr)] grid-rows-1 gap-1`}
    >
      {BOTTOMBAR_ITEMS.map((item) => (
        <BottomBarItem key={item.id} item={item} />
      ))}
      <BottomBarDropdownMenu />
    </nav>
  );
};

export default BottomBar;
