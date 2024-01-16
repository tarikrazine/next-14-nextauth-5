"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { CreditCard, LogOut, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import UserAvatar from "./userAvatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { signOut } from "next-auth/react";

function Sidebar() {
  const pathname = usePathname();

  const user = useCurrentUser();

  const routes = [
    {
      label: "Billing",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      href: `/dashboard/billing`,
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: `/dashboard/settings`,
    },
  ];

  return (
    <div className="flex h-full flex-col px-2.5 pb-3 pt-5">
      <div className="flex flex-1 flex-col space-y-2">
        {routes.map((route) => (
          <Button
            key={route.label}
            size="default"
            className="mb-1 w-full justify-start font-normal"
            variant={pathname === route.href ? "default" : "ghost"}
            asChild
          >
            <Link href={route.href}>
              {route.icon}
              {route.label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="flex w-full items-center justify-between space-x-2 rounded-md p-1 text-primary">
        <UserAvatar name={user?.name} src={user?.image} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <p className="truncate text-xs font-bold first-letter:uppercase">
                {user?.name}
              </p>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col items-center space-y-2">
              <p className="truncate text-xs font-semibold">{user?.name}</p>
              <p className="truncate text-xs font-semibold">{user?.email}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button
          variant="ghost"
          size="icon"
          className="bg-transparent"
          aria-label="Sign out"
          onClick={() => signOut()}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
