"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function SidebarLink({ href, children, className }) {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <Button
      asChild
      className={`my-1 font-medium transition-all rounded-sm
        ${isActive ? "" : ""} `}
      variant={isActive ? "" : "link"}
    >
      <Link
        href={href}
        className={`${className || ""} flex items-center justify-center`}
      >
        <div className="w-1/2 flex gap-6 items-center">{children}</div>
      </Link>
    </Button>
  );
}
