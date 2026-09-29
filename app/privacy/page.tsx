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

const LAST_UPDATED = "29 September 2026";

// The header shows the live nomination status; re-render hourly.
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
        <li>nominations for {event.name};</li>
        <li>gifts and donations;</li>
        <li>messages and calls to us, including partnership enquiries;</li>
        <li>visits to this website.</li>
      </ul>

      <h2>Nominations</h2>
      <p>When you nominate someone, we collect:</p>
      <ul>
        <li>about the nominee: their full name, organisation (if any), the honour category and the state where the work happened;</li>
        <li>your description of what they did and who benefited, and any link to coverage or records you provide;</li>
        <li>about you: your name and your email address or WhatsApp number;</li>
        <li>your consent, the time of your submission and basic technical details of your browser, which help us spot automated spam.</li>
      </ul>
      <p>
        We use this only to assess nominations against the published criteria, to contact you about your nomination, and,
        if the nominee is shortlisted, to contact the nominee and one referee to verify the details. We rely on your consent,
        which you give by ticking the box on the form.
      </p>
      <p>
        Please do not send sensitive information such as health details, religious beliefs or identity documents unless it is
        essential to the nomination.
      </p>

      <h2>If you have been nominated</h2>
      <p>
        Someone else gave us your details. You may ask us what we hold, ask us to correct it, or decline the nomination at any
        time. Shortlisted nominees are named publicly only with their consent. See the{" "}
        <Link href="/nomination-terms">nomination terms</Link>.
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
        Nominations are stored in Google Workspace, in an account controlled by {site.name}, and a copy of each nomination is
        sent to our nominations inbox. Only {site.name} staff and the members of the independent review panel can see them.
        We do not sell personal information or use it for marketing.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We delete unsuccessful nominations 12 months after the ceremony. Where a nominee becomes an honouree, we keep what is
        needed to document the honour, and we publish a profile only with the honouree&apos;s consent.
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
        To use any of these rights, email {mail} with the subject &ldquo;Data request&rdquo; and, if you have one, your
        nomination reference number. If you are unhappy with our response, you can complain to the Nigeria Data Protection
        Commission.
      </p>

      <h2>Changes to this notice</h2>
      <p>If we change this notice, we will update the date at the top of this page.</p>
    </ReadingPage>
  );
}
