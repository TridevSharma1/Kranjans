import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/CrudPage";
import { Certificate, PrintBar } from "@/components/documents";
import { EmptyState, Modal } from "@/components/ui";
import { StatusPill } from "@/components/StatusPill";
import { Icon } from "@/components/Icon";
import { useMember } from "@/hooks/use-member";
import type { Row } from "@/context/StoreContext";
import { fmtDate } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/user/certificates")({
  head: () => pageMeta("My Certificates", "Your certificates from Kranjal Foundation."),
  component: MyCertificates,
});

function MyCertificates() {
  const { certificates, foundation } = useMember();
  const [view, setView] = useState<Row | null>(null);
  return (
    <div>
      <PageTitle title="My Certificates" subtitle="Preview, print or download your certificates." />
      {certificates.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((c) => (
            <div key={c.id} className="card-soft p-6 transition-all hover:-translate-y-1">
              <div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-warm text-accent-foreground"><Icon name="award" /></span><StatusPill value={c.status} /></div>
              <h3 className="mt-4 font-semibold">{c.type}</h3>
              <p className="text-xs text-muted-foreground">{c.number} · {fmtDate(c.issueDate)}</p>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
              <button className="btn btn-primary btn-sm mt-4" onClick={() => setView(c)}><Icon name="eye" className="h-4 w-4" />Preview</button>
            </div>
          ))}
        </div>
      ) : <EmptyState text="No certificates issued to you yet." />}
      <Modal open={!!view} onClose={() => setView(null)} title="Certificate" wide>
        {view && <div className="print-area"><PrintBar /><Certificate c={view} f={foundation} /></div>}
      </Modal>
    </div>
  );
}
