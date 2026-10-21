import { useEffect, useRef, useState, type ReactNode, type InputHTMLAttributes } from "react";
import { Icon } from "./Icon";

export function SectionHeading({ eyebrow, title, text, center = true }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-primary">{eyebrow}</p>}
      <h2 className="text-3xl font-semibold text-foreground md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground md:text-lg">{text}</p>}
    </div>
  );
}

export function PageHero({ title, text, image }: { title: string; text?: string; image: string }) {
  return (
    <section className="relative mx-3 mt-3 overflow-hidden rounded-3xl md:mx-6">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 text-primary-foreground md:py-32">
        <h1 className="max-w-3xl text-4xl font-semibold md:text-6xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg opacity-90">{text}</p>}
      </div>
    </section>
  );
}

export function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration]);
  return { ref, val };
}

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ref, val } = useCountUp(value);
  return <span ref={ref}>{val.toLocaleString("en-IN")}{suffix}</span>;
}

const badgeTone: Record<string, string> = {
  active: "bg-mint text-primary-deep", valid: "bg-mint text-primary-deep", success: "bg-mint text-primary-deep",
  approved: "bg-mint text-primary-deep", upcoming: "bg-mint text-primary-deep",
  pending: "bg-accent/20 text-accent-foreground", "on leave": "bg-accent/20 text-accent-foreground", expired: "bg-accent/20 text-accent-foreground",
  completed: "bg-muted text-muted-foreground",
  inactive: "bg-destructive/10 text-destructive", revoked: "bg-destructive/10 text-destructive", failed: "bg-destructive/10 text-destructive",
  disabled: "bg-destructive/10 text-destructive", invalid: "bg-destructive/10 text-destructive", rejected: "bg-destructive/10 text-destructive",
};
export function Badge({ children }: { children: string }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${badgeTone[String(children).toLowerCase()] ?? "bg-muted text-foreground"}`}>{children}</span>;
}

export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}
export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`input-field ${props.className ?? ""}`} />;
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: ReactNode; wide?: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/50 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className={`card-soft my-8 w-full ${wide ? "max-w-4xl" : "max-w-xl"} p-6`} onClick={(e) => e.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-muted" aria-label="Close"><Icon name="x" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function QrPlaceholder({ value, size = 80 }: { value: string; size?: number }) {
  let h = 0;
  for (const ch of value) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const n = 21;
  const cells: ReactNode[] = [];
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    let on: boolean;
    if (finder(x, y)) {
      const lx = x % (n - 7 === x - (x % 7) ? 7 : 7), ly = y;
      void lx; void ly;
      const fx = x >= n - 7 ? x - (n - 7) : x, fy = y >= n - 7 ? y - (n - 7) : y;
      on = fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4);
    } else {
      h = (h * 1103515245 + 12345) >>> 0;
      on = (h >> 16) % 2 === 0;
    }
    if (on) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />);
  }
  return <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} width={size} height={size} className="rounded bg-card fill-foreground">{cells}</svg>;
}

export function Avatar({ name, photo, size = "h-12 w-12" }: { name: string; photo?: string; size?: string }) {
  if (photo) return <img src={photo} alt={name} className={`${size} rounded-full object-cover`} />;
  const initials = name.replace("Dr. ", "").split(" ").map((p) => p[0]).slice(0, 2).join("");
  return <div className={`${size} flex shrink-0 items-center justify-center rounded-full bg-gradient-primary font-bold text-primary-foreground`}>{initials}</div>;
}

export function StatCard({ icon, label, value, tone = "bg-gradient-primary" }: { icon: string; label: string; value: ReactNode; tone?: string }) {
  return (
    <div className="card-soft card-hover flex items-center gap-4 p-5">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone} text-primary-foreground`}><Icon name={icon} /></div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return <div className="card-soft p-10 text-center text-muted-foreground">{text}</div>;
}
