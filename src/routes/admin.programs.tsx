import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { StatusPill } from "@/components/StatusPill";
import { imageOptions } from "@/utils/images";
import { pageMeta } from "@/utils/meta";

const cats = ["Education", "Health", "Food", "Women Empowerment", "Skill Development", "Environment"];

export const Route = createFileRoute("/admin/programs")({
  head: () => pageMeta("Programs", "Manage foundation programs."),
  component: () => (
    <CrudPage title="Programs" subtitle="Programs listed on the public website." collection="programs" defaults={{ status: "Active", image: "hero" }}
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "category", label: "Category", type: "select", options: cats, required: true },
        { name: "beneficiaries", label: "Beneficiaries", type: "number" },
        { name: "image", label: "Image", type: "select", options: imageOptions },
        { name: "status", label: "Status", type: "select", options: ["Active", "Completed"] },
        { name: "objectives", label: "Objectives (separate with ;)" },
        { name: "description", label: "Description", type: "textarea", required: true },
      ]}
      filters={[{ key: "category", label: "Categories", options: cats }]}
      columns={[
        { key: "title", label: "Title", render: (r) => <span className="font-semibold">{r.title}</span> },
        { key: "category", label: "Category" },
        { key: "beneficiaries", label: "Beneficiaries", render: (r) => Number(r.beneficiaries || 0).toLocaleString("en-IN") },
        { key: "status", label: "Status", render: (r) => <StatusPill value={r.status} /> },
      ]}
    />
  ),
});
