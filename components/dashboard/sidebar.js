import Pfp from "@/public/psw-pfp.jpg";
import Image from "next/image";
import { FaEdit, FaChartPie } from "react-icons/fa";
import { SiManageiq } from "react-icons/si";
import { IoIosCreate } from "react-icons/io";
import { IoSettingsSharp, IoLogOut } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import SidebarLink from "./sidebar-link";
import { PiVaultFill } from "react-icons/pi";

export default function Sidebar({ user }) {
  return (
    <aside className="bg-zinc-950 text-white border-1 border-zinc-900 min-w-80 h-screen flex flex-col justify-between px-2">
      <div className="flex gap-2 items-center px-4 py-10">
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

      <div>
        <SidebarLink href="/overview">
          <FaChartPie size={22} />
          <p>Overview</p>
        </SidebarLink>
        <SidebarLink href="/vault">
          <PiVaultFill size={22} />
          <p>My Vault</p>
        </SidebarLink>
        <SidebarLink href="/generate">
          <IoIosCreate size={22} />
          <p>Generate</p>
        </SidebarLink>
        <SidebarLink href="/security">
          <MdOutlineSecurity size={22} />
          <p>Security</p>
        </SidebarLink>
        <SidebarLink href="/settings">
          <IoSettingsSharp size={22} />
          <p>Settings</p>
        </SidebarLink>
      </div>

      <p className="text-zinc-800 text-sm mx-auto">
        Made by Murga. All Rights Reserved.
      </p>
    </aside>
  );
}
