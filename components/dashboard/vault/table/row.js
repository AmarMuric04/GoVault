import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import Password from "../password";
import SecurityIndicator from "../strength-indicator";
import { formatMongoDate } from "@/formatters/date";

export default function Row({ password }) {
  return (
    <TableRow
      className={`p-4 border-zinc-900 ${
        password.securityRating === "Critical" ? "bg-red-600/20" : "bg-zinc-950"
      }`}
    >
      <TableCell className="font-medium">{password.service}</TableCell>
      <TableCell>
        <Password password={password.password} />
      </TableCell>
      <TableCell>
        <SecurityIndicator strength={password.securityRating} />
      </TableCell>
      <TableCell>{formatMongoDate(password.createdAt)}</TableCell>
      <TableCell>{formatMongoDate(password.lastUpdated)}</TableCell>
      <TableCell>{password.notes}</TableCell>
      <TableCell className="text-right">
        <Link href="/dashboard/generate">
          <Button>Change</Button>
        </Link>
      </TableCell>
    </TableRow>
  );
}
