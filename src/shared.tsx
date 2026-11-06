import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export const SITE = "https://grizzlychefs.com";
export const ORDER = `${SITE}/online-order`;

// Photos live in public/images (the restaurant's own photos, shown whole).
export const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

// lets us pass CSS custom properties (animation delays etc.) through style={}
export const cssVars = (o: Record<string, string>) => o as CSSProperties;

export const btnHoney = "pill-btn bg-honey text-honey-foreground hover:brightness-105";
export const btnForest = "pill-btn bg-forest text-forest-foreground hover:opacity-90";
export const btnOutline = "pill-btn border-2 border-forest text-forest hover:bg-forest hover:text-forest-foreground";

// Dashed "To confirm" pill: anything the owner still has to confirm.
export const TC = ({ children = "To confirm" }: { children?: ReactNode }) => (
  <span className="confirm-pill" title="Placeholder: needs the owner's details">
    {children}
  </span>
);

/** Accessible dialog: focus trap, Esc to close, focus returns afterwards. */
export function Dialog({ title, onClose, variant = "center", children }: { title: string; onClose: () => void; variant?: "center" | "drawer"; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current();
      if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button, a[href], input, [tabindex]:not([tabindex='-1'])");
        const first = f[0], last = f[f.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; prev?.focus(); };
  }, []);
  const box = variant === "drawer"
    ? "absolute inset-y-0 left-0 w-full max-w-md overflow-y-auto bg-background p-6 shadow-2xl"
    : "dialog-pop absolute inset-x-3 bottom-3 top-auto max-h-[88vh] overflow-y-auto rounded-3xl bg-background p-6 shadow-2xl sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:w-[30rem] sm:-translate-x-1/2 sm:-translate-y-1/2";
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-forest/60" onClick={onClose} aria-hidden />
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby="dialog-title" className={box}>
        <div className="flex items-start justify-between gap-4">
          <h2 id="dialog-title" className="text-2xl font-black leading-tight">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-xl hover:bg-muted">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
