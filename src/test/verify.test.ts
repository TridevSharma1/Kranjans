import { describe, it, expect } from "vitest";
import { verifyIdCard, verifyCertificate, nextEmployeeId } from "@/utils/verify";

const today = new Date("2026-10-21");
const emps = [
  { id: "EMP-0001", cardStatus: "Active", cardExpiry: "2027-12-31" },
  { id: "EMP-0006", cardStatus: "Active", cardExpiry: "2025-07-31" },
  { id: "EMP-0007", cardStatus: "Revoked", cardExpiry: "2027-02-28" },
];
const certs = [
  { number: "KF-1", status: "Valid", expiryDate: "" },
  { number: "KF-2", status: "Valid", expiryDate: "2026-02-01" },
  { number: "KF-3", status: "Revoked", expiryDate: "" },
];

describe("ID card verification", () => {
  it("valid", () => expect(verifyIdCard("emp-0001", emps, today).status).toBe("valid"));
  it("accepts QR number", () => expect(verifyIdCard("QR-EMP-0001", emps, today).status).toBe("valid"));
  it("expired", () => expect(verifyIdCard("EMP-0006", emps, today).status).toBe("expired"));
  it("revoked", () => expect(verifyIdCard("EMP-0007", emps, today).status).toBe("revoked"));
  it("invalid", () => expect(verifyIdCard("EMP-9999", emps, today).status).toBe("invalid"));
});

describe("Certificate verification", () => {
  it("valid", () => expect(verifyCertificate("kf-1", certs, today).status).toBe("valid"));
  it("expired", () => expect(verifyCertificate("KF-2", certs, today).status).toBe("expired"));
  it("revoked", () => expect(verifyCertificate("KF-3", certs, today).status).toBe("revoked"));
  it("invalid", () => expect(verifyCertificate("NOPE", certs, today).status).toBe("invalid"));
});

describe("Employee ID", () => {
  it("generates EMP-0009 after EMP-0008", () => expect(nextEmployeeId(["EMP-0001", "EMP-0008"])).toBe("EMP-0009"));
  it("starts at EMP-0001", () => expect(nextEmployeeId([])).toBe("EMP-0001"));
});
