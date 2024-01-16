"use client";

import Logo from "./logo";
import MobileSidebar from "./mobileSideBar";
import { ModeToggle } from "@/components/mode-toggle";

function Navbar() {
  return (
    <div className="fixed left-0 top-0 flex h-14 w-full items-center px-6">
      <MobileSidebar />
      <Logo />
      <div className="ml-auto flex items-center">
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navbar;
