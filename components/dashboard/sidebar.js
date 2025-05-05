import Image from "next/image";
import SidebarLink from "./sidebar-link";
import Logo from "@/public/TheLogo.png";
import { ChartArea, CirclePlus, Settings, Vault } from "lucide-react";

export default function Sidebar({ user }) {
  return (
    <aside className="bg-accent text-white border-1 max-w-72 w-72 h-screen flex-col justify-between px-4 hidden xl:flex">
      <Image
        src={Logo}
        width={150}
        height={50}
        alt="App's Logo"
        className="self-center pt-12 bg-accent p-2 rounded-md"
      />
      <nav className="w-full">
        <SidebarLink href="/overview" className="w-full">
          <ChartArea size={22} />
          Overview
        </SidebarLink>
        <SidebarLink href="/vault" className="w-full">
          <Vault size={22} />
          My Vault
        </SidebarLink>
        <SidebarLink href="/generate" className="w-full">
          <CirclePlus size={22} />
          Generate
        </SidebarLink>
        {/* <SidebarLink href="/security">
          <MdOutlineSecurity size={22} />
          <p>Security</p>
        </SidebarLink> */}
        <SidebarLink href="/settings" className="w-full">
          <Settings size={22} />
          Settings
        </SidebarLink>
      </nav>

      <p className="text-zinc-800 text-xs mx-auto">
        Made by Murga. All Rights Reserved.
      </p>
    </aside>
  );
}
