import Image from "next/image";
import Pfp from "@/public/psw-pfp.jpg";
import { NotificationsDropdown } from "./dropdowns/notifications-dropdown";
import { Bell, Settings } from "lucide-react";
import { ProfilePopover } from "./dropdowns/profile-dropdown";
import HoverTitle from "./hover-title";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./theme-toggle";

export default async function Header() {
  const user = await isAuthenticated();

  return (
    <header className="bg-accent text-foreground border-1 flex flex-grow h-[75px] max-h-[75px] items-center justify-between px-10">
      <h1 className="font-bold text-xl montserrat">
        {user ? "Welcome back!" : "Enjoy your stay!"}
      </h1>
      {user && (
        <div className="flex gap-4 items-center h-8">
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

          <ThemeToggle />
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Link
            href="https://github.com/AmarMuric04/GoBot"
            className="hover:bg-primary/20 p-2 transition-all"
          >
            <HoverTitle title="Check out GoBot">
              <Bot size={18} />
            </HoverTitle>
          </Link>
          <Link
            href="/settings"
            className="hover:bg-primary/20 p-2 transition-all"
          >
            <HoverTitle title="Settings">
              <Settings size={18} />
            </HoverTitle>
          </Link>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <ProfilePopover>
            <Avatar className="bg-primary cursor-pointer">
              <AvatarImage src={user.picture} />
              <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </ProfilePopover>
        </div>
      )}
      {!user && (
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Separator orientation="vertical" className="mx-1 h-6" />
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
