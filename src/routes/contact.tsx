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
  const [showCard, setShowCard] = useState(true);

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

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    f.name + " " + f.address
  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    f.name + ", " + f.address
  )}`;

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

      {/* Interactive Google Map Section */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="card-soft overflow-hidden shadow-lg border">
          <div className="border-b px-5 py-4 flex flex-wrap items-center justify-between gap-3 bg-muted/40">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-mint text-primary">
                <Icon name="pin" className="h-4 w-4" />
              </span>
              <div>
                <span className="font-bold text-sm text-foreground">Interactive Google Map</span>
                <span className="hidden sm:inline-block ml-2 text-xs text-muted-foreground">· Pune, Maharashtra (586119)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowCard(!showCard)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground hidden sm:inline-flex items-center gap-1"
              >
                {showCard ? "Hide Info Card" : "Show Info Card"}
              </button>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent btn-sm text-xs inline-flex items-center gap-1.5"
              >
                Open in Google Maps <Icon name="arrow" className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="relative h-[420px] md:h-[480px] w-full bg-slate-100">
            {/* Real Interactive Google Maps Iframe */}
            <iframe
              title={`${f.name} Location`}
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Floating Info Card overlay */}
            {showCard && (
              <div className="absolute top-4 left-4 z-10 max-w-xs md:max-w-sm rounded-2xl bg-card/95 backdrop-blur-md p-5 shadow-2xl border transition-all animate-fade-in hidden sm:block">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-white shadow-md">
                      <Icon name="pin" className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-foreground leading-snug">{f.name}</h4>
                      <p className="text-[11px] font-semibold text-primary uppercase tracking-wider">Head Office</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCard(false)}
                    className="rounded-full p-1 text-muted-foreground hover:bg-muted"
                    aria-label="Close"
                  >
                    <Icon name="x" className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3.5 space-y-2 text-xs text-muted-foreground border-t pt-3">
                  <p className="flex items-start gap-2">
                    <span className="font-medium text-foreground">Address:</span>
                    <span>{f.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Phone:</span>
                    <a href={`tel:${f.phone}`} className="text-primary font-semibold hover:underline">
                      {f.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Email:</span>
                    <a href={`mailto:${f.email}`} className="text-primary hover:underline truncate">
                      {f.email}
                    </a>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t flex items-center justify-between gap-2">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm text-xs flex-1 text-center"
                  >
                    Get Directions
                  </a>
                  <a
                    href={`tel:${f.phone}`}
                    className="btn btn-outline btn-sm text-xs px-3"
                    title="Call Office"
                  >
                    <Icon name="phone" className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
