import { Suspense } from "react";
import {
  RectangleEllipsis,
  ThumbsUp,
  ShieldX,
  Ruler,
  ShieldUser,
} from "lucide-react";
import SmallContainer from "@/components/small-container";
import Container from "@/components/container";
import dynamic from "next/dynamic";
import { formatMongoDate } from "@/formatters/date";
import {
  getBarChartData,
  getPasswordCountComparison,
  getPasswordsPerDay,
  getPasswordStatisticsByUserId,
  getPasswordStrengthPieData,
  getUserGlobalComparisons,
} from "@/lib/actions/password/statistics.actions";
import { HashLoader } from "react-spinners";

const AreaChart = dynamic(() => import("@/components/charts/area-chart"));
const BarChart = dynamic(() => import("@/components/charts/bar-chart"));
const PieChart = dynamic(() => import("@/components/charts/pie-chart"));
const OutlinePieChart = dynamic(() =>
  import("@/components/charts/outline-pie-chart")
);

export default async function OverviewPage() {
  const [
    data,
    pieData,
    barData,
    generalPasswordStats,
    globalComparisons,
    countComparison,
  ] = await Promise.all([
    getPasswordsPerDay(),
    getPasswordStrengthPieData(),
    getBarChartData(),
    getPasswordStatisticsByUserId(),
    getUserGlobalComparisons(),
    getPasswordCountComparison(),
  ]);

  const formatBarData = barData?.map((d) => ({
    ...d,
    date: formatMongoDate(d.date),
  }));

  return (
    <div className="grid grid-cols-4 grid-rows-7 gap-10 p-6 max-h-full overflow-hidden">
      <SmallContainer
        mainStat={generalPasswordStats.totalPasswords}
        description="Total Passwords"
        icon={<RectangleEllipsis />}
      />
      <SmallContainer
        mainStat={`${generalPasswordStats.positivePercentage.toFixed(2)}%`}
        description="Positive passwords"
        icon={<ThumbsUp />}
      />
      <SmallContainer
        mainStat={generalPasswordStats.compromisedCount}
        description="Compromised"
        icon={<ShieldX />}
      />
      <SmallContainer
        mainStat={`${generalPasswordStats.averagePasswordLength.toFixed(2)}`}
        description="Avg. password length"
        icon={<Ruler />}
      />
      <Suspense
        fallback={
          <Container className="col-span-3 row-span-3">
            <div className="w-full h-full grid place-items-center">
              <HashLoader color="#ee6711" size={40} />
            </div>
          </Container>
        }
      >
        <Container className="col-span-3 row-span-3">
          <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
            Your vs. Others' Passwords
          </h1>
          <div className="flex justify-between h-full">
            <div className="w-1/2 h-full">
              <BarChart data={formatBarData} />
            </div>
            <div className="w-1/2 relative h-full">
              <OutlinePieChart data={countComparison} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10">
                <ShieldUser size={30} />
              </div>
            </div>
          </div>
        </Container>
      </Suspense>
      <Suspense
        fallback={
          <Container className="col-span-1 row-span-3">
            {" "}
            <div className="w-full h-full grid place-items-center">
              <HashLoader color="#ee6711" size={40} />
            </div>
          </Container>
        }
      >
        <Container className="col-span-1 row-span-3">
          <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
            Password Strength
          </h1>
          <PieChart data={pieData} />
        </Container>
      </Suspense>
      <Suspense
        fallback={
          <Container className="col-span-2 row-span-3">
            {" "}
            <div className="w-full h-full grid place-items-center">
              <HashLoader color="#ee6711" size={40} />
            </div>
          </Container>
        }
      >
        <Container className="col-span-2 row-span-3">
          <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
            Your activity over time
          </h1>
          <AreaChart
            data={data.map((d) => ({ ...d, date: formatMongoDate(d.date) }))}
          />
        </Container>
      </Suspense>
      <Suspense
        fallback={
          <Container className="col-span-1 row-span-3">
            {" "}
            <div className="w-full h-full grid place-items-center">
              <HashLoader color="#ee6711" size={40} />
            </div>
          </Container>
        }
      >
        <Container className="col-span-1 row-span-3">
          <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
            Overall Statistics
          </h1>
          <ul className="p-4 flex flex-col gap-4">
            <li className="flex justify-between">
              <p className="font-medium">Password Quantity</p>
              <span className="text-gray-200 text-sm">
                {globalComparisons.passwordQuantity}
              </span>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Password Strength</p>
              <span className="text-gray-200 text-sm">
                {globalComparisons.passwordStrength}
              </span>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Compromised Passwords</p>
              <span className="text-gray-200 text-sm">
                {globalComparisons.compromisedPasswords}
              </span>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Generated Passwords</p>
              <span className="text-gray-200 text-sm">
                {globalComparisons.generatedPasswords}
              </span>
            </li>
          </ul>
        </Container>
      </Suspense>
      <div className="col-span-1 row-span-3 bg-[#ee6711] p-8 rounded-md shadow-md flex flex-col">
        <h1 className="text-4xl font-medium">4,923</h1>
        <p className="text-sm text-gray-100">Active Users</p>
      </div>
    </div>
  );
}
