import Image from "next/image";
import Pfp from "@/public/psw-pfp.jpg";
import { NotificationsDropdown } from "../dropdowns/notifications-dropdown";
import { Bell } from "lucide-react";
import { ProfilePopover } from "../dropdowns/profile-dropdown";
import HoverTitle from "../hover-title";

export default function Header() {
  return (
    <header className="bg-zinc-950 text-white border-1 border-zinc-900 flex flex-grow max-h-1/10 h-1/10 items-center justify-between px-10">
      <h1 className="font-bold text-xl montserrat">Admin</h1>
      <div className="flex gap-4 items-center">
        <NotificationsDropdown>
          <HoverTitle title="Click to see notifications">
            <button>
              <Bell size={25} />
            </button>
          </HoverTitle>
        </NotificationsDropdown>

        {/* <button>
          <Mail size={25} />
        </button> */}
        <ProfilePopover>
          <Image
            src={Pfp}
            alt="User's profile picture"
            w={100}
            h={100}
            className="rounded-full w-13 h-13 cursor-pointer"
          />
        </ProfilePopover>
      </div>
    </header>
  );
}
