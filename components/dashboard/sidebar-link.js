"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`w-full py-3 my-1 font-medium transition-all rounded-sm flex items-center justify-center gap-2 
        ${
          isActive
            ? "bg-zinc-900 hover:bg-zinc-800 text-white"
            : "hover:bg-zinc-800"
        }`}
    >
      <div className="w-1/2 flex gap-10 items-center">{children}</div>
    </Link>
  );
}
