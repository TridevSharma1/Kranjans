import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/CrudPage";
import { AppointmentLetter, PrintBar } from "@/components/documents";
import { EmptyState } from "@/components/ui";
import { useMember } from "@/hooks/use-member";
import { pageMeta } from "@/utils/meta";

export const Route = createFileRoute("/user/letter")({
  head: () => pageMeta("My Appointment Letter", "View and print your appointment letter."),
  component: MyLetter,
});

function MyLetter() {
  const { letters, foundation } = useMember();
  return (
    <div>
      <PageTitle title="My Appointment Letter" />
      {letters.length ? <div className="print-area"><PrintBar /><AppointmentLetter l={letters[0]} f={foundation} /></div>
        : <EmptyState text="No appointment letter has been issued to you yet." />}
    </div>
  );
}
