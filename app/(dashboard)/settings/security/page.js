"use client";

import { LanguageCombobox } from "@/components/combobox";
import { DatePicker } from "@/components/date-picker";
import AuthInput from "@/components/form/auth-input";
import SettingsForm from "@/components/form/settings-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";

export default function AccountPage() {
  const { user } = useAuthStore();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = () => {};

  return (
    <form className="col-span-3 flex flex-col items-start">
      <h1 className="text-xl font-medium">Account</h1>
      <p className="text-sm text-gray-400">
        Update your account settings. Set your preferred language and timezone.
      </p>
      <Separator className="my-4" />
      <div className="space-y-4 mb-8 w-full">
        <AuthInput
          name="text"
          label="Current password"
          placeholder="Current password"
        />

        <AuthInput
          name="text"
          label="New password"
          placeholder="New password"
        />

        <AuthInput
          name="text"
          label="Confirm new password"
          placeholder="Confirm new password"
        />
      </div>
      <Button
        type="submit"
        // disabled={uploading || isPending || !file || isSuccess}
      >
        {/* {(uploading || isPending) && <Loader2 className="animate-spin mr-2" />} */}
        {/* {isSuccess && <Check className="mr-2" />} */}
        {/* {isError && <CircleX className="mr-2" />} */}
        Save Changes
      </Button>
    </form>
  );
}
