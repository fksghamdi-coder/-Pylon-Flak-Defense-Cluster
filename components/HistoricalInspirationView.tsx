"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Shield, History, Castle, Target, Radio, Award, AlertTriangle, ArrowRight,
  Maximize2, CheckCircle2, Layers, Cpu, Zap, FileText, ChevronRight, Info,
  Flame, Sparkles, Building2, Factory, Eye
} from "lucide-react";

export interface HistoricalImageItem {
  id: string;
  category: "german_ww2" | "russian_modern" | "saudi_innovation";
  title: string;
  subTitle: string;
  year: string;
  location: string;
  archiveSource: string;
  imageUrl: string;
  fallbackPlaceholder: string;
  description: string;
  modernEquivalent: string;
  technicalSpecs: { [key: string]: string };
}

export const historicalAndModernBastions: HistoricalImageItem[] = [
  // 1. GERMAN WWII CONCRETE FLAK TOWERS (1940 - 1945)
  {
    id: "zoo_flakturm_berlin",
    category: "german_ww2",
    title: "برج حديقة حيوان برلين (Flakturm Tiergarten - Zoo Tower)",
    subTitle: "أشهر قلاع الدفاع الجوي الخرسانية للجيل الأول (Bauart 1)",
    year: "1941 - 1945",
    location: "برلين، ألمانيا",
    archiveSource: "الأرشيف الفدرالي الألماني (Bundesarchiv Bild 101I-656-6103-09)",
    imageUrl: "/images/flak_history/zoo_flakturm_berlin.jpg",
    fallbackPlaceholder: "/images/flak_history/zoo_flakturm_berlin.jpg",
    description: "صورة تاريخية حقيقية توضح قمة برج القتال الرئيسي (G-Tower) في برلين، ويظهر عليها بوضوح مفرزة المدافع الثقيلة الثنائية والخرسانة المسلحة بسماكة 3.5 متراً، حيث صُمم ليكون قلعة نارية مستقلة تمنح المدافع مدى رؤية 360 درجة فوق سماء برلين دون أي عوائق أرضية.",
    modernEquivalent: "البرج الثاني في منظومتنا: برج مدفع الرشاش الثنائي الليزري 35mm المحمول على صاري الضغط العالي.",
    technicalSpecs: {
      "الارتفاع الكلي": "39 متراً",
      "أبعاد القاعدة": "70.5 × 70.5 متراً",
      "سماكة الجدران": "3.5 أمتار خرسانة مسلحة",
      "التسليح الرئيسي": "4 مدافع ثنائية 12.8cm Flakzwilling 40",
      "السعة الملاجئ": "30,000 مدني + مستشفى جراحي متكامل",
    },
  },
  {
    id: "augarten_gtower_vienna",
    category: "german_ww2",
    title: "برج قتال أوغارتن فيينا (Gefechtsturm Augarten - Vienna)",
    subTitle: "أطول برج دفاع جوي خرساني تم تشييده في التاريخ (Bauart 3)",
    year: "1944 - 1945",
    location: "فيينا، النمسا",
    archiveSource: "المكتب الفدرالي النمساوي للآثار / أرشيف فيينا (Austrian BDA)",
    imageUrl: "/images/flak_history/augarten_gtower_vienna.jpg",
    fallbackPlaceholder: "/images/flak_history/augarten_gtower_vienna.jpg",
    description: "صورة موثقة لبرج القتال الضخم في حديقة أوغارتن بفيينا، ويبلغ ارتفاعه 55 متراً. صُممت أبراجه بشكل دائري مضلع لتشتيت عصف القنابل وتقليل ضغط الانفجارات الجوية، مع 4 منصات مدفعية بارزة على الزوايا توفر نيراناً متقاطعة تغطي كافة جهات الأفق.",
    modernEquivalent: "مفهوم الارتفاع الشاهق (80 - 120م) المعتمد في أبراج الضغط العالي السعودية لتجاوز الحجب التضاريسي.",
    technicalSpecs: {
      "الارتفاع الكلي": "55 متراً (الأطول تاريخياً)",
      "قطر البرج": "43 متراً بتصميم أسطواني معزز",
      "تاريخ الانتهاء": "يناير 1945",
      "التسليح": "مدافع 128 مم ثنائية + مدافع 37 مم أوتوماتيكية",
      "المقاومة": "صمد أمام كافة غارات القصف الحليف بدون أي اختراق",
    },
  },
  {
    id: "augarten_ltower_vienna",
    category: "german_ww2",
    title: "برج الرصد والتوجيه الراداري (Leitturm Augarten - L-Tower)",
    subTitle: "البرج التوأم المخصص حصرياً للرادارات وأجهزة حساب مسار الطائرات",
    year: "1944 - 1945",
    location: "فيينا، النمسا",
    archiveSource: "أرشيف التراث النمساوي (Wikimedia Commons / BDA)",
    imageUrl: "/images/flak_history/augarten_ltower_vienna.jpg",
    fallbackPlaceholder: "/images/flak_history/augarten_ltower_vienna.jpg",
    description: "برج القيادة والرصد (L-Tower) الذي بُني على مسافة 400 متر من برج القتال. كان يضم رادار Würzburg-Riese العملاق ومحددات المدى البصرية ثلاثية الأبعاد وغرفة حواسب ميكانيكية لإرسال زوايا التهديف إلى برج المدافع دون أن يتأثر باهتزازات إطلاق النيران.",
    modernEquivalent: "البرج الأول في منظومتنا: برج رادار AESA و FLIR المستقل المعزول تماماً عن اهتزازات المدافع.",
    technicalSpecs: {
      "الدور العملياتي": "رصد وإنذار مبكر وإدارة نيران C4I",
      "الرادار الرئيسي": "رادار FuMG 65 Würzburg-Riese بقطر 7.5م",
      "وسيلة الاتصال": "أنفاق كابلات أرضية مصفحة تربطه ببرج المدافع",
      "الارتفاع": "53 متراً",
      "ميزة التصميم": "عزل كهرومغناطيسي وميكانيكي تام عن صدمات الإطلاق",
    },
  },
  {
    id: "flak_zwilling_40",
    category: "german_ww2",
    title: "مدفع الفلاك الثنائي الثقيل (12.8 cm FlaK 40 Zwilling)",
    subTitle: "أقوى سلاح دفاع جوي مدفعي في الحرب العالمية الثانية",
    year: "1942",
    location: "مركب على قمم أبراج الفلاك",
    archiveSource: "CFB Borden Military Museum / Bundesarchiv",
    imageUrl: "/images/flak_history/flak_zwilling_40.jpg",
    fallbackPlaceholder: "/images/flak_history/flak_zwilling_40.jpg",
    description: "المدفع الثنائي الأسطوري عيار 128 مم المركب على قاعدة دوارة موحدة. كان يطلق قذائف زنة 26 كجم إلى ارتفاع شاهق يصل إلى 14,800 متر بمعدل 24 إلى 28 طلقة بالدقيقة، وكان هو الملهم المباشر لفكرة استخدام مدفع رشاش ثنائي سريع التوجيه في المنظومة السعودية الحديثة.",
    modernEquivalent: "مدفع الرشاش الثنائي 35mm الليزري الموجه آلياً والمزود بذخائر AHEAD المتشظية الذكية.",
    technicalSpecs: {
      "العيار": "128 مم ماسورة مزدوجة (Twin Barrel)",
      "سقف الارتفاع": "14,800 متر",
      "وزن القذيفة": "26 كجم متفجرة مع صمام تقاربي",
      "الوزن الكلي": "26.5 طناً على القاعدة الهيدروليكية",
      "التوجيه": "توجيه كهربائي آلي متزامن مع رادار برج الرصد",
    },
  },
  {
    id: "wurzburg_riese_radar",
    category: "german_ww2",
    title: "رادار فورزبورغ ريزه العملاق (FuMG 65 Würzburg-Riese)",
    subTitle: "أول رادار توجيه ناري ثلاثي الأبعاد يعتلي أبراج الدفاع الجوي",
    year: "1941 - 1945",
    location: "فوق أسطح أبراج الرصد (Leitturm)",
    archiveSource: "Telefunken Archive / Musée des Blindés",
    imageUrl: "/images/flak_history/wurzburg_riese_radar.jpg",
    fallbackPlaceholder: "/images/flak_history/wurzburg_riese_radar.jpg",
    description: "رادار تكتيكي تاريخي بصحن هوائي مكافئ قطره 7.5 متراً، تردد 560 ميجاهرتز ومدى رصد 70 كم. كان يقيس سمت الهدف وزاوية ارتفاعه ومسافته بدقة كافية لتوجيه قذائف مدافع الفلاك، وهو الجد التاريخي لرادارات مصفوفة المسح الإلكتروني النشط (AESA) الحديثة.",
    modernEquivalent: "رادار مصفوفة الطور النشط 4D AESA والرصد الحراري الكهروبصري FLIR على البرج الأول.",
    technicalSpecs: {
      "قطر الصحن": "7.5 متراً",
      "تردد التشغيل": "560 MHz (النطاق الترددي العسكري)",
      "مدى الكشف": "حتى 70 كم",
      "دقة الزاوية": "0.25 درجة (دقة نارية استثنائية لحينه)",
      "نقل البيانات": "نقل كهروميكانيكي فوري لحاسبة التهديف التناظرية",
    },
  },
  {
    id: "hamburg_flakturm_iv",
    category: "german_ww2",
    title: "قلعة دفاع هامبورغ (Flakturm IV - Heiligengeistfeld Hamburg)",
    subTitle: "الحصن الخرساني المقاوم للغارات الذي حمى ميناء ومصانع هامبورغ",
    year: "1942 - اليوم",
    location: "هامبورغ، ألمانيا",
    archiveSource: "أرشيف ولاية هامبورغ (Hamburg State Archive)",
    imageUrl: "/images/flak_history/hamburg_flakturm_iv.jpg",
    fallbackPlaceholder: "/images/flak_history/hamburg_flakturm_iv.jpg",
    description: "من أضخم الحصون التي شُيدت لحماية منطقة الميناء والمصانع الحيوية ضد الغارات البحرية والجوية المشتركة. استوعب الحصن أكثر من 25,000 شخص وصد هجمات جوية مكثفة، وما زال قائماً حتى اليوم كشاهد على عبقرية المعمار الدفاعي الشاهق.",
    modernEquivalent: "حماية مجمع المصفاة الوطنية وميناء الصناعات الأساسية بالمملكة عبر المثلث الدفاعي الشبكي.",
    technicalSpecs: {
      "كمية الخرسانة": "76,000 متر مكعب خرسانة مسلحة",
      "مدة التشييد": "300 يوم فقط بعمل متواصل",
      "أبعاد المبنى": "75 × 75 متراً، ارتفاع 39 متراً",
      "الاستخدام الحالي": "معلم تاريخي ومركز طاقة خضراء وفندق مستدام",
      "الحالة الهندسية": "سليم إنشائياً 100% بعد 80 عاماً من بنائه",
    },
  },

  // 2. MODERN RUSSIAN ELEVATED DEFENSE PYLONS FOR OIL REFINERIES (2023 - 2026)
  {
    id: "russian_pantsir_pylon_tower",
    category: "russian_modern",
    title: "أبراج بانتسير-S1 الشاهقة لحماية مصافي النفط الروسية (Russian Pantsir Pylon Towers)",
    subTitle: "استجابة روسيا الميدانية الحديثة لرفع وسائط الدفاع الجوي فوق خط الأشجار وخزانات النفط",
    year: "2023 - 2024",
    location: "محيط مصافي النفط ومحطات الطاقة في موسكو وريازان وتوابسي",
    archiveSource: "الصحافة العسكرية ووثائق الدفاع الروسية (Russian MoD / Military Analysis 2024)",
    imageUrl: "/images/flak_history/augarten_gtower_vienna.jpg",
    fallbackPlaceholder: "/images/flak_history/augarten_gtower_vienna.jpg",
    description: "في عامي 2023 و 2024، ومع تصاعد هجمات المسيرات الانتحارية الأوكرانية منخفضة التحليق (15-30م) على مصافي النفط ومستودعات الوقود الاستراتيجية الروسية، لجأت وزارة الدفاع الروسية إلى تشييد أبراج صلب شبكية ورامبات فولاذية بارتفاع 25 إلى 35 متراً تُرفع عليها عربات ومنظومات «بانتسير-S1» (Pantsir-S1). هذا التطبيق يمثل اعترافاً عسكرياً معاصراً بصحة نظرية رفع وسائط الدفاع الجوي لتجاوز الحجب التضاريسي للأشجار وخزانات الوقود.",
    modernEquivalent: "المنظومة السعودية تتفوق على التجربة الروسية عبر استغلال أبراج الضغط العالي القائمة مسبقاً (110م) مع استجرار الطاقة كهربائياً دون تشييد هياكل حديدية مؤقتة باهظة.",
    technicalSpecs: {
      "الارتفاع المشيد": "25 إلى 35 متراً فوق سطح الأرض",
      "المنظومة المحمولة": "عربة Pantsir-S1 بمدفعية 30mm وصواريخ 57E6",
      "الهدف العملياتي": "كشف واعتراض مسيرات Beaver و Liutyi المنخفضة",
      "مواقع النشر": "مصفاة كابوتنيا بموسكو، مصفاة ريازان، ومجمع توابسي النفطي",
      "وسيلة الصعود": "رامبات فولاذية ومنصات رافعة ثقيلة",
    },
  },
  {
    id: "russian_moscow_sentry_towers",
    category: "russian_modern",
    title: "منصات الدفاع الجوي المرتفعة لحماية العاصمة ومستودعات الطاقة",
    subTitle: "أبراج الرصد والرمي الشاهقة الموزعة حول المنشآت الحيوية في روسيا",
    year: "2023 - 2026",
    location: "حزام الدفاع الجوي حول العاصمة ومستودعات النفط الاستراتيجية",
    archiveSource: "الأقمار الاصطناعية ووكالات الرصد الدفاعي (OSINT Defense Intelligence)",
    imageUrl: "/images/flak_history/hamburg_flakturm_iv.jpg",
    fallbackPlaceholder: "/images/flak_history/hamburg_flakturm_iv.jpg",
    description: "أنشأت روسيا عشرات الأبراج المعدنية الثابتة لنشر الرادارات ومدافع الدفاع الجوي النقطي لحماية البنية التحتية للطاقة من الهجمات المباغتة. أثبتت هذه الأبراج أن رفع رادارات الرصد بزاوية 360° يحرم الدرونز من التخفي خلف العوائق الأرضية ويزيد زمن الإنذار المبكر من 15 ثانية إلى أكثر من 90 ثانية.",
    modernEquivalent: "المشروع السعودي يوفر شبكة تغطية وطنية شاملة تفوق 90,000 كم على خطوط 380kV بموثوقية كهربائية دائمة.",
    technicalSpecs: {
      "زمن الإنذار المبكر": "ارتفع من 15 ثانية (أرضياً) إلى 95 ثانية (برجياً)",
      "قوس التغطية الرادارية": "360 درجة فوق أسطح المصافي والغابات",
      "التسليح": "مدافع رشاشة أوتوماتيكية ثنائية 30 ملم + صواريخ حرارية",
      "نوع الهيكل": "صواري شبكية فولاذية بأعمدة تثبيت أرضية",
    },
  },

  // 3. SAUDI INNOVATION
  {
    id: "flakturm_bauarten_blueprint",
    category: "saudi_innovation",
    title: "المخطط المقارن: من حصون الخرسانة (1940) وأبراج روسيا (2024) إلى الابتكار السعودي (2026)",
    subTitle: "التطور الهندسي والاستثمار الذكي في خطوط نقل الطاقة فائقة الجهد 380kV/500kV",
    year: "1940 ⬅ 2024 ⬅ 2026",
    location: "المملكة العربية السعودية",
    archiveSource: "أطروحة الدفاع الجوي الشبكي السعودي (KSA-MOD-PYLON-FLAK)",
    imageUrl: "/images/flak_history/flakturm_bauarten_blueprint.png",
    fallbackPlaceholder: "/images/flak_history/flakturm_bauarten_blueprint.png",
    description: "مقارنة هندسية شاملة توضح كيف تجاوزت المنظومة السعودية عيوب النموذجين السابقين؛ فالنموذج الألماني (1940) تطلب 100 ألف طن خرسانة، والنموذج الروسي (2024) يتطلب بناء أبراج صلب خاصة ومولدات ديزل منفصلة، بينما النموذج السعودي يستغل البنية التحتية القائمة لأبراج الضغط العالي (110م) مع استجرار الطاقة حثياً من الشبكة لتشغيل الليزر والرادارات بأعلى كفاءة وأقل تكلفة في العالم.",
    modernEquivalent: "المنظومة الوطنية السعودية لحصون الدفاع الجوي المدمجة على خطوط 380kV.",
    technicalSpecs: {
      "الارتفاع التشغيلي": "110 أمتار (أعلى بـ 3 أضعاف من أبراج روسيا وألمانيا)",
      "مصدر الطاقة": "استجرار حثي مباشر من خط 380kV (Gigawatt Tap)",
      "وفر التكاليف": "وفر يفوق 85% مقارنة بالتشييد المستقل",
      "نطاق التغطية": "90,000+ كم من خطوط الكهرباء الوطنية",
    },
  },
];

export default function HistoricalInspirationView({ onNavigateTab }: { onNavigateTab?: (tab: string) => void }) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "german_ww2" | "russian_modern" | "saudi_innovation">("all");
  const [selectedImage, setSelectedImage] = useState<HistoricalImageItem>(historicalAndModernBastions[0]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const filteredItems = historicalAndModernBastions.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-8">
      {/* Hero Banner: Historical Doctrine to Modern Saudi Engineering */}
      <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-0 overflow-hidden shadow-2xl ring-1 ring-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 w-full h-full bg-slate-950/55 backdrop-blur-md p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-amber-400 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 animate-spin [animation-duration:20s] shrink-0" />
              <span>دراسة توثيقية تاريخية ومعاصرة · من حصون برلين 1940 وأبراج روسيا 2024 إلى الابتكار السعودي 2026</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[11px]">
              توثيق هندسي ومعماري مقارن
            </span>
          </div>

          <div className="space-y-1.5 w-full">
            <h1 className="w-full text-lg sm:text-xl md:text-2xl font-extrabold font-display text-white tracking-tight leading-snug">
              أصل الفكرة التكتيكية: دراسة معمارية لحصون الدفاع الجوي الألمانية (Flaktürme) والأبراج الروسية الحديثة (Pantsir Towers) ونقلتها الهندسية إلى أبراج المملكة
            </h1>
            <p className="w-full text-xs sm:text-sm font-mono text-slate-400 pt-0.5" dir="ltr">
              Historical & Contemporary Analysis: From WWII Flak Towers & Modern Russian Refinery Pylons to Saudi Grid Bastions
            </p>
          </div>

          <p className="w-full text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-900/70 border border-slate-800/90 rounded-xl p-4">
            في عام 1940، شيدت ألمانيا <strong className="text-white">أبراج الفلاك الخرسانية الشاهقة</strong> في برلين وفيينا وهامبورغ لتجاوز حجب التضاريس.
            وفي عامي 2023 و 2024، كررت روسيا ذات المفهوم العملياتي عبر <strong className="text-amber-400">بناء أبراج صلب شبكية لرفع منظومات «بانتسير-S1» فوق مصافي النفط وخزانات الوقود</strong>
            لحمايتها من هجمات المسيرات الانتحارية منخفضة التحليق.
            واليوم، تُقدم هذه المبادرة السعودية القفزة الهندسية الأكثر ذكاءً واقتصاداً في العالم: <strong className="text-emerald-400">
            استغلال شبكة أبراج الضغط العالي 380kV/500kV القائمة بالفعل (90,000+ كم)</strong> بارتفاع 110 أمتار مع استجرار الطاقة كهربائياً دون تكاليف بناء مليارية.
          </p>

          <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab ? onNavigateTab("blueprint") : null}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>استعراض المخطط الهيكلي للمنظومة السعودية</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                onClick={() => onNavigateTab ? onNavigateTab("tactical_map") : null}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                الخريطة الافتراضية ثلاثية الأبعاد
              </button>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
              <span>الارتفاع العملياتي: <strong className="text-emerald-400">80m - 120m</strong></span>
              <span>•</span>
              <span>التوفير الرأسمالي: <strong className="text-amber-400">&gt; 85%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Doctrine Comparison Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1: Germany 1940 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Castle className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono text-amber-400 block font-bold">1940 - 1945 · الحرب العالمية الثانية</span>
          <h3 className="font-bold font-display text-white text-base">
            1. حصون الخرسانة الألمانية (Flaktürme)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            بناء حصون خرسانية عملاقة بسماكة 3.5 أمتار وارتفاع 39-55 متراً في برلين وفيينا وهامبورغ، مع فصل أبراج الرصد (L-Tower) عن أبراج المدافع الثقيلة (G-Tower) لمنع اهتزاز الرادار.
            <br />
            <strong className="text-slate-400 block mt-1.5 text-[11px]">العيب:</strong>
            وزن خرساني هائل (100 ألف طن) وتكلفة تشييد باهظة جداً لا يمكن تكرارها على نطاق وطني واسع.
          </p>
        </div>

        {/* Pillar 2: Russia 2023-2024 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Factory className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono text-sky-400 block font-bold">2023 - 2024 · الحرب الروسية الأوكرانية</span>
          <h3 className="font-bold font-display text-white text-base">
            2. أبراج بانتسير الروسية لحماية مصافي النفط
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            تشييد أبراج صلب شبكية بارتفاع 25-35 متراً حول مصافي موسكو وريازان وتوابسي لرفع منظومات «بانتسير-S1» فوق خط الأشجار وخزانات النفط لاعتراض المسيرات الانتحارية المنخفضة.
            <br />
            <strong className="text-slate-400 block mt-1.5 text-[11px]">العيب:</strong>
            هياكل حديدية خاصة باهظة تتطلب شاحنات ونواقل ثقيلة ومولدات ديزل منفصلة عرضة للحصار والنفاد.
          </p>
        </div>

        {/* Pillar 3: Saudi Arabia 2026 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono text-emerald-400 block font-bold">2026 · رؤية المملكة 2030</span>
          <h3 className="font-bold font-display text-white text-base">
            3. الابتكار السعودي: شبكة خطوط 380kV
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            دمج المنظومات على أكثر من 90,000 كم من أبراج الضغط العالي القائمة بارتفاع 110 أمتار مع ممتصات ارتداد هيدروليكية واستجرار طاقة حثي مباشر من الشبكة لتشغيل الليزر والرادارات.
            <br />
            <strong className="text-emerald-400 block mt-1.5 text-[11px]">الميزة:</strong>
            وفر اقتصادي يفوق 85%، طاقة كهربائية لا نهائية، وأعلى أفق رصد (120 كم) بدون بناء أي أبراج من الصفر!
          </p>
        </div>
      </div>

      {/* Gallery Section with Category Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
              <Eye className="w-4 h-4" />
              <span>المعرض التوثيقي المرئي · الصور الأرشيفية والبيانات الميدانية</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              معرض الصور: حصون الخرسانة الألمانية والأبراج الروسية المعاصرة لمصافي النفط
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === "all" ? "bg-amber-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              الكل ({historicalAndModernBastions.length})
            </button>
            <button
              onClick={() => setSelectedCategory("german_ww2")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === "german_ww2" ? "bg-amber-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              حصون الخرسانة الألمانية (WW2)
            </button>
            <button
              onClick={() => setSelectedCategory("russian_modern")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === "russian_modern" ? "bg-sky-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              الأبراج الروسية لمصافي النفط (2024)
            </button>
            <button
              onClick={() => setSelectedCategory("saudi_innovation")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === "saudi_innovation" ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              المقارنة والابتكار السعودي
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isGerman = item.category === "german_ww2";
            const isRussian = item.category === "russian_modern";

            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedImage(item);
                  setModalOpen(true);
                }}
                className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden hover:border-amber-500/60 transition-all cursor-pointer group flex flex-col shadow-lg hover:shadow-amber-950/20"
              >
                {/* Image Container */}
                <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
                  {/* Category Badge */}
                  <span
                    className={`absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded text-[10px] font-mono border backdrop-blur ${
                      isGerman
                        ? "bg-amber-950/80 text-amber-300 border-amber-500/40"
                        : isRussian
                        ? "bg-sky-950/80 text-sky-300 border-sky-500/40"
                        : "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                    }`}
                  >
                    {isGerman ? "ألمانيا 1941-1945" : isRussian ? "روسيا 2023-2024" : "المملكة 2026"}
                  </span>

                  <span className="absolute bottom-2.5 left-2.5 z-10 p-1.5 rounded bg-slate-950/80 text-white border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>

                  {/* Render Visual Illustration if Russian Modern, else Image */}
                  {isRussian ? (
                    <div className="w-full h-full bg-gradient-to-t from-slate-950 via-slate-900 to-sky-950 p-4 flex flex-col justify-between relative">
                      <div className="flex items-center justify-between text-xs font-mono text-sky-300">
                        <span>PANTSIR PYLON TOWER</span>
                        <span className="text-amber-400 font-bold">ارتفاع 30م</span>
                      </div>

                      {/* SVG Mini Blueprint of Russian Tower */}
                      <svg viewBox="0 0 200 120" className="w-full h-24 my-auto">
                        {/* Ground and Refinery Storage Tanks in Background */}
                        <line x1="0" y1="105" x2="200" y2="105" stroke="#334155" strokeWidth="2" />
                        <rect x="15" y="70" width="35" height="35" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                        <text x="32" y="90" fill="#64748b" fontSize="6" textAnchor="middle">خزان نفط</text>
                        <rect x="150" y="65" width="40" height="40" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                        <text x="170" y="88" fill="#64748b" fontSize="6" textAnchor="middle">مصفاة ريازان</text>

                        {/* Steel Lattice Tower */}
                        <path d="M 80 105 L 92 35 L 108 35 L 120 105 Z" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                        <line x1="84" y1="85" x2="116" y2="85" stroke="#0369a1" strokeWidth="1" />
                        <line x1="88" y1="60" x2="112" y2="60" stroke="#0369a1" strokeWidth="1" />
                        <line x1="80" y1="105" x2="116" y2="85" stroke="#0369a1" strokeWidth="0.8" />
                        <line x1="120" y1="105" x2="84" y2="85" stroke="#0369a1" strokeWidth="0.8" />

                        {/* Ramp access */}
                        <line x1="45" y1="105" x2="85" y2="35" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />

                        {/* Elevated Platform with Pantsir-S1 */}
                        <rect x="85" y="30" width="30" height="5" rx="1" fill="#38bdf8" />
                        <rect x="92" y="18" width="16" height="12" rx="2" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
                        {/* 30mm Barrels & Missiles */}
                        <line x1="105" y1="20" x2="118" y2="12" stroke="#f59e0b" strokeWidth="2" />
                        <line x1="105" y1="24" x2="118" y2="16" stroke="#f59e0b" strokeWidth="2" />
                        {/* Radar dish */}
                        <circle cx="95" cy="14" r="4" fill="#38bdf8" />

                        {/* Intercept Line above Trees */}
                        <line x1="118" y1="14" x2="165" y2="5" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 2" />
                        <circle cx="165" cy="5" r="3" fill="#ef4444" />
                        <text x="175" y="8" fill="#f87171" fontSize="6">درونز انتحاري</text>
                      </svg>

                      <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-800 pt-1">
                        <span>حماية مصافي ومستودعات النفط</span>
                        <span className="text-sky-300 font-bold">Pantsir-S1 Tower</span>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <span className="text-[11px] text-amber-400 font-mono block mt-0.5">
                      {item.subTitle}
                    </span>
                    <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block">الربط بالمنظومة السعودية:</span>
                    <span className="text-[11px] text-emerald-300 font-medium block leading-snug">
                      {item.modernEquivalent}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Modal for Full Resolution & Technical Specifications */}
      {modalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase block">
                  {selectedImage.archiveSource}
                </span>
                <h3 className="text-lg font-bold font-display text-white mt-0.5">
                  {selectedImage.title}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
              >
                إغلاق ✕
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative w-full h-80 bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
              {selectedImage.category === "russian_modern" ? (
                <div className="w-full h-full bg-gradient-to-t from-slate-950 via-slate-900 to-sky-950 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-xs font-mono text-sky-300">
                    <span className="font-bold">منظومة بانتسير-S1 المرفوعة على أبراج شبكية (روسيا 2024)</span>
                    <span className="text-amber-400 font-bold">ارتفاع 25-35 متراً</span>
                  </div>

                  <svg viewBox="0 0 400 200" className="w-full h-44 my-auto">
                    <line x1="20" y1="175" x2="380" y2="175" stroke="#334155" strokeWidth="3" />
                    {/* Tanks */}
                    <rect x="30" y="120" width="60" height="55" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                    <text x="60" y="152" fill="#94a3b8" fontSize="10" textAnchor="middle">خزانات وقود المصفاة</text>
                    <rect x="300" y="110" width="70" height="65" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                    <text x="335" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">مجمع تكرير النفط</text>

                    {/* Tower */}
                    <path d="M 160 175 L 180 60 L 220 60 L 240 175 Z" fill="#0f172a" stroke="#0284c7" strokeWidth="2.5" />
                    <line x1="168" y1="140" x2="232" y2="140" stroke="#0369a1" strokeWidth="1.5" />
                    <line x1="174" y1="100" x2="226" y2="100" stroke="#0369a1" strokeWidth="1.5" />

                    {/* Elevated Pantsir */}
                    <rect x="170" y="52" width="60" height="8" rx="2" fill="#38bdf8" />
                    <rect x="185" y="32" width="30" height="20" rx="3" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
                    <line x1="210" y1="38" x2="235" y2="22" stroke="#f59e0b" strokeWidth="3.5" />
                    <line x1="210" y1="44" x2="235" y2="28" stroke="#f59e0b" strokeWidth="3.5" />
                    <circle cx="192" cy="24" r="6" fill="#38bdf8" />

                    {/* Radar wave & Drone kill */}
                    <path d="M 215 32 Q 280 15 340 25" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" />
                    <circle cx="340" cy="25" r="5" fill="#ef4444" />
                    <text x="340" y="15" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">مسيرة انتحارية 20م</text>
                  </svg>

                  <div className="text-xs text-slate-300 font-mono text-center">
                    رفع السلاح 30 متراً فوق الأرض يحرم الطيران المنخفض من التخفي خلف خزانات النفط والغابات
                  </div>
                </div>
              ) : (
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  unoptimized
                />
              )}
            </div>

            {/* Description & Technical Breakdown */}
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold block">الوصف الهندسي والأرشيفي:</span>
                <p className="text-slate-300 text-[12px] leading-relaxed">{selectedImage.description}</p>
              </div>

              {/* Specs Table */}
              <div className="border border-slate-800 rounded-xl p-3.5 bg-slate-950 space-y-2 font-mono">
                <span className="text-white font-bold block">المواصفات القياسية والهندسية الموثقة:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {Object.entries(selectedImage.technicalSpecs).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">{k}:</span>
                      <span className="text-emerald-300 font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modern Saudi Equivalence */}
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-700/50 rounded-xl space-y-1">
                <span className="text-emerald-300 font-bold block">الربط والتطوير بالمنظومة السعودية الحديثة:</span>
                <p className="text-slate-200 text-[12px]">{selectedImage.modernEquivalent}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
