"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "./logo";
import MobileSidebar from "./mobileSideBar";

function Navbar() {
  return (
    <div className="flex h-14 w-full items-center border-b border-gray-200 px-6 dark:border-gray-800 dark:bg-[#1F1F1F]">
      <MobileSidebar />
      <Logo />
      <div className="ml-auto space-x-2">
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
