import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle } from "@/components/CrudPage";
import { StatCard } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useMember } from "@/hooks/use-member";
import { inr, fmtDate } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/user/dashboard")({
  head: () => pageMeta("My Dashboard", "Your Kranjal Foundation member dashboard."),
  component: UserDashboard,
});

const links = [
  { to: "/user/id-card", label: "My ID Card", icon: "id" },
  { to: "/user/certificates", label: "My Certificates", icon: "award" },
  { to: "/user/letter", label: "Appointment Letter", icon: "file" },
  { to: "/user/donations", label: "My Donations", icon: "money" },
] as const;

function UserDashboard() {
  const m = useMember();
  const given = m.donations.filter((d) => d.status === "Success").reduce((s, d) => s + Number(d.amount), 0);
  return (
    <div className="space-y-8">
      <PageTitle title={`Namaste, ${m.account?.name.split(" ")[0] ?? ""}`} subtitle="Thank you for being part of the Kranjal family." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="award" label="Certificates" value={m.certificates.length} />
        <StatCard icon="money" label="Total Donated" value={inr(given)} tone="bg-gradient-warm" />
        <StatCard icon="file" label="Letters" value={m.letters.length} />
        <StatCard icon="id" label="ID Card" value={m.employee ? m.employee.cardStatus : "—"} tone="bg-gradient-warm" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-soft p-6">
          <h2 className="text-lg font-semibold">Quick links</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="flex items-center gap-3 rounded-2xl bg-mint p-4 text-sm font-bold text-primary transition-all hover:-translate-y-1 hover:shadow-md"><Icon name={l.icon} />{l.label}</Link>
            ))}
          </div>
        </div>
        <div className="card-soft p-6">
          <h2 className="text-lg font-semibold">Recent donations</h2>
          {m.donations.length ? (
            <ul className="mt-4 divide-y">
              {m.donations.slice(0, 4).map((d) => <li key={d.id} className="flex justify-between py-3 text-sm"><span>{d.campaign}<span className="block text-xs text-muted-foreground">{fmtDate(d.date)}</span></span><span className="font-bold">{inr(d.amount)}</span></li>)}
            </ul>
          ) : <p className="mt-4 text-sm text-muted-foreground">No donations yet. <Link to="/donate" className="font-bold text-primary underline">Make your first gift</Link></p>}
        </div>
      </div>
    </div>
  );
}
