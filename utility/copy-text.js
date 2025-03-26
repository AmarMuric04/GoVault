export async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);

  console.log("Copied: " + text);
}
