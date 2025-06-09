"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatMongoDate } from "@/formatters/date";
import { DeletePasswordDialog } from "../dialogs/delete-password-dialog";
import { EditPasswordDialog } from "../dialogs/edit-password-dialog";
import Password from "./password/password";
import SecurityIndicator from "./password/strength-indicator";
import Notes from "./password/notes";
import { Check, Edit, Loader2, Trash } from "lucide-react";

export default function Row({ showMoreInfo, password }) {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setShowPassword(showMoreInfo);
  }, [showMoreInfo]);

  const getRowClassName = () => {
    let baseClass = "hover:bg-muted/50 transition-colors";
    if ((showMoreInfo || showPassword) && password.strength === "Critical") {
      baseClass += " bg-red-50 dark:bg-red-900/10 border-l-4 border-l-red-500";
    }
    return baseClass;
  };

  return (
    <TableRow className={getRowClassName()}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          {/* Status indicator */}
          <div className="flex items-center">
            {password.status === "Pending" && (
              <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
            )}
            {password.status === "Saved" && (
              <Check className="h-4 w-4 text-green-500" />
            )}
          </div>

          {/* Source info */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">
                {password.source[0].toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium">{password.source}</p>
              {password.username && (
                <p className="text-xs text-muted-foreground">
                  {password.username}
                </p>
              )}
            </div>
          </div>
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
        {showPassword ? (
          <SecurityIndicator strength={password.strength} />
        ) : (
          <Badge variant="outline" className="text-xs">
            Hidden
          </Badge>
        )}
      </TableCell>

      <TableCell className="max-w-xs">
        <Notes password={password} />
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {formatMongoDate(password.createdAt)}
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {formatMongoDate(password.updatedAt)}
      </TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <EditPasswordDialog passwordId={password._id}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </EditPasswordDialog>
          <DeletePasswordDialog password={password}>
            <Button variant="destructive" size="sm">
              <Trash className="h-4 w-4" />
            </Button>
          </DeletePasswordDialog>
        </div>
      </TableCell>
    </TableRow>
  );
}
