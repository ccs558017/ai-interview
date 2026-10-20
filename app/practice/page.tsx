"use client";

import Link from "next/link";
import { useState } from "react";
import { API_KEY_HEADER, useApiKey } from "@/lib/apiKey";

type Message = { role: "assistant" | "user"; content: string };
type Report = {
  score: number;
  summary: string;
  questions: {
    question: string;
    answer: string;
    score: number;
    feedback: string;
    betterAnswer: string;
  }[];
  strengths: string[];
  improvements: string[];
};

export default function Home() {
  const apiKey = useApiKey();
  const [totalQuestions, setTotalQuestions] = useState(3);
  const [jobDescription, setJobDescription] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");

  async function send(next: Message[]) {
    if (!apiKey) {
      setError("尚未設定 OpenAI API Key,請先到「設定」輸入。");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json", [API_KEY_HEADER]: apiKey ?? "" },
        body: JSON.stringify({ jobDescription, messages: next, totalQuestions }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "發生錯誤");
      if (data.report) {
        setReport(data.report);
        setMessages(next);
      } else {
        setMessages([...next, { role: "assistant", content: data.reply }]);
      }
      setFinished(data.finished);
      setStarted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "發生錯誤");
    } finally {
      setLoading(false);
    }
  }

  function start() {
    if (!jobDescription.trim()) return;
    send([]);
  }

  function answer() {
    if (!input.trim()) return;
    if (!apiKey) {
      setError("尚未設定 OpenAI API Key,請先到「設定」輸入。");
      return;
    }
    const next: Message[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(next);
    setInput("");
    send(next);
  }

  function reset() {
    setMessages([]);
    setStarted(false);
    setFinished(false);
    setReport(null);
    setInput("");
    setError("");
  }

  if (apiKey === null) {
    return <main className="flex-1" />;
  }

  if (!apiKey) {
    return (
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-5 px-6 py-24 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-ink text-2xl text-paper">🔑</div>
        <h1 className="font-display text-3xl font-black">請先設定 OpenAI API Key</h1>
        <p className="leading-relaxed text-muted">
          Rehearse 使用你自己的 OpenAI API Key 來進行面試。設定完成後,才能開始練習。
        </p>
        <Link
          href="/settings"
          className="rounded-full bg-ink px-8 py-3 font-medium text-paper transition hover:bg-accent"
        >
          前往設定 →
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-5 px-6 py-14">
      <div>
        <p className="mb-2 text-sm text-accent">練習室</p>
        <h1 className="font-display text-4xl font-black">AI 面試模擬器</h1>
      </div>

      {!started ? (
        <>
          <textarea
            className="min-h-48 rounded-2xl border border-line bg-white p-4 outline-none transition focus:border-ink"
            placeholder="貼上職缺描述..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <label className="flex items-center gap-2">
            面試題數
            <input
              type="number"
              min={1}
              max={10}
              value={totalQuestions}
              onChange={(e) =>
                setTotalQuestions(Math.min(10, Math.max(1, Number(e.target.value) || 1)))
              }
              className="w-20 rounded-xl border border-line bg-white p-2 outline-none focus:border-ink"
            />
            <span className="text-sm text-muted">(1–10 題)</span>
          </label>
          <button
            className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
            onClick={start}
            disabled={loading || !jobDescription.trim()}
          >
            {loading ? "準備中..." : "開始面試"}
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`whitespace-pre-wrap rounded-2xl p-4 ${
                  m.role === "assistant"
                    ? "bg-paper-2"
                    : "ml-8 bg-sage"
                }`}
              >
                <div className="mb-1 text-xs text-muted">
                  {m.role === "assistant" ? "面試官" : "我"}
                </div>
                {m.content}
              </div>
            ))}
            {loading && <div className="text-sm text-muted">面試官思考中...</div>}
          </div>

          {report && <ReportCard report={report} />}

          {finished && report ? (
            <button className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:bg-accent" onClick={reset}>
              重新開始
            </button>
          ) : finished && !loading ? (
            <button
              className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:bg-accent"
              onClick={() => send(messages)}
            >
              重新產生評估報告
            </button>
          ) : finished ? null : (
            <div className="flex flex-col gap-2">
              <textarea
                className="min-h-24 rounded-2xl border border-line bg-white p-4 outline-none transition focus:border-ink"
                placeholder="輸入你的回答..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                className="rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
                onClick={answer}
                disabled={loading || !input.trim()}
              >
                送出回答
              </button>
            </div>
          )}
        </>
      )}

      {error && (
        <p className="text-accent">
          {error}
          {!apiKey && (
            <Link href="/settings" className="ml-1 underline underline-offset-4">
              前往設定 →
            </Link>
          )}
        </p>
      )}
    </main>
  );
}

function ReportCard({ report }: { report: Report }) {
  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl font-black">面試評估報告</h2>
        <div className="font-display text-5xl font-black text-accent">
          {report.score}
          <span className="text-base text-muted"> / 100</span>
        </div>
      </div>
      <p className="text-sm text-muted">
        總分為各題平均:({report.questions.map((q) => q.score).join(" + ")}) ÷{" "}
        {report.questions.length} = {report.score}
      </p>
      <p>{report.summary}</p>

      <div className="flex flex-col gap-3">
        {report.questions.map((q, i) => (
          <div key={i} className="rounded-2xl bg-paper-2 p-4">
            <div className="flex justify-between font-medium">
              <span>第 {i + 1} 題:{q.question}</span>
              <span>{q.score} 分</span>
            </div>
            {q.answer && (
              <p className="mt-1 text-sm text-muted">我的回答:{q.answer}</p>
            )}
            <p className="mt-1 text-sm">{q.feedback}</p>
            <div className="mt-2 rounded-xl border-l-4 border-accent bg-sage/60 p-3 text-sm">
              <div className="font-medium">更好的回答方式</div>
              {q.betterAnswer}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold text-ink">優點</h3>
        <ul className="list-disc pl-5">
          {report.strengths.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-accent">改進建議</h3>
        <ul className="list-disc pl-5">
          {report.improvements.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
