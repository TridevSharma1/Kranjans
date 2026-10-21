import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { imageOptions } from "@/utils/images";
import { inr } from "@/utils/verify";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/admin/campaigns")({
  head: () => pageMeta("Campaigns", "Manage fundraising campaigns."),
  component: () => (
    <CrudPage title="Campaigns" subtitle="Fundraising campaigns shown on the Donate page." collection="campaigns" defaults={{ raised: 0, image: "hero" }}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "goal", label: "Goal (₹)", type: "number", required: true },
        { name: "raised", label: "Raised (₹)", type: "number" },
        { name: "image", label: "Image", type: "select", options: imageOptions },
        { name: "description", label: "Description", type: "textarea" },
      ]}
      columns={[
        { key: "title", label: "Title", render: (r) => <span className="font-semibold">{r.title}</span> },
        { key: "goal", label: "Goal", render: (r) => inr(r.goal) },
        { key: "raised", label: "Raised", render: (r) => inr(r.raised) },
        { key: "progress", label: "Progress", sortable: false, render: (r) => (
          <div className="flex w-40 items-center gap-2"><div className="h-2 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full bg-gradient-primary" style={{ width: `${Math.min(100, (r.raised / r.goal) * 100)}%` }} /></div><span className="text-xs">{Math.round((r.raised / r.goal) * 100)}%</span></div>
        ) },
      ]}
    />
  ),
});
