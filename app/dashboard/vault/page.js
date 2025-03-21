import { TableDemo } from "@/components/dashboard/vault/table";
import Container from "@/components/container";

export default function VaultPage() {
  return (
    <div className="w-full h-full">
      <Container>
        <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Passwords stored in Your Vault
        </h1>
        <section className="p-4 w-full">
          <TableDemo />
        </section>
      </Container>
    </div>
  );
}
