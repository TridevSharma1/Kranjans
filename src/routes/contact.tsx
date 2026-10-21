import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { PageHero, Field } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore } from "@/context/StoreContext";
import health from "@/assets/health.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Kranjal Foundation" },
      { name: "description", content: "Reach Kranjal Foundation in Pune, Maharashtra — partnerships, donations, volunteering and general enquiries." },
      { property: "og:title", content: "Contact Us — Kranjal Foundation" },
      { property: "og:description", content: "Partnerships, donations, volunteering and enquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { state, add } = useStore();
  const f = state.foundation;
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    add("messages", {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
      status: "New",
      date: new Date().toISOString().slice(0, 10),
    });
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <PageHero title="Contact Us" text="A question, a partnership idea, or a helping hand — we'd love to hear from you." image={health} />

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold">Reach Us Directly</h2>
          <ul className="mt-6 space-y-5">
            <li className="flex gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-primary-deep"><Icon name="pin" className="h-5 w-5" /></span><div><p className="font-semibold">Visit</p><p className="text-sm text-muted-foreground">{f.address}</p></div></li>
            <li className="flex gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-primary-deep"><Icon name="phone" className="h-5 w-5" /></span><div><p className="font-semibold">Call</p><p className="text-sm text-muted-foreground">{f.phone}</p></div></li>
            <li className="flex gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-primary-deep"><Icon name="mail" className="h-5 w-5" /></span><div><p className="font-semibold">Email</p><p className="text-sm text-muted-foreground">{f.email}</p></div></li>
            <li className="flex gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-primary-deep"><Icon name="file" className="h-5 w-5" /></span><div><p className="font-semibold">Registered</p><p className="text-sm text-muted-foreground">Reg. {f.registration} · 80G {f.certificate80G} · 12A {f.certificate12A}</p></div></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          {submitted ? (
            <div className="card-soft p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint text-primary-deep"><Icon name="check" className="h-8 w-8" /></div>
              <h2 className="mt-6 text-2xl font-semibold">Message sent!</h2>
              <p className="mt-2 text-muted-foreground">We read every message and typically reply within two working days.</p>
              <button className="btn btn-outline mt-8" onClick={() => setSubmitted(false)}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} className="card-soft grid gap-5 p-8 sm:grid-cols-2">
              <div className="sm:col-span-2"><h2 className="text-2xl font-semibold">Send a Message</h2></div>
              <Field label="Name *"><input name="name" required className="input-field" /></Field>
              <Field label="Email *"><input name="email" type="email" required className="input-field" /></Field>
              <Field label="Phone"><input name="phone" className="input-field" /></Field>
              <Field label="Subject">
                <select name="subject" className="input-field">
                  <option>General Enquiry</option><option>Donation</option><option>Volunteering</option><option>Partnership</option><option>Media</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message *"><textarea name="message" required rows={5} className="input-field" /></Field>
              </div>
              <div className="sm:col-span-2 flex justify-end"><button className="btn btn-primary">Send Message</button></div>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
