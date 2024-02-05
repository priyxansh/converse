import { NAV_ROUTES } from "@/constants/nav-routes";
import NavLink from "./NavLink";
import Link from "next/link";
import { SITE_TITLE } from "@/constants/site-title";
import NavSheet from "./NavSheet";

type NavBarProps = {};

const NavBar = ({}: NavBarProps) => {
  return (
    <div className="flex w-full items-center">
      <div className="sm:hidden mr-2">
        <NavSheet />
      </div>
      <div className="mr-auto">
        <Link href={"/"} className="flex items-center">
          <h2 className="text-lg sm:text-xl font-bold">{SITE_TITLE}</h2>
        </Link>
      </div>
      <nav className="hidden sm:flex items-center">
        <ul className="flex">
          {NAV_ROUTES.map((route) => {
            return (
              <NavLink key={route.id} label={route.label} path={route.path} />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
