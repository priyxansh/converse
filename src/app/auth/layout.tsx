import { Card } from "@/components/ui/card";
import HomeButton from "../../components/global/HomeButton";
import ThemeToggler from "@/components/global/ThemeToggler";
import Container from "@/components/global/Container";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full min-h-screen-svh flex flex-col">
      <nav className="p-4 flex justify-between items-center w-full">
        <HomeButton />
        <ThemeToggler />
      </nav>
      <main className="px-4 flex-grow flex flex-col justify-center items-center">
        <Container>
          <Card className="max-w-lg mx-auto">{children}</Card>
        </Container>
      </main>
    </div>
  );
};

export default AuthLayout;
