import { useState } from "react";
import { SITE, TC, btnForest, btnHoney, btnOutline, cssVars } from "./shared";

// Individual weekly plan prices shown on grizzlychefs.com today (Spring 2024 page).
const WEEKLY = { lunch: 52.5, dinner: 57.5 } as const;
const SEMESTER_WEEKS = 15;
type Meals = "lunch" | "dinner" | "both";
const usd = (n: number) => {
  const f = n % 1 ? 2 : 0;
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: f, maximumFractionDigits: f });
};

/** For house managers, stewards and treasurers: what a chapter plan includes, plus a cost estimator. */
export function ChaptersSection() {
  const [members, setMembers] = useState(40);
  const [meals, setMeals] = useState<Meals>("both");
  const perMember = meals === "both" ? WEEKLY.lunch + WEEKLY.dinner : WEEKLY[meals];
  const week = perMember * members;

  const perks = [
    { i: "🍽️", t: "Lunch, dinner or both", d: "Hot meals delivered to the house every weekday." },
    { i: "🌙", t: "Late Plate included", d: "Members' meals saved for after late meetings and events." },
    { i: "🧾", t: "One bill for the semester", d: <>One invoice the treasurer can pay at once. <TC /></> },
    { i: "🌱", t: "Dietary needs covered", d: <>Vegetarian swaps on favorites; allergies handled per member. <TC /></> },
  ];

  return (
    <section id="chapters" className="bg-confirm-bg py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.1fr_1fr] md:items-start">
        <div className="reveal">
          <p className="text-sm font-bold uppercase tracking-widest text-confirm">For house managers, stewards &amp; treasurers</p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Feed the whole house. Skip the kitchen drama.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Grizzly Chefs already feeds chapters at Cal with Late Plate and event catering. Set your house up once and the food just shows up.</p>
          <ul className="mt-7 grid gap-4 sm:grid-cols-2">
            {perks.map((p, i) => (
              <li key={p.t} className="reveal rounded-2xl bg-card p-4 shadow-sm" style={cssVars({ "--d": `${i * 80}ms` })}>
                <span className="text-2xl" aria-hidden>{p.i}</span>
                <h3 className="mt-1 font-black">{p.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={`${SITE}/contact-us`} className={`${btnForest} sheen`}>Get a quote for your house</a>
            <a href="tel:+15107102011" className={btnOutline}>Call (510) 710-2011</a>
          </div>
        </div>

        {/* Estimator */}
        <div className="reveal rounded-3xl bg-forest p-6 text-forest-foreground shadow-2xl md:p-8" style={cssVars({ "--d": "150ms" })}>
          <h3 className="text-2xl font-black">What would your house pay?</h3>
          <label htmlFor="members" className="mt-6 flex items-baseline justify-between font-semibold">
            Members eating <span className="text-3xl font-black text-honey">{members}</span>
          </label>
          <input id="members" type="range" min={10} max={120} step={1} value={members} onChange={(e) => setMembers(Number(e.target.value))} className="mt-3 w-full accent-[var(--honey)]" />
          <fieldset className="mt-6">
            <legend className="font-semibold">Meals</legend>
            <div className="mt-2 grid grid-cols-3 gap-2 rounded-full bg-forest-foreground/10 p-1">
              {(["lunch", "dinner", "both"] as Meals[]).map((m) => (
                <button key={m} type="button" aria-pressed={meals === m} onClick={() => setMeals(m)}
                  className={`min-h-11 rounded-full font-bold capitalize transition ${meals === m ? "bg-honey text-honey-foreground shadow" : "hover:bg-forest-foreground/10"}`}>{m}</button>
              ))}
            </div>
          </fieldset>
          <dl className="mt-7 space-y-3">
            <div className="flex items-baseline justify-between border-b border-forest-foreground/20 pb-3"><dt>Per member</dt><dd className="text-xl font-black">{usd(perMember)}/week</dd></div>
            <div className="flex items-baseline justify-between border-b border-forest-foreground/20 pb-3"><dt>Whole house</dt><dd className="text-xl font-black">{usd(week)}/week</dd></div>
            <div className="flex items-baseline justify-between"><dt>{SEMESTER_WEEKS}-week semester</dt><dd className="text-3xl font-black text-honey">{usd(week * SEMESTER_WEEKS)}</dd></div>
          </dl>
          <p className="mt-5 text-sm opacity-80">Uses today's individual weekly prices (lunch $52.50, dinner $57.50). <span className="text-foreground"><TC>Chapter pricing and semester length to confirm</TC></span></p>
        </div>
      </div>
    </section>
  );
}

// Real menu items from grizzlychefs.com, grouped into ideas for each event.
const events = [
  { i: "🤝", t: "Rush week", d: "Keep rushees fed between events, all week long.", m: ["Munch Box", "Chicken strips & fries", "Mangonadas"] },
  { i: "🎉", t: "Bid day", d: "Feed the new class the day they run home.", m: ["Taco bar", "Quesabirrias", "Mangonadas"] },
  { i: "🎁", t: "Big/little reveal", d: "Finger food for the big moment.", m: ["Munch Box", "Mini churros", "Strawberry cream cheese mini chimichangas"] },
  { i: "💛", t: "Philanthropy events", d: "Box lunches for volunteers and guests.", m: ["Box lunches", "California chicken wraps", "Assorted sandwiches"] },
  { i: "🪩", t: "Formals & date nights", d: "A sit-down dinner before the party.", m: ["Teriyaki chicken", "Fried rice", "Salads"] },
  { i: "👨‍👩‍👧", t: "Parents' weekend", d: "Impress the families, like the 130+ guest SAE parents' dinner.", m: ["Catering platters", "Taco bar", "Desserts"] },
];

export function GreekEvents() {
  return (
    <section id="chapter-events" className="mx-auto max-w-6xl px-4 py-16">
      <div className="reveal flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-confirm">Catering</p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Catering for every week of the Greek calendar</h2>
        </div>
        <TC>Package prices to confirm</TC>
      </div>
      <p className="mt-3 text-sm font-semibold text-muted-foreground sm:hidden" aria-hidden>Swipe for more →</p>
      {/* swipeable row on phones, grid on bigger screens */}
      <ul className="-mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {events.map((e, i) => (
          <li key={e.t} className="reveal flex w-[82%] shrink-0 snap-start sm:w-auto" style={cssVars({ "--d": `${(i % 3) * 90}ms` })}>
            <article className="food-card flex w-full flex-col rounded-3xl bg-card p-6 shadow-sm">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-confirm-bg text-3xl" aria-hidden>{e.i}</span>
              <h3 className="mt-4 text-2xl font-black">{e.t}</h3>
              <p className="mt-1 text-muted-foreground">{e.d}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {e.m.map((m) => <li key={m} className="rounded-full border border-border px-3 py-1 text-sm font-semibold">{m}</li>)}
              </ul>
              <div className="mt-auto pt-4">
                <p className="text-sm font-semibold">Any group size</p>
                <a href={`${SITE}/catering`} className={`${btnHoney} mt-4`}>Plan this event</a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Proof from other houses. Every name here needs that chapter's OK first. */
export function ChapterProof() {
  return (
    <section id="trusted" className="bg-forest py-16 text-forest-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
        <div className="reveal">
          <p className="text-sm font-bold uppercase tracking-widest text-honey">Trusted by Berkeley chapters</p>
          <p className="mt-3 text-7xl font-black leading-none text-honey md:text-8xl">130+</p>
          <p className="mt-3 text-2xl font-black">guests fed at Sigma Alpha Epsilon (Cal Beta)'s parents' dinner</p>
          <p className="mt-2 opacity-85">Featured in the chapter's Fall 2025 newsletter.</p>
          <p className="mt-3"><span className="text-foreground"><TC>To confirm: SAE's OK to be named</TC></span></p>
        </div>
        <div className="reveal" style={cssVars({ "--d": "120ms" })}>
          <ul className="grid grid-cols-3 gap-3" aria-label="Chapters served">
            <li className="grid aspect-square place-items-center rounded-2xl bg-honey text-3xl font-black text-honey-foreground md:text-4xl" title="Sigma Alpha Epsilon">ΣΑΕ</li>
            {Array.from({ length: 5 }, (_, i) => (
              <li key={i} className="grid aspect-square place-items-center rounded-2xl border-2 border-dashed border-forest-foreground/40 p-2 text-center text-sm font-semibold opacity-80">Your chapter</li>
            ))}
          </ul>
          <p className="mt-4 text-sm opacity-80">Add the letters of every house Grizzly Chefs serves, plus a quote from a house manager or two. <span className="text-foreground"><TC>Needs each chapter's OK</TC></span></p>
        </div>
      </div>
    </section>
  );
}
