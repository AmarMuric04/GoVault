import { Lock, Shield, ArrowRight, User, Key } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";

export default function Locked() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-2">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 relative">
            {/* Animated lock icon with background */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-primary to-primary/80 p-6 rounded-full">
                <Lock size={48} className="text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Authentication Required
          </h1>
          <p className="text-muted-foreground">
            Please sign in to access this protected content
          </p>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          {/* Feature highlights */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="bg-primary/10 p-2 rounded-full">
                <Shield size={16} className="text-primary" />
              </div>
              <span>Secure access to your personal vault</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="bg-primary/10 p-2 rounded-full">
                <Key size={16} className="text-primary" />
              </div>
              <span>Manage your passwords safely</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="bg-primary/10 p-2 rounded-full">
                <User size={16} className="text-primary" />
              </div>
              <span>Personalized security settings</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <Button asChild className="w-full h-12 text-base font-medium">
              <Link
                href="/auth?mode=signin"
                className="flex items-center justify-center gap-2"
              >
                Sign In
                <ArrowRight size={18} />
              </Link>
            </Button>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Button
                variant="link"
                asChild
                className="p-0 h-auto text-sm font-medium"
              >
                <Link href="/auth?mode=signup">Create one here</Link>
              </Button>
            </div>
          </div>

          {/* Additional info */}
          <div className="pt-4 border-t">
            <p className="text-xs text-center text-muted-foreground leading-relaxed">
              Your security is our priority. All data is encrypted and protected
              with industry-standard security measures.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
