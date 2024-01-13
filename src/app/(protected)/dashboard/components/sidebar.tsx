"use client";

import { usePathname, useRouter } from "next/navigation";

import { CreditCard, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function SideBar() {
  const router = useRouter();
  const pathname = usePathname();

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
    <div className="flex h-full flex-col p-1.5">
      <div className="flex flex-1 flex-col space-y-1.5">
        {routes.map((route) => (
          <Button
            key={route.label}
            size="sm"
            onClick={() => onClick(route.href)}
            className={cn(
              "mb-1 w-full justify-start font-normal",
              pathname === route.href ? "bg-primary/10 text-primary" : null,
            )}
            variant="ghost"
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </div>
      <div className="">user</div>
    </div>
  );
}

export default SideBar;
