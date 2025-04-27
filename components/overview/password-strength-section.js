import dynamic from "next/dynamic";
import { getPasswordStrengthPieData } from "@/lib/actions/password/statistics.actions";
import Container from "@/components/container";
import { Separator } from "../ui/separator";
import PieChart from "@/components/charts/pie-chart";

export default async function PasswordStrengthSection() {
  const pieData = await getPasswordStrengthPieData();

  return (
    <Container className="col-span-1 row-span-3">
      <h1 className="text-lg font-semibold p-4">Password Strength</h1>
      <Separator className="mb-4" />
      <PieChart data={pieData} />
    </Container>
  );
}
