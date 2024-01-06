"use client";

import { useState, useTransition } from "react";

import { useSearchParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, LogInIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/auth/cardWrapper";
import { Button } from "@/components/ui/button";

import { LoginSchemaType, loginSchema } from "@/schema/loginSchema";

import FormError from "@/components/formError";
import FormSuccess from "@/components/formSuccess";
import { login } from "@/actions/login";

function LoginPage() {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email not linked to account"
      : "";

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchemaType) {
    setSuccess("");
    setError("");

    startTransition(() => {
      login(values).then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      });
    });
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="johndoe@example.com"
                      disabled={isPending}
                      {...field}
                    />
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
          <FormError message={error || urlError} />
          <Button
            type="submit"
            className="w-full"
            variant="default"
            size="lg"
            disabled={isPending}
          >
            {!isPending ? (
              <LogInIcon className="mr-2 h-6 w-6" />
            ) : (
              <Loader className="mr-2 h-6 w-6 animate-spin" />
            )}
            Sign in
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginPage;
