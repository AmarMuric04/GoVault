import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CreatePasswordDialog } from "../dialogs/create-password-dialog";
import Row from "./row";
import { Plus, Info } from "lucide-react";

export function VaultTable({ items, showMoreInfo }) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="font-semibold">Source</TableHead>
            <TableHead className="font-semibold">Password</TableHead>
            <TableHead className="font-semibold">Strength</TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                Notes
                <Info
                  className="h-4 w-4 text-muted-foreground"
                  title="Click to edit notes"
                />
              </div>
            </TableHead>
            <TableHead className="font-semibold">Created</TableHead>
            <TableHead className="font-semibold">Updated</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((password, index) => (
            <Row
              showMoreInfo={showMoreInfo}
              password={password}
              key={password._id || password.source + index}
            />
          ))}
        </TableBody>
      </Table>

      {/* Add new password row */}
      <div className="border-t p-4">
        <CreatePasswordDialog>
          <Button variant="outline" className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" />
            Add New Password
          </Button>
        </CreatePasswordDialog>
      </div>
    </div>
  );
}
