"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useActionState, useEffect, useState } from "react";
import { auth } from "@/actions/auth.actions";
import AuthButton from "./auth-button";
import AuthInput from "./auth-input";
import useAuthStore from "@/store/useStore";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

export default function AuthForm({ mode }) {
  const { setUser } = useAuthStore();

  const [formState, formAction] = useActionState(
    async (prevState, formData) => {
      const user = await auth(prevState, formData, { remember, mode });
      setUser(user);
      return user;
    },
    {}
  );
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
  }, [formState?.errors]);

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form action={formAction} className="mt-8 flex flex-col w-full gap-4">
      <AuthInput
        value={formValues.email}
        onChange={(e) =>
          setFormValues({ ...formValues, email: e.target.value })
        }
        name="email"
        placeholder="Email"
        label="Email"
        onFocus={() => handleFocus("email")}
        className={`${errors.email ? "border-red-400" : "border-zinc-900"}`}
        errors={errors}
      />
      <AuthInput
        value={formValues.password}
        onChange={(e) =>
          setFormValues({ ...formValues, password: e.target.value })
        }
        name="password"
        placeholder="Password"
        label="Password"
        onFocus={() => handleFocus("password")}
        className={`${errors.password ? "border-red-400" : "border-zinc-900"}`}
        errors={errors}
      />
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
