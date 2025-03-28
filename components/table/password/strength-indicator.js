import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function SecurityIndicator({ strength }) {
  let classes, positive;

  if (strength === "Great") {
    classes = "border-green-400 bg-green-400/20 text-green-400";
    positive = true;
  }
  if (strength === "Good") {
    classes = "border-lime-400 bg-lime-400/20 text-lime-400";
    positive = true;
  }
  if (strength === "Dubious") {
    classes = "border-orange-400 bg-orange-400/20 text-orange-400";
    positive = false;
  }
  if (strength === "Bad") {
    classes = "border-red-400 bg-red-400/20 text-red-400";
    positive = false;
  }
  if (strength === "Critical") {
    classes = "border-red-600 bg-red-600/20 text-red-600";
    positive = false;
  }

  return (
    <div
      className={`border-1 rounded-md text-center ${classes} flex items-center justify-center gap-2`}
    >
      {positive ? <ThumbsUp size={15} /> : <ThumbsDown size={15} />}
      {strength}
    </div>
  );
}
