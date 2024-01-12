import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "./backButton";

function ErrorCard() {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <CardTitle>Oops! Something went wrong</CardTitle>
      </CardHeader>
      <CardFooter>
        <BackButton label="Back to login" href="/login" />
      </CardFooter>
    </Card>
  );
}

export default ErrorCard;
