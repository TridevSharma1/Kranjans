import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { PageHero, Badge, EmptyState } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useStore } from "@/context/StoreContext";
import { img } from "@/utils/images";
import health from "@/assets/health.jpg";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Our Programs — Kranjal Foundation" },
      { name: "description", content: "Education, health, food, women's empowerment, skill development and environment programs run by Kranjal Foundation." },
      { property: "og:title", content: "Our Programs — Kranjal Foundation" },
      { property: "og:description", content: "Six flagship programs reaching 48,000+ people across Maharashtra." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Programs,
});

function Programs() {
  const { state } = useStore();
  const categoryIcon: Record<string, string> = {
    Education: "book", Health: "health", Food: "food", "Women Empowerment": "users",
    "Skill Development": "briefcase", Environment: "leaf",
  };

  return (
    <SiteLayout>
      <PageHero title="Our Programs" text="Every program is co-designed with the communities it serves — measured not by activities, but by outcomes." image={health} />
      <section className="mx-auto max-w-7xl px-6 py-16">
        {state.programs.length ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {state.programs.map((p) => (
              <div key={p.id} className="card-soft card-hover flex flex-col overflow-hidden md:flex-row">
                <div className="relative h-52 shrink-0 md:h-auto md:w-56">
                  <img src={img(p.image)} alt={p.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-2">
                    <Badge>{p.category}</Badge>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground"><Icon name={categoryIcon[p.category] ?? "star"} className="h-4 w-4" />{p.beneficiaries.toLocaleString("en-IN")} reached</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <p className="mt-4 border-t pt-4 text-xs text-muted-foreground"><span className="font-bold uppercase tracking-wider text-primary">Objectives · </span>{p.objectives}</p>
                  <div className="mt-auto pt-4">
                    <Link to="/donate" className="btn btn-outline btn-sm">Support This Program</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : <EmptyState text="Programs will appear here soon." />}
      </section>
    </SiteLayout>
  );
}
