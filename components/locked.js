import { Lock } from "lucide-react";
import Container from "./container";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Locked() {
  return (
    <div className="relative h-full w-full">
      <Container className="h-full w-full relative blur-md bg-muted"></Container>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent glass-3 border-border border text-center flex flex-col items-center py-6 px-12 rounded-lg shadow-lg z-10 text-foreground">
        <Lock size={40} />
        <h1 className="text-xl font-medium my-4">Account Needed</h1>
        <p className="mb-4 text-sm text-center">
          Please sign in to <br /> access this page
        </p>
        <Button asChild>
          <Link href="/auth?mode=signin">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
