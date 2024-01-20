"use client";

import { useEffect, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Save } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import { SettingsSchemaType, settingsSchema } from "@/schema/settings.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { settings } from "@/actions/settings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

function FormSettings() {
  const [isPending, startTransition] = useTransition();

  const { update: updateSession, data: userAuth } = useSession();

  const form = useForm<SettingsSchemaType>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      password: undefined,
      newPassword: undefined,
      role: undefined,
      isTwoFactorEnabled: undefined,
    },
  });

  function onSubmit(values: SettingsSchemaType) {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            updateSession();
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      form.setValue("name", userAuth?.user?.name as string);
      form.setValue("email", userAuth?.user?.email as string);
      form.setValue("role", userAuth?.user?.role as "ADMIN" | "USER");
      form.setValue(
        "isTwoFactorEnabled",
        userAuth?.user?.isTwoFactorEnabled as boolean,
      );
    });

    () => {
      clearTimeout(timeout);
    };
  }, [form, userAuth]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-sm space-y-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!userAuth?.user?.isOauth ? (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" disabled={isPending} {...field} />
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
                      <Input type="password" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input type="password" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Two factor authentication</FormLabel>
                      <FormDescription>
                        Enable two factor authentication to secure your account.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        disabled={isPending}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          ) : null}
          {userAuth?.user?.role === "ADMIN" ? (
            <>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => {
                  console.log("field role", field.value);
                  return (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="USER">User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </>
          ) : null}
        </div>
        <Button
          type="submit"
          className=""
          variant="default"
          size="lg"
          disabled={isPending}
        >
          {!isPending ? (
            <Save className="mr-2 h-6 w-6" />
          ) : (
            <Loader className="mr-2 h-6 w-6 animate-spin" />
          )}
          Save Changes
        </Button>
      </form>
    </Form>
  );
}

export default FormSettings;
