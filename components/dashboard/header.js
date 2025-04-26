import Image from "next/image";
import Pfp from "@/public/psw-pfp.jpg";
import { NotificationsDropdown } from "../dropdowns/notifications-dropdown";
import { Bell, Settings } from "lucide-react";
import { ProfilePopover } from "../dropdowns/profile-dropdown";
import HoverTitle from "../hover-title";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function Header() {
  const user = await isAuthenticated();

  return (
    <header className="bg-accent text-foreground border-1 flex flex-grow h-[75px] max-h-[75px] items-center justify-between px-10">
      <h1 className="font-bold text-xl montserrat">
        {user ? "Welcome back!" : "Enjoy your stay!"}
      </h1>
      {user && (
        <div className="flex gap-4 items-center">
          {/* <NotificationsDropdown>
            <HoverTitle title="Click to see notifications">
              <button>
                <Bell size={25} />
              </button>
            </HoverTitle>
          </NotificationsDropdown> */}

          {/* <button>
          <Mail size={25} />
        </button> */}
          <Link
            href="/settings"
            className="hover:bg-primary/20 p-2 transition-all"
          >
            <HoverTitle title="Settings">
              <Settings size={18} />
            </HoverTitle>
          </Link>
          <ProfilePopover>
            <Image
              src={Pfp}
              alt="User's profile picture"
              w={100}
              h={100}
              className="rounded-full w-10 h-10 cursor-pointer"
            />
          </ProfilePopover>
        </div>
      )}
      {!user && (
        <div className="flex items-center gap-2">
          <Button asChild variant="link">
            <Link href="/auth?mode=signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/auth?mode=signup">Sign Up</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
