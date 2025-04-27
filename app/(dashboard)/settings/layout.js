import Container from "@/components/container";
import Locked from "@/components/locked";
import SettingsOptions from "@/components/settings-options";
import { isAuthenticated, updateAccount } from "@/lib/actions/auth.actions";
import { Separator } from "@/components/ui/separator";
import SettingsForm from "@/components/form/settings-form";

export default async function SettingsPage({ children }) {
  const user = await isAuthenticated();

  if (!user) return <Locked />;

  return (
    <Container className="w-full h-full p-10">
      <h1 className="font-bold text-2xl">Settings</h1>
      <p>Manage your account settings and set e-mail preferences.</p>
      <Separator className="mt-4" />
      <main className="grid grid-cols-6 w-full gap-5">
        <aside className="col-span-1 flex items-center">
          <SettingsOptions />
          <Separator orientation="vertical" className="mx-4" />
        </aside>
        <SettingsForm action={updateAccount}>{children}</SettingsForm>
      </main>
    </Container>
  );
}
