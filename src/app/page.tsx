import { Lock, LogIn } from "lucide-react";
import { GeistSans } from "geist/font/sans";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/loginButton";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-300 to-orange-800">
      <div className="space-y-6">
        <h1
          className={cn(
            "flex items-center text-white drop-shadow-md",
            GeistSans.className,
          )}
        >
          <Lock className="mr-2 h-14 w-14" />{" "}
          <span className="text-6xl font-semibold">Auth</span>
        </h1>
        <p className="text-lg text-white">
          A simple authentication system for Next.js
        </p>
        <LoginButton>
          <Button variant="secondary" size="lg">
            <LogIn className="mr-2 h-6 w-6" />
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
