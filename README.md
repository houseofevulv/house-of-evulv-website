# House of Evulv website

Website for House of Evulv (Lagos) and its first programme, the Sentinels of Peace Grand Honours.

- **Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Server Actions with zod
- **Brand:** House of Evulv Identity 2. The manual and source files are in `brand identity assets/`; the site uses the SVGs in `public/brand` through `components/Logo.tsx`, and the palette and type in `app/globals.css`. The earlier forest-and-lime design is kept on the `previously-used` branch.
- **2026 edition:** honourees are **selected**, not publicly nominated. `nominations.public` is `false` in `content/site-content.json`, which hides the nomination form and shows a support pledge form in its place. Set it to `true` to bring public nominations back in a future edition.
- **Forms:** support pledges (and, when switched on, nominations) are stored in a Google Sheet, with an email alert through Resend
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

Without the Google and Resend keys, the form still works in development: it logs a warning and issues test reference numbers instead of saving.

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
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `NOMINATIONS_SHEET_ID` | The Google Sheet. It needs a tab named `Support` (columns: timestamp, name, organisation, contact, how they want to help, amount, message, consent, user agent) and, for editions with public nominations, a tab named `Nominations`. Each tab needs a header row. |
| `RESEND_API_KEY`, `NOMINATIONS_ALERT_TO`, `NOMINATIONS_FROM` | Email alert for each pledge (and nomination) |
| `ALLOW_INDEXING` | `true` on the production domain at launch only; everything else stays out of search engines |
| `FEATURE_FULL` | `false` (Essentials) |

## Deploying

Pushes to `main` deploy to production once the repository is connected to Vercel; pull requests get preview links. Without the connection, deploy with the Vercel CLI:

```bash
npm run deploy:preview   # private preview link
npm run deploy:prod      # production
```

## Launch checklist

The full brief and acceptance checklist are in `CLAUDE.md`. Before go-live:

1. Confirm the venue and set `event.venueConfirmed`.
2. Replace the founder stand-in photo (`founder.photo`) and confirm his name.
3. Add the Google Sheet and Resend variables, then send one real test pledge.
4. Connect `houseofevulv.com` in Vercel and set `ALLOW_INDEXING=true` for Production.
5. Legal review of the privacy notice and nomination terms.
