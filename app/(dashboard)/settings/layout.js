import Container from "@/components/container";
import Locked from "@/components/locked";
import SettingsOptions from "@/components/settings-options";
import { isAuthenticated, updateAccount } from "@/lib/actions/auth.actions";
import { Separator } from "@/components/ui/separator";
import SettingsForm from "@/components/form/settings-form";

export default async function SettingsPage({ children }) {
  const user = await isAuthenticated();

  console.log("Rendering settings page...");

  if (!user) return <Locked />;

  return (
    <Container className="w-full h-full p-10">
      <h1 className="font-bold text-2xl">Settings</h1>
      <p>Manage your account settings and set e-mail preferences.</p>
      <Separator className="my-4" />
      <main className="flex flex-col lg:flex-row w-full gap-5 flex-grow overflow-y-auto">
        <aside className="w-full lg:w-1/5 flex">
          <SettingsOptions />
          <Separator orientation="vertical" className="mx-4 hidden lg:block" />
        </aside>
        <Separator orientation="horizontal" className="my-4 block lg:hidden" />
        <div className="w-full lg:w-1/2 h-full col-span-3 overflow-y-auto">
          {children}
        </div>
      </main>
    </Container>
  );
}
