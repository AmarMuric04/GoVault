"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function SettingsOptions() {
  const pathname = usePathname();

  const segments = pathname.split("/");
  const mode = segments.pop();

  return (
    <nav className="flex flex-wrap lg:flex-col gap-2 text-sm w-full">
      <Button
        className="justify-start"
        variant={mode === "profile" ? "" : "link"}
        asChild
      >
        <Link href="/settings/profile">Profile</Link>
      </Button>
      <Button
        className="justify-start"
        variant={mode === "photo" ? "" : "link"}
        asChild
      >
        <Link href="/settings/photo">Photo</Link>
      </Button>
      <Button
        className="justify-start"
        variant={mode === "account" ? "" : "link"}
        asChild
      >
        <Link href="/settings/account">Account</Link>
      </Button>
      <Button
        className="justify-start"
        variant={mode === "notifications" ? "" : "link"}
        asChild
      >
        <Link href="/settings/notifications">Notifications</Link>
      </Button>
      <Button
        className="justify-start"
        variant={mode === "security" ? "" : "link"}
        asChild
      >
        <Link href="/settings/security">Security</Link>
      </Button>
      <Button
        className="justify-start"
        variant={mode === "close-account" ? "outline" : "link"}
        asChild
      >
        <Link href="/settings/close-account">Close Account</Link>
      </Button>
    </nav>
  );
}
