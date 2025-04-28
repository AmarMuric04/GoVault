"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import AuthInput from "../form/auth-input";
import { Check, CircleX, Loader2 } from "lucide-react";
import { auth } from "@/lib/actions/auth.actions";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

export function AuthDialog({ children, onSuccess = () => {} }) {
  const [open, setOpen] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState(INITIAL_VALUES);

  const handleFocus = useCallback((field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const {
    mutate: authenticate,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (data) => {
      const response = await auth(data, { remember, mode: "signin" });
      if (response.error) {
        return Promise.reject(response);
      }
      return response;
    },
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (errorData) => {
      setErrors(errorData.errors || {});
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    authenticate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            You need to be authenticated for this action.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 mb-4">
            <AuthInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              errors={errors}
              className={`${
                errors.email ? "border-red-400" : "border-zinc-900"
              } col-span-3`}
              value={formValues.email}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, email: e.target.value }))
              }
              onFocus={() => handleFocus("email")}
            />
          </div>
          <div className="grid gap-4">
            <AuthInput
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              errors={errors}
              className={`${
                errors.password ? "border-red-400" : "border-zinc-900"
              } col-span-3`}
              value={formValues.password}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, password: e.target.value }))
              }
              onFocus={() => handleFocus("password")}
            />
          </div>
          <div className="text-sm font-medium flex justify-between items-center mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={remember}
                onCheckedChange={setRemember}
                id="remember"
                className="border border-zinc-900"
              />
              <label htmlFor="remember" className="leading-none cursor-pointer">
                Remember me
              </label>
            </div>
            <Button asChild variant="link">
              <Link href="/?mode=forgot_password">Forgot Password</Link>
            </Button>
          </div>
          <DialogFooter className="mt-5">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              variant="link"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button id="signin" type="submit" disabled={isPending}>
              {isPending && <Loader2 className="animate-spin" />}{" "}
              {isSuccess && <Check />}
              {isError && <CircleX />}
              Sign In
            </Button>
          </DialogFooter>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link
              id="create-one"
              href="/auth?mode=signup"
              className="text-primary hover:underline"
            >
              Create one!
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
