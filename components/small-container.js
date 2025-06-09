import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

export default function SmallContainer({
  mainStat,
  description,
  icon,
  positive,
  trend = "neutral",
  color = "blue",
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  const getTrendIcon = () => {
    if (positive === true)
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (positive === false)
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    return <Info className="h-4 w-4 text-blue-500" />;
  };

  const getTrendColor = () => {
    if (positive === true)
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    if (positive === false)
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
  };

  const getTrendText = () => {
    if (positive === true) return "Good";
    if (positive === false) return "Needs attention";
    return "Neutral";
  };

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`bg-gradient-to-r ${colorClasses[color]} p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-200`}
          >
            {icon}
          </div>
          <Badge className={getTrendColor()} variant="secondary">
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              <span className="text-xs">{getTrendText()}</span>
            </div>
          </Badge>
        </div>

        <div className="space-y-1">
          <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
            {mainStat}
          </div>
          <div className="text-sm text-muted-foreground font-medium">
            {description}
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
      </CardContent>
    </Card>
  );
}
0;
