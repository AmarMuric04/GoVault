import { isAuthenticated } from "@/actions/auth.actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Pfp from "@/public/psw-pfp.jpg";
import { Button } from "../ui/button";
import Link from "next/link";

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
            <Image
              src={Pfp}
              alt="User's profile picture"
              w={100}
              h={100}
              className="rounded-full w-13 h-13"
            />
            <div>
              <h1 className="font-medium">Amar, Muric</h1>
              <h2 className="text-sm text-[#ee6711]">{user.email}</h2>
            </div>
          </div>
          <Button asChild>
            <Link href="/settings/profile">Edit profile</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
