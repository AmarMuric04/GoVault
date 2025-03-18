export function formatMongoDate(mongoDate) {
  const date = new Date(mongoDate);
  const options = { day: "2-digit", month: "short" };
  return date.toLocaleDateString("en-US", options);
}
