import AuthInput from "@/components/form/auth-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { isAuthenticated } from "@/lib/actions/auth.actions";

export default async function PhotoPage() {
  const user = await isAuthenticated();

  return (
    <>
      <h1 className="text-xl font-medium">Photo</h1>
      <p className="text-sm">
        This is the image that will be displayed in your profile.
      </p>
      <Separator className="my-4" />
      <AuthInput
        name="file"
        label="Add / Change Image"
        placeholder="Doe"
        className="border-zinc-900 mb-8"
      />
      <Button>Save Changes</Button>
    </>
  );
}
