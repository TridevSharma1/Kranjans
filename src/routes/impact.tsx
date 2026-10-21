import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { SectionHeading, Counter, PageHero } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore } from "@/context/StoreContext";
import * as seed from "@/data/seed";
import { img } from "@/utils/images";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Our Impact — Kranjal Foundation" },
      { name: "description", content: "48,500+ lives impacted, 120 villages reached, 850+ volunteers — see the stories behind the numbers at Kranjal Foundation." },
      { property: "og:title", content: "Our Impact — Kranjal Foundation" },
      { property: "og:description", content: "The stories behind the numbers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Impact,
});

function Impact() {
  const { state } = useStore();
  const stats = state?.stats || seed.stats || [];
  const stories = state?.stories || seed.stories || [];
  const testimonials = state?.testimonials || seed.testimonials || [];

  return (
    <SiteLayout>
      <PageHero title="Our Impact" text="Numbers matter — but the people behind them matter more. Here is what your support makes possible." image={hero} />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card-soft p-8 text-center">
              <p className="font-display text-4xl font-bold text-primary md:text-5xl"><Counter value={s.value} suffix={s.suffix} /></p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading eyebrow="Stories of Change" title="Real People, Real Change" />
          <div className="grid gap-6 md:grid-cols-3">
            {stories.map((s) => (
              <div key={s.id} className="card-soft card-hover overflow-hidden">
                <img src={img(s.image)} alt={s.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="In Their Words" title="Voices From the Field" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="card-soft card-hover p-8">
              <Icon name="quote" className="h-8 w-8 text-accent" />
              <p className="mt-4 text-muted-foreground">"{t.quote}"</p>
              <p className="mt-6 font-bold">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/donate" className="btn btn-accent"><Icon name="heart" className="h-4 w-4" />Create More Stories</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
