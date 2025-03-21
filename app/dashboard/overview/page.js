import {
  PiPasswordFill,
  PiKeyFill,
  PiLockFill,
  PiClockFill,
} from "react-icons/pi";
import { TbPasswordUser } from "react-icons/tb";
import SmallContainer from "@/components/dashboard/overview/small-container";
import Chart from "@/components/dashboard/charts/line";
import Example from "@/components/dashboard/charts/pie";
import BarChartComp from "@/components/dashboard/charts/bar";
import { formatMongoDate } from "@/formatters/date";
import BetterPie from "@/components/dashboard/charts/betterPie";
import Container from "@/components/container";

export default function OverviewPage() {
  const data = [
    { value: 12, date: "2024-12-12" },
    { value: 25, date: "2024-12-11" },
    { value: 5, date: "2024-12-10" },
    { value: 18, date: "2024-12-09" },
    { value: 22, date: "2024-12-08" },
  ];

  const pieData = [
    { name: "Great Passwords", value: 27, label: 27 },
    { name: "Good Passwords", value: 40, label: 40 },
    { name: "Dubious Passwords", value: 25, label: 25 },
    { name: "Bad Passwords", value: 15, label: 15 },
    { name: "Critical Passwords", value: 20, label: 20 },
  ];

  const barData = [
    { date: "2024-12-12", ["Your passwords"]: 25, ["Others' passwords"]: 20 },
    { date: "2024-12-11", ["Your passwords"]: 30, ["Others' passwords"]: 22 },
    { date: "2024-12-12", ["Your passwords"]: 25, ["Others' passwords"]: 20 },
    { date: "2024-12-11", ["Your passwords"]: 30, ["Others' passwords"]: 22 },
    { date: "2024-12-11", ["Your passwords"]: 30, ["Others' passwords"]: 22 },
  ];

  return (
    <div className="grid grid-cols-4 grid-rows-7 gap-10 p-6 max-h-full overflow-hidden">
      <SmallContainer
        mainStat="58"
        description="Total Passwords"
        icon={<PiPasswordFill />}
      />
      <SmallContainer
        mainStat="12"
        description="Recently Used"
        icon={<PiClockFill />}
      />
      <SmallContainer
        mainStat="8"
        description="Compromised"
        icon={<PiLockFill />}
      />
      <SmallContainer
        mainStat="20"
        description="Generated"
        icon={<PiKeyFill />}
      />
      <Container className="col-span-3 row-span-3">
        <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Your vs. Others' Passwords
        </h1>
        <div className="flex justify-between h-full">
          <div className="w-2/3 h-full">
            <BarChartComp
              data={barData.map((d) => ({
                ...d,
                date: formatMongoDate(d.date),
              }))}
            />
          </div>
          <div className="w-1/3 relative h-full">
            <BetterPie />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10">
              <TbPasswordUser size={30} />
            </div>
          </div>
        </div>
      </Container>

      <Container className="col-span-1 row-span-3">
        <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Password Strength
        </h1>
        <div className="w-full h-full">
          <Example data={pieData} />
        </div>
      </Container>

      <Container className="col-span-2 row-span-3">
        <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Your activity over time
        </h1>
        <div className="w-full h-full">
          <Chart
            data={data.map((d) => ({ ...d, date: formatMongoDate(d.date) }))}
          />
        </div>
      </Container>
      <Container className="col-span-1 row-span-3">
        <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
          Overall Statistics
        </h1>
        <ul className="p-4 flex flex-col gap-4">
          <li className="flex justify-between">
            <p className="font-medium">Password Quantity</p>
            <span className="text-gray-200 text-sm">Top 5%</span>
          </li>
          <li className="flex justify-between">
            <p className="font-medium">Password Strength</p>
            <span className="text-gray-200 text-sm">Top 52%</span>
          </li>
          <li className="flex justify-between">
            <p className="font-medium">Compromised Passwords</p>
            <span className="text-gray-200 text-sm">Top 8%</span>
          </li>
          <li className="flex justify-between">
            <p className="font-medium">Generated Passwords</p>
            <span className="text-gray-200 text-sm">Top 20%</span>
          </li>
        </ul>
      </Container>
      <div className="col-span-1 row-span-3 bg-[#ee6711] p-8 rounded-md shadow-md flex flex-col">
        <h1 className="text-4xl font-medium">4,923</h1>
        <p className="text-sm text-gray-100">Active Users</p>
      </div>
    </div>
  );
}
