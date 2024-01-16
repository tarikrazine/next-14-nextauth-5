import { auth } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await auth();

  return (
    <div className="h-full p-4">Settings {JSON.stringify(user, null, 2)}</div>
  );
}
