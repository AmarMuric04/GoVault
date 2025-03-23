"use client";

import { getIndividualFullPasswordInfo } from "@/actions/password.actions";
import { PasswordDialog } from "@/components/dialogs/enter-password-dialog";
import usePasswordStore from "@/store/usePasswordStore";
import { copyToClipboard } from "@/utility/copy-text";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoCopy } from "react-icons/io5";
import { toast } from "sonner";

export default function Password({ showMoreInfo, password }) {
  const { showIndividualPassword } = usePasswordStore();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setShowPassword(showMoreInfo);
  }, [showMoreInfo]);

  const handleCopyToClipboard = () => {
    copyToClipboard(password);
    toast("Copied to clipboard!");
  };

  const { mutate: handleShowPassword, isPending } = useMutation({
    mutationFn: ({ userId, password: psw }) =>
      getIndividualFullPasswordInfo(userId, psw, password._id),
    onSuccess: (data) => {
      showIndividualPassword(password._id, data);
      setShowPassword(true);
    },
  });

  const handleHidePassword = () => {
    showIndividualPassword(password._id, {
      ...password,
      password: null,
      strength: null,
    });
    setShowPassword(false);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center kode-mono min-w-48 w-48 max-w-48 overflow-auto">
        {showPassword
          ? password.password
          : new Array(15).fill(0).map((e, index) => <GoDotFill key={index} />)}
      </div>
      <div className="flex items-center gap-2">
        {!showPassword && (
          <PasswordDialog isPending={isPending} onProceed={handleShowPassword}>
            <button className="group p-2 rounded-full hover:bg-white/10 transition-all">
              <FaEye className="group-hover:scale-110 transition-all" />
            </button>
          </PasswordDialog>
        )}
        {showPassword && (
          <button
            onClick={handleHidePassword}
            className="group p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <FaEyeSlash className="group-hover:scale-110 transition-all" />
          </button>
        )}
        {!showPassword && (
          <PasswordDialog
            isPending={isPending}
            onProceed={handleCopyToClipboard}
          >
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
