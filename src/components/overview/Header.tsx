import Container from "../global/Container";
import ThemeToggler from "../global/ThemeToggler";
import NavBar from "./NavBar";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  return (
    <header className="px-4 py-3 border-b sticky top-0 bg-background shadow-sm">
      <Container className="flex">
        <NavBar />
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggler />
        </div>
      </Container>
    </header>
  );
};

export default Header;
