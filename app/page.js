import { Button } from "@/components/ui/button";
import Logo from "@/public/TheLogo.png";
import Image from "next/image";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <main className="w-screen h-screen grid place-items-center">
      <div className="flex items-center flex-col gap-4">
        <Image
          width={100}
          height={100}
          priority
          src={Logo}
          alt="A fingerprint"
          className="w-15 h-15"
        />
        <h1 className="text-2xl font-medium">GoVault</h1>
        <p className="text-gray-400 text-sm w-[200px] text-center">
          Your passwords, <br />
          securely stored.
          <br /> Always accessible.
        </p>
        <Button
          asChild
          className="bg-[#ee6711] hover:bg-[#ee671180] transition-all rounded-md hover:rounded-[2rem]"
        >
          <Link href="/generate">Go to the Dashboard</Link>
        </Button>
        <span className="text-xs text-gray-400">No sign-up required</span>
      </div>
    </main>
  );
}
