import Image from "next/image";
import SidebarLink from "./sidebar-link";
import Logo from "@/public/TheLogo.png";
import {
  ChartArea,
  ChevronLeft,
  CirclePlus,
  Settings,
  Vault,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Sidebar({ user }) {
  return (
    <aside className="bg-muted max-w-72 w-72 h-screen flex-col justify-between hidden xl:flex">
      <nav className="w-full mt-[75px] flex flex-col">
        <SidebarLink href="/overview">
          <ChartArea size={20} />
          Overview
        </SidebarLink>
        <SidebarLink href="/vault">
          <Vault size={20} />
          My Vault
        </SidebarLink>
        <SidebarLink href="/generate">
          <CirclePlus size={20} />
          Generate
        </SidebarLink>
        {/* <SidebarLink href="/security">
          <MdOutlineSecurity size={20} />
          <p>Security</p>
        </SidebarLink> */}
        <SidebarLink href="/settings/profile">
          <Settings size={20} />
          Settings
        </SidebarLink>
        {!user && (
          <Button className="w-2/3 ml-4 mt-8" asChild>
            <Link href="/auth?mode=signup">Create account +</Link>
          </Button>
        )}
        {user && (
          <Button className="w-2/3 ml-4 mt-8" asChild>
            <Link href="/">
              <ChevronLeft />
              Back home
            </Link>
          </Button>
        )}
      </nav>

      <p className="text-zinc-800 text-xs mx-auto">
        Made by Murga. All Rights Reserved.
      </p>
    </aside>
  );
}
