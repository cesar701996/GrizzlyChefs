import { useEffect, useState } from "react";
import { ChapterProof, ChaptersSection, GreekEvents } from "./Chapters";
import { FactsLine, NutritionDialog, type Dish } from "./Nutrition";
import { SocialSection } from "./Social";
import { Dialog, ORDER, SITE, TC, btnForest, btnHoney, btnOutline, cssVars, img } from "./shared";

// Adds the "in" class to every .reveal element once it scrolls into view.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const P = `${ORDER}/p`;
const LOGO = img("logo.png");

// w/h are each photo's real pixel size, so the browser reserves the right space.
const dishes: Dish[] = [
  { h: `${P}/cheeseburger`, n: "Classic Cheeseburger and Fries", p: "from $10.50", src: img("cheeseburger.jpg"), facts: { serving: "1 order (burger and fries)", cal: 1050, protein: 35, carbs: 95, fat: 58 }, w: 800, hgt: 680, alt: "Classic cheeseburger with melted cheese on a toasted bun, served with golden fries",
    inside: ["1/3 lb grilled beef patty", "Cheddar", "Lettuce", "Tomato", "Dill pickles", "Toasted bun", "Fries"], options: "Make it an Impossible (plant-based) burger for $11.50." },
  { h: `${P}/chicken-and-waffles`, n: "Chicken and Waffles", p: "$12.99", src: img("waffles.jpg"), facts: { serving: "1 order", cal: 1300, protein: 50, carbs: 140, fat: 60 }, w: 800, hgt: 648, alt: "Crispy fried chicken served on top of fluffy golden waffles",
    inside: ["Crispy fried chicken", "Waffles", "Seasonal fruit", "Powdered sugar", "Syrup on the side"] },
  { h: `${P}/du3f6mmcyyln8cdzo3a5jbl8f064pj`, n: "Quesabirrias", p: "$12.50", src: img("quesabirria.jpg"), facts: { serving: "3 quesabirrias with consommé", cal: 950, protein: 55, carbs: 55, fat: 55 }, w: 800, hgt: 459, alt: "Crispy cheese-filled quesabirria tacos with a cup of consommé for dipping",
    inside: ["3 quesabirrias", "Birria beef", "Cheese", "Crispy tortillas", "Consommé for dipping"] },
  { h: `${P}/harvest-moon-cup-5fc72-3b3jj`, n: "Chipotle Fried Chicken Sandwich and Fries", p: "from $11.99", src: img("chipotle.jpg"), facts: { serving: "1 order (sandwich and fries)", cal: 1250, protein: 45, carbs: 115, fat: 65 }, w: 800, hgt: 702, alt: "Fried chicken sandwich with chipotle sauce on a bun, with a side of fries",
    inside: ["Hand-breaded chicken breast", "Chipotle sauce", "Creamy slaw", "Toasted bun", "Fries"], options: "Swap in vegetarian \u201cchicken\u201d strips for $12.99." },
  { h: `${P}/feb5strrxgxj2lohuz6679109ls2u6`, n: "Breakfast Burrito", p: "from $8.99", src: img("burrito.jpg"), facts: { serving: "1 regular burrito", cal: 850, protein: 35, carbs: 70, fat: 45 }, w: 800, hgt: 583, alt: "Breakfast burrito cut in half showing eggs, potatoes and cheese inside",
    inside: ["Flour tortilla", "Scrambled eggs", "Seasoned potatoes", "Cheese", "Salsa"], options: "The regular comes without meat; add chorizo, sausage or bacon for $9.99." },
  { h: `${P}/todays-special`, n: "Orange Chicken and Steamed Rice", p: "$11.50", src: img("orange.jpg"), facts: { serving: "1 order (with steamed rice)", cal: 950, protein: 40, carbs: 130, fat: 30 }, w: 800, hgt: 726, alt: "Glazed orange chicken pieces next to a scoop of white steamed rice",
    inside: ["Orange chicken", "Steamed rice"], note: "The menu page describes this as orange chicken with chow mein, cookies and a drink." },
  { h: `${P}/mangonada`, n: "Mangonada (24oz)", p: "$5.00", src: img("mangonada.jpg"), facts: { serving: "24 oz cup", cal: 420, sugar: 90 }, w: 506, hgt: 800, alt: "Large mangonada drink with mango, chamoy and chili, topped with a tamarind straw",
    inside: ["Mango purée", "Chamoy", "Tajín", "Fresh mango chunks"] },
  { h: `${P}/double-cheese-burger`, n: "Double Cheese Burger", p: "from $11.75", src: img("double.jpg"), facts: { serving: "1 burger (without fries)", cal: 850, protein: 50, carbs: 40, fat: 55 }, w: 800, hgt: 687, alt: "Double cheeseburger with two beef patties and melted cheese on a toasted bun",
    inside: ["Two 1/3 lb beef patties", "American cheese", "Lettuce", "Tomato", "Signature sauce", "Toasted bun", "Fries"] },
];

const services = [
  { t: "Delivery", d: "Order from the full menu and get it at your door fast, with no delivery fee.", h: ORDER, b: "Order now", src: img("wings.jpg"), w: 800, hgt: 738, alt: "Chicken wings with a side of fries, packed for delivery" },
  { t: "Catering", d: "Box lunches, platters, taco bars and specialty menus for events of any size. You focus on the event, we'll handle the food.", h: `${SITE}/catering`, b: "Plan catering", src: img("strips.jpg"), w: 800, hgt: 679, alt: "Golden chicken strips with fries, a popular catering platter" },
  { t: "Meal Plans", d: "Lunch, dinner or both, delivered every weekday. Pick weekly, bi-weekly or a full semester.", h: "#meal-plans", b: "See meal plans", src: img("salad.jpg"), w: 800, hgt: 600, alt: "Fresh house salad with greens and vegetables from a meal plan" },
];

const plans = [
  { t: "Weekly", inc: ["Mon–Fri delivery", "Lunch, dinner or both"], price: <>Lunch from $52.50/week, dinner from $57.50/week <TC>To confirm current prices</TC></>, h: `${SITE}/weekly-meal-plan` },
  { t: "Bi-Weekly", inc: ["Two weeks at a time", "Lunch, dinner or both"], price: <>Price <TC /></>, h: `${SITE}/bi-weekly` },
  { t: "Semester / Custom", inc: ["Pick your own delivery days", "For the whole semester"], price: <>Price <TC /></>, h: `${SITE}/customized-meal-plan-1` },
];

const reviews = [
  ["Legendary establishment, nothing quite like it.", "Brandon B."],
  ["That Munch Box is different 🔥", "Damien P."],
  ["Food is phenomenal and even offered me a discount and free stuff.", "Theo D."],
  ["Burger is awesome!!", "Andy B."],
];

const nav = [
  ["Order", "#popular"],
  ["Catering", "#services"],
  ["Meal Plans", "#meal-plans"],
  ["Chapters", "#chapters"],
  ["Contact", "#contact"],
];

const footerLinks = [
  ["Order online", "/online-order"],
  ["Catering", "/catering"],
  ["Meal plans", "/meal-plan"],
  ["Weekly menu", "/weekly-menu"],
  ["Chapter login", "/chapter-login"],
  ["Contact us", "/contact-us"],
];

const fixes = [
  "Clear headline saying who you are, where you deliver and how fast",
  "One address, one email and one set of hours everywhere (placeholders until confirmed)",
  "All links stay on grizzlychefs.com (no internal Squarespace address)",
  "Contact added to the menu; phone number is tap-to-call",
  "Meal plan prices shown up front",
  "Real food photos with descriptive alt text, no stock images",
  "Every food photo shown whole, nothing cut off",
  "A section just for chapters: house pricing, Greek-calendar catering and Late Plate",
  "Nutrition facts and ingredients on every dish (estimated numbers, to confirm)",
  "Gentle motion that makes the food pop (it switches off for anyone whose phone asks for less motion)",
  "Hours block that never cuts off or overlaps on phones",
  "No leftover template text, demo products or stray characters",
  "Fewer third-party widgets for a faster page",
];

const socials = [
  { l: "Instagram", h: "https://www.instagram.com/grizzly_chefs_berkeley/", d: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-9.6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" },
  { l: "Facebook", h: "https://www.facebook.com/profile.php?id=100089994663235", d: "M14 8V6c0-.9.6-1.1 1-1.1h2.5V1h-3.5C10.2 1 9.5 3.8 9.5 5.6V8H7v4h2.5v11h4.5V12h3.3l.4-4H14z" },
  { l: "TikTok", h: "https://www.tiktok.com/@grizzlychefs", d: "M16.6 2h-3.4v13.4a2.9 2.9 0 11-2-2.8V9.2a6.3 6.3 0 105.4 6.2V8.6a7.9 7.9 0 004.4 1.4V6.6a4.5 4.5 0 01-4.4-4.6z" },
];

const ticker = ["Quesabirrias", "Munch Box", "Chicken & Waffles", "Mangonada", "Breakfast Burritos", "Double Cheese Burger", "Orange Chicken", "Late Plate for chapters", "No delivery fee", "At your door in ~15 min"];

export default function App() {
  const [banner, setBanner] = useState(true);
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [facts, setFacts] = useState<Dish | null>(null);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {banner && (
        <div className="flex items-center justify-center gap-3 bg-confirm-bg px-4 py-2 text-center text-sm text-foreground">
          <p>
            <strong>Design concept, not the live site.</strong> Items marked <TC>to confirm</TC> need the owner's details.
          </p>
          <button onClick={() => setPanel(true)} className="ml-auto shrink-0 font-semibold underline underline-offset-4 md:hidden">What changed?</button>
          <button onClick={() => setBanner(false)} aria-label="Dismiss notice" className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-honey/40">✕</button>
        </div>
      )}

      <header className={`sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-forest/10" : ""}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <a href="#top" className="flex items-center"><img src={LOGO} alt="Grizzly Chefs logo" width={183} height={44} className="h-11 w-auto" /></a>
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex gap-6 font-semibold">
              {nav.map(([l, h]) => <li key={l}><a href={h} className="hover:text-confirm">{l}</a></li>)}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a href={ORDER} className={`${btnHoney} hidden sm:inline-flex`}>Order now</a>
            <button className="grid h-12 w-12 place-items-center rounded-full hover:bg-muted md:hidden" aria-label="Menu" aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)}>
              <span className="text-2xl" aria-hidden>{menu ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
        {menu && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border px-4 pb-4 md:hidden">
            <ul>
              {nav.map(([l, h]) => <li key={l}><a href={h} onClick={() => setMenu(false)} className="block py-3 text-lg font-semibold">{l}</a></li>)}
            </ul>
            <a href={ORDER} className={`${btnHoney} mt-2 w-full`}>Order now</a>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero: the photo is 3:4, so the frame is 3:4 too and nothing gets cropped.
            Motion: the card floats, a light sweeps across it, the honey shape behind
            it turns slowly and the stickers bob. */}
        <section className="overflow-x-clip">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-12 md:grid-cols-2 md:py-20">
            <div>
              <p className="rise mb-3 text-sm font-bold uppercase tracking-widest text-confirm">Berkeley, CA · Near UC Berkeley</p>
              <h1 className="rise text-4xl font-black leading-[1.05] md:text-6xl" style={cssVars({ "--d": "90ms" })}>Hot, fresh food delivered across Berkeley in as little as 15 minutes.</h1>
              <p className="rise mt-5 text-lg text-muted-foreground" style={cssVars({ "--d": "180ms" })}>Burgers, burritos, breakfast and more from Chef Felipe's kitchen. No delivery fee, ever.</p>
              <div className="rise mt-7 flex flex-wrap gap-3" style={cssVars({ "--d": "270ms" })}>
                <a href={ORDER} className={`${btnHoney} sheen shadow-lg shadow-honey/40`}>Order now</a>
                <a href={`${SITE}/catering`} className={btnOutline}>Plan catering</a>
              </div>
              <ul className="rise mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold" style={cssVars({ "--d": "360ms" })}>
                <li><span className="text-confirm">★</span> 5.0 on Google · 31 reviews</li>
                <li>No delivery fee</li>
                <li>Delivery in ~15 min</li>
              </ul>
              <p className="rise mt-4 text-sm text-muted-foreground" style={cssVars({ "--d": "420ms" })}>Hours: <TC /></p>
            </div>
            <div className="rise relative mx-auto w-full max-w-md" style={cssVars({ "--d": "200ms" })}>
              <div aria-hidden className="blob absolute -inset-5 bg-honey md:-inset-9" />
              <div className="anim-float relative">
                <div className="sheen rounded-3xl shadow-2xl">
                  <img src={img("hero.jpg")} alt="Grizzly Chefs Munch Box with onion rings, jalapeño poppers, chicken nuggets, mozzarella sticks and fries, with two dipping sauces" width={600} height={800} className="aspect-[3/4] w-full object-cover" fetchPriority="high" />
                </div>
              </div>
              <span className="anim-bob absolute -left-2 top-8 grid h-24 w-24 place-items-center rounded-full bg-forest p-2 text-center text-sm font-black leading-tight text-honey shadow-xl md:-left-10 md:h-28 md:w-28 md:text-base" style={cssVars({ "--r": "-10deg" })}>No delivery fee</span>
              <span className="anim-bob absolute -right-2 bottom-14 grid h-24 w-24 place-items-center rounded-full border-4 border-honey bg-background p-2 text-center text-sm font-black leading-tight text-forest shadow-xl md:-right-10 md:h-28 md:w-28 md:text-base" style={cssVars({ "--r": "8deg", "--delay": "-2.3s" })}>At your door in ~15 min</span>
            </div>
          </div>
        </section>

        {/* Ticker: an endless band of menu favorites */}
        <div className="overflow-hidden py-3">
          <div className="marquee-wrap -mx-2 -rotate-1 border-y-2 border-forest bg-honey py-3 text-forest">
            <div className="marquee" style={cssVars({ "--dur": "38s" })}>
              {[0, 1].map((k) => (
                <ul key={k} aria-hidden={k === 1 ? true : undefined} className="flex shrink-0 items-center gap-6 pr-6 text-lg font-black uppercase tracking-tight md:gap-8 md:pr-8 md:text-2xl">
                  {ticker.map((t) => (
                    <li key={t} className="flex items-center gap-6 whitespace-nowrap md:gap-8">{t}<span aria-hidden className="text-base md:text-xl">✦</span></li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        {/* Popular: whole photos on a white square, scaled to fit (object-contain) */}
        <section id="popular" className="bg-secondary py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="reveal text-3xl font-black md:text-4xl">Popular right now</h2>
            <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {dishes.map((d, i) => (
                <li key={d.n} className="reveal flex" style={cssVars({ "--d": `${(i % 4) * 90}ms` })}>
                  <div className="food-card flex w-full flex-col overflow-hidden rounded-2xl bg-card shadow-sm">
                  <div className="relative isolate aspect-square bg-white">
                    <div aria-hidden className="food-glow absolute inset-[8%] rounded-full" />
                    <img src={d.src} alt={d.alt} width={d.w} height={d.hgt} loading="lazy" className="food-photo absolute inset-0 h-full w-full object-contain p-3 mix-blend-multiply" />
                  </div>
                  <div className="flex flex-1 flex-col p-3 md:p-4">
                    <h3 className="font-bold leading-tight">{d.n}</h3>
                    <p className="mt-1 text-muted-foreground">{d.p}</p>
                    {d.facts && <FactsLine f={d.facts} />}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pt-3">
                      <a href={d.h} className="font-bold text-forest underline underline-offset-4" aria-label={`Order ${d.n}`}>Order →</a>
                      <button type="button" onClick={() => setFacts(d)} className="min-h-9 rounded-full border border-border px-3 text-sm font-semibold hover:border-forest" aria-label={`Nutrition and ingredients for ${d.n}`}>Nutrition</button>
                    </div>
                  </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center"><a href={ORDER} className={btnForest}>See full menu</a></div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="reveal text-3xl font-black md:text-4xl">Delivery, catering and meal plans</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <article key={s.t} className="reveal flex" style={cssVars({ "--d": `${i * 110}ms` })}>
                <div className="food-card flex w-full flex-col overflow-hidden rounded-3xl bg-card shadow-sm">
                <div className="relative isolate aspect-[4/3] bg-white">
                  <div aria-hidden className="food-glow absolute inset-x-[14%] inset-y-[4%] rounded-full" />
                  <img src={s.src} alt={s.alt} width={s.w} height={s.hgt} loading="lazy" className="food-photo absolute inset-0 h-full w-full object-contain p-4 mix-blend-multiply" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-2xl font-black">{s.t}</h3>
                  <p className="text-muted-foreground">{s.d}</p>
                  <a href={s.h} className={`${btnHoney} mt-auto self-start`}>{s.b}</a>
                </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Meal plans */}
        <section id="meal-plans" className="bg-forest py-16 text-forest-foreground">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="reveal text-3xl font-black md:text-4xl">Meal plans</h2>
            <p className="reveal mt-2 opacity-85">Weekday delivery, prices shown up front.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {plans.map((p, i) => (
                <article key={p.t} className="reveal flex" style={cssVars({ "--d": `${i * 110}ms` })}>
                <div className="food-card flex w-full flex-col rounded-3xl bg-card p-6 text-card-foreground">
                  <h3 className="text-2xl font-black">{p.t}</h3>
                  <ul className="mt-4 space-y-2">{p.inc.map((i) => <li key={i}>✓ {i}</li>)}</ul>
                  <p className="mt-4 mb-6 font-bold">{p.price}</p>
                  <a href={p.h} className={`${btnHoney} mt-auto`}>Enroll</a>
                </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ChaptersSection />

        {/* Late plate: 3:4 photo in a 3:4 frame */}
        <section id="late-plate" className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div className="reveal">
            <p className="text-sm font-bold uppercase tracking-widest text-confirm">Late Plate for chapters</p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">Late meeting? We saved you a plate.</h2>
            <p className="mt-4 text-lg text-muted-foreground">Chapter members get their meals saved and delivered after events and late meetings. Sign in with your chapter login. <TC>To confirm exact description</TC></p>
            <a href={`${SITE}/chapter-login`} className={`${btnForest} mt-6`}>Chapter sign in</a>
          </div>
          <img src={img("lateplate.jpg")} width={600} height={800} alt="Plated Grizzly Chefs meal saved as a late plate for a chapter member" loading="lazy" className="reveal mx-auto aspect-[3/4] w-full max-w-md rounded-3xl object-cover shadow-xl" style={cssVars({ "--d": "120ms" })} />
        </section>

        <GreekEvents />
        <ChapterProof />
        <SocialSection />

        {/* Reviews */}
        <section id="reviews" className="bg-secondary py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="reveal text-3xl font-black md:text-5xl">5.0 <span className="twinkle text-confirm" aria-hidden><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></span><span className="sr-only">five stars</span></h2>
            <p className="mt-2 text-lg font-semibold">from 31 Google reviews</p>
          </div>
          {/* Reviews slide by on their own; hover or tab into them to pause */}
          <div className="marquee-wrap mt-8">
            <div className="marquee" style={cssVars({ "--dur": "42s" })}>
              {[0, 1].map((k) => (
                <ul key={k} aria-hidden={k === 1 ? true : undefined} className="flex shrink-0 gap-4 pr-4 text-left">
                  {[...reviews, ...reviews].map(([q, a], j) => (
                    <li key={j} aria-hidden={j >= reviews.length ? true : undefined} className="w-72 shrink-0 md:w-80"><figure className="h-full rounded-2xl bg-card p-6 shadow-sm"><span className="text-confirm" aria-hidden>★★★★★</span><blockquote className="mt-2 text-lg font-semibold">“{q}”</blockquote><figcaption className="mt-3 text-muted-foreground">{a}</figcaption></figure></li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-4 text-center">
            <a href="https://www.google.com/maps?cid=5101223044455455885" target="_blank" rel="noopener" className="mt-8 inline-block font-bold underline underline-offset-4">Read reviews on Google</a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="reveal text-3xl font-black md:text-4xl">Contact and hours</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="reveal">
              <dl className="space-y-5 text-lg">
                <div><dt className="font-bold">Phone</dt><dd><a href="tel:+15107102011" className="font-semibold underline underline-offset-4">(510) 710-2011</a></dd></div>
                <div><dt className="font-bold">Email</dt><dd><TC>To confirm: one email address</TC></dd></div>
                <div><dt className="font-bold">Address</dt><dd><TC>To confirm: one address</TC></dd></div>
                <div><dt className="font-bold">Delivery area</dt><dd>Berkeley, CA <TC>To confirm area</TC></dd></div>
              </dl>
              <a href={`${SITE}/contact-us`} className={`${btnForest} mt-6`}>Contact us</a>
            </div>
            <div className="reveal rounded-3xl bg-card p-6 shadow-sm" style={cssVars({ "--d": "120ms" })}>
              <h3 className="text-xl font-black">Hours</h3>
              <table className="mt-4 w-full">
                <caption className="sr-only">Opening hours by day</caption>
                <tbody>
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
                    <tr key={d} className="border-b border-border last:border-0">
                      <th scope="row" className="py-3 text-left font-semibold">{d}</th>
                      <td className="py-3 text-right"><TC /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-forest pt-12 pb-40 text-forest-foreground md:pb-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
          <div>
            <img src={LOGO} alt="Grizzly Chefs logo" width={233} height={56} loading="lazy" className="h-14 w-auto rounded-lg bg-background p-1" />
            <p className="mt-3 opacity-85">Redefining urban food delivery, one meal at a time.</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-2">
              {footerLinks.map(([l, h]) => (
                <li key={h}><a href={`${SITE}${h}`} className="inline-block py-2 hover:underline">{l}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <a href="tel:+15107102011" className="text-lg font-bold underline underline-offset-4">(510) 710-2011</a>
            <ul className="mt-4 flex gap-2" aria-label="Social media">
              {socials.map((x) => (
                <li key={x.l}><a href={x.h} target="_blank" rel="noopener" aria-label={`Grizzly Chefs on ${x.l}`} className="grid h-11 w-11 place-items-center rounded-full border border-forest-foreground/40 hover:bg-forest-foreground/10">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d={x.d} /></svg>
                </a></li>
              ))}
            </ul>
            <p className="mt-3 text-sm opacity-75">© {new Date().getFullYear()} Grizzly Chefs</p>
          </div>
        </div>
      </footer>

      <button onClick={() => setPanel(true)} className={`${btnHoney} fixed bottom-4 left-4 z-40 hidden shadow-xl md:inline-flex`}>What changed?</button>
      <div className="fixed left-3 right-3 z-40 flex rounded-2xl border border-border bg-background px-3 py-3 shadow-xl md:hidden" style={{ bottom: "calc(56px + env(safe-area-inset-bottom))" }}>
        <a href={ORDER} className={`${btnHoney} sheen w-full whitespace-nowrap`}>Order now</a>
      </div>
      {panel && <ChangesPanel onClose={() => setPanel(false)} />}
      {facts && <NutritionDialog dish={facts} onClose={() => setFacts(null)} />}
    </>
  );
}

function ChangesPanel({ onClose }: { onClose: () => void }) {
  return (
    <Dialog title="What this concept fixes" onClose={onClose} variant="drawer">
      <ul className="mt-6 space-y-3">
        {fixes.map((f) => <li key={f} className="flex gap-3"><span className="font-black text-confirm" aria-hidden>✓</span>{f}</li>)}
      </ul>
    </Dialog>
  );
}
