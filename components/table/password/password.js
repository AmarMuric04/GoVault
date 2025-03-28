"use client";

import { getIndividualFullPasswordInfo } from "@/lib/actions/password/password.actions";
import { PasswordDialog } from "@/components/dialogs/enter-password-dialog";
import usePasswordStore from "@/store/usePasswordStore";
import { copyToClipboard } from "@/utility/copy-text";
import { Copy, Dot, Eye, EyeOff, Hash } from "lucide-react";
import { toast } from "sonner";

export default function Password({ password, showPassword, setShowPassword }) {
  const { showIndividualPassword } = usePasswordStore();

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

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center kode-mono min-w-48 w-48 max-w-48 overflow-auto">
        {showPassword
          ? password.password
          : new Array(15).fill(0).map((e, index) => <Hash key={index} />)}
      </div>
      <div className="flex items-center gap-2">
        {!showPassword && (
          <PasswordDialog
            action={handleShowPassword}
            onSuccess={(data) => {
              showIndividualPassword(password._id, data);
              setShowPassword(true);
            }}
          >
            <button className="group p-2 rounded-full hover:bg-white/10 transition-all">
              <Eye size={15} className="group-hover:scale-110 transition-all" />
            </button>
          </PasswordDialog>
        )}
        {showPassword && (
          <button
            onClick={handleHidePassword}
            className="group p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <EyeOff
              size={15}
              className="group-hover:scale-110 transition-all"
            />
          </button>
        )}
        {!showPassword && (
          <PasswordDialog
            action={handleShowPassword}
            onSuccess={(data) => {
              copyToClipboard(data.password);
              toast.success("Copied to clipboard!");
            }}
          >
            <button className="group p-2 rounded-full hover:bg-white/10 transition-all">
              <Copy
                size={15}
                className="group-hover:scale-110 transition-all"
              />
            </button>
          </PasswordDialog>
        )}
        {showPassword && (
          <button
            onClick={() => {
              copyToClipboard(password.password);
              toast.success("Copied to clipboard!");
            }}
            className="group p-2 rounded-full hover:bg-white/10 transition-all"
          >
            <Copy size={15} className="group-hover:scale-110 transition-all" />
          </button>
        )}
      </div>
    </div>
  );
}
