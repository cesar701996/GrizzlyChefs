import { TC, img } from "./shared";

const TIKTOK = "https://www.tiktok.com/@grizzlychefs";
const INSTAGRAM = "https://www.instagram.com/grizzly_chefs_berkeley/";

const tiles = [
  { src: "quesabirria.jpg", t: "Quesabirria dip 🔥", rot: "-3deg" },
  { src: "hero.jpg", t: "Packing a Munch Box", rot: "2deg" },
  { src: "mangonada.jpg", t: "Mangonada pour 🥭", rot: "-1.5deg" },
];

/** Students live on TikTok, so bring it to the page. The tiles link to the profile
 *  until Felipe picks three clips to embed. */
export function SocialSection() {
  return (
    <section id="tiktok" className="overflow-x-clip py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[1fr_1.2fr]">
        <div className="reveal">
          <p className="text-sm font-bold uppercase tracking-widest text-confirm">@grizzlychefs</p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Watch it get made. Then get it delivered.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Cheese pulls, fresh fries and mangonadas, straight from Chef Felipe's kitchen.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={TIKTOK} target="_blank" rel="noopener" className="pill-btn sheen bg-foreground text-background hover:opacity-90">Follow on TikTok</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener" className="pill-btn border-2 border-forest text-forest hover:bg-forest hover:text-forest-foreground">Instagram</a>
          </div>
          <p className="mt-4 text-sm"><TC>Embed 3 favorite clips (Felipe picks)</TC></p>
        </div>
        <ul className="reveal grid grid-cols-3 gap-3 md:gap-5" style={{ transitionDelay: "120ms" }}>
          {tiles.map((t, i) => (
            <li key={t.t} className={i === 1 ? "md:-mt-8" : "md:mt-6"}>
              <a href={TIKTOK} target="_blank" rel="noopener" aria-label={`${t.t} on TikTok`} className="food-card relative block aspect-[9/16] overflow-hidden rounded-2xl bg-white shadow-xl ring-4 ring-foreground" style={{ rotate: t.rot }}>
                <img src={img(t.src)} alt="" loading="lazy" className="food-photo absolute inset-0 h-full w-full object-contain p-1" />
                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" aria-hidden />
                <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl text-foreground shadow-lg" aria-hidden>▶</span>
                <span className="absolute bottom-2 left-2 right-2 text-xs font-bold leading-tight text-white md:text-sm">{t.t}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
