import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell, type NavItem } from "@/layouts/DashboardShell";

const items: NavItem[] = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "grid" },
  { to: "/admin/employees", label: "Employees", icon: "users", group: "HR Management" },
  { to: "/admin/departments", label: "Departments", icon: "layers", group: "HR Management" },
  { to: "/admin/designations", label: "Designations", icon: "briefcase", group: "HR Management" },
  { to: "/admin/id-cards", label: "ID Cards", icon: "id", group: "HR Management" },
  { to: "/admin/certificates", label: "Certificates", icon: "award", group: "HR Management" },
  { to: "/admin/letters", label: "Appointment Letters", icon: "file", group: "HR Management" },
  { to: "/admin/donations", label: "Donations", icon: "money", group: "Foundation" },
  { to: "/admin/campaigns", label: "Campaigns", icon: "target", group: "Foundation" },
  { to: "/admin/events", label: "Events", icon: "calendar", group: "Foundation" },
  { to: "/admin/programs", label: "Programs", icon: "book", group: "Foundation" },
  { to: "/admin/gallery", label: "Gallery", icon: "image", group: "Foundation" },
  { to: "/admin/volunteers", label: "Volunteers", icon: "hand", group: "Foundation" },
  { to: "/admin/messages", label: "Messages", icon: "mail", group: "Foundation" },
  { to: "/admin/users", label: "Users", icon: "user", group: "System" },
  { to: "/admin/content", label: "Content", icon: "edit", group: "System" },
  { to: "/admin/settings", label: "Foundation Settings", icon: "settings", group: "System" },
  { to: "/admin/profile", label: "Profile", icon: "user", group: "System" },
];

export const Route = createFileRoute("/admin")({
  component: () => <DashboardShell role="admin" items={items} loginPath="/admin/login" />,
});
