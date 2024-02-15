import GitHubOAuthButton from "@/components/auth/GitHubOAuthButton";
import GoogleOAuthButton from "@/components/auth/GoogleOAuthButton";
import SignInForm from "@/components/auth/SignInForm";
import ButtonContainer from "@/components/global/ButtonContainer";
import Link from "next/link";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SignInPageProps = {};

const SignInPage = ({}: SignInPageProps) => {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to continue.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <SignInForm />
        <span className="text-sm">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-primary underline">
            Sign up.
          </Link>
        </span>
        <ButtonContainer className="w-full">
          <GoogleOAuthButton />
          <GitHubOAuthButton />
        </ButtonContainer>
      </CardContent>
    </>
  );
};

export default SignInPage;
