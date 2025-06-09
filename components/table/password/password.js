"use client";

import { useEffect, useRef, useState } from "react";
import { getIndividualFullPasswordInfo } from "@/lib/actions/password/password.actions";
import { PasswordDialog } from "@/components/dialogs/enter-password-dialog";
import usePasswordStore from "@/store/usePasswordStore";
import { copyToClipboard } from "@/utility/copy-text";
import { Button } from "@/components/ui/button";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Password({ password, showPassword, setShowPassword }) {
  const { showIndividualPassword } = usePasswordStore();
  const [copied, setCopied] = useState(false);
  const copiedTimeout = useRef(null);

  useEffect(() => {
    if (copied) {
      copiedTimeout.current = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
    return () => {
      if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
    };
  }, [copied]);

  useEffect(() => {
    setShowPassword(!!password.password);
    return () => setShowPassword(false);
  }, [password, setShowPassword]);

  const handleShowPassword = async (userId, psw) => {
    return await getIndividualFullPasswordInfo(userId, psw, password._id);
  };

  const handleHidePassword = () => {
    showIndividualPassword(password._id, {
      ...password,
      password: null,
      strength: null,
    });
    setShowPassword(false);
  };

  const handleCopy = (passwordToCopy) => {
    copyToClipboard(passwordToCopy);
    setCopied(true);
    toast.success("Password copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-3">
      {/* Password Display */}
      <div className="flex items-center min-w-0 flex-1">
        {showPassword ? (
          <div
            className="font-mono text-sm cursor-pointer hover:bg-muted/50 px-2 py-1 rounded transition-colors truncate max-w-48"
            onClick={() => handleCopy(password.password)}
            title="Click to copy"
          >
            {password.password}
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="w-1 h-1 bg-muted-foreground rounded-full"
              />
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        {/* Show/Hide Password */}
        {!showPassword ? (
          <PasswordDialog
            action={handleShowPassword}
            onSuccess={(data) => {
              showIndividualPassword(password._id, data);
              setShowPassword(true);
            }}
          >
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
          </PasswordDialog>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleHidePassword}
          >
            <EyeOff className="h-4 w-4" />
          </Button>
        )}

        {/* Copy Button */}
        {showPassword ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleCopy(password.password)}
            disabled={copied}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        ) : (
          <PasswordDialog
            action={handleShowPassword}
            onSuccess={(data) => handleCopy(data.password)}
          >
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={copied}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </PasswordDialog>
        )}
      </div>
    </div>
  );
}
