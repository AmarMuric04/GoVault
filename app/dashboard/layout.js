import { isAuthenticated } from "@/actions/auth.actions";
import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const user = await isAuthenticated();

  if (!user) redirect("/?mode=signin");

  return (
    <main className="flex text-white">
      <Sidebar user={user} />
      <main className="w-full flex flex-col">
        <Header />
        <section className="p-10 flex flex-col flex-grow">{children}</section>
      </main>
    </main>
  );
}
