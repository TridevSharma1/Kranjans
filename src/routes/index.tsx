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
  const galleryPreview = state.gallery.slice(0, 6);

  const values = [
    { title: "Compassion", desc: "Putting dignity, empathy, and humanity at the center of every community initiative.", icon: "heart" },
    { title: "Integrity & Transparency", desc: "Every rupee accounted for with open records, 80G tax receipts, and direct tracking.", icon: "shield" },
    { title: "Community-Led Action", desc: "Programs co-designed with rural and urban local families for lasting generational impact.", icon: "users" },
    { title: "Inclusion & Equality", desc: "Prioritizing women, children, and vulnerable marginalized groups in every taluka.", icon: "award" },
  ];

  const achievements = [
    { number: "10+", label: "Years of Service", desc: "Serving Maharashtra communities continuously since 2016" },
    { number: "12,400+", label: "Children Educated", desc: "Through foundational digital learning centers & scholarships" },
    { number: "18,300+", label: "Medical Treatments", desc: "Free healthcare checkups, diagnostic camps & medicines" },
    { number: "100%", label: "Verified 80G Receipts", desc: "Government compliant with Section 12A & 80G certifications" },
  ];

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <img src={hero} alt="Kranjal Foundation banner" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-44">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground backdrop-blur">
            <Icon name="heart" className="h-3.5 w-3.5 text-accent" /> Est. 2016 · Pune, Maharashtra
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-primary-foreground md:text-7xl">
            {state.content.heroTitle}
          </h1>
          <p className="mt-4 font-display text-2xl italic text-accent md:text-3xl">{state.content.heroSubtitle}</p>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/90">{state.content.heroText}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/donate" className="btn btn-accent shadow-lg hover:shadow-xl transition-all">
              <Icon name="heart" className="h-4 w-4" />Donate Now
            </Link>
            <Link to="/volunteer" className="btn btn-glass shadow-md hover:bg-white/20 transition-all">
              <Icon name="hand" className="h-4 w-4" />Become Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="bg-gradient-soft border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
          {state.stats.map((s) => (
            <div key={s.label} className="text-center group">
              <p className="font-display text-4xl font-bold text-primary transition-transform duration-300 group-hover:scale-105 md:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="Who We Are" title="Mission & Vision" text="Transforming lives through grassroots empowerment and social accountability." />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="card-soft card-hover p-8 md:p-10 border-l-4 border-l-primary flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground mb-4">
                <Icon name="target" className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold">Our Mission</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{state.content.mission}</p>
            </div>
            <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs text-primary font-bold uppercase tracking-wider">
              <span>Community First</span>
              <span>Measurable Impact</span>
            </div>
          </div>

          <div className="card-soft card-hover p-8 md:p-10 border-l-4 border-l-secondary flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-warm text-accent-foreground mb-4">
                <Icon name="eye" className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold">Our Vision</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{state.content.vision}</p>
            </div>
            <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs text-accent-foreground font-bold uppercase tracking-wider">
              <span>Dignity For All</span>
              <span>Sustainable Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-mint/40 py-20 border-y">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Guiding Principles" title="Core Values" text="The compass behind every decision we make in the field and office." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="card-soft card-hover p-6 bg-card flex flex-col">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-primary mb-4">
                  <Icon name={v.icon} className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold">{v.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground flex-1">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="Milestones" title="Our Achievements" text="Recognized milestones made possible by our generous community." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => (
            <div key={a.label} className="card-soft card-hover p-6 text-center">
              <span className="font-display text-4xl font-bold text-accent">{a.number}</span>
              <h4 className="mt-2 text-lg font-semibold">{a.label}</h4>
              <p className="mt-2 text-xs text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Programs */}
      <section className="bg-gradient-soft py-20 border-t">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="What We Do" title="Our Programs" text="Six flagship programs designed with communities, not just for them." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <Link key={p.id} to="/programs" className="card-soft card-hover group overflow-hidden flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img src={img(p.image)} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-4 top-4"><Badge>{p.category}</Badge></span>
                </div>
                <div className="p-6 flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.description}</p>
                    <p className="mt-3 text-xs text-muted-foreground"><span className="font-bold text-primary">Goal:</span> {p.objectives}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t flex items-center justify-between text-sm font-bold text-primary">
                    <span>{p.beneficiaries.toLocaleString("en-IN")} beneficiaries</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">Details <Icon name="arrow" className="h-4 w-4" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/programs" className="btn btn-outline">Explore All Programs</Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="Real Transformation" title="Success Stories" text="Behind every number is a life forever changed." />
        <div className="grid gap-6 md:grid-cols-3">
          {state.stories.map((s) => (
            <div key={s.id} className="card-soft card-hover overflow-hidden flex flex-col">
              <img src={img(s.image)} alt={s.title} className="h-52 w-full object-cover" />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
                <div className="mt-4 pt-3 border-t">
                  <Link to="/impact" className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1">
                    Read story on Impact page <Icon name="arrow" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sidebar text-sidebar-foreground py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Voices of Trust</p>
            <h2 className="mt-2 text-3xl font-semibold text-primary-foreground md:text-4xl">What People Say About Kranjal</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {state.testimonials.map((t) => (
              <div key={t.id} className="glass rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <Icon name="quote" className="h-6 w-6 text-accent mb-3" />
                  <p className="text-sm leading-relaxed text-primary-foreground/90">"{t.quote}"</p>
                </div>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs opacity-75">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="Visual Journey" title="Gallery Preview" text="Moments of joy, learning, and dedication captured across our field projects." />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {galleryPreview.map((g) => (
            <figure key={g.id} className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm">
              <img src={img(g.image)} alt={g.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                {g.title}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/gallery" className="btn btn-outline btn-sm">View Full Gallery ({state.gallery.length} Photos)</Link>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-gradient-soft py-20 border-t">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Get Involved" title="Upcoming Events" text="Join us on the ground — every pair of hands counts." />
          {events.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {events.map((e) => (
                <div key={e.id} className="card-soft card-hover overflow-hidden flex flex-col">
                  <img src={img(e.image)} alt={e.title} className="h-44 w-full object-cover" />
                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <Badge>{e.category}</Badge>
                      <h3 className="mt-3 text-lg font-semibold">{e.title}</h3>
                      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Icon name="calendar" className="h-4 w-4" />{new Date(e.date + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Icon name="pin" className="h-4 w-4" />{e.location}</p>
                      <p className="mt-3 text-xs text-muted-foreground line-clamp-2">{e.description}</p>
                    </div>
                    <div className="mt-5 pt-3 border-t">
                      <Link to="/events" className="btn btn-primary btn-sm w-full text-center">Register For Event</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : <EmptyState text="No upcoming events right now — check back soon." />}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/events" className="btn btn-outline">All Events & Activities</Link>
          </div>
        </div>
      </section>

      {/* Dual CTA Section: Donation CTA & Volunteer CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Donation CTA */}
          <div className="rounded-3xl bg-gradient-primary p-8 md:p-12 text-primary-foreground flex flex-col justify-between shadow-xl">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">
                <Icon name="heart" className="h-3.5 w-3.5 text-accent" /> Tax Exemption Under 80G
              </span>
              <h3 className="mt-4 text-3xl font-bold leading-tight">Every Rupee Multiplies Into Real Hope</h3>
              <p className="mt-3 text-sm text-primary-foreground/90 leading-relaxed">
                Support children's education, women's self-help groups, and rural healthcare camps. Receive an instant 80G tax receipt directly upon donation.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/donate" className="btn btn-accent shadow-lg">
                <Icon name="heart" className="h-4 w-4" />Donate Online Now
              </Link>
              <Link to="/verify-certificate" className="text-xs text-primary-foreground/80 hover:text-white underline">
                Verify 80G Certs
              </Link>
            </div>
          </div>

          {/* Volunteer CTA */}
          <div className="rounded-3xl bg-sidebar p-8 md:p-12 text-sidebar-foreground flex flex-col justify-between shadow-xl">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sidebar-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                <Icon name="hand" className="h-3.5 w-3.5" /> Join 850+ Volunteers
              </span>
              <h3 className="mt-4 text-3xl font-bold text-white leading-tight">Share Your Time &amp; Expertise</h3>
              <p className="mt-3 text-sm text-sidebar-foreground/80 leading-relaxed">
                Whether you can give 2 hours on a weekend or contribute professional medical and teaching skills, your hands can touch hundreds of lives.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/volunteer" className="btn btn-accent shadow-lg">
                <Icon name="hand" className="h-4 w-4" />Register as Volunteer
              </Link>
              <Link to="/contact" className="btn btn-glass text-xs">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
