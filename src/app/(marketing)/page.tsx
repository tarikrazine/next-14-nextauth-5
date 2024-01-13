import { Lock, LogIn } from "lucide-react";
import { GeistSans } from "geist/font/sans";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/app/(auth)/components/auth/loginButton";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-slate-100 dark:bg-[#1F1F1F]">
      <div className="max-w-screen-sm space-y-6 p-4">
        <h1
          className={cn(
            "bg-gradient-to-r from-black/80  to-neutral-800 bg-clip-text text-4xl font-semibold text-transparent lg:text-5xl dark:from-white/95  dark:via-neutral-300 dark:to-neutral-400",
            GeistSans.className,
          )}
        >
          Full authentication system for Next.js
        </h1>
        <LoginButton>
          <Button variant="link" size="lg" className="px-0 hover:no-underline">
            <LogIn className="mr-2 h-6 w-6" />
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
