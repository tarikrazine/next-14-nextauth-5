"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
  asChild?: boolean;
}

function LoginButton(props: LoginButtonProps) {
  const router = useRouter();

  function onClick() {
    router.push("/auth/login");
  }

  if (props.mode === "modal") {
    return <div>TODO: login button with mode {props.mode}</div>;
  }

  return (
    <div onClick={onClick} className="cursor-pointer">
      {props.children}
    </div>
  );
}

export default LoginButton;
