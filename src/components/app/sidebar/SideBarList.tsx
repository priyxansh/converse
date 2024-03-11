import { SIDEBAR_LIST_ITEMS } from "@/constants/sidebar";
import SideBarListItem from "./SideBarListItem";

type SideBarListProps = {};

const SideBarList = ({}: SideBarListProps) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center my-auto">
      {SIDEBAR_LIST_ITEMS.map((item) => (
        <SideBarListItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SideBarList;
