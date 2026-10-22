# House of Evulv website

Website for House of Evulv (Lagos) and its first programme, the Sentinels of Peace Grand Honours.

- **Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Server Actions with zod
- **Brand:** House of Evulv Identity 2. The manual and source files are in `brand identity assets/`; the site uses the SVGs in `public/brand` through `components/Logo.tsx`, and the palette and type in `app/globals.css`. The animated brand files in `public/brand/motion` are built by the scripts in `scripts/brand-motion` (see its README).
- **2026 edition:** honourees are **selected**, not publicly nominated. `nominations.public` is `false` in `content/site-content.json`, which hides the nomination form and shows a support pledge form in its place. Set it to `true` to bring public nominations back in a future edition.
- **Forms:** support pledges (and, when switched on, nominations) are emailed to the House through Resend. Nothing is stored anywhere else, so the email is the record.
- **Hosting:** Vercel
- **Package:** Essentials. `FEATURE_FULL` stays `false`; see `lib/content.ts`.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/sentinels-of-peace` | Sentinels of Peace, including the support pledge form and FAQ |
| `/our-story` | Our story |
| `/privacy` | Privacy notice (pending legal review) |
| `/selection-terms` | Selection terms for the 2026 edition (pending legal review). `/nomination-terms` redirects here while public nominations are off. |
| any other | Styled 404 |

## Run it locally

Requires Node.js 20 or later.

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000
```

Without the Resend key, the forms still work in development: they log a warning instead of sending. In production a missing key shows the visitor an error, since the submission would otherwise be lost.

To preview a different date (nomination status, timeline, form state), set `DEBUG_TODAY=YYYY-MM-DD` in `.env.local`. It is ignored in production.

## Editing content

Dates, venue, categories, timeline, partnership tiers, states, contact details and donation details all live in `content/site-content.json`. Change them there, not in the components.

- **Ceremony date or venue:** `event`. Set `venueConfirmed` to `true` once confirmed; the Event structured data for Google appears only when both date and venue are confirmed.
- **Nomination window:** `nominations.opens` and `nominations.closes`. The site switches between "opens soon", "open" and "closed" by itself, in Lagos time.
- **Donations:** `donate.paymentUrl` (a Paystack or Flutterwave payment page) and/or `donate.bank`. With neither, the section invites people to get in touch.
- **Photos:** `public/images`, credits in `IMAGE-CREDITS.md`.
- **Logos:** never place them on a photograph without a dark panel, never use gold on a light background (use the bronze files), and respect the minimum sizes noted in `components/Logo.tsx`.

Search the code for `TODO(client)` to find everything still waiting on the client.

## Environment variables

See `.env.example`. Set them in Vercel under Project → Settings → Environment Variables.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend key for the website's form emails (its own key, separate from Gmail's) |
| `FORMS_ALERT_TO` | Inbox that receives each pledge (and nomination): `hello@houseofevulv.com`, which forwards to Gmail. Comma-separate for several. |
| `FORMS_FROM` | Sender, on the verified domain: `House of Evulv Website <website@houseofevulv.com>` |
| `ALLOW_INDEXING` | `true` on the production domain at launch only; everything else stays out of search engines |
| `FEATURE_FULL` | `false` (Essentials) |

## Email

The domain's mail is set up outside this code, in Cloudflare, Resend and Gmail:

- **Receiving:** Cloudflare Email Routing forwards `hello@houseofevulv.com` and `info@houseofevulv.com` to `houseofevulv@gmail.com`. Add or change addresses under Cloudflare → houseofevulv.com → Email → Email Routing → Routing rules.
- **Sending:** the domain is verified in Resend (records on the `send.` subdomain). Gmail sends as hello@ and info@ through Resend's SMTP server (`smtp.resend.com`, port 465, username `resend`, password a Resend API key), set under Gmail → Settings → Accounts and Import → Send mail as.
- **Website forms:** each submission arrives in Gmail from `website@houseofevulv.com` as one email, with a reply button (email or WhatsApp). Replying answers the sender directly. A Gmail filter on that address can label them "Website forms". The website has its own Resend API key, so either key can be replaced without affecting the other.
- **DNS:** keep one SPF record on the root domain. DMARC is the `_dmarc` TXT record.

## Deploying

Two branches, two sites:

| Branch | Deploys to | Use |
| --- | --- | --- |
| `main` | Production: `houseofevulv.com` | The live site. Changes arrive only once the owner has approved them on staging. |
| `staging` | A Vercel preview at `<project>-git-staging-<team>.vercel.app` (shown under the branch in the Vercel dashboard) | Testing new work before it goes live. |

Push work to `staging` (or a feature branch merged into it), check it on the preview link, then merge `staging` into `main` (directly or through a pull request) when it is approved. Preview deployments stay out of search engines because `ALLOW_INDEXING` is only set for production.

Pull requests also get their own preview links. Without the Vercel connection, deploy with the Vercel CLI:

```bash
npm run deploy:preview   # private preview link
npm run deploy:prod      # production
```

## Launch checklist

Before go-live:

1. Confirm the venue and set `event.venueConfirmed`.
2. Add the founder's portrait (`founder.photo`) and confirm the name (`founder.nameConfirmed`).
3. Add the payment link (`donate.paymentUrl`) or bank details, and confirm how gifts are used.
4. Add the Resend variables in Vercel, then send one real test pledge and check it arrives.
5. Connect `houseofevulv.com` in Vercel and set `ALLOW_INDEXING=true` for Production.
6. Legal review of the privacy notice and the selection terms.
7. Clear the remaining `TODO(client)` items in the code.
