import Pfp from "@/public/psw-pfp.jpg";
import Image from "next/image";
import { FaChartPie } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import SidebarLink from "./sidebar-link";
import { PiVaultFill } from "react-icons/pi";
import Logo from "@/public/TheLogo.png";

export default function Sidebar({ user }) {
  return (
    <aside className="bg-zinc-950 text-white border-1 border-zinc-900 min-w-72 h-screen flex flex-col justify-between px-4">
      <div className="flex gap-4 items-center montserrat h-1/10">
        <Image
          className="h-13 w-13"
          src={Logo}
          width={100}
          height={100}
          alt="App's Logo"
        />
        <div>
          <h1 className="font-semibold text-[#ee6711] text-lg">GoVault</h1>
          <p className="text-zinc-600 text-sm">Be Safe & Stay Safe</p>
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

      <p className="text-zinc-800 text-xs mx-auto">
        Made by Murga. All Rights Reserved.
      </p>
    </aside>
  );
}
