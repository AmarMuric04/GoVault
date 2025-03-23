import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import Password from "../password/password";
import SecurityIndicator from "../password/strength-indicator";
import { formatMongoDate } from "@/formatters/date";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export default function Row({ showMoreInfo, password }) {
  return (
    <TableRow
      className={`p-4 border-zinc-900 ${
        showMoreInfo && password.strength === "Critical"
          ? "bg-red-600/20"
          : "bg-zinc-950"
      }`}
    >
      <TableCell className="font-medium">{password.source}</TableCell>
      <TableCell>
        <Password showMoreInfo={showMoreInfo} password={password.password} />
      </TableCell>
      {showMoreInfo && (
        <TableCell>
          <SecurityIndicator strength={password.strength} />
        </TableCell>
      )}
      <TableCell>{password.notes}</TableCell>
      <TableCell>{formatMongoDate(password.createdAt)}</TableCell>
      <TableCell>{formatMongoDate(password.updatedAt)}</TableCell>
      <TableCell className="text-right">
        <div className="flex gap-2 items-center justify-end w-full">
          <Link href="/dashboard/generate">
            <Button>
              <FaEdit />
            </Button>
          </Link>
          <Button className="bg-red-400/20 hover:bg-red-400/50">
            <FaTrashAlt />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
