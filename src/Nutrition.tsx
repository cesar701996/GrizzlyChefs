import { Dialog, TC } from "./shared";

export type Dish = {
  h: string; n: string; p: string; src: string; w: number; hgt: number; alt: string;
  inside: string[];          // what's in it, taken from the dish's own menu page
  options?: string;          // e.g. a vegetarian swap offered on the menu page
  note?: string;             // something on the live menu page that disagrees
};

const rows: [string, string, boolean?][] = [
  ["Total Fat", "g"], ["Saturated Fat", "g", true], ["Cholesterol", "mg"], ["Sodium", "mg"],
  ["Total Carbohydrate", "g"], ["Dietary Fiber", "g", true], ["Total Sugars", "g", true], ["Protein", "g"],
];

/** Nutrition panel for one dish. Ingredients are real (from grizzlychefs.com);
 *  the numbers are blank until Grizzly Chefs supplies them. */
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
      <section aria-label="Nutrition facts" className="mt-5 border-2 border-foreground p-3 font-sans">
        <p className="text-3xl font-black leading-none tracking-tight">Nutrition Facts</p>
        <p className="mt-1 border-b border-foreground pb-1 text-sm">Serving size <strong>1 order</strong></p>
        <div className="flex items-end justify-between border-b-8 border-foreground py-1">
          <span className="text-2xl font-black">Calories</span>
          <span className="text-3xl font-black">—</span>
        </div>
        <dl className="text-sm">
          {rows.map(([label, unit, indent]) => (
            <div key={label} className={`flex justify-between border-b border-foreground/40 py-1 ${indent ? "pl-4" : ""}`}>
              <dt className={indent ? "" : "font-bold"}>{label}</dt>
              <dd>— {unit}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-xs">Allergens: <TC /></p>
      </section>
      <p className="mt-3 text-sm text-muted-foreground"><TC>Numbers to confirm</TC> Grizzly Chefs doesn't publish nutrition info yet. Running each recipe through a nutrition calculator fills these in.</p>
    </Dialog>
  );
}
