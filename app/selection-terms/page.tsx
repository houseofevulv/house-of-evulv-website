import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingPage } from "@/components/ReadingPage";
import { contact, event, nominations, site, steps } from "@/lib/content";
import { weekdayDayMonth } from "@/lib/dates";
import { pageOpenGraph } from "@/lib/metadata";

/*
  PENDING LEGAL REVIEW. Terms for the 2026 edition, where honourees are selected rather than publicly nominated.
  The no-fee and conflict-of-interest sections follow practice at established prizes (e.g. the Aurora Prize and
  Right Livelihood Award); the client must confirm both.
*/

// The header shows the live programme status; re-render hourly.
export const revalidate = 3600;

const description = `How honourees are selected for ${event.name}, and the terms that apply.`;

export const metadata: Metadata = {
  title: "Selection terms",
  description,
  alternates: { canonical: "/selection-terms" },
  openGraph: pageOpenGraph("/selection-terms", `Selection terms | ${site.name}`, description),
};

export default function SelectionTermsPage() {
  if (nominations.public) notFound();
  const announcement = steps.find((s) => s.id === "announcement");
  const mail = <a href={`mailto:${contact.email}`}>{contact.email}</a>;

  return (
    <ReadingPage
      title="Selection terms"
      intro={
        <p className="m-0">
          These terms apply to {event.name}, first edition. Honourees are announced on{" "}
          {announcement ? weekdayDayMonth(announcement.start) : weekdayDayMonth(nominations.outcomeBy)} and presented on{" "}
          {event.ceremonyDateDisplay}.
        </p>
      }
    >
      <h2>How honourees are selected</h2>
      <p>
        For this edition, honourees are selected rather than publicly nominated. {site.name}&apos;s research team identifies
        candidates across all 36 states and the FCT, and checks each candidate&apos;s record, including with at least one
        referee. An independent panel then scores the shortlist against published criteria.
      </p>

      <h2>No applications</h2>
      <p>
        There are no applications or public nominations in this edition. Candidates cannot put themselves forward, and no
        one can secure an honour by request, recommendation or payment.
      </p>

      {/* TODO(client): confirm the no-fee commitment */}
      <h2>No fees</h2>
      <p>
        Honourees never pay to be honoured or to attend the ceremony. {site.name} will never ask a candidate or honouree for
        money. If anyone asks for payment in the programme&apos;s name, they are not acting for us: please report it to {mail}.
      </p>

      {/* TODO(client): confirm the conflict-of-interest rule */}
      <h2>Conflicts of interest</h2>
      <p>
        Panel members declare any personal, professional or financial connection to a candidate, and take no part in
        decisions about that candidate.
      </p>

      <h2>Decisions</h2>
      <p>
        The panel&apos;s decision is final, and we do not enter into correspondence about individual results. An honour may
        be withdrawn if information about the honouree is found to be false or misleading.
      </p>

      <h2>Consent</h2>
      <p>
        Shortlisted candidates are contacted before any decision is made public. They are named only with their consent, and
        anyone may decline to be considered, or decline an honour, at any time.
      </p>

      <h2>Your information</h2>
      <p>
        We handle the information gathered during selection as set out in our <Link href="/privacy">privacy notice</Link>.
        Questions about these terms can go to {mail}.
      </p>
    </ReadingPage>
  );
}
