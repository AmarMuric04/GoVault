import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { BeatLoader } from "react-spinners";

export default function AuthButton({ mode }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full">
      {pending && <BeatLoader color="white" size={5} />}
      {!pending && <>{mode === "signin" ? "Sign In" : "Sign Up"}</>}
    </Button>
  );
}
