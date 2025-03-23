import { isAuthenticated } from "@/actions/auth.actions";
import AuthForm from "@/components/form/auth-form";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthPage({ searchParams }) {
  const params = await searchParams;

  const mode = params?.mode || "signin";

  const user = await isAuthenticated();

  if (user) return redirect("/");

  return (
    <main className="w-screen h-screen grid place-items-center">
      <section className="bg-zinc-950 border-1 border-zinc-900 w-1/4 text-white px-12 pt-20 pb-8 rounded-md">
        <h1 className="font-serif text-4xl">
          Welcome {mode === "signin" && "back"}
        </h1>
        <p className="text-sm text-gray-300">Enter your email & password</p>
        <AuthForm mode={mode} />
        {mode === "signin" && (
          <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link
              href="/?mode=signup"
              className="font-medium cursor-pointer hover:underline"
            >
              Create one!
            </Link>
          </p>
        )}
        {mode === "signup" && (
          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link
              href="/?mode=signin"
              className="font-medium cursor-pointer hover:underline"
            >
              Sign In
            </Link>
          </p>
        )}
      </section>
    </main>
  );
}
