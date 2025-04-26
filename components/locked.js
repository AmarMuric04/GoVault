import { Lock } from "lucide-react";
import Container from "./container";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Locked() {
  return (
    <Container className="grid place-items-center h-full w-full">
      <div className="bg-background text-center flex flex-col items-center py-6 px-12 rounded-lg border-1 border-dashed border-accent-foreground shadow-md">
        <Lock size={40} />
        <h1 className="text-xl font-medium my-4">Account Needed</h1>
        <p className="text-foreground mb-4 text-sm text-center">
          Please sign-in in order to <br /> access this page
        </p>
        <Button asChild>
          <Link href="/auth?mode=signin">Sign In</Link>
        </Button>
      </div>
    </Container>
  );
}
