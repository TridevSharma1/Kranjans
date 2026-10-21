import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { StatusPill } from "@/components/StatusPill";
import { Avatar } from "@/components/ui";
import { useStore } from "@/context/StoreContext";
import { nextEmployeeId, fmtDate, inr } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/employees")({
  head: () => pageMeta("Employees", "Manage foundation employees."),
  component: Employees,
});

function Employees() {
  const { state } = useStore();
  const depts = state.departments.map((d) => d.name);
  const desigs = state.designations.map((d) => d.title);
  return (
    <CrudPage title="Employees" subtitle="Add, edit and manage staff. IDs are generated automatically (EMP-0001)." collection="employees"
      makeId={(items) => nextEmployeeId(items.map((i) => i.id))}
      defaults={{ status: "Active", cardStatus: "Active", joiningDate: new Date().toISOString().slice(0, 10), cardExpiry: `${new Date().getFullYear() + 2}-12-31` }}
      fields={[
        { name: "name", label: "Full Name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "phone", label: "Phone", required: true },
        { name: "department", label: "Department", type: "select", options: depts, required: true },
        { name: "designation", label: "Designation", type: "select", options: desigs, required: true },
        { name: "joiningDate", label: "Joining Date", type: "date", required: true },
        { name: "salary", label: "Monthly Salary (₹)", type: "number" },
        { name: "bloodGroup", label: "Blood Group" },
        { name: "status", label: "Status", type: "select", options: ["Active", "On Leave", "Inactive"] },
        { name: "cardStatus", label: "ID Card Status", type: "select", options: ["Active", "Revoked"] },
        { name: "cardExpiry", label: "ID Card Expiry", type: "date" },
        { name: "photo", label: "Photo URL" },
        { name: "address", label: "Address", type: "textarea" },
      ]}
      filters={[{ key: "department", label: "Departments", options: depts }, { key: "status", label: "Status", options: ["Active", "On Leave", "Inactive"] }]}
      columns={[
        { key: "id", label: "ID" },
        { key: "name", label: "Name", render: (r) => <span className="flex items-center gap-3"><Avatar name={r.name} photo={r.photo} size="h-8 w-8" /><span className="font-semibold">{r.name}</span></span> },
        { key: "department", label: "Department" },
        { key: "designation", label: "Designation" },
        { key: "joiningDate", label: "Joined", render: (r) => fmtDate(r.joiningDate) },
        { key: "salary", label: "Salary", render: (r) => inr(r.salary) },
        { key: "status", label: "Status", render: (r) => <StatusPill value={r.status} /> },
      ]}
    />
  );
}
