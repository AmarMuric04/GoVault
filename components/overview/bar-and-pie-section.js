import { Suspense } from "react";
import dynamic from "next/dynamic";
import {
  getBarChartData,
  getPasswordCountComparison,
} from "@/lib/actions/password/statistics.actions";
import { formatMongoDate } from "@/formatters/date";
import Container from "@/components/container";
import { HashLoader } from "react-spinners";
import { ShieldUser } from "lucide-react";

const BarChart = dynamic(() => import("@/components/charts/bar-chart"));
const OutlinePieChart = dynamic(() =>
  import("@/components/charts/outline-pie-chart")
);

export default async function BarAndPieSection() {
  const [barData, countComparison] = await Promise.all([
    getBarChartData(),
    getPasswordCountComparison(),
  ]);

  return (
    <Container className="col-span-3 row-span-3">
      <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
        Your vs. Others' Passwords
      </h1>
      <div className="flex justify-between h-full">
        <div className="w-1/2 h-full">
          <BarChart
            data={barData?.map((d) => ({
              ...d,
              date: formatMongoDate(d.date),
            }))}
          />
        </div>
        <div className="w-1/2 relative h-full">
          <OutlinePieChart data={countComparison} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10">
            <ShieldUser size={30} />
          </div>
        </div>
      </div>
    </Container>
  );
}
