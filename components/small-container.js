import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function SmallContainer({
  mainStat,
  description,
  icon,
  positive,
}) {
  return (
    <section className="text-foreground shadow-md border-1 p-1 rounded-md flex gap-4 items-center pr-10 relative flex-grow col-span-1 row-span-1">
      <div className="bg-background rounded-md h-full aspect-square grid place-items-center">
        {icon}
      </div>
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl">{mainStat}</h1>
        <p>{description}</p>
      </div>
      {positive && (
        <p className="text-primary-foreground absolute bg-lime-400 bottom-full right-0 translate-y-1/2 rounded-full text-xs px-2">
          Well done!
        </p>
      )}
    </section>
  );
}
