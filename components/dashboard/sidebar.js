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
    <aside className="bg-zinc-950 text-white border-1 border-zinc-900 w-80 h-screen px-2">
      <h1 className="text-center mt-20 mb-32 text-2xl font-semibold">
        Welcome back!
      </h1>
      <div className="w-full flex flex-col items-center mb-10">
        <Image
          src={Pfp}
          alt="User's profile picture"
          w={100}
          h={100}
          className="rounded-full w-20 h-20"
        />
        <div className="flex gap-2 items-center">
          <h2 className="font-medium">{user.email}</h2>
          <button className="w-full py-2 font-medium transition-all rounded-full p-2 hover:bg-white/10 flex items-center justify-center gap-2">
            <FaEdit size={15} />
          </button>
        </div>
      </div>

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
    </aside>
  );
}
