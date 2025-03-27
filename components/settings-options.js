"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function SettingsOptions() {
  const pathname = usePathname();

  const segments = pathname.split("/");
  const mode = segments.pop();

  return (
    <nav className="flex flex-col gap-2 text-sm w-full my-5">
      <Button
        className="justify-start"
        variant={mode === "profile" ? "secondary" : "link"}
        asChild
      >
        <Link href="/settings/notifications">Profile</Link>
      </Button>
      <Button
        className="justify-start"
        variant={mode === "account" ? "secondary" : "link"}
        asChild
      >
        <Link href="/settings/notifications">Account</Link>
      </Button>
      <Button
        className="justify-start"
        variant={mode === "notifications" ? "secondary" : "link"}
        asChild
      >
        <Link href="/settings/notifications">Notifications</Link>
      </Button>
    </nav>
  );
}
