import { LanguageCombobox } from "@/components/combobox";
import { DatePicker } from "@/components/date-picker";
import AuthInput from "@/components/form/auth-input";
import { SwitchForm } from "@/components/switch-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AccountPage() {
  return (
    <>
      <div className="pb-5 mb-5 border-b-1 border-zinc-900">
        <h1 className="text-xl font-medium">Notifications</h1>
        <p className="text-sm text-gray-400">
          Configure how you receive notifications.
        </p>
      </div>
      <div className="grid gap-1.5 mb-5 w-full">
        <Label>Notify me about...</Label>
        <RadioGroup defaultValue="comfortable" className="my-5">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Critical passwords</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Bad passwords</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compromised passwords</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="mb-5">
        <SwitchForm />
      </div>

      <Button className="bg-[#ee6711] hover:bg-[#ee671180] transition-all rounded-md hover:rounded-[2rem] self-end">
        Update account
      </Button>
    </>
  );
}
