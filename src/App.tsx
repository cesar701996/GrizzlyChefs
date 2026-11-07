import { useEffect, useRef, useState, type ReactNode } from "react";

const SITE = "https://grizzlychefs.com";
const ORDER = `${SITE}/online-order`;
const P = `${ORDER}/p`;

// Photos live in public/images. They are the restaurant's own photos with the
// extra white margin trimmed off, so every dish can be shown whole (no cropping).
const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;
const LOGO = img("logo.png");

const TC = ({ children = "To confirm" }: { children?: ReactNode }) => (
  <span className="confirm-pill" title="Placeholder: needs the owner's details">
    {children}
  </span>
);

// w/h are each photo's real pixel size, so the browser reserves the right space.
const dishes = [
  { h: `${P}/cheeseburger`, n: "Classic Cheeseburger and Fries", p: "from $10.50", src: img("cheeseburger.jpg"), w: 800, hgt: 680, alt: "Classic cheeseburger with melted cheese on a toasted bun, served with golden fries" },
  { h: `${P}/chicken-and-waffles`, n: "Chicken and Waffles", p: "$12.99", src: img("waffles.jpg"), w: 800, hgt: 648, alt: "Crispy fried chicken served on top of fluffy golden waffles" },
  { h: `${P}/du3f6mmcyyln8cdzo3a5jbl8f064pj`, n: "Quesabirrias", p: "$12.50", src: img("quesabirria.jpg"), w: 800, hgt: 459, alt: "Crispy cheese-filled quesabirria tacos with a cup of consommé for dipping" },
  { h: `${P}/harvest-moon-cup-5fc72-3b3jj`, n: "Chipotle Fried Chicken Sandwich and Fries", p: "from $11.99", src: img("chipotle.jpg"), w: 800, hgt: 702, alt: "Fried chicken sandwich with chipotle sauce on a bun, with a side of fries" },
  { h: `${P}/feb5strrxgxj2lohuz6679109ls2u6`, n: "Breakfast Burrito", p: "from $8.99", src: img("burrito.jpg"), w: 800, hgt: 583, alt: "Breakfast burrito cut in half showing eggs, potatoes and cheese inside" },
  { h: `${P}/todays-special`, n: "Orange Chicken and Steamed Rice", p: "$11.50", src: img("orange.jpg"), w: 800, hgt: 726, alt: "Glazed orange chicken pieces next to a scoop of white steamed rice" },
  { h: `${P}/mangonada`, n: "Mangonada (24oz)", p: "$5.00", src: img("mangonada.jpg"), w: 506, hgt: 800, alt: "Large mangonada drink with mango, chamoy and chili, topped with a tamarind straw" },
  { h: `${P}/double-cheese-burger`, n: "Double Cheese Burger", p: "from $11.75", src: img("double.jpg"), w: 800, hgt: 687, alt: "Double cheeseburger with two beef patties and melted cheese on a toasted bun" },
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
  ["Late Plate", "#late-plate"],
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
  "Hours block that never cuts off or overlaps on phones",
  "No leftover template text, demo products or stray characters",
  "Fewer third-party widgets for a faster page",
];

const socials = [
  { l: "Instagram", h: "https://www.instagram.com/grizzly_chefs_berkeley/", d: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-9.6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" },
  { l: "Facebook", h: "https://www.facebook.com/profile.php?id=100089994663235", d: "M14 8V6c0-.9.6-1.1 1-1.1h2.5V1h-3.5C10.2 1 9.5 3.8 9.5 5.6V8H7v4h2.5v11h4.5V12h3.3l.4-4H14z" },
  { l: "TikTok", h: "https://www.tiktok.com/@grizzlychefs", d: "M16.6 2h-3.4v13.4a2.9 2.9 0 11-2-2.8V9.2a6.3 6.3 0 105.4 6.2V8.6a7.9 7.9 0 004.4 1.4V6.6a4.5 4.5 0 01-4.4-4.6z" },
];

const btnHoney = "pill-btn bg-honey text-honey-foreground hover:brightness-105";
const btnForest = "pill-btn bg-forest text-forest-foreground hover:opacity-90";
const btnOutline = "pill-btn border-2 border-forest text-forest hover:bg-forest hover:text-forest-foreground";

export default function App() {
  const [banner, setBanner] = useState(true);
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState(false);

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

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
          <a href="#top" className="flex shrink-0 items-center"><img src={LOGO} alt="Grizzly Chefs logo" width={267} height={64} className="h-14 w-auto lg:h-16" /></a>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex gap-6 font-semibold">
              {nav.map(([l, h]) => <li key={l}><a href={h} className="whitespace-nowrap hover:text-confirm">{l}</a></li>)}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a href={ORDER} className={`${btnHoney} hidden whitespace-nowrap sm:inline-flex`}>Order now</a>
            <button className="grid h-12 w-12 place-items-center rounded-full hover:bg-muted lg:hidden" aria-label="Menu" aria-expanded={menu} aria-controls="mobile-nav" onClick={() => setMenu(!menu)}>
              <span className="text-2xl" aria-hidden>{menu ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
        {menu && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border px-4 pb-4 lg:hidden">
            <ul>
              {nav.map(([l, h]) => <li key={l}><a href={h} onClick={() => setMenu(false)} className="block py-3 text-lg font-semibold">{l}</a></li>)}
            </ul>
            <a href={ORDER} className={`${btnHoney} mt-2 w-full`}>Order now</a>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero: the photo is 3:4, so the frame is 3:4 too and nothing gets cropped */}
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-confirm">Berkeley, CA · Near UC Berkeley</p>
            <h1 className="text-4xl font-black leading-[1.05] md:text-6xl">Hot, fresh food delivered across Berkeley in as little as 15 minutes.</h1>
            <p className="mt-5 text-lg text-muted-foreground">Burgers, burritos, breakfast and more from Chef Felipe's kitchen. No delivery fee, ever.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={ORDER} className={btnHoney}>Order now</a>
              <a href={`${SITE}/catering`} className={btnOutline}>Plan catering</a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <li><span className="text-confirm">★</span> 5.0 on Google · 31 reviews</li>
              <li>No delivery fee</li>
              <li>Delivery in ~15 min</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Hours: <TC /></p>
          </div>
          <img src={img("hero.jpg")} alt="Grizzly Chefs Munch Box with onion rings, jalapeño poppers, chicken nuggets, mozzarella sticks and fries, with two dipping sauces" width={600} height={800} className="mx-auto aspect-[3/4] w-full max-w-md rounded-3xl object-cover shadow-2xl" fetchPriority="high" />
        </section>

        {/* Popular: whole photos on a white square, scaled to fit (object-contain) */}
        <section id="popular" className="bg-secondary py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-black md:text-4xl">Popular right now</h2>
            <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {dishes.map((d) => (
                <li key={d.n} className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm">
                  <div className="relative aspect-square bg-white">
                    <img src={d.src} alt={d.alt} width={d.w} height={d.hgt} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-3" />
                  </div>
                  <div className="flex flex-1 flex-col p-3 md:p-4">
                    <h3 className="font-bold leading-tight">{d.n}</h3>
                    <p className="mt-1 text-muted-foreground">{d.p}</p>
                    <a href={d.h} className="mt-auto pt-3 font-bold text-forest underline underline-offset-4" aria-label={`Order ${d.n}`}>Order →</a>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center"><a href={ORDER} className={btnForest}>See full menu</a></div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-black md:text-4xl">Delivery, catering and meal plans</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <article key={s.t} className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-sm">
                <div className="relative aspect-[4/3] bg-white">
                  <img src={s.src} alt={s.alt} width={s.w} height={s.hgt} loading="lazy" className="absolute inset-0 h-full w-full object-contain p-4" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-2xl font-black">{s.t}</h3>
                  <p className="text-muted-foreground">{s.d}</p>
                  <a href={s.h} className={`${btnHoney} mt-auto self-start`}>{s.b}</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Meal plans */}
        <section id="meal-plans" className="bg-forest py-16 text-forest-foreground">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-black md:text-4xl">Meal plans</h2>
            <p className="mt-2 opacity-85">Weekday delivery, prices shown up front.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {plans.map((p) => (
                <article key={p.t} className="flex flex-col rounded-3xl bg-card p-6 text-card-foreground">
                  <h3 className="text-2xl font-black">{p.t}</h3>
                  <ul className="mt-4 space-y-2">{p.inc.map((i) => <li key={i}>✓ {i}</li>)}</ul>
                  <p className="mt-4 font-bold">{p.price}</p>
                  <a href={p.h} className={`${btnHoney} mt-6`}>Enroll</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Late plate: 3:4 photo in a 3:4 frame */}
        <section id="late-plate" className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black md:text-4xl">Late Plate for chapters</h2>
            <p className="mt-4 text-lg text-muted-foreground">Fraternity and sorority chapters get members' meals saved and delivered after events and late meetings. Members sign in with their chapter login. <TC>To confirm exact description</TC></p>
            <a href={`${SITE}/chapter-login`} className={`${btnForest} mt-6`}>Chapter sign in</a>
          </div>
          <img src={img("lateplate.jpg")} width={600} height={800} alt="Plated Grizzly Chefs meal saved as a late plate for a chapter member" loading="lazy" className="mx-auto aspect-[3/4] w-full max-w-md rounded-3xl object-cover" />
        </section>

        {/* Reviews */}
        <section id="reviews" className="bg-secondary py-16">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-3xl font-black md:text-5xl">5.0 <span className="text-confirm" aria-hidden>★★★★★</span><span className="sr-only">five stars</span></h2>
            <p className="mt-2 text-lg font-semibold">from 31 Google reviews</p>
            <ul className="mt-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
              {reviews.map(([q, a]) => (
                <li key={a}><figure className="h-full rounded-2xl bg-card p-6 shadow-sm"><blockquote className="text-lg font-semibold">“{q}”</blockquote><figcaption className="mt-3 text-muted-foreground">{a}</figcaption></figure></li>
              ))}
            </ul>
            <a href="https://www.google.com/maps?cid=5101223044455455885" target="_blank" rel="noopener" className="mt-8 inline-block font-bold underline underline-offset-4">Read reviews on Google</a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-black md:text-4xl">Contact and hours</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <dl className="space-y-5 text-lg">
                <div><dt className="font-bold">Phone</dt><dd><a href="tel:+15107102011" className="font-semibold underline underline-offset-4">(510) 710-2011</a></dd></div>
                <div><dt className="font-bold">Email</dt><dd><TC>To confirm: one email address</TC></dd></div>
                <div><dt className="font-bold">Address</dt><dd><TC>To confirm: one address</TC></dd></div>
                <div><dt className="font-bold">Delivery area</dt><dd>Berkeley, CA <TC>To confirm area</TC></dd></div>
              </dl>
              <a href={`${SITE}/contact-us`} className={`${btnForest} mt-6`}>Contact us</a>
            </div>
            <div className="rounded-3xl bg-card p-6 shadow-sm">
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
        <a href={ORDER} className={`${btnHoney} w-full whitespace-nowrap`}>Order now</a>
      </div>
      {panel && <ChangesPanel onClose={() => setPanel(false)} />}
    </>
  );
}

function ChangesPanel({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = f[0], last = f[f.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); prev?.focus(); };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-forest/60" onClick={onClose} aria-hidden />
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="changes-title" className="absolute inset-y-0 left-0 w-full max-w-md overflow-y-auto bg-background p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 id="changes-title" className="text-2xl font-black">What this concept fixes</h2>
          <button onClick={onClose} aria-label="Close" className="grid h-11 w-11 place-items-center rounded-full text-xl hover:bg-muted">✕</button>
        </div>
        <ul className="mt-6 space-y-3">
          {fixes.map((f) => <li key={f} className="flex gap-3"><span className="font-black text-confirm" aria-hidden>✓</span>{f}</li>)}
        </ul>
      </div>
    </div>
  );
}
