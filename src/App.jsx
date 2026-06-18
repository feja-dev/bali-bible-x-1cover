import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  DollarSign,
  FileText,
  Globe,
  Mail,
  Smartphone,
  TrendingUp,
} from "lucide-react";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const SERIF = { fontFamily: "Playfair Display, Georgia, serif" };
const TEAL = "#2BCDC4";

// ─── Campaign imagery — swap null for Cloudinary URLs when ready ────────────
const IMAGES = {
  hero: null,          // Prompt 1 — cinematic scooter/rice terraces, 4:5 or 3:4
  feedPost: null,      // Prompt 2 — Instagram feed post, 4:5
  reelCover: null,     // Prompt 3 — Reel/Story cover, 9:16
  moodboard: null,     // Prompt 4 — flat-lay moodboard, 16:9
};

// ─── Content series data ────────────────────────────────────────────────────
const contentSeries = [
  {
    id: "Scooter Culture",
    month: "July",
    concept: "Celebrates the freedom and authenticity of scooter travel in Bali — from routes and rituals to the unwritten rules of navigating the island.",
    why: "Scooter content is among the most watched and shared travel formats for Bali. It taps into the travel fantasy while giving 1Cover a natural, non-pushy entry point around ride cover.",
    how: "Lifestyle reels of scooter journeys through rice paddies and laneways; Story polls asking 'would you scooter in Bali?'; TikTok POV footage with honest captions.",
    formats: ["Instagram Reel", "Instagram Story", "Facebook Post", "TikTok Video"],
    visual: "Golden hour scooter journeys, POV riding footage, candid smiles at temples and laneways, the quiet joy of self-directed travel.",
    images: [
      "https://res.cloudinary.com/dfers76ex/image/upload/q_auto/f_auto/v1781748104/BB_IG_Story_waouye.png",
      "https://res.cloudinary.com/dfers76ex/image/upload/q_auto/f_auto/v1781753380/scooter_ubohjl.png",
    ],
  },
  {
    id: "Adventure Travel",
    month: "August",
    concept: "Frames Bali as a destination for genuine adventure — waterfalls, jungle treks, volcanic hikes and experiences that push travellers beyond the resort strip.",
    why: "Adventure content performs strongly with the 25–40 demographic seeking authentic experiences. 1Cover's activity cover becomes a genuinely useful product, not an upsell.",
    how: "Reel-style adventure montages; before/after Story formats ('what I planned vs what happened'); inspirational carousel posts with destination tips.",
    formats: ["Instagram Reel", "Instagram Story", "Facebook Post"],
    visual: "Dramatic landscapes, action photography, rivers and waterfalls, smiling faces mid-adventure, wide shots with scale that shows the enormity of the experience.",
    images: [
      "https://res.cloudinary.com/dfers76ex/image/upload/q_auto/f_auto/v1781748106/BB_TikTok_u3xlqk.png",
      "https://res.cloudinary.com/dfers76ex/image/upload/q_auto/f_auto/v1781749431/IG_Story_2_faol6j.png",
    ],
  },
  {
    id: "When Things Go Wrong",
    month: "September",
    concept: "An honest, empathetic look at the travel moments that don't go to plan — and how being prepared makes all the difference.",
    why: "Travel insurance decisions are driven by past experience and anxiety. This series meets travellers where they are, creating an emotional connection with 1Cover's core brand promise.",
    how: "Story-format personal anecdotes; 'things to know before you go' educational reels; reassuring, solutions-focused messaging delivered with a light touch.",
    formats: ["Instagram Reel", "Instagram Story", "Facebook Post", "eDM"],
    visual: "Authentic and candid — a traveller on the phone, a scooter beside a roadside mechanic, a moment of unexpected calm. Warm, reassuring tones that feel real, not staged.",
    images: [
      "https://res.cloudinary.com/dfers76ex/image/upload/q_auto/f_auto/v1781752695/wcgw2_pfcd2g.png",
      "https://res.cloudinary.com/dfers76ex/image/upload/q_auto/f_auto/v1781753515/whenthings_go_wrong_ssyarp.png",
    ],
  },
];

function ImgPlaceholder({ aspectClass = "aspect-[3/4]", label = "Image coming" }) {
  return (
    <div className={`${aspectClass} w-full overflow-hidden rounded-2xl bg-[#f0f0f0] flex flex-col items-center justify-center gap-2`}>
      <Camera size={20} className="text-[#ccc]" />
      <span className="text-xs tracking-wider text-[#ccc] uppercase">{label}</span>
    </div>
  );
}

function CampaignImage({ src, alt, aspectClass = "aspect-[3/4]", label }) {
  if (!src) return <ImgPlaceholder aspectClass={aspectClass} label={label} />;
  return (
    <div className={`${aspectClass} w-full overflow-hidden rounded-2xl`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

function HeroImage() {
  return (
    <CampaignImage
      src={IMAGES.hero}
      alt="Bali campaign hero"
      aspectClass="aspect-[3/4]"
      label="Hero image coming"
    />
  );
}

// ─── Shared UI ─────────────────────────────────────────────────────────────────

function Eyebrow({ children }) {
  return (
    <p className="mb-3 text-xs uppercase tracking-widest text-[#2BCDC4]">{children}</p>
  );
}

function SectionTitle({ eyebrow, title, copy }) {
  return (
    <div className="mb-10 max-w-4xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-[2.2rem] font-light leading-tight text-[#1a1a1a] md:text-[2.8rem]" style={SERIF}>
        {title}
      </h2>
      {copy && <p className="mt-5 max-w-2xl text-base leading-7 text-[#666]">{copy}</p>}
    </div>
  );
}

function Card({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
      {Icon && (
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2BCDC4] text-white">
            <Icon size={17} />
          </div>
          <h3 className="text-sm font-medium text-[#1a1a1a]">{title}</h3>
        </div>
      )}
      {!Icon && title && <h3 className="mb-4 text-sm font-medium text-[#1a1a1a]">{title}</h3>}
      <div className="text-sm leading-6 text-[#666]">{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm leading-6 text-[#555]">
          <CheckCircle2 className="mt-0.5 shrink-0 text-[#2BCDC4]" size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TBD({ children }) {
  return (
    <span className="inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
      {children}
    </span>
  );
}

// Temporary review marker — remove once approved
function Updated({ children }) {
  return (
    <span style={{ textDecorationLine: "underline", textDecorationColor: "#2BCDC4", textDecorationThickness: "2px", textUnderlineOffset: "3px" }}>
      {children}
    </span>
  );
}

function SubTabBar({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] p-1.5">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`shrink-0 rounded-lg px-4 py-2 text-sm transition ${
            active === tab
              ? "bg-[#2BCDC4] text-white font-medium"
              : "text-[#666] hover:bg-[#e5e5e5] hover:text-[#1a1a1a]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─── Section content ───────────────────────────────────────────────────────────

function SituationContent() {
  return (
    <div>
      <SectionTitle
        eyebrow="1Cover X The Bali Bible Campaign Strategy"
        title="Situation & Overview"
        copy="A brand awareness campaign leveraging the creative development and distribution of The Bali Bible, and intertwining the 1Cover brand story, key messages and product focus areas to drive awareness and product consideration."
      />
    </div>
  );
}

function GoalsContent() {
  return (
    <div>
      <SectionTitle title="Goals & Objectives" />
      <div className="grid gap-4 md:grid-cols-3">
        <Card icon={Globe} title="Awareness, Traffic and Reach">
          <Updated>Drive meaningful brand awareness for 1Cover across The Bali Bible's highly engaged audience of Australian Bali travellers — reaching them at the point of travel inspiration and planning.</Updated>
        </Card>
        <Card icon={DollarSign} title="Ultimately — Sales">
          <Updated>While The Bali Bible's focus is reach and distribution, 1Cover's goal is conversion — turning awareness into policy purchases from an audience actively planning Bali travel.</Updated>
        </Card>
        <Card icon={TrendingUp} title="Social Media Growth and Chatter">
          <Updated>Generate online conversation and community engagement around 1Cover within Australia's Bali travel community, building brand familiarity and trust through relevant, editorial-led content.</Updated>
        </Card>
      </div>
    </div>
  );
}

function MessagingContent() {
  return (
    <div>
      <SectionTitle title="Key Messaging" />
      <div className="space-y-5">
        <div className="rounded-2xl border border-[#1a1a1a]/12 bg-[#1a1a1a] p-8">
          <Eyebrow>Brand Tagline</Eyebrow>
          <p className="text-[1.9rem] font-light leading-snug text-white" style={SERIF}>
            'The 1 thing you need when 1 thing goes wrong'
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card title="Brand Messaging">
            <BulletList items={[
              "Being around for 20 years.",
              "Aussie owned, Customer service in AU,",
              "We consider ourselves a premium brand, however we are reasonably priced, so value is still a message.",
              "backed by global, 14 day cooling off, and these are all part of the piece of mind,",
              "we win lots of awards such as finder etc. etc.",
              "Flexible quoting",
            ]} />
          </Card>
          <div className="space-y-4">
            <Card title="Product Messaging">
              <BulletList items={[
                "The things that go wrong in Bali",
                "For example - if you're admitted into hospital with Bali Belly.",
                "Cover up to 125,000 per week, most people buy comprehensive - add ons are for: motorbike within a certain CC are automatic, some adventure are covered, renting a vehicle you pay more.. Scooter included.",
              ]} />
            </Card>
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5">
              <p className="mb-2 text-sm font-medium text-[#1a1a1a]">* Mandatory claims or compliance requirements</p>
              <p className="text-sm leading-6 text-[#666]">
                Written in a factual nature, can't provide any advice - one cover covers this - is fine. For example.
              </p>
            </div>
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5">
              <p className="mb-2 text-sm font-medium text-[#1a1a1a]">Trust Messaging</p>
              <p className="text-sm leading-6 text-[#666]">
                'We've covered millions of travellers' — 4.2 from over 5000 reviews on product review. 24/7 emergency assistance anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceContent() {
  const segments = [
    {
      label: "Age & Demographics",
      text: <Updated>25–45 is the sweet spot — broad appeal across genders. Travel insurance uptake is lower with families, though there may be an opportunity to speak to that segment given 1Cover's competitive family pricing.</Updated>,
    },
    {
      label: "Geography",
      text: <Updated>National audience. Perth has a higher rate of Bali travel, but the campaign targets Australians across all states planning or considering a Bali trip.</Updated>,
    },
    {
      label: "Purchase Behaviour",
      text: <Updated>High intent, last-minute buyers. Most purchase within a week of departure — sometimes at the airport. Messaging should meet them in that window, creating urgency without friction.</Updated>,
    },
  ];
  return (
    <div>
      <SectionTitle title="1Cover Target Audience" />
      <div className="max-w-2xl space-y-4">
        {segments.map(({ label, text }) => (
          <div key={label} className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#2BCDC4]">{label}</p>
            <p className="text-base leading-7 text-[#1a1a1a]">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScopeContent() {
  return (
    <div>
      <SectionTitle title="Scope" />
      <div className="grid gap-4 md:grid-cols-2">
        <Card icon={FileText} title="Editorial & Content">
          <BulletList items={[
            "3x Sponsored Editorial Articles (SEO optimised with backlinks)",
            "Inclusion in 1x trending listicle articles",
            "Boosting applied to all articles",
          ]} />
        </Card>
        <Card icon={Smartphone} title="Social Media">
          <BulletList items={[
            "3x Instagram Feed / Reel Posts",
            "3x Instagram Stories",
            "3x Facebook Posts",
            "1x TikTok Video",
            "1x Ad Creative & Campaign Management",
            "$1,500 Paid Boost Budget",
          ]} />
        </Card>
        <Card icon={Mail} title="Email & Website">
          <BulletList items={[
            "2x eDM placements",
            "1x Shared newsletter inclusion",
            "1x Dedicated Solus eDM",
            "Homepage display banner (25% Share of Voice - 1 in 4 weeks per month)",
          ]} />
        </Card>
        <Card icon={Camera} title="Creative">
          <BulletList items={[
            "1x Photography shoot (12 edited images and reels content)",
          ]} />
        </Card>
      </div>
    </div>
  );
}

// ─── Campaign Delivery ─────────────────────────────────────────────────────────

const articles = [
  {
    id: "a1", label: "Article 01 — July",
    month: "July",
    title: "Why Scooters Have Become Part of the Bali Experience",
    paras: [
      "For many travellers, hopping on a scooter is a rite of passage.",
      "It's the freedom to leave the traffic behind, chase a sunset down a side street in Canggu, discover a hidden warung in Uluwatu, or spend an afternoon winding through the rice fields around Ubud. For some, it's their first taste of independence on the island. For others, it's simply the most authentic way to experience Bali's rhythm.",
    ],
    explore: [
      "Why scooter culture is so deeply embedded in Bali",
      "Why visitors love it",
      "The freedom and convenience it offers",
      "The unwritten etiquette of Bali roads",
      "What first-time riders should know",
      "Common mistakes tourists make",
      "How to ride more responsibly",
    ],
    insurance: "While scooters have become synonymous with the Bali experience, it's important to understand local road rules, licensing requirements and what your travel insurance policy does and doesn't cover before you jump on one.",
    deliverables: ["Instagram Reel #1", "Instagram Story #1", "Facebook Post #1", "TikTok post", "Paid Boost Budget", "Dedicated Solus eDM", "Homepage Banner Period 1"],
  },
  {
    id: "a2", label: "Article 02 — August",
    month: "August",
    title: "Why Adventure Travellers Are Falling for the Island",
    paras: [
      "For years, Bali has been synonymous with beach clubs, sunsets and poolside cocktails. But beyond the resorts and rice fields lies another side of the island that's attracting a different kind of traveller.",
      "One chasing waterfalls. Hiking volcanoes before sunrise. Surfing reef breaks. Rafting jungle rivers. Diving alongside manta rays.",
    ],
    explore: [
      "Why Bali has become one of Asia's most accessible adventure destinations",
      "The rise of active travel and experience-led itineraries",
      "The best adventure experiences on the island",
      "How travellers can push beyond the usual tourist checklist",
      "Why Bali appeals to both first-time thrill seekers and seasoned adventurers",
    ],
    insurance: "Whether you're climbing Mount Batur, canyoning through hidden gorges or exploring beneath the surface in Nusa Penida, it's worth checking what's included in your travel insurance policy before booking adventure activities, as cover can vary depending on the experience.",
    deliverables: ["Instagram Reel #2", "Instagram Story #2", "Facebook Post #2", "Shared Newsletter Inclusion", "Homepage Banner Period 2", "Photography shoot"],
  },
  {
    id: "a3", label: "Article 03 — September",
    month: "September",
    title: "When Bali Doesn't Go To Plan — Real Stories From Australian Travellers",
    paras: [
      "Most Bali holidays are remembered for sunsets, beach days and long lunches.",
      "But every now and then, a trip takes an unexpected turn.",
      "A stomach bug becomes a hospital stay. A scooter accident interrupts weeks of travel. A missed connection spirals into a far more complicated journey than anyone anticipated.",
    ],
    explore: [
      "Real travel stories from Australians in Bali",
      "The unexpected situations travellers don't plan for",
      "What happened",
      "How they navigated it",
      "What they wish they'd known beforehand",
      "Practical lessons other travellers can take away",
    ],
    insurance: "While no one books a holiday expecting something to go wrong, these stories are a reminder that preparation can make all the difference when the unexpected happens.",
    deliverables: ["Instagram Reel #3", "Instagram Story #3", "Facebook Post #3", "eDM Placement #2", "Homepage Banner Period 3"],
  },
  {
    id: "bonus", label: "Bonus Idea",
    month: "Bonus (if no case study)",
    title: "The Bali Backup Plan: The Things Smart Travellers Sort Before They Fly",
    paras: [
      "Everyone plans where they'll eat, stay and explore.",
      "Far fewer think about what happens if their luggage disappears, they lose their passport, get sick or need help overseas.",
    ],
    explore: [
      "The practical things seasoned Bali travellers always organise before departure",
      "Documents, emergency contacts and digital backups",
      "Health and medication planning",
      "Connectivity and payments",
      "The right visas",
      "Travel insurance considerations",
    ],
    insurance: null,
    deliverables: [],
  },
];

function EditorialSub() {
  const [active, setActive] = useState("overview");
  const current = articles.find(a => a.id === active);
  const pickerTabs = [{ id: "overview", label: "Overview & Angles" }, ...articles];

  return (
    <div className="space-y-6">
      <SubTabBar
        tabs={pickerTabs.map(t => t.label)}
        active={pickerTabs.find(t => t.id === active)?.label ?? "Overview & Angles"}
        onChange={(label) => {
          const found = pickerTabs.find(t => t.label === label);
          if (found) setActive(found.id);
        }}
      />

      {active === "overview" && (
        <div className="space-y-6">
          <div>
            <p className="mb-4 text-sm font-medium text-[#1a1a1a]">Angles / Stories: Sej to explore:</p>
            <div className="grid grid-cols-3 gap-4">
              {["July Editorial:", "August Editorial:", "September Editorial:"].map(m => (
                <div key={m} className="min-h-[80px] rounded-xl border border-dashed border-[#ccc] p-4">
                  <p className="mb-2 text-sm font-medium text-[#999]">{m}</p>
                  <p className="text-xs italic text-[#bbb]">TBC</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-[#e5e5e5] bg-[#f8f9fa] p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#2BCDC4]">Notes</p>
            <BulletList items={[
              "Travel Mishaps - Bali Belly - everything we do is around that \"the one thing you need when 1 thing goes wrong, cancellations, breaking legs, (could we have some people in this- for example Jordan.",
              "Scooters —",
              "Families - not all travel insurers charge for dependants and we do - which may turn people off.",
              "Tying into the visa stuff and knowing what you're covered for.",
              "Doing Bali Right, Mistakes Australians Make in Bali, Adventure & Peace of Mind, Planning Ahead for Bali",
            ]} />
          </div>
        </div>
      )}

      {current && (
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-xl border border-[#e5e5e5] bg-white p-7">
            <Eyebrow>{current.month}</Eyebrow>
            <h3 className="mb-5 text-xl font-light leading-snug text-[#1a1a1a]" style={SERIF}>{current.title}</h3>
            {current.paras.map((p, i) => (
              <p key={i} className="mb-3 text-sm leading-7 text-[#666]">{p}</p>
            ))}
            <p className="mb-3 mt-5 text-xs font-semibold uppercase tracking-widest text-[#999]">This article would explore:</p>
            <BulletList items={current.explore} />
            {current.insurance && (
              <div className="mt-5 rounded-lg border-l-4 border-[#2BCDC4] bg-[#2BCDC4]/8 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#2BCDC4]">Then naturally include insurance messaging:</p>
                <p className="text-sm italic leading-6 text-[#555]">"{current.insurance}"</p>
              </div>
            )}
          </div>
          {current.deliverables.length > 0 && (
            <div className="rounded-xl border border-[#e5e5e5] bg-[#f8f9fa] p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#999]">Supporting Deliverables</p>
              <div className="divide-y divide-[#f0f0f0]">
                {current.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 py-3">
                    <CheckCircle2 size={14} className="shrink-0 text-[#2BCDC4]" />
                    <span className="text-sm text-[#1a1a1a]">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const organicMonths = [
  {
    month: "July",
    article: "Why Scooters Have Become Part of the Bali Experience",
    assets: [
      { type: "Reel", title: "The Bali Scooter Experience", desc: "A fast-paced reel showcasing the freedom and convenience of exploring Bali by scooter. Featuring scenic roads, hidden cafés, rice fields and coastal routes, paired with practical tips around riding responsibly." },
      { type: "Story", title: "Poll + Question Sticker", desc: '"Would you ride a scooter in Bali?" Followed by quick facts, common misconceptions and swipe-through article CTA.' },
      { type: "Carousel", title: "7 Things Every First-Time Bali Scooter Rider Should Know", desc: "Educational carousel covering etiquette, safety, local road culture and practical tips." },
      { type: "Facebook", title: "Article Reshare", desc: '"Love them or avoid them? Scooters remain one of the most iconic parts of the Bali experience."' },
      { type: "TikTok", title: "Short-form Reel", desc: '"POV: You discover Bali is best explored on two wheels."' },
    ],
  },
  {
    month: "August",
    article: "Why Adventure Travellers Are Falling for the Island",
    assets: [
      { type: "Reel", title: "Bali Beyond Beach Clubs", desc: "Fast-cut adventure montage featuring volcano hikes, waterfalls, surfing, snorkelling, ATV experiences and rafting." },
      { type: "Story", title: "Adventure Bucket List", desc: "Interactive story asking audiences which Bali adventure experience they'd try first." },
      { type: "Carousel", title: "The Ultimate Bali Adventure Bucket List", desc: "Featuring 6–8 experiences including Mount Batur, canyoning, freediving, white water rafting and Nusa Penida snorkelling." },
      { type: "Facebook", title: "Article Reshare", desc: '"Think Bali is just beach clubs and sunsets? Think again."' },
      { type: "TikTok", title: "Quick-cut Highlights", desc: '"Things to do in Bali if you\'re not a beach club person."' },
    ],
  },
  {
    month: "September",
    article: "When Bali Doesn't Go To Plan",
    assets: [
      { type: "Reel", title: "Real Traveller Stories", desc: "Narrative-led reel sharing 2–3 real examples of unexpected travel situations in Bali and what travellers learnt from them." },
      { type: "Story", title: "Audience Engagement Sticker", desc: '"What\'s the most unexpected thing that\'s happened to you while travelling?" Audience engagement sticker followed by article CTA.' },
      { type: "Carousel", title: "5 Bali Travel Lessons People Learn The Hard Way", desc: "Practical and educational takeaways inspired by real traveller stories." },
      { type: "Facebook", title: "Article Reshare", desc: '"No one plans for things to go wrong while travelling. But preparation matters."' },
      { type: "TikTok", title: "Storytelling Format", desc: '"Three Bali travel stories that didn\'t go to plan."' },
    ],
  },
];

const typeColor = {
  Reel: "bg-[#2BCDC4]/10 text-[#1DADA5]",
  Story: "bg-purple-50 text-purple-600",
  Carousel: "bg-blue-50 text-blue-600",
  Facebook: "bg-indigo-50 text-indigo-600",
  TikTok: "bg-[#1a1a1a]/8 text-[#1a1a1a]",
};

function OrganicSocialSub() {
  const [activeMonth, setActiveMonth] = useState("July");
  const current = organicMonths.find(m => m.month === activeMonth);

  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-sm leading-7 text-[#666]">
        <Updated>Organic social will be the primary driver of awareness and traffic throughout the campaign, with each editorial article supported by a suite of complementary content designed to maximise engagement and reach. All organic content will be boosted to relevant audiences.</Updated>
      </p>
      <SubTabBar tabs={["July", "August", "September"]} active={activeMonth} onChange={setActiveMonth} />
      {current && (
        <motion.div key={activeMonth} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#999]">
            {current.month} — {current.article}
          </p>
          <div className="space-y-3">
            {current.assets.map(({ type, title, desc }) => (
              <div key={type} className="rounded-xl border border-[#e5e5e5] bg-white p-5">
                <div className="flex items-start gap-4">
                  <span className={`mt-0.5 shrink-0 rounded-md px-2.5 py-1 text-xs font-semibold ${typeColor[type]}`}>{type}</span>
                  <div>
                    <p className="mb-1 text-sm font-medium text-[#1a1a1a]">{title}</p>
                    <p className="text-sm leading-6 text-[#666]"><Updated>{desc}</Updated></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function EDMSub() {
  const edms = [
    {
      month: "July",
      theme: "The Bali Scooter Experience",
      positioning: "Positioned as practical travel inspiration.",
      content: [
        "Feature article: Why Scooters Have Become Part of the Bali Experience",
        "Scooter culture in Bali — the freedom, the routes, the ritual",
        "Practical riding tips for first-timers",
        "Soft integration of 1Cover messaging around ride cover",
        "CTA to read the full article",
      ],
    },
    {
      month: "September",
      theme: "When Bali Doesn't Go To Plan",
      positioning: "Positioned around real traveller experiences.",
      content: [
        "Key lessons drawn from real Australian traveller stories",
        "Practical travel planning advice before departure",
        "Natural integration of travel insurance considerations",
        "CTA to full article",
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <p className="max-w-xl text-sm leading-7 text-[#666]">
        Two eDM placements throughout the campaign, each tied to the month's editorial article.
      </p>
      <div className="grid gap-5 md:grid-cols-2">
        {edms.map(({ month, theme, positioning, content }) => (
          <div key={month} className="rounded-xl border border-[#e5e5e5] bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2BCDC4] text-white">
                <Mail size={17} />
              </div>
              <div>
                <p className="text-xs text-[#999]">{month} eDM</p>
                <p className="text-sm font-medium text-[#1a1a1a]">{theme}</p>
              </div>
            </div>
            <p className="mb-4 text-xs italic text-[#999]"><Updated>{positioning}</Updated></p>
            <BulletList items={content.map(item => <Updated>{item}</Updated>)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PaidSocialSub() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border-2 border-[#2BCDC4] bg-[#2BCDC4]/8 p-6">
        <Eyebrow>July</Eyebrow>
        <p className="mb-4 text-sm leading-6 text-[#1a1a1a]">Bali Bible followers get 10% off travel insurance with 1Cover!</p>
        <p className="text-xs font-medium uppercase tracking-wide text-[#999]">Targeting</p>
        <p className="mt-1 text-sm text-[#555]">TBB Lookalike audiences, 25-45 Australia Wide Male and Female</p>
      </div>
      <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
        <Eyebrow>August</Eyebrow>
        <TBD>TBD pending results</TBD>
      </div>
      <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
        <Eyebrow>September</Eyebrow>
        <TBD>TBD pending results</TBD>
      </div>
    </div>
  );
}

function ContentShootSub() {
  return (
    <div className="space-y-6">
    <div className="max-w-xl rounded-xl border border-[#e5e5e5] bg-white p-8">
      <div className="flex gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2BCDC4] text-white">
          <Camera size={22} />
        </div>
        <div>
          <h3 className="mb-3 text-xl font-light text-[#1a1a1a]" style={SERIF}>Content Shoot</h3>
          <p className="text-sm leading-7 text-[#666]">
            <Updated>Our shoot will centre on lifestyle and real Bali moments — capturing scooter culture, authentic street scenes, adventure experiences, and real people enjoying the island. Assets will be mapped directly to the social content planned above, ensuring every deliverable has purpose-built creative to match.</Updated>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

function BannerSub() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border-2 border-[#2BCDC4] bg-[#2BCDC4]/8 p-6">
          <Eyebrow>Creative 1</Eyebrow>
          <p className="text-sm leading-6 text-[#1a1a1a]">Bali Bible Followers get 10% off with 1Cover! (UTM trackable code)</p>
        </div>
        <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
          <Eyebrow>Creative 2</Eyebrow>
          <TBD>TBD</TBD>
        </div>
      </div>
      <div className="rounded-xl border border-[#e5e5e5] bg-white p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-[#f5f5f5] p-4">
            <p className="mb-1 text-xs uppercase tracking-wide text-[#999]">Rotation</p>
            <p className="text-2xl font-light text-[#1a1a1a]" style={SERIF}>1 in 4</p>
          </div>
          <div className="col-span-2 rounded-lg bg-[#f5f5f5] p-4">
            <p className="mb-1 text-xs uppercase tracking-wide text-[#999]">Schedule</p>
            <p className="text-sm leading-6 text-[#666]">
              Starting from Mid July (Gantt can show 1 week from 15–22 of July then the same time each month for the rest of the campaign)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const deliveryTabs = ["Editorial & Content", "Organic Social", "eDM Strategy", "Paid Social", "Content Shoot", "Banner Advertising"];

function DeliveryContent() {
  const [active, setActive] = useState(deliveryTabs[0]);
  return (
    <div>
      <SectionTitle title="Campaign Delivery" copy="Here we will dive into each specific tactic and our proposed approach." />
      <div className="space-y-6">
        <SubTabBar tabs={deliveryTabs} active={active} onChange={setActive} />
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          {active === "Editorial & Content" && <EditorialSub />}
          {active === "Organic Social" && <OrganicSocialSub />}
          {active === "eDM Strategy" && <EDMSub />}
          {active === "Paid Social" && <PaidSocialSub />}
          {active === "Content Shoot" && <ContentShootSub />}
          {active === "Banner Advertising" && <BannerSub />}
        </motion.div>
      </div>
    </div>
  );
}

function TimelineContent() {
  // start/end are 0-indexed month positions: 0=July, 1=August, 2=September
  const rows = [
    { label: "Article #1 — Scooter Culture",     start: 0, end: 0 },
    { label: "Article #2 — Adventure Travel",     start: 1, end: 1 },
    { label: "Article #3 — When Things Go Wrong", start: 2, end: 2 },
    { label: "Instagram Reel + Story",            start: 0, end: 2 },
    { label: "Facebook Post",                     start: 0, end: 2 },
    { label: "TikTok Video",                      start: 0, end: 0 },
    { label: "Paid Social Campaign",              start: 0, end: 2 },
    { label: "Dedicated Solus eDM",               start: 0, end: 0 },
    { label: "Shared Newsletter Inclusion",       start: 1, end: 1 },
    { label: "eDM Placement",                     start: 2, end: 2 },
    { label: "Homepage Banner",                   start: 0, end: 2 },
    { label: "Photography Shoot",                 start: 1, end: 1 },
  ];
  const months = ["July", "August", "September"];
  const COLS = 3;

  return (
    <div>
      <SectionTitle title="Campaign Timeline" copy="Campaign Delivery section spelled out in a Gantt chart." />
      <div className="overflow-x-auto rounded-2xl border border-[#e5e5e5] bg-white">
        <div className="min-w-[600px]">
          {/* Header */}
          <div className="flex border-b border-[#e5e5e5] bg-[#f8f9fa] px-6 py-4">
            <div className="w-[38%] text-xs font-semibold uppercase tracking-wider text-[#999]">Deliverable</div>
            <div className="flex flex-1">
              {months.map(m => (
                <div key={m} className="flex-1 text-center text-[#1a1a1a]" style={{ ...SERIF, fontSize: 13, fontWeight: 700 }}>{m}</div>
              ))}
            </div>
          </div>
          {/* Rows */}
          {rows.map(({ label, start, end }, i) => {
            const leftPct = (start / COLS) * 100;
            const widthPct = ((end - start + 1) / COLS) * 100;
            return (
              <div key={label} className={`flex items-center border-b border-[#f0f0f0] px-6 py-3 ${i % 2 === 1 ? "bg-[#fafafa]" : "bg-white"}`}>
                <div className="w-[38%] text-sm text-[#1a1a1a]">{label}</div>
                <div className="relative flex-1" style={{ height: 28 }}>
                  {/* subtle month dividers */}
                  <div className="absolute inset-y-0 left-1/3 w-px bg-[#ececec]" />
                  <div className="absolute inset-y-0 left-2/3 w-px bg-[#ececec]" />
                  {/* connected bar */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-3 rounded-full bg-[#2BCDC4]"
                    style={{ left: `calc(${leftPct}% + 4px)`, width: `calc(${widthPct}% - 8px)` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NextStepsContent() {
  return (
    <div>
      <SectionTitle title="Production & Next Steps" />
      <div className="max-w-xl rounded-2xl border border-[#e5e5e5] bg-white p-8">
        <p className="text-base leading-8 text-[#1a1a1a]">
          We will aim to have all content go live each month during the middle of each month, with a 2 week lead time on reviews for the client.
        </p>
        <p className="mt-5 text-base leading-8 text-[#1a1a1a]">
          <Updated>Once you approve our approach, we will dive into production for month 1 and provide this by the start of July.</Updated>
        </p>
      </div>
    </div>
  );
}

function ContentIdeasContent() {
  const [activeSeries, setActiveSeries] = useState(contentSeries[0].id);
  const s = contentSeries.find(d => d.id === activeSeries);
  const realImages = s ? s.images.filter(Boolean) : [];
  return (
    <div>
      <SectionTitle title="Content Ideas" copy="Three content series — one per editorial article — giving the client a visual direction for the campaign." />
      <SubTabBar tabs={contentSeries.map(d => d.id)} active={activeSeries} onChange={setActiveSeries} />
      {s && (
        <motion.div key={activeSeries} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
          <div className="mt-5 rounded-2xl border border-[#e5e5e5] bg-white p-8">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start">

              {/* left — text content */}
              <div className="flex-1 space-y-6">
                <div>
                  <p className="mb-1.5 text-xs uppercase tracking-widest text-[#2BCDC4]">Concept</p>
                  <p className="text-sm leading-7 text-[#666]">{s.concept}</p>
                </div>
                <div>
                  <p className="mb-1.5 text-xs uppercase tracking-widest text-[#2BCDC4]">Why It Works</p>
                  <p className="text-sm leading-7 text-[#666]">{s.why}</p>
                </div>
                <div>
                  <p className="mb-1.5 text-xs uppercase tracking-widest text-[#2BCDC4]">How It Shows Up</p>
                  <p className="text-sm leading-7 text-[#666]">{s.how}</p>
                </div>
                <div>
                  <p className="mb-1.5 text-xs uppercase tracking-widest text-[#2BCDC4]">Visual Direction</p>
                  <p className="text-sm leading-7 text-[#999] italic">{s.visual}</p>
                </div>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-widest text-[#2BCDC4]">Formats</p>
                  <div className="flex flex-wrap gap-2">
                    {s.formats.map(f => (
                      <span key={f} className="rounded-full border border-[#e5e5e5] px-3 py-1.5 text-xs text-[#666]">{f}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* right — images, natural aspect ratio, no crop */}
              {realImages.length > 0 && (
                <div className={`flex shrink-0 flex-row flex-wrap gap-3 ${realImages.length > 1 ? "lg:w-[26rem]" : "lg:w-52"}`}>
                  {realImages.map((src, i) => (
                    <div key={i} className={`overflow-hidden rounded-xl border border-[#f0f0f0] ${realImages.length > 1 ? "w-40 lg:w-[calc(50%-6px)]" : "w-40 lg:w-full"}`}>
                      <img src={src} alt={`${activeSeries} example ${i + 1}`} className="w-full h-auto block" />
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function BottomNav({ active, onNavigate }) {
  const idx = active === null ? -1 : TABS.indexOf(active);
  const prev = idx > 0 ? TABS[idx - 1] : null;
  const next = idx < TABS.length - 1 ? TABS[idx + 1] : null;
  if (!prev && !next && active !== null) return null;
  const firstTab = active === null ? TABS[0] : null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#e5e5e5] bg-white/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-16 py-0 md:px-24">
        {prev ? (
          <button onClick={() => onNavigate(prev)} className="flex items-center gap-2 py-4 text-sm text-[#aaa] transition hover:text-[#1a1a1a]">
            <ArrowLeft size={13} />
            <span>{prev}</span>
          </button>
        ) : <div />}
        {(next || firstTab) ? (
          <button onClick={() => onNavigate(next || firstTab)} className="flex items-center gap-2 py-4 text-sm text-[#aaa] transition hover:text-[#1a1a1a]">
            <span>{next || firstTab}</span>
            <ArrowRight size={13} />
          </button>
        ) : <div />}
      </div>
    </div>
  );
}

// ─── Tab registry ──────────────────────────────────────────────────────────────

const TABS = [
  "Situation & Overview",
  "Goals & Objectives",
  "Key Messaging",
  "Target Audience",
  "Scope",
  "Campaign Delivery",
  "Content Ideas",
  "Campaign Timeline",
  "Production & Next Steps",
];

function renderTab(tab) {
  switch (tab) {
    case "Situation & Overview":    return <SituationContent />;
    case "Goals & Objectives":      return <GoalsContent />;
    case "Key Messaging":           return <MessagingContent />;
    case "Target Audience":         return <AudienceContent />;
    case "Scope":                   return <ScopeContent />;
    case "Campaign Delivery":       return <DeliveryContent />;
    case "Content Ideas":           return <ContentIdeasContent />;
    case "Campaign Timeline":       return <TimelineContent />;
    case "Production & Next Steps": return <NextStepsContent />;
    default: return null;
  }
}

// ─── Root App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState(null);
  const tabBarRef = useRef(null);
  const contentRef = useRef(null);

  const handleTabChange = (tab) => {
    setActive(tab);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a]">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="flex flex-col px-16 pt-10 pb-0 md:px-24">
        {/* top header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 rounded-xl bg-[#1a1a1a] px-5 py-3">
            <img
              src="https://res.cloudinary.com/dfers76ex/image/upload/q_auto/f_auto/v1781745138/Bali-Bible-Logo_jzqthj.png"
              alt="The Bali Bible"
              className="h-7 object-contain"
            />
            <span className="text-sm text-[#555]">×</span>
            <img
              src="https://res.cloudinary.com/dfers76ex/image/upload/q_auto/f_auto/v1781745120/1Cover_logo_c6e9vn.svg"
              alt="1Cover"
              className="h-5 object-contain"
            />
          </div>
          <div className="rounded-full border border-[#e5e5e5] px-5 py-2 text-xs tracking-wider text-[#999]">
            Campaign Strategy 2026
          </div>
        </div>

        {/* main hero */}
        <div className="mt-14 max-w-4xl">
          <p className="mb-8 text-xs uppercase tracking-[0.3em] text-[#2BCDC4]">
            July – September 2026
          </p>
          <h1
            className="text-[3.2rem] font-light leading-[1.05] text-[#1a1a1a] md:text-[5rem]"
            style={SERIF}
          >
            1Cover X The Bali Bible<br />Campaign Strategy.
          </h1>
          <p className="mt-10 max-w-lg text-base leading-7 text-[#666]">
            A brand awareness campaign leveraging the creative development and
            distribution of The Bali Bible, and intertwining the 1Cover brand
            story, key messages and product focus areas to drive awareness and
            product consideration.
          </p>
        </div>

      </section>

      {/* ── Tab bar — sticky below hero ──────────────────────── */}
      <div
        ref={tabBarRef}
        className="sticky top-0 z-30 bg-white/95 px-16 pt-6 pb-4 backdrop-blur-md md:px-24"
      >
        <div className="flex gap-1.5 overflow-x-auto rounded-lg border border-[#e5e5e5] bg-[#f5f5f5] p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`shrink-0 rounded-md px-4 py-2 text-sm transition ${
                active === tab
                  ? "bg-[#2BCDC4] text-white font-medium"
                  : "text-[#666] hover:bg-[#e5e5e5] hover:text-[#1a1a1a]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ──────────────────────────────────────── */}
      <div ref={contentRef} className="min-h-[60vh] px-16 pb-32 pt-12 md:px-24">
        {active === null ? (
          <div className="max-w-3xl space-y-5">
            <p className="text-xs uppercase tracking-widest text-[#2BCDC4]">Overview</p>
            <p className="text-base leading-7 text-[#666]">
              Select a section above to explore the full campaign strategy.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className="rounded-xl border border-[#e5e5e5] bg-white p-4 text-left text-sm text-[#666] transition hover:border-[#2BCDC4]/60 hover:bg-[#2BCDC4]/5 hover:text-[#1a1a1a]"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {renderTab(active)}
          </motion.div>
        )}
      </div>

      <BottomNav active={active} onNavigate={handleTabChange} />
    </div>
  );
}
