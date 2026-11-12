"use client";

import React, { useState } from "react";
import {
  Layers, CheckCircle2, Shield, AlertTriangle, ArrowRight, Zap, Cpu, Activity,
  Sliders, Info, Sparkles, Target, Radio, Anchor, ShieldCheck, Gauge, HelpCircle
} from "lucide-react";

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
    elevation: "جسم البرج الخارجي الكامل (+0م إلى +100م)",
    material: "زوايا صلب إنشائي مجلفن بالغمر الساخن ASTM A572 Grade 50 مع تدعيم كربوني CFRP",
    specs: {
      "معيار التصميم الإنشائي": "الكود السعودي للمنشآت الفولاذية SBC 301 / ASCE 10-97",
      "مقاومة سرعة الرياح": "180 كم/ساعة (50 م/ثانية) مع عواصف رملية كثيفة",
      "سماكة الجلفنة": "120 ميكرون لمقاومة التآكل والصدأ لأكثر من 50 عاماً",
      "معامل الأمان الإنشائي": "2.40 ضعف أقصى حمولة مركبة (Wind + Dead + Live)",
      "التدعيم بالألياف الكربونية": "أربطة CFRP مسبقة الإجهاد على الوصلات الحرجة تزيد المتانة 45%",
    },
    capabilities: [
      "حمل كابلات خط الضغط العالي مع توفير غلاف حماية هندسي يحيط بالعمود الأنبوبي المركزي.",
      "تشتيت قوى الرياح الجانبية عبر مسارات الفراغات الشبكية المفتوحة لتقليل قوى السحب الهوائي (Drag Force).",
      "نقاط تثبيت سريعة لسلالم الصعود ومصاعد الصيانة التكتيكية.",
    ],
    developmentEvolution:
      "يمثل الهيكل الشبكي ثورة مقابل الجدران الخرسانية المصمتة القديمة؛ فهو يزن أقل من 3% من وزن برج الفلاك الخرساني، ويوفر مرونة ديناميكية في امتصاص الرياح والزلازل دون التعرض للشروخ الإنشائية.",
    safetyMargin: 95.5,
    stressResistance: "180 km/h Wind Load",
    color: "#64748b",
  },
  {
    id: "hydraulic_dampers",
    name: "ممتصات الصدمات الهيدروليكية والإيلاستوميرية (MR Dampers)",
    code: "DMP-ISO-07",
    category: "structure",
    tagline: "منظومة تخميد ذكية متغيرة اللزوجة تمتص 92% من ارتداد المدافع وقوى الزلازل",
    elevation: "قاعدة ارتكاز المنظومة فوق الأساسات (+0.5م إلى +3م)",
    material: "سوائل مغناطيسية متغيرة اللزوجة (Magnetorheological Fluid)، مطاط نيوبرين مسلح بصفائح صلب",
    specs: {
      "نسبة امتصاص الارتداد": "تخميد 92.4% من طاقة الصدمة الحركية الناتجة عن إطلاق المدافع",
      "زمن استجابة الصمام المغناطيسي": "أقل من 3 مللي ثانية (تعديل اللزوجة فورياً مع كل طلقة)",
      "سعة الإزاحة الميكانيكية": "±25 ملم مع استقرار وإخماد للاهتزاز في أقل من 0.12 ثانية",
      "العمر الافتراضي": "أكثر من 20 عاماً دون الحاجة لتغيير الزيوت الهيدروليكية",
      "نظام المراقبة": "حساسات بيزوكهربائية مدمجة تقيس إجهادات الارتداد في الزمن الفعلي",
    },
    capabilities: [
      "تحويل قوى الارتداد الانفجارية إلى طاقة حرارية مهدأة يتم تبديدها بأمان في القاعدة.",
      "عزل ترددات الرنين الميكانيكي ومنع وصولها إلى حساسات الرادار الدقيقة أو وصلات كابلات 380kV.",
      "استقرار إطلاق نار متواصل لـ 600 طلقة دون أي تراجع في دقة زاوية التهديف.",
    ],
    developmentEvolution:
      "تعتمد المنظومة على تقنية السوائل المغناطيسية الحديثة (MR Dampers) التي لم تكن موجودة في الأربعينيات، مما سمح بتركيب مدافع أوتوماتيكية ثقيلة على صلب شبكي دون الحاجة لقواعد خرسانية تزن آلاف الأطنان.",
    safetyMargin: 97.2,
    stressResistance: "92.4% Shock Attenuation",
    color: "#10b981",
  },
  {
    id: "deep_micropiles",
    name: "الأساسات الخرسانية المسلحة والأوتاد العميقة في الصخور (18m Micro-Piles)",
    code: "FND-PIL-08",
    category: "foundation",
    tagline: "تثبيت جيوتقني عميق في الطبقات الصخرية لمقاومة قوى الانقلاب والشد الشديدة",
    elevation: "باطن الأرض الصخرية الممتدة من سطح الأرض (-18م إلى 0م)",
    material: "خرسانة مسلحة بإسمنت بورتلاندي Type V المقاوم للكبريتات، وأوتاد صلب بقطر 200 ملم محقونة بروبة إسمنتية",
    specs: {
      "عمق الأوتاد الصخرية": "18 متراً محفورة ومحقونة في الصخر الصلب (Bedrock Anchor)",
      "سعة التحمل الرأسية": "450 طناً لكل وتد ضد قوى الضغط و 320 طناً ضد قوى الشد والانقلاب",
      "مصفوفة القواعد": "4 مجموعات أوتاد موزعة في أركان البرج مع قبعة خرسانية مسلحة (Pile Cap)",
      "شبكة التأريض الصخرية": "قضبان نحاسية إلكتروليتية تضمن تفريغ الصواعق في الطبقات الرطبة العميقة",
      "مقاومة التآكل الكيميائي": "حماية كاثودية مغذية بالتيار المستمر لمنع تآكل الصلب تحت الأرض",
    },
    capabilities: [
      "تثبيت البرج ضد أعتى العواصف والرياح الصحراوية دون أي هبوط تفاضلي (Differential Settlement).",
      "امتصاص قوى الشد الناتجة عن شد الكابلات الكهربائية ورد فعل مدافع الليزر والمقذوفات.",
      "تأريض كهربائي وصاعقي فائق الكفاءة يحمي كامل الشبكة المحيطة بالبرج.",
    ],
    developmentEvolution:
      "تقنية الأوتاد الدقيقة المحقونة (Micro-Piling) تتيح تنفيذ القواعد خلال 5 أيام فقط في أقسى التضاريس الصخرية والجبلية بالمملكة دون الحاجة لأعمال حفر ضخمة أو صب كميات خرسانة هائلة.",
    safetyMargin: 99.1,
    stressResistance: "450 Ton Load / 18m Anchor",
    color: "#64748b",
  },
  {
    id: "opgw_fiber",
    name: "سلك التأريض العلوي بالألياف الضوئية العسكرية (OPGW 48-Core)",
    code: "COM-FBR-09",
    category: "protection",
    tagline: "ربط اتصالات فائقة السرعة والأمان التكتيكي مع غرف العمليات والقيادة C4I",
    elevation: "الذروة العلوية للخط الكهربائي (+108م)",
    material: "أنبوب فولاذي مقاوم للصدأ محاط بأسلاك ألمنيوم صلبة ومغلف بـ 48 شعيرة ألياف ضوئية مؤمنة",
    specs: {
      "عدد شعيرات الألياف": "48 Core Single-Mode G.652D كابل ألياف ضوئية مصفح",
      "زمن نقل البيانات": "أقل من 0.05 مللي ثانية إلى مركز القيادة والسيطرة الميداني",
      "عرض النطاق الترددي": "100 Gbps مخصصة لنقل صور الرادار والرؤية الحرارية FLIR والبث الحي",
      "التشفير والحماية": "تشفير عسكري من الدرجة الأولى ضد التنصت الكهرومغناطيسي والحرب الإلكترونية",
      "وظيفة التأريض": "تفريغ الشحنات الصاعقة العلوية بكفاءة 100 kA",
    },
    capabilities: [
      "نقل إحداثيات الأهداف الجوية لحظياً بين الأبراج الثلاثة لتنفيذ الاشتباك المتقاطع الموجه.",
      "ربط المنظومة بالأقمار الاصطناعية العسكرية السعودية ومنظومة الإنذار المبكر الوطنية.",
      "مقاومة تامة لكافة أشكال التشويش اللاسلكي الإلكتروني بفضل الاعتماد على الوسط الضوئي المعزول.",
    ],
    developmentEvolution:
      "استثمار شبكة OPGW الممتدة مسبقاً على خطوط الكهرباء السعودية يوفر مليارات الريالات في مد شبكات ألياف ضوئية عسكرية جديدة، ويمنح المنظومة اتصالاً تكتيكياً فورياً ومحصناً بطبيعته.",
    safetyMargin: 99.6,
    stressResistance: "100 Gbps / Anti-Jamming",
    color: "#38bdf8",
  },
];

export default function PylonEngineeringView() {
  const [towerArchetype, setTowerArchetype] = useState<"existing_pylon" | "dedicated_bastion">("existing_pylon");
  const [showLoadPath, setShowLoadPath] = useState<boolean>(true);
  const [windSimulationSpeed, setWindSimulationSpeed] = useState<number>(140); // km/h
  const [selectedPartId, setSelectedPartId] = useState<string>("recoil_column");
  const [activeTab, setActiveTab] = useState<"specs" | "capabilities" | "evolution">("specs");

  const selectedPart = structuralComponentsList.find((p) => p.id === selectedPartId) || structuralComponentsList[2];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Layers className="w-4 h-4" />
              <span>المخطط الإنشائي التفاعلي · فحص الأجزاء والبيانات التحليلية والهندسية</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              المخطط الإنشائي: دمج المنصة على برج ضغط عالي 380kV مع خطوط الكهرباء
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              انقر على أي جزء من أجزاء المخطط أو الأزرار التفاعلية لاستعراض البيانات التحليلية الدقيقة،
              والمواصفات القياسية، والإمكانيات العملياتية، والتطوير الهندسي قياساً بحصون الدفاع الجوي التاريخية.
            </p>
          </div>

          {/* Archetype Toggle Button */}
          <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800">
            <button
              onClick={() => setTowerArchetype("existing_pylon")}
              className={`px-3 py-2 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
                towerArchetype === "existing_pylon"
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              1. تحديث برج كهرباء قائم (Retrofit 380kV)
            </button>
            <button
              onClick={() => setTowerArchetype("dedicated_bastion")}
              className={`px-3 py-2 text-xs font-bold rounded-md transition-colors whitespace-nowrap ${
                towerArchetype === "dedicated_bastion"
                  ? "bg-sky-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              2. تشييد برج شبكي مخصص ومستقل
            </button>
          </div>
        </div>
      </div>

      {/* Component Quick Selector Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 px-1">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>اختر المكون الهندسي للفحص الفوري أو انقر مباشرة على المخطط التفاعلي:</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400/90 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 w-fit">
            9 أجزاء رئيسية · جاهزية تامة
          </span>
        </div>

        {/* Formatted Row: Responsive Balanced Grid without Horizontal Scrolling */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-1.5">
          {structuralComponentsList.map((comp) => {
            const isSelected = selectedPartId === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedPartId(comp.id)}
                className={`w-full py-2 px-2 rounded-lg text-xs font-semibold border transition-all flex flex-col items-center justify-center text-center gap-1 cursor-pointer group active:scale-95 ${
                  isSelected
                    ? "bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-md ring-1 ring-emerald-500/50"
                    : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-1.5 w-full justify-center">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 transition-transform ${isSelected ? "scale-125 ring-2 ring-emerald-400/40" : "group-hover:scale-110"}`}
                    style={{ backgroundColor: isSelected ? "#10b981" : comp.color }}
                  />
                  <span className="truncate text-[11px] font-bold leading-tight">
                    {comp.name.split(" ")[0] + " " + (comp.name.split(" ")[1] || "")}
                  </span>
                </div>
                <span className={`text-[10px] font-mono transition-colors ${isSelected ? "text-emerald-400 font-bold" : "text-slate-500 group-hover:text-slate-400"}`}>
                  {comp.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Comparative Blueprint & Structural CAD + Analytical Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dynamic Interactive Structural SVG (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-xs font-mono">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              {towerArchetype === "existing_pylon"
                ? "المخطط الإنشائي: دمج المنصة على برج ضغط عالي 380kV مع خطوط الكهرباء"
                : "المخطط الإنشائي: برج شبكي عسكري مستقل مخصص للمواقع المحمية"}
            </span>
            <button
              onClick={() => setShowLoadPath(!showLoadPath)}
              className={`px-2 py-1 rounded text-[10px] border transition-colors ${
                showLoadPath
                  ? "bg-emerald-950 border-emerald-500/50 text-emerald-300"
                  : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
            >
              {showLoadPath ? "مسار توزيع الأحمال: ظاهر" : "إظهار مسار الأحمال"}
            </button>
          </div>

          {/* Interactive SVG Diagram */}
          <div className="flex-1 flex items-center justify-center relative min-h-[420px] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] rounded-lg border border-slate-900 overflow-hidden select-none">
            <svg viewBox="0 0 500 480" className="w-full h-full max-h-[480px]">
              {/* Definitions for gradients & filters */}
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M 0 0 L 6 3 L 0 6 z" fill="#ef4444" />
                </marker>
                <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M 0 0 L 6 3 L 0 6 z" fill="#10b981" />
                </marker>
              </defs>

              {/* 1. Ground Plane & Foundation (Clickable) */}
              <g
                onClick={() => setSelectedPartId("deep_micropiles")}
                className="cursor-pointer group"
              >
                <rect x="30" y="405" width="440" height="55" fill="#0b1120" stroke={selectedPartId === "deep_micropiles" ? "#10b981" : "#334155"} strokeWidth={selectedPartId === "deep_micropiles" ? 2.5 : 1.5} rx="2" />
                <text x="250" y="430" fill={selectedPartId === "deep_micropiles" ? "#34d399" : "#64748b"} fontSize="9" fontWeight="bold" textAnchor="middle">
                  طبقات الصخور الصلبة والأساسات الخرسانية المحقونة (18m Micro-Piles)
                </text>
                {/* Concrete Micro-Piles drilled 18m */}
                <rect x="115" y="405" width="38" height="55" fill="#1e293b" stroke={selectedPartId === "deep_micropiles" ? "#10b981" : "#475569"} strokeWidth="1" />
                <rect x="345" y="405" width="38" height="55" fill="#1e293b" stroke={selectedPartId === "deep_micropiles" ? "#10b981" : "#475569"} strokeWidth="1" />
                <text x="134" y="445" fill="#94a3b8" fontSize="8" textAnchor="middle">أوتاد 18م</text>
                <text x="364" y="445" fill="#94a3b8" fontSize="8" textAnchor="middle">أوتاد 18م</text>
              </g>

              {/* 2. Base Hydraulic Dampers (Clickable) */}
              <g
                onClick={() => setSelectedPartId("hydraulic_dampers")}
                className="cursor-pointer group"
              >
                <rect x="105" y="388" width="290" height="17" rx="3" fill="#0f172a" stroke={selectedPartId === "hydraulic_dampers" ? "#10b981" : "#059669"} strokeWidth={selectedPartId === "hydraulic_dampers" ? 3 : 1.5} />
                <rect x="120" y="375" width="30" height="13" rx="2" fill="#10b981" stroke="#34d399" strokeWidth="1" />
                <rect x="350" y="375" width="30" height="13" rx="2" fill="#10b981" stroke="#34d399" strokeWidth="1" />
                <text x="250" y="399" fill={selectedPartId === "hydraulic_dampers" ? "#34d399" : "#a7f3d0"} fontSize="8" fontWeight="bold" textAnchor="middle">
                  منظومة ممتصات الصدمات الهيدروليكية والإيلاستوميرية (MR Dampers)
                </text>
              </g>

              {/* TOWER ARCHETYPE 1: EXISTING TRANSMISSION PYLON */}
              {towerArchetype === "existing_pylon" && (
                <g>
                  {/* 3. Outer Steel Lattice Frame (Clickable) */}
                  <g
                    onClick={() => setSelectedPartId("lattice_truss_frame")}
                    className="cursor-pointer group"
                  >
                    <path
                      d="M 125 375 L 180 120 L 320 120 L 375 375 Z"
                      fill="none"
                      stroke={selectedPartId === "lattice_truss_frame" ? "#38bdf8" : "#64748b"}
                      strokeWidth={selectedPartId === "lattice_truss_frame" ? 3.5 : 2}
                      filter={selectedPartId === "lattice_truss_frame" ? "url(#glow)" : "none"}
                    />
                    {/* Cross bracings */}
                    <line x1="135" y1="315" x2="365" y2="315" stroke="#475569" strokeWidth="1.2" />
                    <line x1="145" y1="255" x2="355" y2="255" stroke="#475569" strokeWidth="1.2" />
                    <line x1="165" y1="185" x2="335" y2="185" stroke="#475569" strokeWidth="1.2" />
                    <line x1="125" y1="375" x2="365" y2="315" stroke="#475569" strokeWidth="1" />
                    <line x1="375" y1="375" x2="135" y2="315" stroke="#475569" strokeWidth="1" />
                    <line x1="135" y1="315" x2="355" y2="255" stroke="#475569" strokeWidth="1" />
                    <line x1="365" y1="315" x2="145" y2="255" stroke="#475569" strokeWidth="1" />
                  </g>

                  {/* 4. Transmission Arms with Insulator Strings & 380kV Cables (Clickable) */}
                  <g
                    onClick={() => setSelectedPartId("hv_insulators_380kv")}
                    className="cursor-pointer group"
                  >
                    <line x1="55" y1="220" x2="445" y2="220" stroke={selectedPartId === "hv_insulators_380kv" ? "#f59e0b" : "#64748b"} strokeWidth="4" />
                    {/* Left String */}
                    <rect x="65" y="220" width="18" height="38" rx="2" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
                    <circle cx="74" cy="265" r="5.5" fill="#ef4444" />
                    {/* Right String */}
                    <rect x="417" y="220" width="18" height="38" rx="2" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
                    <circle cx="426" cy="265" r="5.5" fill="#ef4444" />
                    {/* Text tags */}
                    <text x="74" y="286" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">380kV فاز A</text>
                    <text x="426" y="286" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">380kV فاز B</text>
                    {/* Inductive Coil Tap Indication */}
                    <rect x="90" y="225" width="22" height="15" rx="3" fill="#047857" stroke="#10b981" strokeWidth="1" />
                    <text x="101" y="235" fill="#a7f3d0" fontSize="7" fontWeight="bold" textAnchor="middle">طوق حثي</text>
                  </g>

                  {/* 5. Safety Clearance Arc Distance (Clickable) */}
                  <g
                    onClick={() => setSelectedPartId("safety_dielectric_clearance")}
                    className="cursor-pointer group"
                  >
                    <path
                      d="M 175 120 Q 115 165 80 220"
                      fill="none"
                      stroke={selectedPartId === "safety_dielectric_clearance" ? "#06b6d4" : "#38bdf8"}
                      strokeWidth={selectedPartId === "safety_dielectric_clearance" ? 2.5 : 1.2}
                      strokeDasharray="4 3"
                    />
                    <rect x="100" y="160" width="80" height="16" rx="3" fill="#082f49" stroke="#0ea5e9" strokeWidth="1" />
                    <text x="140" y="172" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      خلوص عازل 8.5م
                    </text>
                  </g>

                  {/* 6. Central Independent Monocoque Spine (Clickable) */}
                  <g
                    onClick={() => setSelectedPartId("recoil_column")}
                    className="cursor-pointer group"
                  >
                    <line
                      x1="250"
                      y1="388"
                      x2="250"
                      y2="115"
                      stroke={selectedPartId === "recoil_column" ? "#10b981" : "#38bdf8"}
                      strokeWidth={selectedPartId === "recoil_column" ? 8 : 5}
                      strokeDasharray={showLoadPath ? "8 3" : "none"}
                      filter={selectedPartId === "recoil_column" ? "url(#glow)" : "none"}
                    />
                    <rect x="180" y="295" width="140" height="18" rx="4" fill="#0f172a" stroke={selectedPartId === "recoil_column" ? "#10b981" : "#0284c7"} strokeWidth="1.5" />
                    <text x="250" y="307" fill={selectedPartId === "recoil_column" ? "#34d399" : "#38bdf8"} fontSize="8" fontWeight="bold" textAnchor="middle">
                      العمود الأنبوبي الفولاذي المركزي (Weldox 900)
                    </text>
                  </g>
                </g>
              )}

              {/* TOWER ARCHETYPE 2: DEDICATED PURPOSE-BUILT MILITARY BASTION */}
              {towerArchetype === "dedicated_bastion" && (
                <g>
                  {/* Heavy-Duty Reinforced Military Lattice Mast */}
                  <g
                    onClick={() => setSelectedPartId("lattice_truss_frame")}
                    className="cursor-pointer group"
                  >
                    <path
                      d="M 115 375 L 175 105 L 325 105 L 385 375 Z"
                      fill="#0f172a"
                      fillOpacity="0.4"
                      stroke={selectedPartId === "lattice_truss_frame" ? "#38bdf8" : "#047857"}
                      strokeWidth={selectedPartId === "lattice_truss_frame" ? 3.5 : 2.5}
                    />
                    <line x1="125" y1="305" x2="375" y2="305" stroke="#065f46" strokeWidth="1.5" />
                    <line x1="140" y1="235" x2="360" y2="235" stroke="#065f46" strokeWidth="1.5" />
                    <line x1="155" y1="165" x2="345" y2="165" stroke="#065f46" strokeWidth="1.5" />
                  </g>

                  {/* Armored Internal Personnel & Ammunition Lift Shaft */}
                  <g
                    onClick={() => setSelectedPartId("recoil_column")}
                    className="cursor-pointer group"
                  >
                    <rect x="220" y="105" width="60" height="270" fill="#022c22" stroke={selectedPartId === "recoil_column" ? "#10b981" : "#10b981"} strokeWidth={selectedPartId === "recoil_column" ? 2.5 : 1.5} />
                    <line x1="250" y1="105" x2="250" y2="375" stroke="#34d399" strokeWidth="2" strokeDasharray="4 2" />
                    <text x="250" y="245" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">
                      مصعد تلقيم الذخائر الآلي
                    </text>
                  </g>

                  {/* Side Outrigger Pods for Generator / Fuel storage */}
                  <rect x="65" y="335" width="48" height="38" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                  <rect x="385" y="335" width="48" height="38" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
                  <text x="89" y="358" fill="#94a3b8" fontSize="7" textAnchor="middle">مولد توربيني APU</text>
                  <text x="409" y="358" fill="#94a3b8" fontSize="7" textAnchor="middle">بطاريات LTO</text>
                </g>
              )}

              {/* 7. Upper Hardened Platform on Top (Clickable) */}
              <g
                onClick={() => setSelectedPartId("hardened_platform")}
                className="cursor-pointer group"
              >
                <rect
                  x="155"
                  y="90"
                  width="190"
                  height="26"
                  rx="4"
                  fill="#0f172a"
                  stroke={selectedPartId === "hardened_platform" ? "#f59e0b" : "#10b981"}
                  strokeWidth={selectedPartId === "hardened_platform" ? 3 : 2}
                  filter={selectedPartId === "hardened_platform" ? "url(#glow)" : "none"}
                />
                <text x="250" y="106" fill={selectedPartId === "hardened_platform" ? "#fbbf24" : "#a7f3d0"} fontSize="9.5" fontWeight="bold" textAnchor="middle">
                  منصة الاشتباك المحصنة (4.2م × 4.2م)
                </text>

                {/* Gun Turret / Weapon Base on Top */}
                <rect x="205" y="60" width="90" height="30" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <line x1="265" y1="70" x2="335" y2="45" stroke="#f59e0b" strokeWidth="4.5" />
                <line x1="270" y1="78" x2="340" y2="53" stroke="#f59e0b" strokeWidth="4.5" />
                <circle cx="250" cy="75" r="7" fill="#dc2626" />
                <text x="250" y="78" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">35mm</text>
              </g>

              {/* 8. Lightning Rod Terminal at the Peak (Clickable) */}
              <g
                onClick={() => setSelectedPartId("lightning_ese")}
                className="cursor-pointer group"
              >
                <line
                  x1="220"
                  y1="60"
                  x2="220"
                  y2="20"
                  stroke={selectedPartId === "lightning_ese" ? "#38bdf8" : "#0284c7"}
                  strokeWidth={selectedPartId === "lightning_ese" ? 4 : 2.5}
                  filter={selectedPartId === "lightning_ese" ? "url(#glow)" : "none"}
                />
                <circle cx="220" cy="20" r="5" fill="#38bdf8" />
                <text x="220" y="14" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">
                  مشتت صواعق ESE
                </text>
              </g>

              {/* 9. Top OPGW Shield Wire (Clickable) */}
              <g
                onClick={() => setSelectedPartId("opgw_fiber")}
                className="cursor-pointer group"
              >
                <line x1="30" y1="120" x2="470" y2="120" stroke={selectedPartId === "opgw_fiber" ? "#38bdf8" : "#0284c7"} strokeWidth={selectedPartId === "opgw_fiber" ? 3 : 1.5} strokeDasharray="3 3" />
                <circle cx="280" cy="120" r="4" fill="#38bdf8" />
                <text x="320" y="132" fill="#38bdf8" fontSize="7.5" fontWeight="bold">ألياف OPGW 48-Core</text>
              </g>

              {/* Visualizing Recoil Force Vector Path Down To Earth */}
              {showLoadPath && (
                <g>
                  {/* Recoil arrow from gun */}
                  <line x1="205" y1="75" x2="150" y2="95" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRed)" />
                  <text x="135" y="90" fill="#ef4444" fontSize="8" fontWeight="bold">قوة الارتداد 45kN</text>

                  {/* Path channeled down the core column directly to piles */}
                  <path d="M 245 115 L 245 388 L 135 440" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrowGreen)" />
                  <path d="M 255 115 L 255 388 L 365 440" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#arrowGreen)" />
                  <rect x="90" y="462" width="320" height="15" rx="3" fill="#022c22" stroke="#10b981" strokeWidth="1" />
                  <text x="250" y="473" fill="#a7f3d0" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    تفريغ 100% من قوى الصدمة بالأرض مباشرة دون التأثير على كابلات 380kV
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Wind Speed & Aerodynamic Control */}
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300">محاكاة مقاومة رياح الصحراء والعواصف الرملية:</span>
              <span className="font-mono text-emerald-400 font-bold">{windSimulationSpeed} كم/س</span>
            </div>
            <input
              type="range"
              min="60"
              max="180"
              value={windSimulationSpeed}
              onChange={(e) => setWindSimulationSpeed(Number(e.target.value))}
              className="w-36 accent-emerald-500 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Analytical Inspector & Deep Engineering Breakdown (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
            {/* Header of Active Component */}
            <div className="border-b border-slate-800 pb-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  {selectedPart.code} · {selectedPart.category.toUpperCase()}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-600/50 text-emerald-300 font-bold">
                  معامل الأمان: {selectedPart.safetyMargin}%
                </span>
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                {selectedPart.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {selectedPart.tagline}
              </p>
            </div>

            {/* Sub-tab Navigation for Active Part */}
            <div className="flex border-b border-slate-800 text-xs">
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-2 px-3 font-semibold transition-colors border-b-2 ${
                  activeTab === "specs"
                    ? "border-emerald-500 text-emerald-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                البيانات والمواصفات
              </button>
              <button
                onClick={() => setActiveTab("capabilities")}
                className={`pb-2 px-3 font-semibold transition-colors border-b-2 ${
                  activeTab === "capabilities"
                    ? "border-emerald-500 text-emerald-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                الإمكانيات التكتيكية
              </button>
              <button
                onClick={() => setActiveTab("evolution")}
                className={`pb-2 px-3 font-semibold transition-colors border-b-2 ${
                  activeTab === "evolution"
                    ? "border-emerald-500 text-emerald-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                التطوير والابتكار الهندسي
              </button>
            </div>

            {/* Tab 1: Specs & Materials */}
            {activeTab === "specs" && (
              <div className="space-y-3 text-xs">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px] block">الموقع والارتفاع الهيكلي:</span>
                  <span className="text-white font-medium">{selectedPart.elevation}</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px] block">المادة المصنعة والسبائك:</span>
                  <span className="text-emerald-300 font-medium">{selectedPart.material}</span>
                </div>

                <div className="border border-slate-800 rounded-lg p-3 bg-slate-950/60 space-y-2">
                  <span className="text-slate-300 font-bold block mb-1">جدول المواصفات والقياسات الدقيقة:</span>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    {Object.entries(selectedPart.specs).map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-slate-800/60 pb-1">
                        <span className="text-slate-400">{k}:</span>
                        <span className="text-white font-semibold text-left">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-emerald-950/30 border border-emerald-800/40 rounded-lg font-mono text-xs">
                  <span className="text-slate-300">أقصى مقاومة إجهاد:</span>
                  <span className="text-emerald-400 font-bold">{selectedPart.stressResistance}</span>
                </div>
              </div>
            )}

            {/* Tab 2: Capabilities & Operational Functions */}
            {activeTab === "capabilities" && (
              <div className="space-y-3 text-xs">
                <span className="text-slate-300 font-semibold block">الوظائف والقدرات الميدانية للجزء:</span>
                <ul className="space-y-2.5">
                  {selectedPart.capabilities.map((cap, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-200 leading-relaxed">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab 3: Technological Evolution & Development */}
            {activeTab === "evolution" && (
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 bg-amber-950/30 border border-amber-700/50 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                    <Sparkles className="w-4 h-4" />
                    <span>كيف تم تطوير هذا الجزء من حصون Flak الألمانية إلى أبراج السعودية؟</span>
                  </div>
                  <p className="text-slate-200 text-[11.5px] leading-relaxed">
                    {selectedPart.developmentEvolution}
                  </p>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                  <strong className="text-white block font-semibold">مكاسب الاعتمادية والوفر الاقتصادي:</strong>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">تخفيض الوزن الكلي:</span>
                      <span className="text-emerald-400 font-bold">-97% وزن خرسانة</span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">سرعة التحديث:</span>
                      <span className="text-emerald-400 font-bold">14 - 21 يوماً فقط</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Specifications Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
            <span className="text-slate-300 font-semibold block">مقارنة المعايير الإنشائية العامة:</span>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">مدة التنفيذ والتجهيز للموقع:</span>
                <span className="text-emerald-400 font-bold">{towerArchetype === "existing_pylon" ? "14 - 21 يوماً" : "45 - 60 يوماً"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">التكلفة التقديرية للبرج:</span>
                <span className="text-emerald-400 font-bold">{towerArchetype === "existing_pylon" ? "420,000 ريال (تحديث)" : "1,850,000 ريال (تشييد كامل)"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">مقاومة الرياح والعواصف:</span>
                <span className="text-emerald-400 font-bold">180 كم/س (معيار الكود السعودي SBC 301)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
