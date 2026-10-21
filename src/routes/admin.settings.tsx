import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/CrudPage";
import { SectionEditor } from "@/components/SectionEditor";
import { useStore } from "@/context/StoreContext";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/settings")({
  head: () => pageMeta("Foundation Settings", "Edit foundation details and legal information."),
  component: Settings,
});

function Settings() {
  const { state, setSection } = useStore();
  return (
    <div className="space-y-6">
      <PageTitle title="Foundation Settings" subtitle="Contact and legal details used on the website, ID cards, certificates and receipts." />
      <SectionEditor title="Foundation details" value={state.foundation} labels={{ certificate80G: "80G Certificate", certificate12A: "12A Certificate", pan: "PAN" }}
        onSave={(v) => setSection("foundation", { ...state.foundation, ...v })} />
      <SectionEditor title="Social links" value={state.foundation.social} onSave={(v) => setSection("foundation", { ...state.foundation, social: v })} />
    </div>
  );
}
