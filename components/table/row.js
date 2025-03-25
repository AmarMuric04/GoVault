"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import Password from "./password/password";
import SecurityIndicator from "./password/strength-indicator";
import { formatMongoDate } from "@/formatters/date";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { DeletePasswordDialog } from "../dialogs/delete-password-dialog";
import { EditPasswordDialog } from "../dialogs/edit-password-dialog";
import Notes from "./password/notes";

export default function Row({ showMoreInfo, password }) {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setShowPassword(showMoreInfo);
  }, [showMoreInfo]);

  return (
    <TableRow
      className={`p-4 border-zinc-900 ${
        (showMoreInfo || showPassword) && password.strength === "Critical"
          ? "bg-red-600/20"
          : "bg-zinc-950"
      }`}
    >
      <TableCell className="font-medium">
        <div className="flex gap-2 items-center">
          {password.status === "Pending" && (
            <div>
              <BiLoaderAlt className="animate-spin" />
            </div>
          )}
          {password.status === "Saved" && (
            <div className="text-green-400 animate-in">
              <IoCheckmarkDoneSharp />
            </div>
          )}
          <p>{password.source}</p>
        </div>
      </TableCell>
      <TableCell>
        <Password
          showMoreInfo={showMoreInfo}
          password={password}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </TableCell>
      <TableCell>
        {showPassword && <SecurityIndicator strength={password.strength} />}
        {!showPassword && <div>N/A</div>}
      </TableCell>
      <TableCell>
        <Notes password={password} />
      </TableCell>
      <TableCell>{formatMongoDate(password.createdAt)}</TableCell>
      <TableCell>{formatMongoDate(password.updatedAt)}</TableCell>
      <TableCell className="text-right">
        <div className="flex gap-2 items-center justify-end w-full">
          <EditPasswordDialog passwordId={password._id}>
            <Button>
              <MdEdit />
            </Button>
          </EditPasswordDialog>
          <DeletePasswordDialog password={password}>
            <Button className="bg-red-500 hover:bg-red-500/60">
              <FaTrashAlt />
            </Button>
          </DeletePasswordDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}
