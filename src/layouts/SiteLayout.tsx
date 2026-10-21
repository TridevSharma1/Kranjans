import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/documents";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";

const nav = [
  { to: "/", label: "Home" }, { to: "/about", label: "About" }, { to: "/programs", label: "Programs" },
  { to: "/impact", label: "Impact" }, { to: "/events", label: "Events" }, { to: "/gallery", label: "Gallery" },
  { to: "/volunteer", label: "Volunteer" }, { to: "/contact", label: "Contact" },
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/"><Logo /></Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary" activeProps={{ className: "text-primary bg-mint" }}>{n.label}</Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <Link to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"} className="btn btn-ghost btn-sm">My Dashboard</Link>
          ) : (
            <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
          )}
          <Link to="/donate" className="btn btn-accent btn-sm"><Icon name="heart" className="h-4 w-4" />Donate</Link>
        </div>
        <button className="rounded-lg p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu"><Icon name={open ? "x" : "menu"} /></button>
      </div>
      {open && (
        <div className="border-t bg-background px-4 pb-4 lg:hidden">
          {nav.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-semibold hover:bg-mint">{n.label}</Link>)}
          <div className="mt-2 flex gap-2">
            <Link to={user ? (user.role === "admin" ? "/admin/dashboard" : "/user/dashboard") : "/login"} className="btn btn-ghost btn-sm flex-1">{user ? "Dashboard" : "Login"}</Link>
            <Link to="/donate" className="btn btn-accent btn-sm flex-1">Donate</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const f = useStore().state.foundation;
  const socials = ["facebook", "instagram", "twitter", "linkedin", "youtube"];
  return (
    <footer className="mt-24 bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm opacity-75">{f.tagline}. A registered non-profit working across Maharashtra since {f.founded}.</p>
          <div className="mt-5 flex gap-2">
            {socials.map((s) => <a key={s} href="#" aria-label={s} className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent transition-colors hover:bg-accent hover:text-accent-foreground"><Icon name={s} className="h-4 w-4" /></a>)}
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-accent">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {[["/about", "About Us"], ["/impact", "Our Impact"], ["/events", "Events"], ["/volunteer", "Volunteer"], ["/donate", "Donate"], ["/verify-id", "Verify ID Card"], ["/verify-certificate", "Verify Certificate"]].map(([to, l]) => <li key={to}><Link to={to} className="hover:text-accent">{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-accent">Programs</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {["Education", "Health", "Food", "Women Empowerment", "Skill Development", "Environment"].map((p) => <li key={p}><Link to="/programs" className="hover:text-accent">{p}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-sans text-sm font-bold uppercase tracking-widest text-accent">Contact</h4>
          <ul className="space-y-3 text-sm opacity-85">
            <li className="flex gap-2"><Icon name="pin" className="h-4 w-4 shrink-0" />{f.address}</li>
            <li className="flex gap-2"><Icon name="phone" className="h-4 w-4 shrink-0" />{f.phone}</li>
            <li className="flex gap-2"><Icon name="mail" className="h-4 w-4 shrink-0" />{f.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sidebar-accent">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs opacity-70">
          <p>© {new Date().getFullYear()} {f.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-accent">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent">Terms</Link>
            <Link to="/admin/login" className="hover:text-accent">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
