"use client";

import Link from "next/link";
import { useState } from "react";
import { saveApiKey, useApiKey } from "@/lib/apiKey";

export default function Settings() {
  const stored = useApiKey();
  const [draft, setDraft] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);

  const value = draft ?? stored ?? "";
  const hasKey = !!stored;

  const invalid = value.trim() !== "" && !value.trim().startsWith("sk-");

  function save() {
    if (invalid) return;
    saveApiKey(value.trim());
    setDraft(null);
    setSaved(true);
  }

  function clear() {
    saveApiKey("");
    setDraft(null);
    setSaved(false);
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-14">
      <div>
        <p className="mb-2 text-sm text-accent">設定</p>
        <h1 className="font-display text-4xl font-black">OpenAI API Key</h1>
        <p className="mt-3 leading-relaxed text-muted">
          Rehearse 採用 BYOK(自備金鑰)模式:面試使用你自己的 OpenAI API Key,費用由你的 OpenAI 帳戶支付。
        </p>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium">API Key</span>
        <div className="flex gap-2">
          <input
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => {
              setDraft(e.target.value);
              setSaved(false);
            }}
            placeholder="sk-..."
            autoComplete="off"
            spellCheck={false}
            className="flex-1 rounded-2xl border border-line bg-white p-4 font-mono text-sm outline-none transition focus:border-ink"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="rounded-2xl border border-line px-4 text-sm text-muted transition hover:text-ink"
          >
            {show ? "隱藏" : "顯示"}
          </button>
        </div>
      </label>

      {invalid && <p className="-mt-3 text-sm text-accent">OpenAI API Key 應以 sk- 開頭。</p>}

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={save}
          disabled={!value.trim() || invalid}
          className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
        >
          儲存
        </button>
        {hasKey && (
          <button onClick={clear} className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
            清除金鑰
          </button>
        )}
        {saved && <span className="text-sm text-ink">✓ 已儲存</span>}
        {hasKey && !saved && draft === null && <span className="text-sm text-muted">已設定金鑰</span>}
      </div>

      <div className="rounded-2xl border border-line bg-paper-2 p-5 text-sm leading-relaxed text-muted">
        <div className="mb-1 font-medium text-ink">金鑰如何被處理</div>
        金鑰只存在你瀏覽器的 localStorage。每次面試請求時會透過 HTTPS 標頭帶給我們的 API,
        再由伺服器轉送給 OpenAI,伺服器不會儲存或記錄它。請避免在共用電腦上使用。
      </div>

      {hasKey && (
        <Link href="/practice" className="text-accent underline-offset-4 hover:underline">
          前往練習 →
        </Link>
      )}
    </main>
  );
}
