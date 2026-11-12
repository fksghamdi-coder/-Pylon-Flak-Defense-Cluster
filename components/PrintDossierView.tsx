"use client";

import React, { useState } from "react";
import {
  Printer, Download, Shield, CheckCircle2, FileText, Wrench, Layers, Zap, Wind, Compass,
  Settings2, Copy, Check, Eye, SlidersHorizontal, Sparkles, FileCheck
} from "lucide-react";
import PrintOptionsModal, { PrintOptionType } from "@/components/PrintOptionsModal";
import { generateAndDownloadPDF } from "@/lib/pdfGenerator";

interface PrintDossierViewProps {
  towerThreeChoice: "laser" | "missiles" | "ciws";
}

export default function PrintDossierView({ towerThreeChoice }: PrintDossierViewProps) {
  const [showOptionsModal, setShowOptionsModal] = useState<boolean>(false);
  const [activePrintView, setActivePrintView] = useState<"all" | "cad" | "specs" | "weights" | "machinery" | "electrical">("all");
  const [paperFormat, setPaperFormat] = useState<"a4" | "a3">("a4");
  const [copied, setCopied] = useState<boolean>(false);
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const [pdfDownloaded, setPdfDownloaded] = useState<boolean>(false);

  // Direct PDF generation and download
  const handleDownloadPDF = () => {
    const success = generateAndDownloadPDF({
      towerThreeChoice,
      optionType: activePrintView === "specs" ? "structural_cad" : activePrintView === "weights" ? "bill_of_materials" : "full_dossier",
      paperSize: paperFormat === "a3" ? "a3_blueprint" : "a4_portrait",
      include3DViews: true,
    });
    if (success) {
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 2500);
    }
  };

  // Safe print execution with fallback
  const handleDirectPrint = () => {
    setIsPrinting(true);

    try {
      // Create printable clone in hidden iframe for 100% reliable printing inside iframes
      const printDoc = document.getElementById("printable-dossier-root");
      if (printDoc) {
        let printFrame = document.getElementById("print-engine-iframe") as HTMLIFrameElement | null;
        if (!printFrame) {
          printFrame = document.createElement("iframe");
          printFrame.id = "print-engine-iframe";
          printFrame.style.position = "fixed";
          printFrame.style.right = "0";
          printFrame.style.bottom = "0";
          printFrame.style.width = "0";
          printFrame.style.height = "0";
          printFrame.style.border = "0";
          document.body.appendChild(printFrame);
        }

        const frameDoc = printFrame.contentWindow?.document || printFrame.contentDocument;
        if (frameDoc) {
          frameDoc.open();
          frameDoc.write(`
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
            <head>
              <meta charset="utf-8">
              <title>وثيقة المخطط الهندسي التنفيذي الشامل - حصون الدفاع الجوي</title>
              <style>
                @page { size: ${paperFormat === "a3" ? "A3 landscape" : "A4 portrait"}; margin: 12mm; }
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a; background: #fff; line-height: 1.5; font-size: 10.5pt; margin: 0; padding: 10px; }
                table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 9.5pt; }
                th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: right; }
                th { background: #f1f5f9; font-weight: bold; color: #1e293b; }
                .text-emerald-400, .text-emerald-500 { color: #047857 !important; }
                .text-white { color: #0f172a !important; }
                .bg-slate-900, .bg-slate-950 { background: #fff !important; color: #0f172a !important; border: 1px solid #cbd5e1 !important; }
                .border-slate-800 { border-color: #cbd5e1 !important; }
                @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
              </style>
            </head>
            <body>
              ${printDoc.innerHTML}
            </body>
            </html>
          `);
          frameDoc.close();

          setTimeout(() => {
            try {
              printFrame?.contentWindow?.focus();
              printFrame?.contentWindow?.print();
              setIsPrinting(false);
            } catch {
              window.print();
              setIsPrinting(false);
            }
          }, 400);
          return;
        }
      }
    } catch {
      // Fallback
    }

    try {
      window.print();
    } catch {
      //
    }
    setIsPrinting(false);
  };

  // Download printable HTML report
  const handleDownloadReport = () => {
    const printDoc = document.getElementById("printable-dossier-root");
    const content = printDoc ? printDoc.innerHTML : "";
    const html = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="utf-8">
        <title>المخطط الهندسي والمواصفات التنفيذية الشاملة - دراسة 2026</title>
        <style>
          @page { size: ${paperFormat === "a3" ? "A3 landscape" : "A4 portrait"}; margin: 12mm; }
          body { font-family: system-ui, sans-serif; color: #0f172a; background: #fff; line-height: 1.5; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 12px 0; }
          th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: right; }
          th { background: #f1f5f9; }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Pylon_Flak_Engineering_Dossier_${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy raw structured text
  const handleCopyText = () => {
    const tower3Weight = towerThreeChoice === "laser" ? 6.2 : towerThreeChoice === "missiles" ? 7.8 : 8.1;
    const totalWeight = (4.5 + 8.1 + tower3Weight + 14.8 + 6.2).toFixed(1);

    const text = `===============================================================
المشروع الوطني الاستراتيجي لحصون الدفاع الجوي الشبكية
وثيقة المخطط الهندسي والمواصفات التنفيذية الشاملة (KSA-MOD-2026-REV3)
التاريخ: ${new Date().toLocaleDateString("ar-SA")}
مقدم المبادرة: فهد خالد الغامدي - الهيئة الملكية - المدينة الاقتصادية
===============================================================

1. الأبعاد والمقاسات:
- المنصة القتالية العلوية: 4,200 ملم × 4,200 ملم مربعة
- سماكة التدريع: 18 ملم فولاذ Hardox 500 المقسى (إجهاد خضوع 1,500 MPa)
- خلوص العزل الكهربائي: 8,500 ملم فوق أسلاك الجهد الفائق 380kV
- العمود الفولاذي المركزي: قطر 450 ملم بسماكة 28 ملم سبائك تيتانيوم Ti-6Al-4V وفولاذ S355
- عمق الأوتاد الصخرية: 18,000 ملم (18 متراً) بالصخور الجرانيتية بخرسانة C40 قطر 600 ملم

2. جدول توزيع الأوزان والأحمال الإنشائية:
- البرج 1 (رادار 4D AESA + مستشعر EO/IR المبرد): 4.50 طن
- البرج 2 (رشاش ثنائي 35 ملم موجه ليزرياً): 8.10 طن
- البرج 3 (${towerThreeChoice}): ${tower3Weight.toFixed(2)} طن
- المنصات الفولاذية والمخمدات: 14.80 طن
- العمود المركزي وقواعد التثبيت: 6.20 طن
- إجمالي الوزن الساكن الكلي: ${totalWeight} طن (معامل أمان 2.45)

3. تخميد الارتداد والصواعق:
- كفاءة التخميد الهيدروليكي: 88% امتصاص لقوة الدفع 320 kN وتخفيضها إلى 38.4 kN
- مقاومة شبكة التأريض: أقل من 0.8 أوم
- سعة تفريغ الصواعق المباشرة: 250 kA برؤوس CTS/ESE
- الحماية الكهرومغناطيسية: قفص فاراداي مزدوج MIL-STD-188-125
===============================================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tower3Name =
    towerThreeChoice === "laser"
      ? "مدفع ليزر HEL 100kW مع مبرداته"
      : towerThreeChoice === "missiles"
      ? "12 صومعة صواريخ VLS"
      : "رشاش ثنائي إضافي كثيف النيران";
  const tower3Weight = towerThreeChoice === "laser" ? 6.2 : towerThreeChoice === "missiles" ? 7.8 : 8.1;
  const totalDeadLoad = (4.5 + 8.1 + tower3Weight + 14.8 + 6.2).toFixed(1);

  return (
    <div className="space-y-6">
      {/* 1. Action Header & Multiple Print Controls Bar (Hidden during printing) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 print:hidden shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>نظام طباعة وتصدير المخططات الهندسية التنفيذية (Engineering Blueprint Print Center)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              مخططات البناء والتجهيز والمواصفات الميكانيكية والإنشائية
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              تتضمن المخططات الهندسية CAD، مقطع العمود المركزي وتثبيت الأساسات، جداول الأوزان، وتخميد الارتداد والصواعق.
            </p>
          </div>

          {/* Main Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadPDF}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-lg ${
                pdfDownloaded
                  ? "bg-emerald-600 text-white"
                  : "bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold active:scale-95"
              }`}
              title="توليد وتنزيل ملف PDF رسمي مباشر لجهازك"
            >
              {pdfDownloaded ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
              <span>{pdfDownloaded ? "تم تحميل ملف PDF بنجاح!" : "تحميل ملف PDF المعتمد (.pdf)"}</span>
            </button>

            <button
              onClick={() => setShowOptionsModal(true)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-emerald-400 border border-emerald-500/40 font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm"
              title="فتح خيارات الطباعة المتقدمة وتخصيص الصفحات"
            >
              <Settings2 className="w-4 h-4 text-emerald-400" />
              <span>خيارات الطباعة والتخصيص</span>
            </button>
          </div>
        </div>

        {/* 2. Quick Print Modes & Format Bar */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-emerald-400" />
              <span>فلترة عرض الأقسام للطباعة:</span>
            </span>
            {[
              { id: "all", label: "كامل المخطط (شامل)" },
              { id: "cad", label: "المخططات الهندسية CAD" },
              { id: "specs", label: "1. المقاسات والأبعاد" },
              { id: "weights", label: "2. جدول الأوزان" },
              { id: "machinery", label: "3. الآلات والمعدات" },
              { id: "electrical", label: "4. الصواعق والتأريض" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePrintView(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                  activePrintView === tab.id
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold shadow-sm"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 text-[11px] flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "تم النسخ!" : "نسخ النص"}</span>
            </button>

            <button
              onClick={handleDownloadReport}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 text-[11px] flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>تنزيل ملف HTML</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Printable Document Canvas */}
      <div
        id="printable-dossier-root"
        className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-8 text-slate-200 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none print:m-0"
      >
        {/* Document Header with Emblems & Classification */}
        <div className="border-b-2 border-emerald-500/80 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-emerald-400 print:text-emerald-700 font-bold uppercase tracking-wider block">
              المملكة العربية السعودية · دراسة أكاديمية وهندسية تخصصية معتمدة
            </span>
            <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-display text-white print:text-black whitespace-nowrap overflow-hidden text-ellipsis">
              المشروع الوطني الاستراتيجي لحصون الدفاع الجوي الشبكية: المخطط الهيكلي والمواصفات التنفيذية
            </h1>
            <span className="text-xs text-slate-400 print:text-slate-600 block">
              دراسة معمارية وهندسية متقدمة لدمج المنظومات ثلاثية الأبراج على خطوط الضغط العالي (380kV/500kV) والهياكل الشبكية المماثلة
            </span>
            <span className="text-[10px] font-mono text-slate-500 print:text-slate-500 block" dir="ltr">
              Project Pylon-Flak Bastion: Advanced Architectural & Engineering Framework for Tri-Tower Air Defense Clusters
            </span>
          </div>

          <div className="text-right sm:text-left text-xs font-mono space-y-1 bg-slate-900 print:bg-slate-100 p-3 rounded-lg border border-slate-800 print:border-slate-300">
            <div><strong>رقم الوثيقة:</strong> KSA-MOD-PYLON-FLAK-2026-REV3</div>
            <div><strong>تاريخ الاعتماد:</strong> {new Date().toLocaleDateString("ar-SA")}</div>
            <div className="text-emerald-400 print:text-emerald-700 font-bold">
              مقدم المبادرة: فهد خالد الغامدي - الهيئة الملكية - المدينة الاقتصادية
            </div>
          </div>
        </div>

        {/* Section: Interactive CAD Visual Blueprint Schematics */}
        {(activePrintView === "all" || activePrintView === "cad") && (
          <div className="space-y-4">
            <h2 className="text-base font-bold font-display text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
              <Layers className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
              <span>المخططات الهندسية ومقاطع الأساسات والبرج (CAD Visual Schematics)</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Elevation Cross Section */}
              <div className="p-3 bg-slate-900 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-300 space-y-2">
                <span className="text-xs font-bold text-white print:text-black block">
                  1. مقطع معماري رأسي كامل للبرج (Scale 1:500 Elevation Cross-Section):
                </span>
                <svg viewBox="0 0 500 320" width="100%" height="210" className="w-full h-auto bg-slate-950 print:bg-white rounded-lg border border-slate-800 print:border-slate-300">
                  <line x1="20" y1="280" x2="480" y2="280" stroke="#475569" strokeWidth="2" />
                  <text x="25" y="295" fill="#64748b" fontSize="8" fontWeight="bold">منسوب سطح الأرض EL +0.00m (Granite)</text>
                  
                  {/* Micro-piles in bedrock */}
                  <rect x="230" y="280" width="10" height="35" fill="#64748b" />
                  <rect x="245" y="280" width="10" height="35" fill="#64748b" />
                  <rect x="260" y="280" width="10" height="35" fill="#64748b" />
                  <text x="280" y="305" fill="#059669" fontSize="7.5" fontWeight="bold">أوتاد الصخور (-18.0م C40)</text>

                  {/* Central Hollow Mast Core */}
                  <rect x="246" y="55" width="8" height="225" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.2" />

                  {/* Tower Legs */}
                  <line x1="180" y1="280" x2="235" y2="65" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="320" y1="280" x2="265" y2="65" stroke="#94a3b8" strokeWidth="2" />
                  <line x1="195" y1="225" x2="305" y2="225" stroke="#64748b" strokeWidth="1.2" />
                  <line x1="210" y1="170" x2="290" y2="170" stroke="#64748b" strokeWidth="1.2" />
                  <line x1="225" y1="115" x2="275" y2="115" stroke="#64748b" strokeWidth="1.2" />

                  {/* 380kV Arms */}
                  <line x1="130" y1="135" x2="370" y2="135" stroke="#94a3b8" strokeWidth="3" />
                  <circle cx="145" cy="155" r="4" fill="#f59e0b" />
                  <circle cx="355" cy="155" r="4" fill="#f59e0b" />
                  <text x="145" y="125" fill="#d97706" fontSize="7.5">خطوط 380kV (خلوص 8.5م)</text>

                  {/* Apex Combat Platform */}
                  <rect x="215" y="55" width="70" height="10" rx="2" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <circle cx="250" cy="45" r="7" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
                  <line x1="250" y1="38" x2="250" y2="20" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="250" cy="20" r="2.5" fill="#38bdf8" />

                  <text x="290" y="50" fill="#10b981" fontSize="8" fontWeight="bold">القمة +110م (Hardox 500)</text>
                  <text x="20" y="60" fill="#64748b" fontSize="8">H = 110.0 متر</text>
                </svg>
              </div>

              {/* Central Mast & Deep Foundation Cutaway */}
              <div className="p-3 bg-slate-900 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-300 space-y-2">
                <span className="text-xs font-bold text-white print:text-black block">
                  2. مقطع تفصيلي للعمود المركزي والأساسات الصخرية (Central Mast & Foundations):
                </span>
                <svg viewBox="0 0 500 320" width="100%" height="210" className="w-full h-auto bg-slate-950 print:bg-white rounded-lg border border-slate-800 print:border-slate-300">
                  <rect x="10" y="110" width="480" height="200" fill="#0f172a" print-fill="#f1f5f9" stroke="#334155" strokeWidth="1" />
                  <text x="20" y="130" fill="#94a3b8" fontSize="8" fontWeight="bold">تشكيلات صخرية جرانيتية (Granite Bedrock Stratum -18.0m)</text>

                  {/* Foundation Cap */}
                  <rect x="170" y="90" width="160" height="30" rx="3" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                  <text x="250" y="110" fill="#f8fafc" fontSize="8" fontWeight="bold" textAnchor="middle">قاعدة تثبيت مسلحة C40</text>

                  {/* 4 Piles */}
                  <rect x="185" y="120" width="20" height="180" fill="#64748b" stroke="#0f172a" strokeWidth="1" />
                  <rect x="225" y="120" width="20" height="180" fill="#64748b" stroke="#0f172a" strokeWidth="1" />
                  <rect x="255" y="120" width="20" height="180" fill="#64748b" stroke="#0f172a" strokeWidth="1" />
                  <rect x="295" y="120" width="20" height="180" fill="#64748b" stroke="#0f172a" strokeWidth="1" />

                  {/* Titanium Flange */}
                  <rect x="225" y="80" width="50" height="10" rx="2" fill="#047857" stroke="#34d399" strokeWidth="1.2" />

                  {/* Central Mast */}
                  <rect x="235" y="15" width="30" height="65" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />
                  <line x1="250" y1="15" x2="250" y2="80" stroke="#047857" strokeWidth="1.5" strokeDasharray="3 2" />

                  {/* Callouts */}
                  <text x="30" y="45" fill="#34d399" fontSize="8.5" fontWeight="bold">العمود الفولاذي المركزي: قطر 450 ملم</text>
                  <text x="30" y="60" fill="#94a3b8" fontSize="7.5">سماكة 28 ملم سبائك Ti-6Al-4V وفولاذ S355</text>
                  <text x="30" y="75" fill="#94a3b8" fontSize="7.5">أنابيب نيتروجين تصرف 88% من قوى 320kN</text>

                  <text x="330" y="160" fill="#38bdf8" fontSize="8" fontWeight="bold">أوتاد التثبيت الصخرية (Micro-Piles):</text>
                  <text x="330" y="175" fill="#94a3b8" fontSize="7.5">• عمق 18 متراً بالصخور</text>
                  <text x="330" y="190" fill="#94a3b8" fontSize="7.5">• قطر 600 ملم خرسانة C40 مقاومة للكبريتات</text>
                  <text x="330" y="205" fill="#94a3b8" fontSize="7.5">• مقاومة تأريض &lt; 0.8 أوم</text>
                  <text x="330" y="220" fill="#10b981" fontSize="7.5" fontWeight="bold">• امتصاص وتشتيت مباشر لعزم الإطلاق</text>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Section 1: Dimensions, Sizing & Physical Geometry */}
        {(activePrintView === "all" || activePrintView === "specs") && (
          <div className="space-y-3">
            <h2 className="text-base font-bold font-display text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
              <Layers className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
              <span>1. المقاسات والأبعاد والأحجام الدقيقة (Geometric Specifications)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 p-3.5 bg-slate-900 print:bg-slate-50 rounded-lg border border-slate-800 print:border-slate-300">
                <span className="font-bold text-white print:text-black block mb-1">المنصة القتالية العلوية (Combat Platform):</span>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60 print:border-slate-200">
                    <span>الأبعاد الأفقية:</span>
                    <span className="font-bold text-emerald-400 print:text-black">4,200 ملم × 4,200 ملم (مربعة)</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60 print:border-slate-200">
                    <span>السماكة والتدريع:</span>
                    <span className="font-bold text-emerald-400 print:text-black">18 ملم فولاذ Hardox 500 المقسى (1,500 MPa)</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60 print:border-slate-200">
                    <span>ارتفاع حواجز الحماية:</span>
                    <span className="font-bold text-emerald-400 print:text-black">1,400 ملم مائلة بزاوية 12° لتشتيت الرادار</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60 print:border-slate-200">
                    <span>مسافة الخلوص الكهربائي:</span>
                    <span className="font-bold text-emerald-400 print:text-black">8,500 ملم فوق أسلاك الجهد 380kV</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>الحمولة الحية المستمرة:</span>
                    <span className="font-bold text-emerald-400 print:text-black">14.50 طناً مترياً (معامل أمان 2.45)</span>
                  </div>
                </div>
              </div>

              {/* Central Mast & Deep Foundations Card (COMPLETE COMPREHENSIVE DATA) */}
              <div className="space-y-2 p-3.5 bg-slate-900 print:bg-slate-50 rounded-lg border border-slate-800 print:border-slate-300">
                <span className="font-bold text-white print:text-black block mb-1">العمود الداخلي والأوتاد الصخرية العميقة (Central Mast & Foundations):</span>
                <div className="space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60 print:border-slate-200">
                    <span>قطر العمود الفولاذي المركزي:</span>
                    <span className="font-bold text-emerald-400 print:text-black">450 ملم (أنبوبي مفرغ مجوف)</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60 print:border-slate-200">
                    <span>سماكة جدار العمود والسبائك:</span>
                    <span className="font-bold text-emerald-400 print:text-black">28 ملم سبائك تيتانيوم Ti-6Al-4V وفولاذ S355</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60 print:border-slate-200">
                    <span>عمق أوتاد التثبيت الصخرية (Micro-Piles):</span>
                    <span className="font-bold text-emerald-400 print:text-black">18,000 ملم (18.0 متراً) داخل الصخور</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800/60 print:border-slate-200">
                    <span>قطر الأوتاد ورتبة الخرسانة:</span>
                    <span className="font-bold text-emerald-400 print:text-black">600 ملم خرسانة C40 مقاومة للكبريتات والأملاح</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>مسار تصريف الارتداد والاهتزاز:</span>
                    <span className="font-bold text-emerald-400 print:text-black">تشتيت 88% من عزم 320 kN مباشرة للطبقة الصخرية</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Weight, Loads & Mass Distribution */}
        {(activePrintView === "all" || activePrintView === "weights") && (
          <div className="space-y-3">
            <h2 className="text-base font-bold font-display text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
              <Compass className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
              <span>2. الأوزان والثقل وتوزيع الأحمال الإنشائية (Mass Budget & Center of Gravity)</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 print:border-slate-300 bg-slate-900 print:bg-slate-100 text-slate-300 print:text-black font-semibold">
                    <th className="py-2 px-3">العنصر الإنشائي والمعدات</th>
                    <th className="py-2 px-3">الوزن بالطن (Metric Ton)</th>
                    <th className="py-2 px-3">موضع التركيب</th>
                    <th className="py-2 px-3">تأثير عزم القصور الذاتي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 print:divide-slate-200 text-slate-300 print:text-black font-mono text-[11px]">
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-white print:text-black">رادار 4D AESA مصفف وقبة الحماية + EO/IR Mast</td>
                    <td className="py-2 px-3 text-emerald-400 print:text-black font-bold">4.50 طن</td>
                    <td className="py-2 px-3 font-sans">قمة البرج 1 (ارتفاع 110م)</td>
                    <td className="py-2 px-3 font-sans">تخميد جيروسكوبي متوازن</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-white print:text-black">الرشاش المدفعي ثنائي السبطانات 35 ملم + 1,200 طلقة</td>
                    <td className="py-2 px-3 text-emerald-400 print:text-black font-bold">8.10 طن</td>
                    <td className="py-2 px-3 font-sans">قمة البرج 2 على منصة هيدروليكية</td>
                    <td className="py-2 px-3 font-sans">تشتيت 88% عبر الأسطوانات</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-white print:text-black">
                      البرج 3: {tower3Name}
                    </td>
                    <td className="py-2 px-3 text-emerald-400 print:text-black font-bold">
                      {tower3Weight.toFixed(2)} طن
                    </td>
                    <td className="py-2 px-3 font-sans">قمة البرج 3 على المنصة المعيارية</td>
                    <td className="py-2 px-3 font-sans">مركز ثقل متماثل</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-white print:text-black">المنصات الفولاذية، العوازل، والمخمدات الهيدروليكية</td>
                    <td className="py-2 px-3 text-emerald-400 print:text-black font-bold">14.80 طن</td>
                    <td className="py-2 px-3 font-sans">موزعة بين القمة والأساسات</td>
                    <td className="py-2 px-3 font-sans">تخفيض مركز الثقل بنسبة 35%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-sans font-medium text-white print:text-black">العمود المركزي (450 ملم) وشفاه التثبيت التيتانيوم</td>
                    <td className="py-2 px-3 text-emerald-400 print:text-black font-bold">6.20 طن</td>
                    <td className="py-2 px-3 font-sans">القلب المركزي من -18م إلى +110م</td>
                    <td className="py-2 px-3 font-sans">نقل مباشر لعزم الإطلاق إلى الصخور</td>
                  </tr>
                  <tr className="bg-slate-900/80 print:bg-slate-100 font-bold">
                    <td className="py-2.5 px-3 font-sans text-white print:text-black">إجمالي الوزن الساكن الكلي (Total Dead Load)</td>
                    <td className="py-2.5 px-3 text-emerald-400 print:text-emerald-700 text-xs">
                      {totalDeadLoad} طن
                    </td>
                    <td className="py-2.5 px-3 font-sans" colSpan={2}>ضمن حدود الأمان الإنشائي (معامل أمان 2.45 مطابق لـ SBC 301)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section 3: Heavy Machinery, Tools & Construction Equipment */}
        {(activePrintView === "all" || activePrintView === "machinery") && (
          <div className="space-y-3">
            <h2 className="text-base font-bold font-display text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
              <Wrench className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
              <span>3. الأدوات والمعدات والآلات المطلوبة لعملية البناء والتركيب</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 print:bg-slate-50 rounded-lg border border-slate-800 print:border-slate-300 space-y-1">
                <strong className="text-white print:text-black block">1. رافعات هيدروليكية مجنزرة 160 طن:</strong>
                <p className="text-slate-400 print:text-slate-700 text-[11px] leading-relaxed">
                  رافعات تضاريس وعرة (All-Terrain) بذراع تلسكوبي بطول 135 متراً مع أنظمة تحكم دقيقة لرفع المنصات العلوية وتثبيتها دون ملامسة كابلات الكهرباء.
                </p>
              </div>

              <div className="p-3 bg-slate-900 print:bg-slate-50 rounded-lg border border-slate-800 print:border-slate-300 space-y-1">
                <strong className="text-white print:text-black block">2. حفارات أوتاد صخرية هيدروليكية:</strong>
                <p className="text-slate-400 print:text-slate-700 text-[11px] leading-relaxed">
                  حفارات دوارة قادرة على حفر ثقوب بعمق 18 متراً وقطر 600 ملم في الصخور النارية الغرانيتية لحقن الخرسانة المسلحة C40 المقاومة للأملاح.
                </p>
              </div>

              <div className="p-3 bg-slate-900 print:bg-slate-50 rounded-lg border border-slate-800 print:border-slate-300 space-y-1">
                <strong className="text-white print:text-black block">3. أجهزة معايرة ليزرية ثلاثية الأبعاد:</strong>
                <p className="text-slate-400 print:text-slate-700 text-[11px] leading-relaxed">
                  محطات رصد مساحي Total Station بصرية ليزرية لضبط أفقية المنصة العسكرية والقواعد الممتصة للصدمات بدقة كسر المليمتر (±0.05 ملم).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Lightning Protection, EMP Hardening & Grid Isolation */}
        {(activePrintView === "all" || activePrintView === "electrical") && (
          <div className="space-y-3">
            <h2 className="text-base font-bold font-display text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
              <Zap className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
              <span>4. ارتداد الصواعق والعزل الكهربائي والتأريض العميق 380kV</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-900 print:bg-slate-50 rounded-lg border border-slate-800 print:border-slate-300 space-y-1.5">
                <strong className="text-white print:text-black block">مواصفات تشتيت تيار الصواعق (Lightning Dissipation):</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300 print:text-slate-800 text-[11px] pr-2">
                  <li>سعة تحمل تيار صاعقة مباشر: حتى <strong>250 كيلو أمبير (250 kA)</strong> بموجة 10/350 µs.</li>
                  <li>رؤوس تفريغ شحنات أيونية مبكرة (CTS / ESE) تمنع تراكم الجهد الصاعق بنسبة 90%.</li>
                  <li>مسارات تفريغ نحاسية مجدولة بمقطع <strong>95 ملم²</strong> معزولة ببوليمير فائق مقاوم لـ 500kV.</li>
                  <li>مقاومة شبكة التأريض الشعاعية: <strong>أقل من 0.8 أوم</strong> مدعومة بآبار كيميائية إلكتروليتية.</li>
                </ul>
              </div>

              <div className="p-3.5 bg-slate-900 print:bg-slate-50 rounded-lg border border-slate-800 print:border-slate-300 space-y-1.5">
                <strong className="text-white print:text-black block">العزل الكهرومغناطيسي وحجب النبضة (EMP Shielding):</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-300 print:text-slate-800 text-[11px] pr-2">
                  <li>قفص فاراداي مزدوج بحماية <strong>MIL-STD-188-125</strong> لعزل حواسب إطلاق النار والرادار.</li>
                  <li>تغليف حواسب التوجيه بصفائح <strong>Mu-Metal</strong> نفاذة تحجب الحقول الحثية لخطوط 380,000V.</li>
                  <li>كابلات ربط بيانات من الألياف الزجاجية العازلة تماماً (Dielectric Fiber-Optic 100 Gbps).</li>
                  <li>مرشحات ترشيح فائقة (EMI Filters) تمنع أي ارتداد تيار عبر المولدات الكهربائية.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Firing Recoil Stabilization & Severe Wind Currents */}
        {(activePrintView === "all" || activePrintView === "specs") && (
          <div className="space-y-3">
            <h2 className="text-base font-bold font-display text-white print:text-black flex items-center gap-2 border-b border-slate-800 print:border-slate-300 pb-2">
              <Wind className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
              <span>5. الثبات الإنشائي عند الإطلاق ومقاومة الرياح والتيارات العاتية</span>
            </h2>

            <div className="p-4 bg-slate-900 print:bg-slate-50 rounded-lg border border-slate-800 print:border-slate-300 text-xs space-y-2">
              <p className="leading-relaxed">
                عند إطلاق الرشاش الثنائي 35 ملم بكثافة 1,600 طلقة/دقيقة، تتولد قوة دفع ارتدادية لحظية تبلغ <strong className="text-amber-400 print:text-black">320 كيلو نيوتن (kN)</strong>.
                تقوم الأسطوانات الهيدروليكية النيتروجينية بامتصاص <strong className="text-emerald-400 print:text-black">88%</strong> من هذا الدفع وتخفيضه إلى 38.4 kN فقط،
                ثم تصريفه عبر العمود الفولاذي الداخلي مباشرة إلى الأوتاد الخرسانية بالأرض دون أن تتأثر عوارض الأسلاك الكهربائية بأي اهتزاز دوري.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center font-mono text-[11px]">
                <div className="p-2 bg-slate-950 print:bg-white rounded border border-slate-800 print:border-slate-200">
                  <span className="text-slate-400 print:text-slate-600 block text-[10px]">مقاومة الرياح القصوى:</span>
                  <span className="font-bold text-white print:text-black">180 كم/س</span>
                </div>
                <div className="p-2 bg-slate-950 print:bg-white rounded border border-slate-800 print:border-slate-200">
                  <span className="text-slate-400 print:text-slate-600 block text-[10px]">عزم الانحناء الإنشائي:</span>
                  <span className="font-bold text-white print:text-black">410 kN.m</span>
                </div>
                <div className="p-2 bg-slate-950 print:bg-white rounded border border-slate-800 print:border-slate-200">
                  <span className="text-slate-400 print:text-slate-600 block text-[10px]">أقصى تأرجح مسموح:</span>
                  <span className="font-bold text-emerald-400 print:text-black">11 ملم فقط</span>
                </div>
                <div className="p-2 bg-slate-950 print:bg-white rounded border border-slate-800 print:border-slate-200">
                  <span className="text-slate-400 print:text-slate-600 block text-[10px]">معامل الأمان الكلي:</span>
                  <span className="font-bold text-emerald-400 print:text-black">2.45 (ممتاز)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document Footer Endorsement */}
        <div className="border-t border-slate-800 print:border-slate-400 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 print:text-slate-600 gap-2">
          <span>المخطط مطابق لمعايير الهيئة العليا للأمن الصناعي (HCIS) والكود السعودي (SBC 301)</span>
          <span className="font-bold text-emerald-400 print:text-black">
            مقدم المبادرة: فهد خالد الغامدي - الهيئة الملكية - المدينة الاقتصادية
          </span>
        </div>
      </div>

      {/* Advanced Print Options & Settings Modal */}
      <PrintOptionsModal
        isOpen={showOptionsModal}
        onClose={() => setShowOptionsModal(false)}
        towerThreeChoice={towerThreeChoice}
      />
    </div>
  );
}
