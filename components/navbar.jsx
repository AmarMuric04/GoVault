import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import { Chat } from "./ai-chat";
import Logo from "@/public/TheLogo.png";

import { Settings } from "lucide-react";
import { ProfilePopover } from "./dropdowns/profile-dropdown";
import HoverTitle from "./hover-title";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import Link from "next/link";
import { Bot } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ThemeToggle } from "./theme-toggle";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const Navbar = async ({
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Dashboard",
      url: "/generate",
    },
  ],
}) => {
  const user = await isAuthenticated();

  return (
    <section className="py-4 flex justify-center">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Image
              src={Logo}
              height={35}
              alt="govault"
              className="bg-white rounded-md p-2"
            />
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            {user && (
              <div className="flex gap-4 items-center h-8">
                <Chat
                  title="GoVault AI Agent"
                  description="Welcome to the GoVault AI Agent Chat! I can help you navigate around the website, give suggestions and more!"
                  placeholder="Ask something..."
                  configKey="default"
                >
                  <button>
                    <Bot />
                  </button>
                </Chat>
                <ThemeToggle />
                <Separator orientation="vertical" className="mx-1 h-6" />
                <Link
                  href="https://github.com/AmarMuric04/GoBot"
                  className="hover:bg-primary/20 p-2 transition-all"
                >
                  <HoverTitle title="Check out GoBot">
                    <Bot size={18} />
                  </HoverTitle>
                </Link>
                <Link
                  href="/settings"
                  className="hover:bg-primary/20 p-2 transition-all"
                >
                  <HoverTitle title="Settings">
                    <Settings size={18} />
                  </HoverTitle>
                </Link>
                <Separator orientation="vertical" className="mx-1 h-6" />
                <ProfilePopover>
                  <Avatar className="bg-primary cursor-pointer">
                    <AvatarImage src={user.picture} />
                    <AvatarFallback>
                      {user.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </ProfilePopover>
              </div>
            )}
            {!user && (
              <div className="flex items-center gap-2">
                <Chat
                  title="GoVault AI Agent"
                  description="Welcome to the GoVault AI Agent Chat! I can help you navigate around the website, give suggestions and more!"
                  placeholder="Ask something..."
                  configKey="default"
                >
                  <button>
                    <Bot />
                  </button>
                </Chat>
                <ThemeToggle />
                <Separator orientation="vertical" className="mx-1 h-6" />
                <Button asChild variant="link">
                  <Link href="/auth?mode=signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth?mode=signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Image
              src={Logo}
              alt="govault"
              height={35}
              className="bg-white rounded-md p-2"
            />
            <Sheet>
              <div className="flex gap-2 items-center">
                <Chat
                  title="GoVault AI Agent"
                  description="Welcome to the GoVault AI Agent Chat! I can help you navigate around the website, give suggestions and more!"
                  placeholder="Ask something..."
                  configKey="default"
                  pos={{
                    side: "bottom",
                    align: "center",
                  }}
                >
                  <button>
                    <Bot />
                  </button>
                </Chat>
                <ThemeToggle />
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
              </div>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Image
                      src={Logo}
                      alt="govault"
                      height={35}
                      className="bg-white rounded-md p-2"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {user && (
                    <div className="flex gap-4 items-center h-8">
                      <Separator orientation="vertical" className="mx-1 h-6" />
                      <Link
                        href="https://github.com/AmarMuric04/GoBot"
                        className="hover:bg-primary/20 p-2 transition-all"
                      >
                        <HoverTitle title="Check out GoBot">
                          <Bot size={18} />
                        </HoverTitle>
                      </Link>
                      <Link
                        href="/settings"
                        className="hover:bg-primary/20 p-2 transition-all"
                      >
                        <HoverTitle title="Settings">
                          <Settings size={18} />
                        </HoverTitle>
                      </Link>
                      <Separator orientation="vertical" className="mx-1 h-6" />
                      <ProfilePopover>
                        <Avatar className="bg-primary cursor-pointer">
                          <AvatarImage src={user.picture} />
                          <AvatarFallback>
                            {user.email[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </ProfilePopover>
                    </div>
                  )}
                  {!user && (
                    <div className="flex flex-col gap-2">
                      <Separator orientation="vertical" className="mx-1 h-6" />
                      <Button asChild variant="link">
                        <Link href="/auth?mode=signin">Sign In</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/auth?mode=signup">Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };
