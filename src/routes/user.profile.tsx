import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/CrudPage";
import { ProfileForm } from "@/components/ProfileForm";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/user/profile")({
  head: () => pageMeta("My Profile", "View and edit your profile."),
  component: () => <div><PageTitle title="My Profile" subtitle="Keep your contact details up to date." /><ProfileForm /></div>,
});
