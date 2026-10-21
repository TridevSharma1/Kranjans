import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { PageHero, EmptyState } from "@/components/ui";
import { useStore } from "@/context/StoreContext";
import { img } from "@/utils/images";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Kranjal Foundation" },
      { name: "description", content: "Moments from learning centres, health camps, meal drives and women's self-help groups across Maharashtra." },
      { property: "og:title", content: "Gallery — Kranjal Foundation" },
      { property: "og:description", content: "Moments from the field." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const { state } = useStore();
  const categories = ["All", ...Array.from(new Set(state.gallery.map((g) => g.category)))];
  const [active, setActive] = useState("All");
  const items = active === "All" ? state.gallery : state.gallery.filter((g) => g.category === active);

  return (
    <SiteLayout>
      <PageHero title="Gallery" text="Snapshots from the field — classrooms, camps, kitchens and community halls." image={hero} />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${active === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-mint hover:text-primary-deep"}`}>{c}</button>
          ))}
        </div>
        {items.length ? (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {items.map((g) => (
              <figure key={g.id} className="group relative overflow-hidden rounded-2xl shadow-[var(--shadow-soft)]">
                <img src={img(g.image)} alt={g.title} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">{g.title}</figcaption>
              </figure>
            ))}
          </div>
        ) : <EmptyState text="No photos in this category yet." />}
      </section>
    </SiteLayout>
  );
}
