import { ORDER, btnForest } from "./shared";

const todos = ["Finish the problem set", "Read chapters 4 to 7", "Start the essay (for real this time)"];

/** A bit of fun for students: the to-do list ticks off the one task that matters. */
export function StudyNight() {
  return (
    <section id="study-night" className="overflow-x-clip bg-honey py-16 text-forest">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <div className="reveal">
          <p className="text-sm font-black uppercase tracking-widest opacity-70">Study-night mode</p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Staying in to study? Bold. Staying in and eating well? Legendary.</h2>
          <p className="mt-4 text-lg font-semibold">Hot food at your door in about 15 minutes, so the only thing you get up for is the doorbell. No delivery fee, so your wallet survives finals too.</p>
          <ul className="mt-6 flex flex-wrap gap-2 font-bold">
            <li className="rounded-full bg-forest/10 px-3 py-1">🧠 Brain food (fries count)</li>
            <li className="rounded-full bg-forest/10 px-3 py-1">📚 Finals fuel</li>
            <li className="rounded-full bg-forest/10 px-3 py-1">🛋️ Zero trips outside</li>
          </ul>
          <a href={ORDER} className={`${btnForest} sheen mt-7`}>Order study fuel</a>
        </div>

        <div className="reveal study-card relative mx-auto w-full max-w-sm -rotate-2 rounded-2xl bg-white p-6 pl-10 text-foreground shadow-2xl" style={{ transitionDelay: "120ms" }}>
          <span aria-hidden className="absolute inset-y-0 left-6 w-px bg-red-300" />
          <p className="text-xl font-black">Tonight's to-do</p>
          <ul className="mt-4 space-y-3 text-lg">
            {todos.map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span aria-hidden className="h-6 w-6 shrink-0 rounded-md border-2 border-foreground/40" />
                <span>{t}</span>
                <span className="sr-only">(not done)</span>
              </li>
            ))}
            <li className="flex items-center gap-3 font-bold">
              <span aria-hidden className="tick grid h-6 w-6 shrink-0 place-items-center rounded-md bg-forest text-sm text-honey">✓</span>
              <span className="strike">Order Grizzly Chefs</span>
              <span className="sr-only">(done)</span>
            </li>
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">1 of 4 done. That's 25%. That's a start.</p>
        </div>
      </div>
    </section>
  );
}
