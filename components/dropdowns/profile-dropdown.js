import { isAuthenticated } from "@/lib/actions/auth.actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Pfp from "@/public/psw-pfp.jpg";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export async function ProfilePopover({ children }) {
  const user = await isAuthenticated();

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Profile</h4>
            <p className="text-sm text-muted-foreground">
              This is a brief overview of your profile
            </p>
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <Avatar className="bg-primary">
              <AvatarImage src={user?.picture || ""} />
              <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-medium text-sm">Amar, Muric</h1>
              <h2 className="text-xs text-primary">{user.email}</h2>
            </div>
          </div>
          <section className="text-sm flex flex-col">
            <Link
              className="hover:bg-primary/20 p-2 transition-all"
              href="/settings/profile"
            >
              View profile
            </Link>
            <Link
              className="hover:bg-primary/20 p-2 transition-all"
              href="/settings/profile"
            >
              Edit profile
            </Link>
            <Separator className="my-1" />
            <Link
              className="hover:bg-primary/20 p-2 transition-all"
              href="/settings/profile"
            >
              Profile Settings
            </Link>
            <Link
              className="hover:bg-primary/20 p-2 transition-all"
              href="/settings/profile"
            >
              Account Settings
            </Link>
            <Separator className="my-1" />
            <Link
              className="hover:bg-primary/20 p-2 transition-all"
              href="/settings/profile"
            >
              Notifications
            </Link>
            <Link
              className="hover:bg-primary/20 p-2 transition-all"
              href="/settings/profile"
            >
              Security
            </Link>
            <Separator className="my-1" />
            <Link
              className="hover:bg-primary/20 p-2 transition-all"
              href="/settings/profile"
            >
              Help and Support
            </Link>
            <Link
              className="hover:bg-primary/20 p-2 transition-all"
              href="/settings/profile"
            >
              Log out
            </Link>
            <Link
              className="hover:bg-red-600/20 p-2 transition-all"
              href="/settings/profile"
            >
              Close Account
            </Link>
            <Separator className="my-1" />
            <Link
              className="p-2 transition-all group"
              href="https://github.com/AmarMuric04/GoBot"
            >
              <div className="flex justify-between items-center transition-all">
                <p className="text-lg font-bold group-hover:text-primary">
                  Check out GoBot
                </p>
                <ExternalLink />
              </div>
              <p className="text-xs text-secondary-foreground italic">
                A CLI Tool to automate password managemenet and creation.
              </p>
            </Link>
          </section>
        </div>
      </PopoverContent>
    </Popover>
  );
}
