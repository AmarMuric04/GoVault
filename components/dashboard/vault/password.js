"use client";

import { PasswordDialog } from "@/components/dialogs/password-dialog";
import { copyToClipboard } from "@/utility/copy-text";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoCopy } from "react-icons/io5";
import { toast } from "sonner";

export default function Password({ invoice }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleCopyToClipboard = () => {
    copyToClipboard(invoice.paymentStatus);
    toast("Copied to clipboard!");
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {showPassword
          ? invoice.paymentStatus
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
            onClick={() => showPassword(false)}
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
