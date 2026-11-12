"use client";

import React, { useState } from "react";
import { Sparkles, Send, ShieldCheck, AlertCircle, Bot, Cpu, FileText } from "lucide-react";

interface AiConsultantViewProps {
  towerThreeChoice: "laser" | "missiles" | "ciws";
}

export default function AiConsultantView({ towerThreeChoice }: AiConsultantViewProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const samplePrompts = [
    "دراسة جدوى تثبيت المنظومة الثلاثية على أبراج خطوط 380 ك.ف لحماية منشآت الطاقة والمصافي بالشرقية",
    "مقارنة هندسية وعملياتية: متى نفضل مدفع الليزر 100kW مقابل صواريخ VLS في البرج الثالث؟",
    "بروتوكول العزل الكهرومغناطيسي وحماية أجهزة التوجيه الليزري من التيارات العالية والمجالات الحثية",
    "خطة إدارة النيران والتوزيع الآلي للأهداف بين الأبراج الثلاثة لمواجهة هجوم سرب مسيرات مركب",
  ];

  const handleAsk = async (questionText?: string) => {
    const q = questionText || query;
    if (!q.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/defense-consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          siteParams: {
            region: "المنشآت الحيوية وشبكات الطاقة بالمملكة العربية السعودية",
            threatType: "طائرات مسيرة انتحارية، صواريخ كروز منخفضة، أهداف شبحية",
          },
          towerConfig: {
            height: 95,
            towerThreeType:
              towerThreeChoice === "laser"
                ? "مدفع ليزر موجه عالي الطاقة (100 kW HEL)"
                : towerThreeChoice === "missiles"
                ? "بطارية صواريخ اعتراضية عمودية (VLS SHORAD/MRAD)"
                : "مدفع رشاش ثنائي 35 ملم إضافي",
            voltage: "380 kV / 500 kV",
            windSpeed: "140 km/h",
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "فشل الاتصال بمستشار الذكاء الاصطناعي");
      }

      setResponse(data.analysis);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء معالجة الاستشارة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            المستشار الهندسي والعسكري الذكي (AI Defense & Engineering Consultant)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            استشارات هندسية فورية مدعومة بالذكاء الاصطناعي من Google لحسابات التوافق الميكانيكي، خطط التوزيع، واستراتيجيات الاشتباك.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input & Prompt Suggestions (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold font-display text-white text-sm border-b border-slate-800 pb-3 flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>تقديم استفسار هندسي أو عسكري مخصص</span>
            </h3>

            <div className="space-y-2">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                rows={4}
                placeholder="اكتب استفسارك هنا، مثال: كيف نوازن بين قوى اهتزاز المدافع وسرعة دوران الرادار في التضاريس الجبلية؟"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-3 text-xs text-white placeholder-slate-500 resize-none outline-none leading-relaxed"
              />

              <button
                onClick={() => handleAsk()}
                disabled={loading || !query.trim()}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>جاري التحليل الهندسي العسكري...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>إرسال الاستشارة الهندسية</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Sample Prompts */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 block">نماذج استفسارات تكتيكية جاهزة:</span>
              <div className="space-y-1.5">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setQuery(p);
                      handleAsk(p);
                    }}
                    className="w-full text-right p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-emerald-300 transition-colors line-clamp-2"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Analysis Report Viewport (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between min-h-[460px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                تقرير الاستشارة الهندسية والتحليل التكتيكي
              </span>
              <span className="text-xs font-mono text-slate-400">
                نموذج الذكاء الاصطناعي: Gemini 3.8 Flash
              </span>
            </div>

            {loading && (
              <div className="py-20 flex flex-col items-center justify-center space-y-3">
                <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-slate-400 font-mono">
                  جاري حساب معادلات التخميد الهيدروليكي وتقييم احتمالية الإصابة...
                </span>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <div>
                  <strong className="block font-bold mb-1">تعذر استلام التقرير:</strong>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {!loading && !error && response && (
              <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs text-slate-200 leading-relaxed max-h-[480px] overflow-y-auto whitespace-pre-wrap font-sans">
                {response}
              </div>
            )}

            {!loading && !error && !response && (
              <div className="py-20 text-center space-y-2">
                <Cpu className="w-10 h-10 text-slate-700 mx-auto" />
                <span className="text-xs text-slate-400 block">
                  اختر أحد النماذج الجاهزة أو اطرح استفساراً للحصول على تحليل هندسي وعملياتي مفصل.
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
            <span>التقييم يراعي مواصفات وزارة الدفاع والهيئة العليا للأمن الصناعي (HCIS)</span>
            <span className="text-emerald-500">MOD-KSA APPROVED ARCHITECTURE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
