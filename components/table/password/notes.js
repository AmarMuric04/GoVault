"use client";

import { useEffect, useRef, useState } from "react";
import { PasswordDialog } from "@/components/dialogs/enter-password-dialog";
import { editNotes } from "@/lib/actions/password/password.actions";
import { ChevronRight, X } from "lucide-react";

export default function Notes({ password }) {
  const [isEditing, setIsEditing] = useState(false);

  const [newNotes, setNewNotes] = useState(password.notes);
  const [shownNotes, setShownNotes] = useState(password.notes);

  const input = useRef(null);

  useEffect(() => {
    if (isEditing) {
      input.current.focus();
    }

    if (!isEditing) setNewNotes(shownNotes);
  }, [isEditing]);

  const handleEditPassword = async (userId, psw) => {
    return await editNotes(psw, newNotes, password._id);
  };

  return (
    <>
      {isEditing && (
        <div className="w-full flex items-center gap-4">
          <input
            ref={input}
            className="flex-grow"
            onChange={(e) => setNewNotes(e.target.value)}
            value={newNotes}
          />
          <div className="flex gap-2 items-center">
            <button onClick={() => setIsEditing(false)}>
              <X size={15} />
            </button>
            <PasswordDialog
              action={handleEditPassword}
              onSuccess={() => {
                setShownNotes(newNotes || "No notes");
                setIsEditing(false);
              }}
            >
              <button className="bg-[#ee6711] hover:bg-[#ee671190] p-1 rounded-full">
                <ChevronRight size={15} />
              </button>
            </PasswordDialog>
          </div>
        </div>
      )}
      {!isEditing && (
        <button
          className="w-full h-full text-start flex items-center"
          onClick={() => setIsEditing(true)}
        >
          <p className="w-full items-center">{shownNotes || "\u00A0"}</p>
        </button>
      )}
    </>
  );
}
