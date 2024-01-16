"use client";

import Logo from "./logo";
import MobileSidebar from "./mobileSideBar";
import { ModeToggle } from "@/components/mode-toggle";

function Navbar() {
  return (
    <div className="fixed inset-y-0 z-40 flex h-14 w-full items-center bg-slate-50 px-6 dark:bg-[#1F1F1F]">
      <MobileSidebar />
      <Logo />
      <div className="ml-auto flex items-center">
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
