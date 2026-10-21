import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { StatusPill } from "@/components/StatusPill";
import { Icon } from "@/components/Icon";
import { useStore, type Row } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/users")({
  head: () => pageMeta("Users", "Manage login accounts and roles."),
  component: Users,
});

function Users() {
  const { state } = useStore();
  const { switchUser } = useAuth();
  const navigate = useNavigate();

  const handleMockLogin = (r: Row) => {
    switchUser(r);
    if (r.role === "admin") {
      navigate({ to: "/admin/dashboard" });
    } else {
      navigate({ to: "/user/dashboard" });
    }
  };

  return (
    <CrudPage
      title="Users"
      subtitle="Login accounts. Link a user to an employee to enable their ID card and letters."
      collection="users"
      defaults={{ role: "user", status: "Active" }}
      fields={[
        { name: "name", label: "Name", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        { name: "password", label: "Password", required: true },
        { name: "role", label: "Role", type: "select", options: ["admin", "user"], required: true },
        { name: "employeeId", label: "Linked Employee", type: "select", options: state.employees.map((e) => e.id) },
        { name: "status", label: "Status", type: "select", options: ["Active", "Disabled"] },
      ]}
      filters={[
        { key: "role", label: "Roles", options: ["admin", "user"] },
        { key: "status", label: "Status", options: ["Active", "Disabled"] },
      ]}
      columns={[
        { key: "name", label: "Name", render: (r) => <span className="font-semibold">{r.name}</span> },
        { key: "email", label: "Email" },
        { key: "role", label: "Role", render: (r) => <span className="capitalize">{r.role}</span> },
        { key: "employeeId", label: "Employee", render: (r) => r.employeeId || "—" },
        { key: "status", label: "Status", render: (r) => <StatusPill value={r.status} /> },
        {
          key: "mockLogin",
          label: "Mock Login",
          sortable: false,
          render: (r) => (
            <button
              onClick={() => handleMockLogin(r)}
              className="inline-flex items-center gap-1 rounded-lg bg-mint px-2.5 py-1 text-xs font-bold text-primary hover:bg-primary hover:text-white transition-colors"
              title={`Switch session to ${r.name}`}
            >
              <Icon name="user" className="h-3.5 w-3.5" />Login As
            </button>
          ),
        },
      ]}
    />
  );
}
