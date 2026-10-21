import { useState } from "react";
import { Avatar, Field } from "./ui";
import { StatusPill } from "./StatusPill";
import { useStore, type Row } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { fmtDate } from "@/utils/verify";

/** Edits the signed-in account (and its linked employee record, if any). */
export function ProfileForm() {
  const { user } = useAuth();
  const { state, update } = useStore();
  const account = state.users.find((u) => u.id === user?.id);
  const emp: Row | undefined = state.employees.find((e) => e.id === account?.employeeId);
  const [form, setForm] = useState({ name: account?.name ?? "", phone: emp?.phone ?? "", address: emp?.address ?? "", photo: emp?.photo ?? "", password: "" });
  const [saved, setSaved] = useState(false);
  if (!account) return null;

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    update("users", account.id, { name: form.name, ...(form.password ? { password: form.password } : {}) });
    if (emp) update("employees", emp.id, { name: form.name, phone: form.phone, address: form.address, photo: form.photo });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card-soft flex flex-col items-center p-6 text-center">
        <Avatar name={form.name} photo={form.photo} size="h-24 w-24" />
        <h2 className="mt-3 text-xl font-semibold">{form.name}</h2>
        <p className="text-sm text-muted-foreground">{account.email}</p>
        {emp ? (
          <dl className="mt-6 grid w-full gap-3 text-left text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Employee ID</dt><dd className="font-bold">{emp.id}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Department</dt><dd className="font-bold">{emp.department}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Designation</dt><dd className="font-bold">{emp.designation}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Joined</dt><dd className="font-bold">{fmtDate(emp.joiningDate)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd><StatusPill value={emp.status} /></dd></div>
          </dl>
        ) : <p className="mt-4 text-xs capitalize text-muted-foreground">{account.role} account</p>}
      </div>
      <form onSubmit={save} className="card-soft grid gap-4 p-6 sm:grid-cols-2 lg:col-span-2">
        <Field label="Full Name"><input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="Email"><input className="input-field" value={account.email} disabled /></Field>
        {emp && <Field label="Phone"><input className="input-field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>}
        {emp && <Field label="Photo URL"><input className="input-field" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })} /></Field>}
        {emp && <div className="sm:col-span-2"><Field label="Address"><textarea rows={2} className="input-field" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></Field></div>}
        <Field label="New Password"><input type="password" className="input-field" placeholder="Leave blank to keep" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Field>
        <div className="flex items-end justify-end gap-3 sm:col-span-2">
          {saved && <span className="text-sm font-semibold text-primary">Profile updated</span>}
          <button className="btn btn-primary">Save profile</button>
        </div>
      </form>
    </div>
  );
}
