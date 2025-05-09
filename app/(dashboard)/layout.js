import { isAuthenticated } from "@/lib/actions/auth.actions";
import { Header } from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

export default async function DashboardLayout({ children }) {
  const user = await isAuthenticated();

  return (
    <main className="flex text-white h-screen">
      <Sidebar user={user} />
      <main className="relative w-full flex flex-col h-screen max-h-screen overflow-hidden">
        <Header />
        <section className="p-2 pt-10 md:p-10 flex flex-col md:pb-0 h-9/10 max-h-9/10 text-white">
          {children}
        </section>
      </main>
    </main>
  );
}
