import { Suspense } from "react";
import Container from "../global/Container";
import ThemeToggler from "../global/ThemeToggler";
import NavBar from "./NavBar";
import { Skeleton } from "../ui/skeleton";
import UserAvatarMenu from "../user-avatar/UserAvatarMenu";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  return (
    <header className="px-4 py-3 border-b sticky top-0 bg-background shadow-sm">
      <Container className="flex">
        <NavBar />
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggler />
          <Suspense fallback={<Skeleton className="h-7 w-7 rounded-full" />}>
            <UserAvatarMenu />
          </Suspense>
        </div>
      </Container>
    </header>
  );
};

export default Header;
