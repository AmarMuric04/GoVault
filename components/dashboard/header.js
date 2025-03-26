import Image from "next/image";
import Pfp from "@/public/psw-pfp.jpg";
import { IoIosNotifications, IoMdMail } from "react-icons/io";
import { NotificationsDropdown } from "../dropdowns/notifications-dropdown";

export default function Header({ user }) {
  return (
    <header className="bg-zinc-950 text-white border-1 border-zinc-900 flex flex-grow max-h-1/10 h-1/10 items-center justify-between px-10">
      <h1 className="font-bold text-xl montserrat">Admin</h1>
      <div className="flex gap-4 items-center">
        <NotificationsDropdown>
          <button>
            <IoIosNotifications size={25} />
          </button>
        </NotificationsDropdown>

        <button>
          <IoMdMail size={25} />
        </button>
        <div className="flex gap-2 items-center">
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
      </div>
    </header>
  );
}
