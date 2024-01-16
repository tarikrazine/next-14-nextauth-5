"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function BillingPage() {
  const user = useCurrentUser();
  return (
    <div className="h-full p-4">
      Billing page {JSON.stringify(user, null, 2)}
    </div>
  );
}
