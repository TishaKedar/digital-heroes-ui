import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, ShieldCheck, Trophy, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5 font-display font-extrabold text-foreground">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm"><ShieldCheck className="size-5" /></span>
      {!compact && <span className="text-lg">Digital Heroes</span>}
    </Link>
  );
}

const publicLinks = [{ to: "/charities", label: "Charities" }, { to: "/draw", label: "Monthly draw" }];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-7 md:flex">
          {publicLinks.map((item) => <Link key={item.to} to={item.to} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>)}
          <Link to="/login" className="text-sm font-semibold text-foreground">Log in</Link>
          <Button asChild className="h-10 rounded-xl px-5"><Link to="/signup">Join the club</Link></Button>
        </nav>
        <Button aria-label="Toggle navigation" variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="grid gap-2 border-t border-border bg-card p-5 md:hidden">{publicLinks.map((item) => <Link key={item.to} to={item.to} className="rounded-lg px-3 py-2 font-semibold" onClick={() => setOpen(false)}>{item.label}</Link>)}<Button asChild variant="outline"><Link to="/login">Log in</Link></Button><Button asChild><Link to="/signup">Join the club</Link></Button></nav>}
    </header>
  );
}

const appLinks = [
  { to: "/dashboard", label: "Overview" },
  { to: "/charities", label: "Charities" },
  { to: "/draw", label: "Draws" },
  { to: "/admin", label: "Admin" },
];

export function AppShell({ children, title, eyebrow = "Member space", action }: { children: ReactNode; title: string; eyebrow?: string; action?: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[250px_1fr]">
      <aside className={cn("fixed inset-y-0 left-0 z-50 w-[250px] border-r border-border bg-card p-5 transition-transform lg:translate-x-0", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between"><Brand /><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)}><X /></Button></div>
        <nav className="mt-10 grid gap-1.5">{appLinks.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className={cn("rounded-xl px-4 py-3 text-sm font-semibold transition-colors", path === item.to ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>{item.label}</Link>)}</nav>
        <div className="absolute inset-x-5 bottom-5 rounded-xl bg-muted p-4"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-full bg-accent text-accent-foreground font-bold">AM</div><div><p className="text-sm font-bold">Alex Morgan</p><p className="text-xs text-muted-foreground">Hero member</p></div></div></div>
      </aside>
      {open && <div className="fixed inset-0 z-40 bg-foreground/25 lg:hidden" onClick={() => setOpen(false)} />}
      <main className="min-w-0 lg:col-start-2">
        <header className="flex min-h-20 items-center justify-between border-b border-border bg-card px-5 lg:px-9"><div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}><Menu /></Button><div><p className="text-xs font-bold uppercase text-primary">{eyebrow}</p><h1 className="text-xl font-bold sm:text-2xl">{title}</h1></div></div>{action}</header>
        <div className="p-5 lg:p-9">{children}</div>
      </main>
    </div>
  );
}

export function StatCard({ label, value, detail, icon }: { label: string; value: string; detail: string; icon?: ReactNode }) {
  return <div className="rounded-2xl border border-border bg-card p-5 premium-shadow"><div className="flex items-start justify-between"><p className="text-sm font-semibold text-muted-foreground">{label}</p>{icon && <span className="grid size-9 place-items-center rounded-lg bg-secondary text-primary">{icon}</span>}</div><p className="mt-5 font-display text-3xl font-extrabold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div>;
}

export function SectionHeading({ eyebrow, title, copy, center = false }: { eyebrow: string; title: string; copy?: string; center?: boolean }) {
  return <div className={cn("max-w-2xl", center && "mx-auto text-center")}><p className="text-xs font-extrabold uppercase text-primary">{eyebrow}</p><h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h2>{copy && <p className="mt-4 leading-7 text-muted-foreground">{copy}</p>}</div>;
}

export function Ball({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "impact" | "muted" }) {
  return <span className={cn("grid size-11 place-items-center rounded-full border-4 border-card font-display text-sm font-extrabold shadow-sm", tone === "primary" && "bg-primary text-primary-foreground", tone === "impact" && "bg-impact text-impact-foreground", tone === "muted" && "bg-secondary text-secondary-foreground")}>{children}</span>;
}

export function ImpactBadge({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground"><Heart className="size-3.5 fill-current" />{children}</span>;
}

export function EmptyTrophy() { return <Trophy className="size-5" />; }