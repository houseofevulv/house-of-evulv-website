import type { Metadata } from "next";
import Link from "next/link";
import { ReadingPage } from "@/components/ReadingPage";
import { contact, donate, event, site } from "@/lib/content";
import { pageOpenGraph } from "@/lib/metadata";

/*
  PENDING LEGAL REVIEW. Draft copy based on the build brief (section 8). Do not treat as final until the client's
  counsel has reviewed it against the Nigeria Data Protection Act 2023, in particular the lawful basis and retention
  period for donation records.
*/

const LAST_UPDATED = "30 September 2026";

// The header shows the live programme status; re-render hourly.
export const revalidate = 3600;

const description = `How ${site.name} collects, uses and protects the personal information people share with us.`;

export const metadata: Metadata = {
  title: "Privacy notice",
  description,
  alternates: { canonical: "/privacy" },
  openGraph: pageOpenGraph("/privacy", `Privacy notice | ${site.name}`, description),
};

export default function PrivacyPage() {
  const mail = <a href={`mailto:${contact.email}`}>{contact.email}</a>;
  const provider = donate.paymentProvider ?? "our payment provider";
  return (
    <ReadingPage title="Privacy notice" intro={<p className="m-0">Last updated {LAST_UPDATED}</p>}>
      <h2>Who we are</h2>
      <p>
        {site.name} is a social impact platform in {contact.city}. We run programmes in peace, healing and human
        development, and we honour the people whose often unrecorded work keeps communities safe and whole. That work
        depends on trust: people tell us about neighbours, colleagues and leaders they admire, and some of them tell us about
        hard experiences. We treat what you share with the same care we would want for ourselves.
      </p>
      <p>
        {site.name} is responsible for the personal information described here. You can reach us at {mail} or on{" "}
        <a href={contact.phoneHref}>{contact.phoneDisplay}</a>.
        {/* TODO(client): add street address and company registration number if they want them shown */}
      </p>

      <h2>What this notice covers</h2>
      <ul>
        <li>people we consider for {event.name};</li>
        <li>support pledges made through this website;</li>
        <li>gifts and donations;</li>
        <li>messages and calls to us, including partnership enquiries;</li>
        <li>visits to this website.</li>
      </ul>

      {/* TODO(client): confirm the lawful basis for candidate research with counsel (legitimate interests vs consent) */}
      <h2>People we consider for the honours</h2>
      <p>
        For this edition, honourees are selected rather than publicly nominated. To find and assess candidates, our research
        team gathers information about their work: their name, organisation, the category and state concerned, what they
        did and who benefited, public coverage or records, and what referees and community contacts tell us. We also record
        how to contact them.
      </p>
      <p>
        We use this only to assess candidates against the published criteria and to contact them. We do this in our
        legitimate interest in recognising public service, and we ask shortlisted candidates for their consent before
        anything about them is published. See the <Link href="/selection-terms">selection terms</Link>.
      </p>
      <p>
        If you think we hold information about you as a candidate, you may ask us what we hold, ask us to correct it, or ask
        us to stop considering you, at any time.
      </p>

      <h2>Support pledges</h2>
      <p>
        When you use the support form, we collect your name, organisation (if any), email address or WhatsApp number, how you
        would like to help, any amount or offer you mention, your message, your consent, the time you sent it and basic
        technical details of your browser, which help us spot automated spam. We use this only to reply and to arrange your
        support, and we rely on your consent, which you give by ticking the box on the form.
      </p>

      <h2>Gifts and donations</h2>
      {/* TODO(client): confirm the payment provider and the retention period for donation records */}
      <p>
        When you give online, your payment is handled by {provider}. We never see or store your full card details. We
        receive your name, email address, the amount and the date, so that we can confirm your gift, thank you and keep the
        financial records the law requires. If you give by bank transfer, we see the details your bank shares with ours.
      </p>
      <p>We keep donation records for as long as the law requires for financial records, and no longer.</p>

      <h2>Messages and enquiries</h2>
      <p>
        If you email, call or message us, we use your details only to reply and to follow up on what you asked about.
      </p>

      <h2>Visiting this website</h2>
      <p>
        This website does not use advertising or tracking cookies, and we do not run analytics that follow you across sites.
        Our hosting provider briefly keeps standard server logs, such as IP addresses and browser types, to keep the site
        secure and working.
      </p>

      <h2>Who can see your information</h2>
      <p>
        Candidate research and support pledges are stored in Google Workspace, in an account controlled by {site.name}, and
        a copy of each pledge is sent to our inbox. Only {site.name} staff can see pledges; candidate information is also
        shared with the members of the independent panel.
        We do not sell personal information or use it for marketing.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We delete information about candidates who are not selected 12 months after the ceremony. Where a candidate becomes
        an honouree, we keep what is needed to document the honour, and we publish a profile only with their consent. We keep
        support pledges for as long as we are in touch about them, and no longer than 12 months after the ceremony unless
        they become donation records.
      </p>

      <h2>Your rights</h2>
      <p>Under the Nigeria Data Protection Act 2023 you have the right to:</p>
      <ul>
        <li>access the personal information we hold about you;</li>
        <li>have inaccurate information corrected;</li>
        <li>have your information deleted;</li>
        <li>withdraw your consent at any time. This does not affect anything we did before you withdrew it.</li>
      </ul>
      <p>
        To use any of these rights, email {mail} with the subject &ldquo;Data request&rdquo;. If you are unhappy with our response, you can complain to the Nigeria Data Protection
        Commission.
      </p>

      <h2>Changes to this notice</h2>
      <p>If we change this notice, we will update the date at the top of this page.</p>
    </ReadingPage>
  );
}
