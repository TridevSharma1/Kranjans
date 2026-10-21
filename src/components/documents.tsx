import type { Row } from "@/context/StoreContext";
import { Avatar, QrPlaceholder } from "./ui";
import { Icon } from "./Icon";
import { fmtDate, inr } from "@/utils/verify";

type F = Record<string, string>;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-warm text-accent-foreground"><Icon name="heart" className="h-5 w-5" /></span>
      <span className={`font-display text-lg font-semibold leading-none ${light ? "text-primary-foreground" : "text-foreground"}`}>Kranjal<span className="block text-[10px] font-sans font-bold uppercase tracking-[0.3em] opacity-70">Foundation</span></span>
    </span>
  );
}

export function IdCard({ e, f }: { e: Row; f: F }) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      <div className="w-[300px] overflow-hidden rounded-2xl border bg-card shadow-lg">
        <div className="bg-gradient-primary px-5 pb-12 pt-5 text-primary-foreground"><Logo light /><p className="mt-2 text-xs opacity-80">Employee Identity Card</p></div>
        <div className="-mt-10 flex flex-col items-center px-5 pb-5 text-center">
          <div className="rounded-full border-4 border-card"><Avatar name={e.name} photo={e.photo} size="h-20 w-20" /></div>
          <h3 className="mt-2 text-xl font-semibold">{e.name}</h3>
          <p className="text-sm font-semibold text-primary">{e.designation}</p>
          <p className="text-xs text-muted-foreground">{e.department}</p>
          <div className="mt-4 grid w-full grid-cols-2 gap-2 text-left text-xs">
            <div><p className="text-muted-foreground">Card No.</p><p className="font-bold">{e.id}</p></div>
            <div><p className="text-muted-foreground">Joined</p><p className="font-bold">{fmtDate(e.joiningDate)}</p></div>
            <div><p className="text-muted-foreground">Blood Group</p><p className="font-bold">{e.bloodGroup || "—"}</p></div>
            <div><p className="text-muted-foreground">Status</p><p className={`font-bold ${e.cardStatus === "Revoked" ? "text-destructive" : "text-success"}`}>{e.cardStatus}</p></div>
          </div>
        </div>
        <div className="h-2 bg-gradient-warm" />
      </div>
      <div className="flex w-[300px] flex-col overflow-hidden rounded-2xl border bg-card shadow-lg">
        <div className="flex flex-1 flex-col items-center p-6 text-center">
          <QrPlaceholder value={`QR-${e.id}`} size={120} />
          <p className="mt-2 text-xs font-bold">QR-{e.id}</p>
          <p className="mt-1 text-xs text-muted-foreground">Valid till {fmtDate(e.cardExpiry)}</p>
          <p className="mt-4 text-xs text-muted-foreground">This card is the property of {f.name}. If found, please return to:</p>
          <p className="mt-2 text-xs font-semibold">{f.address}</p>
          <p className="text-xs">{f.phone} · {f.email}</p>
          <p className="mt-3 text-[10px] text-muted-foreground">Verify at /verify-id</p>
          <div className="mt-auto pt-6"><div className="mx-auto w-28 border-t pt-1 text-[10px] text-muted-foreground">Authorised Signatory</div></div>
        </div>
        <div className="h-2 bg-gradient-primary" />
      </div>
    </div>
  );
}

export function Certificate({ c, f }: { c: Row; f: F }) {
  return (
    <div className="mx-auto aspect-[1.414] w-full max-w-3xl rounded-xl bg-gradient-warm p-2">
      <div className="flex h-full flex-col items-center justify-between rounded-lg border-4 border-double border-primary bg-card p-6 text-center md:p-10">
        <Logo />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-primary">Certificate</p>
          <h2 className="mt-1 text-2xl font-semibold md:text-4xl">{c.type?.replace(" Certificate", "") || "Custom"}</h2>
          <p className="mt-4 text-sm text-muted-foreground">This is proudly presented to</p>
          <p className="mt-1 font-display text-3xl italic text-primary-deep md:text-5xl">{c.recipient}</p>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">{c.description}</p>
        </div>
        <div className="flex w-full items-end justify-between text-xs">
          <div className="text-left"><p className="text-muted-foreground">Certificate No.</p><p className="font-bold">{c.number}</p><p className="mt-1 text-muted-foreground">Issued {fmtDate(c.issueDate)}</p></div>
          <QrPlaceholder value={c.number} size={64} />
          <div className="text-right"><div className="w-32 border-t pt-1">Chairperson</div><p className="text-muted-foreground">{f.name}</p></div>
        </div>
      </div>
    </div>
  );
}

export function AppointmentLetter({ l, f }: { l: Row; f: F }) {
  return (
    <div className="mx-auto max-w-3xl rounded-xl border bg-card p-8 text-sm leading-relaxed shadow-sm md:p-12">
      <div className="flex items-start justify-between border-b-2 border-primary pb-4">
        <Logo />
        <div className="text-right text-xs text-muted-foreground"><p>{f.address}</p><p>{f.phone}</p><p>{f.email}</p></div>
      </div>
      <div className="mt-6 flex justify-between text-xs"><p><b>Ref:</b> {l.reference}</p><p><b>Date:</b> {fmtDate(l.issueDate)}</p></div>
      <p className="mt-6">To,<br /><b>{l.name}</b><br />Employee ID: {l.employeeId}</p>
      <h3 className="mt-6 text-center text-lg font-semibold underline">Letter of Appointment</h3>
      <p className="mt-4">Dear {l.name?.split(" ")[0]},</p>
      <p className="mt-3">We are pleased to appoint you as <b>{l.designation}</b> in the <b>{l.department}</b> department of {f.name}, effective <b>{fmtDate(l.joiningDate)}</b>.</p>
      <p className="mt-3">Your monthly gross remuneration will be <b>{inr(l.salary)}</b>. You will be on probation for six months, after which your services will be confirmed subject to satisfactory performance.</p>
      <p className="mt-3">You are expected to uphold the values of the foundation — compassion, integrity and accountability — and abide by its policies as amended from time to time.</p>
      <p className="mt-3">We welcome you to the Kranjal family and look forward to a meaningful association.</p>
      <div className="mt-12 flex justify-between">
        <div><div className="w-40 border-t pt-1">Authorised Signatory</div><p className="text-xs text-muted-foreground">HR Department, {f.name}</p></div>
        <div className="text-right"><div className="w-40 border-t pt-1">Employee Acceptance</div></div>
      </div>
    </div>
  );
}

export function Receipt({ d, f }: { d: Row; f: F }) {
  return (
    <div className="mx-auto max-w-lg rounded-xl border bg-card p-8 shadow-sm">
      <div className="flex items-center justify-between border-b pb-4"><Logo /><span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-primary-deep">Donation Receipt</span></div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div><p className="text-muted-foreground">Receipt No.</p><p className="font-bold">{d.receipt}</p></div>
        <div><p className="text-muted-foreground">Date</p><p className="font-bold">{fmtDate(d.date)}</p></div>
        <div><p className="text-muted-foreground">Donor</p><p className="font-bold">{d.donor}</p></div>
        <div><p className="text-muted-foreground">Payment</p><p className="font-bold">{d.method}</p></div>
        <div className="col-span-2"><p className="text-muted-foreground">Campaign</p><p className="font-bold">{d.campaign}</p></div>
      </div>
      <div className="mt-5 rounded-xl bg-gradient-primary p-5 text-center text-primary-foreground"><p className="text-xs opacity-80">Amount Received</p><p className="text-3xl font-bold">{inr(d.amount)}</p></div>
      <p className="mt-4 text-xs text-muted-foreground">Donations are eligible for tax exemption under Section 80G ({f.certificate80G}). PAN: {f.pan}. Thank you for your generosity.</p>
    </div>
  );
}

export function PrintBar() {
  return (
    <div className="no-print mb-4 flex justify-end gap-2">
      <button className="btn btn-ghost btn-sm" onClick={() => window.print()}><Icon name="download" className="h-4 w-4" />Download PDF</button>
      <button className="btn btn-primary btn-sm" onClick={() => window.print()}><Icon name="print" className="h-4 w-4" />Print</button>
    </div>
  );
}
