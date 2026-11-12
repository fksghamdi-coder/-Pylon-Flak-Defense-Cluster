"use client";

import React, { useState } from "react";
import Image from "next/image";
import StructureDossierModal from "@/components/StructureDossierModal";
import PrintOptionsModal from "@/components/PrintOptionsModal";
import {
  Shield, Zap, Target, Cpu, TrendingUp, CheckCircle, MapPin, Activity, ArrowRight,
  History, Castle, Award, ExternalLink, FileText, Layers, Sparkles, Compass, Radio, Printer
} from "lucide-react";

interface HomeOverviewViewProps {
  onNavigateTab: (tabId: string) => void;
}

export default function HomeOverviewView({ onNavigateTab }: HomeOverviewViewProps) {
  const [selectedDossierId, setSelectedDossierId] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  return (
    <div className="space-y-8">
      {/* Hero Section: Strategic Vision & Logical Concept (Zero-Gap Full-Bleed Harmonious Layout) */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/35 rounded-2xl p-0 overflow-hidden shadow-2xl shadow-emerald-950/25 ring-1 ring-slate-800/90">
        {/* Ambient background glow (div:nth-of-type(1)) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        {/* Strategic Content Container - Expanded 100% to Outer Box with Zero Empty Space (div:nth-of-type(2)) */}
        <div className="relative z-10 w-full h-full bg-slate-950/60 backdrop-blur-md p-5 sm:p-6 lg:p-7 space-y-5">
          {/* Top Strategic Header: Badges & Full Strategic Title */}
          <div className="w-full space-y-3 border-b border-slate-800/80 pb-4">
            {/* Meta Badges Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono w-full">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>مشروع بحثي وتطويري استراتيجي</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>وزارة الدفاع والهيئة العليا للأمن الصناعي</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300">
                  <Award className="w-3 h-3" />
                  <span>رؤية المملكة 2030</span>
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-800 text-[11px] text-slate-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>تصنيف معتمد: KSA-MOD-PYLON-FLAK-2026</span>
              </span>
            </div>

            {/* Strategic Title & Subtitle - Full Width & Fully Visible */}
            <div className="w-full space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  الأطروحة الهندسية التأسيسية المعتمدة
                </span>
                <span className="text-[11px] font-mono text-slate-400" dir="ltr">
                  Project Pylon-Flak Bastion: Tri-Tower Air Defense Clusters
                </span>
              </div>
              <h1 className="w-full text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] xl:text-[1.8rem] font-black font-display tracking-tight leading-snug">
                <span className="text-white">المشروع الوطني الاستراتيجي لحصون الدفاع الجوي الشبكية:</span>{" "}
                <span className="text-emerald-400 font-black">
                  دمج المنظومات ثلاثية الأبراج على خطوط الضغط العالي (380kV / 500kV)
                </span>
              </h1>
            </div>
          </div>

          {/* Balanced Harmonious 2-Column Grid - Zero Empty Space */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left/Main Column: Executive Brief + Action Navigation Hub (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4 h-full">
              {/* Executive Paragraph Box - Expands to fill available vertical space (flex-1) */}
              <div className="flex-1 p-4 sm:p-5 bg-slate-950/80 border border-slate-800/90 rounded-xl flex flex-col justify-between gap-3">
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                  استثمار هندسي رائد يدمج بين فلسفة <strong className="text-white">حصون الدفاع الجوي التاريخية (Flak Towers)</strong> وأحدث تقنيات
                  الرصد الكهروبصري والراداري ومدافع الطاقة الموجهة ومدافع السحب المتشظية الذكية، عبر تثبيتها على
                  <strong className="text-emerald-400"> أبراج نقل الطاقة الكهربائية ذات الجهد الفائق (380kV / 500kV)</strong> أو صواري مخصصة،
                  لتأمين خط دفاع أخير استباقي دائم للمنشآت الحيوية والموانئ والمطارات والمصافي عبر المملكة.
                </p>

                {/* Integrated Strategic Highlights Strip filling the card harmoniously */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
                  <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">نطاق الحماية:</span>
                    <span className="text-emerald-400 font-bold">وطني شامل</span>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">التغذية الطاقية:</span>
                    <span className="text-amber-400 font-bold">استجرار ذاتي</span>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">عزل الاهتزاز:</span>
                    <span className="text-sky-400 font-bold">88% هيدروليكي</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: 2x2 Balanced Grid - Full Width & Height Harmonious */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => onNavigateTab("historical_origin")}
                  className="p-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl transition-all flex items-center justify-between shadow-md border border-amber-500/40 group active:scale-95 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 text-right">
                    <History className="w-4 h-4 text-amber-200 shrink-0" />
                    <div>
                      <span className="text-xs font-bold block">أصل الفكرة وحصون WW2</span>
                      <span className="text-[10px] text-amber-100 block opacity-95">الصور الأرشيفية والتحليل المعماري</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 rotate-180 text-amber-200 group-hover:-translate-x-1 transition-transform shrink-0" />
                </button>

                <button
                  onClick={() => onNavigateTab("tactical_map")}
                  className="p-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl transition-all flex items-center justify-between shadow-md border border-emerald-400/40 group active:scale-95 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 text-right">
                    <MapPin className="w-4 h-4 text-emerald-200 shrink-0" />
                    <div>
                      <span className="text-xs font-bold block">خريطة التوزيع التكتيكية</span>
                      <span className="text-[10px] text-emerald-100 block opacity-95">محاكاة النشر وسد الثغرات 3D</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 rotate-180 text-emerald-200 group-hover:-translate-x-1 transition-transform shrink-0" />
                </button>

                <button
                  onClick={() => onNavigateTab("pylon_engineering")}
                  className="p-3.5 bg-slate-950/90 hover:bg-slate-800 text-slate-200 rounded-xl transition-all flex items-center justify-between border border-slate-800 hover:border-slate-700 group active:scale-95 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 text-right">
                    <Layers className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <span className="text-xs font-bold block text-white">هندسة أبراج الضغط العالي</span>
                      <span className="text-[10px] text-slate-400 block">المخطط الإنشائي ومسار توزيع الأحمال</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 rotate-180 text-slate-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                </button>

                <button
                  onClick={() => setShowPrintModal(true)}
                  className="p-3.5 bg-gradient-to-r from-purple-950/80 to-slate-900 hover:from-purple-900/80 hover:to-slate-850 text-slate-200 rounded-xl transition-all flex items-center justify-between border border-purple-500/40 hover:border-purple-400 group active:scale-95 shadow-md cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 text-right">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 shrink-0">
                      <Printer className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-white flex items-center gap-1.5">
                        <span>طباعة وتصدير المخطط الهندسي</span>
                        <span className="text-[9px] bg-purple-500/30 text-purple-200 px-1.5 py-0.2 rounded font-mono shrink-0">خيارات متعددة</span>
                      </span>
                      <span className="text-[10px] text-purple-200/80 block">PDF · لوحات CAD · جداول الكميات</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 rotate-180 text-purple-300 group-hover:-translate-x-1 transition-transform shrink-0" />
                </button>
              </div>
            </div>

            {/* Right/Telemetry Column: Operational Telemetry Cockpit (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-950/95 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between h-full gap-3.5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 shrink-0" />
                  <span>المؤشرات العملياتية القياسية</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  جاهزية 100%
                </span>
              </div>

              {/* 4 Primary Metric Tiles - Stretch to fill space evenly */}
              <div className="grid grid-cols-2 gap-2.5 text-xs flex-1">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-400 font-mono block">أفق الرصد الراداري:</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">120 كم</span>
                  <span className="text-[9px] text-slate-500 block">4× أفق الرادار الأرضي</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-400 font-mono block">الارتفاع التكتيكي:</span>
                  <span className="text-sm sm:text-base font-bold text-sky-400 font-mono">110 أمتار</span>
                  <span className="text-[9px] text-slate-500 block">فوق الكثبان والتضاريس</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-400 font-mono block">الشبكة الحاضنة:</span>
                  <span className="text-sm sm:text-base font-bold text-amber-400 font-mono">90,000+ كم</span>
                  <span className="text-[9px] text-slate-500 block">خطوط 380kV بالمملكة</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-400 font-mono block">وفر التكاليف:</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">&gt; 85%</span>
                  <span className="text-[9px] text-slate-500 block">مقارنة بالقواعد المنعزلة</span>
                </div>
              </div>

              {/* Telemetry Summary & C4I Status */}
              <div className="p-3 bg-slate-900/95 rounded-lg border border-slate-800 font-mono text-[11px] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">زمن رد الفعل:</span>
                  <span className="text-white font-bold">&lt; 1.4 ثانية (إطباق فوري)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">التغطية النارية:</span>
                  <span className="text-emerald-300 font-bold">360° متقاطعة دون نقاط عمياء</span>
                </div>
                <div className="flex justify-between items-center pt-1.5 border-t border-slate-800 text-[10px]">
                  <span className="text-slate-400">قناة الربط:</span>
                  <span className="text-purple-300 font-bold">ألياف OPGW بسرعة 100 Gbps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logical Defense Analysis: The "Why" and Strategic Problem Solved */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Logical Analysis of Asymmetric Threats (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 border-b border-slate-800 pb-3 min-w-0">
            <Shield className="w-5 h-5 shrink-0" />
            <h2 className="text-base sm:text-lg font-bold font-display text-white whitespace-nowrap overflow-hidden text-ellipsis">
              التحليل المنطقي والعملياتي: معضلة التهديدات الجوية الحديثة
            </h2>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            كشفت الصراعات الجوية الحديثة عن تحول جذري في عقيدة الهجوم الجوي:
          </p>

          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-amber-400 block mb-1 whitespace-nowrap overflow-hidden text-ellipsis">1. معضلة الطيران الملاصق للتضاريس (Terrain Masking):</strong>
              <p className="text-slate-400">
                تحلق صواريخ الكروز والمسيرات الانتحارية بارتفاعات شديدة الانخفاض (15 إلى 45 متراً فوق سطح الأرض)، مما يجعل الرادارات الأرضية التقليدية
                عاجزة عن رصدها مبكراً بسبب انحناء الأرض والعوائق الطبيعية والكثبان الرملية (Radar Horizon Clutter).
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-amber-400 block mb-1 whitespace-nowrap overflow-hidden text-ellipsis">2. هجمات الأسراب التشبعية واستنزاف الذخائر الباهظة:</strong>
              <p className="text-slate-400">
                إطلاق أسراب تضم من 20 إلى 60 مسيرة انتحارية منخفضة التكلفة يستنزف صواريخ الدفاع الجوي التقليدية باهظة الثمن (مثل الباتريوت التي تكلف ملايين الريالات للصاروخ الواحد)،
                مما يخلق فجوة اقتصادية وعملياتية حتمية.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-emerald-400 block mb-1 whitespace-nowrap overflow-hidden text-ellipsis">3. الحل العبقري المبتكر في «أبراج الحصن»:</strong>
              <p className="text-slate-400">
                برفع الرادارات ومدافع الطاقة والمقذوفات لارتفاع يتراوح بين <strong className="text-white">80 و 120 متراً</strong> على قمم أبراج الضغط العالي،
                يتضاعف أفق الرصد الراداري المباشر 4 أضعاف، وتُحذف منطقة الحجب التضاريسي تماماً، مع توفير نيران ليزرية ومدفعية ثنائية ذات ذخائر شظايا منخفضة التكلفة وقدرة غير محدودة على الصد.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Strategic National Benefits for KSA (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sky-400 border-b border-slate-800 pb-3 min-w-0">
              <TrendingUp className="w-5 h-5 shrink-0" />
              <h2 className="text-base sm:text-lg font-bold font-display text-white whitespace-nowrap overflow-hidden text-ellipsis">
                الفائدة الاستراتيجية والاقتصادية للمملكة
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">استغلال شبكة قائمة تفوق 90,000 كم:</strong>
                  <span className="text-slate-400">
                    تمتلك المملكة أطول شبكات نقل طاقة ذات جهد فائق (380kV/500kV) في الشرق الأوسط تربط كافة المدن والموانئ والمصافي؛ استثمار هذه الأبراج يوفر مليارات الريالات مقارنة بتشييد أبراج خرسانية مستقلة من الصفر.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">وفر اقتصادي يتجاوز 85%:</strong>
                  <span className="text-slate-400">
                    كلفة تجهيز البرج القائم بأنظمة التخميد الهيدروليكي والمنصة تبلغ أقل من 15% من كلفة بناء قاعدة رادار دفاع جوي منعزلة مستقلة مع طرق ومولدات وخطوط إمداد.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">طاقة كهربائية لا نهائية (Gigawatt Grid Tap):</strong>
                  <span className="text-slate-400">
                    الاستجرار الحثي المباشر من خطوط الضغط العالي يوفر طاقة تشغيل مستمرة لمدافع الليزر 100kW ورادارات AESA دون الحاجة لقوافل وقود ديزل معرضة للاستهداف في أوقات الحرب.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">شبكة ألياف ضوئية مؤمنة مسبقاً (OPGW):</strong>
                  <span className="text-slate-400">
                    خطوط الضغط العالي السعودية تحتوي مسبقاً على سلك تأريض علوي مدمج بألياف ضوئية فائقة السرعة، مما يتيح ربط الأبراج الثلاثة بمركز القيادة العسكرية دون أي تأخير زمني.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-950/40 border border-emerald-700/50 rounded-lg text-center">
            <span className="text-[11px] font-mono text-emerald-300 font-semibold block">
              جاهزية التغطية النارية: 360° متقاطعة بدون نقاط عمياء
            </span>
          </div>
        </div>
      </div>

      {/* Mechanism-to-Outcome Comparison: Traditional Ground vs. Pylon-Flak Cluster */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-base sm:text-lg font-bold font-display text-white border-b border-slate-800 pb-3 flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
          <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">مقارنة تفصيلية: الدفاع الجوي الأرضي التقليدي مقابل منظومة أبراج الحصن</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-300">
                <th className="py-2.5 px-3 font-semibold">المعيار الفني والعملياتي</th>
                <th className="py-2.5 px-3 font-semibold text-amber-400">المنظومات الأرضية التقليدية</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-400">منظومة درع أبراج الحصن (Pylon-Flak)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-medium text-white">أفق الرصد الراداري المنخفض</td>
                <td className="py-2.5 px-3 text-slate-400">12 - 18 كم (محدود بانحناء الأرض والكثبان)</td>
                <td className="py-2.5 px-3 font-bold text-emerald-300">45 - 65 كم (رؤية علوية كاشفة من ارتفاع 110م)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-white">مكافحة أسراب المسيرات الانتحارية</td>
                <td className="py-2.5 px-3 text-slate-400">صواريخ باهظة ومحدودة بمخزن الحاوية (4-8 صواريخ)</td>
                <td className="py-2.5 px-3 font-bold text-emerald-300">نيران غير محدودة (مدفع ليزري HEL + رشاشات AHEAD 1,600 طلقة/د)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-white">الاعتمادية على خطوط الإمداد اللوجستي</td>
                <td className="py-2.5 px-3 text-slate-400">قوافل ديزل يومية وشاحنات إعادة تلقيم صواريخ</td>
                <td className="py-2.5 px-3 font-bold text-emerald-300">طاقة مستمرة من خطوط 380kV + مخازن تلقيم مدمجة</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-white">زمن رد الفعل والاستجابة</td>
                <td className="py-2.5 px-3 text-slate-400">من 4.5 إلى 8.0 ثوانٍ</td>
                <td className="py-2.5 px-3 font-bold text-emerald-300">أقل من 1.4 ثانية (إطباق ليزري وتوجيه فوري)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-white">تكلفة التصدي للهدف الواحد</td>
                <td className="py-2.5 px-3 text-slate-400">من 1,200,000 إلى 4,500,000 ريال للصاروخ</td>
                <td className="py-2.5 px-3 font-bold text-emerald-300">أقل من 15 ريال لليزر / 18,000 ريال لرشق AHEAD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Inspiration & 3D Architectural Defense Concept Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
              <History className="w-4 h-4 shrink-0" />
              <span className="truncate">الجذور التاريخية والتجسيد ثلاثي الأبعاد 3D · من حصون برلين 1940 وأبراج روسيا 2024 إلى الابتكار السعودي 2026</span>
            </div>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold font-display text-white whitespace-nowrap overflow-hidden text-ellipsis">
              أصل الفكرة ونماذج التجسيد ثلاثي الأبعاد (3D): خط الدفاع الأخير لحماية المنشآت الحيوية
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab("historical_origin")}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm self-start sm:self-auto shrink-0 cursor-pointer"
          >
            <span className="whitespace-nowrap">استعراض المعرض التوثيقي الكامل</span>
            <ArrowRight className="w-4 h-4 rotate-180 shrink-0" />
          </button>
        </div>

        {/* Narrative Explanation with 3-Era Evolution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              في عام 1940، شيدت ألمانيا <strong className="text-white">أبراج الدفاع الجوي الخرسانية الشاهقة (Flaktürme)</strong> بجدران سماكتها 3.5م لتجاوز حجب التضاريس، والتي ما زالت صامدة هندسياً حتى اليوم.
              وفي عامي 2023 و 2024، ومع احتدام هجمات المسيرات على مصافي النفط ومستودعات الوقود الروسية، لجأت موسكو إلى <strong className="text-sky-400">بناء صواري فولاذية لرفع منظومات «بانتسير-S1» بارتفاع 25-35 متراً</strong> فوق خزانات الوقود.
            </p>
            <p>
              تُمثل الرؤية الوطنية السعودية اليوم المعادلة الهندسية الأكثر ذكاءً واقتصاداً عبر مسارين تكامليين:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <strong className="text-emerald-400 block mb-1">المسار الأول: استغلال أبراج الضغط العالي القائمة (380kV)</strong>
                <span className="text-slate-400">
                  استخدام صواري خطوط الكهرباء القائمة مسبقاً كإطار جاهز وفائق الارتفاع (110م) مع استجرار الطاقة حثياً من الشبكة لتشغيل الليزر والرادارات بأقل تكلفة ودون بناء من الصفر (وفر يفوق 85%).
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <strong className="text-amber-400 block mb-1">المسار الثاني: إنشاء منظومة أبراج دفاعية مخصصة</strong>
                <span className="text-slate-400">
                  تشييد أبراج صلب شبكية معيارية فائقة القوة مخصصة خصيصاً كـ <strong className="text-white">«خط دفاع أخير» (Last Line of Defense)</strong> لتحصين المصافي والموانئ ومحطات التحلية الاستراتيجية.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
            <span className="text-amber-400 font-mono text-[11px] font-bold block">المقارنة المعمارية والتكتيكية:</span>
            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">ألمانيا (1940):</span>
                <span className="text-amber-400 font-bold">خرسانة 100 ألف طن</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">روسيا (2024):</span>
                <span className="text-sky-400 font-bold">أبراج صلب لبانتسير (30م)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">المملكة (2026):</span>
                <span className="text-emerald-400 font-bold">خطوط 380kV + أبراج مخصصة</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">أفق الرصد:</span>
                <span className="text-white">18كم ⬅ 35كم ⬅ 120كم سعودياً</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Concept Architecture Visualizer Gallery */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 whitespace-nowrap overflow-hidden text-ellipsis">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">نماذج التجسيد ثلاثي الأبعاد (3D AI Architectural Renders)</span>
              </div>
              <h4 className="text-base font-bold text-white font-display whitespace-nowrap overflow-hidden text-ellipsis">
                نماذج المحاكاة ثلاثية الأبعاد: تحصين خط الدفاع الأخير للمنشآت الحيوية
              </h4>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 shrink-0 whitespace-nowrap">
              تكامل: خطوط 380kV القائمة + الأبراج المخصصة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 3D Concept Card 1: 380kV Smart Retrofit Bastion */}
            <div
              onClick={() => setSelectedDossierId("380kv_retrofit")}
              className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col shadow-xl group cursor-pointer active:scale-[0.99]"
            >
              <div className="relative w-full h-64 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden border-b border-slate-800/80">
                {/* 3D Isometric SVG Render of 380kV Pylon Air Defense Bastion */}
                <svg viewBox="0 0 400 240" className="w-full h-full">
                  <defs>
                    <linearGradient id="pylonSky1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#020617" />
                      <stop offset="60%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#064e3b" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="laserBeam1" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
                    </linearGradient>
                    <radialGradient id="radarDomeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Sky & Background Refinery Horizon */}
                  <rect width="400" height="240" fill="url(#pylonSky1)" />

                  {/* Distant Oil Refinery & Desalination Plant Silhouettes */}
                  <g opacity="0.45">
                    {/* Storage Tanks */}
                    <rect x="20" y="180" width="45" height="35" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
                    <rect x="70" y="185" width="38" height="30" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
                    <rect x="320" y="175" width="60" height="40" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
                    {/* Distillation Columns */}
                    <rect x="120" y="160" width="12" height="55" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
                    <rect x="136" y="150" width="10" height="65" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
                    <rect x="290" y="155" width="14" height="60" rx="2" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
                    {/* Flare Stacks with subtle flame */}
                    <line x1="155" y1="140" x2="155" y2="215" stroke="#475569" strokeWidth="1.5" />
                    <circle cx="155" cy="138" r="3" fill="#f59e0b" opacity="0.8" />
                  </g>

                  {/* 3D Ground Grid */}
                  <line x1="0" y1="215" x2="400" y2="215" stroke="#1e293b" strokeWidth="2" />
                  <line x1="0" y1="225" x2="400" y2="225" stroke="#0f172a" strokeWidth="1" />

                  {/* 380kV High-Voltage Power Lines passing across */}
                  <path d="M 0 110 Q 200 135 400 110" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.6" />
                  <path d="M 0 125 Q 200 150 400 125" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.6" />
                  <path d="M 0 140 Q 200 165 400 140" fill="none" stroke="#64748b" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.6" />

                  {/* Central 380kV Transmission Tower Steel Lattice Structure */}
                  <g>
                    {/* Tower Legs */}
                    <path d="M 160 215 L 188 45 L 212 45 L 240 215 Z" fill="#090d16" stroke="#059669" strokeWidth="1.8" />
                    {/* Cross-Bracing Braces (X-patterns) */}
                    <line x1="166" y1="180" x2="234" y2="180" stroke="#047857" strokeWidth="1" />
                    <line x1="172" y1="145" x2="228" y2="145" stroke="#047857" strokeWidth="1" />
                    <line x1="178" y1="110" x2="222" y2="110" stroke="#047857" strokeWidth="1" />
                    <line x1="184" y1="75" x2="216" y2="75" stroke="#047857" strokeWidth="1" />
                    {/* Diagonals */}
                    <line x1="160" y1="215" x2="234" y2="180" stroke="#065f46" strokeWidth="0.8" />
                    <line x1="240" y1="215" x2="166" y2="180" stroke="#065f46" strokeWidth="0.8" />
                    <line x1="166" y1="180" x2="228" y2="145" stroke="#065f46" strokeWidth="0.8" />
                    <line x1="234" y1="180" x2="172" y2="145" stroke="#065f46" strokeWidth="0.8" />

                    {/* Power Line Crossarm Brackets */}
                    <path d="M 140 110 L 260 110" stroke="#10b981" strokeWidth="2.5" />
                    <line x1="150" y1="110" x2="150" y2="125" stroke="#059669" strokeWidth="2" />
                    <line x1="250" y1="110" x2="250" y2="125" stroke="#059669" strokeWidth="2" />

                    {/* Ceramic Insulator Strings (Dielectric Isolation) */}
                    <circle cx="150" cy="115" r="2.5" fill="#f59e0b" />
                    <circle cx="150" cy="120" r="2.5" fill="#f59e0b" />
                    <circle cx="250" cy="115" r="2.5" fill="#f59e0b" />
                    <circle cx="250" cy="120" r="2.5" fill="#f59e0b" />

                    {/* Top Elevated Heavy Defense Platform (Circular Armor & Hydraulic Dampers) */}
                    <ellipse cx="200" cy="45" rx="38" ry="10" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
                    <rect x="180" y="36" width="40" height="9" rx="2" fill="#064e3b" stroke="#10b981" strokeWidth="1.2" />

                    {/* Hydraulic Dampers Pillars */}
                    <line x1="186" y1="45" x2="186" y2="52" stroke="#f59e0b" strokeWidth="2.5" />
                    <line x1="214" y1="45" x2="214" y2="52" stroke="#f59e0b" strokeWidth="2.5" />

                    {/* 4D AESA Radar Dome & Electro-Optical FLIR Head */}
                    <circle cx="200" cy="24" r="14" fill="url(#radarDomeGlow)" />
                    <ellipse cx="200" cy="25" rx="12" ry="7" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                    <circle cx="200" cy="20" r="5" fill="#10b981" />
                    <line x1="200" y1="15" x2="200" y2="8" stroke="#34d399" strokeWidth="1.5" />

                    {/* Twin 35mm Cannon Barrels & Laser CIWS */}
                    <line x1="212" y1="36" x2="238" y2="24" stroke="#e2e8f0" strokeWidth="2.2" />
                    <line x1="214" y1="39" x2="240" y2="27" stroke="#e2e8f0" strokeWidth="2.2" />
                    <circle cx="212" cy="38" r="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />

                    {/* Active Intercept 3D Laser Beam targeting incoming low drone */}
                    <line x1="212" y1="37" x2="355" y2="40" stroke="url(#laserBeam1)" strokeWidth="2.5" />
                    <circle cx="355" cy="40" r="5" fill="#ef4444" className="animate-pulse" />
                    <circle cx="355" cy="40" r="10" fill="none" stroke="#f87171" strokeWidth="1" opacity="0.6" />
                    <text x="355" y="28" fill="#f87171" fontSize="8" textAnchor="middle" fontFamily="monospace">درونز 25م</text>

                    {/* Radar Scanning Beam Ring 360 */}
                    <ellipse cx="200" cy="24" rx="85" ry="25" fill="none" stroke="#10b981" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.7" />
                  </g>

                  {/* Telemetry Labels */}
                  <g fontFamily="monospace" fontSize="8" fill="#a7f3d0">
                    <text x="200" y="232" textAnchor="middle">النموذج 1: استغلال أبراج الضغط العالي 380kV القائمة (ارتفاع 110م · وفر 85%)</text>
                  </g>
                </svg>

                {/* Status Badges */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/85 backdrop-blur text-[10px] font-mono text-emerald-300 border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>تحديث شبكة 380kV القائمة</span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur text-[9px] font-mono text-slate-300 border border-slate-700">
                  Gigawatt Induction Tap · أفق 120 كم
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">المسار الأول: التحديث السريع لأبراج نقل الطاقة القائمة (380kV)</span>
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed mt-1">
                    استثمار ذكي لشبكة نقل الكهرباء الوطنية (90,000+ كم) كإطار فائق القوة لحمل منصات الرصد ومدافع الليزر والرشاشات، مع استجرار الطاقة حثياً من الخطوط مباشرة دون الحاجة لبناء صواري من الصفر.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                  <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[9px]">وفر التكاليف الإنشائية:</span>
                    <span className="text-emerald-400 font-bold">&gt; 85% وفر مالي</span>
                  </div>
                  <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[9px]">مصدر الطاقة:</span>
                    <span className="text-amber-400 font-bold">حثي مستمر 380kV</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Concept Card 2: Dedicated Purpose-Built Final Defense Bastion */}
            <div
              onClick={() => setSelectedDossierId("dedicated_bastion")}
              className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden hover:border-amber-500/50 transition-all flex flex-col shadow-xl group cursor-pointer active:scale-[0.99]"
            >
              <div className="relative w-full h-64 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden border-b border-slate-800/80">
                {/* 3D Isometric SVG Render of Dedicated Air Defense Bastion Tower */}
                <svg viewBox="0 0 400 240" className="w-full h-full">
                  <defs>
                    <linearGradient id="pylonSky2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#020617" />
                      <stop offset="60%" stopColor="#111827" />
                      <stop offset="100%" stopColor="#78350f" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="flakBurst" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>

                  {/* Sky & High-Value Petrochemical Harbor Background */}
                  <rect width="400" height="240" fill="url(#pylonSky2)" />

                  {/* High-Value Facilities: Oil Terminal & LNG Tanks */}
                  <g opacity="0.5">
                    <rect x="25" y="170" width="70" height="45" rx="5" fill="#1f2937" stroke="#4b5563" strokeWidth="1" />
                    <text x="60" y="195" fill="#9ca3af" fontSize="6" textAnchor="middle">خزان غاز مسال LNG</text>
                    <rect x="105" y="180" width="45" height="35" rx="4" fill="#1f2937" stroke="#4b5563" strokeWidth="1" />
                    <rect x="310" y="165" width="65" height="50" rx="4" fill="#1f2937" stroke="#4b5563" strokeWidth="1" />
                    <text x="342" y="192" fill="#9ca3af" fontSize="6" textAnchor="middle">مرفأ تصدير رأس تنورة</text>
                  </g>

                  {/* Ground Surface */}
                  <line x1="0" y1="215" x2="400" y2="215" stroke="#374151" strokeWidth="2" />

                  {/* Dedicated Bastion Tower: Heavy Modular Hexagonal Steel Tower */}
                  <g>
                    {/* Reinforced Concrete Foundation Base Ring */}
                    <ellipse cx="200" cy="215" rx="45" ry="12" fill="#111827" stroke="#d97706" strokeWidth="2" />
                    <rect x="165" y="202" width="70" height="12" rx="3" fill="#1f2937" stroke="#b45309" strokeWidth="1.5" />

                    {/* Modular Hexagonal Tower Mast (Multi-tiered) */}
                    {/* Lower Tier */}
                    <polygon points="170,202 178,140 222,140 230,202" fill="#0b0f19" stroke="#f59e0b" strokeWidth="1.8" />
                    {/* Mid-Tier Weapon Sponson Platform (Missile VLS & FLIR) */}
                    <ellipse cx="200" cy="140" rx="35" ry="9" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                    <rect x="175" y="132" width="50" height="8" rx="2" fill="#334155" />
                    {/* VLS Missile Pods on Mid Tier */}
                    <rect x="170" y="125" width="10" height="12" rx="1" fill="#475569" stroke="#f59e0b" strokeWidth="1" />
                    <rect x="220" y="125" width="10" height="12" rx="1" fill="#475569" stroke="#f59e0b" strokeWidth="1" />

                    {/* Upper Mast Section */}
                    <polygon points="182,132 188,50 212,50 218,132" fill="#0b0f19" stroke="#f59e0b" strokeWidth="1.8" />
                    {/* Diamond Bracing */}
                    <line x1="182" y1="132" x2="212" y2="50" stroke="#78350f" strokeWidth="0.9" />
                    <line x1="218" y1="132" x2="188" y2="50" stroke="#78350f" strokeWidth="0.9" />

                    {/* Heavy Top Gun Platform with Armored Turret */}
                    <ellipse cx="200" cy="50" rx="36" ry="10" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                    <rect x="184" y="38" width="32" height="12" rx="3" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />

                    {/* Twin 35mm AHEAD Rapid-Fire Turret */}
                    <circle cx="200" cy="38" r="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.2" />
                    <line x1="194" y1="36" x2="160" y2="20" stroke="#f8fafc" strokeWidth="2.5" />
                    <line x1="196" y1="39" x2="162" y2="23" stroke="#f8fafc" strokeWidth="2.5" />
                    {/* Muzzle Flash & High-Velocity AHEAD Fragment Cloud */}
                    <polygon points="160,20 152,14 154,22 148,20 155,25 160,20" fill="#fbbf24" />

                    {/* Intercept Burst on Incoming Low Swarm */}
                    <circle cx="95" cy="28" r="16" fill="url(#flakBurst)" opacity="0.85" />
                    <circle cx="95" cy="28" r="24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                    <text x="95" y="52" fill="#fbbf24" fontSize="7.5" textAnchor="middle" fontFamily="monospace">إبادة سرب مسيرات AHEAD</text>

                    {/* Mast Top Dual-Band AESA Radar & Optical Mast */}
                    <line x1="200" y1="30" x2="200" y2="12" stroke="#d97706" strokeWidth="2" />
                    <ellipse cx="200" cy="12" rx="10" ry="5" fill="#f59e0b" />
                    <line x1="200" y1="7" x2="200" y2="3" stroke="#fbbf24" strokeWidth="1.5" />

                    {/* Overlapping 3D Protective Dome Field (Last Line of Defense) */}
                    <path d="M 50 215 Q 200 -20 350 215" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="5 3" opacity="0.75" />
                  </g>

                  {/* Telemetry Label */}
                  <g fontFamily="monospace" fontSize="8" fill="#fed7aa">
                    <text x="200" y="232" textAnchor="middle">النموذج 2: الأبراج التكتيكية المخصصة · آخر خط دفاعي لتحصين المنشآت الحيوية</text>
                  </g>
                </svg>

                {/* Status Badges */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/85 backdrop-blur text-[10px] font-mono text-amber-300 border border-amber-500/40">
                  <Shield className="w-3 h-3 text-amber-400" />
                  <span>برج دفاعي تكتيكي مخصص</span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur text-[9px] font-mono text-slate-300 border border-slate-700">
                  آخر خط دفاعي (CIWS & Missiles)
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    <Castle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">المسار الثاني: أبراج دفاعية خاصة وشاهقة كـ «آخر خط دفاعي»</span>
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed mt-1">
                    تشييد أبراج صلب معيارية مصممة خصيصاً للتثبيت الدائم في المحيط المباشر للمصافي والموانئ النفطية ومحطات التحلية لحرمان صواريخ الكروز والمسيرات من استغلال النقاط العمياء.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                  <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[9px]">الدور العملياتي:</span>
                    <span className="text-amber-300 font-bold">آخر خط دفاعي للمنشأة</span>
                  </div>
                  <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[9px]">التسليح المدمج:</span>
                    <span className="text-white font-bold">ليزر + 35mm + VLS صواريخ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authentic Archival Images Grid */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-bold font-mono whitespace-nowrap">معرض الوثائق التاريخية الأرشيفية لحصون الدفاع الجوي:</span>
            <span className="text-amber-400 font-mono text-[11px] whitespace-nowrap">انقر على أي بطاقة لفتح وثيقة المواصفات الهندسية وقائمة التجهيزات</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image 1: Zoo Tower Berlin */}
            <div
              onClick={() => setSelectedDossierId("zoo_flakturm_berlin")}
              className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col shadow-md active:scale-[0.99]"
            >
              <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
                <Image
                  src="/images/flak_history/zoo_flakturm_berlin.jpg"
                  alt="برج حديقة حيوان برلين"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-slate-950/85 backdrop-blur text-[10px] font-mono text-amber-300 border border-amber-500/40 whitespace-nowrap">
                  برلين 1941 · خرسانة 3.5م
                </span>
                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur text-[9px] font-mono text-slate-300 border border-slate-700 whitespace-nowrap">
                  Flakturm Tiergarten (G-Tower)
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                    برج قتال حديقة حيوان برلين (G-Tower 1941)
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed mt-1">
                    برج القتال الخرساني الشاهق ومدافع 128 مم الثنائية لتغطية سماء برلين 360° وتجاوز حجب التضاريس.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-mono font-medium whitespace-nowrap">
                    الرديف السعودي: برج الرشاش 35mm
                  </span>
                  <span className="text-amber-400 flex items-center gap-1 group-hover:text-amber-300 transition-colors font-medium whitespace-nowrap">
                    <span>فتح بطاقة المواصفات والمعدات</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </span>
                </div>
              </div>
            </div>

            {/* Image 2: Augarten Vienna */}
            <div
              onClick={() => setSelectedDossierId("augarten_gtower_vienna")}
              className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col shadow-md active:scale-[0.99]"
            >
              <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
                <Image
                  src="/images/flak_history/augarten_gtower_vienna.jpg"
                  alt="برج أوغارتن فيينا"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
                <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-slate-950/85 backdrop-blur text-[10px] font-mono text-amber-300 border border-amber-500/40 whitespace-nowrap">
                  فيينا 1944 · ارتفاع 55م
                </span>
                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur text-[9px] font-mono text-slate-300 border border-slate-700 whitespace-nowrap">
                  Gefechtsturm Augarten (Bauart 3)
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                    برج قتال أوغارتن الأسطواني (Vienna 1944)
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed mt-1">
                    أطول برج دفاع جوي أسطواني شُيّد في التاريخ مع 4 منصات مدافع زاوية توفر نيراناً متقاطعة تغطي الأفق.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-mono font-medium">
                    الرديف السعودي: صواري 380kV بارتفاع 110م
                  </span>
                  <span className="text-amber-400 flex items-center gap-1 group-hover:text-amber-300 transition-colors font-medium">
                    <span>فتح بطاقة المواصفات والمعدات</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Precision Interactive Structure & Military Equipment Dossier Modal */}
      <StructureDossierModal
        dossierId={selectedDossierId}
        onClose={() => setSelectedDossierId(null)}
      />

      {/* Multiple Print Options & Blueprint Export Modal */}
      <PrintOptionsModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        onNavigateToFullDossier={() => onNavigateTab("print_dossier")}
      />
    </div>
  );
}
