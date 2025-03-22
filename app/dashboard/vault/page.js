"use client";

import Container from "@/components/container";
import { VaultTable } from "@/components/dashboard/vault/table/table";
import { useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { FaRegSquarePlus } from "react-icons/fa6";

import { DialogDemo } from "@/components/dialogs/create-password-dialog";
export default function VaultPage() {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <div className="w-full h-full">
      <Container className="h-full">
        <h1 className="text-lg font-semibold border-b-1 border-zinc-900 p-4">
          Passwords stored in Your Vault
        </h1>
        <div className="border-b-1 border-zinc-900 flex gap-4 items-center p-4 justify-between">
          <button
            onClick={() => setShowMoreInfo(!showMoreInfo)}
            className="flex gap-2 items-center"
          >
            {!showMoreInfo && <ImCheckboxUnchecked />}
            {showMoreInfo && <ImCheckboxChecked />}
            <p>Show all information</p>
          </button>
          <DialogDemo onProceed={() => {}}>
            <button className="flex gap-2 items-center bg-[#ee6711] px-4 py-2 hover:rounded-[2rem] transition-all border-1 border-zinc-900">
              <FaRegSquarePlus />
              <p>Add a new password</p>
            </button>
          </DialogDemo>
        </div>
        <section className="w-full max-h-full overflow-auto">
          <VaultTable showMoreInfo={showMoreInfo} />
        </section>
      </Container>
    </div>
  );
}
