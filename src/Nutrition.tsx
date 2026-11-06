import { Dialog, TC } from "./shared";

export type Dish = {
  h: string; n: string; p: string; src: string; w: number; hgt: number; alt: string;
  inside: string[];          // what's in it, taken from the dish's own menu page
  options?: string;          // e.g. a vegetarian swap offered on the menu page
  note?: string;             // something on the live menu page that disagrees
  facts?: Facts;             // estimated nutrition (Cesar's estimates, not lab-tested)
};

export type Facts = { serving: string; cal: number; protein?: number; carbs?: number; fat?: number; sugar?: number };

const fmt = (n: number) => n.toLocaleString("en-US");

/** Small line for the dish card, e.g. "≈1,050 cal · 35 g protein (est.)" */
export function FactsLine({ f }: { f: Facts }) {
  return (
    <p className="mt-1 text-xs font-semibold text-muted-foreground">
      ≈{fmt(f.cal)} cal{f.protein != null && <> · {f.protein} g protein</>} <span className="font-normal">(est.)</span>
    </p>
  );
}

/** Nutrition panel for one dish. Ingredients are real (from grizzlychefs.com);
 *  the numbers are estimates for the mockup until Grizzly Chefs confirms them. */
export function NutritionDialog({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  return (
    <Dialog title={dish.n} onClose={onClose}>
      <div className="mt-4 flex items-center gap-4">
        <img src={dish.src} alt="" width={dish.w} height={dish.hgt} className="h-20 w-24 shrink-0 object-contain mix-blend-multiply" />
        <p className="text-muted-foreground">{dish.p}</p>
      </div>

      <h3 className="mt-5 font-black">What's in it</h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {dish.inside.map((i) => <li key={i} className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold">{i}</li>)}
      </ul>
      {dish.options && <p className="mt-3 text-sm"><span className="mr-1 rounded-full bg-forest px-2 py-0.5 text-xs font-bold text-forest-foreground">🌱 Option</span>{dish.options}</p>}
      {dish.note && <p className="mt-3 text-sm">{dish.note} <TC /></p>}

      {/* Nutrition Facts label, laid out like the standard US label */}
      <section aria-label="Estimated nutrition facts" className="mt-5 border-2 border-foreground p-3 font-sans">
        <div className="flex items-start justify-between gap-2">
          <p className="text-3xl font-black leading-none tracking-tight">Nutrition Facts</p>
          <span className="shrink-0 rounded-full bg-honey px-2 py-0.5 text-xs font-black uppercase text-honey-foreground">Estimated</span>
        </div>
        <p className="mt-1 border-b border-foreground pb-1 text-sm">Serving size <strong>{dish.facts?.serving ?? "1 order"}</strong></p>
        <div className="flex items-end justify-between border-b-8 border-foreground py-1">
          <span className="text-2xl font-black">Calories</span>
          <span className="text-4xl font-black">{dish.facts ? `≈${fmt(dish.facts.cal)}` : "—"}</span>
        </div>
        <dl className="text-sm">
          {([["Total Fat", dish.facts?.fat], ["Total Carbohydrate", dish.facts?.carbs], ["Total Sugars", dish.facts?.sugar], ["Protein", dish.facts?.protein]] as [string, number | undefined][])
            .filter(([, v]) => v != null)
            .map(([label, v]) => (
              <div key={label} className="flex justify-between border-b border-foreground/40 py-1">
                <dt className="font-bold">{label}</dt>
                <dd>≈{v} g</dd>
              </div>
            ))}
        </dl>
        <p className="mt-2 text-xs">Allergens: <TC /></p>
      </section>
      <p className="mt-3 text-sm text-muted-foreground"><TC>Estimates</TC> Based on typical recipes and portion sizes, not lab-tested. Final numbers to confirm with Grizzly Chefs.</p>
    </Dialog>
  );
}
