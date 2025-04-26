import { Button } from "@/components/ui/button";
import Logo from "@/public/TheLogo.png";
import Image from "next/image";
import Link from "next/link";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default async function LandingPage() {
  return (
    <main className="w-screen h-screen grid place-items-center">
      <div className="flex items-center flex-col gap-4">
        <Image width={150} height={50} priority src={Logo} alt="logo" />
        <p className="text-foreground text-sm w-[200px] text-center">
          Your passwords, <br />
          securely stored.
          <br /> Always accessible.
        </p>
        <Button className="bg-primary text-primary-foreground">
          <Link href="/generate">Go to the Dashboard</Link>
        </Button>
        <span className="text-xs text-gray-400">No sign-up required</span>
      </div>
    </main>
  );
}
