import { cookies } from "next/headers";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import ReactQueryProvider from "@/providers/react-query";
import UserProvider from "@/providers/user-provider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";
  const user = await isAuthenticated();

  return (
    <html lang="en" className={`${theme === "dark" ? "dark" : ""}`}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="bg-background inter">
        <ReactQueryProvider>
          <UserProvider user={user} />
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
