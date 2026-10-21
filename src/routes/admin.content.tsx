import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/CrudPage";
import { SectionEditor } from "@/components/SectionEditor";
import { Field } from "@/components/ui";
import { useStore } from "@/context/StoreContext";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/content")({
  head: () => pageMeta("Content Management", "Edit website text and statistics."),
  component: Content,
});

function Content() {
  const { state, setSection, reset } = useStore();
  const [stats, setStats] = useState(state.stats);
  return (
    <div className="space-y-6">
      <PageTitle title="Content Management" subtitle="Changes appear on the public website immediately. Programs, events and gallery are edited from their own pages."
        action={<button className="btn btn-ghost" onClick={() => confirm("Reset all demo data to defaults?") && reset()}>Reset demo data</button>} />
      <SectionEditor title="Homepage & About" value={state.content} onSave={(v) => setSection("content", { ...state.content, ...v })} />
      <form className="card-soft p-6" onSubmit={(e) => { e.preventDefault(); setSection("stats", stats); }}>
        <h2 className="text-lg font-semibold">Impact statistics</h2>
        <div className="mt-4 space-y-3">
          {stats.map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_120px_80px] gap-3">
              <Field label="Label"><input className="input-field" value={s.label} onChange={(e) => setStats(stats.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} /></Field>
              <Field label="Value"><input type="number" className="input-field" value={s.value} onChange={(e) => setStats(stats.map((x, j) => j === i ? { ...x, value: Number(e.target.value) } : x))} /></Field>
              <Field label="Suffix"><input className="input-field" value={s.suffix} onChange={(e) => setStats(stats.map((x, j) => j === i ? { ...x, suffix: e.target.value } : x))} /></Field>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end"><button className="btn btn-primary">Save statistics</button></div>
      </form>
    </div>
  );
}
