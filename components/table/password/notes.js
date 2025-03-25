"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PasswordDialog } from "@/components/dialogs/enter-password-dialog";
import { MdNavigateNext } from "react-icons/md";
import { editNotes, editPassword } from "@/actions/password.actions";

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
            value={newNotes || "No notes"}
          />
          <div className="flex gap-2 items-center">
            <button onClick={() => setIsEditing(false)}>
              <AiOutlineClose />
            </button>
            <PasswordDialog
              action={handleEditPassword}
              onSuccess={() => {
                setShownNotes(newNotes);
                setIsEditing(false);
              }}
            >
              <button className="bg-[#ee6711] hover:bg-[#ee671190] p-1 rounded-full">
                <MdNavigateNext />
              </button>
            </PasswordDialog>
          </div>
        </div>
      )}
      {!isEditing && (
        <button onClick={() => setIsEditing(true)}>
          <p>{shownNotes}</p>
        </button>
      )}
    </>
  );
}
