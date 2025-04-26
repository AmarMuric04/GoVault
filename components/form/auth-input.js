import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";

export default function AuthInput({ name, label, errors, ...props }) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input type={name} id={name} name={name} {...props} />
      {errors?.[name] && (
        <div
          id="error"
          className="text-xs text-red-400 flex items-center gap-1"
        >
          <InfoIcon size={15} />
          <p>{errors[name]}</p>
        </div>
      )}
    </div>
  );
}
