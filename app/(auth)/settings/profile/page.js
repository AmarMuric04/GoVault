import AuthInput from "@/components/form/auth-input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  return (
    <>
      <div className="pb-5 mb-5 border-b-1 border-zinc-900">
        <h1 className="text-xl font-medium">Profile</h1>
        <p className="text-sm text-gray-400">
          This is how others will see you on the site.
        </p>
      </div>
      <div className="mb-5">
        <AuthInput name="text" label="Username" placeholder="Amar Muric" />
        <span className="text-xs text-gray-400">
          This is your public display name. It can be your real name or a
          pseudonym. You can only change this once every 30 days.
        </span>
      </div>
      <div className="mb-5">
        <AuthInput
          name="text"
          label="Email"
          placeholder="Select a verified email to display"
        />
        <span className="text-xs text-gray-400">
          You can manage verified email addresses in your email settings.
        </span>
      </div>

      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2">Your Message</Label>
        <Textarea placeholder="Type your message here." id="message-2" />
        <p className="text-sm text-muted-foreground">
          Your message will be copied to the support team.
        </p>
      </div>
    </>
  );
}
