"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "./logo";
import MobileSidebar from "./mobileSideBar";
import { ModeToggle } from "@/components/mode-toggle";

function Navbar() {
  return (
    <div className="flex h-14 w-full items-center px-6 ">
      <MobileSidebar />
      <Logo />
      <div className="ml-auto space-x-2">
        <Button
          variant="link"
          size="sm"
          className="hover:no-underline"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
