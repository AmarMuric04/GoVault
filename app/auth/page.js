import { isAuthenticated } from "@/lib/actions/auth.actions";
import AuthForm from "@/components/form/auth-form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Shield, Lock, Key, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function AuthPage({ searchParams }) {
  const params = await searchParams;
  const mode = params?.mode || "signin";
  const user = await isAuthenticated();

  if (user) return redirect("/");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding and features */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-3 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  GoVault
                </h1>
                <p className="text-muted-foreground">
                  Your digital security companion
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Why choose SecureVault?
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                  <Lock className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Bank-level Security
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your passwords are encrypted with AES-256 encryption
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Smart Password Generation
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Create strong, unique passwords with our advanced generator
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Trusted by Thousands
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Join our community of security-conscious users
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20">
            <blockquote className="text-foreground">
              <p className="italic">
                "GoVault has completely transformed how I manage my digital
                security. I can't imagine going back to remembering passwords!"
              </p>
              <footer className="mt-2 text-sm text-muted-foreground">
                — Sarah K., Security Professional
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="shadow-2xl border-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="space-y-4">
              {/* Back button */}
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="self-start -ml-2"
              >
                <Link
                  href="/generate"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft size={16} />
                  Back to Generator
                </Link>
              </Button>

              {/* Mobile branding */}
              <div className="lg:hidden flex items-center justify-center gap-3 pb-4">
                <div className="bg-primary p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  GoVault
                </h1>
              </div>

              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  {mode === "signin" ? "Welcome Back" : "Get Started"}
                </h2>
                <p className="text-muted-foreground">
                  {mode === "signin"
                    ? "Sign in to access your secure vault"
                    : "Create your account to start securing your passwords"}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <AuthForm mode={mode} />

              <div className="text-center">
                {mode === "signin" ? (
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      href="/auth?mode=signup"
                      className="font-medium text-primary hover:underline underline-offset-2 transition-colors"
                    >
                      Create one here
                    </Link>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/auth?mode=signin"
                      className="font-medium text-primary hover:underline underline-offset-2 transition-colors"
                    >
                      Sign in instead
                    </Link>
                  </p>
                )}
              </div>

              {/* Trust indicators */}
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>256-bit Encryption</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Zero-Knowledge</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>GDPR Compliant</span>
                  </div>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Your data is encrypted and only you have access to it
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
