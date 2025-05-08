import { isAuthenticated } from "@/lib/actions/auth.actions";
import Header from "@/components/header";
import Sidebar from "@/components/dashboard/sidebar";
import StoreUser from "@/components/store-user";
import { redirect } from "next/navigation";
import { SidebarCloseIcon } from "lucide-react";
import MobileNavigation from "@/components/mobile-navigation";

export default async function DashboardLayout({ children }) {
  const user = await isAuthenticated();

  return (
    <main className="flex text-white h-screen">
      <Sidebar />
      <main className="relative w-full flex flex-col h-screen max-h-screen overflow-hidden">
        <Header />
        <section className="p-2 pt-10 md:p-10 flex flex-col md:pb-0 md:ml-10 h-9/10 max-h-9/10 text-white">
          {children}
        </section>
        <MobileNavigation />
      </main>
    </main>
  );
}
