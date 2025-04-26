import { LanguageCombobox } from "@/components/combobox";
import { DatePicker } from "@/components/date-picker";
import AuthInput from "@/components/form/auth-input";
import { SwitchForm } from "@/components/switch-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export default function AccountPage() {
  return (
    <>
      <h1 className="text-xl font-medium">Notifications</h1>
      <p className="text-sm text-gray-400">
        Configure how you receive notifications.
      </p>
      <Separator className="my-4" />
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

      <Button>Save Changes</Button>
    </>
  );
}
