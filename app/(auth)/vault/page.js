"use client";

import Container from "@/components/container";
import { VaultTable } from "@/components/table/table";
import { useEffect, useState } from "react";
import { CreatePasswordDialog } from "@/components/dialogs/create-password-dialog";
import { PasswordDialog } from "@/components/dialogs/enter-password-dialog";
import { useQuery } from "@tanstack/react-query";
import {
  getFullPasswordInfo,
  getPasswordsByUserId,
} from "@/actions/password.actions";
import useAuthStore from "@/store/useAuthStore";
import usePasswordStore from "@/store/usePasswordStore";
import { HashLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FileUp, Plus } from "lucide-react";

/* Initial state of passwords is [],
when they get fetched, we get hidden passwords.
Hidden passwords don't show their passwords or strength.
The user has to enter their password to get that data.
*/

export default function VaultPage() {
  const { user } = useAuthStore();
  const { passwords, setPasswords } = usePasswordStore();
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const { data, isLoading } = useQuery({
    queryFn: () => getPasswordsByUserId(user._id),
    queryKey: ["passwords", user._id],
  });

  useEffect(() => {
    if (data) {
      setPasswords(data);
    }
  }, [data]);

  return (
    <div className="w-full h-full">
      <Container className="h-full">
        <h1 className="text-lg font-semibold border-b-1 border-zinc-900 p-4">
          Passwords stored in Your Vault
        </h1>
        <div className="border-b-1 border-zinc-900 flex gap-4 items-center p-4 justify-between">
          {!showMoreInfo && (
            <PasswordDialog
              action={getFullPasswordInfo}
              onSuccess={(data) => {
                setPasswords(data);
                setShowMoreInfo(true);
              }}
            >
              <div className="flex items-center space-x-2">
                <Checkbox checked={false} />
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Show all information
                </Label>
              </div>
            </PasswordDialog>
          )}
          {showMoreInfo && (
            <div
              onClick={() => {
                setPasswords(data);
                setShowMoreInfo(false);
              }}
              className="flex items-center space-x-2"
            >
              <Checkbox checked={true} />
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Show all information
              </Label>
            </div>
          )}
          <div className="flex gap-4 items-center">
            <Button variant="outline">
              <FileUp />
              Export
            </Button>

            <CreatePasswordDialog>
              <button className="flex gap-2 items-center bg-[#ee6711] px-4 py-2 hover:rounded-[2rem] transition-all border-1 border-zinc-900 rounded-md hover:bg-[#ee671190]">
                <Plus />
                Add a new password
              </button>
            </CreatePasswordDialog>
          </div>
        </div>
        <section className="w-full max-h-full overflow-auto h-full">
          {isLoading && (
            <div className="w-full h-full grid place-items-center">
              <HashLoader color="#ee6711" size={40} />
            </div>
          )}
          {!isLoading && (
            <VaultTable items={passwords} showMoreInfo={showMoreInfo} />
          )}
        </section>
      </Container>
    </div>
  );
}
