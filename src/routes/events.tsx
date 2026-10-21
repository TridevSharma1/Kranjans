import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { PageHero, Badge, EmptyState, Modal, Field } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore } from "@/context/StoreContext";
import { img } from "@/utils/images";
import { fmtDate } from "@/utils/verify";
import women from "@/assets/women.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Kranjal Foundation" },
      { name: "description", content: "Health camps, volunteer orientations, exhibitions and drives — upcoming and past events by Kranjal Foundation." },
      { property: "og:title", content: "Events — Kranjal Foundation" },
      { property: "og:description", content: "Join us on the ground at our upcoming events." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Events,
});

function Events() {
  const { state, add } = useStore();
  const [registering, setRegistering] = useState<(typeof state.events)[number] | null>(null);
  const [done, setDone] = useState(false);
  const upcoming = state.events.filter((e) => e.status === "Upcoming");
  const past = state.events.filter((e) => e.status !== "Upcoming");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    if (!registering) return;
    add("eventRegistrations", {
      eventId: registering.id,
      eventTitle: registering.title,
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      status: "Confirmed",
      date: new Date().toISOString().slice(0, 10),
    });
    setRegistering(null);
    setDone(true);
  };

  return (
    <SiteLayout>
      <PageHero title="Events" text="Health camps, orientations, exhibitions and drives — come be part of the change." image={women} />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 text-3xl font-semibold">Upcoming</h2>
        {upcoming.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {upcoming.map((e) => (
              <div key={e.id} className="card-soft card-hover flex flex-col overflow-hidden">
                <div className="relative">
                  <img src={img(e.image)} alt={e.title} className="h-44 w-full object-cover" />
                  <span className="absolute left-4 top-4"><Badge>{e.category}</Badge></span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold">{e.title}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Icon name="calendar" className="h-4 w-4" />{fmtDate(e.date)}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Icon name="pin" className="h-4 w-4" />{e.location}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{e.description}</p>
                  <button className="btn btn-primary btn-sm mt-auto self-start pt-0" onClick={() => { setDone(false); setRegistering(e); }} style={{ marginTop: "1.5rem" }}>Register</button>
                </div>
              </div>
            ))}
          </div>
        ) : <EmptyState text="No upcoming events right now — check back soon." />}
      </section>

      {past.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <h2 className="mb-8 text-3xl font-semibold">Past Events</h2>
          <div className="grid gap-4">
            {past.map((e) => (
              <div key={e.id} className="card-soft flex flex-wrap items-center gap-4 p-5">
                <img src={img(e.image)} alt="" className="h-16 w-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{fmtDate(e.date)} · {e.location}</p>
                </div>
                <Badge>{e.status}</Badge>
              </div>
            ))}
          </div>
        </section>
      )}

      <Modal open={!!registering} onClose={() => setRegistering(null)} title={`Register — ${registering?.title ?? ""}`}>
        {done ? (
          <p className="flex items-center gap-3 text-success"><Icon name="check" className="h-5 w-5" />You're registered! We'll reach out with details.</p>
        ) : (
          <form onSubmit={submit} className="grid gap-4">
            <Field label="Full Name *"><input name="name" required className="input-field" /></Field>
            <Field label="Email *"><input name="email" type="email" required className="input-field" /></Field>
            <Field label="Phone"><input name="phone" className="input-field" /></Field>
            <div className="flex justify-end"><button className="btn btn-primary">Confirm Registration</button></div>
          </form>
        )}
      </Modal>
    </SiteLayout>
  );
}
