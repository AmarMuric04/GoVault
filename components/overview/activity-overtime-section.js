import { getPasswordsPerDay } from "@/lib/actions/password/statistics.actions";
import { formatMongoDate } from "@/formatters/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AreaChart from "../charts/area-chart";
import { Activity, TrendingUp, Calendar } from "lucide-react";

export default async function ActivityOverTimeSection() {
  const data = await getPasswordsPerDay();

  // Calculate some basic stats for the header
  const totalActivity = data.reduce((sum, item) => sum + (item.count || 0), 0);
  const recentActivity = data
    .slice(-7)
    .reduce((sum, item) => sum + (item.count || 0), 0);
  const previousWeekActivity = data
    .slice(-14, -7)
    .reduce((sum, item) => sum + (item.count || 0), 0);
  const weeklyTrend =
    previousWeekActivity > 0
      ? ((recentActivity - previousWeekActivity) / previousWeekActivity) * 100
      : 0;

  const formattedData = data.map((d) => ({
    ...d,
    date: formatMongoDate(d.date),
  }));

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Activity Over Time</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your password management activity
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span className="text-xs">Last 30 days</span>
            </Badge>
            {weeklyTrend !== 0 && (
              <Badge
                variant={weeklyTrend > 0 ? "default" : "secondary"}
                className={`flex items-center gap-1 ${
                  weeklyTrend > 0
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }`}
              >
                <TrendingUp
                  className={`h-3 w-3 ${weeklyTrend < 0 ? "rotate-180" : ""}`}
                />
                <span className="text-xs">
                  {Math.abs(weeklyTrend).toFixed(1)}%
                </span>
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {totalActivity}
            </div>
            <div className="text-xs text-muted-foreground">Total Activity</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {recentActivity}
            </div>
            <div className="text-xs text-muted-foreground">This Week</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">
              {data.length > 0 ? (totalActivity / data.length).toFixed(1) : "0"}
            </div>
            <div className="text-xs text-muted-foreground">Daily Avg</div>
          </div>
        </div>
        <div className="h-64">
          <AreaChart data={formattedData} />
        </div>
      </CardContent>
    </Card>
  );
}
