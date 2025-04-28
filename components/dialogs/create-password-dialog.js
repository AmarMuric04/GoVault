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
import { useMutation } from "@tanstack/react-query";
import { addPassword } from "@/lib/actions/password/password.actions";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import usePasswordStore from "@/store/usePasswordStore";
import useAuthStore from "@/store/useAuthStore";
import { getPasswordStrength } from "@/utility/password/password-strength";
import { toast } from "sonner";
import AuthInput from "../form/auth-input";
import { Check, CircleX, Loader2 } from "lucide-react";

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

  const {
    mutate: handleAddPassword,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
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
              type="password"
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
            type="text"
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
            type="text"
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
            disabled={isPending}
            variant="link"
          >
            Cancel
          </Button>
          {!password && (
            <Button asChild variant="outline" disabled={isPending}>
              <Link href="/generate">Use Generator</Link>
            </Button>
          )}
          <Button
            onClick={handleAddPassword}
            type="submit"
            id="submit"
            disabled={isPending}
          >
            {isPending && <Loader2 className="animate-spin" />}
            {isSuccess && <Check />}
            {isError && <CircleX />}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
