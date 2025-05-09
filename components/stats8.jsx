import { Lock, Key } from "lucide-react";

const Stats8 = ({
  subheading = "Password Manager Insights",
  heading = "Security and Storage at a Glance",
  description = "Track the security and efficiency of your stored credentials",

  stats = [
    {
      id: "stat-1",
      value: "1.2M+",
      label: "passwords securely stored",
    },
    {
      id: "stat-2",
      value: "98%",
      label: "average password strength score",
    },
    {
      id: "stat-3",
      value: "10k+",
      label: "auto-generated secure passwords",
    },
    {
      id: "stat-4",
      value: "256-bit",
      label: "encryption for maximum security",
    },
  ],
}) => {
  return (
    <section className="py-32 flex justify-center">
      <div className="container mx-auto max-w-screen-xl">
        <div className="container flex flex-col items-center text-center md:items-start md:text-start">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-sm font-medium rounded-full w-fit bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <Key className="w-4 h-4 mr-2" />
            <span>{subheading}</span>
          </div>
          <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
            {heading}
          </h2>
          <p className="mb-4 text-sm text-muted-foreground md:pl-5">
            {description}
          </p>
        </div>
        <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col gap-5 md:p-5 items-center text-center md:items-start md:text-start"
            >
              <div className="text-6xl font-bold">{stat.value}</div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stats8 };
