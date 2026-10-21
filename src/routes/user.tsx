import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, type NavItem } from "@/layouts/DashboardShell";

const items: NavItem[] = [
  { to: "/user/dashboard", label: "Dashboard", icon: "grid" },
  { to: "/user/profile", label: "My Profile", icon: "user" },
  { to: "/user/id-card", label: "My ID Card", icon: "id" },
  { to: "/user/certificates", label: "My Certificates", icon: "award" },
  { to: "/user/letter", label: "Appointment Letter", icon: "file" },
  { to: "/user/donations", label: "My Donations", icon: "money" },
];

export const Route = createFileRoute("/user")({
  component: () => <DashboardShell role="user" items={items} loginPath="/login" />,
});
