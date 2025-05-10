import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "../../ui/footer";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { FooterModeToggle } from "@/components/footer-mode-toggle";

export default function FooterSection({
  links = ["Generate", "Vault", "Dashboard"],

  copyright = "© 2025 Amar Muric. All rights reserved",

  policies = [
    { text: "Privacy Policy", href: "/" },
    { text: "Terms of Service", href: "/" },
  ],

  className,
}) {
  const columns = links.map((link) => ({
    text: link,
    href: `/${link.toLowerCase()}`,
  }));

  return (
    <footer className={cn("bg-background w-full px-4", className)}>
      <div className="container max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-0 py-8">
        <Footer className="w-full border-t-1 border-foreground/10">
          <FooterContent className="flex justify-between flex-wrap gap-4 md:gap-12">
            <FooterColumn>
              <h1 className="text-xl">GoVault</h1>
            </FooterColumn>
            <div className="flex gap-12 flex-wrap">
              {columns.map((link, index) => (
                <FooterColumn key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:underline"
                  >
                    {link.text}
                  </a>
                </FooterColumn>
              ))}
            </div>
          </FooterContent>

          <FooterBottom className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4 text-sm">
            <div className="text-muted-foreground">{copyright}</div>
            <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
              {policies.map((policy, index) => (
                <a key={index} href={policy.href} className="hover:underline">
                  {policy.text}
                </a>
              ))}
              <FooterModeToggle />
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
