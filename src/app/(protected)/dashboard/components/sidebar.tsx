"use client";

import { usePathname, useRouter } from "next/navigation";

import { CreditCard, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import UserAvatar from "./userAvatar";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const user = useCurrentUser();

  const routes = [
    {
      label: "Billing",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      href: ``,
    },
    {
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: `/dashboard/settings`,
    },
  ];

  function onClick(href: string) {
    router.push(href);
  }

  return (
    <div className="flex h-full flex-col p-2.5">
      <div className="flex flex-1 flex-col space-y-2">
        {routes.map((route) => (
          <Button
            key={route.label}
            size="default"
            onClick={() => onClick(route.href)}
            className={cn(
              "mb-1 w-full justify-start font-normal ",
              pathname === route.href
                ? "bg-primary text-slate-50 dark:bg-slate-50 dark:text-slate-900"
                : null,
            )}
            variant="outline"
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </div>
      <div className="flex w-full items-center space-x-2 rounded-md  p-1 text-primary">
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
      </div>
    </div>
  );
}

export default Sidebar;
