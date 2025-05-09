"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLink({ href, children, className }) {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-4 py-4 my-1 pl-6 text-sm",
        isActive
          ? "border-l-4 border-primary bg-primary/10 hover:bg-primary/20 text-foreground font-semibold"
          : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
        className ? className : ""
      )}
    >
      {children}
    </Link>
  );
}
