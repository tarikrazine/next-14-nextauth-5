import { Loader } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormSettings from "./components/formSettings";
import { auth } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await auth();

  return (
    <Card className="h-full md:rounded-br-none md:rounded-tr-none">
      <CardHeader>
        <CardTitle className="text-2xl">Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {!user ? (
          <Loader className="mx-auto h-10 w-10 animate-spin" />
        ) : (
          <FormSettings />
        )}
      </CardContent>
    </Card>
  );
}
