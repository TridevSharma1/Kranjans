import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@/context/StoreContext";
import { StatCard } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { PageTitle } from "@/components/CrudPage";
import { inr } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => pageMeta("Admin Dashboard", "Overview of employees, donations, volunteers and events."),
  component: Dashboard,
});

const quick = [
  { to: "/admin/employees", label: "Add Employee", icon: "users" },
  { to: "/admin/certificates", label: "Issue Certificate", icon: "award" },
  { to: "/admin/id-cards", label: "Print ID Card", icon: "id" },
  { to: "/admin/events", label: "Create Event", icon: "calendar" },
] as const;

function Dashboard() {
  const { state } = useStore();
  const ok = state.donations.filter((d) => d.status === "Success");
  const total = ok.reduce((s, d) => s + Number(d.amount), 0);
  const maxRaised = Math.max(...state.campaigns.map((c) => Number(c.goal)), 1);
  const depts = state.departments.map((d) => ({ name: d.name, count: state.employees.filter((e) => e.department === d.name).length }));
  const maxDept = Math.max(...depts.map((d) => d.count), 1);

  return (
    <div className="space-y-8">
      <PageTitle title="Dashboard" subtitle="Welcome back — here's what's happening at the foundation." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="users" label="Employees" value={state.employees.length} />
        <StatCard icon="money" label="Donations Received" value={inr(total)} tone="bg-gradient-warm" />
        <StatCard icon="hand" label="Volunteers" value={state.volunteers.length} />
        <StatCard icon="calendar" label="Upcoming Events" value={state.events.filter((e) => e.status === "Upcoming").length} tone="bg-gradient-warm" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card-soft p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Campaign progress</h2>
          <div className="mt-6 space-y-5">
            {state.campaigns.map((c) => (
              <div key={c.id}>
                <div className="mb-1 flex justify-between text-sm"><span className="font-semibold">{c.title}</span><span className="text-muted-foreground">{inr(c.raised)} / {inr(c.goal)}</span></div>
                <div className="h-3 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-gradient-primary transition-all duration-700" style={{ width: `${Math.min(100, (c.raised / c.goal) * 100)}%` }} /></div>
              </div>
            ))}
          </div>
          <h2 className="mt-10 text-lg font-semibold">Team by department</h2>
          <div className="mt-6 flex h-44 items-end gap-4">
            {depts.map((d) => (
              <div key={d.name} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-bold">{d.count}</span>
                <div className="w-full rounded-t-xl bg-gradient-warm transition-all duration-700" style={{ height: `${(d.count / maxDept) * 120 + 4}px` }} />
                <span className="truncate text-xs text-muted-foreground">{d.name}</span>
              </div>
            ))}
          </div>
          <span className="hidden">{maxRaised}</span>
        </div>
        <div className="space-y-6">
          <div className="card-soft p-6">
            <h2 className="text-lg font-semibold">Quick actions</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {quick.map((q) => (
                <Link key={q.label} to={q.to} className="flex flex-col items-center gap-2 rounded-2xl bg-mint p-4 text-center text-xs font-bold text-primary transition-all hover:-translate-y-1 hover:shadow-md">
                  <Icon name={q.icon} />{q.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="card-soft p-6">
            <h2 className="text-lg font-semibold">Recent activity</h2>
            <ul className="mt-4 space-y-4">
              {state.activities.slice(0, 6).map((a) => (
                <li key={a.id} className="flex gap-3 text-sm"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" /><div><p>{a.text}</p><p className="text-xs text-muted-foreground">{a.time}</p></div></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
