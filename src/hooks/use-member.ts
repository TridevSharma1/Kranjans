import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";

/** Records belonging to the signed-in member (linked employee, certificates, letters, donations). */
export function useMember() {
  const { user } = useAuth();
  const { state } = useStore();
  const account = state.users.find((u) => u.id === user?.id);
  const employeeId = account?.employeeId || "";
  const employee = state.employees.find((e) => e.id === employeeId);
  const email = (account?.email || "").toLowerCase();
  return {
    account,
    employee,
    foundation: state.foundation,
    certificates: state.certificates.filter((c) => (employeeId && c.employeeId === employeeId) || (account && c.recipient === account.name)),
    letters: state.letters.filter((l) => employeeId && l.employeeId === employeeId),
    donations: state.donations.filter((d) => String(d.email).toLowerCase() === email),
  };
}
