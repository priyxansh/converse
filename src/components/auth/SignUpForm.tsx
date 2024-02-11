"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "@/zod-schemas/signupFormSchema";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import PasswordVisibilityToggler from "./PasswordVisibilityToggler";
import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";
import { checkExistingUserByEmail } from "@/actions/checkExistingUserByEmail";

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

  // Handle password visibility
  const { isPasswordVisible, togglePasswordVisibility } =
    usePasswordVisibility();
  const {
    isPasswordVisible: isConfirmPasswordVisible,
    togglePasswordVisibility: toggleConfirmPasswordVisibility,
  } = usePasswordVisibility();

  // Form submit handler
  const onSubmit = async (data: z.infer<typeof signupFormSchema>) => {
    const { email } = data;

    // Check if user with the provided email already exists
    const isUserExisting = await checkExistingUserByEmail(email);

    // Set error if user already exists
    if (isUserExisting) {
      form.setError("email", {
        type: "manual",
        message: "User with this email already exists",
      });
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
        <Button type="submit" className="w-full mt-2">
          Create Account
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
