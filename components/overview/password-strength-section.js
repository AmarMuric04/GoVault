import dynamic from "next/dynamic";
import { getPasswordStrengthPieData } from "@/lib/actions/password/statistics.actions";
import Container from "@/components/container";

const PieChart = dynamic(() => import("@/components/charts/pie-chart"));

export default async function PasswordStrengthSection() {
  const pieData = await getPasswordStrengthPieData();

  return (
    <Container className="col-span-1 row-span-3">
      <h1 className="text-lg font-semibold mb-4 border-b-1 border-zinc-900 p-4">
        Password Strength
      </h1>
      <PieChart data={pieData} />
    </Container>
  );
}
