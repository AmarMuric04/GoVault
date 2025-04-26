"use client";

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
import useAuthStore from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import AuthInput from "../form/auth-input";
import { Check, CircleX, Loader2 } from "lucide-react";

export function PasswordDialog({ children, action, onSuccess = () => {} }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const { user } = useAuthStore();

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const {
    mutate: checkPassword,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async () => {
      const data = await action(user._id, password);

      if (data.error) {
        return Promise.reject(data);
      }

      return data;
    },
    onSuccess: (data) => {
      onSuccess(data);

      setOpen(false);
    },
    onError: (errorData) => {
      setErrors(errorData.errors || {});
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter your password</DialogTitle>
          <DialogDescription>
            We need to make sure you are authorized for this action
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AuthInput
            name="password"
            label="My password is"
            errors={errors}
            placeholder="Enter your password"
            className={`${
              errors.password ? "border-red-400" : "border-zinc-900"
            } col-span-3`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => handleFocus("password")}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            variant="link"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} onClick={checkPassword}>
            {isPending && <Loader2 className="animate-spin" />}
            {isSuccess && <Check />}
            {isError && <CircleX />}
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
