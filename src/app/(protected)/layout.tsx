import { SessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";
import Navbar from "./components/navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="h-full bg-neutral-900">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}
