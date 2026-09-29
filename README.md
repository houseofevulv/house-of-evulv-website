# House of Evulv website

Website for House of Evulv (Lagos) and its first programme, the Sentinels of Peace Grand Honours.

- **Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Server Actions with zod
- **Nominations:** stored in a Google Sheet, with an email alert through Resend
- **Hosting:** Vercel
- **Package:** Essentials. `FEATURE_FULL` stays `false`; see `lib/content.ts`.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/sentinels-of-peace` | Sentinels of Peace, including the nomination form |
| `/our-story` | Our story |
| `/privacy` | Privacy notice (pending legal review) |
| `/nomination-terms` | Nomination terms (pending legal review) |
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

Search the code for `TODO(client)` to find everything still waiting on the client.

## Environment variables

See `.env.example`. Set them in Vercel under Project → Settings → Environment Variables.

| Variable | Purpose |
| --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `NOMINATIONS_SHEET_ID` | Google Sheet for nominations. The sheet needs a tab named `Nominations` with a header row. |
| `RESEND_API_KEY`, `NOMINATIONS_ALERT_TO`, `NOMINATIONS_FROM` | Email alert for each nomination |
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
3. Add the Google Sheet and Resend variables, then send one real test nomination.
4. Connect `houseofevulv.com` in Vercel and set `ALLOW_INDEXING=true` for Production.
5. Legal review of the privacy notice and nomination terms.
