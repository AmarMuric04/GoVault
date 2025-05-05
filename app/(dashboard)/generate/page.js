"use client";

import { useState, useCallback, useEffect } from "react";
import Container from "@/components/container";
import { generatePassword } from "@/utility/password/password-generator";
import { getPasswordStrength } from "@/utility/password/password-strength";
import { copyToClipboard } from "@/utility/copy-text";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { CreatePasswordDialog } from "@/components/dialogs/create-password-dialog";
import { EditPasswordDialog } from "@/components/dialogs/edit-password-dialog";
import { Button } from "@/components/ui/button";
import HoverTitle from "@/components/hover-title";
import { useSearchParams } from "next/navigation";
import { Copy, Info, RefreshCcw } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import { AuthDialog } from "@/components/dialogs/auth-dialog";

export default function GeneratePage() {
  const { user } = useAuthStore();
  console.log("Rendering generate page...");

  const [length, setLength] = useState(20);
  const [config, setConfig] = useState({
    lowerCase: true,
    upperCase: true,
    symbols: true,
    digits: true,
  });

  console.log(!!user, user);
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
            <Button id="save-changes">Save Changes</Button>
          </EditPasswordDialog>
        ) : (
          <CreatePasswordDialog password={password}>
            <Button id="save-to-vault">Save to Vault</Button>
          </CreatePasswordDialog>
        )}
      </div>
    );
  }, [password, isEditing]);

  const strengthClasses =
    {
      Bad: "w-1/4 bg-red-400",
      Dubious: "w-1/2 bg-orange-400",
      Good: "w-3/4 bg-lime-400",
      Great: "w-full bg-green-400",
    }[strength] || "w-4 bg-red-600";

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
      tooltip: "Only letters",
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
      tooltip: "Letters and digits",
    },
    {
      label: "All Characters",
      value: "all-character",
      config: { upperCase: true, lowerCase: true, digits: true, symbols: true },
      tooltip: "Everything included",
    },
  ];

  const handlePresetChange = (presetConfig) => {
    setConfig(presetConfig);
  };

  const manualOptions = [
    { label: "Uppercase", key: "upperCase" },
    { label: "Lowercase", key: "lowerCase" },
    { label: "Digits", key: "digits" },
    { label: "Symbols", key: "symbols" },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 xl:grid-rows-10 grid-rows-30 gap-10 p-6 2xl:max-h-full h-full 2xl:overflow-hidden overflow-y-scroll">
      <Container className="col-span-1 xl:col-span-2 2xl:col-span-3 row-span-8 md:row-span-6 xl:row-span-4 relative">
        <h1 className="text-2xl font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Generate password
        </h1>
        <div className="px-4 py-10 flex flex-col md:flex-row justify-center gap-4 items-center">
          <input
            className="sm:text-[1.5rem] md:text-[1.7rem] xl:text-[3rem] px-4 border-b-4 border-zinc-900"
            value={password}
            onChange={(e) => {
              const userPwd = e.target.value;
              setPassword(userPwd);
              setLength(userPwd.length);
              setStrength(getPasswordStrength(userPwd));
            }}
          />
          <div className="flex gap-2 items-center">
            {!user && (
              <AuthDialog>
                <Button id="save-to-vault">Save to Vault</Button>
              </AuthDialog>
            )}
            {user && (
              <>
                {isEditing ? (
                  <EditPasswordDialog
                    password={password}
                    passwordId={isEditing}
                  >
                    <Button id="save-changes">Save Changes</Button>
                  </EditPasswordDialog>
                ) : (
                  <CreatePasswordDialog password={password}>
                    <Button id="save-to-vault">Save to Vault</Button>
                  </CreatePasswordDialog>
                )}
              </>
            )}
            <HoverTitle title={<p>Copy to clipboard</p>}>
              <button
                id="copy"
                onClick={handleCopy}
                className="p-2 rounded-full hover:bg-white/10 transition-all group"
              >
                <Copy
                  size={25}
                  className="group-hover:scale-120 transition-all"
                />
              </button>
            </HoverTitle>
            <HoverTitle title={<p>Get a new password</p>}>
              <button
                id="regenerate"
                onClick={handleRegenerate}
                className="p-2 rounded-full hover:bg-white/10 transition-all group"
              >
                <RefreshCcw
                  size={25}
                  className="group-hover:scale-120 transition-all"
                />
              </button>
            </HoverTitle>
          </div>
        </div>
        <div
          className={`h-2 transition-all absolute left-0 bottom-0 ${strengthClasses}`}
        ></div>
      </Container>

      <Container className="col-span-1 xl:row-span-3 row-span-6">
        <h1 className="font-semibold mb-4 border-b-1 border-zinc-900 px-4 py-2">
          Modify visual experience
        </h1>
        <RadioGroup
          defaultValue="easy-to-say"
          className="px-10 py-4 flex flex-col justify-between h-full"
        >
          {presets.map(({ label, value, config: presetConfig, tooltip }) => (
            <div
              key={value}
              onClick={() => handlePresetChange(presetConfig)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <RadioGroupItem
                checked={
                  config.upperCase === presetConfig.upperCase &&
                  config.lowerCase === presetConfig.lowerCase &&
                  config.digits === presetConfig.digits &&
                  config.symbols === presetConfig.symbols
                }
                value={value}
              />
              <Label>{label}</Label>
              <HoverTitle title={<p>{tooltip}</p>}>
                <Info size={16} />
              </HoverTitle>
            </div>
          ))}
        </RadioGroup>
      </Container>

      <Container className="col-span-1 xl:row-span-2 2xl:row-span-1 row-span-3 gap-2 items-center justify-center flex-row">
        <div className="w-1/2">
          <Slider
            value={[length]}
            max={30}
            step={1}
            onValueChange={(value) => {
              const newLen = Number(value[0]);
              setLength(newLen);
              updatePassword(newLen, config);
            }}
          />
        </div>
        <input
          className="w-12"
          type="number"
          step={1}
          max={30}
          min={0}
          value={length}
          onChange={(e) => {
            const newLen = Number(e.target.value);
            setLength(newLen);
            updatePassword(newLen, config);
          }}
        />
      </Container>

      <div className="col-span-1 2xl:row-span-6 row-span-0 hidden 2xl:flex"></div>

      <Container className="col-span-1 xl:row-span-5 row-span-10">
        <h1 className="font-semibold mb-4 border-b-1 border-zinc-900 px-4 py-2">
          Strength checker
        </h1>
        <ul className="px-10 py-8 flex flex-col justify-between h-full">
          {[
            {
              label: "A critical password",
              tooltip: "Unacceptably bad password",
              strengthBar: "bg-red-600 w-2",
            },
            {
              label: "A bad password",
              tooltip: "Too short and/or not complex enough",
              strengthBar: "bg-red-400 w-1/4",
            },
            {
              label: "A dubious password",
              tooltip: "Not complex enough",
              strengthBar: "bg-orange-400 w-1/2",
            },
            {
              label: "A good password",
              tooltip: "Acceptable password",
              strengthBar: "bg-lime-400 w-3/4",
            },
            {
              label: "A great password",
              tooltip: "A password to cherish",
              strengthBar: "bg-green-400 w-full",
            },
          ].map((item, index) => (
            <li key={index} className="flex gap-2 flex-col">
              <div className="flex gap-2 items-center">
                <p>{item.label}</p>
                <HoverTitle title={item.tooltip}>
                  <Info size={16} />
                </HoverTitle>
              </div>
              <div className={`h-1 ${item.strengthBar}`}></div>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="col-span-1 xl:row-span-4 2xl:row-span-3 row-span-6">
        <h1 className="font-semibold mb-4 border-b-1 border-zinc-900 px-4 py-2">
          Manually choose
        </h1>
        <div className="px-10 py-4 flex flex-col justify-between h-full">
          {manualOptions.map(({ label, key }) => (
            <div
              key={key}
              onClick={() =>
                setConfig((prev) => ({ ...prev, [key]: !prev[key] }))
              }
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Checkbox checked={config[key]} />
              <label className="text-sm font-medium leading-none cursor-pointer">
                {label}
              </label>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
