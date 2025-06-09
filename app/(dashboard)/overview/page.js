import { Suspense } from "react";
import { isAuthenticated } from "@/lib/actions/auth.actions";
import { getPasswordStatisticsByUserId } from "@/lib/actions/password/statistics.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Locked from "@/components/locked";
import BarAndPieSection from "@/components/overview/bar-and-pie-section";
import PasswordStrengthSection from "@/components/overview/password-strength-section";
import ActivityOverTimeSection from "@/components/overview/activity-overtime-section";
import OverallStatisticsSection from "@/components/overview/overall-statistics-section";

import {
  RectangleEllipsis,
  ThumbsUp,
  ShieldX,
  Ruler,
  Users,
  TrendingUp,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default async function OverviewPage() {
  const user = await isAuthenticated();

  if (!user) return <Locked />;

  const generalPasswordStats = await getPasswordStatisticsByUserId();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Security Overview
              </h1>
              <p className="text-muted-foreground">
                Monitor your password security and account activity
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Passwords"
            value={generalPasswordStats.totalPasswords}
            icon={<RectangleEllipsis className="h-5 w-5" />}
            trend={
              generalPasswordStats.totalPasswords > 15 ? "positive" : "neutral"
            }
            description={`${
              generalPasswordStats.totalPasswords > 15
                ? "Good coverage"
                : "Consider adding more"
            }`}
            color="blue"
          />

          <StatCard
            title="Strong Passwords"
            value={`${generalPasswordStats.positivePercentage.toFixed(1)}%`}
            icon={<ThumbsUp className="h-5 w-5" />}
            trend={
              generalPasswordStats.positivePercentage > 80
                ? "positive"
                : "warning"
            }
            description={`${
              generalPasswordStats.positivePercentage > 80
                ? "Excellent security"
                : "Needs improvement"
            }`}
            color="green"
          />

          <StatCard
            title="Compromised"
            value={generalPasswordStats.compromisedCount}
            icon={<ShieldX className="h-5 w-5" />}
            trend={
              generalPasswordStats.compromisedCount < 1
                ? "positive"
                : "negative"
            }
            description={`${
              generalPasswordStats.compromisedCount < 1
                ? "All secure"
                : "Action required"
            }`}
            color="red"
          />

          <StatCard
            title="Avg. Length"
            value={`${generalPasswordStats.averagePasswordLength.toFixed(
              1
            )} chars`}
            icon={<Ruler className="h-5 w-5" />}
            trend={
              generalPasswordStats.averagePasswordLength > 16
                ? "positive"
                : "neutral"
            }
            description={`${
              generalPasswordStats.averagePasswordLength > 16
                ? "Strong length"
                : "Could be longer"
            }`}
            color="purple"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Large Charts Section */}
          <div className="lg:col-span-2 xl:col-span-4 space-y-6">
            <Suspense fallback={<ChartLoadingSkeleton className="h-96" />}>
              <BarAndPieSection />
            </Suspense>

            <Suspense fallback={<ChartLoadingSkeleton className="h-80" />}>
              <ActivityOverTimeSection />
            </Suspense>
          </div>

          {/* Sidebar */}
          <Suspense fallback={<SidebarLoadingSkeleton />}>
            <PasswordStrengthSection />
          </Suspense>

          <Suspense fallback={<SidebarLoadingSkeleton />}>
            <OverallStatisticsSection />
          </Suspense>

          {/* Community Stats Card */}
          <Card className="bg-gradient-to-br from-primary to-primary/50 text-white border-0 col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-sm text-white/80">
                    Join thousands of users
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">4,923</div>
                <div className="text-sm text-white/80">Active Users</div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12% this month</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Security Recommendations */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <RecommendationCard
                  icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                  title="Enable 2FA"
                  description="Add an extra layer of security to your account"
                  status="completed"
                />
                <RecommendationCard
                  icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
                  title="Update Weak Passwords"
                  description={`${Math.max(
                    0,
                    Math.round(
                      (100 - generalPasswordStats.positivePercentage) / 10
                    )
                  )} passwords need attention`}
                  status="pending"
                />
                <RecommendationCard
                  icon={<Shield className="h-5 w-5 text-blue-500" />}
                  title="Regular Security Audit"
                  description="Schedule monthly password reviews"
                  status="suggested"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Enhanced Stat Card Component
function StatCard({ title, value, icon, trend, description, color }) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    purple: "from-purple-500 to-purple-600",
  };

  const trendColors = {
    positive:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    negative: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    warning:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    neutral: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  };

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`bg-gradient-to-r ${colorClasses[color]} p-3 rounded-lg text-white`}
          >
            {icon}
          </div>
          <Badge className={trendColors[trend]} variant="secondary">
            {description}
          </Badge>
        </div>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// Recommendation Card Component
function RecommendationCard({ icon, title, description, status }) {
  const statusColors = {
    completed:
      "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20",
    pending:
      "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20",
    suggested:
      "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20",
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 ${statusColors[status]} transition-colors`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div className="space-y-1">
          <h4 className="font-medium text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Loading Skeletons
function ChartLoadingSkeleton({ className }) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-full w-full" />
      </CardContent>
    </Card>
  );
}

function SidebarLoadingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
}
