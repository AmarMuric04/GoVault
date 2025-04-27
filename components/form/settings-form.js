"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { auth, updateAccount } from "@/lib/actions/auth.actions";
import AuthInput from "./auth-input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { Check, CircleX, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SettingsForm({ children }) {
  const [errors, setErrors] = useState({});

  const { setUser, user } = useAuthStore();

  const {
    mutate: handleUpdateSettings,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (formData) => {
      const data = await updateAccount(user._id, formData);

      if (data.error) {
        return Promise.reject(data);
      }

      return data;
    },
    onSuccess: (data) => {},
    onError: (errorData) => {
      console.log(errorData);
      setErrors(errorData.errors || {});
    },
  });

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    handleUpdateSettings(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="col-span-3 my-5">
      {children}
      <Button id="save-changes" disabled={isPending || isSuccess}>
        {isPending && <Loader2 className="animate-spin" />}
        {isSuccess && <Check />}
        {isError && <CircleX />}
        Save Changes
      </Button>
    </form>
  );
}
