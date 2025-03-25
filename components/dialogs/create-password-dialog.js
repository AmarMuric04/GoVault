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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { addPassword } from "@/actions/password.actions";
import { BeatLoader } from "react-spinners";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import usePasswordStore from "@/store/usePasswordStore";
import useAuthStore from "@/store/useAuthStore";
import { getPasswordStrength } from "@/utility/password/password-strength";
import { toast } from "sonner";
import AuthInput from "../form/auth-input";

export function CreatePasswordDialog({ children, password }) {
  const { passwords, setPasswords } = usePasswordStore();
  const [errors, setErrors] = useState({});
  const { user } = useAuthStore();

  const [source, setSource] = useState("");
  const [psw, setPsw] = useState("");
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);

  const toastId = useRef(null);

  const router = useRouter();

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const { mutate: handleAddPassword, isPending } = useMutation({
    mutationFn: async () => {
      const thePassword = password || psw;

      const tempId = Date.now().toString();

      let errors = {};

      if (!thePassword) {
        errors.password = "Password can't be empty";
      }

      if (!source) {
        errors.source = "You must provide a source";
      }

      if (Object.keys(errors).length) {
        const errorResponse = { error: true, errors };
        return Promise.reject(errorResponse);
      }

      setPasswords([
        ...passwords,
        {
          password: thePassword,
          strength: getPasswordStrength(thePassword),
          owner: user._id,
          _id: tempId,
          status: "Pending",
          source,
          notes,
        },
      ]);
      setOpen(false);
      setPsw("");
      setSource("");
      setNotes("");

      if (toastId.current) toast.dismiss(toastId.current);

      toastId.current = toast(<p>Saving the password...</p>);

      const data = await addPassword(thePassword, source, notes);

      if (data.error) {
        return Promise.reject(data);
      }

      return data;
    },
    onSuccess: (data) => {
      setPasswords(
        passwords.map((p) =>
          p._id === "123" || p.status === "Pending"
            ? { ...data, status: "Saved" }
            : p
        )
      );

      if (toastId.current) toast.dismiss(toastId.current);
      toast.success(<p>Password saved!</p>);

      router.push("/vault");
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
        if (!isOpen) {
          setPsw("");
          setSource("");
          setNotes("");
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Store your password</DialogTitle>
          <DialogDescription>
            Where do you want to use this password?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {!password && (
            <AuthInput
              name="password"
              label="My password is"
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
            name="source"
            label="I want to use this password for"
            errors={errors}
            placeholder="My Google account"
            className={`${
              errors.source ? "border-red-400" : "border-zinc-900"
            } col-span-3`}
            value={source}
            onChange={(e) => setSource(e.target.value)}
            onFocus={() => handleFocus("source")}
          />
          <AuthInput
            name="notes"
            label="Attached notes for this password are (optional)"
            errors={errors}
            placeholder="Enter your notes"
            className={`${
              errors.notes ? "border-red-400" : "border-zinc-900"
            } col-span-3`}
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            onFocus={() => handleFocus("notes")}
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
            <Link href="/generate">
              <Button type="submit" disabled={isPending}>
                Use Generator
              </Button>
            </Link>
          )}
          <Button
            onClick={handleAddPassword}
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
