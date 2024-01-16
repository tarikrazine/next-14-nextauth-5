import { Loader } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormSettings from "./components/formSettings";
import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/data";

export default async function SettingsPage() {
  const user = await auth();

  const userDB = await getUserById(user?.user?.id!);

  return (
    <Card className="h-full md:rounded-br-none md:rounded-tr-none">
      <CardHeader>
        <CardTitle className="text-2xl">Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {!userDB ? (
          <Loader className="mx-auto h-10 w-10 animate-spin" />
        ) : (
          <FormSettings user={userDB} />
        )}
      </CardContent>
    </Card>
  );
}
