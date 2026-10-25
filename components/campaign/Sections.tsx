/* eslint-disable @next/next/no-img-element -- the helmet crops position the full cut-out inside a frame */
import Image from "next/image";
import Link from "next/link";
import { Logo, type LogoName } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";
import { CAMPAIGN_DAYS, campaignDay } from "@/lib/campaign";
import { campaign, contact, event, site, states } from "@/lib/content";
import { todayInLagos } from "@/lib/dates";
import { InviteForm, PeacemakerForm } from "./Forms";
import { Player } from "./Player";

const instagram = contact.social.find((s) => s.platform === "instagram")?.url;

/** One square per day of the hundred: gold behind, ivory today, outlined ahead */
function Ledger({ day, className = "" }: { day: number; className?: string }) {
  return (
    <div role="img" aria-label={`Day ${day} of ${CAMPAIGN_DAYS}`} className={`grid grid-cols-10 gap-[5px] md:gap-[7px] lg:gap-2 ${className}`}>
      {Array.from({ length: CAMPAIGN_DAYS }, (_, i) => {
        const n = i + 1;
        const cls =
          n < day
            ? "border-gold bg-gold"
            : n === day
              ? "border-ivory bg-ivory shadow-[0_0_0_2px_#0c1529,0_0_0_4px_#d0a94f]"
              : "border-rule-dark-2";
        return <span key={n} className={`aspect-square rounded-[3px] border md:rounded-[4px] ${cls}`} />;
      })}
    </div>
  );
}

export function CampaignHero() {
  const { day, left } = campaignDay(todayInLagos());
  return (
    <section className="on-dark relative flex flex-col overflow-clip rounded-[22px] bg-espresso text-ivory md:rounded-[28px]">
      <SiteHeader variant="page" onPanel />
      <div id="content" className="grid grid-cols-1 gap-10 px-5 pt-6 pb-12 md:gap-12 md:px-8 md:pt-10 md:pb-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-12 lg:pb-20">
        <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-7">
          <h1 className="t-home-display m-0 text-ivory">
            100 Days
            <br />
            of Peace
          </h1>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.55] text-on-dark-2 md:text-xl">{campaign.lede}</p>
          <p className="t-display m-0 text-[22px] leading-none text-gold md:text-[28px] lg:text-[30px]">{campaign.hashtag}</p>
          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap">
            <a href="#invite" className="btn min-h-12 bg-gold px-6 py-3.5 font-bold text-black">
              Invite the campaign
            </a>
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="btn min-h-12 border border-ivory px-6 py-3.5 font-semibold text-ivory">
                Follow on Instagram<span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 pt-2 md:grid md:grid-cols-[minmax(0,380px)_minmax(0,1fr)] md:items-center md:gap-10 lg:col-span-5 lg:flex lg:w-full lg:max-w-[420px] lg:items-stretch lg:justify-self-end lg:pt-0">
          <Ledger day={day} />
          <div className="flex items-end justify-between gap-4 md:flex-col md:items-start md:gap-3">
            <p className="t-display m-0 text-[40px] leading-[0.9] whitespace-nowrap text-gold md:text-[56px] lg:text-[60px]">
              {day > 0 ? `Day ${day}` : "Soon"}
            </p>
            <p className="m-0 text-right text-[13px] leading-[1.45] text-on-dark-3 md:text-left md:text-[15px]">
              <strong className="text-ivory">{left > 0 ? `${left} ${left === 1 ? "day" : "days"} to the Grand Honours` : "The Grand Honours"}</strong>
              <br />
              {event.ceremonyDateDisplay}, Lagos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The campaign film, on its own: wide, dark and loud, with the ask beside it */
export function CampaignFilm() {
  const film = campaign.film;
  if (!film) return null;
  return (
    <section aria-label="The campaign film" className="on-dark flex flex-col gap-6 rounded-[22px] bg-black p-2 pb-8 text-ivory md:gap-8 md:rounded-[28px] md:p-3 md:pb-10 lg:p-4 lg:pb-12">
      <Player src={film.src} poster={film.poster} label={film.title} big className="aspect-[4/5] w-full rounded-[16px] sm:aspect-video md:rounded-[22px]">
        <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 md:p-8 lg:p-12">
          <span className="text-sm font-semibold text-gold md:text-base">Watch the film · {film.length}</span>
          <span className="t-display max-w-[900px] text-[30px] leading-[1.02] text-ivory sm:text-[40px] md:text-[56px] lg:text-[72px]">{campaign.tagline}</span>
        </span>
      </Player>
      <div className="flex flex-col gap-4 px-3 md:flex-row md:items-center md:justify-between md:px-5 lg:px-8">
        <p className="m-0 max-w-[620px] text-base leading-[1.6] text-on-dark-2 md:text-lg">
          Know someone who keeps the peace? Tell us about them, and the campaign will find them before 12 December.
        </p>
        <a href="#nominate" className="btn min-h-[52px] shrink-0 self-start bg-gold px-7 font-bold text-black md:self-auto">
          Nominate someone
        </a>
      </div>
    </section>
  );
}

export function CampaignStatement() {
  const photo = campaign.photos.statement;
  return (
    <section className="grid grid-cols-1 gap-8 rounded-[22px] bg-white p-5 pb-10 md:rounded-[28px] md:p-8 md:pb-14 lg:grid-cols-12 lg:items-center lg:gap-16 lg:p-4 lg:pr-16">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={1600}
        height={1200}
        sizes="(min-width: 64rem) 45vw, 100vw"
        style={{ objectPosition: photo.position ?? "50% 40%" }}
        className="aspect-[4/3] h-auto w-full rounded-[16px] object-cover lg:col-span-6 lg:rounded-[22px]"
      />
      <div className="flex flex-col gap-6 lg:col-span-6 lg:py-16">
        <h2 className="t-h2-48 m-0 text-ink">Peace is learned before it is honoured.</h2>
        <p className="m-0 text-[17px] leading-[1.65] text-body md:text-lg">{campaign.statement}</p>
        {campaign.figures.length > 0 && (
          <dl className="m-0 grid grid-cols-3 gap-4">
            {campaign.figures.map((f) => (
              <div key={f.label} className="flex flex-col-reverse gap-1.5">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="t-display m-0 text-[28px] leading-none text-ink md:text-[40px]">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <ul className="m-0 flex list-none flex-col gap-5 p-0 pt-2">
          {campaign.streams.map((st) => (
            <li key={st.title} className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 gap-y-1">
              <Logo name={ELEMENTS_LIGHT[st.element]} alt="" className="row-span-2 h-auto w-10" />
              <h3 className="m-0 text-[17px] leading-[1.3] font-bold text-ink">{st.title}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-body">{st.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const ELEMENTS_LIGHT: Record<"dove" | "lotus" | "tree", LogoName> = { dove: "doveLight", lotus: "lotusLight", tree: "treeLight" };

/** Campaign stories as tall tiles, the way they are shot: vertical clips and photos side by side */
export function CampaignUpdates() {
  const tiles = campaign.updates.slice(0, 3);
  if (!tiles.length) return null;
  return (
    <section className="flex flex-col gap-6 rounded-[22px] bg-sand p-5 pt-10 md:gap-8 md:rounded-[28px] md:p-8 md:pt-14 lg:p-12 lg:pt-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
        <h2 className="t-h2-48 m-0 text-ink">From the road</h2>
        <p className="m-0 max-w-[460px] text-base leading-[1.6] text-body">{campaign.hashtag} on Instagram and TikTok, every day until the Grand Honours.</p>
      </div>
      <ul className="no-scrollbar -mx-5 m-0 flex snap-x snap-mandatory list-none gap-3 overflow-x-auto scroll-px-5 p-0 px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 lg:gap-6">
        {tiles.map((t) => {
          const caption = (
            <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 text-left md:p-5">
              <span className="t-display text-[18px] leading-[1.15] text-ivory md:text-[22px]">{t.title}</span>
              <span className="text-sm leading-[1.45] text-on-dark">{t.text}</span>
            </span>
          );
          return (
            <li key={t.title} className="w-[78%] shrink-0 snap-start md:w-auto">
              {t.video && t.poster ? (
                <Player src={t.video} poster={t.poster} label={t.title} className="aspect-[9/16] w-full rounded-[16px] md:rounded-[20px]">
                  {caption}
                </Player>
              ) : t.photo ? (
                <figure className="relative m-0 aspect-[9/16] w-full overflow-hidden rounded-[16px] md:rounded-[20px]">
                  <Image src={t.photo} alt={t.alt} fill sizes="(min-width: 48rem) 32vw, 78vw" style={{ objectPosition: t.position ?? "50% 40%" }} className="object-cover" />
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/85 to-transparent" />
                  <figcaption>{caption}</figcaption>
                </figure>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function CampaignVoices() {
  if (!campaign.voices.length) return null;
  return (
    <section className="flex flex-col gap-8 rounded-[22px] bg-sand px-5 py-12 md:gap-10 md:rounded-[28px] md:px-8 md:py-[72px] lg:gap-12 lg:px-12 lg:py-24">
      <h2 className="t-h2-48 m-0 text-ink">Voices of peace</h2>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:gap-x-5 md:gap-y-8 lg:grid-cols-4 lg:gap-6">
        {campaign.voices.map((v) => (
          <figure key={v.quote} className="m-0 flex flex-col gap-3 md:gap-4">
            {v.photo && (
              <Image src={v.photo} alt={v.name ? `Portrait of ${v.name}` : ""} width={480} height={600} sizes="(min-width: 64rem) 22vw, 45vw" className="aspect-[4/5] h-auto w-full rounded-[14px] object-cover md:rounded-[18px]" />
            )}
            <blockquote className="m-0 text-[15px] leading-[1.45] text-ink md:text-[17px] md:leading-[1.5]">“{v.quote}”</blockquote>
            <figcaption className="text-[13px] leading-[1.4] text-body md:text-sm">
              <strong>{v.name ?? v.role}</strong>
              <br />
              {v.name ? `${v.role}, ${v.place}` : v.place}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** The helmet of one of the seal's knights, cropped from its clean cut-out (406 by 900, the helmet a 150px square) */
function Helmet({ side, className }: { side: "left" | "right"; className: string }) {
  const k = side === "left" ? { src: "/brand/sentinels/sentinels-of-peace_knight-left-clean.webp", x: 192, y: 98, w: 406 } : { src: "/brand/sentinels/sentinels-of-peace_knight-right-clean.webp", x: 68, y: 105, w: 398 };
  const pct = (n: number) => `${(n / 150) * 100}%`;
  return (
    <div aria-hidden="true" className={`overflow-hidden [mask-image:linear-gradient(to_bottom,#000_72%,transparent)] ${className}`}>
      <img src={k.src} alt="" className="absolute h-auto max-w-none" style={{ left: `-${pct(k.x)}`, top: `-${pct(k.y)}`, width: pct(k.w) }} />
    </div>
  );
}

export function CampaignNominate() {
  return (
    <section id="nominate" className="relative flex scroll-mt-4 flex-col gap-8 overflow-hidden rounded-[22px] bg-gold px-5 pt-36 pb-12 text-black md:gap-9 md:rounded-[28px] md:px-8 md:pt-[156px] md:pb-[72px] lg:gap-10 lg:px-[220px] lg:pt-[184px] lg:pb-[104px]">
      <Helmet side="left" className="absolute top-7 left-5 size-24 md:top-7 md:left-7 md:size-[104px] lg:top-10 lg:left-10 lg:size-[120px]" />
      <Helmet side="right" className="absolute top-7 right-5 size-24 md:top-7 md:right-7 md:size-[104px] lg:top-10 lg:right-10 lg:size-[120px]" />
      <div className="flex flex-col gap-4 md:gap-5">
        <h2 className="t-h2-48 m-0 text-black">Who keeps the peace around you?</h2>
        <p className="m-0 max-w-[720px] text-[17px] leading-[1.6] text-black">
          Someone who stands for peace, promotes understanding, resolves conflict and brings people together, at work, in
          the community or at school. Tell us about them. Within the 100 days, we will find them, tell their story and
          celebrate them.
        </p>
      </div>
      <PeacemakerForm />
    </section>
  );
}

export function CampaignInvite() {
  return (
    <section id="invite" className="on-dark flex scroll-mt-4 flex-col items-center gap-8 rounded-[22px] bg-espresso px-5 py-12 text-center text-ivory md:gap-10 md:rounded-[28px] md:px-8 md:py-[72px] lg:py-24">
      <div className="flex max-w-[640px] flex-col items-center gap-4">
        <h2 className="t-h2-48 m-0 text-ivory">Want us to come to you?</h2>
        <p className="m-0 text-base leading-[1.6] text-on-dark-2 md:text-[17px]">
          The {campaign.name} campaign is on the move. Fill in your details and we may bring it to your school, community or
          organisation.
        </p>
      </div>
      <div className="w-full max-w-[760px] text-left">
        <InviteForm states={states} />
      </div>
    </section>
  );
}

export function CampaignClose() {
  const share = `https://wa.me/?text=${encodeURIComponent(`${campaign.name}: ${campaign.tagline} ${campaign.hashtag} ${site.url}/100-days-of-peace`)}`;
  const photo = campaign.photos.closing;
  return (
    <section className="on-dark relative flex min-h-[480px] flex-col justify-end overflow-hidden rounded-[22px] text-ivory md:min-h-[520px] md:rounded-[28px] lg:min-h-[560px]">
      <Image src={photo.src} alt={photo.alt} fill sizes="100vw" style={{ objectPosition: photo.position ?? "50% 50%" }} className="object-cover" />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
      <div className="relative flex flex-col gap-6 p-5 pb-8 md:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:p-12">
        <div className="flex flex-col gap-3">
          <p className="t-display m-0 text-[20px] text-gold md:text-[26px]">{campaign.hashtag}</p>
          <h2 className="t-display m-0 max-w-[720px] text-[28px] leading-[1.1] text-ivory md:text-[40px] lg:text-[48px]">
            The hundred days end on the night the Sentinels are honoured.
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <Link href="/sentinels-of-peace" className="btn min-h-[52px] bg-gold px-6 font-bold text-black">
            Sentinels of Peace
          </Link>
          <a href={share} target="_blank" rel="noopener noreferrer" className="btn min-h-[52px] border border-ivory px-6 font-bold text-ivory">
            Share on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
