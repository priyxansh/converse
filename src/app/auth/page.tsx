import ButtonContainer from "@/components/global/ButtonContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthPageProps = {};

const AuthPage = ({}: AuthPageProps) => {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle>Get Started</CardTitle>
        <CardDescription>
          Sign in or create an account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <ButtonContainer>
          <Button asChild variant={"secondary"}>
            <Link href={"/auth/signup"}>Sign Up</Link>
          </Button>
          <Button asChild>
            <Link href={"/auth/signin"}>Sign In</Link>
          </Button>
        </ButtonContainer>
      </CardContent>
    </>
  );
};

export default AuthPage;
