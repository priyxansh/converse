"use client";

import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";
import { userCredentialsSchema } from "@/zod-schemas/userCredentialsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import PasswordVisibilityToggler from "./PasswordVisibilityToggler";
import { authenticate } from "@/actions/auth/authenticate";
import { toast } from "sonner";
import SubmitButton from "../global/SubmitButton";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type SignInFormProps = {};

const SignInForm = ({}: SignInFormProps) => {
  // Initialising the form with react-hook-form and zod
  const form = useForm<z.infer<typeof userCredentialsSchema>>({
    resolver: zodResolver(userCredentialsSchema),
  });

  // Get submitting and dirty state from form
  const { isSubmitting, isDirty } = form.formState;

  // Handle password visibility
  const { isPasswordVisible, togglePasswordVisibility } =
    usePasswordVisibility();

  // Form submit handler
  const onSubmit = async (data: z.infer<typeof userCredentialsSchema>) => {
    const { email, password } = data;

    // Authenticate the user
    const authenticateResult = await authenticate({
      provider: "credentials",
      credentials: {
        email: email,
        password: password,
      },
      isSignUp: false,
    });

    // Set error if user does not exist
    if (authenticateResult?.error?.name === "UserNotFoundError") {
      form.setError("email", {
        type: "manual",
        message: "User with this email does not exist",
      });
      return;
    }

    // Set error if password is incorrect
    if (authenticateResult?.error?.name === "IncorrectPasswordError") {
      form.setError("password", {
        type: "manual",
        message: "Invalid Credentials",
      });
      return;
    }

    // Show toast for other errors
    if (authenticateResult?.error) {
      toast.error("An error occurred while signing you in. Please try again.");
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder={
                      isPasswordVisible ? "MyStrongPassword" : "********"
                    }
                    {...field}
                    className="pr-10"
                  />
                  <PasswordVisibilityToggler
                    isPasswordVisible={isPasswordVisible}
                    togglePasswordVisibility={togglePasswordVisibility}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton
          isSubmitting={isSubmitting}
          isDirty={isDirty}
          text="Sign In"
          submittingText="Signing In..."
        />
      </form>
    </Form>
  );
};

export default SignInForm;
