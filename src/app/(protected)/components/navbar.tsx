"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "./logo";
import MobileSidebar from "./mobileSideBar";
import { ModeToggle } from "@/components/mode-toggle";

function Navbar() {
  return (
    <div className="flex h-14 w-full items-center px-6">
      <MobileSidebar />
      <Logo />
      <div className="ml-auto flex items-center space-x-2">
        <ModeToggle />
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent"
          onClick={() => signOut()}
        >
          Logout
          <LogOut className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
