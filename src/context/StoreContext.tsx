import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import * as seed from "@/data/seed";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Row = Record<string, any> & { id: string };

const initial = {
  employees: seed.employees as Row[],
  users: seed.users as Row[],
  programs: seed.programs as Row[],
  events: seed.events as Row[],
  gallery: seed.gallery as Row[],
  certificates: seed.certificates as Row[],
  letters: seed.letters as Row[],
  campaigns: seed.campaigns as Row[],
  donations: seed.donations as Row[],
  volunteers: seed.volunteers as Row[],
  testimonials: seed.testimonials as Row[],
  departments: seed.departments as Row[],
  designations: seed.designations as Row[],
  eventRegistrations: [] as Row[],
  messages: [] as Row[],
  activities: seed.activities as Row[],
  foundation: seed.foundation as Record<string, any>,
  content: seed.content as Record<string, any>,
  stats: seed.stats as { label: string; value: number; suffix: string }[],
};
export type StoreState = typeof initial;
export type CollectionName = { [K in keyof StoreState]: StoreState[K] extends Row[] ? K : never }[keyof StoreState];

const KEY = "kf_store_v1";

type Ctx = {
  state: StoreState;
  add: (c: CollectionName, item: Omit<Row, "id"> & { id?: string }) => Row;
  update: (c: CollectionName, id: string, patch: Partial<Row>) => void;
  remove: (c: CollectionName, id: string) => void;
  setSection: <K extends "foundation" | "content" | "stats">(k: K, v: StoreState[K]) => void;
  reset: () => void;
};
const StoreCtx = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(initial);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(state)); }, [state, loaded]);

  const log = (s: StoreState, text: string): Row[] =>
    [{ id: crypto.randomUUID(), text, time: "Just now" }, ...s.activities].slice(0, 12);

  const add = useCallback<Ctx["add"]>((c, item) => {
    const row = { ...item, id: item.id || crypto.randomUUID().slice(0, 8) } as Row;
    setState((s) => ({ ...s, [c]: [row, ...(s[c] as Row[])], activities: c === "activities" ? s.activities : log(s, `New ${String(c).replace(/s$/, "")} added: ${row.name || row.title || row.number || row.donor || row.id}`) }));
    return row;
  }, []);
  const update = useCallback<Ctx["update"]>((c, id, patch) => {
    setState((s) => ({ ...s, [c]: (s[c] as Row[]).map((r) => (r.id === id ? { ...r, ...patch } : r)) }));
  }, []);
  const remove = useCallback<Ctx["remove"]>((c, id) => {
    setState((s) => ({ ...s, [c]: (s[c] as Row[]).filter((r) => r.id !== id) }));
  }, []);
  const setSection = useCallback<Ctx["setSection"]>((k, v) => setState((s) => ({ ...s, [k]: v })), []);
  const reset = useCallback(() => setState(initial), []);

  return <StoreCtx.Provider value={{ state, add, update, remove, setSection, reset }}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore outside provider");
  return ctx;
}
export function useCollection(c: CollectionName) {
  const { state, add, update, remove } = useStore();
  return {
    items: state[c] as Row[],
    add: (i: Omit<Row, "id"> & { id?: string }) => add(c, i),
    update: (id: string, p: Partial<Row>) => update(c, id, p),
    remove: (id: string) => remove(c, id),
  };
}
