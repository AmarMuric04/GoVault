"use client";

import { useEffect, useRef, useState } from "react";
import { PasswordDialog } from "@/components/dialogs/enter-password-dialog";
import { editNotes } from "@/lib/actions/password/password.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Edit, X } from "lucide-react";

export default function Notes({ password }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newNotes, setNewNotes] = useState(password.notes || "");
  const [shownNotes, setShownNotes] = useState(password.notes || "");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isEditing) {
      setNewNotes(shownNotes);
    }
  }, [isEditing, shownNotes]);

  const handleEditNotes = async (userId, psw) => {
    return await editNotes(psw, newNotes, password._id);
  };

  const handleCancel = () => {
    setNewNotes(shownNotes);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 w-full">
        <Input
          ref={inputRef}
          value={newNotes}
          onChange={(e) => setNewNotes(e.target.value)}
          placeholder="Add notes..."
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Escape") handleCancel();
          }}
        />
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </Button>
          <PasswordDialog
            action={handleEditNotes}
            onSuccess={() => {
              setShownNotes(newNotes || "");
              setIsEditing(false);
            }}
          >
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Check className="h-4 w-4" />
            </Button>
          </PasswordDialog>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors group w-full"
      onClick={() => setIsEditing(true)}
    >
      <span className="flex-1 text-sm truncate">
        {shownNotes || "Add notes..."}
      </span>
      <Edit className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
