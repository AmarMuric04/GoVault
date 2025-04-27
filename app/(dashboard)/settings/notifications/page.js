"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function AccountPage() {
  const [notificationType, setNotificationType] = useState("comfortable");
  const [passwordEmails, setPasswordEmails] = useState(false);
  const [securityEmails, setSecurityEmails] = useState(false);

  return (
    <>
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
    </>
  );
}
