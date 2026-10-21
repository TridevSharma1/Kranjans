import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { img, imageOptions } from "@/utils/images";
import { pageMeta } from "@/utils/meta";

const cats = ["Education", "Health", "Food", "Women Empowerment", "Skill Development", "Environment"];

export const Route = createFileRoute("/admin/gallery")({
  head: () => pageMeta("Gallery", "Manage gallery photos."),
  component: () => (
    <CrudPage title="Gallery" subtitle="Photos shown in the public gallery. Use a built-in image key or paste an image URL." collection="gallery" defaults={{ image: "hero" }}
      fields={[
        { name: "title", label: "Caption", required: true },
        { name: "category", label: "Category", type: "select", options: cats, required: true },
        { name: "image", label: `Image (${imageOptions.join(", ")} or URL)`, required: true },
      ]}
      filters={[{ key: "category", label: "Categories", options: cats }]}
      columns={[
        { key: "image", label: "Photo", sortable: false, render: (r) => <img src={img(r.image)} alt={r.title} className="h-12 w-16 rounded-lg object-cover" /> },
        { key: "title", label: "Caption", render: (r) => <span className="font-semibold">{r.title}</span> },
        { key: "category", label: "Category" },
      ]}
    />
  ),
});
