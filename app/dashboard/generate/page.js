"use client";

import Container from "@/components/container";
import { IoCopy } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { generatePassword } from "@/utility/password/password-generator";
import { useEffect, useState } from "react";
import { copyToClipboard } from "@/utility/copy-text";
import { toast } from "sonner";
import { getPasswordStrength } from "@/utility/password/password-strength";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaCircleInfo } from "react-icons/fa6";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DialogDemo } from "@/components/dialogs/create-password-dialog";
import { Button } from "@/components/ui/button";

export default function GeneratePage() {
  const [length, setLength] = useState(10);
  const [config, setConfig] = useState({
    lowerCase: true,
    upperCase: true,
    symbols: false,
    digits: false,
  });
  const [password, setPassword] = useState(generatePassword(length, config));
  const [strength, setStrength] = useState(getPasswordStrength(password));

  useEffect(() => {
    if (
      !config.upperCase &&
      !config.lowerCase &&
      !config.symbols &&
      !config.digits
    ) {
      setConfig({ ...config, upperCase: true });
    }

    const newPassword = generatePassword(length, config);
    setPassword(newPassword);
    setStrength(getPasswordStrength(newPassword));
  }, [config]);

  const handleRegenerate = () => {
    const newPassword = generatePassword(length, config);
    setPassword(newPassword);
    setStrength(getPasswordStrength(newPassword));
  };

  const handleCopy = () => {
    copyToClipboard(password);
    toast(
      <div className="flex items-center gap-4 justify-between">
        <div>
          <p className="font-semibold">Copied to clipboard!</p>
          <p className="text-xs text-gray-700">
            Consider saving it to your vault
          </p>
        </div>
        <DialogDemo password={password}>
          <Button>Save to Vault</Button>
        </DialogDemo>
      </div>
    );
  };

  let strengthClasses = "w-0 bg-transparent";

  if (strength === "Bad") strengthClasses = "w-1/4 bg-red-400";
  if (strength === "Dubious") strengthClasses = "w-1/2 bg-orange-400";
  if (strength === "Good") strengthClasses = "w-3/4 bg-lime-400";
  if (strength === "Great") strengthClasses = "w-full bg-green-400";

  return (
    <div className="grid grid-cols-3 grid-rows-10 gap-10 p-6 max-h-full h-full overflow-hidden">
      <Container className="col-span-3 row-span-4 relative">
        <h1 className="text-2xl font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Generate password
        </h1>
        <div className="px-4 py-10 flex justify-center gap-4 items-center">
          <input
            className="kode-mono text-[4rem] px-4 border-b-4 border-zinc-900"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value, config);
              setLength(Number(e.target.value.length));
              setStrength(getPasswordStrength(e.target.value));
            }}
          />

          <DialogDemo password={password}>
            <Button>Save to Vault</Button>
          </DialogDemo>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-full hover:bg-white/10 transition-all group"
                >
                  <IoCopy
                    size={25}
                    className="group-hover:scale-120 transition-all"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleRegenerate}
                  className="p-2 rounded-full hover:bg-white/10 transition-all group"
                >
                  <FiRefreshCcw
                    size={25}
                    className="group-hover:scale-120 transition-all"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get a new password</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div
          className={`h-2 transition-all absolute left-0 bottom-0 ${strengthClasses}`}
        ></div>
      </Container>

      <Container className="col-span-1 row-span-3">
        <h1 className="font-semibold mb-4 border-b-1 border-zinc-900 px-4 py-2">
          Modify visual experience
        </h1>
        <RadioGroup
          defaultValue="easy-to-say"
          className="px-10 py-4 flex flex-col justify-between h-full"
        >
          <div
            onClick={() =>
              setConfig({
                upperCase: true,
                lowerCase: true,
                digits: false,
                symbols: false,
              })
            }
            className="flex items-center space-x-2"
          >
            <RadioGroupItem
              checked={
                config.upperCase &&
                config.lowerCase &&
                !config.symbols &&
                !config.digits
              }
              value="easy-to-say"
            />
            <Label className="cursor-pointer">Easy to say</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FaCircleInfo />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Only letters</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div
            onClick={() =>
              setConfig({
                upperCase: true,
                lowerCase: true,
                digits: true,
                symbols: false,
              })
            }
            className="flex items-center space-x-2"
          >
            <RadioGroupItem
              checked={
                config.upperCase &&
                config.lowerCase &&
                !config.symbols &&
                config.digits
              }
              value="easy-to-read"
            />
            <Label>Easy to read</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FaCircleInfo />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Letters and digits</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div
            onClick={() =>
              setConfig({
                upperCase: true,
                lowerCase: true,
                digits: true,
                symbols: true,
              })
            }
            className="flex items-center space-x-2"
          >
            <RadioGroupItem
              checked={
                config.upperCase &&
                config.lowerCase &&
                config.symbols &&
                config.digits
              }
              value="all-character"
              id="r3"
            />
            <Label htmlFor="r3">All Characters</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FaCircleInfo />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Everything included</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </RadioGroup>
      </Container>

      <Container className="col-span-1 row-span-1 gap-2 items-center justify-center flex-row">
        <div className="w-1/2">
          <Slider
            value={[length]}
            max={30}
            step={1}
            onValueChange={(value) => {
              setLength(Number(value[0]));
              const newPassword = generatePassword(Number(value[0]), config);
              setPassword(newPassword);
              setStrength(getPasswordStrength(newPassword));
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
            setLength(Number(e.target.value));
            const newPassword = generatePassword(
              Number(e.target.value),
              config
            );
            setPassword(newPassword);
            setStrength(getPasswordStrength(newPassword));
          }}
        />
      </Container>
      <div className="col-span-1 row-span-6"></div>

      <Container className="col-span-1 row-span-5">
        <h1 className="font-semibold mb-4 border-b-1 border-zinc-900 px-4 py-2">
          Strength checker
        </h1>
        <ul className="px-10 py-8 flex flex-col justify-between h-full">
          <li className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center">
              <p>An unacceptable password</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaCircleInfo />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Only letters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="h-1 bg-red-600 w-0"></div>
          </li>
          <li className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center">
              <p>A bad password</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaCircleInfo />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Only letters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="h-1 bg-red-400 w-1/4"></div>
          </li>
          <li className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center">
              <p>A dubious password</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaCircleInfo />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Only letters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="h-1 bg-orange-400 w-1/2"></div>
          </li>{" "}
          <li className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center">
              <p>A good password</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaCircleInfo />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Only letters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="h-1 bg-lime-400 w-3/4"></div>
          </li>
          <li className="flex gap-2 flex-col">
            <div className="flex gap-2 items-center">
              <p>A great password</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FaCircleInfo />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Only letters</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="h-1 bg-green-400 w-full"></div>
          </li>
        </ul>
      </Container>
      <Container className="col-span-1 row-span-3">
        <h1 className="font-semibold mb-4 border-b-1 border-zinc-900 px-4 py-2">
          Manually choose
        </h1>
        <div className="px-10 py-4 flex flex-col justify-between h-full">
          <div
            onClick={() =>
              setConfig({ ...config, upperCase: !config.upperCase })
            }
            className="flex items-center space-x-2"
          >
            <Checkbox checked={config.upperCase} />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              Uppercase
            </label>
          </div>
          <div
            onClick={() =>
              setConfig({ ...config, lowerCase: !config.lowerCase })
            }
            className="flex items-center space-x-2"
          >
            <Checkbox checked={config.lowerCase} />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              Lowercase
            </label>
          </div>
          <div
            onClick={() => setConfig({ ...config, digits: !config.digits })}
            className="flex items-center space-x-2"
          >
            <Checkbox checked={config.digits} />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              Digits
            </label>
          </div>
          <div
            onClick={() => setConfig({ ...config, symbols: !config.symbols })}
            className="flex items-center space-x-2"
          >
            <Checkbox checked={config.symbols} />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
              Symbols
            </label>
          </div>
        </div>
      </Container>
    </div>
  );
}
