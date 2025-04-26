import AuthInput from "@/components/form/auth-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { isAuthenticated } from "@/lib/actions/auth.actions";

export default async function CloseAccountPage() {
  const user = await isAuthenticated();

  return (
    <>
      <h1 className="text-xl font-medium">Close Account</h1>
      <Separator className="my-4" />
      <p>
        <span className="text-destructive font-bold">Warning</span>: If you
        close your account, you will be unsubscribed from all 7 of your courses
        and will lose access to your account and data associated with your
        account forever, even if you choose to create a new account using the
        same email address in the future.
      </p>
      <p className="mb-8 mt-4">
        Please note, if you want to reinstate your account after submitting a
        deletion request, you will have 14 days after the initial submission
        date to reach out to muricamar2004@gmail.com to cancel this request.
      </p>
      <Button variant="destructive">Close Account</Button>
    </>
  );
}
