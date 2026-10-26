# House of Evulv website: owner's guide

This is the plain-language guide for House of Evulv. A developer working on the code should read `README.md`.

## What you own

| What | Where it lives | What it does |
| --- | --- | --- |
| The domain, houseofevulv.com | Cloudflare | The web address, its DNS records and email forwarding |
| Email inbox | Gmail: houseofevulv@gmail.com | Receives hello@ and info@ mail and every form submission |
| The website's code | GitHub: the `house-of-evulv` repository | Every page, photo, video and logo file, and its full history |
| Hosting | Vercel: the `house-of-evulv` project | Puts the site online and keeps it running |
| Sending email | Resend | Sends the form emails, and hello@ mail sent from Gmail |
| Brand files | The `brand identity assets` folder in the repository | Logos in every colour, animations, the brand manual |

All of these should sit under the House's own email (houseofevulv@gmail.com), with two-step verification switched on.

## What it costs

- **Domain:** renews once a year with Cloudflare, about US$10 to 15. Keep a card on the Cloudflare account. If the domain lapses, the site and the email stop working.
- **Hosting, email sending and code:** free at the current traffic. Vercel's free plan is meant for non-commercial use. If Vercel asks for an upgrade (its Pro plan is about US$20 a month), that is a choice for the House to make.
- **Videos** on the 100 Days of Peace page are served from the website itself. If they draw very heavy traffic, moving them to YouTube keeps hosting free.

## Everyday questions

- **Where do website messages go?** Every pledge, nomination and invitation arrives in the Gmail inbox from website@houseofevulv.com. Press Reply to answer the person directly.
- **How do we send from hello@?** In Gmail, choose hello@houseofevulv.com in the "From" line when writing.
- **How do we change text, dates, photos or videos?** Almost everything lives in one file in the repository, `content/site-content.json`. A developer can change it in minutes; every change goes live automatically about a minute after it is saved.

## If something stops working

| Problem | First check |
| --- | --- |
| A form says "We couldn't send" | Vercel → Settings → Environment Variables: `RESEND_API_KEY` and `FORMS_ALERT_TO` must be set. Then Vercel → Logs, and look for a line starting `[support]`, `[invite]` or `[peacemaker]`. |
| No email arrives at hello@ or info@ | Cloudflare → Email → Email Routing: the routes are switched on and the Gmail address is verified. |
| Shared links show no preview | Paste the link into the Facebook Sharing Debugger and press "Scrape Again". |
| The site is down | Vercel → Deployments: the latest one should say Ready. Redeploy the last working one if not. Check the domain has not lapsed in Cloudflare. |

## Handover checklist

The developer completes these with the House on a short call.

1. **GitHub:** transfer the `house-of-evulv` repository to the House's GitHub account (Settings → Danger Zone → Transfer).
2. **Vercel:** transfer the project to the House's Vercel account (Project → Settings → Transfer), then reconnect it to the moved repository. The settings travel with the project; check them afterwards.
3. **Resend:** create a Resend account for the House, verify houseofevulv.com there, make a new API key, put it in Vercel as `RESEND_API_KEY`, redeploy, then delete the old key. Use a second key for Gmail's "Send mail as".
4. **Cloudflare and Gmail:** already the House's. Change any password the developer has known.
5. **Check:** send one test from each form and one email to hello@. Everything should arrive in Gmail.
6. **Remove the developer** from every account, unless the House is paying for ongoing support.
7. **Sign off:** the House confirms in writing that the site and accounts were received, with the date. Support runs from that date.

## Still to come from the House

The venue confirmation, the founder's portrait, the payment link, a legal review of the privacy notice and selection terms, and real campaign figures and voices (with consent). Each one is a small change once supplied.
