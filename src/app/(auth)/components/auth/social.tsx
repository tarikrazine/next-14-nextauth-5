"use client";

import { useSearchParams } from "next/navigation";

import { signIn } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

function Social() {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  function onClick(provider: "google" | "github") {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="mr-2 h-5 w-5" /> Google
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="mr-2 h-5 w-5" /> Github
      </Button>
    </div>
  );
}

export default Social;
