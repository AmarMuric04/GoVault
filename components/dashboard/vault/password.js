"use client";

import { PasswordDialog } from "@/components/dialogs/password-dialog";
import { copyToClipboard } from "@/utility/copy-text";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoCopy } from "react-icons/io5";
import { toast } from "sonner";

export default function Password({ password }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleCopyToClipboard = () => {
    copyToClipboard(password);
    toast("Copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center kode-mono min-w-48 w-48 max-w-48 overflow-auto">
        {showPassword
          ? password
          : new Array(15).fill(0).map((e, index) => <GoDotFill key={index} />)}
      </div>
      <div className="flex items-center gap-2">
        {!showPassword && (
          <PasswordDialog onProceed={() => setShowPassword(true)}>
            <button className="group p-2 rounded-full hover:bg-white/10 transition-all">
              <FaEye className="group-hover:scale-110 transition-all" />
            </button>
          </PasswordDialog>
        )}
        {showPassword && (
          <button
            onClick={() => setShowPassword(false)}
            className="group p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <FaEyeSlash className="group-hover:scale-110 transition-all" />
          </button>
        )}
        {!showPassword && (
          <PasswordDialog onProceed={handleCopyToClipboard}>
            <button className="group p-2 rounded-full hover:bg-white/10 transition-all">
              <IoCopy className="group-hover:scale-110 transition-all" />
            </button>
          </PasswordDialog>
        )}
        {showPassword && (
          <button
            onClick={handleCopyToClipboard}
            className="group p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <IoCopy className="group-hover:scale-110 transition-all" />
          </button>
        )}
      </div>
    </div>
  );
}
