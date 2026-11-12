"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Shield, Zap, Target, Cpu, Activity, X, CheckCircle, ArrowRight,
  Sparkles, Layers, Sliders, Wrench, AlertTriangle, Radio, Flame,
  FileText, Disc, ChevronLeft, ChevronRight, Gauge, Lock, Compass, History
} from "lucide-react";

export interface MilitaryEquipmentItem {
  id: string;
  name: string;
  category: "radar" | "cannon" | "laser" | "missile" | "power" | "structural";
  role: string;
  quantity: string;
  weight: string;
  powerDraw: string;
  effectiveRange: string;
  mountingLocation: string;
  mountingMethod: string;
  installationSteps: string[];
  billOfMaterials: string[];
  coolingAndSafety: string;
  specifications: { [key: string]: string };
}

export interface StructureDossierData {
  id: string;
  title: string;
  subtitle: string;
  categoryBadge: string;
  badgeColor: string;
  imageUrl?: string;
  is3dRender?: boolean;
  renderType?: "380kv_retrofit" | "dedicated_bastion";
  yearOrEra: string;
  height: string;
  baseDimensions: string;
  payloadCapacity: string;
  powerSupply: string;
  structuralMaterials: string;
  description: string;
  tacticalNecessityAsFinalDefense: string;
  equipmentCountSummary: string;
  militaryEquipmentList: MilitaryEquipmentItem[];
  architecturalSpecs: { [key: string]: string };
}

export const structureDossiers: { [key: string]: StructureDossierData } = {
  "380kv_retrofit": {
    id: "380kv_retrofit",
    title: "منظومة أبراج الضغط العالي 380kV المحصنة (Smart Grid Bastion)",
    subtitle: "التحديث الذكي لصواري نقل الطاقة الكهربائية الفائقة إلى حصون دفاع جوي شبكية",
    categoryBadge: "الابتكار السعودي 2026 · استغلال شبكة 380kV",
    badgeColor: "emerald",
    is3dRender: true,
    renderType: "380kv_retrofit",
    yearOrEra: "2026 (جاهزية فورية للتعميم)",
    height: "110 أمتار فوق سطح الأرض (3× أفق الرصد الأرضي)",
    baseDimensions: "24 × 24 متراً (قاعدة صلب شبكي)",
    payloadCapacity: "14.5 طناً على المنصة العلوية",
    powerSupply: "استجرار حثي كهرومغناطيسي مباشر (Gigawatt Grid Tap 150 kVA)",
    structuralMaterials: "فولاذ إنشائي عالي الإجهاد S355J2 + ممتصات صدمات Magnetorheological",
    description: "استثمار هندسي رائد يستغل أكثر من 90,000 كم من خطوط الضغط العالي القائمة بالمملكة عبر تزويدها بمنصات علوية تخمد ارتدادات الإطلاق 92% وتستجر الطاقة حثياً دون حرق وقود الديزل أو تشييد قواعد منعزلة من الصفر.",
    tacticalNecessityAsFinalDefense: "تعتبر هذه الأبراج الشاهقة «خط الدفاع الأخير» الفاصل لحماية المنشآت الحيوية ومصافي التكرير؛ حيث تكشف طيران المسيرات وصواريخ الكروز الملاصقة للتضاريس (Terrain Masking) من مسافة 45-65 كم بدلاً من 15 كم أرضياً، وتدمرها بالليزر والرشاشات فوراً قبل وصولها لأسوار المنشأة.",
    equipmentCountSummary: "6 قطع ومعدات عسكرية تكتيكية رئيسية مدمجة",
    architecturalSpecs: {
      "المسافة العازلة الكهربائية": "4.8 متراً (Dielectric Clearance للجهد 380kV)",
      "عزم امتصاص الارتداد": "28 kN بمخمدات هيدروليكية مغناطيسية",
      "زمن استجابة المنظومة": "< 1.2 ثانية عبر ربط الألياف الضوئية OPGW",
      "قوس التغطية الرادارية": "360° دائرية متقاطعة بدون نقاط عمياء",
      "وفر التكاليف الإنشائية": "أكثر من 85% مقارنة بالقواعد المنفصلة"
    },
    militaryEquipmentList: [
      {
        id: "aesa_radar_4d",
        name: "رادار مصفوفة المسح الإلكتروني النشط 4D AESA (S/X Band)",
        category: "radar",
        role: "الإنذار المبكر والتتبع المتزامن لـ 250 هدفاً جوياً وتوجيه النيران",
        quantity: "1 وحدة متكاملة على قمة الصاري",
        weight: "1,200 كجم",
        powerDraw: "22 kW (استجرار حثي مباشر من الخطوط)",
        effectiveRange: "120 كم للأهداف التقليدية / 45 كم للمسيرات متناهية الصغر (RCS 0.01m²)",
        mountingLocation: "أعلى نقطة بالبرج (منسوب +110م) داخل قبة رادوم عازلة",
        mountingMethod: "تثبيت ميكانيكي بمسامير تيتانيوم Ti-6Al-4V على حلقة ارتكاز معزولة كهرومغناطيسياً بقفص فاراداي مزدوج.",
        installationSteps: [
          "رفع مصفوفة الرادار باستخدام ونش هيدروليكي محمول على صاري الرفع المؤقت.",
          "تثبيت قاعدة الدوران ومحاذاة خط الأفق الإلكتروني بأجهزة الليزر الجيوديسية.",
          "توصيل محول الجهد المعزول 400V وكابل الألياف الضوئية OPGW بقناة C4I.",
          "إجراء المعايرة الكهرومغناطيسية وتفعيل مرشحات العزل ضد موجات 380kV."
        ],
        billOfMaterials: [
          "وحدات إرسال واستقبال T/R Modules بنتريد الغاليوم (GaN)",
          "قبة رادوم مركبة من الألياف الزجاجية منخفضة الفقد الديالكتري",
          "حلقة تثبيت من سبيكة التيتانيوم Ti-6Al-4V المعالجة حرارياً",
          "كابلات ألياف ضوئية عسكرية مصفحة بطبقة كيفلار مضادة للتآكل"
        ],
        coolingAndSafety: "تبريد سائل ذو حلقة مغلقة (Closed-Loop Liquid Glycol 45 kW) مع عزل صواعق حتى 100 kA.",
        specifications: {
          "النطاق الترددي": "S-Band (2-4 GHz) للرصد + X-Band (8-12 GHz) للتوجيه",
          "سرعة المسح الزاوي": "60 دورة بالدقيقة أو مسح إلكتروني فوري 360°",
          "دقة قياس الزوايا": "0.15 مللي راديان (دقة نارية للتهديف)",
          "مناعة التشويش": "قفز ترددي سريع ECCM مع مصفوفات فرعية رقمية"
        }
      },
      {
        id: "twin_cannon_35mm_ahead",
        name: "مدفع الرشاش الثنائي 35mm AHEAD الليزري الموجه آلياً",
        category: "cannon",
        role: "الاعتراض الفوري الفتاك لأسراب المسيرات وصواريخ الكروز الشبحية",
        quantity: "1 برج مدفعي ثنائي السبطانة",
        weight: "3,400 كجم مع مخزن الذخيرة التكتيكي",
        powerDraw: "12 kW لمحركات التوجيه السيرفو والمغذي الآلي",
        effectiveRange: "4,500 متر (مدى قتال تكتيكي مباشر)",
        mountingLocation: "المنصة الدائرية الرئيسية العلوية (منسوب +106م)",
        mountingMethod: "تثبيت على حلقة دوران هيدروليكية مزودة بـ 4 مخمدات ارتداد MR Fluid لكتم عزم الإطلاق.",
        installationSteps: [
          "تثبيت حلقة توزيع الأحمال السفلية المربوطة بروافد البرج الفولاذية.",
          "تركيب أسطوانات التخميد الهيدروليكي وضبط لزوجة السائل الممغنط.",
          "تنزيل وتثبيت البرج المدفعي وربط سبطانات 35mm بحواسب إدارة الرمي.",
          "تحميل مخزن الذخائر وتجربة التوجيه السريع بزاوية سمت 360° وارتفاع -5° إلى +85°."
        ],
        billOfMaterials: [
          "سبطانات مدفعية من الصلب النيكل-كروم-موليبدينوم المقاوم للحرارة",
          "ذخائر AHEAD عيار 35×228 ملم تنفث 152 كرية تنغستن خارقة للمقذوف",
          "محركات عزم مغناطيسية متزامنة دائمة المغناطيسية (PMSM)",
          "درع حماية خفيف الوزن من ألياف البولي إيثيلين فائقة الوزن (UHMWPE)"
        ],
        coolingAndSafety: "تبريد هوائي طبيعي مع غلاف مائي للسبطانات، ومستشعرات أمان تمنع الرمي باتجاه خطوط الكهرباء.",
        specifications: {
          "معدل الإطلاق": "1,600 طلقة بالدقيقة (800 طلقة/سبطانة)",
          "سرعة الفوهة": "1,050 متر/ثانية",
          "سعة مخزن الذخيرة": "1,200 طلقة جاهزة للإطلاق الفوري",
          "سرعة دوران التوجيه": "120 درجة بالثانية لإطباق فوري على الأهداف"
        }
      },
      {
        id: "hel_laser_ciws_100kw",
        name: "مدفع الليزر عالي الطاقة 100kW HEL Laser CIWS",
        category: "laser",
        role: "إحراق وتعطيل بصريات ورؤوس التوجيه للمسيرات والصواريخ بتكلفة شبه معدومة",
        quantity: "1 منظومة ليزر موجهة برأس كهروبصري",
        weight: "1,850 كجم",
        powerDraw: "75 kW أثناء النبض المستمر (استجرار حثي مباشر)",
        effectiveRange: "4,000 متر لإعطاب الدروع / 8,000 متر لتعمية الكاميرات والمستشعرات",
        mountingLocation: "منصة التوجيه البصري الجانبية المعزولة",
        mountingMethod: "تثبيت على قاعدة استقرار جيروسكوبية ثلاثية المحاور لعزل اهتزازات الرياح والمدفع.",
        installationSteps: [
          "تثبيت وحدة الليزر الليفي المدمج وقواطع التغذية الفائقة.",
          "تركيب مرآة التوجيه وتتبع الهدف الكهروبصرية بدقة الميكروراديان.",
          "ربط مضخات التبريد السائل بحلقة المشتت الحراري المثبت بالبرج.",
          "معايرة شعاع الليزر 1.06 µm مع نقطة التهديف البصرية FLIR."
        ],
        billOfMaterials: [
          "بلورات ليزر الإيتريوم والألومنيوم والغرانيت (Yb:YAG Fiber Cores)",
          "بصريات ومرايا مطلية بطبقات السيليكا المصهورة عاكسة للحرارة",
          "مستشعر حراري ثلاثي الأطياف MWIR/LWIR عالي الحساسية",
          "مصفوفة مكثفات فائقة الشحن لتفريغ الطاقة بنبضات حارقة"
        ],
        coolingAndSafety: "نظام تبريد مائي نشط، ومحددات مسار تمنع خروج الشعاع خارج نطاق الاشتباك الجوي المعتمد.",
        specifications: {
          "قدرة الشعاع": "100 كيلوواط ليزر ليفي مستمر",
          "طول الموجة": "1.064 ميكرومتر (نفاذية جوية ممتازة في بيئة الصحراء)",
          "زمن الحرق للهدف": "< 1.5 ثانية لإشعال خزان وقود المسيرة",
          "تكلفة الطلقة الواحدة": "أقل من 15 ريالاً سعودياً (كهرباء فقط)"
        }
      },
      {
        id: "induction_power_tap_coil",
        name: "محول الاستجرار الحثي الذكي من خط 380kV (Gigawatt Tap)",
        category: "power",
        role: "توفير مصدر طاقة كهربائية لا نهائي لتشغيل الليزر والرادار دون قوافل ديزل",
        quantity: "مجموعة ملفات اقتران حثي ثلاثية الأطوار",
        weight: "850 كجم",
        powerDraw: "استجرار 150 kVA تحويلية مستمرة",
        effectiveRange: "إمداد مستمر 24/7 طالما خط النقل مشحون",
        mountingLocation: "تحت العوازل البورسلينية على مسافة آمنة 4.8م",
        mountingMethod: "تثبيت مشبكي لا تلامسي (Non-contact Magnetic Induction Core) يلتف حول المجال الكهرومغناطيسي للموصلات.",
        installationSteps: [
          "تثبيت الملفات الحثية المعزولة على أذرع البرج الحاملة للأسلاك.",
          "توصيل دوائر الترشيح والمكثفات لضبط التردد على 50 Hz.",
          "ربط مخارج المحول بمصفوفة البطاريات الاحتياطية (UPS LiFePO4).",
          "فحص العزل الكهربائي للتأكد من عدم حدوث أي تفريغ كورونا (Corona Discharge)."
        ],
        billOfMaterials: [
          "قلب مغناطيسي من رقائق الفولاذ السليكوني منخفض الفقد",
          "أسلاك نحاسية خالية من الأكسجين (OFC Copper) معزولة براتنج الإيبوكسي",
          "عوازل سيليكونية هيدروفوبية طاردة للغبار والأملاح",
          "بطاريات تخزين طوارئ فوسفات حديد الليثيوم LiFePO4 سعة 80 kWh"
        ],
        coolingAndSafety: "تبريد زيت استاتيكي غير قابل للاشتعال، مع قواطع أوتوماتيكية تفصل في 0.01 ثانية عند قصر الدائرة.",
        specifications: {
          "الجهد الابتدائي": "380,000 فولت (مجال حثي)",
          "الجهد الثانوي": "400 فولت ثلاثي الأطوار / 230 فولت أحادي الطور",
          "الكفاءة التحويلية": "94.2% عند الأحمال الكاملة",
          "سعة العمل الاحتياطي": "72 ساعة تشغيل قتالي كامل عند انقطاع التيار"
        }
      }
    ]
  },
  "dedicated_bastion": {
    id: "dedicated_bastion",
    title: "منظومة الأبراج التكتيكية المخصصة (Dedicated Defense Bastion)",
    subtitle: "أبراج صلب معيارية متطورة مصممة خصيصاً كـ «آخر خط دفاعي» لتحصين المنشآت الحيوية",
    categoryBadge: "منظومة الحصن المخصصة · آخر خط دفاعي للمنشآت",
    badgeColor: "amber",
    is3dRender: true,
    renderType: "dedicated_bastion",
    yearOrEra: "2026 (تصميم معياري للمواقع الحساسة)",
    height: "120 متراً مع منصات قتال متعددة الطوابق",
    baseDimensions: "28 × 28 متراً (أوتاد خرسانية صخرية عميقة 18م)",
    payloadCapacity: "32 طناً من الصواريخ والمدافع والرادارات",
    powerSupply: "مولدات توربينية مدمجة + ربط شبكي مزدوج + خلايا شمسية",
    structuralMaterials: "سبائك صلب مدرع HARDOX 500 مع تصفيح كيفلار مركب ومقاومة زلازل وعصف",
    description: "أبراج دفاع جوي صلبة معيارية تشيد في المحيط المباشر للمصافي والموانئ ومحطات التحلية ومستودعات النفط الاستراتيجية؛ تجمع بين منصات إطلاق صواريخ عمودية VLS ورشاشات مدفعية ورادارات مصفوفة طورية ثابتة لتشكل جداراً نارياً لا يمكن اختراقه.",
    tacticalNecessityAsFinalDefense: "تمثل هذه الأبراج الحل النهائي لمعضلة الهجوم التشبعي بالمقذوفات والمسيرات الانتحارية المنخفضة جداً؛ حيث تُغلق كافة الممرات التضاريسية المحيطة بالمرافق البترولية وتوفر مظلة حماية متقاطعة 360 درجة تمنع أي تهديد من الوصول للأهداف الحيوية.",
    equipmentCountSummary: "8 منظومات ومنصات قتالية ورادارية متكاملة",
    architecturalSpecs: {
      "عمق الأساسات": "18 متراً في الصخر (8 أوتاد Deep Micropiles)",
      "مستوى التدريع": "مقاوم لشظايا المدفعية وعصف الانفجارات STANAG 4569 Level 4",
      "سعة الصواريخ": "16 إلى 32 صاروخ دفاع جوي عمودي VLS",
      "زمن الرد العملياتي": "أقل من 0.9 ثانية من الرصد إلى الإطلاق",
      "تغطية الحماية": "محيط دائري بقطر 40 كم حول المنشأة"
    },
    militaryEquipmentList: [
      {
        id: "vls_missile_pod_quad",
        name: "قواذف الصواريخ العمودية المدمجة (VLS Quad-Cell SAM Pods)",
        category: "missile",
        role: "الاعتراض الصاروخي السريع لصواريخ الكروز والطائرات المسيرة والمقاتلات",
        quantity: "4 إلى 8 خلايا إطلاق عمودية (16 - 32 صاروخاً)",
        weight: "6,800 كجم متضمنة الصواريخ وحاويات الإطلاق",
        powerDraw: "15 kW لأنظمة الفحص والتهيئة والإطلاق",
        effectiveRange: "25 إلى 40 كم (سقف ارتفاع 15,000م)",
        mountingLocation: "المنصة المتوسطة المصفحة للبرج (منسوب +65م)",
        mountingMethod: "تثبيت داخل خلايا مصفحة مدمجة ببدن البرج مع قنوات توجيه عادم الإطلاق البارد (Cold Launch).",
        installationSteps: [
          "تثبيت إطارات خلايا VLS في الهيكل الأوسط للبرج.",
          "تركيب منظومة فتح الأغطية الهيدروليكية السريعة.",
          "توصيل مسارات نقل الإحداثيات من رادار البرج لحواسب توجيه الصواريخ.",
          "تلقيم حاويات الصواريخ الجاهزة عبر ونش التحميل الداخلي للبرج."
        ],
        billOfMaterials: [
          "حاويات إطلاق مصنوعة من ألياف الكربون المقوى وراتنج الإيبوكسي",
          "صواريخ دفاع جوي اعتراضية موجهة بالرادار النشط / الأشعة تحت الحمراء",
          "صمامات أمان وقنوات عادم مطلية بالسيراميك المقاوم للحرارة 2,200°C",
          "أنظمة تحكم إلكترونية مكررة ثلاثياً مع حواسب توجيه فوري"
        ],
        coolingAndSafety: "أنظمة إطفاء حريق تلقائية بغاز Novec، وتفريغ عادم جانبي بعيداً عن أجهزة الرادار.",
        specifications: {
          "سرعة الصاروخ": "ماخ 3.5 (أكثر من 4,200 كم/ساعة)",
          "زاوية الإطلاق": "عمودية 90° مع توجيه فوري بالدفع الموجه (Thrust Vectoring)",
          "طريقة الإطلاق": "إطلاق غازي بارد (Soft Cold Launch) لحماية البرج",
          "نوع الرأس الحربي": "شظايا موجهة مع صمام تقاربي ليزري دقيق"
        }
      },
      {
        id: "dual_band_fixed_aesa",
        name: "رادار المسح الإلكتروني النشط الرباعي الأوجه (4-Face Fixed 3D AESA)",
        category: "radar",
        role: "رصد وتتبع متواصل 360° بدون أي أجزاء ميكانيكية متحركة",
        quantity: "4 مصفوفات طورية ثابتة على أضلاع البرج",
        weight: "2,900 كجم للمنظومة الرباعية",
        powerDraw: "40 kW",
        effectiveRange: "160 كم للأهداف الجوية / 60 كم للدرونز المنخفضة",
        mountingLocation: "قمة الصاري التكتيكي (منسوب +115م)",
        mountingMethod: "تثبيت مباشر على الجدران الهيكلية للبرج بمسامير فولاذية عالية المقاومة مع وصلات مانعة للاهتزاز.",
        installationSteps: [
          "تركيب الألواح الرادارية الأربعة على الأوجه الأربعة للبرج.",
          "توصيل وحدات المعالجة الرقمية المركزية داخل غرفة القيادة بالبرج.",
          "معايرة التداخل الطيفي بين الأوجه للحصول على تغطية نصف كروية متصلة.",
          "دمج بث البيانات مع شبكة الدفاع الجوي الوطنية عبر وصلة Link-16."
        ],
        billOfMaterials: [
          "آلاف العناصر المشعة من نتريد الغاليوم (GaN Power Amplifiers)",
          "ألواح حماية كهرومغناطيسية من سبائك النحاس والفضة",
          "مشتتات حرارية من الألومنيوم المؤكسد فائق التوصيل",
          "حواسب معالجة إشارات عالية السرعة مزودة بشرائح FPGA العسكرية"
        ],
        coolingAndSafety: "تبريد سائل متطور متصل بمبردات التوربين بالبرج مع تغطية طوارئ.",
        specifications: {
          "عدد الأهداف المتتبعة": "حتى 600 هدف جوي متزامن",
          "زمن تحديث البيانات": "أقل من 0.05 ثانية لكل هدف",
          "نطاق الارتفاع": "-10° تحت الأفق وحتى +88° رأسياً",
          "كشف الأهداف الشبحية": "خوارزميات متقدمة لكشف المقاطع شديدة الصغر"
        }
      },
      {
        id: "directed_ew_jammer",
        name: "منظومة الحرب الإلكترونية والتشويش الموجه (Directed EW / C-UAS)",
        category: "radar",
        role: "قطع قنوات التحكم والاتصال والملاحة بالأقمار الاصطناعية للمسيرات المعادية",
        quantity: "4 قطاعات تشويش اتجاهي عالية القدرة",
        weight: "750 كجم",
        powerDraw: "18 kW",
        effectiveRange: "15 إلى 25 كم",
        mountingLocation: "أطراف منصة المراقبة الوسطى (منسوب +80م)",
        mountingMethod: "تثبيت قطاعي يغطي 360° مع هوائيات بوقية ومصفوفات طورية ضيقة الشعاع.",
        installationSteps: [
          "تثبيت هوائيات التشويش وتوصيل مولدات التردد الرقمية.",
          "برمجة مكتبة التهديدات للتعرف التلقائي على إشارات الدرونز.",
          "ضبط زوايا الشعاع لمنع التشويش على الاتصالات الصديقة للمنشأة."
        ],
        billOfMaterials: [
          "مضخمات موجات كهرومغناطيسية عالية الطاقة (Solid-State PAs)",
          "هوائيات مصفوفة طورية عالية الكسب",
          "أجهزة توليد ضوضاء رقمية ذكية (DRFM)"
        ],
        coolingAndSafety: "تبريد هوائي قسري مع فلاتر حماية للترددات الحيوية المدنية.",
        specifications: {
          "نطاقات التشويش": "GNSS (GPS/GLONASS/BeiDou) + 2.4 GHz + 5.8 GHz + UHF",
          "زمن الاستجابة": "< 0.2 ثانية من رصد إشارة التحكم",
          "قدرة الإشعاع الفعالة (ERP)": "> 500 kW نبضي"
        }
      }
    ]
  },
  "zoo_flakturm_berlin": {
    id: "zoo_flakturm_berlin",
    title: "برج حديقة حيوان برلين التاريخي (G-Tower Zoo Berlin 1941)",
    subtitle: "أشهر قلاع الدفاع الجوي الخرسانية للجيل الأول (Bauart 1) - المرجع التاريخي للفكرة",
    categoryBadge: "المرجع التاريخي الأول · برلين 1941",
    badgeColor: "amber",
    imageUrl: "/images/flak_history/zoo_flakturm_berlin.jpg",
    yearOrEra: "1941 - 1945",
    height: "39 متراً (يعادل مبنى من 13 طابقاً)",
    baseDimensions: "70.5 × 70.5 متراً",
    payloadCapacity: "مئات الأطنان من المدافع والذخائر والملاجئ",
    powerSupply: "مولدات ديزل داخلية مستقلة + خزانات مياه وآبار ارتوازية",
    structuralMaterials: "100,000 طن خرسانة مسلحة بجدران سماكة 3.5م وسقف 5.0م",
    description: "قلعة دفاع جوي خرسانية عملاقة شُيدت لتجاوز حجب مباني وغابات برلين، صمدت أمام أعنف القصف الجوي في التاريخ ووفرت منصة مستقرة لمدافع الفلاك الثقيلة، وما تزال مبادئها في فصل الرصد عن الرمي ورفع وسائط الدفاع فوق التضاريس تلهم المنظومات الحديثة.",
    tacticalNecessityAsFinalDefense: "أثبتت التجربة التاريخية أن رفع وسائط الدفاع الجوي فوق مستوى العوائق الأرضية يضاعف كفاءة التغطية النارية بنسبة 400% ويحرم المهاجم من التخفي خلف التضاريس.",
    equipmentCountSummary: "4 مدافع ثنائية ثقيلة + 24 مدفعاً سريعاً + مستشفى ومأوى",
    architecturalSpecs: {
      "سماكة الجدران": "3.5 أمتار خرسانة مسلحة مقاومة للقنابل",
      "سماكة السقف": "5.0 أمتار خرسانة مسبقة الإجهاد",
      "سعة الملجأ الداخلي": "30,000 مدني محصنون بالكامل",
      "المستشفى المدمج": "مستشفى جراحي متكامل بسعة 95 سريراً"
    },
    militaryEquipmentList: [
      {
        id: "flak_40_zwilling_hist",
        name: "مدفع الفلاك الثنائي الثقيل 12.8cm FlaK 40 Zwilling",
        category: "cannon",
        role: "الاشتباك مع أسراب القاذفات على ارتفاعات شاهقة",
        quantity: "4 منصات ثنائية (8 سبطانات عيار 128 مم)",
        weight: "26,500 كجم لكل منصة",
        powerDraw: "محركات كهربائية لتغذية الذخيرة والتوجيه",
        effectiveRange: "14,800 متر سقف ارتفاع أقصى",
        mountingLocation: "المنصات الزاوية الأربع لسطح البرج",
        mountingMethod: "تثبيت على قواعد خرسانية دائرية مسلحة مدمجة بأعمدة البرج الحاملة.",
        installationSteps: [
          "صب قواعد الارتكاز الخرسانية مع مسامير تثبيت فولاذية ضخمة.",
          "رفع أجزاء المدفع برافعة ثقيلة وتجميع القاعدة الدوارة.",
          "ربط محركات التوجيه السيرفو بحاسبة الرصد التناظرية القادمة من برج الرصد L-Tower."
        ],
        billOfMaterials: [
          "فولاذ مدفعي ثقيل معالج بالكروم والنيكل",
          "قذائف متفجرة زنة 26 كجم مع صمامات توقيت بارومترية",
          "كابلات نقل إشارات كهربائية مصفحة داخل أنفاق خرسانية"
        ],
        coolingAndSafety: "تبريد هوائي طبيعي مع غرف تبديل ذخيرة مصفحة بمصاعد هيدروليكية سريعة.",
        specifications: {
          "معدل الإطلاق": "24 إلى 28 طلقة بالدقيقة للمنصة الثنائية",
          "سرعة القذيفة": "880 متر/ثانية",
          "وزن الشحنة المتفجرة": "3.3 كجم من مادة أمتول شديدة الانفجار"
        }
      }
    ]
  },
  "augarten_gtower_vienna": {
    id: "augarten_gtower_vienna",
    title: "برج قتال أوغارتن الأسطواني في فيينا (Gefechtsturm Augarten 1944)",
    subtitle: "أطول برج دفاع جوي أسطواني تم تشييده في التاريخ (Bauart 3)",
    categoryBadge: "المرجع التاريخي الثاني · فيينا 1944",
    badgeColor: "amber",
    imageUrl: "/images/flak_history/augarten_gtower_vienna.jpg",
    yearOrEra: "1944 - اليوم (صامد إنشائياً 100%)",
    height: "55 متراً (الأطول تاريخياً)",
    baseDimensions: "قطر 43 متراً (تصميم أسطواني إيروديناميكي)",
    payloadCapacity: "حمولة قتالية متكاملة مع منصات مدافع متقدمة",
    powerSupply: "محطة توليد كهرباء داخلية مع مضخات هواء مفلتر",
    structuralMaterials: "خرسانة مسلحة بقضبان صلب مزدوجة لتشتيت عصف الانفجارات",
    description: "أحدث تصاميم قلاع الدفاع الجوي؛ حيث تم استبدال الشكل المربع بالشكل الأسطواني لتشتيت موجات عصف القنابل وتقليل المقاومة الهوائية، وهو المبدأ الذي تتبناه الهياكل الشبكية السعودية الحديثة للتخلص التام من قوى العصف والرياح.",
    tacticalNecessityAsFinalDefense: "أثبت التصميم الأسطواني المعزز قدرة فائقة على النجاة والاستمرار في القتال حتى بعد تدمير المحيط الخارجي بالكامل.",
    equipmentCountSummary: "4 منصات مدافع ثنائية 128 مم + منصات 37 مم و 20 مم",
    architecturalSpecs: {
      "الشكل الهندسي": "أسطواني مضلع بـ 16 ضلعاً لتشتيت الصدمات",
      "ارتفاع البرج": "55 متراً فوق حدائق فيينا",
      "مقاومة العصف": "صمم ليصمد أمام قنابل زنة 1,000 كجم بدون أي تشقق",
      "الحالة الراهنة": "قائم وسليم 100% حتى اليوم كشاهد معماري"
    },
    militaryEquipmentList: [
      {
        id: "flak_corner_sponsons",
        name: "منصات المدافع الزاوية البارزة (Corner Gun Sponsons)",
        category: "cannon",
        role: "توفير زوايا رماية متقاطعة 360° بدون أي حجب من جسم البرج",
        quantity: "4 منصات كابولية بارزة",
        weight: "أكثر من 120 طناً من الخرسانة والمدافع",
        powerDraw: "تغذية كهربائية من المولدات الداخلية",
        effectiveRange: "14,800 متر",
        mountingLocation: "الأطراف الأربعة البارزة لسطح البرج",
        mountingMethod: "كوابيل خرسانية مسلحة مسبقة الإجهاد تمتد 6 أمتار خارج جسم البرج.",
        installationSteps: [
          "صب الكوابيل الخرسانية المسبقة الإجهاد.",
          "تثبيت أطواق الدروع الفولاذية لحماية طواقم التلقيم.",
          "توصيل مصاعد الذخيرة السريعة من مستودعات الطوابق السفلية."
        ],
        billOfMaterials: [
          "خرسانة عالية المقاومة مدعمة بقضبان حديد التسليح الكثيف",
          "ألواح فولاذية مصفحة بسماكة 20 ملم لحماية المنصات",
          "مدافع ثنائية 128 مم ومدافع 37 مم أوتوماتيكية"
        ],
        coolingAndSafety: "تهوية قسرية لغرف التلقيم مع مصاعد ذخيرة مصفحة مقاومة للحريق.",
        specifications: {
          "بروز المنصة": "6 أمتار عن الجدار الخارجي لتأمين زوايا رماية سفلية",
          "زاوية التغطية": "نيران متقاطعة تغطي كافة جهات الأفق الأربعة"
        }
      }
    ]
  }
};

interface StructureDossierModalProps {
  dossierId: string | null;
  onClose: () => void;
  onSelectComponentForDrillDown?: (comp: MilitaryEquipmentItem) => void;
}

export default function StructureDossierModal({
  dossierId,
  onClose
}: StructureDossierModalProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<MilitaryEquipmentItem | null>(null);

  if (!dossierId || !structureDossiers[dossierId]) return null;

  const dossier = structureDossiers[dossierId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${dossier.badgeColor === "emerald" ? "bg-emerald-950 text-emerald-400 border border-emerald-700/50" : "bg-amber-950 text-amber-400 border border-amber-700/50"}`}>
              {dossier.is3dRender ? <Sparkles className="w-5 h-5" /> : <History className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${dossier.badgeColor === "emerald" ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40" : "bg-amber-950/80 text-amber-300 border-amber-500/40"}`}>
                  {dossier.categoryBadge}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{dossier.yearOrEra}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display text-white mt-0.5">
                {dossier.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed font-sans">
          
          {/* Top Visual & Quick Spec Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Visual Preview (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-950 rounded-xl border border-slate-800 p-3 flex flex-col justify-between overflow-hidden shadow-inner">
              {dossier.imageUrl ? (
                <div className="relative w-full h-56 rounded-lg overflow-hidden">
                  <Image
                    src={dossier.imageUrl}
                    alt={dossier.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full h-56 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="font-bold text-white text-xs block mb-1">
                    المخطط الهندسي ثلاثي الأبعاد 3D
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {dossier.renderType === "380kv_retrofit" ? "نموذج صاري 380kV مع المنصة العلوية" : "نموذج البرج التكتيكي المعياري المخصص"}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 mt-2 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                    CAD Spec: Verified Military Load 100%
                  </span>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-slate-800/80 flex justify-between items-center text-[11px] font-mono text-slate-400">
                <span>الارتفاع الإنشائي: <strong className="text-white">{dossier.height}</strong></span>
                <span>الحمولة: <strong className="text-emerald-400">{dossier.payloadCapacity}</strong></span>
              </div>
            </div>

            {/* Strategic Overview & Tactical Necessity (7 Cols) */}
            <div className="lg:col-span-7 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-emerald-400 font-bold block">
                  التحليل المعماري والهدف الاستراتيجي:
                </span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {dossier.description}
                </p>
              </div>

              {/* Highlight Box: Tactical Necessity as Final Line of Defense */}
              <div className="p-3.5 bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-950 rounded-xl border border-amber-500/40 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                  <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>ضرورة الاستفادة كـ «آخر خط دفاعي» لتحصين المنشآت الحيوية:</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {dossier.tacticalNecessityAsFinalDefense}
                </p>
              </div>

              {/* Architectural Specs Summary Table */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">أبعاد القاعدة:</span>
                  <span className="text-white font-bold">{dossier.baseDimensions}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">مصدر التغذية الكهربائية:</span>
                  <span className="text-amber-400 font-bold">{dossier.powerSupply}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Military Equipment & Defense Weapons Catalog (Drill-Down Trigger) */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                  دليل القطع العسكرية والتجهيزات القابلة للتركيب ({dossier.equipmentCountSummary})
                </span>
                <h4 className="text-sm font-bold font-display text-white">
                  المعدات والمنظومات الدفاعية المدمجة على الهيكل:
                </h4>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/50 px-2 py-1 rounded border border-amber-600/30">
                👇 انقر على أي قطعة لفتح خريطة ومخطط التركيب والتجهيز الهندسي الدقيق
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dossier.militaryEquipmentList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedEquipment(item)}
                  className="p-3.5 bg-slate-950/90 rounded-xl border border-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer group flex flex-col justify-between space-y-2 hover:bg-slate-950 shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 group-hover:scale-105 transition-transform">
                        {item.category === "radar" && <Radio className="w-4 h-4" />}
                        {item.category === "cannon" && <Target className="w-4 h-4" />}
                        {item.category === "laser" && <Zap className="w-4 h-4" />}
                        {item.category === "missile" && <Flame className="w-4 h-4" />}
                        {item.category === "power" && <Cpu className="w-4 h-4" />}
                      </div>
                      <div>
                        <h5 className="font-bold text-white text-xs group-hover:text-emerald-300 transition-colors">
                          {item.name}
                        </h5>
                        <span className="text-[10px] text-slate-400 block line-clamp-1">
                          {item.role}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 shrink-0">
                      {item.quantity}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono pt-1 border-t border-slate-800/60 text-slate-400">
                    <div>
                      <span className="block text-[8px] text-slate-500">الوزن:</span>
                      <span className="text-slate-200 font-bold">{item.weight}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-500">الاستهلاك:</span>
                      <span className="text-amber-400 font-bold">{item.powerDraw}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-slate-500">المدى:</span>
                      <span className="text-emerald-400 font-bold">{item.effectiveRange}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-emerald-400 pt-1 group-hover:text-emerald-300">
                    <span>عرض مخطط التركيب والمواد والتفاصيل الحيوية</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>البيانات الهندسية موثقة وفق كود البناء العسكري السعودي</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-sans font-semibold"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>

      {/* Drill-Down Level 2 Inspector Modal: Military Component Blueprint & Mounting Guide */}
      {selectedEquipment && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-lg overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-emerald-500/50 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setSelectedEquipment(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>العودة للبرج</span>
                </button>
                <div className="h-4 w-px bg-slate-700" />
                <h4 className="font-bold font-display text-white text-sm sm:text-base">
                  مخطط التجهيز والتركيب الهندسي: {selectedEquipment.name}
                </h4>
              </div>

              <button
                onClick={() => setSelectedEquipment(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drill-down Body */}
            <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed font-sans">
              
              {/* Core Mounting Blueprint Schematic (SVG Interactive Diagram) */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>خريطة ومخطط التثبيت الميكانيكي والعزل الكهرومغناطيسي:</span>
                  </span>
                  <span className="text-slate-400">موقع التركيب: {selectedEquipment.mountingLocation}</span>
                </div>

                {/* Technical SVG Blueprint Representation */}
                <svg viewBox="0 0 400 130" className="w-full h-28 bg-slate-900 rounded-lg border border-slate-800/80">
                  <defs>
                    <linearGradient id="cadGrid" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#064e3b" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="130" fill="url(#cadGrid)" />
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="25" x2="400" y2="25" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="4 4" />
                  <line x1="0" y1="65" x2="400" y2="65" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="4 4" />
                  <line x1="0" y1="105" x2="400" y2="105" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="4 4" />
                  <line x1="100" y1="0" x2="100" y2="130" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="4 4" />
                  <line x1="200" y1="0" x2="200" y2="130" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="4 4" />
                  <line x1="300" y1="0" x2="300" y2="130" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="4 4" />

                  {/* Mounting Bracket & Shock Absorber Base */}
                  <rect x="140" y="85" width="120" height="18" rx="3" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="200" y="97" fill="#6ee7b7" fontSize="8" textAnchor="middle" fontFamily="monospace">قاعدة التثبيت الميكانيكي Ti-6Al-4V</text>

                  {/* Dampers Left & Right */}
                  <rect x="150" y="65" width="16" height="20" rx="2" fill="#d97706" />
                  <text x="158" y="77" fill="#fff" fontSize="6" textAnchor="middle">MR Damp</text>
                  <rect x="234" y="65" width="16" height="20" rx="2" fill="#d97706" />
                  <text x="242" y="77" fill="#fff" fontSize="6" textAnchor="middle">MR Damp</text>

                  {/* Component Chassis */}
                  <rect x="160" y="30" width="80" height="35" rx="4" fill="#047857" stroke="#34d399" strokeWidth="1.8" />
                  <text x="200" y="50" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">{selectedEquipment.category.toUpperCase()}</text>

                  {/* Telemetry Links & Connectors */}
                  <line x1="80" y1="94" x2="140" y2="94" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
                  <circle cx="80" cy="94" r="3" fill="#38bdf8" />
                  <text x="75" y="85" fill="#38bdf8" fontSize="7">تغذية 380kV Tap</text>

                  <line x1="260" y1="94" x2="320" y2="94" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 2" />
                  <circle cx="320" cy="94" r="3" fill="#a855f7" />
                  <text x="325" y="85" fill="#a855f7" fontSize="7">ألياف OPGW C4I</text>

                  <text x="200" y="122" fill="#94a3b8" fontSize="7" textAnchor="middle" fontFamily="monospace">
                    Cross-Section: Integrated ISO-Mount & Electromagnetic Faraday Isolation
                  </text>
                </svg>

                <p className="text-slate-300 text-[11px] leading-relaxed pt-1">
                  <strong>طريقة التثبيت الميكانيكي:</strong> {selectedEquipment.mountingMethod}
                </p>
              </div>

              {/* Exact Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">الوزن الإجمالي:</span>
                  <span className="text-emerald-400 font-bold">{selectedEquipment.weight}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">استهلاك الطاقة:</span>
                  <span className="text-amber-400 font-bold">{selectedEquipment.powerDraw}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">المدى المؤثر:</span>
                  <span className="text-sky-400 font-bold">{selectedEquipment.effectiveRange}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[9px]">العدد المخصص:</span>
                  <span className="text-white font-bold">{selectedEquipment.quantity}</span>
                </div>
              </div>

              {/* Step-by-Step Installation Procedure */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2">
                <span className="text-[11px] font-mono text-amber-400 font-bold flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>خطوات التركيب والتجهيز الهندسي خطوة بخطوة:</span>
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] pr-1">
                  {selectedEquipment.installationSteps.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Bill of Materials (BOM) & Alloys */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2">
                <span className="text-[11px] font-mono text-purple-400 font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>قائمة المواد والسبائك المستخدمة (Bill of Materials):</span>
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {selectedEquipment.billOfMaterials.map((mat, idx) => (
                    <li key={idx} className="p-2 bg-slate-900 rounded border border-slate-800 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      <span className="text-slate-300">{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Critical Cooling, Safety & Environmental Life Support */}
              <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/40 text-[11px] space-y-1">
                <span className="text-emerald-300 font-bold font-mono block">
                  التفاصيل الحيوية والتبريد والسلامة العملياتية:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {selectedEquipment.coolingAndSafety}
                </p>
              </div>
            </div>

            {/* Drill-down Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setSelectedEquipment(null)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors font-semibold text-xs"
              >
                تم الاطلاع · العودة للملف العام
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
