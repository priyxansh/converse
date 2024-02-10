import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SignUpForm from "@/components/auth/SignUpForm";
import ButtonContainer from "@/components/global/ButtonContainer";
import Link from "next/link";
import GoogleOAuthButton from "@/components/auth/GoogleOAuthButton";
import GitHubOAuthButton from "@/components/auth/GitHubOAuthButton";

type SignUpPageProps = {};

const SignUpPage = ({}: SignUpPageProps) => {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to continue.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <SignUpForm />
        <span className="text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-primary underline">
            Sign in.
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

export default SignUpPage;
