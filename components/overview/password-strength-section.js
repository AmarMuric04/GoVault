import { getPasswordStrengthPieData } from "@/lib/actions/password/statistics.actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PieChart from "@/components/charts/pie-chart";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default async function PasswordStrengthSection() {
  const pieData = await getPasswordStrengthPieData();

  // Calculate strength distribution
  const totalPasswords =
    pieData?.reduce((sum, item) => sum + item.value, 0) || 0;
  const strongPasswords =
    pieData?.find(
      (item) =>
        item.name?.toLowerCase().includes("strong") ||
        item.name?.toLowerCase().includes("great")
    )?.value || 0;

  const weakPasswords =
    pieData?.find(
      (item) =>
        item.name?.toLowerCase().includes("weak") ||
        item.name?.toLowerCase().includes("bad")
    )?.value || 0;

  const strengthScore =
    totalPasswords > 0 ? (strongPasswords / totalPasswords) * 100 : 0;

  const getStrengthIcon = (score) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (score >= 60) return <Shield className="h-4 w-4 text-blue-500" />;
    if (score >= 40)
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStrengthColor = (score) => {
    if (score >= 80)
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    if (score >= 60)
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    if (score >= 40)
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
  };

  const getStrengthLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Password Strength</CardTitle>
              <p className="text-sm text-muted-foreground">
                Security distribution
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Badge
            className={getStrengthColor(strengthScore)}
            variant="secondary"
          >
            <div className="flex items-center gap-1">
              {getStrengthIcon(strengthScore)}
              <span className="text-xs">{getStrengthLabel(strengthScore)}</span>
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
        {/* Overall Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Security Score</span>
            <span className="font-medium">{strengthScore.toFixed(1)}%</span>
          </div>
          <Progress value={strengthScore} className="h-2" />
        </div>

        {/* Pie Chart */}
        <div className="h-48 flex items-center justify-center">
          <PieChart data={pieData} />
        </div>

        {/* Strength Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Breakdown</h4>
          <div className="space-y-2">
            {pieData?.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color || "#8884d8" }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t">
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="text-lg font-bold text-green-600">
              {strongPasswords}
            </div>
            <div className="text-xs text-muted-foreground">Strong</div>
          </div>
          <div className="text-center p-2 bg-muted/50 rounded">
            <div className="text-lg font-bold text-red-600">
              {weakPasswords}
            </div>
            <div className="text-xs text-muted-foreground">Weak</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
