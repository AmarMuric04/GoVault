import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function SecurityIndicator({ strength }) {
  let classes, positive;

  if (strength === "Great") {
    classes = "bg-green-400 text-green-400";
    positive = true;
  }
  if (strength === "Good") {
    classes = "bg-lime-400 text-lime-400";
    positive = true;
  }
  if (strength === "Dubious") {
    classes = "bg-orange-400 text-orange-400";
    positive = false;
  }
  if (strength === "Bad") {
    classes = "bg-red-400 text-red-400";
    positive = false;
  }
  if (strength === "Critical") {
    classes = "bg-red-600 text-red-600";
    positive = false;
  }

  return <div className={`rounded-full ${classes} h-2`}></div>;
}
