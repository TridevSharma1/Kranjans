import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { SectionHeading, Counter, PageHero } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore } from "@/context/StoreContext";
import * as seed from "@/data/seed";
import { img } from "@/utils/images";
import education from "@/assets/education.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Kranjal Foundation" },
      { name: "description", content: "Kranjal Foundation's mission, vision, values, history and the team behind our work across Maharashtra since 2016." },
      { property: "og:title", content: "About Us — Kranjal Foundation" },
      { property: "og:description", content: "Our mission, vision, values, history and team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const { state } = useStore();
  const c = state?.content || seed.content;
  const f = state?.foundation || seed.foundation;
  const stats = state?.stats || seed.stats || [];
  const team = state?.team || seed.team || [];
  const valueList = (c.values || "").split(",").map((v: string) => v.trim()).filter(Boolean);

  return (
    <SiteLayout>
      <PageHero title="About Kranjal Foundation" text={c.aboutIntro} image={education} />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: "target", title: "Our Mission", text: c.mission },
            { icon: "eye", title: "Our Vision", text: c.vision },
            { icon: "heart", title: "Our Values", text: "" },
          ].map((b) => (
            <div key={b.title} className="card-soft card-hover p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground"><Icon name={b.icon} /></div>
              <h3 className="mt-4 text-xl font-semibold">{b.title}</h3>
              {b.text ? <p className="mt-2 text-sm text-muted-foreground">{b.text}</p> : (
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {valueList.map((v: string) => <li key={v} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-success" />{v}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading eyebrow="Our History" title="How It All Began" />
          <p className="mx-auto max-w-3xl text-center text-lg text-muted-foreground">{c.history}</p>
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl font-bold text-primary"><Counter value={s.value} suffix={s.suffix} /></p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="Leadership" title="Meet the Team" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <div key={t.name} className="card-soft card-hover p-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary text-2xl font-bold text-primary-foreground">
                {t.name.replace("Dr. ", "").split(" ").map((p: string) => p[0]).slice(0, 2).join("")}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="card-soft relative overflow-hidden p-10 text-center md:p-16">
          <img src={img("women")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10" />
          <div className="relative">
            <h2 className="text-3xl font-semibold md:text-4xl">Registered &amp; Compliant</h2>
            <div className="mx-auto mt-6 grid max-w-2xl gap-3 text-sm md:grid-cols-2">
              <p className="flex items-center justify-center gap-2"><Icon name="file" className="h-4 w-4 text-primary" />Registration: {f.registration}</p>
              <p className="flex items-center justify-center gap-2"><Icon name="file" className="h-4 w-4 text-primary" />PAN: {f.pan}</p>
              <p className="flex items-center justify-center gap-2"><Icon name="file" className="h-4 w-4 text-primary" />80G: {f.certificate80G}</p>
              <p className="flex items-center justify-center gap-2"><Icon name="file" className="h-4 w-4 text-primary" />12A: {f.certificate12A}</p>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/donate" className="btn btn-accent">Support Our Work</Link>
              <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
