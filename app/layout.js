import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import UserProvider from "@/providers/user-provider";

export const metadata = {
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default async function RootLayout({ children }) {
  const user = await isAuthenticated();

  return (
    <html lang="en" className="montserrat">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className="bg-background">
        <ReactQueryProvider>
          <UserProvider user={user} />
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
