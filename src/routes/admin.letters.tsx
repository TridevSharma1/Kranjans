import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { DataTable, RowActions } from "@/components/DataTable";
import { PageTitle } from "@/components/CrudPage";
import { AppointmentLetter, PrintBar } from "@/components/documents";
import { Field, Modal } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore, type Row } from "@/context/StoreContext";
import { fmtDate, inr } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/letters")({
  head: () => pageMeta("Appointment Letters", "Generate appointment letters for employees."),
  component: Letters,
});

function Letters() {
  const { state, add, remove } = useStore();
  const [view, setView] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [empId, setEmpId] = useState("");
  const emp = state.employees.find((e) => e.id === empId);

  const generate = () => {
    if (!emp) return;
    const year = new Date().getFullYear();
    const row = add("letters", {
      reference: `KF/HR/${year}/${String(state.letters.length + 1).padStart(4, "0")}`,
      employeeId: emp.id, name: emp.name, designation: emp.designation, department: emp.department,
      salary: emp.salary, joiningDate: emp.joiningDate, issueDate: new Date().toISOString().slice(0, 10),
    });
    setCreating(false); setEmpId(""); setView(row);
  };

  return (
    <div>
      <PageTitle title="Appointment Letters" subtitle="Letters auto-fill from employee records."
        action={<button className="btn btn-primary" onClick={() => setCreating(true)}><Icon name="plus" className="h-4 w-4" />Generate Letter</button>} />
      <DataTable rows={state.letters}
        columns={[
          { key: "reference", label: "Reference" },
          { key: "name", label: "Employee", render: (r) => <span className="font-semibold">{r.name}</span> },
          { key: "designation", label: "Designation" },
          { key: "department", label: "Department" },
          { key: "salary", label: "Salary", render: (r) => inr(r.salary) },
          { key: "issueDate", label: "Issued", render: (r) => fmtDate(r.issueDate) },
        ]}
        actions={(r) => <RowActions onView={() => setView(r)} onDelete={() => remove("letters", r.id)} />}
      />
      <Modal open={creating} onClose={() => setCreating(false)} title="Generate Appointment Letter">
        <Field label="Select employee">
          <select className="input-field" value={empId} onChange={(e) => setEmpId(e.target.value)}>
            <option value="">Select…</option>
            {state.employees.map((e) => <option key={e.id} value={e.id}>{e.id} — {e.name}</option>)}
          </select>
        </Field>
        {emp && (
          <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-mint p-4 text-sm">
            <p><span className="text-muted-foreground">Designation:</span> {emp.designation}</p>
            <p><span className="text-muted-foreground">Department:</span> {emp.department}</p>
            <p><span className="text-muted-foreground">Salary:</span> {inr(emp.salary)}</p>
            <p><span className="text-muted-foreground">Joining:</span> {fmtDate(emp.joiningDate)}</p>
          </div>
        )}
        <div className="mt-6 flex justify-end"><button className="btn btn-primary" disabled={!emp} onClick={generate}>Generate</button></div>
      </Modal>
      <Modal open={!!view} onClose={() => setView(null)} title="Appointment Letter" wide>
        {view && <div className="print-area"><PrintBar /><AppointmentLetter l={view} f={state.foundation} /></div>}
      </Modal>
    </div>
  );
}
