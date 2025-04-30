import { Button } from "@/components/ui/button";
import Logo from "@/public/TheLogo.png";
import Image from "next/image";
import Link from "next/link";
import Phone from "@/public/phone.png";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Check, Hash, Shield } from "lucide-react";

export default async function LandingPage() {
  return (
    <main className="w-screen">
      <section className="bg-primary flex w-full h-[45rem] py-[10rem] px-[15rem] overflow-hidden">
        <div className="h-full flex items-center w-1/2">
          <div>
            <Image src={Logo} width={150} alt="logo" />
            <h1 className="text-[3rem] font-bold">Be safe and stay safe</h1>
            <Separator className="my-8" />
            <div className="space-x-4">
              <Button asChild variant="secondary">
                <Link href="/generate">Generate A Password</Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  target="_blank"
                  href="https://github.com/AmarMuric04/gobot"
                >
                  Check out GoBot
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="h-full grid place-items-center w-1/2">
          <Image
            src={Phone}
            width={300}
            alt="phone"
            className="relative top-20"
          />
        </div>
      </section>
      <section className="px-[15rem] py-[5rem] flex justify-between items-start">
        <div className="flex gap-4 w-3/10 ">
          <div className="bg-secondary rounded-md min-w-14 h-14 grid place-items-center">
            <Check />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Easy to use.</h2>
            <p className="text-secondary-foreground italic">
              So easy to use, even your dog could do it.
            </p>
          </div>
        </div>
        <div className="flex gap-4 w-3/10">
          <div className="bg-secondary rounded-md min-w-14 h-14 grid place-items-center">
            <Shield />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Guaranteed safety.</h2>
            <p className="text-secondary-foreground italic">
              Store your password in your vault and forget about it.
            </p>
          </div>
        </div>
        <div className="flex gap-4 w-3/10">
          <div className="bg-secondary rounded-md min-w-14 h-14 grid place-items-center">
            <Hash />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Elite Passwords.</h2>
            <p className="text-secondary-foreground italic">
              We create the passwords you can only dream of creating on your
              own.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
