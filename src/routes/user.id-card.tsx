import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/CrudPage";
import { IdCard, PrintBar } from "@/components/documents";
import { EmptyState } from "@/components/ui";
import { useMember } from "@/hooks/use-member";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/user/id-card")({
  head: () => pageMeta("My ID Card", "View and print your employee ID card."),
  component: MyIdCard,
});

function MyIdCard() {
  const { employee, foundation } = useMember();
  return (
    <div>
      <PageTitle title="My ID Card" subtitle="Front and back — scan the QR to verify." />
      {employee ? <div className="print-area"><PrintBar /><IdCard e={employee} f={foundation} /></div>
        : <EmptyState text="Your account isn't linked to an employee record yet. Please contact the foundation office." />}
    </div>
  );
}
