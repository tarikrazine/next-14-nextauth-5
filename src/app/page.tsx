import { Lock, LogIn } from "lucide-react";
import { GeistSans } from "geist/font/sans";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/loginButton";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-neutral-900">
      <div className="max-w-screen-md space-y-6 p-4 lg:max-w-screen-lg">
        <h1
          className={cn(
            "bg-gradient-to-r from-white/95 to-orange-100 bg-clip-text text-4xl font-semibold  text-transparent lg:text-6xl",
            GeistSans.className,
          )}
        >
          A simple authentication system for Next.js
        </h1>
        <LoginButton>
          <Button variant="orange" size="lg">
            <LogIn className="mr-2 h-6 w-6" />
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
