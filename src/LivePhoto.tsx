import type { CSSProperties } from "react";
import { cssVars } from "./shared";

// "Live photo" effects drawn on top of the real menu photo with CSS only (no video files).
// x/y are % of the photo itself, so each effect sits on the right part of the food.
export type Live =
  | { k: "steam"; x: number; y: number; s?: number; d?: number }   // rising steam, s = width in %
  | { k: "drip"; x: number; y: number; len?: number; d?: number }  // melted cheese stretching down
  | { k: "glint"; x: number; y: number; s?: number; d?: number }   // a quick sparkle
  | { k: "drop"; x: number; y: number; dist?: number; d?: number }; // a cold droplet sliding down a cup

const pct = (n: number) => `${n}%`;

export function LiveLayer({ src, w, h, fx }: { src: string; w: number; h: number; fx: Live[] }) {
  // Same box as the photo's object-contain area, so x/y line up with the food.
  const box: CSSProperties = { aspectRatio: `${w} / ${h}`, ...(w >= h ? { width: "100%" } : { height: "100%" }) };
  const mask = `url(${src.replace("/images/", "/images/mask/").replace(/\.jpe?g$/, ".png")})`;
  return (
    <div aria-hidden className="live food-photo pointer-events-none absolute inset-0 grid place-items-center p-3">
      <div className="relative" style={box}>
        <span className="live-gloss" style={{ maskImage: mask, WebkitMaskImage: mask }} />
        {fx.map((f, i) => {
          const base = { "--x": pct(f.x), "--y": pct(f.y), "--d": `${f.d ?? 0}s` };
          if (f.k === "steam") return <span key={i} className="live-steam" style={cssVars({ ...base, "--s": pct(f.s ?? 14) })}><i /><i /><i /></span>;
          if (f.k === "drip") return <span key={i} className="live-drip" style={cssVars({ ...base, "--len": pct(f.len ?? 8) })} />;
          if (f.k === "glint") return <span key={i} className="live-glint" style={cssVars({ ...base, "--s": pct(f.s ?? 7) })} />;
          return <span key={i} className="live-drop" style={cssVars({ ...base, "--dist": `${f.dist ?? 600}%` })} />;
        })}
      </div>
    </div>
  );
}
