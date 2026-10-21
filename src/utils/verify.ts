export type VerifyStatus = "valid" | "invalid" | "expired" | "revoked";

export function isExpired(date: string | undefined, today = new Date()) {
  if (!date) return false;
  const d = new Date(date + "T23:59:59");
  return d.getTime() < today.getTime();
}

export function verifyIdCard<T extends { id: string; cardStatus: string; cardExpiry: string }>(
  query: string, employees: T[], today = new Date(),
): { status: VerifyStatus; record?: T } {
  const q = query.trim().toUpperCase();
  const record = employees.find((e) => e.id.toUpperCase() === q || `QR-${e.id}`.toUpperCase() === q);
  if (!record) return { status: "invalid" };
  if (record.cardStatus === "Revoked") return { status: "revoked", record };
  if (isExpired(record.cardExpiry, today)) return { status: "expired", record };
  return { status: "valid", record };
}

export function verifyCertificate<T extends { number: string; status: string; expiryDate: string }>(
  query: string, certs: T[], today = new Date(),
): { status: VerifyStatus; record?: T } {
  const q = query.trim().toUpperCase();
  const record = certs.find((c) => c.number.toUpperCase() === q);
  if (!record) return { status: "invalid" };
  if (record.status === "Revoked") return { status: "revoked", record };
  if (isExpired(record.expiryDate, today)) return { status: "expired", record };
  return { status: "valid", record };
}

export function nextEmployeeId(ids: string[]) {
  const max = ids.reduce((m, id) => Math.max(m, parseInt(id.replace(/\D/g, ""), 10) || 0), 0);
  return `EMP-${String(max + 1).padStart(4, "0")}`;
}

export const inr = (n: number) => "₹" + Number(n || 0).toLocaleString("en-IN");
export const fmtDate = (d: string) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—");

export function toCSV(rows: Record<string, unknown>[]) {
  if (!rows.length) return "";
  const keys = Object.keys(rows[0]);
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [keys.join(","), ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))].join("\n");
}

export function downloadCSV(name: string, rows: Record<string, unknown>[]) {
  const blob = new Blob([toCSV(rows)], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}
