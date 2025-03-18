import { PiPasswordFill } from "react-icons/pi";
import { PiKeyFill } from "react-icons/pi";
import { PiLockFill } from "react-icons/pi";
import { PiClockFill } from "react-icons/pi";
import { LuTrendingUpDown } from "react-icons/lu";
import { MdCategory } from "react-icons/md";
import { FaCodeCompare } from "react-icons/fa6";
import SmallContainer from "@/components/dashboard/overview/small-container";
import Chart from "@/components/dashboard/charts/line";
import Example from "@/components/dashboard/charts/pie";
import BarChartComp from "@/components/dashboard/charts/bar";

export default function OverviewPage() {
  const data = [
    { value: 12, date: "2024-12-12" },
    { value: 25, date: "2024-12-11" },
    { value: 5, date: "2024-12-10" },
    { value: 18, date: "2024-12-09" },
    { value: 22, date: "2024-12-08" },
    { value: 15, date: "2024-12-07" },
    { value: 30, date: "2024-12-06" },
    { value: 27, date: "2024-12-05" },
    { value: 10, date: "2024-12-04" },
    { value: 14, date: "2024-12-03" },
    { value: 16, date: "2024-12-02" },
    { value: 21, date: "2024-12-01" },
    { value: 9, date: "2024-11-30" },
    { value: 13, date: "2024-11-29" },
    { value: 26, date: "2024-11-28" },
    { value: 32, date: "2024-11-27" },
    { value: 19, date: "2024-11-26" },
    { value: 24, date: "2024-11-25" },
    { value: 28, date: "2024-11-24" },
    { value: 31, date: "2024-11-23" },
  ];

  const pieData = [
    { name: "Good Passwords", value: 40, label: 40 },
    { name: "Dubious Passwords", value: 25, label: 25 },
    { name: "Bad Passwords", value: 15, label: 15 },
    { name: "Critical Passwords", value: 20, label: 20 },
  ];

  const barData = [
    { date: "2024-12-12", userPasswords: 25, avgPasswords: 20 },
    { date: "2024-12-11", userPasswords: 30, avgPasswords: 22 },
    { date: "2024-12-10", userPasswords: 18, avgPasswords: 19 },
    { date: "2024-12-09", userPasswords: 40, avgPasswords: 21 },
    { date: "2024-12-08", userPasswords: 35, avgPasswords: 20 },
    { date: "2024-12-07", userPasswords: 22, avgPasswords: 19 },
    { date: "2024-12-06", userPasswords: 28, avgPasswords: 23 },
    { date: "2024-12-05", userPasswords: 26, avgPasswords: 20 },
    { date: "2024-12-04", userPasswords: 34, avgPasswords: 22 },
    { date: "2024-12-03", userPasswords: 30, avgPasswords: 21 },
    { date: "2024-12-02", userPasswords: 29, avgPasswords: 23 },
    { date: "2024-12-01", userPasswords: 27, avgPasswords: 20 },
    { date: "2024-11-30", userPasswords: 24, avgPasswords: 19 },
    { date: "2024-11-29", userPasswords: 31, avgPasswords: 22 },
    { date: "2024-11-28", userPasswords: 38, avgPasswords: 24 },
    { date: "2024-11-27", userPasswords: 20, avgPasswords: 18 },
    { date: "2024-11-26", userPasswords: 42, avgPasswords: 25 },
    { date: "2024-11-25", userPasswords: 37, avgPasswords: 23 },
    { date: "2024-11-24", userPasswords: 33, avgPasswords: 22 },
    { date: "2024-11-23", userPasswords: 45, avgPasswords: 27 },
  ];

  return (
    <>
      <div className="flex gap-10 flex-wrap">
        <SmallContainer
          mainStat="58"
          description="Total Passwords Stored"
          icon={<PiPasswordFill />}
        />
        <SmallContainer
          mainStat="12"
          description="Recently Used Passwords"
          icon={<PiClockFill />}
        />
        <SmallContainer
          mainStat="8"
          description="Compromised Passwords"
          icon={<PiLockFill />}
        />
        <SmallContainer
          mainStat="20"
          description="Generated Passwords"
          icon={<PiKeyFill />}
        />
      </div>
      <main className="flex gap-10 flex-grow">
        <section className="flex flex-grow flex-col w-7/10">
          <section className="p-4 bg-zinc-950 border-1 border-zinc-900 w-full flex-grow justify-between flex mt-10 rounded-md max-h-1/2">
            <div className="flex flex-col w-full">
              <header className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-white/10 rounded-full">
                  <LuTrendingUpDown />
                </div>

                <div>
                  <h1 className="text-2xl font-medium">Trends Over Time</h1>
                  <p className="text-gray-400 text-sm">
                    Statistics based on your activity in the application
                  </p>
                </div>
              </header>
              <div className="flex-grow flex w-full">
                <Chart data={data} />
              </div>
            </div>
          </section>
          <section className="p-4 bg-zinc-950 border-1 border-zinc-900 w-full flex-grow justify-between flex mt-10 rounded-md max-h-1/2">
            <div className="flex flex-col w-full">
              <header className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-white/10 rounded-full">
                  <FaCodeCompare />
                </div>

                <div>
                  <h1 className="text-2xl font-medium">Comparison</h1>
                  <p className="text-gray-400 text-sm">
                    Statistics based on the comparison between you and other
                    poeple
                  </p>
                </div>
              </header>
              <div className="flex-grow flex w-full">
                <BarChartComp data={barData} />
              </div>
            </div>
          </section>
        </section>
        <section className="p-4 bg-zinc-950 border-1 border-zinc-900 w-3/10 flex mt-10 rounded-md flex-grow">
          <div className="flex flex-col">
            <header className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-white/10 rounded-full">
                <MdCategory />
              </div>

              <div>
                <h1 className="text-2xl font-medium">Category Distribution</h1>
                <p className="text-gray-400 text-sm">
                  Statistics based on how good your passwords are
                </p>
              </div>
            </header>

            <div className="h-2/3 flex">
              <Example data={pieData} />
            </div>
            <ul className="h-1/2 flex flex-col items-center gap-2 w-full">
              <li>40 Good Passwords</li>
              <li>25 Dubious Passwords</li>
              <li>15 Bad Passwords</li>
              <li>20 Critical Passwords</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
