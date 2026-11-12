"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Radar, Crosshair, Zap, Shield, Target, Disc, RefreshCw, Cpu, Layers,
  Play, Pause, Volume2, VolumeX, Sparkles, Award, CheckCircle2, ChevronRight,
  Flame, Radio, Activity, Compass, Gauge, AlertCircle, ShieldAlert
} from "lucide-react";
import { tacticalAudio } from "@/lib/audio";

interface SaudiDefenseSystem {
  id: string;
  name: string;
  origin: "local_saudi" | "imported_active" | "joint_venture";
  manufacturer: string;
  category: "radar" | "ciws" | "laser" | "missiles";
  localizationRate: string; // e.g. "70% رؤية 2030"
  caliberOrPower: string;
  effectiveRange: string;
  rateOfFire: string;
  ammoTypeOrPayload: string;
  description: string;
  advantages: string[];
}

const saudiDefenseArsenal: SaudiDefenseSystem[] = [
  // 1. Local Saudi Military Industries (SAMI / AEC / ERAF / Intra)
  {
    id: "sami_laser_50kw",
    name: "منظومة ليزر «شعاع العزم» عالي الطاقة (SAMI HEL 50kW)",
    origin: "local_saudi",
    manufacturer: "الشركة السعودية للصناعات العسكرية (SAMI) بالتعاون مع مراكز الأبحاث الوطنية",
    category: "laser",
    localizationRate: "85% (توطين وتصنيع وطني بالكامل)",
    caliberOrPower: "50 إلى 100 كيلوواط حزمة ألياف بصرية مركزة",
    effectiveRange: "4,500 متر ضد الدرونز والصواريخ التكتيكية",
    rateOfFire: "إشعاع فوري مستمر بسرعة الضوء (300,000 كم/ث)",
    ammoTypeOrPayload: "طاقة ليزرية حرارية مستمدة مباشرة من خطوط 380kV",
    description: "سلاح طاقة موجهة وطني متطور طورته كوادر سعودية لإحراق المستشعرات الكهروبصرية ورؤوس التوجيه للدرونز الانتحارية وصواريخ كروز في أقل من 1.2 ثانية بتكلفة شبه معدومة.",
    advantages: [
      "تكلفة الطلقة الواحدة أقل من 10 ريالات سعودية.",
      "مخزون ناري لا نهائي معتمد على استجرار الكهرباء الحثي من شبكة الضغط العالي.",
      "تدمير فوري صامت بدون شظايا متبقية قد تضر المنشآت الحيوية الصديقة.",
    ],
  },
  {
    id: "sami_ciws_35mm",
    name: "منظومة مدفعية «طويق 35» الثنائية الذكية (SAMI/ERAF CIWS 35mm)",
    origin: "local_saudi",
    manufacturer: "شركة سامي (SAMI) ومجموعة إيراف للأنظمة الدفاعية (ERAF)",
    category: "ciws",
    localizationRate: "70% (توطين ذخائر AHEAD والسبطانات محلياً)",
    caliberOrPower: "35 × 228 ملم ثنائي السبطانات مبرد بالسوائل",
    effectiveRange: "4,200 متر ضد الأهداف الجوية شديدة الانخفاض",
    rateOfFire: "1,600 طلقة/دقيقة (800 طلقة/دقيقة لكل سبطانة)",
    ammoTypeOrPayload: "ذخائر AHEAD الذكية مبرمجة الشظايا التنجستن (152 شظية/مقذوف)",
    description: "مدفعية دفاع جوي ثنائية مؤتمتة بالكامل، تطلق سحابة فولاذية من شظايا التنجستن ذات السرعة العالية التي تفرم أسراب الدرونز والصواريخ المقتربة بدقة جراحية.",
    advantages: [
      "مستشعر قياس سرعة الفوهة وبرمجة صمام الشظايا عند مغادرة السبطانة في أجزاء من الملي ثانية.",
      "نظام تلقيم هيدروليكي مزدوج مع مخزن محصن يتسع لـ 1,200 قذيفة.",
      "تثبيت توازني ثلاثي المحاور لعزل اهتزازات الإطلاق عن برج الضغط العالي.",
    ],
  },
  {
    id: "aec_tuwaiq_radar",
    name: "رادار «حارس السماء 4D» للمسح الطوري النشط (AEC Tuwaiq 4D AESA)",
    origin: "local_saudi",
    manufacturer: "شركة الإلكترونيات المتقدمة (AEC / SAMI)",
    category: "radar",
    localizationRate: "90% (برمجيات ومعالجات وهوائيات مصفوفات الطور محلية)",
    caliberOrPower: "مصفوفة Gallium Nitride (GaN) ثنائية النطاق S/X-Band",
    effectiveRange: "120 كم للطائرات / 40 كم للمسيرات الشبحية الصغيرة",
    rateOfFire: "تحديث مسار الهدف كل 0.15 ثانية وتتبع 400 هدف متزامن",
    ammoTypeOrPayload: "أمواج رادارية رقمية نبضية مع كاميرا حرارية كهروبصرية FLIR MWIR/LWIR",
    description: "رادار متطور فائق الحساسية مصمم خصيصاً للعمل في البيئة الصحراوية الحارة والعواصف الغبارية لرصد المقذوفات المنخفضة وصواريخ كروز الملاصقة للتضاريس.",
    advantages: [
      "محو منطقة الحجب التضاريسي بفضل ارتفاعه على قمة البرج (110 أمتار).",
      "خوارزميات ذكاء اصطناعي سعودية لتمييز الطيور والعواصف الرملية عن الدرونز الانتحارية.",
      "حماية كاملة من التشويش الإلكتروني (ECCM) مع قفص فاراداي عازل للنبضات.",
    ],
  },
  {
    id: "sami_vls_saqr",
    name: "منظومة صواريخ «صقر الدفاعية» للإطلاق العمودي (SAMI Saqr VLS)",
    origin: "local_saudi",
    manufacturer: "الشركة السعودية للصناعات العسكرية (SAMI Defense)",
    category: "missiles",
    localizationRate: "65% (رؤوس التوجيه والوقود الصلب وحاويات الإطلاق)",
    caliberOrPower: "12 صومعة إطلاق عمودي VLS معيارية (Canister Launch)",
    effectiveRange: "من 2.5 كم إلى 25 كم (سقف ارتفاع 12,000 متر)",
    rateOfFire: "إطلاق متتابع لـ 12 صاروخاً في أقل من 6 ثوانٍ",
    ammoTypeOrPayload: "صواريخ اعتراضية موجهة بالرادار النشط والتصوير الحراري بالأشعة تحت الحمراء",
    description: "منظومة دفاع جوي نقطي ومتوسط لحماية المنشآت الحيوية، تتميز بالإطلاق العمودي البارد الذي يمنح الصاروخ قدرة المناورة الفورية 360 درجة دون الحاجة لتدوير منصة الإطلاق.",
    advantages: [
      "اشتباك فوري بزمن رد فعل أقل من 1.4 ثانية من صدور أمر مركز C4I.",
      "محرك دفع موجه بالتبريد (Thrust Vectoring) لاعتراض صواريخ الكروز المتعرجة.",
      "تكامل فوري عبر كابلات الألياف OPGW مع رادار البرج الأول.",
    ],
  },

  // 2. Active Imported Systems in Service with Royal Saudi Air Defense (RSADF)
  {
    id: "silent_hunter_laser",
    name: "منظومة «الصياد الصامت» الليزرية (Silent Hunter 30-100kW Laser)",
    origin: "imported_active",
    manufacturer: "أنظمة الليزر التكتيكية المعتمدة لدى الدفاع الجوي الملكي السعودي",
    category: "laser",
    localizationRate: "تشغيل وصيانة ودعم فني سعودي 100%",
    caliberOrPower: "30 إلى 100 كيلوواط طاقة مستمرة",
    effectiveRange: "4,000 متر لاختراق صفائح الصلب 2 ملم",
    rateOfFire: "تدمير الهدف خلال ثانية واحدة من الإطباق المستمر",
    ammoTypeOrPayload: "حزمة ليزر كيميائية الحالة الصلبة (Solid-State Fiber)",
    description: "منظومة الليزر العملياتية الأبرز التي أثبتت كفاءة استثنائية في مسرح العمليات السعودي باعتراض وإسقاط عشرات الدرونز والمسيرات الانتحارية بدقة تامة.",
    advantages: [
      "سجل نجاح قتالي مؤكد 100% في حماية المطارات والمنشآت النفطية بالمملكة.",
      "إمكانية اختيار مستوى الطاقة (حرق إلكترونيات فقط، أو قطع أجنحة، أو تفجير الرأس الحربي).",
      "صامتة تماماً وخالية من الارتداد الميكانيكي على هيكل البرج.",
    ],
  },
  {
    id: "oerlikon_skyguard_35mm",
    name: "منظومة «سكاي جارد / أورليكون» (Oerlikon Skyguard 35mm Twin)",
    origin: "imported_active",
    manufacturer: "Rheinmetall Air Defence (عاملة ومحدثة لدى الدفاع الجوي السعودي)",
    category: "ciws",
    localizationRate: "محدثة بأنظمة تحكم ورصد كهروبصري سعودية",
    caliberOrPower: "35 ملم ثنائي السبطانات (GDF-007 / 009)",
    effectiveRange: "4,000 متر ضد الطائرات والصواريخ المنخفضة",
    rateOfFire: "1,100 طلقة/دقيقة",
    ammoTypeOrPayload: "قذائف شظايا AHEAD المبرمجة زمنياً",
    description: "العمود الفقري لحماية القواعد الجوية والموانئ السعودية، توفر جداراً نيرانيّاً كثيفاً يمنع اختراق الصواريخ الجوالة والمسيرات.",
    advantages: [
      "دقة تهديف متناهية مقترنة برادار توجيه ناري ورؤية تلفزيونية وحرارية مدمجة.",
      "معدل جاهزية عملياتية يفوق 99.2% في البيئة الصحراوية القاسية.",
    ],
  },
  {
    id: "vl_mica_ng",
    name: "منظومة صواريخ «ميكا» العمودية (VL-MICA NG Surface-to-Air)",
    origin: "imported_active",
    manufacturer: "MBDA Missile Systems (معتمدة بالقوات المسلحة السعودية)",
    category: "missiles",
    localizationRate: "دعم فني وتكامل C4I وطني",
    caliberOrPower: "صواريخ اعتراضية بمدى 20 إلى 40 كم (سرعة ماخ 3.0)",
    effectiveRange: "40 كم ضد المقاتلات وصواريخ كروز والدرونز",
    rateOfFire: "إطلاق صلية متعددة في ثوانٍ معدودة",
    ammoTypeOrPayload: "رؤوس توجيه بالرادار النشط RF أو التصوير الحراري المزدوج IR",
    description: "صواريخ اعتراضية فائقة الرشاقة تعتمد على الإطلاق العمودي ونظام (أطلق وانسَ) للتعامل مع الهجمات التشبعية المنسقة من عدة اتجاهات في وقت واحد.",
    advantages: [
      "مظلة حماية 360 درجة بدون أي مناطق ميتة (Blind Zones).",
      "مقاومة ممتازة لكافة وسائط الإعاقة والتشويش الإلكتروني الحليف والمعادي.",
    ],
  },
  {
    id: "patriot_pac3_mse",
    name: "منظومة صواريخ «باتريوت باك-3 المتطورة» (Patriot PAC-3 MSE)",
    origin: "imported_active",
    manufacturer: "Lockheed Martin / Raytheon (الدرع الصاروخي الاستراتيجي للمملكة)",
    category: "missiles",
    localizationRate: "صيانة وتحديث مركز القيادة المشترك برأس تنورة والرياض",
    caliberOrPower: "صواريخ فتك بالاصطدام المباشر (Hit-to-Kill)",
    effectiveRange: "60 كم ضد الصواريخ الباليستية و 100+ كم ضد الطائرات",
    rateOfFire: "إطلاق اعتراضي دقيق ثنائي (Ripple Fire)",
    ammoTypeOrPayload: "محرك صاروخي صلب ثنائي النبض ومحركات توجيه دقيقة بدوافع غازية ACM",
    description: "أقوى وأنجح منظومة دفاع جوي وصاروخي باليستي في العالم، أثبتت كفاءة تاريخية فريدة في سماء المملكة باعتراض مئات الصواريخ والمسيرات.",
    advantages: [
      "تدمير الرؤوس الحربية النووية والتقليدية بالاصطدام الحركي المباشر.",
      "تكامل فوري مع شبكة الدفاع الجوي الموحدة عبر بروتوكولات Link-16 المشفرة.",
    ],
  },
];

export default function TowerSpecsView({
  towerThreeChoice,
  setTowerThreeChoice,
  soundEnabled,
}: {
  towerThreeChoice: "laser" | "missiles" | "ciws";
  setTowerThreeChoice: (choice: "laser" | "missiles" | "ciws") => void;
  soundEnabled: boolean;
}) {
  const [selectedTower, setSelectedTower] = useState<"tower1" | "tower2" | "tower3">("tower2");
  const [turretElevation, setTurretElevation] = useState<number>(35); // -15 to 85 deg
  const [turretAzimuth, setTurretAzimuth] = useState<number>(120); // 0 to 360 deg
  const [testFiring, setTestFiring] = useState<boolean>(false);
  const [autoScanActive, setAutoScanActive] = useState<boolean>(false);
  const [recoilKick, setRecoilKick] = useState<number>(0);
  const [missileLaunchState, setMissileLaunchState] = useState<boolean>(false);
  const [selectedSaudiSystemId, setSelectedSaudiSystemId] = useState<string>("sami_ciws_35mm");
  const [activeFilterCategory, setActiveFilterCategory] = useState<"all" | "local" | "imported">("all");

  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-Scan Kinematic Routine (Oscillating & Rotating)
  useEffect(() => {
    if (autoScanActive) {
      scanIntervalRef.current = setInterval(() => {
        setTurretAzimuth((prev) => (prev + 3) % 360);
        setTurretElevation((prev) => {
          const next = prev + Math.sin(Date.now() / 800) * 1.5;
          return Math.max(-10, Math.min(80, next));
        });
      }, 50);
    } else {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    }
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, [autoScanActive]);

  // Recoil recovery physics loop
  useEffect(() => {
    if (recoilKick > 0) {
      const timer = setTimeout(() => {
        setRecoilKick((prev) => Math.max(0, prev - 3));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [recoilKick]);

  const handleTestBurst = () => {
    setTestFiring(true);
    setRecoilKick(16); // 16px recoil displacement

    if (soundEnabled) {
      if (selectedTower === "tower1") {
        tacticalAudio.playRadarPing();
      } else if (selectedTower === "tower2" || (selectedTower === "tower3" && towerThreeChoice === "ciws")) {
        tacticalAudio.playGunBurst();
      } else if (selectedTower === "tower3" && towerThreeChoice === "laser") {
        tacticalAudio.playLaserHum();
      } else if (selectedTower === "tower3" && towerThreeChoice === "missiles") {
        tacticalAudio.playMissileLaunch();
        setMissileLaunchState(true);
        setTimeout(() => setMissileLaunchState(false), 2000);
      }
    }

    setTimeout(() => {
      setTestFiring(false);
    }, 700);
  };

  const selectedSystem =
    saudiDefenseArsenal.find((s) => s.id === selectedSaudiSystemId) || saudiDefenseArsenal[1];

  const filteredSystems = saudiDefenseArsenal.filter((sys) => {
    if (activeFilterCategory === "local") return sys.origin === "local_saudi";
    if (activeFilterCategory === "imported") return sys.origin === "imported_active";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header and Tower Selector Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Cpu className="w-4 h-4" />
            <span>محاكي الحركة الديناميكية والفيزيائية · ترسانة الدفاع الجوي السعودي</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            مواصفات الأبراج والمحاكي الحركي لمنظومات الدفاع السعودية
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            تحكم بحركة الرادار والمدافع الثنائية والليزر والصواريخ في الزمن الفعلي، واستعرض الترسانة السعودية المعتمدة محلياً ودولياً.
          </p>
        </div>

        {/* Tower Selector Buttons */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => {
              setSelectedTower("tower1");
              setSelectedSaudiSystemId("aec_tuwaiq_radar");
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedTower === "tower1"
                ? "bg-emerald-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            البرج 1: الرادار AESA
          </button>
          <button
            onClick={() => {
              setSelectedTower("tower2");
              setSelectedSaudiSystemId("sami_ciws_35mm");
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedTower === "tower2"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            البرج 2: الرشاش الثنائي 35mm
          </button>
          <button
            onClick={() => {
              setSelectedTower("tower3");
              if (towerThreeChoice === "laser") setSelectedSaudiSystemId("sami_laser_50kw");
              else if (towerThreeChoice === "missiles") setSelectedSaudiSystemId("sami_vls_saqr");
              else setSelectedSaudiSystemId("oerlikon_skyguard_35mm");
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedTower === "tower3"
                ? "bg-sky-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            البرج 3: الخيار المعياري
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Kinematics Visualizer & Motion Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive SVG Animated Turret Kinematics (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                محاكي الحركة الميكانيكية والاشتباك الفيزيائي
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-300">
                السمت: <strong className="text-emerald-400">{turretAzimuth.toFixed(0)}°</strong>
              </span>
              <span className="text-slate-300">
                الارتفاع: <strong className="text-amber-400">{turretElevation.toFixed(0)}°</strong>
              </span>
              <span className="text-slate-400 text-[10px]">
                {autoScanActive ? "(وضع المسح النشط)" : "(تحكم يدوي)"}
              </span>
            </div>
          </div>

          {/* SVG Animated Turret with Full Physics */}
          <div className="flex-1 flex items-center justify-center relative min-h-[380px] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] rounded-lg border border-slate-900 overflow-hidden select-none">
            <svg viewBox="0 0 500 380" className="w-full h-full max-h-[380px]">
              {/* Definitions for laser and exhaust */}
              <defs>
                <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                  <stop offset="60%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>
                <radialGradient id="muzzleBloom" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                  <stop offset="70%" stopColor="#ef4444" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Polar Compass Angle Grid & Horizon Lines */}
              <circle cx="250" cy="220" r="150" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="250" cy="220" r="100" fill="none" stroke="#1e293b" strokeWidth="1" />
              <circle cx="250" cy="220" r="50" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="250" y1="40" x2="250" y2="360" stroke="#1e293b" strokeWidth="1" />
              <line x1="70" y1="220" x2="430" y2="220" stroke="#1e293b" strokeWidth="1" />

              {/* Azimuth Ray Line */}
              <line
                x1="250"
                y1="220"
                x2={250 + Math.cos((turretAzimuth * Math.PI) / 180) * 150}
                y2={220 + Math.sin((turretAzimuth * Math.PI) / 180) * 150}
                stroke="#065f46"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* High Voltage Pylon Platform Base (110m Mast Head) */}
              <rect x="170" y="295" width="160" height="22" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <line x1="190" y1="317" x2="150" y2="375" stroke="#64748b" strokeWidth="3.5" />
              <line x1="310" y1="317" x2="350" y2="375" stroke="#64748b" strokeWidth="3.5" />
              {/* Hydraulic Shock Absorbers Base */}
              <rect x="205" y="278" width="90" height="17" rx="3" fill="#047857" stroke="#10b981" strokeWidth="1.5" />
              <text x="250" y="290" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">
                قاعدة التخميد الهيدروليكي MR
              </text>

              {/* Dynamic Recoil Spring Base Offset */}
              <g transform={`translate(0, ${recoilKick * 0.3})`}>
                {/* 1. TOWER 1: RADAR / EO-IR 4D AESA SCANNER */}
                {selectedTower === "tower1" && (
                  <g>
                    {/* Rotating Pedestal */}
                    <rect x="215" y="240" width="70" height="38" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    {/* Dynamic Rotating Phased Array Antenna */}
                    <g transform={`rotate(${turretAzimuth}, 250, 160)`}>
                      <polygon points="215,220 285,220 275,140 225,140" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                      <circle cx="250" cy="150" r="30" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                      {/* Dual-Band Array Elements */}
                      <rect x="238" y="138" width="24" height="24" rx="3" fill="#064e3b" stroke="#38bdf8" strokeWidth="1.5" />
                      <circle cx="250" cy="150" r="6" fill="#38bdf8" className="animate-pulse" />
                    </g>

                    {/* Radar Pulse Wavefront Emission */}
                    <path
                      d={`M 250 160 L ${250 + Math.cos((turretAzimuth * Math.PI) / 180) * 170} ${
                        160 + Math.sin((turretAzimuth * Math.PI) / 180) * 120
                      }`}
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeDasharray="5 3"
                    />
                    <circle
                      cx={250 + Math.cos((turretAzimuth * Math.PI) / 180) * 170}
                      cy={160 + Math.sin((turretAzimuth * Math.PI) / 180) * 120}
                      r="8"
                      fill="#34d399"
                      className="animate-ping"
                    />

                    {/* Lightning Protection Mast */}
                    <line x1="250" y1="120" x2="250" y2="70" stroke="#38bdf8" strokeWidth="3" />
                    <circle cx="250" cy="70" r="4" fill="#38bdf8" />
                  </g>
                )}

                {/* 2. TOWER 2: TWIN CIWS 35MM SMART AUTOCANNON */}
                {selectedTower === "tower2" && (
                  <g>
                    {/* Armored Turret Base with Azimuth Indicator */}
                    <rect x="200" y="235" width="100" height="43" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="2.5" />
                    {/* Gun Cradle with Rotation Center */}
                    <circle cx="250" cy="230" r="32" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />

                    {/* Twin Barrels with Elevation Physics and Recoil Displacement */}
                    {(() => {
                      const len = 125;
                      const rad = (turretElevation * Math.PI) / 180;
                      // Invert elevation for standard SVG coordinate system
                      const tipX = 250 - Math.cos(rad) * (len - recoilKick);
                      const tipY = 230 - Math.sin(rad) * (len - recoilKick);
                      const offset = 7;

                      return (
                        <g>
                          {/* Upper Barrel */}
                          <line x1="250" y1="225" x2={tipX} y2={tipY - offset} stroke="#f59e0b" strokeWidth="5.5" strokeLinecap="round" />
                          {/* Lower Barrel */}
                          <line x1="250" y1="235" x2={tipX} y2={tipY + offset} stroke="#f59e0b" strokeWidth="5.5" strokeLinecap="round" />

                          {/* Muzzle Brakes */}
                          <rect x={tipX - 12} y={tipY - offset - 4.5} width="14" height="9" rx="2" fill="#d97706" stroke="#b45309" strokeWidth="1" />
                          <rect x={tipX - 12} y={tipY + offset - 4.5} width="14" height="9" rx="2" fill="#d97706" stroke="#b45309" strokeWidth="1" />

                          {/* Laser Beam-Rider Sight (Red Guidance Beam) */}
                          <line x1="250" y1="215" x2={tipX - 140} y2={tipY - 80} stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 2" />
                          <circle cx="250" cy="215" r="4.5" fill="#ef4444" />

                          {/* Muzzle Flash & Projectiles during Firing */}
                          {testFiring && (
                            <g>
                              {/* Glowing Flash Bloom */}
                              <circle cx={tipX - 18} cy={tipY} r="32" fill="url(#muzzleBloom)" className="animate-ping" />
                              <polygon
                                points={`${tipX - 10},${tipY} ${tipX - 50},${tipY - 20} ${tipX - 70},${tipY} ${tipX - 50},${tipY + 20}`}
                                fill="#fbbf24"
                              />
                              {/* AHEAD Smart Tungsten Pellets Stream */}
                              {[1, 2, 3, 4, 5].map((i) => (
                                <circle
                                  key={i}
                                  cx={tipX - 40 - i * 30}
                                  cy={tipY - 20 - i * 15}
                                  r="3"
                                  fill="#fef08a"
                                />
                              ))}
                            </g>
                          )}
                        </g>
                      );
                    })()}

                    {/* Recoil Hydraulic Indicator */}
                    <rect x="240" y="270" width="20" height="8" rx="2" fill={recoilKick > 0 ? "#ef4444" : "#10b981"} />
                  </g>
                )}

                {/* 3. TOWER 3: MODULAR CHOICES (LASER / MISSILES / CIWS) */}
                {selectedTower === "tower3" && (
                  <g>
                    {/* Option A: High-Energy Laser Cannon (HEL) */}
                    {towerThreeChoice === "laser" && (
                      <g>
                        {/* Laser Director Optical Turret Sphere */}
                        <circle cx="250" cy="220" r="48" fill="#082f49" stroke="#0284c7" strokeWidth="3" />
                        <circle cx="250" cy="220" r="34" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                        {(() => {
                          const len = 95;
                          const rad = (turretElevation * Math.PI) / 180;
                          const tipX = 250 - Math.cos(rad) * len;
                          const tipY = 220 - Math.sin(rad) * len;

                          return (
                            <g>
                              {/* Optical Focus Barrel */}
                              <line x1="250" y1="220" x2={tipX} y2={tipY} stroke="#0284c7" strokeWidth="12" strokeLinecap="round" />
                              <circle cx={tipX} cy={tipY} r="10" fill="#38bdf8" />
                              <circle cx={tipX} cy={tipY} r="5" fill="#ffffff" />

                              {/* Continuous High-Power Laser Beam */}
                              {(testFiring || autoScanActive) && (
                                <g>
                                  <line x1={tipX} y1={tipY} x2={tipX - 190} y2={tipY - 110} stroke="#38bdf8" strokeWidth="6" opacity="0.9" />
                                  <line x1={tipX} y1={tipY} x2={tipX - 190} y2={tipY - 110} stroke="#ffffff" strokeWidth="2" />
                                  <circle cx={tipX - 190} cy={tipY - 110} r="14" fill="#38bdf8" className="animate-ping" opacity="0.8" />
                                </g>
                              )}
                            </g>
                          );
                        })()}
                      </g>
                    )}

                    {/* Option B: Vertical Launch System (VLS Missiles) */}
                    {towerThreeChoice === "missiles" && (
                      <g>
                        {/* 12-Cell VLS Launcher Module */}
                        <rect x="195" y="170" width="110" height="105" rx="5" fill="#1e1b4b" stroke="#7c3aed" strokeWidth="2.5" />
                        {[0, 1, 2, 3].map((row) =>
                          [0, 1, 2].map((col) => (
                            <rect
                              key={`${row}-${col}`}
                              x={207 + col * 31}
                              y={182 + row * 22}
                              width="23"
                              height="16"
                              rx="3"
                              fill="#312e81"
                              stroke="#a78bfa"
                              strokeWidth="1.2"
                            />
                          ))
                        )}

                        {/* Missile Launch Physics */}
                        {(testFiring || missileLaunchState) && (
                          <g>
                            {/* Launch Flame Exhaust */}
                            <polygon points="250,175 240,200 260,200" fill="#f97316" />
                            <circle cx="250" cy="190" r="16" fill="#fbbf24" className="animate-ping" opacity="0.8" />
                            {/* Interceptor Missile Body in Flight */}
                            <g transform="translate(0, -60)">
                              <polygon points="245,140 255,140 250,105" fill="#c084fc" stroke="#e9d5ff" strokeWidth="1" />
                              <rect x="246" y="138" width="8" height="24" fill="#e2e8f0" />
                              <polygon points="242,162 250,155 258,162" fill="#ef4444" />
                              {/* Exhaust Trail */}
                              <line x1="250" y1="162" x2="250" y2="210" stroke="#fb923c" strokeWidth="3" strokeDasharray="4 2" />
                            </g>
                          </g>
                        )}
                      </g>
                    )}

                    {/* Option C: Twin CIWS Extra Cannon */}
                    {towerThreeChoice === "ciws" && (
                      <g>
                        <rect x="200" y="235" width="100" height="43" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                        <circle cx="250" cy="230" r="32" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
                        {(() => {
                          const len = 125;
                          const rad = (turretElevation * Math.PI) / 180;
                          const tipX = 250 - Math.cos(rad) * len;
                          const tipY = 230 - Math.sin(rad) * len;
                          return (
                            <g>
                              <line x1="250" y1="225" x2={tipX} y2={tipY - 7} stroke="#38bdf8" strokeWidth="5.5" />
                              <line x1="250" y1="235" x2={tipX} y2={tipY + 7} stroke="#38bdf8" strokeWidth="5.5" />
                            </g>
                          );
                        })()}
                      </g>
                    )}
                  </g>
                )}
              </g>
            </svg>
          </div>

          {/* Kinematic Control Sliders & Action Toolbar */}
          <div className="mt-4 pt-3 border-t border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Azimuth Control (0-360) */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-emerald-400" />
                    <span>زاوية الدوران الأفقية (السمت Azimuth):</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">{turretAzimuth}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={turretAzimuth}
                  onChange={(e) => {
                    setAutoScanActive(false);
                    setTurretAzimuth(Number(e.target.value));
                  }}
                  className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded cursor-pointer"
                />
              </div>

              {/* Elevation Control (-15 to 85) */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-amber-400" />
                    <span>زاوية الارتفاع والانخفاض (Elevation):</span>
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{turretElevation}°</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="85"
                  value={turretElevation}
                  onChange={(e) => {
                    setAutoScanActive(false);
                    setTurretElevation(Number(e.target.value));
                  }}
                  className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Test Firing & Auto-Scan Trigger Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setAutoScanActive(!autoScanActive)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    autoScanActive
                      ? "bg-emerald-600 border-emerald-400 text-white shadow-lg animate-pulse"
                      : "bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  {autoScanActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{autoScanActive ? "إيقاف المسح الآلي" : "تشغيل المسح الآلي 360°"}</span>
                </button>

                {selectedTower === "tower3" && (
                  <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-[11px]">
                    <button
                      onClick={() => setTowerThreeChoice("laser")}
                      className={`px-2 py-1 rounded ${
                        towerThreeChoice === "laser" ? "bg-sky-500 text-slate-950 font-bold" : "text-slate-400"
                      }`}
                    >
                      ليزر HEL
                    </button>
                    <button
                      onClick={() => setTowerThreeChoice("missiles")}
                      className={`px-2 py-1 rounded ${
                        towerThreeChoice === "missiles" ? "bg-purple-500 text-white font-bold" : "text-slate-400"
                      }`}
                    >
                      صواريخ VLS
                    </button>
                    <button
                      onClick={() => setTowerThreeChoice("ciws")}
                      className={`px-2 py-1 rounded ${
                        towerThreeChoice === "ciws" ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400"
                      }`}
                    >
                      رشاش إضافي
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleTestBurst}
                disabled={testFiring}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-xs rounded-lg shadow-lg flex items-center gap-2 transition-all active:scale-95"
              >
                <Flame className="w-4 h-4 animate-bounce" />
                <span>
                  {selectedTower === "tower1"
                    ? "إرسال نبضة رادار AESA"
                    : selectedTower === "tower2" || (selectedTower === "tower3" && towerThreeChoice === "ciws")
                    ? "رشق ناري تجريبي (Burst 35mm)"
                    : selectedTower === "tower3" && towerThreeChoice === "laser"
                    ? "إطلاق نبضة ليزر 100kW"
                    : "إطلاق صاروخ اعتراضي VLS"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Saudi Air Defense Arsenal Selector & Technical Datasheet (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
            {/* Header & Filter */}
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>ترسانة الدفاع الجوي السعودي (محلية ومستوردة)</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 border border-amber-600/50 text-amber-300">
                  رؤية 2030
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-1.5 text-[11px] font-mono">
                <button
                  onClick={() => setActiveFilterCategory("all")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeFilterCategory === "all" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-950 text-slate-400"
                  }`}
                >
                  الكل ({saudiDefenseArsenal.length})
                </button>
                <button
                  onClick={() => setActiveFilterCategory("local")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeFilterCategory === "local" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-950 text-slate-400"
                  }`}
                >
                  صناعة سعودية SAMI
                </button>
                <button
                  onClick={() => setActiveFilterCategory("imported")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    activeFilterCategory === "imported" ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-950 text-slate-400"
                  }`}
                >
                  معتمدة بالدفاع الجوي
                </button>
              </div>
            </div>

            {/* System Selection List */}
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
              {filteredSystems.map((sys) => {
                const isSelected = selectedSaudiSystemId === sys.id;
                return (
                  <button
                    key={sys.id}
                    onClick={() => {
                      setSelectedSaudiSystemId(sys.id);
                      if (sys.category === "radar") setSelectedTower("tower1");
                      else if (sys.category === "ciws") setSelectedTower("tower2");
                      else if (sys.category === "laser") {
                        setSelectedTower("tower3");
                        setTowerThreeChoice("laser");
                      } else if (sys.category === "missiles") {
                        setSelectedTower("tower3");
                        setTowerThreeChoice("missiles");
                      }
                    }}
                    className={`w-full p-2.5 rounded-lg text-right border transition-all flex items-center justify-between text-xs ${
                      isSelected
                        ? "bg-amber-950/40 border-amber-500 text-white shadow-md ring-1 ring-amber-500/50"
                        : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="space-y-0.5 truncate">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            sys.origin === "local_saudi" ? "bg-emerald-400" : "bg-sky-400"
                          }`}
                        />
                        <span className="font-bold truncate">{sys.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">{sys.manufacturer.split("(")[0]}</span>
                    </div>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded shrink-0 ${
                        sys.origin === "local_saudi"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-sky-950 text-sky-300 border border-sky-800"
                      }`}
                    >
                      {sys.origin === "local_saudi" ? "وطني" : "ميداني"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Selected System Detailed Datasheet */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 block font-bold">
                  {selectedSystem.localizationRate}
                </span>
                <h4 className="text-sm font-bold font-display text-white mt-0.5">{selectedSystem.name}</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed mt-1">{selectedSystem.description}</p>
              </div>

              {/* Technical Matrix */}
              <div className="border border-slate-800 rounded-lg p-2.5 bg-slate-900/60 font-mono text-[11px] space-y-1.5">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">المدى الفعال:</span>
                  <span className="text-emerald-400 font-bold">{selectedSystem.effectiveRange}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">العيار / القدرة:</span>
                  <span className="text-white font-semibold">{selectedSystem.caliberOrPower}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span className="text-slate-400">معدل الإطلاق:</span>
                  <span className="text-amber-400 font-semibold">{selectedSystem.rateOfFire}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">نوع الذخيرة:</span>
                  <span className="text-slate-200 text-[10px] font-sans">{selectedSystem.ammoTypeOrPayload}</span>
                </div>
              </div>

              {/* Advantages Points */}
              <div className="space-y-1.5 pt-1">
                <span className="text-slate-400 text-[10px] font-bold block">المزايا التكتيكية العملياتية:</span>
                <ul className="space-y-1 text-[11px] text-slate-300">
                  {selectedSystem.advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
