"use client";

import { useSession, signOut } from "next-auth/react";

export default function SettingsPage() {
  const session = useSession();

  return (
    <div>
      {JSON.stringify(session)}

      <button type="submit" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
}
