import AuthInput from "@/components/form/auth-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import Preview from "@/public/image_preview.webp";
import Image from "next/image";

export default async function PhotoPage() {
  const user = await isAuthenticated();

  return (
    <>
      <h1 className="text-xl font-medium">Photo</h1>
      <p className="text-sm">
        This is the image that will be displayed in your profile.
      </p>
      <Separator className="my-4" />
      <Label>Image preview</Label>
      <div className="w-full p-4 grid place-items-center border-1 border-foreground rounded-md mt-2 mb-4">
        <Image src={Preview} alt="image preview" />
      </div>
      <AuthInput
        type="file"
        name="image"
        label="Add / Change Image"
        className="border-zinc-900 mb-8"
      />
    </>
  );
}
