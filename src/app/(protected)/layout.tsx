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
      <div className="flex h-full flex-col bg-slate-50 dark:bg-[#1F1F1F]">
        <Navbar />
        <div className="flex-1">{children}</div>
        {/* <div className="flex h-14 items-center px-6">Footer</div> */}
      </div>
    </SessionProvider>
  );
}
