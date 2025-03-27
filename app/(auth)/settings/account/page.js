import { LanguageCombobox } from "@/components/combobox";
import { DatePicker } from "@/components/date-picker";
import AuthInput from "@/components/form/auth-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
  return (
    <>
      <div className="pb-5 mb-5 border-b-1 border-zinc-900">
        <h1 className="text-xl font-medium">Account</h1>
        <p className="text-sm text-gray-400">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <div className="mb-5 grid w-full gap-1.5">
        <AuthInput
          name="text"
          label="Name"
          placeholder="Amar Muric"
          className="border-zinc-900"
        />
        <p className="text-sm text-muted-foreground">
          This is the name that will be displayed on your profile and in emails.
        </p>
      </div>

      <div className="mb-5 grid w-full gap-1.5">
        <Label htmlFor="date">Date of birth</Label>
        <DatePicker />
        <p className="text-sm text-muted-foreground">
          Your date of birth is used to calculate your age.
        </p>
      </div>

      <div className="mb-5 grid w-full gap-1.5">
        <Label htmlFor="date">Date of birth</Label>
        <LanguageCombobox />
        <p className="text-sm text-muted-foreground">
          This is the language that will be used in the dashboard.
        </p>
      </div>

      <Button className="bg-[#ee6711] hover:bg-[#ee671180] transition-all rounded-md hover:rounded-[2rem] self-end">
        Update account
      </Button>
    </>
  );
}
