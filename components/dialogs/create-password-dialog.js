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
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { addPassword } from "@/actions/password.actions";
import { BeatLoader } from "react-spinners";
import { useState } from "react";

export function DialogDemo({ children, password }) {
  const [source, setSource] = useState("");
  const [psw, setPsw] = useState("");
  const [notes, setNotes] = useState("");

  const { mutate: handleAddPassword, isPending } = useMutation({
    mutationFn: () => addPassword(password, source),
  });

  return (
    <Dialog>
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
          <DialogClose asChild>
            <Button onClick={handleAddPassword} type="submit">
              {isPending && <BeatLoader />}
              {!isPending && "Save Changes"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
