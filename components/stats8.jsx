import { ArrowRight, Calculator } from "lucide-react";

const Stats8 = ({
  subheading = "Statistics",
  heading = "Platform performance insights",
  description = "Ensuring stability and scalability for all users",

  stats = [
    {
      id: "stat-1",
      value: "250%+",
      label: "average growth in user engagement",
    },
    {
      id: "stat-2",
      value: "$2.5m",
      label: "annual savings per enterprise partner",
    },
    {
      id: "stat-3",
      value: "200+",
      label: "integrations with top industry platforms",
    },
    {
      id: "stat-4",
      value: "99.9%",
      label: "customer satisfaction over the last year",
    },
  ],
}) => {
  return (
    <section className="py-32 flex justify-center">
      <div className="container mx-auto max-w-screen-xl">
        <div className="container flex flex-col">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-sm font-medium rounded-full w-fit bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
            <Calculator className="w-4 h-4 mr-2" />
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
            <div key={stat.id} className="flex flex-col gap-5 md:p-5">
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
