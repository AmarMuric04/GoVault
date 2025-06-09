"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

import {
  Check,
  CircleX,
  Loader2,
  Eye,
  EyeOff,
  Github,
  Mail,
  Lock,
  AlertCircle,
} from "lucide-react";

import { auth } from "@/lib/actions/auth.actions";
import useAuthStore from "@/store/useAuthStore";

// Schema validation for sign in
const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Schema validation for sign up with password strength
const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine((password) => /[^A-Za-z0-9]/.test(password), {
      message: "Password must contain at least one special character",
    }),
});

// Password strength calculation
const calculatePasswordStrength = (password) => {
  if (!password) return 0;

  let strength = 0;

  // Length check
  if (password.length >= 8) strength += 25;

  // Character type checks
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 25;
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;

  return strength;
};

// Get strength label
const getStrengthLabel = (strength) => {
  if (strength === 0) return { label: "No Password", color: "bg-gray-300" };
  if (strength <= 25) return { label: "Weak", color: "bg-red-500" };
  if (strength <= 50) return { label: "Fair", color: "bg-orange-500" };
  if (strength <= 75) return { label: "Good", color: "bg-yellow-500" };
  return { label: "Strong", color: "bg-green-500" };
};

export default function AuthForm({ mode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { setUser } = useAuthStore();
  const router = useRouter();

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(mode === "signin" ? signInSchema : signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // Reset form when mode changes
  useEffect(() => {
    form.reset();
    setPasswordStrength(0);
  }, [mode, form]);

  // Update password strength when password changes
  useEffect(() => {
    if (mode === "signup") {
      const subscription = form.watch((value) => {
        if (value.password) {
          setPasswordStrength(calculatePasswordStrength(value.password));
        } else {
          setPasswordStrength(0);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [form, mode]);

  // Authentication mutation
  const {
    mutate: authenticate,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const data = await auth(formData, { remember, mode });
      if (data.error) {
        return Promise.reject(data);
      }
      return data;
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Authentication successful! Redirecting...");
      router.push("/overview");
    },
    onError: (errorData) => {
      console.error(errorData);
      if (errorData.errors?.email) {
        form.setError("email", { message: errorData.errors.email });
      }
      if (errorData.errors?.password) {
        form.setError("password", { message: errorData.errors.password });
      }
      if (errorData.error && !errorData.errors) {
        toast.error(errorData.error || "Authentication failed");
      }
    },
  });

  // Form submission handler
  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    authenticate(formData);
  };

  // Get strength info
  const strengthInfo = getStrengthLabel(passwordStrength);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="your.email@example.com"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={
                        mode === "signin"
                          ? "••••••••"
                          : "Create a strong password"
                      }
                      className="pl-10 pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Strength Meter (Sign Up Only) */}
          {mode === "signup" && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Password Strength
                </span>
                <span className="text-xs font-medium">
                  {strengthInfo.label}
                </span>
              </div>
              <Progress
                value={passwordStrength}
                className={strengthInfo.color}
              />
              <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                <li className="flex items-center gap-1">
                  {form.watch("password")?.length >= 8 ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <AlertCircle className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span>At least 8 characters</span>
                </li>
                <li className="flex items-center gap-1">
                  {/[A-Z]/.test(form.watch("password") || "") ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <AlertCircle className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span>At least one uppercase letter</span>
                </li>
                <li className="flex items-center gap-1">
                  {/[0-9]/.test(form.watch("password") || "") ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <AlertCircle className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span>At least one number</span>
                </li>
                <li className="flex items-center gap-1">
                  {/[^A-Za-z0-9]/.test(form.watch("password") || "") ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <AlertCircle className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span>At least one special character</span>
                </li>
              </ul>
            </div>
          )}

          {/* Remember Me & Forgot Password (Sign In Only) */}
          {mode === "signin" && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={setRemember}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Button variant="link" className="p-0 h-auto text-sm" asChild>
                <Link href="/?mode=forgot_password">Forgot password?</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11"
          disabled={isPending || isSuccess}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {mode === "signin" ? "Signing in..." : "Creating account..."}
            </>
          ) : isSuccess ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              {mode === "signin" ? "Signed in!" : "Account created!"}
            </>
          ) : isError ? (
            <>
              <CircleX className="mr-2 h-4 w-4" />
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </>
          ) : mode === "signin" ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </Button>

        {/* Social Login Options */}
        <div className="relative my-6">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white dark:bg-slate-900 px-2 text-xs text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" className="h-11">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" type="button" className="h-11">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </form>
    </Form>
  );
}
