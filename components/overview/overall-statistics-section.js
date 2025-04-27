import { getUserGlobalComparisons } from "@/lib/actions/password/statistics.actions";
import Container from "@/components/container";
import { Separator } from "../ui/separator";

export default async function OverallStatisticsSection() {
  const globalComparisons = await getUserGlobalComparisons();

  return (
    <Container className="col-span-1 row-span-3 text-foreground">
      <h1 className="text-lg font-semibold p-4">Overall Statistics</h1>
      <Separator className="mb-4" />
      <ul className="p-4 flex flex-col gap-4">
        <li className="flex justify-between">
          <p className="font-medium">Password Quantity</p>
          <span className="text-sm">{globalComparisons.passwordQuantity}</span>
        </li>
        <li className="flex justify-between">
          <p className="font-medium">Password Strength</p>
          <span className="text-sm">{globalComparisons.passwordStrength}</span>
        </li>
        <li className="flex justify-between">
          <p className="font-medium">Compromised Passwords</p>
          <span className="text-sm">
            {globalComparisons.compromisedPasswords}
          </span>
        </li>
        <li className="flex justify-between">
          <p className="font-medium">Generated Passwords</p>
          <span className="text-sm">
            {globalComparisons.generatedPasswords}
          </span>
        </li>
      </ul>
    </Container>
  );
}
