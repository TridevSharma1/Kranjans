import { useState, type ReactNode } from "react";
import { DataTable, RowActions, type Column, type Filter } from "./DataTable";
import { Field, Modal } from "./ui";
import { Icon } from "./Icon";
import { useCollection, type CollectionName, type Row } from "@/context/StoreContext";

export type FormField = { name: string; label: string; type?: "text" | "number" | "email" | "date" | "select" | "textarea"; options?: string[]; required?: boolean };

export function RecordForm({ fields, initial, onSubmit, submitLabel = "Save" }: { fields: FormField[]; initial: Record<string, unknown>; onSubmit: (v: Record<string, unknown>) => void; submitLabel?: string }) {
  const [v, setV] = useState<Record<string, unknown>>(initial);
  const [err, setErr] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    fields.forEach((f) => { if (f.required && !String(v[f.name] ?? "").trim()) er[f.name] = `${f.label} is required`; });
    setErr(er);
    if (Object.keys(er).length) return;
    onSubmit(Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fields.find((f) => f.name === k)?.type === "number" ? Number(x) : x])));
  };
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
          <Field label={f.label + (f.required ? " *" : "")} error={err[f.name]}>
            {f.type === "select" ? (
              <select className="input-field" value={String(v[f.name] ?? "")} onChange={(e) => setV({ ...v, [f.name]: e.target.value })}>
                <option value="">Select…</option>
                {f.options?.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : f.type === "textarea" ? (
              <textarea rows={3} className="input-field" value={String(v[f.name] ?? "")} onChange={(e) => setV({ ...v, [f.name]: e.target.value })} />
            ) : (
              <input type={f.type ?? "text"} className="input-field" value={String(v[f.name] ?? "")} onChange={(e) => setV({ ...v, [f.name]: e.target.value })} />
            )}
          </Field>
        </div>
      ))}
      <div className="sm:col-span-2 flex justify-end"><button className="btn btn-primary">{submitLabel}</button></div>
    </form>
  );
}

export function CrudPage({ title, subtitle, collection, fields, columns, filters, defaults = {}, makeId, extraActions, toolbar, onView }: {
  title: string; subtitle?: string; collection: CollectionName; fields: FormField[]; columns: Column[]; filters?: Filter[];
  defaults?: Record<string, unknown>; makeId?: (items: Row[]) => string; extraActions?: (r: Row) => ReactNode; toolbar?: ReactNode; onView?: (r: Row) => void;
}) {
  const { items, add, update, remove } = useCollection(collection);
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  return (
    <div>
      <PageTitle title={title} subtitle={subtitle} action={<button className="btn btn-primary" onClick={() => setCreating(true)}><Icon name="plus" className="h-4 w-4" />Add New</button>} />
      <DataTable rows={items} columns={columns} filters={filters} toolbar={toolbar}
        actions={(r) => <div className="inline-flex items-center gap-1">{extraActions?.(r)}<RowActions onView={onView ? () => onView(r) : undefined} onEdit={() => setEditing(r)} onDelete={() => remove(r.id)} /></div>} />
      <Modal open={creating} onClose={() => setCreating(false)} title={`Add ${title.replace(/s$/, "")}`}>
        <RecordForm fields={fields} initial={defaults} onSubmit={(v) => { add({ ...v, id: makeId?.(items) }); setCreating(false); }} />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title={`Edit ${title.replace(/s$/, "")}`}>
        {editing && <RecordForm key={editing.id} fields={fields} initial={editing} onSubmit={(v) => { update(editing.id, v); setEditing(null); }} />}
      </Modal>
    </div>
  );
}

export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
