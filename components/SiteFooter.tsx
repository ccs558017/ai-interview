import Link from "next/link";
import { Logo } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            貼上職缺,和 AI 面試官實戰演練。把緊張留在練習裡,把自信帶進面試室。
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <div className="font-medium">產品</div>
          <Link href="/#features" className="block text-muted hover:text-ink">功能特色</Link>
          <Link href="/#how" className="block text-muted hover:text-ink">運作方式</Link>
          <Link href="/practice" className="block text-muted hover:text-ink">開始練習</Link>
        </div>
        <div className="space-y-3 text-sm">
          <div className="font-medium">資源</div>
          <Link href="/#faq" className="block text-muted hover:text-ink">常見問題</Link>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-6 py-5 text-xs text-muted">
          <span>© Rehearse. All rights reserved.</span>
          <span>Made for the nervous, the ambitious, the almost-hired.</span>
        </div>
      </div>
    </footer>
  );
}
