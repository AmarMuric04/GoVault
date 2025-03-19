"use client";

import Container from "@/components/container";
import { IoCopy } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { generatePassword } from "@/utility/password/password-generator";
import { useState } from "react";
import { copyToClipboard } from "@/utility/copy-text";
import { toast } from "sonner";
import { getPasswordStrength } from "@/utility/password/password-strength";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FaCircleInfo } from "react-icons/fa6";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function GeneratePage() {
  const [length, setLength] = useState(10);
  const [password, setPassword] = useState(generatePassword(length));
  const [strength, setStrength] = useState(getPasswordStrength(password));

  const handleRegenerate = () => {
    const newPassword = generatePassword(length);
    setPassword(newPassword);
    setStrength(getPasswordStrength(newPassword));
  };

  const handleCopy = () => {
    copyToClipboard(password);
    toast("Copied to clipboard!");
  };

  let strengthClasses = "w-0 bg-transparent";

  if (strength === "Bad") strengthClasses = "w-1/4 bg-red-400";
  if (strength === "Dubious") strengthClasses = "w-1/2 bg-orange-400";
  if (strength === "Good") strengthClasses = "w-3/4 bg-lime-400";
  if (strength === "Great") strengthClasses = "w-full bg-green-400";

  return (
    <div className="grid grid-cols-3 grid-rows-10 gap-10 p-6 max-h-full h-full overflow-hidden">
      <Container className="col-span-3 row-span-4 relative">
        <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Generate password
        </h1>
        <div className="px-4 py-10 flex justify-center gap-4 items-center">
          <input
            className="kode-mono text-[4rem] px-4 border-b-4 border-zinc-900"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setStrength(getPasswordStrength(e.target.value));
            }}
          />
          <button
            onClick={handleCopy}
            className="p-4 rounded-full hover:bg-white/10 transition-all"
          >
            <IoCopy size={30} />
          </button>
          <button
            onClick={handleRegenerate}
            className="p-4 rounded-full hover:bg-white/10 transition-all"
          >
            <FiRefreshCcw size={30} />
          </button>
        </div>
        <div
          className={`h-2 transition-all absolute left-0 bottom-0 ${strengthClasses}`}
        ></div>
      </Container>
      <Container className="col-span-3 row-span-2 gap-2 items-center justify-center flex-row">
        <div className="w-1/2">
          <Slider
            value={[length]}
            max={30}
            step={1}
            onValueChange={(value) => {
              setLength(Number(value[0]));
              const newPassword = generatePassword(Number(value[0]));
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
            const newPassword = generatePassword(Number(e.target.value));
            setPassword(newPassword);
            setStrength(getPasswordStrength(newPassword));
          }}
        />
      </Container>
      <Container className="col-span-1 row-span-4">
        <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Modify visual experience
        </h1>
        <RadioGroup
          defaultValue="easy-to-say"
          className="px-10 py-8 flex flex-col justify-between h-full"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="easy-to-say" id="r1" />
            <Label htmlFor="r1">Easy to say</Label>
            <FaCircleInfo />
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="easy-to-read" id="r2" />
            <Label htmlFor="r2">Easy to read</Label>
            <FaCircleInfo />
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all-character" id="r3" />
            <Label htmlFor="r3">All Characters</Label>
            <FaCircleInfo />
          </div>
        </RadioGroup>
      </Container>
      <Container className="col-span-1 row-span-4">
        <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Manually choose
        </h1>
        <div className="px-10 py-8 flex flex-col justify-between h-full">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Uppercase
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Lowercase
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Digits
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Symbols
            </label>
          </div>
        </div>
      </Container>
      <Container className="col-span-1 row-span-4">
        <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Strength checker
        </h1>
      </Container>
    </div>
  );
}
