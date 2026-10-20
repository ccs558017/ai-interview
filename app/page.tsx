import Link from "next/link";

const features = [
  {
    n: "01",
    title: "依職缺量身出題",
    body: "貼上任何職缺描述,面試官會針對職責與技能出題,並根據你的回答追問,像真人一樣有來有往。",
  },
  {
    n: "02",
    title: "題數自己決定",
    body: "只想暖身 1 題,或想完整模擬 10 題?由你決定面試的長度與強度。",
  },
  {
    n: "03",
    title: "逐題評分",
    body: "每一題都有獨立分數與評語,總分是各題平均,算式攤開來看,清楚知道分數從哪裡來。",
  },
  {
    n: "04",
    title: "更好的回答範例",
    body: "不只告訴你哪裡不夠好,還示範一個完整的參考回答,讓你下次直接說得更漂亮。",
  },
];

const steps = [
  ["貼上職缺", "把想應徵的職缺描述貼進來,選擇題數。"],
  ["實戰作答", "AI 面試官逐題發問,你像真的面試一樣回答。"],
  ["拿到報告", "逐題分數、評語與更好的回答,一次到位。"],
];

const faqs = [
  ["需要註冊嗎?", "不需要,打開就能開始練習。"],
  ["可以練習任何職缺嗎?", "可以。只要有職缺描述,不論工程、設計、行銷或業務都能出題。"],
  ["總分是怎麼算的?", "總分是每一題分數的平均,報告上會直接顯示計算算式。"],
  ["我的回答會被保存嗎?", "對話只存在你的瀏覽器畫面中,重新整理頁面就會清空。"],
];

export default function Landing() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pt-28">
          <div>
            <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper-2 px-4 py-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              AI 面試模擬器
            </div>
            <h1 className="reveal reveal-2 font-display text-5xl font-black leading-[1.12] tracking-tight md:text-7xl">
              面試前,
              <br />
              先<span className="relative whitespace-nowrap text-accent">彩排<Underline /></span>
              一遍。
            </h1>
            <p className="reveal reveal-3 mt-7 max-w-lg text-lg leading-relaxed text-muted">
              貼上你想應徵的職缺,AI 面試官會即時出題、追問,最後給你逐題評分與「更好的回答」範例。
            </p>
            <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/practice"
                className="group rounded-full bg-ink px-8 py-4 font-medium text-paper transition hover:bg-accent"
              >
                免費開始練習
                <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
              </Link>
              <a href="#how" className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
                看看怎麼運作
              </a>
            </div>
          </div>

          {/* Product mock */}
          <div className="reveal reveal-3 relative">
            <div className="rotate-2 rounded-3xl border border-line bg-white p-6 shadow-[0_30px_60px_-30px_rgba(23,20,15,0.35)]">
              <div className="mb-4 flex items-center justify-between text-xs text-muted">
                <span>面試評估報告</span>
                <span>前端工程師</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="font-display text-7xl font-black leading-none text-accent">78</span>
                <span className="pb-2 text-muted">/ 100</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted">(72 + 80 + 82) ÷ 3 = 78</p>
              <div className="mt-5 space-y-3">
                {[["自我介紹", 72], ["SSR 經驗", 80], ["效能優化", 82]].map(([t, v]) => (
                  <div key={t}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span>{t}</span>
                      <span className="text-muted">{v}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-paper-2">
                      <div className="h-full rounded-full bg-ink" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border-l-4 border-accent bg-sage/60 p-3 text-xs leading-relaxed">
                <div className="mb-1 font-medium">更好的回答方式</div>
                我在專案中以 Next.js 實作 SSR,首屏載入時間縮短 40%……
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 -rotate-3 rounded-2xl bg-ink px-4 py-3 text-sm text-paper shadow-lg">
              「談談你最有成就感的專案?」
            </div>
          </div>
        </div>
      </section>

      {/* Marquee strip */}
      <div className="overflow-hidden border-y border-line bg-ink py-4 text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-2 px-6 font-display text-lg">
          {["工程", "設計", "產品", "行銷", "業務", "營運"].map((t) => (
            <span key={t} className="flex items-center gap-10">
              {t}
              <span className="text-accent">✦</span>
            </span>
          ))}
          <span className="text-paper/60">任何職缺都能練</span>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-sm text-accent">功能特色</p>
          <h2 className="font-display text-4xl font-black leading-tight md:text-5xl">
            不只是出題,
            <br />
            而是真的讓你變強。
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2">
          {features.map((f) => (
            <div key={f.n} className="group bg-paper p-9 transition hover:bg-white">
              <div className="mb-8 font-mono text-sm text-muted transition group-hover:text-accent">{f.n}</div>
              <h3 className="mb-3 text-xl font-semibold">{f.title}</h3>
              <p className="leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-20 bg-sage/50 py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-sm text-accent">運作方式</p>
          <h2 className="mb-14 font-display text-4xl font-black md:text-5xl">三步驟,上場前就位。</h2>
          <ol className="grid gap-8 md:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li key={t} className="relative rounded-3xl bg-paper p-8">
                <span className="font-display text-7xl font-black text-accent/30">{i + 1}</span>
                <h3 className="mt-2 text-xl font-semibold">{t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-28">
        <h2 className="mb-10 font-display text-4xl font-black md:text-5xl">常見問題</h2>
        <div className="divide-y divide-line border-y border-line">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {q}
                <span className="text-xl text-accent transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-28">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-ink px-8 py-20 text-center text-paper">
          <h2 className="font-display text-4xl font-black md:text-6xl">
            下一次面試,
            <br />
            你已經<span className="text-accent">練過了</span>。
          </h2>
          <Link
            href="/practice"
            className="mt-10 inline-block rounded-full bg-accent px-9 py-4 font-medium text-white transition hover:bg-paper hover:text-ink"
          >
            立即開始練習 →
          </Link>
        </div>
      </section>
    </main>
  );
}

function Underline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className="absolute -bottom-1 left-0 h-3 w-full"
    >
      <path d="M2 8 C 40 2, 90 12, 130 6 S 185 4, 198 7" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
