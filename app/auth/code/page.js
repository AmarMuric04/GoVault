import { isAuthenticated } from "@/lib/actions/auth.actions";
import AuthForm from "@/components/form/auth-form";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CodePage() {
  const user = await isAuthenticated();

  if (user) return redirect("/");

  return (
    <main className="w-screen h-screen grid place-items-center">
      <section className="bg-accent text-foreground border-1 w-1/4 px-12 pt-20 pb-8 rounded-md">
        <h1 className="text-4xl">Welcome {mode === "signin" && "back"}</h1>
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
