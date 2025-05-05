import Link from "next/link";
import { Button } from "./ui/button";
import SidebarLink from "./dashboard/sidebar-link";
import { ChartArea, CirclePlus, Settings, Vault } from "lucide-react";

export default function MobileNavigation() {
  return (
    <div className="xl:hidden bg-accent absolute bottom-0 left-0 right-0 h-[50px] max-h-[50px]">
      <nav className="w-full flex">
        <SidebarLink href="/overview" className="w-1/4">
          <ChartArea size={22} />
          <p className="hidden sm:block">Overview</p>
        </SidebarLink>
        <SidebarLink href="/vault" className="w-1/4">
          <Vault size={22} />
          <p className="hidden sm:block">My Vault</p>
        </SidebarLink>
        <SidebarLink href="/generate" className="w-1/4">
          <CirclePlus size={22} />
          <p className="hidden sm:block">Generate</p>
        </SidebarLink>
        {/* <SidebarLink href="/security">
          <MdOutlineSecurity size={22} />
          <p className="hidden sm:block">Security</p>
        </SidebarLink> */}
        <SidebarLink href="/settings" className="w-1/4">
          <Settings size={22} />
          <p className="hidden sm:block">Settings</p>
        </SidebarLink>
      </nav>
    </div>
  );
}
