import { Suspense } from "react";
import SmallContainer from "@/components/small-container";
import Container from "@/components/container";
import Locked from "@/components/locked";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import { getPasswordStatisticsByUserId } from "@/lib/actions/password/statistics.actions";
import { HashLoader } from "react-spinners";
import BarAndPieSection from "@/components/overview/bar-and-pie-section";
import PasswordStrengthSection from "@/components/overview/password-strength-section";
import ActivityOverTimeSection from "@/components/overview/activity-overtime-section";
import OverallStatisticsSection from "@/components/overview/overall-statistics-section";
import { RectangleEllipsis, ThumbsUp, ShieldX, Ruler } from "lucide-react";

export default async function OverviewPage() {
  const user = await isAuthenticated();

  if (!user) return <Locked />;

  const generalPasswordStats = await getPasswordStatisticsByUserId();

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
        fallback={<LoadingContainer className="col-span-3 row-span-3" />}
      >
        <BarAndPieSection />
      </Suspense>

      <Suspense
        fallback={<LoadingContainer className="col-span-1 row-span-3" />}
      >
        <PasswordStrengthSection />
      </Suspense>

      <Suspense
        fallback={<LoadingContainer className="col-span-2 row-span-3" />}
      >
        <ActivityOverTimeSection />
      </Suspense>

      <Suspense
        fallback={<LoadingContainer className="col-span-1 row-span-3" />}
      >
        <OverallStatisticsSection />
      </Suspense>

      <div className="col-span-1 row-span-3 bg-primary p-8 rounded-md shadow-md flex flex-col">
        <h1 className="text-4xl font-medium">4,923</h1>
        <p className="text-sm text-gray-100">Active Users</p>
      </div>
    </div>
  );
}

function LoadingContainer({ className }) {
  return (
    <Container className={className}>
      <div className="w-full h-full grid place-items-center">
        <HashLoader color="#ee6711" size={40} />
      </div>
    </Container>
  );
}
