import {
  getBarChartData,
  getPasswordCountComparison,
} from "@/lib/actions/password/statistics.actions";
import { formatMongoDate } from "@/formatters/date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BarChart from "@/components/charts/bar-chart";
import OutlinePieChart from "@/components/charts/outline-pie-chart";
import { BarChart3, PieChart, Users, TrendingUp } from "lucide-react";

export default async function BarAndPieSection() {
  const [barData, countComparison] = await Promise.all([
    getBarChartData(),
    getPasswordCountComparison(),
  ]);

  // Calculate comparison insights
  const userTotal =
    countComparison?.find((item) => item.name?.toLowerCase().includes("you"))
      ?.value || 0;
  const othersTotal =
    countComparison?.find((item) => item.name?.toLowerCase().includes("others"))
      ?.value || 0;
  const totalPasswords = userTotal + othersTotal;
  const userPercentage =
    totalPasswords > 0 ? ((userTotal / totalPasswords) * 100).toFixed(1) : 0;

  const formattedBarData = barData?.map((d) => ({
    ...d,
    date: formatMongoDate(d.date),
  }));

  return (
    <Card className="col-span-full lg:col-span-2 xl:col-span-3">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Password Analytics</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your activity compared to community trends
              </p>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span className="text-xs">Community Comparison</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Timeline View
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Comparison View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-xl font-bold text-foreground">
                  {formattedBarData?.length || 0}
                </div>
                <div className="text-xs text-muted-foreground">Active Days</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-xl font-bold text-foreground">
                  {formattedBarData?.reduce(
                    (sum, item) => sum + (item.count || 0),
                    0
                  ) || 0}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Actions
                </div>
              </div>
            </div>
            <div className="h-64">
              <BarChart data={formattedBarData} />
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-xl font-bold text-foreground">
                  {userTotal}
                </div>
                <div className="text-xs text-muted-foreground">
                  Your Passwords
                </div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-xl font-bold text-foreground">
                  {userPercentage}%
                </div>
                <div className="text-xs text-muted-foreground">Your Share</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-xl font-bold text-foreground">
                  {othersTotal}
                </div>
                <div className="text-xs text-muted-foreground">
                  Community Avg
                </div>
              </div>
            </div>
            <div className="relative h-64 flex items-center justify-center">
              <OutlinePieChart data={countComparison} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-full shadow-lg border">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
