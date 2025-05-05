import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Row from "./row";
import { Button } from "../ui/button";
import { CreatePasswordDialog } from "../dialogs/create-password-dialog";
import HoverTitle from "../hover-title";
import { Info, Plus } from "lucide-react";

export function VaultTable({ items, showMoreInfo }) {
  return (
    <>
      <Table className="max-h-full transition-all">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-white">Source</TableHead>
            <TableHead className="text-white">Password</TableHead>
            <TableHead className="text-white">Strength</TableHead>
            <TableHead className="text-white">
              <div className="flex items-center gap-2">
                <p>Notes</p>
                <HoverTitle title={<p>Click a note to edit it</p>}>
                  <Info />
                </HoverTitle>
              </div>
            </TableHead>
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
        <Button
          variant="outline"
          className="border-dashed w-99/100 mx-auto self-center flex my-2"
        >
          <Plus />
          Add a new password
        </Button>
      </CreatePasswordDialog>
    </>
  );
}
