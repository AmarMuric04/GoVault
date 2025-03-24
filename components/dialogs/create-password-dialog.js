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

export function CreatePasswordDialog({ children, password }) {
  const { passwords, setPasswords } = usePasswordStore();
  const { user } = useAuthStore();

  const [source, setSource] = useState("");
  const [psw, setPsw] = useState("");
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);

  const toastId = useRef(null);

  const router = useRouter();

  const { mutateAsync: handleAddPassword, isPending } = useMutation({
    mutationFn: async () => {
      const thePassword = password || psw;

      const tempId = Date.now().toString();

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

      return addPassword(thePassword, source, notes);
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
            <div className="flex flex-col grid-cols-4 justify-center gap-2">
              <Label htmlFor="password" className="text-right">
                My new password will be
              </Label>
              <Input
                onChange={(e) => setPsw(e.target.value)}
                id="password"
                value={psw}
                placeholder="Enter your new password"
                className="col-span-3"
                type="password"
              />
            </div>
          )}
          <div className="flex flex-col grid-cols-4 justify-center gap-2">
            <Label htmlFor="place" className="text-right">
              I want to use this password for
            </Label>
            <Input
              onChange={(e) => setSource(e.target.value)}
              id="place"
              value={source}
              placeholder="My Google account"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col grid-cols-4 justify-center gap-2">
            <Label htmlFor="notes" className="text-right">
              Attached notes for this password are (optional)
            </Label>
            <Input
              onChange={(e) => setNotes(e.target.value)}
              id="notes"
              value={notes}
              placeholder="Enter your notes"
              className="col-span-3"
            />
          </div>
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
