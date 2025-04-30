"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import SettingsForm from "@/components/form/settings-form";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import useAuthStore from "@/store/useAuthStore";

export default function AccountPage() {
  const { user } = useAuthStore();

  console.log(user);
  const [notificationType, setNotificationType] = useState(
    user.notificationType
  );
  const [passwordEmails, setPasswordEmails] = useState(user.passwordEmails);
  const [securityEmails, setSecurityEmails] = useState(user.securityEmails);

  return (
    <SettingsForm>
      <h1 className="text-xl font-medium">Notifications</h1>
      <p className="text-sm text-gray-400">
        Configure how you receive notifications.
      </p>
      <Separator className="my-4" />

      <div className="grid gap-1.5 mb-5 w-full">
        <Label>Notify me about...</Label>
        <RadioGroup
          value={notificationType}
          onValueChange={setNotificationType}
          className="my-5"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="critical" id="r1" />
            <Label htmlFor="r1">Critical passwords</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bad" id="r2" />
            <Label htmlFor="r2">Bad passwords</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compromised" id="r3" />
            <Label htmlFor="r3">Compromised passwords</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mb-5">
        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <Label>Password emails</Label>
                <p>Receive emails when we detect a negative password</p>
              </div>
              <Switch
                checked={passwordEmails}
                onCheckedChange={setPasswordEmails}
              />
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <Label>Security emails</Label>
                <p>Receive emails about your account security.</p>
              </div>
              <Switch
                checked={securityEmails}
                onCheckedChange={setSecurityEmails}
              />
            </div>
          </div>
        </div>
      </div>

      <input type="hidden" name="notificationType" value={notificationType} />
      <input
        type="hidden"
        name="passwordEmails"
        value={passwordEmails ? "true" : "false"}
      />
      <input
        type="hidden"
        name="securityEmails"
        value={securityEmails ? "true" : "false"}
      />
    </SettingsForm>
  );
}
