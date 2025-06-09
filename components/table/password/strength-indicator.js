import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, XCircle, CheckCircle } from "lucide-react";

export default function SecurityIndicator({ strength }) {
  const getStrengthConfig = (strength) => {
    switch (strength) {
      case "Great":
        return {
          color:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
          icon: <CheckCircle className="h-3 w-3" />,
          label: "Great",
        };
      case "Good":
        return {
          color:
            "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400",
          icon: <Shield className="h-3 w-3" />,
          label: "Good",
        };
      case "Dubious":
        return {
          color:
            "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
          icon: <AlertTriangle className="h-3 w-3" />,
          label: "Dubious",
        };
      case "Bad":
        return {
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
          icon: <XCircle className="h-3 w-3" />,
          label: "Bad",
        };
      case "Critical":
        return {
          color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
          icon: <XCircle className="h-3 w-3" />,
          label: "Critical",
        };
      default:
        return {
          color:
            "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
          icon: <Shield className="h-3 w-3" />,
          label: "Unknown",
        };
    }
  };

  const config = getStrengthConfig(strength);

  return (
    <Badge
      variant="secondary"
      className={`${config.color} flex items-center gap-1`}
    >
      {config.icon}
      <span className="text-xs">{config.label}</span>
    </Badge>
  );
}
