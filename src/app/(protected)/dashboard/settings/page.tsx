import { auth } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await auth();

  return <div className="p-4">Settings</div>;
}
