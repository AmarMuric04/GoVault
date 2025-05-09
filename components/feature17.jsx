import { Key, ShieldCheck, Lock, Globe, Share2, Users } from "lucide-react";

const Feature17 = ({
  heading = "Password Manager Features",
  subheading = "Core Features",

  features = [
    {
      title: "End-to-End Encryption",
      description:
        "Keep your passwords and sensitive data secure with 256-bit AES encryption.",
      icon: <Lock className="size-4 md:size-6" />,
    },
    {
      title: "Password Generation",
      description:
        "Generate complex, unbreakable passwords for maximum security.",
      icon: <Key className="size-4 md:size-6" />,
    },
    {
      title: "Secure Sharing",
      description:
        "Safely share passwords with trusted contacts without compromising security.",
      icon: <Share2 className="size-4 md:size-6" />,
    },
    {
      title: "Breach Monitoring",
      description:
        "Get notified if any of your saved passwords appear in a known data breach.",
      icon: <ShieldCheck className="size-4 md:size-6" />,
    },
    {
      title: "Cross-Device Sync",
      description:
        "Access your passwords on all your devices seamlessly and securely.",
      icon: <Globe className="size-4 md:size-6" />,
    },
    {
      title: "Team Management",
      description:
        "Manage shared credentials and permissions for your team with ease.",
      icon: <Users className="size-4 md:size-6" />,
    },
  ],
}) => {
  return (
    <section className="py-32">
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center text-center md:items-start md:text-start">
          <div className="inline-flex justify-center px-3 py-1 mb-6 text-sm font-medium rounded-full w-fit bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <Lock className="w-4 h-4 mr-2" />
            <span>{subheading}</span>
          </div>
          <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
            {heading}
          </h2>
        </div>

        <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
          {features.map((feature, idx) => (
            <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature17 };
