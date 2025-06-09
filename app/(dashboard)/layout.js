import { isAuthenticated } from "@/lib/actions/auth.actions";
import { Header } from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { AppHeader } from "@/components/dashboard/app-header";

export default async function DashboardLayout({ children }) {
  const user = await isAuthenticated();

  return (
    <main className="flex text-white">
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <section className="flex flex-col md:pb-0 text-white bg-background m-4 ml-0 rounded-xl">
                {children}
              </section>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}
