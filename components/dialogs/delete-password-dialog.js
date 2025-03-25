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
import { BeatLoader } from "react-spinners";
import AuthInput from "../form/auth-input";
import { toast } from "sonner";
import { deletePassword } from "@/actions/password.actions";
import usePasswordStore from "@/store/usePasswordStore";

export function DeletePasswordDialog({ children, password }) {
  const { passwords, setPasswords } = usePasswordStore();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [verifier, setVerifier] = useState("");
  const [psw, setPsw] = useState("");

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const { mutate: handleDeletePassword, isPending } = useMutation({
    mutationFn: async () => {
      const data = await deletePassword(psw, verifier, password);

      if (data.error) {
        return Promise.reject(data);
      }

      setPasswords(passwords.filter((p) => p._id !== password._id));
      setOpen(false);

      return data;
    },
    onSuccess: (data) => {
      toast.success("Password deleted!");
    },
    onError: (errorData) => {
      setErrors(errorData.errors || {});
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete password for {password.source}?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this password?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <AuthInput
            name="verifier"
            label={
              <p>
                Please enter "
                <span className="font-bold text-red-400">
                  Delete the password for {password.source}
                </span>
                "
              </p>
            }
            errors={errors}
            placeholder={`Delete the password for ${password.source}`}
            className={`${
              errors.verifier ? "border-red-400" : "border-zinc-900"
            } col-span-3`}
            value={verifier}
            onChange={(e) => setVerifier(e.target.value)}
            onFocus={() => handleFocus("verifier")}
          />
          <AuthInput
            name="password"
            label="Your accounts password is"
            errors={errors}
            placeholder="Enter your accounts password"
            className={`${
              errors.password ? "border-red-400" : "border-zinc-900"
            } col-span-3`}
            value={psw}
            onChange={(e) => setPsw(e.target.value)}
            onFocus={() => handleFocus("password")}
          />
        </div>
        <p className="text-red-500 text-xs">
          * Note! This action is irreversible, only proceed if you are sure you
          want to delete this password.
        </p>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            type="submit"
            disabled={isPending}
            className="bg-transparent border-1 border-zinc-900"
          >
            Cancel
          </Button>
          <Button
            className="bg-[#ee6711] hover:bg-[#ee671180] transition-all rounded-md hover:rounded-[2rem]"
            type="submit"
            disabled={isPending}
            onClick={handleDeletePassword}
          >
            {isPending ? <BeatLoader color="white" size={5} /> : "Proceed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
