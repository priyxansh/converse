"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { completeProfileSchema } from "@/zod-schemas/completeProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubmitButton from "../global/SubmitButton";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { checkExistingUserByUsername } from "@/actions/auth/checkExistingUserByUsername";

type CompleteProfileFormProps = {
  name?: string | null;
  image?: string | null;
};

const CompleteProfileForm = ({ name, image }: CompleteProfileFormProps) => {
  // Initialising the form with react-hook-form and zod
  const form = useForm<z.infer<typeof completeProfileSchema>>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      name: name || "",
      image: image || "",
    },
  });

  // Get submitting and dirty state from form
  const { isSubmitting, isDirty } = form.formState;

  // Form submit handler
  const onSubmit = async (data: z.infer<typeof completeProfileSchema>) => {
    // Set error if the username already exists
    const exists = await validateUsername(data.username);

    if (exists) return;

    console.log(data);
  };

  // Timeout state for the username check
  const [usernameTimeoutId, setUsernameTimeoutId] =
    useState<NodeJS.Timeout | null>(null);

  // Watch the username field
  const username = form.watch("username");

  // Check if the username already exists
  const validateUsername = async (username: string) => {
    if (username) {
      const exists = await checkExistingUserByUsername(username);

      if (exists) {
        form.setError("username", {
          type: "manual",
          message: "Username already exists",
        });
      }

      return exists;
    }
  };

  useEffect(() => {
    // Clear the timeout if the username changes
    if (usernameTimeoutId) {
      clearTimeout(usernameTimeoutId);
    }

    // Set a timeout for the username check
    const timeoutId = setTimeout(() => {
      validateUsername(username);
    }, 250);

    setUsernameTimeoutId(timeoutId);

    return () => {
      if (usernameTimeoutId) {
        clearTimeout(usernameTimeoutId);
      }
    };
  }, [username]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage className="text-xs m-0" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Your unique username. This can be changed later.
              </FormDescription>
              <FormMessage className="text-xs m-0" />
            </FormItem>
          )}
        />

        <SubmitButton
          isSubmitting={isSubmitting}
          isDirty={isDirty}
          text="Complete Profile"
          submittingText="Completing Profile..."
        />
      </form>
    </Form>
  );
};

export default CompleteProfileForm;
