"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";

function Social() {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button size="lg" className="w-full" variant="orange" onClick={() => {}}>
        <FcGoogle className="mr-2 h-5 w-5" /> Google
      </Button>
      <Button size="lg" className="w-full" variant="orange" onClick={() => {}}>
        <FaGithub className="mr-2 h-5 w-5" /> Github
      </Button>
    </div>
  );
}

export default Social;
