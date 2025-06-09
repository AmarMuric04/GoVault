"use client";

import { useState, useCallback, useEffect } from "react";
import { generatePassword } from "@/utility/password/password-generator";
import { getPasswordStrength } from "@/utility/password/password-strength";
import { copyToClipboard } from "@/utility/copy-text";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CreatePasswordDialog } from "@/components/dialogs/create-password-dialog";
import { EditPasswordDialog } from "@/components/dialogs/edit-password-dialog";
import { AuthDialog } from "@/components/dialogs/auth-dialog";
import useAuthStore from "@/store/useAuthStore";

import {
  Copy,
  RefreshCcw,
  Shield,
  Settings,
  Zap,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";

export default function PasswordGeneratorPage() {
  const { user } = useAuthStore();
  const [length, setLength] = useState(20);
  const [showPassword, setShowPassword] = useState(true);
  const [config, setConfig] = useState({
    lowerCase: true,
    upperCase: true,
    symbols: true,
    digits: true,
  });

  const [password, setPassword] = useState(() => generatePassword(20, config));
  const [strength, setStrength] = useState(getPasswordStrength(password));

  const searchParams = useSearchParams();
  const isEditing = searchParams.get("editing");

  const updatePassword = useCallback(
    (newLength = length, newConfig = config) => {
      if (
        !newConfig.lowerCase &&
        !newConfig.upperCase &&
        !newConfig.symbols &&
        !newConfig.digits
      ) {
        newConfig = { ...newConfig, upperCase: true };
      }
      const newPassword = generatePassword(newLength, newConfig);
      setPassword(newPassword);
      setStrength(getPasswordStrength(newPassword));
    },
    [length, config]
  );

  useEffect(() => {
    updatePassword();
  }, [config, length, updatePassword]);

  const handleRegenerate = useCallback(() => {
    updatePassword();
  }, [updatePassword]);

  const handleCopy = useCallback(() => {
    copyToClipboard(password);
    toast(
      <div className="flex items-center gap-4 justify-between">
        <div>
          <p className="font-semibold">Copied to clipboard!</p>
          <p className="text-xs">Consider saving it to your vault</p>
        </div>
        {isEditing ? (
          <EditPasswordDialog password={password} passwordId={isEditing}>
            <Button size="sm">Save Changes</Button>
          </EditPasswordDialog>
        ) : (
          <CreatePasswordDialog password={password}>
            <Button size="sm">Save to Vault</Button>
          </CreatePasswordDialog>
        )}
      </div>
    );
  }, [password, isEditing]);

  const getStrengthColor = (strength) => {
    switch (strength) {
      case "Great":
        return "bg-green-500";
      case "Good":
        return "bg-lime-500";
      case "Dubious":
        return "bg-orange-500";
      case "Bad":
        return "bg-red-500";
      default:
        return "bg-red-600";
    }
  };

  const getStrengthWidth = (strength) => {
    switch (strength) {
      case "Great":
        return "w-full";
      case "Good":
        return "w-3/4";
      case "Dubious":
        return "w-1/2";
      case "Bad":
        return "w-1/4";
      default:
        return "w-1/12";
    }
  };

  const presets = [
    {
      label: "Easy to say",
      value: "easy-to-say",
      config: {
        upperCase: true,
        lowerCase: true,
        digits: false,
        symbols: false,
      },
      description: "Only letters - easier to communicate verbally",
    },
    {
      label: "Easy to read",
      value: "easy-to-read",
      config: {
        upperCase: true,
        lowerCase: true,
        digits: true,
        symbols: false,
      },
      description: "Letters and numbers - no confusing symbols",
    },
    {
      label: "Maximum security",
      value: "all-character",
      config: {
        upperCase: true,
        lowerCase: true,
        digits: true,
        symbols: true,
      },
      description: "All character types for strongest security",
    },
  ];

  const handlePresetChange = (presetConfig) => {
    setConfig(presetConfig);
  };

  const manualOptions = [
    { label: "Uppercase letters (A-Z)", key: "upperCase" },
    { label: "Lowercase letters (a-z)", key: "lowerCase" },
    { label: "Numbers (0-9)", key: "digits" },
    { label: "Symbols (!@#$%)", key: "symbols" },
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Main Password Display */}
        <Card className="shadow-lg border-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Generated Password
              </CardTitle>
              <Badge
                variant={
                  strength === "Great"
                    ? "default"
                    : strength === "Good"
                    ? "secondary"
                    : "destructive"
                }
                className="text-sm"
              >
                {strength} Strength
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  const userPwd = e.target.value;
                  setPassword(userPwd);
                  setLength(userPwd.length);
                  setStrength(getPasswordStrength(userPwd));
                }}
                className="text-lg font-mono pr-12 h-14"
                placeholder="Your generated password will appear here"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Strength Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Password Strength</span>
                <span className="font-medium">{strength}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                    strength
                  )} ${getStrengthWidth(strength)}`}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button
                onClick={handleRegenerate}
                className="flex-1 min-w-[120px]"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button
                variant="outline"
                onClick={handleCopy}
                className="flex-1 min-w-[120px]"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              {!user ? (
                <AuthDialog>
                  <Button variant="secondary" className="flex-1 min-w-[120px]">
                    Save to Vault
                  </Button>
                </AuthDialog>
              ) : (
                <>
                  {isEditing ? (
                    <EditPasswordDialog
                      password={password}
                      passwordId={isEditing}
                    >
                      <Button
                        variant="secondary"
                        className="flex-1 min-w-[120px]"
                      >
                        Save Changes
                      </Button>
                    </EditPasswordDialog>
                  ) : (
                    <CreatePasswordDialog password={password}>
                      <Button
                        variant="secondary"
                        className="flex-1 min-w-[120px]"
                      >
                        Save to Vault
                      </Button>
                    </CreatePasswordDialog>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Password Length */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Password Length</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Slider
                    value={[length]}
                    max={50}
                    min={4}
                    step={1}
                    onValueChange={(value) => {
                      const newLen = Number(value[0]);
                      setLength(newLen);
                      updatePassword(newLen, config);
                    }}
                    className="w-full"
                  />
                </div>
                <Input
                  type="number"
                  value={length}
                  onChange={(e) => {
                    const newLen = Number(e.target.value);
                    if (newLen >= 4 && newLen <= 50) {
                      setLength(newLen);
                      updatePassword(newLen, config);
                    }
                  }}
                  className="w-20"
                  min={4}
                  max={50}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Recommended: 12+ characters for strong security
              </div>
            </CardContent>
          </Card>

          {/* Quick Presets */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup className="space-y-3">
                {presets.map(
                  ({ label, value, config: presetConfig, description }) => (
                    <div
                      key={value}
                      onClick={() => handlePresetChange(presetConfig)}
                      className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem
                        checked={
                          config.upperCase === presetConfig.upperCase &&
                          config.lowerCase === presetConfig.lowerCase &&
                          config.digits === presetConfig.digits &&
                          config.symbols === presetConfig.symbols
                        }
                        value={value}
                        className="mt-0.5"
                      />
                      <div className="space-y-1">
                        <Label className="font-medium cursor-pointer">
                          {label}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Character Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Character Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {manualOptions.map(({ label, key }) => (
                  <div
                    key={key}
                    onClick={() =>
                      setConfig((prev) => ({ ...prev, [key]: !prev[key] }))
                    }
                    className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox checked={config[key]} />
                    <Label className="cursor-pointer font-medium">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strength Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Info className="h-5 w-5" />
                Strength Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    level: "Critical",
                    color: "bg-red-600",
                    width: "w-1/12",
                    desc: "Unacceptably weak",
                  },
                  {
                    level: "Bad",
                    color: "bg-red-500",
                    width: "w-1/4",
                    desc: "Too short or simple",
                  },
                  {
                    level: "Dubious",
                    color: "bg-orange-500",
                    width: "w-1/2",
                    desc: "Needs improvement",
                  },
                  {
                    level: "Good",
                    color: "bg-lime-500",
                    width: "w-3/4",
                    desc: "Acceptable security",
                  },
                  {
                    level: "Great",
                    color: "bg-green-500",
                    width: "w-full",
                    desc: "Excellent security",
                  },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.level}</span>
                      <span className="text-muted-foreground">{item.desc}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${item.color} ${item.width}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
