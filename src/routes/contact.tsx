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
          <p className="mt-2 text-sm text-muted-foreground">Feel free to reach out through phone, email, or by scheduling an in-person visit to our Pune foundation headquarters.</p>

          <ul className="mt-6 space-y-5">
            <li className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-primary-deep"><Icon name="pin" className="h-5 w-5" /></span>
              <div><p className="font-semibold">Visit</p><p className="text-sm text-muted-foreground">{f.address}</p></div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-primary-deep"><Icon name="phone" className="h-5 w-5" /></span>
              <div><p className="font-semibold">Call</p><p className="text-sm text-muted-foreground">{f.phone}</p></div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-primary-deep"><Icon name="mail" className="h-5 w-5" /></span>
              <div><p className="font-semibold">Email</p><p className="text-sm text-muted-foreground">{f.email}</p></div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint text-primary-deep"><Icon name="file" className="h-5 w-5" /></span>
              <div><p className="font-semibold">Registered</p><p className="text-sm text-muted-foreground">Reg. {f.registration} · 80G {f.certificate80G} · 12A {f.certificate12A}</p></div>
            </li>
          </ul>

          <div className="mt-8 rounded-2xl bg-muted/60 p-5 border text-xs text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Office Hours</p>
            <p>Monday – Saturday: 9:30 AM to 6:00 PM</p>
            <p>Sunday: Closed (Volunteer field activities by schedule)</p>
          </div>
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
              <div className="sm:col-span-2">
                <h2 className="text-2xl font-semibold">Send a Message</h2>
                <p className="text-sm text-muted-foreground mt-1">Please fill in your enquiry details below. All fields with * are required.</p>
              </div>
              <Field label="Name *"><input name="name" required className="input-field" placeholder="Your full name" /></Field>
              <Field label="Email *"><input name="email" type="email" required className="input-field" placeholder="yourname@example.com" /></Field>
              <Field label="Phone"><input name="phone" className="input-field" placeholder="+91 90000 00000" /></Field>
              <Field label="Subject">
                <select name="subject" className="input-field">
                  <option>General Enquiry</option><option>Donation & 80G Receipts</option><option>Volunteering & Training</option><option>Corporate / NGO Partnership</option><option>Media & Press</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message *"><textarea name="message" required rows={5} className="input-field" placeholder="How can we help or collaborate?" /></Field>
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button className="btn btn-primary">
                  <Icon name="mail" className="h-4 w-4" />Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Google Map Placeholder Section */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="card-soft overflow-hidden">
          <div className="border-b p-4 flex flex-wrap items-center justify-between gap-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <Icon name="pin" className="h-5 w-5 text-primary" />
              <span className="font-semibold text-sm">Google Map Location · Kranjal Foundation Pune</span>
            </div>
            <a
              href="https://maps.google.com/?q=Pune,+Maharashtra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
            >
              Open in Google Maps <Icon name="arrow" className="h-3 w-3" />
            </a>
          </div>

          <div className="relative h-80 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
            {/* Map styling grid & background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0f766e_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/50 via-slate-100/30 to-teal-50/40" />

            {/* Stylized vector map elements */}
            <svg className="absolute inset-0 h-full w-full opacity-30 stroke-slate-400" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,100 Q300,120 600,80 T1200,140" fill="none" strokeWidth="8" stroke="#cbd5e1" />
              <path d="M100,0 Q240,200 400,320" fill="none" strokeWidth="6" stroke="#e2e8f0" />
              <path d="M500,0 Q600,180 850,320" fill="none" strokeWidth="10" stroke="#cbd5e1" />
              <path d="M0,260 Q400,200 900,280" fill="none" strokeWidth="5" stroke="#94a3b8" />
            </svg>

            {/* Map Pin Box */}
            <div className="relative z-10 flex flex-col items-center text-center p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border max-w-sm mx-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg animate-bounce">
                <Icon name="pin" className="h-6 w-6" />
              </div>
              <h3 className="mt-3 font-bold text-base text-foreground">{f.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{f.address}</p>
              <p className="mt-1 text-xs font-semibold text-primary">{f.phone}</p>
              <div className="mt-4 flex gap-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(f.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm text-xs"
                >
                  Get Directions
                </a>
                <span className="btn btn-ghost btn-sm text-xs pointer-events-none">
                  Lat: 18.5204° N, Lon: 73.8567° E
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
