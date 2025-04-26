import dynamic from "next/dynamic";
import { getPasswordsPerDay } from "@/lib/actions/password/statistics.actions";
import { formatMongoDate } from "@/formatters/date";
import Container from "@/components/container";

const AreaChart = dynamic(() => import("@/components/charts/area-chart"));

export default async function ActivityOverTimeSection() {
  const data = await getPasswordsPerDay();

  return (
    <Container className="col-span-2 row-span-3">
      <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
        Your activity over time
      </h1>
      <AreaChart
        data={data.map((d) => ({
          ...d,
          date: formatMongoDate(d.date),
        }))}
      />
    </Container>
  );
}
