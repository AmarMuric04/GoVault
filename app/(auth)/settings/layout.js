import Container from "@/components/container";
import SettingsOptions from "@/components/settings-options";

export default async function SettingsPage({ children }) {
  return (
    <Container className="w-full h-full p-10">
      <div className="pb-5 border-b-1 border-zinc-900">
        <h1 className="font-bold text-2xl">Settings</h1>
        <p className="text-gray-400">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <main className="grid grid-cols-6 w-full gap-5">
        <aside className="col-span-1">
          <SettingsOptions />
        </aside>
        <section className="col-span-3 my-5">{children}</section>
      </main>
    </Container>
  );
}
