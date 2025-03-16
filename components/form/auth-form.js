"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useActionState, useEffect, useState } from "react";
import { signup, signin } from "@/actions/auth.actions";
import AuthButton from "./auth-button";
import { IoInformationCircleSharp } from "react-icons/io5";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

export default function AuthForm({ mode }) {
  const authAction = mode === "signup" ? signup : signin;

  const [formState, formAction] = useActionState(authAction, {});
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormValues(INITIAL_VALUES);
    setErrors({});
  }, [mode]);

  useEffect(() => {
    if (formState.errors) {
      setErrors(formState.errors);
    }
  }, [formState.errors]);

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form action={formAction} className="mt-8 flex flex-col w-full gap-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onFocus={() => handleFocus("email")}
          className={`${errors.email ? "border-red-400" : "border-zinc-900"}`}
        />
        {errors.email && (
          <div className="text-xs text-red-400 flex items-center gap-1">
            <IoInformationCircleSharp />
            <p>{errors.email}</p>
          </div>
        )}
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          value={formValues.password}
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onFocus={() => handleFocus("password")}
          className={`${
            errors.password ? "border-red-400" : "border-zinc-900"
          }`}
        />
        {errors.password && (
          <div className="text-xs text-red-400 flex items-center gap-1">
            <IoInformationCircleSharp />
            <p>{errors.password}</p>
          </div>
        )}
      </div>
      {mode === "signin" && (
        <div className="text-sm font-medium flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={remember}
              onClick={() => setRemember(!remember)}
              id="terms"
              className="border-1 border-zinc-900"
            />
            <label
              htmlFor="terms"
              className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <p className="hover:underline cursor-pointer">Forgot password</p>
        </div>
      )}
      <AuthButton mode={mode} />
    </form>
  );
}
