const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 10;
const DEFAULT_QUESTIONS = 3;
const MODEL = "gpt-4o-mini";

type Message = { role: "assistant" | "user"; content: string };

function buildSystemPrompt(
  jobDescription: string,
  answered: number,
  total: number,
) {
  const base = `你是一位專業、友善的面試官,正在為以下職缺進行模擬面試。請使用繁體中文。

【職缺描述】
${jobDescription}

面試共 ${total} 題,每次只問一個問題。`;

  if (answered >= total) {
    return `${base}

面試已結束。請根據使用者的所有回答產出面試評估報告,只輸出 JSON,格式如下:
{
  "summary": "整體評語(2-3 句)",
  "questions": [{
    "question": "該題題目",
    "answer": "使用者在該題的回答摘要",
    "score": 0-100 的整數,
    "feedback": "對該題回答的評語",
    "betterAnswer": "針對該題,示範一個更好的回答方式(完整的參考回答)"
  }],
  "strengths": ["優點"],
  "improvements": ["具體的改進建議"]
}
questions 需依序包含全部 ${total} 題。不要再提出新的問題。`;
  }

  const n = answered + 1;
  return `${base}

現在是第 ${n} 題(共 ${total} 題)。${
    answered === 0
      ? "請提出第一題,可從自我介紹或與職缺最相關的經驗切入。"
      : "請先用一句話簡短回應使用者上一題的回答,再根據其回答追問,或提出一個新的職缺相關問題。"
  }
只輸出面試官要說的話,不要給評分。`;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "缺少 OPENAI_API_KEY" }, { status: 500 });
  }

  let body: {
    jobDescription?: string;
    messages?: Message[];
    totalQuestions?: number;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "無效的請求內容" }, { status: 400 });
  }

  const jobDescription = body.jobDescription?.trim();
  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (!jobDescription) {
    return Response.json({ error: "請輸入職缺描述" }, { status: 400 });
  }

  const total = Math.min(
    MAX_QUESTIONS,
    Math.max(MIN_QUESTIONS, Math.floor(Number(body.totalQuestions) || DEFAULT_QUESTIONS)),
  );
  const answered = messages.filter((m) => m.role === "user").length;
  if (answered > total) {
    return Response.json({ error: "面試已結束" }, { status: 400 });
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      ...(answered >= total && {
        response_format: { type: "json_object" },
      }),
      messages: [
        { role: "system", content: buildSystemPrompt(jobDescription, answered, total) },
        ...messages.map((m) => ({ role: m.role, content: String(m.content) })),
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("OpenAI error:", res.status, detail);
    return Response.json({ error: "OpenAI 請求失敗" }, { status: 502 });
  }

  const data = await res.json();
  const reply: string = data.choices?.[0]?.message?.content ?? "";

  if (answered >= total) {
    try {
      const report = JSON.parse(reply);
      const scores: number[] = (report.questions ?? []).map((q: { score: number }) =>
        Math.max(0, Math.min(100, Math.round(Number(q.score) || 0))),
      );
      if (scores.length === 0) throw new Error("no questions");
      report.questions.forEach((q: { score: number }, i: number) => (q.score = scores[i]));
      // 總分 = 各題分數平均,由伺服器計算,不採用模型自己給的總分
      report.score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return Response.json({ report, questionNumber: total, finished: true });
    } catch {
      return Response.json({ error: "評估報告產生失敗,請重試" }, { status: 502 });
    }
  }

  return Response.json({
    reply,
    questionNumber: Math.min(answered + 1, total),
    totalQuestions: total,
    finished: false,
  });
}
