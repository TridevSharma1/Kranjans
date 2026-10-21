import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { PageHero, Field } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore } from "@/context/StoreContext";
import education from "@/assets/education.jpg";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [
      { title: "Volunteer With Us — Kranjal Foundation" },
      { name: "description", content: "Teach, heal, build, plant — register as a Kranjal Foundation volunteer and pick your first project." },
      { property: "og:title", content: "Volunteer With Us — Kranjal Foundation" },
      { property: "og:description", content: "Register as a volunteer and pick your first project." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Volunteer,
});

function Volunteer() {
  const { add } = useStore();
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    add("volunteers", {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      address: String(fd.get("address") || ""),
      skills: String(fd.get("skills") || ""),
      availability: String(fd.get("availability") || ""),
      interest: String(fd.get("interest") || ""),
      status: "Pending",
      date: new Date().toISOString().slice(0, 10),
    });
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <PageHero title="Volunteer With Us" text="850+ volunteers teach, heal, cook, build and plant with us. There's a place for your skills too." image={education} />

      <section className="mx-auto max-w-3xl px-6 py-16">
        {submitted ? (
          <div className="card-soft p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint text-primary-deep"><Icon name="check" className="h-8 w-8" /></div>
            <h2 className="mt-6 text-2xl font-semibold">Application received!</h2>
            <p className="mt-2 text-muted-foreground">Thank you for wanting to help. Our outreach team reviews every application and will contact you within a week.</p>
            <button className="btn btn-outline mt-8" onClick={() => setSubmitted(false)}>Submit another application</button>
          </div>
        ) : (
          <form onSubmit={submit} className="card-soft grid gap-5 p-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <h2 className="text-2xl font-semibold">Volunteer Application</h2>
              <p className="mt-1 text-sm text-muted-foreground">All fields marked * are required.</p>
            </div>
            <Field label="Full Name *"><input name="name" required className="input-field" /></Field>
            <Field label="Email *"><input name="email" type="email" required className="input-field" /></Field>
            <Field label="Phone *"><input name="phone" required className="input-field" /></Field>
            <Field label="Address"><input name="address" className="input-field" /></Field>
            <Field label="Skills (e.g. teaching, medical, photography) *"><input name="skills" required className="input-field" /></Field>
            <Field label="Availability">
              <select name="availability" className="input-field">
                <option>Weekends</option><option>Weekdays</option><option>Monthly</option><option>Flexible</option>
              </select>
            </Field>
            <Field label="Area of Interest">
              <select name="interest" className="input-field">
                <option>Education</option><option>Health</option><option>Food</option><option>Women Empowerment</option><option>Skill Development</option><option>Environment</option>
              </select>
            </Field>
            <div className="sm:col-span-2 flex justify-end"><button className="btn btn-primary"><Icon name="hand" className="h-4 w-4" />Submit Application</button></div>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}
