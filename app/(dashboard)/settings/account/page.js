import { LanguageCombobox } from "@/components/combobox";
import { DatePicker } from "@/components/date-picker";
import SettingsForm from "@/components/form/settings-form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { isAuthenticated } from "@/lib/actions/auth.actions";

export default async function AccountPage() {
  const user = await isAuthenticated();

  return (
    <SettingsForm>
      <h1 className="text-xl font-medium">Account</h1>
      <p className="text-sm text-gray-400">
        Update your account settings. Set your preferred language and timezone.
      </p>
      <Separator className="my-4" />

      <div className="mb-5 grid w-full gap-1.5">
        <Label htmlFor="date">Date of birth</Label>
        <DatePicker value={new Date(user.dateOfBirth)} />
        <p className="text-sm text-muted-foreground">
          Your date of birth is used to calculate your age.
        </p>
      </div>

      <div className="mb-5 grid w-full gap-1.5">
        <Label htmlFor="date">Language</Label>
        <LanguageCombobox val={user.language} />
        <p className="text-sm text-muted-foreground">
          This is the language that will be used in the dashboard.
        </p>
      </div>
    </SettingsForm>
  );
}
