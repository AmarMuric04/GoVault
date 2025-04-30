import AuthInput from "@/components/form/auth-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import SettingsForm from "@/components/form/settings-form";

export default async function ProfilePage() {
  const user = await isAuthenticated();

  return (
    <SettingsForm>
      <h1 className="text-xl font-medium">Profile</h1>
      <p className="text-sm">This is how others will see you on the site.</p>
      <Separator className="my-4" />
      <div className="flex flex-col gap-2 w-full">
        <AuthInput
          type="text"
          name="firstName"
          label="First Name"
          defaultValue={user.firstName}
          placeholder="John"
        />
        <AuthInput
          type="text"
          name="lastName"
          defaultValue={user.lastName}
          label="Last Name"
          placeholder="Doe"
        />
      </div>
      <Separator className="my-4" />
      <div className="mb-5 grid w-full gap-1.5">
        <AuthInput
          type="text"
          name="username"
          defaultValue={user.username}
          label="Username"
          placeholder="@johndoe"
        />
        <p className="text-sm text-muted-foreground">
          This is your public display name. It can be your real name or a
          pseudonym. You can only change this once every 30 days.
        </p>
      </div>
      <div className="mb-5 grid w-full gap-1.5">
        <AuthInput
          type="email"
          name="email"
          label="Email"
          placeholder="Select a verified email to display"
          defaultValue={user.email}
        />
        <p className="text-sm text-muted-foreground">
          You can manage verified email addresses in your email settings.
        </p>
      </div>

      <div className="grid w-full gap-1.5 mb-5">
        <Label htmlFor="message-2">Bio</Label>
        <Textarea
          name="bio"
          className="max-h-40"
          placeholder="Your bio..."
          id="message-2"
          defaultValue={user.bio}
        />
        <p className="text-sm text-muted-foreground">
          You can @mention other users and organizations to link to them.
        </p>
      </div>
    </SettingsForm>
  );
}
