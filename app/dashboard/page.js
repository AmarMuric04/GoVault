import { redirect, RedirectType } from "next/navigation";

export default async function DashboardPage() {
  return redirect("/dashboard/overview");
}
