"use client";

import React, { useState } from "react";
import {
  Printer, Download, FileText, X, CheckCircle2, Layers,
  Wrench, Shield, Settings2, Eye, Check
} from "lucide-react";
import { generateAndDownloadPDF } from "@/lib/pdfGenerator";

interface PrintOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  towerThreeChoice?: "laser" | "missiles" | "ciws";
  onNavigateToFullDossier?: () => void;
}

export type PrintOptionType = "full_dossier" | "structural_cad" | "bill_of_materials" | "executive_brief";

export default function PrintOptionsModal({
  isOpen,
  onClose,
  towerThreeChoice = "laser",
  onNavigateToFullDossier,
}: PrintOptionsModalProps) {
  const [selectedOption, setSelectedOption] = useState<PrintOptionType>("full_dossier");
  const [paperSize, setPaperSize] = useState<"a4_portrait" | "a4_landscape" | "a3_blueprint">("a4_portrait");
  const [include3DViews, setInclude3DViews] = useState<boolean>(true);
  const [highContrastMode, setHighContrastMode] = useState<boolean>(false);
  const [pdfDownloaded, setPdfDownloaded] = useState<boolean>(false);

  if (!isOpen) return null;

  // Direct PDF generation and download
  const handleDownloadPDF = () => {
    const success = generateAndDownloadPDF({
      towerThreeChoice,
      optionType: selectedOption,
      paperSize,
      include3DViews,
    });
    if (success) {
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 2500);
    }
  };

  const printOptionsList = [
    {
      id: "full_dossier" as PrintOptionType,
      title: "1. وثيقة المخطط الهندسي التنفيذي الشامل (Full Engineering Dossier)",
      subtitle: "المستند الرسمي الكامل المتضمن المخططات الهندسية ومقطع الأساسات والعمود المركزي",
      icon: FileText,
      badge: "الخيار الأوسع والأشمل",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-700",
      description: "تقرير هندسي مفصل يتضمن مقطع CAD للبرج، مقطع تفصيلي للعمود المركزي وتثبيت الأوتاد في الصخور (-18م)، جدول توزيع الأوزان (Mass Budget)، امتصاص الصدمات 88%، ومسارات التأريض 380kV.",
    },
    {
      id: "structural_cad" as PrintOptionType,
      title: "2. لوحة المخطط المعماري والهيكلي (CAD & Structural Blueprint Sheet)",
      subtitle: "مخطط لوحة قياس عريضة A3/A4 للأبعاد الهندسية ومقاطع الأساسات والبرج",
      icon: Layers,
      badge: "مخطط إنشائي CAD",
      badgeColor: "bg-sky-950 text-sky-300 border-sky-700",
      description: "مخطط معماري يركز على مسقط المنصة 4,200×4,200 ملم، العمود الفولاذي المركزي 450 ملم بسماكة 28 ملم، خلوص العزل الكهربائي 8.5م، وشبكة الأوتاد الصخرية 18 متراً مع الخرسانة C40.",
    },
    {
      id: "bill_of_materials" as PrintOptionType,
      title: "3. جدول الكميات والمواصفات الميكانيكية والسبائك (Bill of Materials & BOQ)",
      subtitle: "جداول تصنيف السبائك والمعادن والأدوات والآلات الثقيلة للتركيب",
      icon: Wrench,
      badge: "جداول الحصر والكميات",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-700",
      description: "قائمة تفصيلية للمواد: فولاذ Hardox 500، سبائك التيتانيوم Ti-6Al-4V، خرسانة C40 المقاومة للكبريتات، رافعات تلسكوبية 160 طن، حفارات صخرية، ومحطات ليزر Total Station.",
    },
    {
      id: "executive_brief" as PrintOptionType,
      title: "4. المذكرة التنفيذية والدراسة الاستراتيجية الموجزة (Executive Technical Brief)",
      subtitle: "ملخص هندسي استراتيجي في صفحة واحدة للمجالس القيادية وأصحاب القرار",
      icon: Shield,
      badge: "إيجاز تنفيذي صفحة واحدة",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-700",
      description: "ملخص تنفيذي مكثف يوضح الجدوى، انعدام الحاجة لقواعد منعزلة، توفير 85% من تكاليف الإنشاء، وحماية المنشآت الحيوية ذات القيمة الاستراتيجية بنطاق 360 درجة.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-right">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold font-display text-white text-base sm:text-lg">
                خيارات طباعة وتصدير المخطط الهندسي
              </h3>
              <p className="text-xs text-slate-400">
                حدد نوع المخطط المطلوب وإعدادات الصفحة للطباعة الفورية أو التصدير
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-200 font-sans">
          {/* 1. Selection Cards */}
          <div className="space-y-2.5">
            <label className="text-xs font-mono text-emerald-400 font-bold block">
              اختر صيغة ومحتوى المخطط للطباعة:
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {printOptionsList.map((opt) => {
                const isSelected = selectedOption === opt.id;
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-slate-950 border-emerald-500/80 ring-1 ring-emerald-500/40 shadow-lg"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-1 text-right">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white block">{opt.title}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${opt.badgeColor} font-mono`}>
                            {opt.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{opt.description}</p>
                      </div>
                    </div>

                    <div className="shrink-0 mr-auto sm:mr-0">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? "border-emerald-400 bg-emerald-500 text-slate-950"
                            : "border-slate-700 bg-slate-900"
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Print Settings & Customization */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Settings2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>إعدادات وتخصيص الطباعة (Page & Print Layout):</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">جاهز للطباعة المباشرة مع المخططات الكاملة</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-mono">حجم وتوجيه الصفحة:</label>
                <select
                  value={paperSize}
                  onChange={(e) => setPaperSize(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="a4_portrait">A4 عمودي القياسي (Portrait)</option>
                  <option value="a4_landscape">A4 أفقي عريض (Landscape)</option>
                  <option value="a3_blueprint">A3 لوحة هندسية عريضة (CAD Sheet)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={include3DViews}
                    onChange={(e) => setInclude3DViews(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span>تضمين المخططات الهندسية CAD</span>
                </label>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={highContrastMode}
                    onChange={(e) => setHighContrastMode(e.target.checked)}
                    className="rounded accent-emerald-500"
                  />
                  <span>نمط التباين العالي (High Contrast)</span>
                </label>
              </div>
            </div>
          </div>

          {/* 3. Central Mast & Deep Foundations Data Preview Note */}
          <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl flex items-start gap-2.5 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">مخطط تفصيلي معتمد للعمود المركزي والأساسات الصخرية:</span>
              <p className="text-[11px] text-emerald-400/90 leading-relaxed">
                يتضمن المستند مقطع CAD داخلي للعمود الفولاذي (قطر 450 ملم، سماكة 28 ملم من سبائك التيتانيوم Ti-6Al-4V وفولاذ S355)، وتثبيت أوتاد الصخور العميقة (-18.0 متراً) بخرسانة C40 مع مسار تصريف قوى الارتداد (320 kN) وشبكة التأريض (&lt; 0.8 أوم).
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleDownloadPDF}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-md ${
                pdfDownloaded
                  ? "bg-emerald-600 text-white"
                  : "bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950"
              }`}
              title="توليد وتنزيل ملف PDF رسمي مباشر"
            >
              {pdfDownloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{pdfDownloaded ? "تم تحميل PDF!" : "تحميل ملف PDF (.pdf)"}</span>
            </button>

            {onNavigateToFullDossier && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToFullDossier();
                }}
                className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>معاينة المستند الكامل</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate self-contained HTML with embedded vector schematics for reliable high-fidelity zero-block printing
function generatePrintableHTML(
  option: PrintOptionType,
  config: {
    towerThreeChoice: string;
    paperSize: string;
    include3DViews: boolean;
    includeCostEstimates: boolean;
    highContrastMode: boolean;
  }
): string {
  const dateStr = new Date().toLocaleDateString("ar-SA");
  const tower3Name =
    config.towerThreeChoice === "laser"
      ? "مدفع ليزر الألياف عالي الطاقة (100 kW HEL)"
      : config.towerThreeChoice === "missiles"
      ? "بطارية صواريخ اعتراضية عمودية (12x VLS SHORAD)"
      : "مدفع رشاش ثنائي 35 ملم إضافي (Dual CIWS)";
  const tower3Weight = config.towerThreeChoice === "laser" ? 6.2 : config.towerThreeChoice === "missiles" ? 7.8 : 8.1;
  const totalDeadLoad = (4.5 + 8.1 + tower3Weight + 14.8 + 6.2).toFixed(1);

  // High-Resolution Vector CAD SVG Schematics
  const elevationCAD_SVG = `
  <svg viewBox="0 0 900 480" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; margin:10px 0;">
    <!-- Blueprint Grid Lines -->
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" stroke-width="0.8"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    
    <!-- Bedrock Ground Line -->
    <line x1="50" y1="400" x2="850" y2="400" stroke="#475569" stroke-width="2.5" />
    <rect x="50" y="400" width="800" height="70" fill="#e2e8f0" opacity="0.6" />
    <text x="60" y="418" fill="#475569" font-size="11" font-weight="bold">منسوب سطح الأرض والأساسات الصخرية: EL +0.00 m (Granite Bedrock)</text>

    <!-- Deep Micro-Piles (-18.0m in Rock) -->
    <rect x="400" y="400" width="16" height="65" fill="#94a3b8" stroke="#334155" stroke-width="1.2" />
    <rect x="430" y="400" width="16" height="65" fill="#94a3b8" stroke="#334155" stroke-width="1.2" />
    <rect x="454" y="400" width="16" height="65" fill="#94a3b8" stroke="#334155" stroke-width="1.2" />
    <rect x="484" y="400" width="16" height="65" fill="#94a3b8" stroke="#334155" stroke-width="1.2" />
    <text x="510" y="445" fill="#0f172a" font-size="11" font-weight="bold">أوتاد التثبيت الصخرية العميقة: -18.0 متراً (خرسانة C40 بقطر 600 ملم)</text>

    <!-- Central Mast Hollow Core (Dia 450mm) -->
    <rect x="444" y="80" width="12" height="320" fill="#10b981" fill-opacity="0.25" stroke="#059669" stroke-width="2" />

    <!-- Lattice Tower Legs & X-Bracing -->
    <line x1="330" y1="400" x2="425" y2="95" stroke="#1e293b" stroke-width="3" />
    <line x1="570" y1="400" x2="475" y2="95" stroke="#1e293b" stroke-width="3" />
    <!-- Horizontal & X Struts -->
    <line x1="355" y1="320" x2="545" y2="320" stroke="#334155" stroke-width="2" />
    <line x1="380" y1="240" x2="520" y2="240" stroke="#334155" stroke-width="2" />
    <line x1="405" y1="160" x2="495" y2="160" stroke="#334155" stroke-width="2" />
    <line x1="330" y1="400" x2="545" y2="320" stroke="#64748b" stroke-width="1.5" />
    <line x1="570" y1="400" x2="355" y2="320" stroke="#64748b" stroke-width="1.5" />
    <line x1="355" y1="320" x2="520" y2="240" stroke="#64748b" stroke-width="1.5" />
    <line x1="545" y1="320" x2="380" y2="240" stroke="#64748b" stroke-width="1.5" />

    <!-- 380kV Transmission Crossarm -->
    <line x1="260" y1="190" x2="640" y2="190" stroke="#1e293b" stroke-width="4" />
    <line x1="280" y1="190" x2="280" y2="230" stroke="#d97706" stroke-width="3" />
    <line x1="620" y1="190" x2="620" y2="230" stroke="#d97706" stroke-width="3" />
    <circle cx="280" cy="235" r="5" fill="#b45309" />
    <circle cx="620" cy="235" r="5" fill="#b45309" />
    <text x="210" y="180" fill="#b45309" font-size="11" font-weight="bold">عوازل وخطوط الجهد الفائق 380kV (خلوص عزل 8.5 م)</text>

    <!-- Combat Platform at Apex -->
    <rect x="390" y="80" width="120" height="15" rx="3" fill="#0f172a" stroke="#10b981" stroke-width="2.5" />
    <polygon points="410,80 450,45 490,80" fill="#065f46" stroke="#34d399" stroke-width="2" />
    <circle cx="450" cy="62" r="7" fill="#34d399" />
    <line x1="450" y1="45" x2="450" y2="20" stroke="#0284c7" stroke-width="3" />
    <circle cx="450" cy="20" r="4" fill="#0284c7" />

    <!-- Dimension Callouts -->
    <line x1="120" y1="80" x2="120" y2="400" stroke="#0f172a" stroke-width="1.5" />
    <line x1="110" y1="80" x2="130" y2="80" stroke="#0f172a" stroke-width="1.5" />
    <line x1="110" y1="400" x2="130" y2="400" stroke="#0f172a" stroke-width="1.5" />
    <text x="135" y="245" fill="#0f172a" font-size="13" font-weight="bold">الارتفاع الكلي H = 110.0 م</text>

    <text x="530" y="70" fill="#064e3b" font-size="12" font-weight="bold">المنصة القتالية العلوية: 4,200×4,200 ملم (Hardox 500)</text>
    <text x="530" y="90" fill="#059669" font-size="11">رادار 4D AESA + مدفعية 35mm + مشتت الصواعق 250kA</text>
  </svg>
  `;

  // Detailed CAD Cutaway of Central Mast & Deep Foundations SVG
  const foundationDetailSVG = `
  <svg viewBox="0 0 900 380" width="100%" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; margin:10px 0;">
    <rect width="100%" height="100%" fill="#f1f5f9" />
    <!-- Stratum Bedrock -->
    <rect x="20" y="140" width="860" height="220" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
    <text x="35" y="160" fill="#334155" font-size="12" font-weight="bold">الطبقة الصخرية الجرانيتية المتماسكة (Igneous Granite Bedrock Stratum)</text>
    <text x="35" y="180" fill="#64748b" font-size="10">منسوب الأساسات EL 0.00m إلى EL -18.00m</text>

    <!-- Concrete Pile Cap with Rebar Cage -->
    <rect x="320" y="115" width="260" height="40" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="2" />
    <text x="450" y="140" fill="#0f172a" font-size="11" font-weight="bold" text-anchor="middle">قاعدة التثبيت الخرسانية المسلحة C40</text>

    <!-- 4 Deep Micro-Piles in Rock -->
    <rect x="345" y="155" width="30" height="190" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5" />
    <line x1="360" y1="155" x2="360" y2="345" stroke="#475569" stroke-width="2" stroke-dasharray="4 2" />

    <rect x="410" y="155" width="30" height="190" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5" />
    <line x1="425" y1="155" x2="425" y2="345" stroke="#475569" stroke-width="2" stroke-dasharray="4 2" />

    <rect x="460" y="155" width="30" height="190" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5" />
    <line x1="475" y1="155" x2="475" y2="345" stroke="#475569" stroke-width="2" stroke-dasharray="4 2" />

    <rect x="525" y="155" width="30" height="190" fill="#94a3b8" stroke="#1e293b" stroke-width="1.5" />
    <line x1="540" y1="155" x2="540" y2="345" stroke="#475569" stroke-width="2" stroke-dasharray="4 2" />

    <!-- Titanium Base Flange Collar -->
    <rect x="415" y="105" width="70" height="12" rx="2" fill="#0f172a" stroke="#10b981" stroke-width="2" />
    <circle cx="425" cy="111" r="3" fill="#34d399" />
    <circle cx="475" cy="111" r="3" fill="#34d399" />

    <!-- Central Hollow Mast Section -->
    <rect x="430" y="20" width="40" height="85" fill="#10b981" fill-opacity="0.3" stroke="#059669" stroke-width="2.5" />
    <rect x="442" y="20" width="16" height="85" fill="#ffffff" stroke="#047857" stroke-width="1.2" stroke-dasharray="3 3" />

    <!-- Callouts Left -->
    <path d="M 430 45 L 200 45" stroke="#059669" stroke-width="1.5" />
    <circle cx="430" cy="45" r="3" fill="#059669" />
    <text x="190" y="40" fill="#065f46" font-size="11" font-weight="bold" text-anchor="end">العمود الفولاذي المركزي: قطر 450 ملم</text>
    <text x="190" y="55" fill="#475569" font-size="9.5" text-anchor="end">سماكة 28 ملم من سبائك Ti-6Al-4V وفولاذ S355</text>
    <text x="190" y="70" fill="#475569" font-size="9.5" text-anchor="end">أنابيب نيتروجين هيدروليكية لتصريف قوى الارتداد 320kN</text>

    <!-- Callouts Right -->
    <path d="M 555 230 L 700 230" stroke="#0f172a" stroke-width="1.5" />
    <circle cx="555" cy="230" r="3" fill="#0f172a" />
    <text x="710" y="225" fill="#0f172a" font-size="11" font-weight="bold">أوتاد صخرية مجهرية (Micro-Piles):</text>
    <text x="710" y="242" fill="#475569" font-size="10">• العمق: 18,000 ملم (18 متراً بالصخر)</text>
    <text x="710" y="258" fill="#475569" font-size="10">• القطر: 600 ملم خرسانة C40 مقاومة للكبريتات</text>
    <text x="710" y="274" fill="#475569" font-size="10">• شبكة تأريض كيميائي نحاسي &lt; 0.8 أوم</text>
    <text x="710" y="290" fill="#047857" font-size="10" font-weight="bold">• تشتيت 88% من عزم الإطلاق إلى باطن الأرض</text>
  </svg>
  `;

  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8">
  <title>وثيقة المخطط الهندسي التنفيذي الشامل - مشروع حصون الدفاع الجوي</title>
  <style>
    @page {
      size: ${config.paperSize === "a3_blueprint" ? "A3 landscape" : config.paperSize === "a4_landscape" ? "A4 landscape" : "A4 portrait"};
      margin: 12mm;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.5;
      font-size: 10.5pt;
      margin: 0;
      padding: 10px;
    }
    .header {
      border-bottom: 2.5px solid #059669;
      padding-bottom: 12px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .badge {
      font-size: 8.5pt;
      font-weight: bold;
      color: #047857;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .title {
      font-size: 16pt;
      font-weight: bold;
      color: #064e3b;
      margin: 4px 0;
    }
    .subtitle {
      font-size: 9pt;
      color: #475569;
    }
    .meta-box {
      border: 1px solid #cbd5e1;
      padding: 8px 12px;
      font-size: 8.5pt;
      background: #f8fafc;
      border-radius: 6px;
      text-align: right;
      font-family: monospace;
    }
    h2 {
      font-size: 12pt;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 5px;
      margin-top: 18px;
      margin-bottom: 8px;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
      font-size: 9pt;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      text-align: right;
    }
    th {
      background: #f1f5f9;
      font-weight: bold;
      color: #1e293b;
    }
    .highlight {
      font-weight: bold;
      color: #065f46;
    }
    .grid-2 {
      display: flex;
      gap: 12px;
    }
    .grid-3 {
      display: flex;
      gap: 10px;
    }
    .grid-4 {
      display: flex;
      gap: 8px;
    }
    .card {
      flex: 1;
      border: 1px solid #e2e8f0;
      padding: 10px 12px;
      border-radius: 6px;
      background: #f8fafc;
    }
    .tile {
      flex: 1;
      border: 1px solid #cbd5e1;
      padding: 8px;
      border-radius: 6px;
      background: #f8fafc;
      text-align: center;
    }
    .footer {
      border-top: 1.5px solid #94a3b8;
      margin-top: 25px;
      padding-top: 8px;
      font-size: 8pt;
      color: #475569;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="badge">المملكة العربية السعودية · دراسة أكاديمية وهندسية تخصصية معتمدة</div>
      <div class="title">المشروع الوطني الاستراتيجي لحصون الدفاع الجوي الشبكية</div>
      <div class="subtitle">المخطط الهيكلي والمواصفات التنفيذية الشاملة على خطوط الضغط العالي (380kV / 500kV)</div>
    </div>
    <div class="meta-box">
      <div><strong>رقم الوثيقة:</strong> KSA-MOD-PYLON-2026-REV3</div>
      <div><strong>تاريخ الطباعة:</strong> ${dateStr}</div>
      <div><strong>التصنيف:</strong> دراسة هندسية محمية</div>
      <div><strong>المبادر:</strong> فهد خالد الغامدي - الهيئة الملكية</div>
    </div>
  </div>

  ${config.include3DViews ? `
  <h2>1. المخطط الهندسي المعماري ومقطع البرج (Elevation Cross-Section CAD)</h2>
  ${elevationCAD_SVG}

  <h2>2. المقطع الهندسي التفصيلي للعمود المركزي والأساسات الصخرية (Central Mast & Deep Foundations)</h2>
  ${foundationDetailSVG}
  ` : ""}

  <h2>3. الأبعاد والمقاسات الهندسية الدقيقة للمنصة والعمود والأساسات</h2>
  <div class="grid-2">
    <div class="card">
      <strong style="color:#064e3b; font-size:10pt;">المنصة القتالية العلوية (Combat Platform):</strong>
      <ul style="margin:6px 0; padding-right:18px; font-size:9pt;">
        <li><strong>المساحة والأبعاد:</strong> 4,200 ملم × 4,200 ملم مربعة بقاعدة صلب شبكي.</li>
        <li><strong>السماكة والتدريع:</strong> 18 ملم فولاذ Hardox 500 المقسى عسكرياً (إجهاد خضوع 1,500 MPa).</li>
        <li><strong>حواجز التشتيت:</strong> ارتفاع 1,400 ملم مائلة بزاوية 12° لتقليص المقطع الراداري RCS.</li>
        <li><strong>مسافة الخلوص الكهربائي:</strong> 8,500 ملم منطقة عازلة آمنة فوق خطوط 380kV.</li>
        <li><strong>الحمولة الإنشائية الحية:</strong> 14.50 طناً مترياً بحسابات الأحمال الديناميكية المستمرة.</li>
      </ul>
    </div>
    <div class="card">
      <strong style="color:#064e3b; font-size:10pt;">العمود المركزي والأساسات الصخرية العميقة (Central Mast & Foundations):</strong>
      <ul style="margin:6px 0; padding-right:18px; font-size:9pt;">
        <li><strong>قطر العمود المركزي:</strong> 450 ملم أنبوبي مفرغ سبائك تيتانيوم Ti-6Al-4V وفولاذ S355.</li>
        <li><strong>سماكة جدار العمود:</strong> 28 ملم عالية المقاومة لإجهاد الخضوع (> 550 MPa).</li>
        <li><strong>عمق أوتاد التثبيت (Micro-Piles):</strong> 18,000 ملم (18 متراً) داخل التشكيلات الصخرية النارية.</li>
        <li><strong>قطر ونوع الخرسانة:</strong> 600 ملم خرسانة C40 مسلحة مقاومة للكبريتات والأملاح.</li>
        <li><strong>مسار تصريف الارتداد:</strong> أنابيب هيدروليكية داخلية تصرف 88% من قوى الإطلاق للأرض.</li>
      </ul>
    </div>
  </div>

  <h2>4. جدول توزيع الأوزان والأحمال الإنشائية الكلية (Mass Budget & Sizing)</h2>
  <table>
    <thead>
      <tr>
        <th>المعدة / العنصر الإنشائي</th>
        <th>الوزن (طن)</th>
        <th>موضع التثبيت والارتفاع</th>
        <th>تأثير القصور الذاتي والتخميد الحركي</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>رادار 4D AESA ومستشعر EO/IR المبرد</strong></td>
        <td class="highlight">4.50 طن</td>
        <td>قمة البرج الأول (منسوب +110م)</td>
        <td>تخميد جيروسكوبي متوازن محوري</td>
      </tr>
      <tr>
        <td><strong>مدفع الرشاش الثنائي 35 ملم + 1,200 طلقة</strong></td>
        <td class="highlight">8.10 طن</td>
        <td>منصة البرج الثاني (منسوب +106م)</td>
        <td>تشتيت 88% عبر أسطوانات التخميد النيتروجينية</td>
      </tr>
      <tr>
        <td><strong>البرج الثالث: ${tower3Name}</strong></td>
        <td class="highlight">${tower3Weight.toFixed(2)} طن</td>
        <td>منصة البرج الثالث المعيارية</td>
        <td>مركز ثقل متماثل ومستقر</td>
      </tr>
      <tr>
        <td><strong>المنصات الفولاذية، العوازل، والمخمدات</strong></td>
        <td class="highlight">14.80 طن</td>
        <td>موزعة على كامل الهيكل</td>
        <td>تخفيض مركز الثقل الكلي بنسبة 35%</td>
      </tr>
      <tr>
        <td><strong>العمود المركزي والشفاه وقواعد التثبيت</strong></td>
        <td class="highlight">6.20 طن</td>
        <td>القلب الداخلي من -18م إلى +110م</td>
        <td>نقل عزم الانحناء مباشرة إلى الصخور</td>
      </tr>
      <tr style="background:#f1f5f9; font-weight:bold;">
        <td>إجمالي الوزن الساكن الكلي (Total Static Load)</td>
        <td class="highlight">${totalDeadLoad} طن</td>
        <td colspan="2">مطابق لمعايير الكود السعودي SBC 301 ومعايير HCIS (معامل أمان 2.45)</td>
      </tr>
    </tbody>
  </table>

  <h2>5. الثبات الهيكلي عند الإطلاق ومقاومة الرياح العاتية</h2>
  <div class="card" style="margin-bottom:10px;">
    <p style="margin:4px 0; font-size:9.5pt;">
      عند إطلاق الرشاش الثنائي 35 ملم بكثافة 1,600 طلقة/دقيقة، تتولد قوة دفع ارتدادية لحظية تبلغ <strong>320 كيلو نيوتن (kN)</strong>. 
      تقوم الأسطوانات الهيدروليكية بامتصاص <strong>88%</strong> من هذا الدفع وتخفيضه إلى <strong>38.4 kN</strong> فقط، 
      ثم تصريفه عبر العمود الفولاذي الداخلي بقطر 450 ملم مباشرة إلى أوتاد التثبيت الصخرية بعمق 18 متراً دون التأثير على أسلاك الكهرباء.
    </p>
  </div>
  <div class="grid-4">
    <div class="tile">
      <div style="font-size:8pt; color:#64748b;">مقاومة الرياح القصوى</div>
      <div style="font-size:12pt; font-weight:bold; color:#065f46;">180 كم/س</div>
      <div style="font-size:7.5pt; color:#475569;">رياح إعصارية عاتية</div>
    </div>
    <div class="tile">
      <div style="font-size:8pt; color:#64748b;">عزم الانحناء الإنشائي</div>
      <div style="font-size:12pt; font-weight:bold; color:#065f46;">410 kN.m</div>
      <div style="font-size:7.5pt; color:#475569;">مقاومة الانقلاب</div>
    </div>
    <div class="tile">
      <div style="font-size:8pt; color:#64748b;">أقصى تأرجح مسموح</div>
      <div style="font-size:12pt; font-weight:bold; color:#065f46;">&lt; 11.0 ملم</div>
      <div style="font-size:7.5pt; color:#475569;">دقة تسديد نارية</div>
    </div>
    <div class="tile">
      <div style="font-size:8pt; color:#64748b;">معامل الأمان الكلي</div>
      <div style="font-size:12pt; font-weight:bold; color:#065f46;">2.45 (ممتاز)</div>
      <div style="font-size:7.5pt; color:#475569;">حدود الأمان القصوى</div>
    </div>
  </div>

  <h2>6. ارتداد الصواعق والعزل الكهرومغناطيسي والتأريض العميق 380kV</h2>
  <div class="grid-2">
    <div class="card">
      <strong style="color:#064e3b; font-size:9.5pt;">تشتيت تيار الصواعق (Lightning Protection):</strong>
      <ul style="margin:4px 0; padding-right:16px; font-size:8.5pt;">
        <li>سعة صواعق مباشرة حتى <strong>250 kA</strong> بموجة قياسية 10/350 µs.</li>
        <li>رؤوس تفريغ شحنات مبكرة (CTS / ESE) تمنع ضربات الصواعق 90%.</li>
        <li>مسارات تفريغ نحاسية 95 ملم² معزولة ببوليمير فائق 500kV.</li>
        <li>مقاومة شبكة التأريض الشعاعية: <strong>&lt; 0.8 أوم</strong> بآبار إلكتروليتية.</li>
      </ul>
    </div>
    <div class="card">
      <strong style="color:#064e3b; font-size:9.5pt;">العزل الكهرومغناطيسي وحجب النبضة (EMP):</strong>
      <ul style="margin:4px 0; padding-right:16px; font-size:8.5pt;">
        <li>قفص فاراداي مزدوج <strong>MIL-STD-188-125</strong> لحماية حواسب النيران.</li>
        <li>صفائح <strong>Mu-Metal</strong> لعزل حقول الجهد 380,000V المغناطيسية.</li>
        <li>كابلات ألياف زجاجية عازلة تماماً (OPGW Dielectric 100 Gbps).</li>
        <li>مرشحات ترشيح فائقة (EMI Filters) تمنع التيارات العكسية.</li>
      </ul>
    </div>
  </div>

  <h2>7. الآلات الثقيلة ومعدات البناء والتركيب</h2>
  <div class="grid-3">
    <div class="card">
      <strong style="font-size:9pt; color:#0f172a;">1. رافعات هيدروليكية 160 طن:</strong>
      <p style="font-size:8pt; color:#475569; margin:3px 0;">
        رافعات تضاريس وعرة بذراع تلسكوبي 135 متراً لرفع المنصات العلوية وتثبيتها دون لمس الكابلات.
      </p>
    </div>
    <div class="card">
      <strong style="font-size:9pt; color:#0f172a;">2. حفارات أوتاد صخرية دوارة:</strong>
      <p style="font-size:8pt; color:#475569; margin:3px 0;">
        حفر ثقوب بعمق 18 متراً وقطر 600 ملم بالصخور الجرانيتية لحقن خرسانة C40 المسلحة.
      </p>
    </div>
    <div class="card">
      <strong style="font-size:9pt; color:#0f172a;">3. محطات ليزر ثلاثية الأبعاد:</strong>
      <p style="font-size:8pt; color:#475569; margin:3px 0;">
        أجهزة Total Station لضبط أفقية المنصات والمخمدات بدقة متناهية (±0.05 ملم).
      </p>
    </div>
  </div>

  <div class="footer">
    <div>المخطط مطابق لمعايير الهيئة العليا للأمن الصناعي (HCIS) والكود السعودي SBC 301</div>
    <div>مقدم المبادرة: فهد خالد الغامدي - الهيئة الملكية - المدينة الاقتصادية</div>
    <div>الاعتماد الرسمي: دراسة هندسية معتمدة للتنفيذ 2026</div>
  </div>
</body>
</html>
`;
}

function generateDossierText(option: PrintOptionType, towerThreeChoice: string): string {
  const tower3Weight = towerThreeChoice === "laser" ? 6.2 : towerThreeChoice === "missiles" ? 7.8 : 8.1;
  const totalDeadLoad = (4.5 + 8.1 + tower3Weight + 14.8 + 6.2).toFixed(1);

  return `===============================================================
المشروع الوطني الاستراتيجي لحصون الدفاع الجوي الشبكية
وثيقة المخطط الهندسي والمواصفات التنفيذية الشاملة
رمز الوثيقة: KSA-MOD-PYLON-FLAK-2026-REV3
التاريخ: ${new Date().toLocaleDateString("ar-SA")}
مقدم المبادرة: فهد خالد الغامدي - الهيئة الملكية - المدينة الاقتصادية
===============================================================

1. الأبعاد والمقاسات الهندسية:
- أبعاد المنصة القتالية العلوية: 4,200 ملم × 4,200 ملم (مربعة مصفحة)
- سماكة التدريع: 18 ملم فولاذ Hardox 500 المقسى (إجهاد خضوع 1,500 MPa)
- ارتفاع حواجز الحماية: 1,400 ملم مائلة بزاوية 12° لتشتيت الرادار
- خلوص العزل الكهربائي: 8,500 ملم فوق أسلاك الجهد الفائق 380kV
- قطر العمود الفولاذي المركزي: 450 ملم (سماكة 28 ملم سبائك تيتانيوم Ti-6Al-4V وفولاذ S355)
- عمق أوتاد التثبيت الصخرية: 18,000 ملم (18 متراً) داخل الصخور الجرانيتية
- مواصفات الخرسانة: قطر 600 ملم خرسانة C40 مسلحة مقاومة للكبريتات

2. جدول الأوزان والأحمال الإنشائية الكلية (Mass Budget):
- البرج 1 (رادار 4D AESA + مستشعر EO/IR المبرد): 4.50 طن
- البرج 2 (رشاش ثنائي 35 ملم موجه ليزرياً): 8.10 طن
- البرج 3 (${towerThreeChoice}): ${tower3Weight.toFixed(2)} طن
- المنصات الفولاذية والمخمدات الهيدروليكية: 14.80 طن
- العمود المركزي وقواعد التثبيت: 6.20 طن
- إجمالي الوزن الساكن الكلي: ${totalDeadLoad} طن (معامل أمان 2.45 مطابق لـ SBC 301 و HCIS)

3. تخميد الارتداد والصواعق والعزل الكهربائي:
- كفاءة التخميد الهيدروليكي: 88% امتصاص لقوة الدفع اللحظية 320 kN
- القوة المتبقية المصرفة للأرض: 38.4 kN فقط عبر العمود المركزي
- مقاومة شبكة التأريض: أقل من 0.8 أوم بآبار كيميائية إلكتروليتية
- سعة تفريغ الصواعق المباشرة: 250 kA برؤوس CTS/ESE
- الحماية الكهرومغناطيسية: قفص فاراداي مزدوج MIL-STD-188-125 وصفائح Mu-Metal

4. مقاومة الرياح والآلات الثقيلة:
- مقاومة الرياح القصوى: 180 كم/س (عزم انحناء 410 kN.m)
- أقصى تأرجح مسموح للمنصة: أقل من 11.0 ملم
- الرافعات المطلوبة: رافعات هيدروليكية مجنزرة 160 طن بذراع 135 متراً
- أجهزة المعايرة: محطات رصد ليزري Total Station بدقة ±0.05 ملم
===============================================================`;
}
