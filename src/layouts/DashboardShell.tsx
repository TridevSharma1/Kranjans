import { useEffect, useState, type ReactNode } from "react";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/documents";
import { Avatar } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";

export type NavItem = { to: string; label: string; icon: string; group?: string };

export function DashboardShell({ role, items, loginPath }: { role: "admin" | "user"; items: NavItem[]; loginPath: string }) {
  const { user, ready, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const allowed = ready && user?.role === role;

  useEffect(() => { if (ready && !allowed) navigate({ to: loginPath }); }, [ready, allowed, navigate, loginPath]);
  if (!allowed) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Checking access…</div>;

  let lastGroup: string | undefined;
  const sidebar: ReactNode = (
    <aside className={`no-print fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto bg-sidebar p-4 text-sidebar-foreground transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="mb-6 px-2 pt-2"><Link to="/"><Logo light /></Link></div>
      <nav className="space-y-1">
        {items.map((it) => {
          const header = it.group && it.group !== lastGroup ? it.group : null;
          lastGroup = it.group;
          return (
            <div key={it.to}>
              {header && <p className="mb-1 mt-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">{header}</p>}
              <Link to={it.to} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold opacity-80 transition-all hover:bg-sidebar-accent hover:opacity-100" activeProps={{ className: "bg-sidebar-accent !opacity-100 text-accent" }}>
                <Icon name={it.icon} className="h-4 w-4" />{it.label}
              </Link>
            </div>
          );
        })}
        <button onClick={() => { logout(); navigate({ to: loginPath }); }} className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold opacity-80 hover:bg-destructive/30">
          <Icon name="logout" className="h-4 w-4" />Logout
        </button>
      </nav>
    </aside>
  );

  return (
    <div className="min-h-screen bg-background">
      {sidebar}
      {open && <div className="fixed inset-0 z-30 bg-foreground/40 lg:hidden" onClick={() => setOpen(false)} />}
      <div className="lg:pl-64">
        <header className="no-print sticky top-0 z-20 flex items-center justify-between border-b bg-background/85 px-4 py-3 backdrop-blur md:px-8">
          <button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Menu"><Icon name="menu" /></button>
          <p className="hidden text-sm text-muted-foreground lg:block">{role === "admin" ? "Administration Panel" : "Member Portal"}</p>
          <div className="flex items-center gap-3">
            <div className="text-right"><p className="text-sm font-bold">{user.name}</p><p className="text-xs capitalize text-muted-foreground">{user.role}</p></div>
            <Avatar name={user.name} size="h-9 w-9" />
          </div>
        </header>
        <main className="p-4 md:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
