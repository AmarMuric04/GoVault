import { getPasswordStatisticsByUserId } from "@/lib/actions/password/statistics.actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";
import Link from "next/link";

export async function NotificationsDropdown({ children }) {
  const passwordGeneralStats = await getPasswordStatisticsByUserId();

  let numOfNotifications = 0;

  if (passwordGeneralStats.countsByStrength.critical > 0) numOfNotifications++;
  if (passwordGeneralStats.countsByStrength.bad > 0) numOfNotifications++;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          {children}
          {numOfNotifications > 0 && (
            <div className="bg-red-500 px-1 rounded-full absolute top-0 right-0 text-xs pointer-events-none">
              {numOfNotifications}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-54">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {passwordGeneralStats.countsByStrength.critical > 0 && (
            <DropdownMenuItem className="flex items-center bg-red-600/20 justify-between my-2">
              <div className="flex flex-col">
                <h1 className="font-bold text-red-600">Security Issue</h1>
                <p className="text-red-500 text-xs">
                  {passwordGeneralStats.countsByStrength.critical} Critical
                  passwords detected
                </p>
              </div>
              <Link href="/vault">
                <Button className="text-white">
                  <Edit />
                </Button>
              </Link>
            </DropdownMenuItem>
          )}
          {passwordGeneralStats.countsByStrength.bad > 0 && (
            <DropdownMenuItem className="flex items-center bg-red-600/20 justify-between my-2">
              <div className="flex flex-col">
                <h1 className="font-bold text-red-500">Security Issue</h1>
                <p className="text-red-400 text-xs">
                  {passwordGeneralStats.countsByStrength.bad} Bad passwords
                  detected
                </p>
              </div>
              <Link href="/vault">
                <Button className="text-white">
                  <Edit />
                </Button>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
