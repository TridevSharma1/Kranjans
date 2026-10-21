import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/CrudPage";
import { ProfileForm } from "@/components/ProfileForm";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/profile")({
  head: () => pageMeta("Admin Profile", "Your administrator profile."),
  component: () => <div><PageTitle title="Profile" subtitle="Your administrator account." /><ProfileForm /></div>,
});
