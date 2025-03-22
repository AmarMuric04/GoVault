"use client";

import Container from "@/components/container";
import { VaultTable } from "@/components/dashboard/vault/table/table";
import { useState } from "react";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

export default function VaultPage() {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <div className="w-full h-full">
      <Container className="h-full">
        <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Passwords stored in Your Vault
        </h1>
        <button
          onClick={() => setShowMoreInfo(!showMoreInfo)}
          className="flex gap-2 items-center p-4"
        >
          {!showMoreInfo && <ImCheckboxUnchecked />}
          {showMoreInfo && <ImCheckboxChecked />}
          <p>Show all information</p>
        </button>
        <section className="w-full max-h-full overflow-auto">
          <VaultTable showMoreInfo={showMoreInfo} />
        </section>
      </Container>
    </div>
  );
}
