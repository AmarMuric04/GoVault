import { getPasswordsPerDay } from "@/lib/actions/password/statistics.actions";
import { formatMongoDate } from "@/formatters/date";
import Container from "@/components/container";
import { Separator } from "../ui/separator";
import AreaChart from "../charts/area-chart";

export default async function ActivityOverTimeSection() {
  const data = await getPasswordsPerDay();

  return (
    <Container className="col-span-2 row-span-3">
      <h1 className="text-lg font-semibold p-4">Your activity over time</h1>
      <Separator className="mb-4" />
      <AreaChart
        data={data.map((d) => ({
          ...d,
          date: formatMongoDate(d.date),
        }))}
      />
    </Container>
  );
}
