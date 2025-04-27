import { LanguageCombobox } from "@/components/combobox";
import { DatePicker } from "@/components/date-picker";
import AuthInput from "@/components/form/auth-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function AccountPage() {
  return (
    <>
      <h1 className="text-xl font-medium">Account</h1>
      <p className="text-sm text-gray-400">
        Update your account settings. Set your preferred language and timezone.
      </p>
      <Separator className="my-4" />
      <div className="space-y-4 mb-8">
        <AuthInput
          name="text"
          label="Current password"
          placeholder="password"
          className="border-zinc-900"
        />

        <AuthInput
          name="text"
          label="New password"
          placeholder="New password"
          className="border-zinc-900"
        />

        <AuthInput
          name="text"
          label="Confirm new password"
          placeholder="Confirm new password"
          className="border-zinc-900"
        />
      </div>
    </>
  );
}
