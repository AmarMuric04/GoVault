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
  const [mode, setMode] = useState("signin");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState(INITIAL_VALUES);

  useEffect(() => {
    setFormValues(INITIAL_VALUES);
    setErrors({});
  }, [mode]);

  const handleFocus = useCallback((field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const {
    mutate: authenticate,
    isLoading,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (data) => {
      const response = await auth(data, { remember, mode });
      if (response.error) {
        return Promise.reject(response);
      }
      return response;
    },
    onSuccess: (data) => {
      onSuccess(data);
      setOpen(false);
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
          <DialogTitle>{mode === "signin" ? "Sign In" : "Sign Up"}</DialogTitle>
          <DialogDescription>
            You need to be authenticated for this action.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 mb-4">
            <AuthInput
              name="email"
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
          {mode === "signin" && (
            <div className="text-sm font-medium flex justify-between items-center mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={remember}
                  onChange={() => setRemember((prev) => !prev)}
                  id="remember"
                  className="border border-zinc-900"
                />
                <label
                  htmlFor="remember"
                  className="leading-none cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Button asChild variant="link">
                <Link href="/?mode=forgot_password">Forgot Password</Link>
              </Button>
            </div>
          )}
          <DialogFooter className="mt-5">
            <Button
              type="button"
              onClick={() => setOpen(false)}
              variant="outline"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#ee6711] hover:bg-[#ee671180] transition-all rounded-md hover:rounded-[2rem]"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin" />}{" "}
              {isSuccess && <Check />}
              {isError && <CircleX />}
              Proceed
            </Button>
          </DialogFooter>
          <div className="mt-4 text-center text-sm">
            {mode === "signin" ? (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setMode("signup")}
                  className="font-medium cursor-pointer hover:underline"
                >
                  Create one!
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setMode("signin")}
                  className="font-medium cursor-pointer hover:underline"
                >
                  Sign In
                </span>
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
