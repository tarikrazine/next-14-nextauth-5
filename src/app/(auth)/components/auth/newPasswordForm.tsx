"use client";

import { useState, useTransition } from "react";

import { useSearchParams } from "next/navigation";

import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import CardWrapper from "./cardWrapper";
import FormSuccess from "../../../../components/formSuccess";
import FormError from "../../../../components/formError";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  NewPasswordSchemaType,
  newPasswordSchema,
} from "@/schema/newPasswordSchema";
import { newPassword } from "@/actions/newPassword";

function NewPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();

  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: NewPasswordSchemaType) {
    setSuccess("");
    setError("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  }

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button
            type="submit"
            className="w-full"
            variant="default"
            size="lg"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            ) : null}
            Reset your password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default NewPasswordForm;
