/* eslint-disable @next/next/no-img-element -- the helmet crops position the full cut-out inside a frame */
import Image from "next/image";
import Link from "next/link";
import { Logo, type LogoName } from "@/components/Logo";
import { SiteHeader } from "@/components/SiteHeader";
import { CAMPAIGN_DAYS, campaignDay } from "@/lib/campaign";
import { campaign, contact, event, site, states } from "@/lib/content";
import { todayInLagos } from "@/lib/dates";
import { InviteForm, PeacemakerForm } from "./Forms";

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
      <SiteHeader variant="page" />
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
        <div className="flex flex-col gap-6 border-t border-rule-dark pt-8 md:grid md:grid-cols-[minmax(0,380px)_minmax(0,1fr)] md:items-center md:gap-10 lg:col-span-5 lg:flex lg:w-full lg:max-w-[420px] lg:items-stretch lg:justify-self-end lg:border-0 lg:pt-0">
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

export function CampaignStatement() {
  return (
    <section className="grid grid-cols-1 gap-8 rounded-[22px] bg-white px-5 py-12 md:rounded-[28px] md:px-8 md:py-[72px] lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-24">
      <h2 className="t-h2-48 m-0 text-ink lg:col-span-5">Peace is learned before it is honoured.</h2>
      <div className="flex flex-col gap-8 lg:col-span-7">
        <p className="m-0 text-[17px] leading-[1.65] text-body md:text-lg">{campaign.statement}</p>
        <p className="m-0 text-base font-semibold text-ink">{campaign.tagline}</p>
        {campaign.figures.length > 0 && (
          <dl className="m-0 grid grid-cols-1 border-t border-rule md:grid-cols-3 md:gap-6 md:pt-8">
            {campaign.figures.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-rule py-4 md:flex-col-reverse md:items-start md:justify-end md:gap-1.5 md:border-0 md:py-0">
                <dt className="text-[15px] text-muted">{f.label}</dt>
                <dd className="t-display m-0 text-[30px] leading-none text-ink md:text-[40px] lg:text-[48px]">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

const ELEMENTS: Record<"dove" | "lotus" | "tree", LogoName> = { dove: "doveMetallic", lotus: "lotusMetallic", tree: "treeMetallic" };

export function CampaignStreams() {
  return (
    <section className="on-dark grid grid-cols-1 gap-3 rounded-[22px] bg-black px-5 py-12 text-ivory md:gap-4 md:rounded-[28px] md:px-8 md:py-[72px] lg:grid-cols-3 lg:gap-6 lg:px-12 lg:py-24">
      {campaign.streams.map((s) => (
        <div key={s.title} className="grid grid-cols-[56px_minmax(0,1fr)] gap-x-5 gap-y-3 rounded-[18px] border border-rule-dark p-6 md:grid-cols-[72px_minmax(0,1fr)] md:p-7 lg:flex lg:flex-col lg:gap-5 lg:p-8">
          <Logo name={ELEMENTS[s.element]} alt="" className="row-span-2 h-auto w-[52px] md:w-[64px] lg:w-[72px]" />
          <h3 className="t-display m-0 text-[21px] leading-[1.15] text-ivory md:text-2xl lg:text-[26px]">{s.title}</h3>
          <p className="m-0 text-[15px] leading-[1.6] text-on-dark-2 md:text-base">{s.body}</p>
        </div>
      ))}
    </section>
  );
}

export function CampaignUpdates() {
  const updates = campaign.updates.slice(0, 3);
  if (!updates.length && !campaign.videos.length) return null;
  return (
    <section className="flex flex-col gap-8 rounded-[22px] bg-white px-5 py-12 md:gap-10 md:rounded-[28px] md:px-8 md:py-[72px] lg:gap-12 lg:px-12 lg:py-24">
      <h2 className="t-h2-48 m-0 text-ink">From the road</h2>
      <div className="grid grid-cols-1 gap-10 md:gap-8 lg:grid-cols-3 lg:gap-6">
        {updates.map((u) => (
          <article key={u.title} className="grid grid-cols-1 gap-4 md:grid-cols-[300px_minmax(0,1fr)] md:items-center md:gap-6 lg:flex lg:flex-col lg:items-stretch lg:gap-4">
            {u.video ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${u.video}`}
                title={u.title}
                loading="lazy"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-[4/3] w-full rounded-[16px] border-0 bg-black lg:rounded-[18px]"
              />
            ) : u.photo ? (
              <Image
                src={u.photo}
                alt={u.alt}
                width={1200}
                height={900}
                sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 300px, 100vw"
                className="aspect-[4/3] h-auto w-full rounded-[16px] object-cover object-top lg:rounded-[18px]"
              />
            ) : null}
            <div className="flex flex-col gap-2.5">
              <h3 className="m-0 text-[19px] leading-[1.3] font-bold text-ink md:text-[21px]">{u.title}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-body md:text-base">{u.text}</p>
            </div>
          </article>
        ))}
      </div>
      {campaign.videos.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {campaign.videos.map((id) => (
            <iframe
              key={id}
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              title={`${campaign.name} video`}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full rounded-[16px] border-0 bg-black"
            />
          ))}
        </div>
      )}
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
      <div aria-hidden="true" className="absolute top-[76px] right-[140px] left-[140px] h-px bg-black/25 md:top-[80px] md:right-[160px] md:left-[160px] lg:top-[100px] lg:right-[184px] lg:left-[184px]" />
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
    <section id="invite" className="on-dark grid scroll-mt-4 grid-cols-1 gap-8 rounded-[22px] bg-espresso px-5 py-12 text-ivory md:gap-9 md:rounded-[28px] md:px-8 md:py-[72px] lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-24">
      <div className="flex flex-col gap-4 lg:col-span-5">
        <h2 className="t-h2-48 m-0 text-ivory">Want us to come to you?</h2>
        <p className="m-0 text-base leading-[1.6] text-on-dark-2 md:text-[17px]">
          The {campaign.name} campaign is on the move. Fill in your details and we may bring it to your school, community or
          organisation.
        </p>
      </div>
      <div className="lg:col-span-7">
        <InviteForm states={states} />
      </div>
    </section>
  );
}

export function CampaignClose() {
  const share = `https://wa.me/?text=${encodeURIComponent(`${campaign.name}: ${campaign.tagline} ${campaign.hashtag} ${site.url}/100-days-of-peace`)}`;
  return (
    <section className="flex flex-col gap-6 rounded-[22px] bg-white px-5 py-11 md:rounded-[28px] md:px-8 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-20">
      <h2 className="t-display m-0 max-w-[640px] text-[24px] leading-[1.15] text-ink md:text-[32px] lg:text-[36px]">
        The hundred days end on the night the Sentinels are honoured.
      </h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/sentinels-of-peace" className="btn min-h-[52px] bg-espresso px-6 font-bold text-ivory">
          Sentinels of Peace
        </Link>
        <a href={share} target="_blank" rel="noopener noreferrer" className="btn min-h-[52px] border border-espresso px-6 font-bold text-ink">
          Share on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
