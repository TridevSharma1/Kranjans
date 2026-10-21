import { useMemo, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import type { Row } from "@/context/StoreContext";

export type Column = { key: string; label: string; render?: (r: Row) => ReactNode; sortable?: boolean };
export type Filter = { key: string; label: string; options: string[] };

export function DataTable({ rows, columns, filters = [], actions, pageSize = 8, toolbar }: {
  rows: Row[]; columns: Column[]; filters?: Filter[]; actions?: (r: Row) => ReactNode; pageSize?: number; toolbar?: ReactNode;
}) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [active, setActive] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const data = useMemo(() => {
    let out = rows.filter((r) => Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(q.toLowerCase())));
    for (const [k, v] of Object.entries(active)) if (v) out = out.filter((r) => String(r[k]) === v);
    if (sort) out = [...out].sort((a, b) => {
      const x = a[sort.key], y = b[sort.key];
      return (typeof x === "number" && typeof y === "number" ? x - y : String(x ?? "").localeCompare(String(y ?? ""))) * sort.dir;
    });
    return out;
  }, [rows, q, active, sort]);

  const pages = Math.max(1, Math.ceil(data.length / pageSize));
  const cur = Math.min(page, pages);
  const slice = data.slice((cur - 1) * pageSize, cur * pageSize);

  return (
    <div className="card-soft overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b p-4">
        <div className="relative min-w-[200px] flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Icon name="search" className="h-4 w-4" /></span>
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search..." className="input-field pl-9" />
        </div>
        {filters.map((f) => (
          <select key={f.key} value={active[f.key] ?? ""} onChange={(e) => { setActive({ ...active, [f.key]: e.target.value }); setPage(1); }} className="input-field w-auto">
            <option value="">All {f.label}</option>
            {f.options.map((o) => <option key={o}>{o}</option>)}
          </select>
        ))}
        {toolbar}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="whitespace-nowrap px-4 py-3">
                  {c.sortable !== false ? (
                    <button className="inline-flex items-center gap-1 font-bold hover:text-primary" onClick={() => setSort(sort?.key === c.key ? { key: c.key, dir: sort.dir === 1 ? -1 : 1 } : { key: c.key, dir: 1 })}>
                      {c.label}<Icon name="sort" className="h-3 w-3" />
                    </button>
                  ) : c.label}
                </th>
              ))}
              {actions && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {slice.map((r) => (
              <tr key={r.id} className="border-t transition-colors hover:bg-mint/40">
                {columns.map((c) => <td key={c.key} className="whitespace-nowrap px-4 py-3">{c.render ? c.render(r) : String(r[c.key] ?? "")}</td>)}
                {actions && <td className="whitespace-nowrap px-4 py-3 text-right">{actions(r)}</td>}
              </tr>
            ))}
            {!slice.length && <tr><td colSpan={columns.length + 1} className="px-4 py-12 text-center text-muted-foreground">No records found</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
        <span>{data.length} records · page {cur} of {pages}</span>
        <div className="flex gap-2">
          <button className="btn btn-ghost btn-sm" disabled={cur <= 1} onClick={() => setPage(cur - 1)}>Prev</button>
          <button className="btn btn-ghost btn-sm" disabled={cur >= pages} onClick={() => setPage(cur + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export function RowActions({ onView, onEdit, onDelete }: { onView?: () => void; onEdit?: () => void; onDelete?: () => void }) {
  return (
    <div className="inline-flex gap-1">
      {onView && <button onClick={onView} className="rounded-lg p-2 text-primary hover:bg-mint" aria-label="View"><Icon name="eye" className="h-4 w-4" /></button>}
      {onEdit && <button onClick={onEdit} className="rounded-lg p-2 text-primary hover:bg-mint" aria-label="Edit"><Icon name="edit" className="h-4 w-4" /></button>}
      {onDelete && <button onClick={() => confirm("Delete this record?") && onDelete()} className="rounded-lg p-2 text-destructive hover:bg-destructive/10" aria-label="Delete"><Icon name="trash" className="h-4 w-4" /></button>}
    </div>
  );
}
