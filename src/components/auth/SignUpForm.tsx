"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "@/zod-schemas/signupFormSchema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import PasswordVisibilityToggler from "./PasswordVisibilityToggler";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";
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

type SignUpFormProps = {};

const SignUpForm = ({}: SignUpFormProps) => {
  // Initialising the form with react-hook-form and zod
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
  });

  // Get submitting and dirty state from form
  const { isSubmitting, isDirty } = form.formState;

  // Handle password visibility
  const { isPasswordVisible, togglePasswordVisibility } =
    usePasswordVisibility();
  const {
    isPasswordVisible: isConfirmPasswordVisible,
    togglePasswordVisibility: toggleConfirmPasswordVisibility,
  } = usePasswordVisibility();

  // Form submit handler
  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    const { email, password } = data;

    const authenticateResult = await authenticate({
      isSignUp: true,
      provider: "credentials",
      credentials: {
        email: email,
        password: password,
      },
    });

    // Set error if user already exists
    if (authenticateResult?.error?.name === "UserExistsError") {
      form.setError("email", {
        type: "manual",
        message: "User with this email already exists",
      });
      return;
    }

    // Show toast for other errors
    if (authenticateResult?.error) {
      toast.error("An error occurred while signing you up. Please try again.");
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder={
                      isConfirmPasswordVisible ? "MyStrongPassword" : "********"
                    }
                    {...field}
                    className="pr-10"
                  />
                  <PasswordVisibilityToggler
                    isPasswordVisible={isConfirmPasswordVisible}
                    togglePasswordVisibility={toggleConfirmPasswordVisibility}
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
          text="Sign Up"
          submittingText="Signing Up..."
        />
      </form>
    </Form>
  );
};

export default SignUpForm;
