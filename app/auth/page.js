import { isAuthenticated } from "@/lib/actions/auth.actions";
import AuthForm from "@/components/form/auth-form";
import Link from "next/link";
import { redirect } from "next/navigation";
import Logo from "@/public/TheLogo.png";
import Image from "next/image";

export default async function AuthPage({ searchParams }) {
  const params = await searchParams;

  const mode = params?.mode || "signin";

  const user = await isAuthenticated();

  if (user) return redirect("/");

  return (
    <main className="w-screen h-screen grid place-items-center">
      <section className="bg-accent text-foreground border-1 w-[500px] h-screen md:h-auto px-12 pb-8 rounded-md">
        <Image
          width={150}
          height={50}
          src={Logo}
          alt="logo"
          className="pt-5 pb-14"
        />
        <h1 className="text-4xl font-bold">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </h1>
        <p className="text-sm">Enter your email & password</p>
        <AuthForm mode={mode} />
        {mode === "signin" && (
          <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link
              href="/auth?mode=signup"
              className="text-primary font-medium cursor-pointer hover:underline"
            >
              Create one!
            </Link>
          </p>
        )}
        {mode === "signup" && (
          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link
              href="/auth?mode=signin"
              className="text-primary font-medium cursor-pointer hover:underline"
            >
              Sign In
            </Link>
          </p>
        )}
      </section>
    </main>
  );
}
