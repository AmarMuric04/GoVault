import { cookies } from "next/headers";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import ReactQueryProvider from "@/providers/react-query";
import UserProvider from "@/providers/user-provider";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata = {
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default async function RootLayout({ children }) {
  const user = await isAuthenticated();

  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="bg-background inter">
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider user={user} />
            {children}
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
