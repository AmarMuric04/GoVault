import Container from "@/components/container";
import { VaultTable } from "@/components/dashboard/vault/table/table";

export default function VaultPage() {
  return (
    <div className="w-full h-full">
      <Container className="h-full">
        <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Passwords stored in Your Vault
        </h1>
        <section className="w-full max-h-full overflow-auto">
          <VaultTable />
        </section>
      </Container>
    </div>
  );
}
