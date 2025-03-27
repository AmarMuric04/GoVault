"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function SettingsOptions() {
  const pathname = usePathname();

  const segments = pathname.split("/");
  const mode = segments.pop();

  return (
    <ul className="flex flex-col gap-2 text-sm w-full my-5 relative right-5">
      <li className="w-full">
        <Link href="/settings/profile">
          <Button
            className={`w-full justify-start bg-transparent hover:underline hover:bg-transparent ${
              mode === "profile" && "bg-zinc-900 hover:bg-zinc-800"
            }`}
          >
            Profile
          </Button>
        </Link>
      </li>
      <li>
        <Link href="/settings/account">
          <Button
            className={`w-full justify-start bg-transparent hover:underline hover:bg-transparent ${
              mode === "account" && "bg-zinc-900 hover:bg-zinc-800"
            }`}
          >
            Account
          </Button>
        </Link>
      </li>
      <li>
        <Link href="/settings/notifications">
          <Button
            className={`w-full justify-start bg-transparent hover:underline hover:bg-transparent ${
              mode === "notifications" && "bg-zinc-900 hover:bg-zinc-800"
            }`}
          >
            Notifications
          </Button>
        </Link>
      </li>
    </ul>
  );
}
