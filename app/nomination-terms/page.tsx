import type { Metadata } from "next";
import Link from "next/link";
import { ReadingPage } from "@/components/ReadingPage";
import { contact, event, nominations, site } from "@/lib/content";
import { pageOpenGraph } from "@/lib/metadata";
import { weekdayDayMonth } from "@/lib/dates";

/*
  PENDING LEGAL REVIEW. Draft copy from the build brief (section 8). The client still has to decide the
  self-nomination rule, and counsel should review the whole page before launch.
*/

// The header shows the live nomination status; re-render hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Nomination terms",
  description: `The terms that apply to nominations for ${event.name}.`,
  alternates: { canonical: "/nomination-terms" },
  openGraph: pageOpenGraph(
    "/nomination-terms",
    `Nomination terms | ${site.name}`,
    `The terms that apply to nominations for ${event.name}.`
  ),
};

export default function NominationTermsPage() {
  return (
    <ReadingPage
      title="Nomination terms"
      intro={
        <p className="m-0">
          These terms apply to every nomination for {event.name}, first edition. Nominations close on{" "}
          {weekdayDayMonth(nominations.closes)}.
        </p>
      }
    >
      <h2>Who can nominate</h2>
      <p>
        Anyone may nominate, including the nominee&apos;s colleagues, neighbours or the people they helped. You may send more
        than one nomination, one form per nominee.
      </p>
      {/* TODO(client): decide whether self-nominations are accepted, then replace this paragraph. */}
      <p>Self-nominations: the House is confirming whether self-nominations are accepted. Until then, please nominate someone else.</p>

      <h2>Accurate information</h2>
      <p>
        The information you give must be accurate and, to the best of your knowledge, true. Nominations found to contain
        false or misleading information will be withdrawn.
      </p>

      <h2>Verification</h2>
      <p>
        The House may verify any nomination with the nominee and with one referee. If your nominee is shortlisted, we contact
        you and a referee to confirm the details.
      </p>

      <h2>Decisions</h2>
      <p>
        An independent panel reviews each shortlisted nomination against the published criteria. The panel&apos;s decision is
        final, and we do not enter into correspondence about individual results.
      </p>

      <h2>Nominees</h2>
      <p>
        Nominees may decline a nomination or an honour at any time. Shortlisted nominees are named publicly only with their
        consent.
      </p>

      <h2>Your data</h2>
      <p>
        We handle the information in each nomination as set out in our <Link href="/privacy">privacy notice</Link>.
        Questions about these terms can go to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </ReadingPage>
  );
}
