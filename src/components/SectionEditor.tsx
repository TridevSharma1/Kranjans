import { useState } from "react";
import { Field } from "./ui";

export function SectionEditor({ title, value, onSave, labels = {} }: { title: string; value: Record<string, unknown>; onSave: (v: Record<string, string>) => void; labels?: Record<string, string> }) {
  const editable = Object.entries(value).filter(([, v]) => typeof v === "string" || typeof v === "number");
  const [form, setForm] = useState<Record<string, string>>(Object.fromEntries(editable.map(([k, v]) => [k, String(v)])));
  const [saved, setSaved] = useState(false);
  const pretty = (k: string) => labels[k] || k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
  return (
    <form className="card-soft p-6" onSubmit={(e) => { e.preventDefault(); onSave(form); setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {Object.keys(form).map((k) => (
          <div key={k} className={form[k].length > 60 ? "md:col-span-2" : ""}>
            <Field label={pretty(k)}>
              {form[k].length > 60
                ? <textarea rows={3} className="input-field" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
                : <input className="input-field" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />}
            </Field>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-end gap-3">
        {saved && <span className="text-sm font-semibold text-primary">Saved — live on the website</span>}
        <button className="btn btn-primary">Save changes</button>
      </div>
    </form>
  );
}
