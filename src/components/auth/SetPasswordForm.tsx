"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { usePasswordVisibility } from "@/hooks/usePasswordVisibility";
import { setPasswordSchema } from "@/zod-schemas/setPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import PasswordVisibilityToggler from "./PasswordVisibilityToggler";
import { setOAuthPassword } from "@/actions/auth/setOAuthPassword";
import { signOut } from "@/actions/auth/signOut";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SubmitButton from "../global/SubmitButton";

type SetPasswordFormProps = {};

const SetPasswordForm = ({}: SetPasswordFormProps) => {
  const router = useRouter();

  // Initialising the form with react-hook-form and zod
  const form = useForm<z.infer<typeof setPasswordSchema>>({
    resolver: zodResolver(setPasswordSchema),
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
  const onSubmit = async (data: z.infer<typeof setPasswordSchema>) => {
    const { password } = data;

    const setPasswordResult = await setOAuthPassword(password);

    // Sign user out if user already exists, which can happen if the user tries to set a password for an OAuth user with the same email from another device
    if (setPasswordResult?.error?.name === "UserExistsError") {
      // Show toast before signing out
      toast.error("Password already set for this user. Please sign in again.");

      // Sign user out
      await signOut({});

      // Redirect to /auth/signin
      router.push("/auth/signin");
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
          text="Set Password"
          submittingText="Setting Password..."
        />
      </form>
    </Form>
  );
};

export default SetPasswordForm;
