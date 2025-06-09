import { getUserGlobalComparisons } from "@/lib/actions/password/statistics.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, Globe } from "lucide-react";

export default async function OverallStatisticsSection() {
  const globalComparisons = await getUserGlobalComparisons();

  const getComparisonIcon = (comparison) => {
    if (
      comparison?.toLowerCase().includes("above") ||
      comparison?.toLowerCase().includes("better")
    ) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    if (
      comparison?.toLowerCase().includes("below") ||
      comparison?.toLowerCase().includes("worse")
    ) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getComparisonColor = (comparison) => {
    if (
      comparison?.toLowerCase().includes("above") ||
      comparison?.toLowerCase().includes("better")
    ) {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    }
    if (
      comparison?.toLowerCase().includes("below") ||
      comparison?.toLowerCase().includes("worse")
    ) {
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    }
    return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  };

  const getComparisonScore = (comparison) => {
    // Extract percentage or score from comparison text if available
    const match = comparison?.match(/(\d+)%/);
    return match ? Number.parseInt(match[1]) : 50; // Default to 50% if no percentage found
  };

  const statistics = [
    {
      label: "Password Quantity",
      value: globalComparisons.passwordQuantity,
      icon: "📊",
      score: getComparisonScore(globalComparisons.passwordQuantity),
    },
    {
      label: "Password Strength",
      value: globalComparisons.passwordStrength,
      icon: "🔒",
      score: getComparisonScore(globalComparisons.passwordStrength),
    },
    {
      label: "Compromised Passwords",
      value: globalComparisons.compromisedPasswords,
      icon: "⚠️",
      score: 100 - getComparisonScore(globalComparisons.compromisedPasswords), // Invert for compromised
    },
    {
      label: "Generated Passwords",
      value: globalComparisons.generatedPasswords,
      icon: "⚡",
      score: getComparisonScore(globalComparisons.generatedPasswords),
    },
  ];

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
            <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Global Comparison</CardTitle>
            <p className="text-sm text-muted-foreground">
              How you compare globally
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
        {statistics.map((stat, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{stat.icon}</span>
                <span className="font-medium text-sm">{stat.label}</span>
              </div>
              <Badge
                className={getComparisonColor(stat.value)}
                variant="secondary"
              >
                <div className="flex items-center gap-1">
                  {getComparisonIcon(stat.value)}
                  <span className="text-xs">
                    {stat.value?.length > 20
                      ? `${stat.value.substring(0, 20)}...`
                      : stat.value}
                  </span>
                </div>
              </Badge>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>vs Global Average</span>
                <span>{stat.score}%</span>
              </div>
              <Progress value={stat.score} className="h-1.5" />
            </div>

            {index < statistics.length - 1 && (
              <div className="border-b border-muted/30" />
            )}
          </div>
        ))}

        {/* Overall Score */}
        <div className="pt-4 border-t space-y-3">
          <div className="text-center">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Overall Security Rating
            </h4>
            <div className="text-3xl font-bold text-primary">
              {Math.round(
                statistics.reduce((sum, stat) => sum + stat.score, 0) /
                  statistics.length
              )}
            </div>
            <div className="text-xs text-muted-foreground">out of 100</div>
          </div>
          <Progress
            value={
              statistics.reduce((sum, stat) => sum + stat.score, 0) /
              statistics.length
            }
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}
