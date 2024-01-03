import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  label: string;
  href: string;
}

function BackButton(props: BackButtonProps) {
  return (
    <Button variant="link" className="font-normal" size="sm" asChild>
      <Link href={props.href}>{props.label}</Link>
    </Button>
  );
}

export default BackButton;
