"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "./loginForm";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
  asChild?: boolean;
}

function LoginButton(props: LoginButtonProps) {
  const router = useRouter();

  function onClick() {
    router.push("/login");
  }

  if (props.mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={props.asChild}>{props.children}</DialogTrigger>
        <DialogContent className="w-auto border-none p-0">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div onClick={onClick} className="cursor-pointer">
      {props.children}
    </div>
  );
}

export default LoginButton;
