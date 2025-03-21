export default function SecurityIndicator({ strength }) {
  let classes;

  if (strength === "Great") {
    classes = "border-green-400 bg-green-400/20 text-green-400";
  }

  if (strength === "Good") {
    classes = "border-lime-400 bg-lime-400/20 text-lime-400";
  }
  if (strength === "Dubious") {
    classes = "border-orange-400 bg-orange-400/20 text-orange-400";
  }
  if (strength === "Bad") {
    classes = "border-red-400 bg-red-400/20 text-red-400";
  }
  if (strength === "Critical") {
    classes = "border-red-600 bg-red-600/20 text-red-600";
  }

  return (
    <div className={`border-1 rounded-md text-center ${classes}`}>
      {strength}
    </div>
  );
}
