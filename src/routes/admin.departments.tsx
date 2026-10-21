import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { useStore } from "@/context/StoreContext";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/departments")({
  head: () => pageMeta("Departments", "Manage foundation departments."),
  component: Departments,
});

function Departments() {
  const { state } = useStore();
  return (
    <CrudPage title="Departments" subtitle="Organisational units and their heads." collection="departments"
      fields={[{ name: "name", label: "Name", required: true }, { name: "head", label: "Department Head" }, { name: "description", label: "Description", type: "textarea" }]}
      columns={[
        { key: "name", label: "Name", render: (r) => <span className="font-semibold">{r.name}</span> },
        { key: "head", label: "Head" },
        { key: "description", label: "Description" },
        { key: "staff", label: "Staff", sortable: false, render: (r) => state.employees.filter((e) => e.department === r.name).length },
      ]}
    />
  );
}
