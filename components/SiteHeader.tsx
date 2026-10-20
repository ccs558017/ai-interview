import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-sm text-paper">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      </span>
      <span className="font-display text-xl">Rehearse</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <Link href="/#features" className="transition hover:text-ink">功能特色</Link>
          <Link href="/#how" className="transition hover:text-ink">運作方式</Link>
          <Link href="/#faq" className="transition hover:text-ink">常見問題</Link>
        </nav>
        <Link
          href="/practice"
          className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition hover:bg-accent"
        >
          開始練習
        </Link>
      </div>
    </header>
  );
}
