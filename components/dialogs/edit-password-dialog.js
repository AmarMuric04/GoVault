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
import { BeatLoader } from "react-spinners";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import usePasswordStore from "@/store/usePasswordStore";
import AuthInput from "../form/auth-input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { editPassword } from "@/actions/password.actions";

export function EditPasswordDialog({ children, password, passwordId }) {
  const { passwords, setPasswords } = usePasswordStore();
  const [errors, setErrors] = useState({});

  const [psw, setPsw] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [open, setOpen] = useState(false);

  const toastId = useRef(null);

  const router = useRouter();

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const { mutate: handleEditPassword, isPending } = useMutation({
    mutationFn: async () => {
      let errors = {};

      const thePassword = password || psw;

      if (!thePassword) {
        errors.password = "Password can't be empty";
      }

      if (!accountPassword) {
        errors.accountPassword = "Password can't be empty";
      }

      if (Object.keys(errors).length) {
        const errorResponse = { error: true, errors };
        return Promise.reject(errorResponse);
      }

      setPasswords(
        passwords.map((p) => (p._id === passwordId ? { ...p, password } : p))
      );

      if (toastId.current) toast.dismiss(toastId.current);

      const data = await editPassword(accountPassword, thePassword, passwordId);

      if (data.error) {
        return Promise.reject(data);
      }

      return data;
    },
    onSuccess: (data) => {
      if (toastId.current) toast.dismiss(toastId.current);
      toast.success(<p>Password edited!</p>);

      router.push("/vault");
      setOpen(false);
    },
    onError: (errorData) => {
      console.log(errorData);
      setErrors(errorData.errors || {});
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setPsw("");
        setAccountPassword("");
        if (isOpen) setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit your password</DialogTitle>
          <DialogDescription>
            We need to make sure you are authorized for this action
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!password && (
            <AuthInput
              name="password"
              label="My new password is"
              errors={errors}
              placeholder="Enter your password"
              className={`${
                errors.password ? "border-red-400" : "border-zinc-900"
              } col-span-3`}
              value={psw}
              onChange={(e) => setPsw(e.target.value)}
              onFocus={() => handleFocus("password")}
            />
          )}
          <AuthInput
            name="accountPassword"
            type="password"
            label="My accounts password is"
            errors={errors}
            placeholder="Enter your accounts password"
            className={`${
              errors.accountPassword ? "border-red-400" : "border-zinc-900"
            } col-span-3`}
            value={accountPassword}
            onChange={(e) => setAccountPassword(e.target.value)}
            onFocus={() => handleFocus("accountPassword")}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            type="submit"
            disabled={isPending}
            className="bg-transparent border-1 border-zinc-900"
          >
            Cancel
          </Button>
          {!password && (
            <Link href={`/generate?editing=${passwordId}`}>
              <Button type="submit" disabled={isPending}>
                Use Generator
              </Button>
            </Link>
          )}
          <Button
            onClick={handleEditPassword}
            type="submit"
            disabled={isPending}
            className="bg-[#ee6711] hover:bg-[#ee671180] transition-all rounded-md hover:rounded-[2rem]"
          >
            {isPending ? <BeatLoader color="white" size={5} /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
