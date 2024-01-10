"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Social from "@/components/auth/social";
import BackButton from "@/components/auth/backButton";
import LoginSeparator from "@/components/auth/loginSeparator";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  separator?: boolean;
}

function CardWrapper(props: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>{props.headerLabel}</CardTitle>
      </CardHeader>
      {props.showSocial ? (
        <CardHeader>
          <Social />
        </CardHeader>
      ) : null}
      {props.separator ? <LoginSeparator /> : null}
      <CardContent>{props.children}</CardContent>
      <CardFooter>
        <BackButton label={props.backButtonLabel} href={props.backButtonHref} />
      </CardFooter>
    </Card>
  );
}

export default CardWrapper;
