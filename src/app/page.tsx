import { Lock } from "lucide-react";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6">
        <h1 className="flex items-center text-white drop-shadow-md">
          <Lock className="mr-2 h-14 w-14" />{" "}
          <span className="text-6xl font-semibold">Auth</span>
        </h1>
        <p className="text-lg text-white">
          A simple authentication system for Next.js
        </p>
      </div>
    </main>
  );
}
