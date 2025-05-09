import { isAuthenticated } from "@/lib/actions/auth.actions";
import AuthForm from "@/components/form/auth-form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default async function AuthPage({ searchParams }) {
  const params = await searchParams;

  const mode = params?.mode || "signin";

  const user = await isAuthenticated();

  if (user) return redirect("/");

  return (
    <main className="w-screen h-screen grid place-items-center relative overflow-hidden">
      <div className="bg-primary w-[200vw] h-[100vh] absolute top-1/2 -translate-y-[200px] z-0 -rotate-15 left-0"></div>
      <section className="relative z-50 bg-muted text-foreground border-1 w-9/10 lg:w-[500px] h-screen md:h-auto px-12 py-8 rounded-md">
        <Link
          className="group hover:underline underline-offset-2 text-primary flex items-center gap-2 py-2 text-sm"
          href="/generate"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-4 transition-all"
          />
          Go to dashboard
        </Link>
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
