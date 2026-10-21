const tones: Record<string, string> = {
  good: "bg-mint text-primary",
  warn: "bg-accent/15 text-accent-foreground",
  bad: "bg-destructive/10 text-destructive",
};
const good = ["Active", "Valid", "Success", "Approved", "Upcoming", "Published", "Resolved"];
const bad = ["Revoked", "Failed", "Inactive", "Disabled", "Rejected", "Expired"];

export function StatusPill({ value }: { value: string }) {
  const tone = good.includes(value) ? "good" : bad.includes(value) ? "bad" : "warn";
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${tones[tone]}`}>{value || "—"}</span>;
}
