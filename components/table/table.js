import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Row from "./row";
import { Button } from "../ui/button";
import { FaRegSquarePlus } from "react-icons/fa6";
import { CreatePasswordDialog } from "../dialogs/create-password-dialog";

export function VaultTable({ items, showMoreInfo }) {
  return (
    <>
      <Table className="max-h-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-white">Source</TableHead>
            <TableHead className="text-white">Password</TableHead>
            <TableHead className="text-white">Strength</TableHead>
            <TableHead className="text-white">Notes</TableHead>
            <TableHead className="text-white">Created</TableHead>
            <TableHead className="text-white">Updated</TableHead>
            <TableHead className="text-right text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="max-h-full overflow-auto">
          {items.map((password, index) => (
            <Row
              showMoreInfo={showMoreInfo}
              password={password}
              key={password.source + index}
            />
          ))}
        </TableBody>
      </Table>
      <CreatePasswordDialog>
        <Button className="border-1 border-dashed border-zinc-900 bg-zinc-950 w-99/100 mx-auto self-center my-2 flex justify-center items-center gap-2">
          <FaRegSquarePlus />
          <p>Add a new password</p>
        </Button>
      </CreatePasswordDialog>
    </>
  );
}
