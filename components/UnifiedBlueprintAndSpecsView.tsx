"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Radar, Crosshair, Zap, Shield, Layers, Radio, Activity, Compass, Cpu, Maximize2, Printer,
  Target, Disc, RefreshCw, Play, Pause, Volume2, VolumeX, Sparkles, Award, CheckCircle2, ChevronRight,
  Flame, Gauge, AlertCircle, ShieldAlert, Sliders, FileText, Check, ArrowRight
} from "lucide-react";
import { tacticalAudio } from "@/lib/audio";
import PrintOptionsModal from "@/components/PrintOptionsModal";

// ==========================================
// SAUDI DEFENSE ARSENAL DATA
// ==========================================
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

// ==========================================
// STRUCTURAL COMPONENTS & ARCHITECTURE DATA
// ==========================================
interface StructuralComponentData {
  id: string;
  name: string;
  code: string;
  category: "weapon" | "structure" | "power" | "protection" | "foundation";
  tagline: string;
  elevation: string;
  material: string;
  specs: { [key: string]: string };
  capabilities: string[];
  developmentEvolution: string;
  safetyMargin: number;
  stressResistance: string;
  color: string;
}

const structuralComponentsList: StructuralComponentData[] = [
  {
    id: "lightning_ese",
    name: "مشتت الصواعق الفائق ESE وقضيب التأريض المتقدم",
    code: "SEC-LGT-01",
    category: "protection",
    tagline: "حماية مطلقة للإلكترونيات والرادارات من الصواعق المباشرة والنبض الكهرومغناطيسي (EMP)",
    elevation: "قمة البرج الشاهقة (+110م إلى +120م فوق سطح الأرض)",
    material: "سبائك النحاس التيلوريوم مع طلاء التيتانيوم ومشتتات البلازما المتأينة",
    specs: {
      "زمن تفريغ الصدمة": "10/350 µs Waveform قياسي",
      "أقصى تيار صاعقة": "200,000 أمبير (200 kA Direct Strike)",
      "نصف قطر الحماية": "مخروط حماية 360° بنصف قطر 120 متراً",
      "مقاومة التأريض": "أقل من 0.5 أوم (0.42 Ω Measured)",
      "عزل النبضة (EMP)": "تخميد موجات التفريغ بنسبة > 98.6 dB",
    },
    capabilities: [
      "تأيين مسبق للشحنات الجوية لتوجيه الصواعق وتفريغها الفوري بعيداً عن أجهزة الرادار.",
      "عزل كهربائي مزدوج يمنع ارتداد التيار الصاعق نحو خطوط النقل 380kV أو غرف الحواسب التكتيكية.",
      "مراقبة مستمرة لمستويات الشحنات الكهروستاتيكية وإرسال إنذارات مبكرة لمركز C4I قبل حدوث الصاعقة بـ 15 دقيقة.",
    ],
    developmentEvolution:
      "في الحرب العالمية الثانية، كانت أبراج الفلاك تفتقر لمنظومات حماية الرادارات الدقيقة من البرق، مما سبب أعطالاً متكررة في رادارات Würzburg؛ تم ابتكار هذا النظام بمصفوفة تفريغ ESE ذكية متصلة بكابل التأريض OPGW وأوتاد الصخر لتوفير حماية كاملة للمنظومة السعودية بدون أي انقطاع.",
    safetyMargin: 99.4,
    stressResistance: "200 kA / 5.2 MJ",
    color: "#38bdf8",
  },
  {
    id: "hardened_platform",
    name: "منصة الاشتباك المحصنة وبرج السلاح (4.2م × 4.2م)",
    code: "PLT-WPN-02",
    category: "weapon",
    tagline: "منصة دوران كاملة 360° محصنة للدروع خفيفة الوزن ومقاومة لرمال وعواصف الصحراء",
    elevation: "السطح العلوي للبرج (+90م إلى +105م)",
    material: "سبائك التيتانيوم Ti-6Al-4V، وألمنيوم دروع 7075-T6، ومركبات ألياف كيفلار مصفحة",
    specs: {
      "أبعاد المنصة": "4.20 × 4.20 متر (مساحة 17.6 م²)",
      "وزن المنصة المجهزة": "1,850 كجم (بدون السلاح) / 3,400 كجم (بالتسليح الكامل)",
      "قوس الدوران الأفقي": "360° غير مقيد مع حلقات انزلاقية ضوئية (Optical Slip Rings)",
      "زاوية الارتفاع والانخفاض": "-15° إلى +85° (تغطية كاملة للتهديدات المنخفضة والعمودية)",
      "سرعة التوجيه الناري": "110 درجات في الثانية بدقة إطباق 0.05 مللي راديان",
    },
    capabilities: [
      "حمل مدفع الرشاش الثنائي 35mm أو مدفع الليزر عالي الطاقة 100kW HEL أو قاذف VLS للصواريخ الاعتراضية.",
      "تثبيت توازني ثلاثي المحاور (Gyroscopic 3-Axis Stabilization) يعوض اهتزازات الرياح وحركة البرج بنسبة 99.8%.",
      "غطاء درعي مركب مقاوم للشظايا وطلقات حتى عيار 12.7 مم مع طلاء راداري شبحي ممتص للموجات (RAM).",
    ],
    developmentEvolution:
      "استبدلت المنصة الحديثة مرابض المدافع الخرسانية الألمانية التي كانت تزن 45 طناً بهيكل ميكانيكي تيتانيومي خفيف الوزن وعالي المتانة، مما مكن من تركيبه فوق صواري الكهرباء دون الإخلال بالاتزان الديناميكي.",
    safetyMargin: 96.8,
    stressResistance: "45 kN Recoil / 60°C Heat",
    color: "#f59e0b",
  },
  {
    id: "recoil_column",
    name: "العمود الأنبوبي الفولاذي المركزي المستقل (Monocoque Spine)",
    code: "STR-SPN-03",
    category: "structure",
    tagline: "الابتكار الإنشائي التأسيسي لعزل 100% من عزم الارتداد عن هيكل أسلاك الكهرباء",
    elevation: "يمتد رأسياً في قلب البرج من الأساسات حتى المنصة (+0م إلى +105م)",
    material: "صلب فائق المتانة عالي المرونة Weldox 900 / Domex 700 مع معالجة مضادة للتآكل",
    specs: {
      "القطر الخارجي للأنبوب": "450 ملم (Ø 450 mm Tubular Section)",
      "سماكة جدار الأنبوب": "25 ملم صلب مسحوب على الساخن",
      "طاقة الامتصاص المحورية": "تحمل قوى ضغط تصل إلى 1,250 طن وقوى شد 850 طن",
      "المرونة الميكانيكية": "إزاحة مرنة لا تتجاوز 18 ملم عند أقصى رشق ناري",
      "مسار الخدمات الداخلية": "قناة داخلية مصفحة لخطوط الطاقة والتبريد والألياف OPGW",
    },
    capabilities: [
      "استقبال طاقة الارتداد الناتجة عن إطلاق 1,600 طلقة/دقيقة ونقلها مباشرة إلى باطن الأرض الصخري.",
      "منع انتقال أي اهتزازات ميكانيكية إلى عوارض البرج الخارجية الحاملة لأسلاك الجهد العالي 380kV.",
      "حماية خطوط إمداد السائل المبرد وكابلات البيانات داخل تجويف مفرغ معزول حرارياً وكهرومغناطيسياً.",
    ],
    developmentEvolution:
      "العمود المركزي هو الحل العبقري الذي حل معضلة تحديث الأبراج القائمة؛ حيث وفر جسراً ميكانيكياً مستقلاً ينقل الإجهادات إلى الأرض دون الحاجة لإعادة بناء البرج أو تدعيم أذرع الكهرباء بمئات الأطنان.",
    safetyMargin: 98.2,
    stressResistance: "1,250 Ton Compressive",
    color: "#10b981",
  },
  {
    id: "hv_insulators_380kv",
    name: "عوازل التعليق البوليميرية وموصلات الجهد الفائق 380kV مع الطوق الحثي",
    code: "PWR-TAP-04",
    category: "power",
    tagline: "استجرار مستمر للطاقة الكهربائية دون تلامس مباشر مع تأمين خلوص عازل فائق",
    elevation: "أذرع النقل الوسطى للبرج (+65م إلى +80م)",
    material: "مطاط السيليكون المركب (Silicone Polymer Insulators) مع حزم موصلات ألمنيوم ACSR",
    specs: {
      "الجهد الاسمي للخط": "380,000 فولت تيار متردد (380 kV AC, 3-Phase, 60Hz)",
      "تيار الخط التشغيلي": "2,400 أمبير لكل حزمة موصلات",
      "قدرة الاستجرار الحثي": "120 إلى 150 كيلوواط مستمرة (Inductive Toroid Tap)",
      "مسافة الزحف العازلة": "31 ملم/كيلوفولت (مقاومة قصوى للملوحة والغبار الصحراوي)",
      "نظام التخزين المؤقت": "مصفوفة بطاريات تيتانات الليثيوم LTO بسعة 180 kWh",
    },
    capabilities: [
      "تزويد المنصة براداراتها ومدافع الليزر والرشاشات بطاقة كهربائية دائمة لا تنضب من الشبكة الوطنية.",
      "شحن سريع لبطاريات الطوارئ LTO خلال 12 دقيقة لضمان استمرارية القتال حتى في حال انقطاع الخط.",
      "عوازل بوليميرية متقدمة تطرد الغبار والأملاح وتمنع حدوث الشرارات الكهربائية (Flashover).",
    ],
    developmentEvolution:
      "بينما كانت قلاع الفلاك القديمة تعتمد على مولدات ديزل داخلية تتطلب صهاريج وقود يومية قابلة للحصار، تستمد المنظومة السعودية طاقتها مباشرة من أكبر شبكة نقل طاقة في الشرق الأوسط (Gigawatt Grid Tap).",
    safetyMargin: 97.5,
    stressResistance: "550 kV BIL Impulse",
    color: "#eab308",
  },
  {
    id: "safety_dielectric_clearance",
    name: "قوس وخلوص الأمان العازل المضمون (Dielectric Clearance 8.5m)",
    code: "SAF-ARC-05",
    category: "protection",
    tagline: "مسافة خلوص هوائي تفصل أسلحة المنصة تماماً عن كابلات الضغط العالي لمنع التفريغ القوسي",
    elevation: "المنطقة الفاصلة بين المنصة وأذرع الكابلات (+80م إلى +92م)",
    material: "فضاء هوائي عازل مع حواجز هوائية كهرومغناطيسية وحلقات إخماد هالة الكورونا (Corona Rings)",
    specs: {
      "مسافة الخلوص الهوائي": "8.50 أمتار مضمونة (تتجاوز معيار IEEE 516 القياسي 6.2م)",
      "جهد الصمود العازل": "أكثر من 1,425 kV تحت نبضات الصواعق (Lightning Impulse Withstand)",
      "معدل إخماد الهالة": "أقل من 2.5 pC عند جهد تشغيل 420 kV",
      "أقصى رطوبة تشغيلية": "100% رطوبة نسبية وضباب ملحي ساحلي بدون أي تفريغ",
    },
    capabilities: [
      "منع حدوث القوس الكهربائي (Arc Flash) بين فوهات الأسلحة والموصلات أثناء دوران المنصة أو إطلاق النيران.",
      "تشتيت الحقول الكهرومغناطيسية الناتجة عن تيار 380kV لحماية معالجات الرادار من التشويش الحثي.",
      "ضمان سلامة أطقم الصيانة العسكرية أثناء الصعود أو استخدام رافعات التلقيم السريع.",
    ],
    developmentEvolution:
      "تم حساب مسافة الأمان عبر نمذجة ثلاثية الأبعاد للحقول الكهروستاتيكية (Finite Element Field Simulation) للتأكد من أن وجود المعدات والأسلحة المعدنية لا يقلل من صلابة العزل الهوائي للخط الكهربائي.",
    safetyMargin: 99.8,
    stressResistance: "1,425 kV Impulse",
    color: "#06b6d4",
  },
  {
    id: "lattice_truss_frame",
    name: "الهيكل الشبكي الفولاذي المجلفن للبرج (Galvanized Steel Truss)",
    code: "STR-LAT-06",
    category: "structure",
    tagline: "هيكل تروس شبكي فائق الصلابة ومصمم لمقاومة أعتى العواصف الرملية واهتزازات التردد",
    elevation: "الهيكل الخارجي الكامل للبرج من القاعدة (+0م) حتى القمة (+110م)",
    material: "فولاذ إنشائي مجلفن بالغمس الساخن مع طلاء إيبوكسي بحري مقاوم للتآكل",
    specs: {
      "معامل التحمل الريحي": "مقاومة رياح مستدامة 180 كم/س وهبات حتى 220 كم/س",
      "معايير التصميم الإنشائي": "الكود السعودي للبناء (SBC 301) ومعايير ASCE 10",
      "نظام التثبيت المزدوج": "براغي شد عالية المقاومة عيار A325 مع صوامع قفل مزدوجة",
      "مقاومة التآكل الملحي": "تحمل بيئة السواحل والخليج العربي لمدة 50 عاماً بدون تآكل هيكلي",
    },
    capabilities: [
      "حمل الأحمال الإضافية للمنصة والأسلحة والرادارات وتوزيعها بانتظام على قواعد التأسيس الأرضية.",
      "الحفاظ على الاستقرار الهندسي للبرج الكهربائي دون أي انحراف يتجاوز المليمترات.",
      "سهولة وصول فرق الصيانة عبر السلالم الداخلية الآمنة والمزودة بمنصات استراحة.",
    ],
    developmentEvolution:
      "تم تطوير الهيكل الشبكي التقليدي لأبراج نقل الكهرباء بإضافة نقاط تقوية داخلية (X-Bracing Nodes) تمتص أحمال الارتداد النارية دون التأثير على كفاءة نقل التيار الكهربائي في الشبكة الوطنية.",
    safetyMargin: 97.9,
    stressResistance: "220 km/h Wind / 350 kN Axial",
    color: "#8b5cf6",
  },
];

interface UnifiedBlueprintAndSpecsViewProps {
  towerThreeChoice: "laser" | "missiles" | "ciws";
  setTowerThreeChoice: (choice: "laser" | "missiles" | "ciws") => void;
  onNavigateToSimulator?: () => void;
  soundEnabled: boolean;
}

export default function UnifiedBlueprintAndSpecsView({
  towerThreeChoice,
  setTowerThreeChoice,
  onNavigateToSimulator,
  soundEnabled,
}: UnifiedBlueprintAndSpecsViewProps) {
  // Main view segment state: "structural_architecture" | "cad_blueprint" | "mechanical_kinematics" | "saudi_arsenal" | "construction_specs"
  const [activeSegment, setActiveSegment] = useState<"structural_architecture" | "cad_blueprint" | "mechanical_kinematics" | "saudi_arsenal" | "construction_specs">("structural_architecture");

  // Structural Architecture State
  const [selectedStructuralPartId, setSelectedStructuralPartId] = useState<string>("lightning_ese");
  const [structuralSubTab, setStructuralSubTab] = useState<"specs" | "capabilities" | "evolution">("specs");

  const selectedStructuralPart =
    structuralComponentsList.find((p) => p.id === selectedStructuralPartId) || structuralComponentsList[0];

  // Segment 1: CAD Blueprint State
  const [activeLayer, setActiveLayer] = useState<"cluster" | "cross_section" | "kill_zone">("cluster");
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>("radar");
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Segment 2: Mechanical Kinematics Firing Test State
  const [selectedTower, setSelectedTower] = useState<"tower1" | "tower2" | "tower3">("tower2");
  const [turretElevation, setTurretElevation] = useState<number>(35);
  const [turretAzimuth, setTurretAzimuth] = useState<number>(120);
  const [testFiring, setTestFiring] = useState<boolean>(false);
  const [autoScanActive, setAutoScanActive] = useState<boolean>(false);
  const [recoilKick, setRecoilKick] = useState<number>(0);
  const [missileLaunchState, setMissileLaunchState] = useState<boolean>(false);

  // Segment 3: Saudi Arsenal Filter State
  const [selectedSaudiSystemId, setSelectedSaudiSystemId] = useState<string>("sami_ciws_35mm");
  const [activeFilterCategory, setActiveFilterCategory] = useState<"all" | "local" | "imported">("all");

  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Kinematic scan loop for Segment 2
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

  // Recoil physics recovery loop
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
    setRecoilKick(16);

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

  const hotspots = {
    radar: {
      title: "البرج الأول: رادار AESA رباعي الأبعاد ومستشعر EO/IR المبرد",
      desc: "منظومة رادار كهروبصري حراري مركبة على قمة برج كهرباء بارتفاع 110م لرصد المسيرات والصواريخ الشبحية لمدى 120 كم بتغطية 360 درجة، ومستشعر بصري حراري MWIR/LWIR كاشف للمقذوفات متناهية الصغر.",
      specs: [
        { label: "نوع الهوائي", val: "AESA مصفوفة طورية نشطة ثنائية النطاق S/X" },
        { label: "مدى الكشف الجوي", val: "120 كم (للطائرات)، 35 كم (للمسيرات الصغيرة)" },
        { label: "زاوية المسح", val: "360° سمتية، -10° إلى +85° ارتفاع" },
        { label: "العزل الكهرومغناطيسي", val: "قفص فاراداي مزدوج حماية MIL-STD-188-125" },
      ],
    },
    ciws: {
      title: "البرج الثاني: رشاش مدفعي ثنائي الإطلاق موجه آلياً بالليزر",
      desc: "مدفعية دفاع جوي مؤتمتة ثنائية السبطانات عيار 35 ملم مع نظام تلقيم هيدروليكي، متقرنة بالرادار وغرفة القيادة، تعتمد على التوجيه الليزري الفائق وذخائر شظايا السحب الهوائية AHEAD لتفتيت أسراب المسيرات.",
      specs: [
        { label: "العيار ونوع الذخيرة", val: "35x228 ملم (AHEAD مبرمجة الشظايا التنجستن)" },
        { label: "كثافة النيران", val: "1,600 طلقة/دقيقة (800 طلقة/دقيقة لكل سبطانة)" },
        { label: "مدى الاشتباك الفعال", val: "4,500 متر ضد الأهداف الجوية" },
        { label: "آلية التوجيه", val: "شعاع ليزري متراكب (Laser Beam-Rider) مقترن بالرادار" },
      ],
    },
    tower3: {
      title: `البرج الثالث: ${
        towerThreeChoice === "laser"
          ? "مدفع ليزر موجه عالي الطاقة (100 kW HEL)"
          : towerThreeChoice === "missiles"
          ? "بطارية صواريخ اعتراضية عمودية (SHORAD / MRAD VLS)"
          : "مدفع رشاش ثنائي إضافي كثيف النيران"
      }`,
      desc:
        towerThreeChoice === "laser"
          ? "سلاح طاقة موجهة صامت وفوري يطلق حزمة ليزر ليفية مركزة (Fiber Laser) لإحراق رؤوس الصواريخ ومستشعرات المسيرات في أجزاء من الثانية بتكلفة منخفضة لكل إطلاق."
          : towerThreeChoice === "missiles"
          ? "منظومة إطلاق عمودية VLS تحتوي على 8 إلى 16 صاروخاً اعتراضياً للاشتباك مع صواريخ الكروز السريعة والمقاتلات على مدى يصل إلى 40 كم قبل وصولها لمنطقة القتل القريبة."
          : "مدفع رشاش ثنائي متطور ثانٍ لتحقيق كثافة نارية مزدوجة مضاعفة لتمزيق الهجمات التشبعية المنسقة من أسراب الدرونز الانتحارية.",
      specs:
        towerThreeChoice === "laser"
          ? [
              { label: "القدرة الضوئية", val: "100 كيلوواط حزمة ألياف ليزر متصلة" },
              { label: "مدى التدمير", val: "حتى 5 كم ضد الدرونز والمقذوفات" },
              { label: "زمن التحويل", val: "فوري بسرعة الضوء (300,000 كم/ث)" },
              { label: "مصدر الطاقة", val: "شحن فائق من خط النقل + بطاريات LTO" },
            ]
          : towerThreeChoice === "missiles"
          ? [
              { label: "عدد الصوامع", val: "12 خلية إطلاق عمودي VLS معيارية" },
              { label: "مدى الصواريخ", val: "15 كم إلى 40 كم (سرعة ماخ 3.5)" },
              { label: "نوع التوجيه", val: "راداري نشط + توجيه بالقصور الذاتي مع وصلة بيانات" },
              { label: "زمن رد الفعل", val: "< 1.8 ثانية من أمر الإطلاق" },
            ]
          : [
              { label: "كثافة النيران المجمعة", val: "3,200 طلقة/دقيقة للمنظومة مع البرج الثاني" },
              { label: "مخزون الذخيرة", val: "2,400 طلقة مع مبرد هيدروليكي" },
              { label: "قوس التغطية", val: "360 درجة نيران متقاطعة" },
              { label: "التحكم", val: "إدارة نيران ذكية توزع الأهداف تلقائياً" },
            ],
    },
    shock_base: {
      title: "قواعد امتصاص الارتداد والاهتزازات الهيدروليكية",
      desc: "منظومة ميكانيكية مركبة في مفاصل برج الضغط العالي تمتص 88% من قوى ارتداد الرشاشات والانفجارات الصوتية وتمنع تشوه الأعمدة الفولاذية الشبكية أو انقطاع أسلاك الكهرباء.",
      specs: [
        { label: "كفاءة التخميد", val: "تخفيض 88% من قوى العزم الارتدادي" },
        { label: "نوع الممتصات", val: "أسطوانات هيدروليكية نيتروجينية + عوازل إيلاستوميرية" },
        { label: "تثبيت الأساسات", val: "أوتاد خرسانية مسلحة بعمق 18 متراً في الصخور/الرمال" },
        { label: "التحمل الديناميكي", val: "مقاومة رياح 180 كم/س واهتزازات التردد 12Hz" },
      ],
    },
    lightning: {
      title: "مشتتات الصواعق الأيونية وشبكة التأريض العميقة",
      desc: "رؤوس تفريغ أيوني مبكر (Early Streamer Emission) مثبتة في أعلى الأبراج لتشتيت الشحنات قبل تكون الصاعقة، مع مسارات تفريغ نحاسية مستقلة تماماً عن دوائر السلاح وخطوط الطاقة.",
      specs: [
        { label: "مقاومة التأريض", val: "< 0.8 أوم (آبار تأريض كيميائي عميقة)" },
        { label: "سعة تيار الصاعقة", val: "تحمل صدمات حتى 250 كيلو أمبير (kA)" },
        { label: "العوازل", val: "عوازل خزفية وبوليميرية 500 ك.ف للمنصة العسكرية" },
        { label: "الحماية النبضية EMP", val: "حماية إلكترونية كاملة ضد النبضة الكهرومغناطيسية" },
      ],
    },
    pylon_power: {
      title: "استجرار الطاقة الحثي وعوازل خطوط الضغط العالي 380kV",
      desc: "استغلال الطاقة الكهربائية الهائلة المارة في خطوط النقل عبر محولات حثية معزولة لتشغيل المنظومات بدون انقطاع، مدعومة بمولدات ديزل صامتة وبطاريات تيتانات الليثيوم للعمل المستقل.",
      specs: [
        { label: "الجهد المشغل", val: "380 إلى 500 كيلو فولت (جهد فائق)" },
        { label: "الطاقة الاحتياطية", val: "مولد توربيني APU يعمل 120 ساعة متواصلة" },
        { label: "العزل المغناطيسي", val: "صفائح Mu-Metal لعزل الحقول المغناطيسية الشديدة" },
        { label: "الألياف الضوئية", val: "خط اتصال OPGW مدمج في سلك التأريض العلوي" },
      ],
    },
  };

  const currentHotspot = selectedHotspot ? hotspots[selectedHotspot as keyof typeof hotspots] : null;

  const selectedSystem =
    saudiDefenseArsenal.find((s) => s.id === selectedSaudiSystemId) || saudiDefenseArsenal[1];

  const filteredSystems = saudiDefenseArsenal.filter((sys) => {
    if (activeFilterCategory === "local") return sys.origin === "local_saudi";
    if (activeFilterCategory === "imported") return sys.origin === "imported_active";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Main Integrated Navigator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2 flex-1 min-w-0 w-full">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/50 text-emerald-300 font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>التبويب المدمج الشامل</span>
              </span>
              <span className="text-slate-400">|</span>
              <span>المخطط الهيكلي ومخططات البناء والتجهيز والمواصفات الميكانيكية والإنشائية</span>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold font-display text-white tracking-tight leading-snug">
              المخطط الهيكلي والمواصفات الميكانيكية والإنشائية لمنظومة أبراج الحصن
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              مرجع هندسي وميكانيكي متكامل يدمج المخططات الهيكلية CAD، والمواصفات القياسية للبناء والتجهيز،
              ومحاكاة التثبيت على خطوط الجهد الفائق 380kV، واستعراض الترسانة العسكرية الوطنية لتوطين الصناعات الدفاعية.
            </p>
          </div>

          <button
            onClick={() => setShowPrintModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-lg flex items-center gap-2 shrink-0 active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة وتصدير المخطط الهندسي (.pdf)</span>
          </button>
        </div>

        {/* Primary Segment Navigation Bar (5 Modules) */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs font-semibold">
          <button
            onClick={() => setActiveSegment("structural_architecture")}
            className={`p-3 rounded-xl border transition-all text-right flex items-center justify-between cursor-pointer ${
              activeSegment === "structural_architecture"
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/50"
                : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="block font-bold">1. المخطط الهيكلي للأبراج</span>
                <span className="text-[10px] text-slate-400 font-mono">العناصر والمكونات</span>
              </div>
            </div>
            {activeSegment === "structural_architecture" && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
          </button>

          <button
            onClick={() => setActiveSegment("cad_blueprint")}
            className={`p-3 rounded-xl border transition-all text-right flex items-center justify-between cursor-pointer ${
              activeSegment === "cad_blueprint"
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/50"
                : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-teal-400 shrink-0" />
              <div>
                <span className="block font-bold">2. مخططات CAD</span>
                <span className="text-[10px] text-slate-400 font-mono">الدوائر والتغطية 360°</span>
              </div>
            </div>
            {activeSegment === "cad_blueprint" && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
          </button>

          <button
            onClick={() => setActiveSegment("mechanical_kinematics")}
            className={`p-3 rounded-xl border transition-all text-right flex items-center justify-between cursor-pointer ${
              activeSegment === "mechanical_kinematics"
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/50"
                : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="block font-bold">3. المحاكاة والرمي</span>
                <span className="text-[10px] text-slate-400 font-mono">اختبار الارتداد والحركة</span>
              </div>
            </div>
            {activeSegment === "mechanical_kinematics" && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
          </button>

          <button
            onClick={() => setActiveSegment("saudi_arsenal")}
            className={`p-3 rounded-xl border transition-all text-right flex items-center justify-between cursor-pointer ${
              activeSegment === "saudi_arsenal"
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/50"
                : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <span className="block font-bold">4. الترسانة السعودية</span>
                <span className="text-[10px] text-slate-400 font-mono">توطين رؤية 2030</span>
              </div>
            </div>
            {activeSegment === "saudi_arsenal" && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
          </button>

          <button
            onClick={() => setActiveSegment("construction_specs")}
            className={`p-3 rounded-xl border transition-all text-right flex items-center justify-between cursor-pointer ${
              activeSegment === "construction_specs"
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/50"
                : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <span className="block font-bold">5. مواصفات البناء</span>
                <span className="text-[10px] text-slate-400 font-mono">جدول الأحمال والأساسات</span>
              </div>
            </div>
            {activeSegment === "construction_specs" && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
          </button>
        </div>
      </div>

      {/* SEGMENT 0: STRUCTURAL ARCHITECTURE OF THE FORTRESS PYLONS */}
      {activeSegment === "structural_architecture" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">المخطط الهيكلي لمنظومة أبراج الحصن للدفاع الجوي</span>
                <h2 className="text-xl font-bold text-white">العناصر الإنشائية والميكانيكية والمحمية للأبراج</h2>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>معامل الأمان الإنشائي: <strong className="text-emerald-400 font-mono">98.4%</strong></span>
              </div>
            </div>

            {/* Grid of 6 structural components */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {structuralComponentsList.map((part) => {
                const isSelected = selectedStructuralPartId === part.id;
                return (
                  <div
                    key={part.id}
                    onClick={() => setSelectedStructuralPartId(part.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer text-right flex flex-col justify-between ${
                      isSelected
                        ? "bg-emerald-950/40 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/50"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-emerald-400 font-bold">
                          {part.code}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{part.elevation}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{part.name}</h3>
                      <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">{part.tagline}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">{part.material.slice(0, 32)}...</span>
                      <span className={`font-bold ${isSelected ? "text-emerald-400" : "text-slate-400"}`}>
                        {isSelected ? "معروض حالياً" : "عرض التفاصيل ←"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Inspector for Selected Structural Part */}
          {selectedStructuralPart && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-950 border border-emerald-700/50 text-emerald-300 font-bold">
                      {selectedStructuralPart.code}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">{selectedStructuralPart.name}</h3>
                  </div>
                  <div className="text-left font-mono">
                    <span className="text-xs text-slate-400 block">هامش الأمان</span>
                    <span className="text-lg font-extrabold text-emerald-400">{selectedStructuralPart.safetyMargin}%</span>
                  </div>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{selectedStructuralPart.tagline}</p>

                {/* SubTabs for Structural Details */}
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <button
                    onClick={() => setStructuralSubTab("specs")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      structuralSubTab === "specs" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    المواصفات والقياسات الدقيقة
                  </button>
                  <button
                    onClick={() => setStructuralSubTab("capabilities")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      structuralSubTab === "capabilities" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    الوظائف والقدرات التكتيكية
                  </button>
                  <button
                    onClick={() => setStructuralSubTab("evolution")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      structuralSubTab === "evolution" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    التطوير التاريخي (WW2 إلى 2030)
                  </button>
                </div>

                {structuralSubTab === "specs" && (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[11px] block">الموقع والارتفاع الهيكلي:</span>
                      <span className="text-white font-medium">{selectedStructuralPart.elevation}</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[11px] block">المادة المصنعة والسبائك:</span>
                      <span className="text-emerald-300 font-medium">{selectedStructuralPart.material}</span>
                    </div>
                    <div className="border border-slate-800 rounded-xl p-3 bg-slate-950/60 space-y-2">
                      <span className="text-slate-300 font-bold block mb-1">جدول المواصفات الفنية:</span>
                      <div className="space-y-1.5 font-mono text-[11px]">
                        {Object.entries(selectedStructuralPart.specs).map(([k, v]) => (
                          <div key={k} className="flex justify-between border-b border-slate-800/60 pb-1">
                            <span className="text-slate-400">{k}:</span>
                            <span className="text-white font-semibold text-left">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {structuralSubTab === "capabilities" && (
                  <div className="space-y-3 text-xs">
                    <span className="text-slate-300 font-semibold block">المهام والقدرات الميدانية:</span>
                    <ul className="space-y-2.5">
                      {selectedStructuralPart.capabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-slate-200 leading-relaxed">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {structuralSubTab === "evolution" && (
                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="p-4 bg-amber-950/30 border border-amber-700/50 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                        <Sparkles className="w-4 h-4" />
                        <span>كيف تم التطوير من أبراج Flak في الحرب العالمية الثانية إلى أبراج الحصن السعودية؟</span>
                      </div>
                      <p className="text-slate-200 text-xs leading-relaxed">
                        {selectedStructuralPart.developmentEvolution}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Side Summary Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs font-mono text-emerald-400 font-bold block">ملخص الخصائص الميكانيكية</span>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">مقاومة الإجهاد القصوى:</span>
                      <span className="text-emerald-400 font-bold">{selectedStructuralPart.stressResistance}</span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">فئة العنصر:</span>
                      <span className="text-teal-400 font-bold uppercase">{selectedStructuralPart.category}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-slate-300 leading-relaxed">
                  هذا العنصر مصمم وفق أعلى المعايير الهندسية العسكرية ومقاوم للظروف البيئية القاسية في الصحراء والساحل.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SEGMENT 1: CAD STRUCTURAL BLUEPRINT & HOTSPOTS */}
      {activeSegment === "cad_blueprint" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
              <Crosshair className="w-4 h-4" />
              <span>لوحات الرسم الهندسي CAD وتوزيع النقاط الحيوية</span>
            </span>

            {/* Layer Toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveLayer("cluster")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeLayer === "cluster" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                المجموعة الثلاثية التكتيكية
              </button>
              <button
                onClick={() => setActiveLayer("cross_section")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeLayer === "cross_section" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                مقطع تثبيت السلاح CAD
              </button>
              <button
                onClick={() => setActiveLayer("kill_zone")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  activeLayer === "kill_zone" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                مضلع التغطية النارية 360°
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Interactive CAD Diagram Canvas (8 Cols) */}
            <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative min-h-[500px]">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3 text-xs font-mono">
                <span className="text-slate-300 font-bold">
                  {activeLayer === "cluster" && "المجموعة الثلاثية التكتيكية (3-TOWER CLUSTER INTERCONNECT)"}
                  {activeLayer === "cross_section" && "المقطع الإنشائي لتثبيت السلاح على برج الضغط العالي (ELEVATION CROSS-SECTION)"}
                  {activeLayer === "kill_zone" && "مضلع التغطية والرصد الراداري المتقاطع (INTERLOCKING KILL ZONES)"}
                </span>
                <span className="text-emerald-400">مقياس CAD 1:250</span>
              </div>

              {/* Vector SVG Viewport */}
              <div className="flex-1 flex items-center justify-center relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] overflow-hidden rounded-lg border border-slate-900 select-none">
                {activeLayer === "cluster" && (
                  <svg viewBox="0 0 900 520" className="w-full h-full max-h-[480px]">
                    <defs>
                      <linearGradient id="pylonGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
                      </linearGradient>
                      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                      </pattern>
                    </defs>

                    <rect width="900" height="520" fill="url(#gridPattern)" />

                    {/* Ground plane */}
                    <line x1="50" y1="440" x2="850" y2="440" stroke="#334155" strokeWidth="3" />
                    <path d="M 50 440 L 850 440 L 850 500 L 50 500 Z" fill="#0f172a" fillOpacity="0.6" />

                    {/* Power Lines Catenary curves */}
                    <path d="M 50 180 Q 250 250, 450 180 T 850 180" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />
                    <path d="M 50 210 Q 250 280, 450 210 T 850 210" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />
                    <path d="M 50 240 Q 250 310, 450 240 T 850 240" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" />

                    {/* Ground fiber optic umbilical line */}
                    <line x1="180" y1="450" x2="450" y2="450" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="6 3" />
                    <line x1="450" y1="450" x2="720" y2="450" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="6 3" />
                    <text x="315" y="465" fill="#06b6d4" fontSize="10" fontFamily="monospace" textAnchor="middle">كابل ألياف ضوئية مؤمن OPGW</text>
                    <text x="585" y="465" fill="#06b6d4" fontSize="10" fontFamily="monospace" textAnchor="middle">وصلة القيادة المحصنة</text>

                    {/* High Voltage Label */}
                    <rect x="360" y="275" width="180" height="24" rx="4" fill="#78350f" fillOpacity="0.8" stroke="#f59e0b" strokeWidth="1" />
                    <text x="450" y="291" fill="#fef3c7" fontSize="11" fontWeight="bold" textAnchor="middle">
                      خطوط ضغط فائق 380,000 فولت
                    </text>

                    {/* TOWER 1: RADAR */}
                    <g className="cursor-pointer" onClick={() => setSelectedHotspot("radar")}>
                      <rect x="140" y="420" width="80" height="20" rx="3" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                      <circle cx="155" cy="430" r="5" fill="#10b981" />
                      <circle cx="205" cy="430" r="5" fill="#10b981" />
                      <path d="M 150 420 L 170 120 L 190 120 L 210 420 Z" fill="url(#pylonGrad)" stroke="#10b981" strokeWidth="1.5" />
                      <circle cx="180" cy="100" r="22" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                      <circle cx="180" cy="100" r="8" fill="#10b981" />
                      <text x="180" y="60" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">البرج 1: رادار 4D AESA</text>
                    </g>

                    {/* TOWER 2: CIWS */}
                    <g className="cursor-pointer" onClick={() => setSelectedHotspot("ciws")}>
                      <rect x="410" y="420" width="80" height="20" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                      <path d="M 420 420 L 440 120 L 460 120 L 480 420 Z" fill="url(#pylonGrad)" stroke="#f59e0b" strokeWidth="1.5" />
                      <rect x="430" y="90" width="40" height="25" rx="4" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
                      <line x1="470" y1="98" x2="505" y2="88" stroke="#fef3c7" strokeWidth="3.5" />
                      <line x1="470" y1="107" x2="505" y2="97" stroke="#fef3c7" strokeWidth="3.5" />
                      <text x="450" y="60" fill="#fef3c7" fontSize="11" fontWeight="bold" textAnchor="middle">البرج 2: مدفع رشاش 35mm</text>
                    </g>

                    {/* TOWER 3: WEAPON CHOICE */}
                    <g className="cursor-pointer" onClick={() => setSelectedHotspot("tower3")}>
                      <rect x="680" y="420" width="80" height="20" rx="3" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.5" />
                      <path d="M 690 420 L 710 120 L 730 120 L 750 420 Z" fill="url(#pylonGrad)" stroke="#06b6d4" strokeWidth="1.5" />
                      <circle cx="720" cy="98" r="18" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                      <text x="720" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                        البرج 3: {towerThreeChoice === "laser" ? "مدفع ليزر 100kW" : towerThreeChoice === "missiles" ? "صواريخ VLS" : "رشاش ثنائي 35mm"}
                      </text>
                    </g>

                    {/* Lightning Rod Terminal Hotspot */}
                    <g className="cursor-pointer" onClick={() => setSelectedHotspot("lightning")}>
                      <line x1="180" y1="78" x2="180" y2="35" stroke="#38bdf8" strokeWidth="2.5" />
                      <circle cx="180" cy="35" r="4" fill="#38bdf8" />
                    </g>

                    {/* Shock Absorber Base Hotspot */}
                    <g className="cursor-pointer" onClick={() => setSelectedHotspot("shock_base")}>
                      <rect x="410" y="405" width="80" height="15" rx="3" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
                      <text x="450" y="416" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">قواعد التخميد</text>
                    </g>
                  </svg>
                )}

                {activeLayer === "cross_section" && (
                  <svg viewBox="0 0 900 520" className="w-full h-full max-h-[480px]">
                    <rect width="900" height="520" fill="#020617" />
                    <line x1="100" y1="460" x2="800" y2="460" stroke="#334155" strokeWidth="3" />

                    {/* Monocoque Spine Tube */}
                    <rect x="430" y="90" width="40" height="370" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 3" />
                    <text x="450" y="280" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(-90 450 280)">
                      العمود الأنبوبي المركزي (Monocoque Spine Ø 450mm)
                    </text>

                    {/* Top Armored Gun Platform */}
                    <rect x="340" y="70" width="220" height="22" rx="4" fill="#047857" stroke="#34d399" strokeWidth="2" />
                    <text x="450" y="85" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">منصة الاشتباك المحصنة (4.2م × 4.2م)</text>

                    {/* 3-Axis Gyroscopic Stabilization Turret */}
                    <circle cx="450" cy="50" r="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="450" y1="50" x2="510" y2="35" stroke="#fef3c7" strokeWidth="4" />

                    {/* Base Shock MR Dampers */}
                    <rect x="330" y="440" width="240" height="20" rx="3" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                    <text x="450" y="454" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">ممتصات الصدمات الهيدروليكية (MR Dampers)</text>

                    {/* Micro-Piles Foundation */}
                    <rect x="350" y="460" width="30" height="50" fill="#334155" stroke="#10b981" strokeWidth="1" />
                    <rect x="520" y="460" width="30" height="50" fill="#334155" stroke="#10b981" strokeWidth="1" />
                    <text x="450" y="490" fill="#94a3b8" fontSize="10" textAnchor="middle">أوتاد الخرسانة الصخرية 18م</text>
                  </svg>
                )}

                {activeLayer === "kill_zone" && (
                  <svg viewBox="0 0 900 520" className="w-full h-full max-h-[480px]">
                    <rect width="900" height="520" fill="#020d08" />

                    {/* Concentric Range Rings */}
                    <circle cx="450" cy="260" r="220" fill="none" stroke="#065f46" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="450" cy="260" r="150" fill="none" stroke="#047857" strokeWidth="1.2" />
                    <circle cx="450" cy="260" r="80" fill="none" stroke="#10b981" strokeWidth="1.5" />

                    {/* Interlocking 3-Tower Triangulated Kill Polygons */}
                    <polygon points="320,180 580,180 450,380" fill="#10b981" fillOpacity="0.15" stroke="#34d399" strokeWidth="2" />

                    <circle cx="320" cy="180" r="10" fill="#10b981" />
                    <circle cx="580" cy="180" r="10" fill="#f59e0b" />
                    <circle cx="450" cy="380" r="10" fill="#06b6d4" />

                    <text x="320" y="160" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">البرج 1 (AESA)</text>
                    <text x="580" y="160" fill="#fef3c7" fontSize="11" fontWeight="bold" textAnchor="middle">البرج 2 (35mm)</text>
                    <text x="450" y="405" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">البرج 3 (تكتيكي)</text>

                    <text x="450" y="265" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">
                      منطقة القتل المتقاطعة 360° دون نقاط عمياء
                    </text>
                  </svg>
                )}
              </div>
            </div>

            {/* Hotspot Inspector Sidebar (4 Cols) */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
              {currentHotspot ? (
                <div className="space-y-3">
                  <div className="border-b border-slate-800 pb-2.5">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase block">
                      فحص الجزء المكتشف
                    </span>
                    <h3 className="text-base font-bold font-display text-white mt-0.5">
                      {currentHotspot.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentHotspot.desc}
                  </p>

                  {/* Hotspot Specs Table */}
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-emerald-300 block">المواصفات والقياسات الحجمية:</span>
                    <div className="space-y-1.5 text-[11px] font-mono">
                      {currentHotspot.specs.map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-slate-800/60 pb-1">
                          <span className="text-slate-400">{item.label}:</span>
                          <span className="text-white font-semibold text-left">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tower 3 Mode Selector Options */}
                  {selectedHotspot === "tower3" && (
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-amber-400 block">تكوين البرج الثالث الفرعي:</span>
                      <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                        <button
                          onClick={() => setTowerThreeChoice("laser")}
                          className={`py-1.5 px-2 rounded-lg border transition-all ${
                            towerThreeChoice === "laser"
                              ? "bg-sky-500 text-slate-950 border-sky-400"
                              : "bg-slate-950 text-slate-400 border-slate-800"
                          }`}
                        >
                          ليزر HEL
                        </button>
                        <button
                          onClick={() => setTowerThreeChoice("missiles")}
                          className={`py-1.5 px-2 rounded-lg border transition-all ${
                            towerThreeChoice === "missiles"
                              ? "bg-purple-600 text-white border-purple-400"
                              : "bg-slate-950 text-slate-400 border-slate-800"
                          }`}
                        >
                          صواريخ VLS
                        </button>
                        <button
                          onClick={() => setTowerThreeChoice("ciws")}
                          className={`py-1.5 px-2 rounded-lg border transition-all ${
                            towerThreeChoice === "ciws"
                              ? "bg-amber-500 text-slate-950 border-amber-400"
                              : "bg-slate-950 text-slate-400 border-slate-800"
                          }`}
                        >
                          رشاش 35mm
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 text-xs">
                  انقر على أي برج أو جزء في المخطط لاستعراض مواصفاته الهندسية.
                </div>
              )}

              {onNavigateToSimulator && (
                <button
                  onClick={onNavigateToSimulator}
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>انتقل لمحاكاة الاشتباك التكتيكي الحي</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SEGMENT 2: MECHANICAL KINEMATICS & FIRING TEST */}
      {activeSegment === "mechanical_kinematics" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                <Gauge className="w-4 h-4" />
                <span>المحاكاة الميكانيكية والاختبار الديناميكي للرمي</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                محاكي حركة البرج والتحكم في الارتفاع والسمت مع التهديف الحي
              </h3>
            </div>

            {/* Tower Selection Buttons */}
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setSelectedTower("tower1")}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedTower === "tower1" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                البرج 1 (AESA)
              </button>
              <button
                onClick={() => setSelectedTower("tower2")}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedTower === "tower2" ? "bg-amber-500 text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                البرج 2 (الرشاش)
              </button>
              <button
                onClick={() => setSelectedTower("tower3")}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedTower === "tower3" ? "bg-sky-500 text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                البرج 3 ({towerThreeChoice === "laser" ? "ليزر" : towerThreeChoice === "missiles" ? "صواريخ" : "رشاش"})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visual Kinematic Turret Render Viewport (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden">
              {/* Scanline Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none" />

              {/* Dynamic Turret Kinematic Render with Recoil Translation */}
              <div
                className="relative transition-transform duration-75"
                style={{
                  transform: `translateX(${-recoilKick}px) rotate(${turretElevation * 0.1}deg)`,
                }}
              >
                <svg viewBox="0 0 300 220" className="w-64 h-52">
                  <defs>
                    <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  {/* Tower Top Platform Base */}
                  <rect x="50" y="180" width="200" height="25" rx="5" fill="#1e293b" stroke="#059669" strokeWidth="2" />
                  <line x1="60" y1="180" x2="240" y2="180" stroke="#34d399" strokeWidth="3" />

                  {/* Rotating Turret Pedestal Body */}
                  <ellipse cx="150" cy="160" rx="60" ry="20" fill="url(#metalGrad)" stroke="#10b981" strokeWidth="2" />
                  <rect x="110" y="110" width="80" height="50" rx="8" fill="#0f172a" stroke="#34d399" strokeWidth="2" />

                  {/* Gun Barrel / Laser Aperture / Missile Pod with Dynamic Elevation */}
                  <g transform={`rotate(${-turretElevation}, 150, 130)`}>
                    {selectedTower === "tower2" || (selectedTower === "tower3" && towerThreeChoice === "ciws") ? (
                      <g>
                        <line x1="170" y1="122" x2="270" y2="122" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
                        <line x1="170" y1="138" x2="270" y2="138" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
                        {testFiring && (
                          <g>
                            <circle cx="280" cy="122" r="14" fill="#f59e0b" className="animate-ping" />
                            <circle cx="280" cy="138" r="14" fill="#ef4444" className="animate-ping" />
                          </g>
                        )}
                      </g>
                    ) : selectedTower === "tower3" && towerThreeChoice === "laser" ? (
                      <g>
                        <rect x="170" y="118" width="80" height="24" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                        <circle cx="250" cy="130" r="10" fill="#38bdf8" />
                        {testFiring && (
                          <line x1="250" y1="130" x2="350" y2="130" stroke="#38bdf8" strokeWidth="6" className="animate-pulse" />
                        )}
                      </g>
                    ) : selectedTower === "tower3" && towerThreeChoice === "missiles" ? (
                      <g>
                        <rect x="160" y="105" width="85" height="50" rx="4" fill="#4c1d95" stroke="#c084fc" strokeWidth="2" />
                        <circle cx="240" cy="120" r="6" fill="#c084fc" />
                        <circle cx="240" cy="140" r="6" fill="#c084fc" />
                        {missileLaunchState && (
                          <circle cx="270" cy="120" r="20" fill="#f59e0b" className="animate-ping" />
                        )}
                      </g>
                    ) : (
                      /* Radar Tower 1 Head */
                      <g>
                        <circle cx="150" cy="100" r="30" fill="#065f46" stroke="#34d399" strokeWidth="2.5" />
                        <circle cx="150" cy="100" r="12" fill="#10b981" />
                      </g>
                    )}
                  </g>
                </svg>
              </div>

              {/* Angle Readouts Overlay */}
              <div className="absolute top-3 right-3 text-xs font-mono text-emerald-400 bg-slate-900/90 p-2 rounded-lg border border-slate-800">
                <div>السمت (Azimuth): {Math.round(turretAzimuth)}°</div>
                <div>الارتفاع (Elevation): {Math.round(turretElevation)}°</div>
              </div>
            </div>

            {/* Controls & Kinematics Slider Panel (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <span className="font-bold text-white block border-b border-slate-800 pb-2">
                  تحكم التوجيه والمسح الآلي:
                </span>

                {/* Elevation Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-slate-300">
                    <span>زاوية الارتفاع:</span>
                    <span className="text-emerald-400 font-bold">{Math.round(turretElevation)}°</span>
                  </div>
                  <input
                    type="range"
                    min="-15"
                    max="85"
                    value={turretElevation}
                    onChange={(e) => setTurretElevation(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Azimuth Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between font-mono text-slate-300">
                    <span>قوس الدوران الأفقي (360°):</span>
                    <span className="text-amber-400 font-bold">{Math.round(turretAzimuth)}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={turretAzimuth}
                    onChange={(e) => setTurretAzimuth(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setAutoScanActive(!autoScanActive)}
                    className={`py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                      autoScanActive
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {autoScanActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{autoScanActive ? "إيقاف المسح" : "مسح آلي 360°"}</span>
                  </button>

                  <button
                    onClick={handleTestBurst}
                    disabled={testFiring}
                    className="py-2 px-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>إطلاق رشق تجريبي</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEGMENT 3: SAUDI MILITARY ARSENAL & LOCALIZATION (% Vision 2030) */}
      {activeSegment === "saudi_arsenal" && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                  <Award className="w-4 h-4" />
                  <span>توطين الصناعات العسكرية · رؤية المملكة 2030</span>
                </div>
                <h3 className="text-xl font-bold font-display text-white">
                  الترسانة والأنظمة الدفاعية المعتمدة لحصون الدفاع الجوي
                </h3>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                <button
                  onClick={() => setActiveFilterCategory("all")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeFilterCategory === "all" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  الكل ({saudiDefenseArsenal.length})
                </button>
                <button
                  onClick={() => setActiveFilterCategory("local")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeFilterCategory === "local" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  صناعة سعودية (SAMI)
                </button>
                <button
                  onClick={() => setActiveFilterCategory("imported")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeFilterCategory === "imported" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"
                  }`}
                >
                  أنظمة عاملة بالدفاع الجوي
                </button>
              </div>
            </div>

            {/* Grid of Defense Systems Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSystems.map((sys) => {
                const isSelected = selectedSaudiSystemId === sys.id;
                return (
                  <div
                    key={sys.id}
                    onClick={() => setSelectedSaudiSystemId(sys.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? "bg-emerald-950/70 border-emerald-500 shadow-xl ring-1 ring-emerald-500/50"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          sys.origin === "local_saudi" ? "bg-emerald-900/80 text-emerald-300 border border-emerald-600/50" : "bg-sky-950 text-sky-300 border border-sky-700/50"
                        }`}>
                          {sys.origin === "local_saudi" ? "🇸🇦 توطين سعودي" : "أنظمة حليفة معتمدة"}
                        </span>
                        <span className="text-amber-400 font-bold">{sys.localizationRate}</span>
                      </div>

                      <h4 className="font-bold text-white text-sm leading-snug">{sys.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{sys.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 font-mono text-[10px] space-y-1 text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-500">المدى الفعال:</span>
                        <span className="text-emerald-400 font-bold">{sys.effectiveRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">القدرة / العيار:</span>
                        <span className="text-sky-300 font-bold">{sys.caliberOrPower}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected System Detailed Inspector Panel */}
            {selectedSystem && (
              <div className="mt-6 bg-slate-950 border border-emerald-500/40 rounded-xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      {selectedSystem.manufacturer}
                    </span>
                    <h3 className="text-lg font-bold text-white font-display mt-0.5">
                      {selectedSystem.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700/50 rounded-lg font-bold self-start sm:self-auto">
                    نسبة التوطين: {selectedSystem.localizationRate}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">المدى العملياتي:</span>
                    <span className="text-emerald-400 font-bold text-sm">{selectedSystem.effectiveRange}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">كثافة الإطلاق:</span>
                    <span className="text-amber-400 font-bold text-sm">{selectedSystem.rateOfFire}</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">نوع الذخيرة والقدرة:</span>
                    <span className="text-sky-300 font-bold text-sm">{selectedSystem.ammoTypeOrPayload}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-200 block">الميزات والقدرات القتالية الخاصة:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedSystem.advantages.map((adv, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800/80 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300 leading-relaxed text-[11px]">{adv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEGMENT 4: CONSTRUCTION SPECS & MECHANICAL ASSEMBLY TABLE */}
      {activeSegment === "construction_specs" && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
              <Layers className="w-4 h-4" />
              <span>جدول المعايير الإنشائية والتجهيز الميكانيكي (SBC 301 Standards)</span>
            </div>
            <h3 className="text-xl font-bold font-display text-white">
              مخطط البناء والتركيب والمواصفات الميكانيكية والهندسية الكاملة
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/90 text-slate-300">
                  <th className="py-3 px-4 font-semibold">المكون الإنشائي والميكانيكي</th>
                  <th className="py-3 px-4 font-semibold text-emerald-400">المواصفة الفنية والسبائك</th>
                  <th className="py-3 px-4 font-semibold text-amber-400">تحمل الإجهاد والأحمال</th>
                  <th className="py-3 px-4 font-semibold text-sky-400">الوظيفة والاعتمادية</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono text-[11px]">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">1. الأساسات والأوتاد (18m Micro-Piles)</td>
                  <td className="py-3 px-4 text-slate-300">خرسانة Type V مقاومة للكبريتات + أوتاد صلب محقونة 18م</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">450 طن ضغط / 320 طن شد وانقلاب</td>
                  <td className="py-3 px-4 text-slate-400">تثبيت جيوتقني عميق في الطبقات الصخرية لمنع الهبوط التفاضلي</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">2. ممتصات الصدمات (MR Dampers)</td>
                  <td className="py-3 px-4 text-slate-300">سوائل مغناطيسية متغيرة اللزوجة مع نيوبرين مسلح</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">تخميد 92.4% من ارتداد المدافع</td>
                  <td className="py-3 px-4 text-slate-400">عزل كامل للاهتزازات والانفجارات الصوتية عن خطوط الضغط العالي</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">3. الخلوص العازل (Dielectric Clearance)</td>
                  <td className="py-3 px-4 text-slate-300">مسافة خلوص هوائي 8.50 أمتار حرة مع حواجز كورونا</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">جهد صمود 1,425 kV نبضي</td>
                  <td className="py-3 px-4 text-slate-400">منع حدوث القوس الكهربائي (Arc Flash) أثناء حركة الأسلحة والمنصة</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">4. الهيكل الشبكي (Galvanized Steel Truss)</td>
                  <td className="py-3 px-4 text-slate-300">زوايا صلب إنشائي ASTM A572 Grade 50 جلفنة 120 ميكرون</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">رياح 180 كم/س (الكود السعودي SBC 301)</td>
                  <td className="py-3 px-4 text-slate-400">مقاومة العواصف الرملية والملوحة الساحلية لمدة 50 عاماً دون تآكل</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">5. طوق الاستجرار الحثي (380kV Power Tap)</td>
                  <td className="py-3 px-4 text-slate-300">محول حثي توريدي مع بطاريات LTO بسعة 180 kWh</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">قدرة مستمرة 150 kW لكل برج</td>
                  <td className="py-3 px-4 text-slate-400">توفير طاقة دائمة لا تنضب للرادارات ومدافع الليزر دون صيانة ديزل</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">6. كابل الألياف العسكري (OPGW 48-Core)</td>
                  <td className="py-3 px-4 text-slate-300">ألياف ضوئية مصفحة بالأنبوب الفولاذي مع سلك تأريض علوي</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">سرعة 100 Gbps وتفريغ 100 kA صواعق</td>
                  <td className="py-3 px-4 text-slate-400">ربط تشفيري معزول ضد الحرب الإلكترونية والتشويش اللاسلكي</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Print Options Modal Component */}
      {showPrintModal && (
        <PrintOptionsModal
          isOpen={showPrintModal}
          onClose={() => setShowPrintModal(false)}
          towerThreeChoice={towerThreeChoice}
        />
      )}
    </div>
  );
}
