"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Social from "@/components/auth/social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

function CardWrapper(props: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle className="text-neutral-800">{props.headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      {props.showSocial ? (
        <CardFooter>
          <Social />
        </CardFooter>
      ) : null}
    </Card>
  );
}

export default CardWrapper;
