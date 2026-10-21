import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { SectionHeading, Counter, Badge, EmptyState } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore } from "@/context/StoreContext";
import { img } from "@/utils/images";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kranjal Foundation — Together We Build Better Lives" },
      { name: "description", content: "A registered non-profit in Pune, Maharashtra working across education, health, food security and women's livelihoods since 2016." },
      { property: "og:title", content: "Kranjal Foundation — Together We Build Better Lives" },
      { property: "og:description", content: "Education, healthcare, nutrition and livelihood programs reaching 48,000+ people across Maharashtra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { state } = useStore();
  const programs = state.programs.filter((p) => p.status === "Active").slice(0, 6);
  const events = state.events.filter((e) => e.status === "Upcoming").slice(0, 3);

  const categoryIcon: Record<string, string> = {
    Education: "book", Health: "health", Food: "food", "Women Empowerment": "users",
    "Skill Development": "briefcase", Environment: "leaf",
  };

  return (
    <SiteLayout>
      <section className="relative">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground backdrop-blur">
            <Icon name="heart" className="h-3.5 w-3.5" /> Est. 2016 · Pune, Maharashtra
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-primary-foreground md:text-7xl">
            {state.content.heroTitle}
          </h1>
          <p className="mt-3 font-display text-xl italic text-accent md:text-2xl">{state.content.heroSubtitle}</p>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/90">{state.content.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/donate" className="btn btn-accent"><Icon name="heart" className="h-4 w-4" />Donate Now</Link>
            <Link to="/volunteer" className="btn btn-glass">Become a Volunteer</Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-soft">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
          {state.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-bold text-primary md:text-5xl"><Counter value={s.value} suffix={s.suffix} /></p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="What We Do" title="Our Programs" text="Six flagship programs designed with communities, not just for them." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Link key={p.id} to="/programs" className="card-soft card-hover group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img src={img(p.image)} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-4 top-4"><Badge>{p.category}</Badge></span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.description}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">{p.beneficiaries.toLocaleString("en-IN")} beneficiaries <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/programs" className="btn btn-outline">Explore All Programs</Link></div>
      </section>

      <section className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-accent">Our Mission</p>
            <h2 className="text-3xl font-semibold text-primary-foreground md:text-4xl">{state.foundation.tagline}</h2>
            <p className="mt-5 text-primary-foreground/80">{state.content.mission}</p>
            <p className="mt-4 text-primary-foreground/80">{state.content.vision}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="btn btn-accent btn-sm">Read Our Story</Link>
              <Link to="/impact" className="btn btn-glass btn-sm">See Our Impact</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {state.testimonials.map((t) => (
              <div key={t.id} className="glass rounded-2xl p-5">
                <Icon name="quote" className="h-6 w-6 text-accent" />
                <p className="mt-3 text-sm text-primary-foreground/90">{t.quote}</p>
                <p className="mt-4 text-sm font-bold">{t.name}</p>
                <p className="text-xs opacity-70">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="Get Involved" title="Upcoming Events" text="Join us on the ground — every pair of hands counts." />
        {events.length ? (
          <div className="grid gap-6 md:grid-cols-3">
            {events.map((e) => (
              <div key={e.id} className="card-soft card-hover overflow-hidden">
                <img src={img(e.image)} alt={e.title} className="h-40 w-full object-cover" />
                <div className="p-5">
                  <Badge>{e.category}</Badge>
                  <h3 className="mt-3 text-lg font-semibold">{e.title}</h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Icon name="calendar" className="h-4 w-4" />{new Date(e.date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Icon name="pin" className="h-4 w-4" />{e.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : <EmptyState text="No upcoming events right now — check back soon." />}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/events" className="btn btn-outline">All Events</Link>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
