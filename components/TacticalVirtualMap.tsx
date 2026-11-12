"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  MapPin, Shield, Layers, Crosshair, Radar, RefreshCw, AlertTriangle, CheckCircle,
  Navigation, Move, Eye, Flame, Compass, Maximize2, RotateCcw, AlertOctagon, Zap,
  Activity, Sliders, Play, Square, FastForward, ShieldAlert, Cpu, Radio, ChevronRight,
  TrendingDown, Globe, Sparkles, Plus, Trash2, Truck, Disc, Settings2, Target,
  Route, Waypoints, Repeat, Check
} from "lucide-react";
import { tacticalAudio } from "@/lib/audio";

// ==========================================
// TACTICAL 3D TYPES & PRESETS
// ==========================================

export interface FacilityLocation {
  id: "seaport" | "military_base" | "airfield" | "oil_refinery";
  name: string;
  subName: string;
  region: string;
  description: string;
  threatDirections: { angle: number; label: string; threatType: string; elevationDeg: number }[];
  strategicImportance: string;
  baseAltitudeM: number;
}

export const facilityPresets: FacilityLocation[] = [
  {
    id: "seaport",
    name: "ميناء الصناعات الأساسية والتحويلية",
    subName: "الواجهة البحرية الساحلية - البحر الأحمر",
    region: "القطاع الساحلي الاستراتيجي",
    description: "حماية ملاحية شاملة للأرصفة البحرية، محطات تصدير البتروكيماويات، ومحطات تحلية المياه ضد الصواريخ الجوالة المضادة للسفن والمسيرات الانتحارية الساحلية.",
    threatDirections: [
      { angle: 270, label: "القطاع البحري المفتوح (البحر الأحمر)", threatType: "صواريخ جوالة كاشطة لسطح البحر", elevationDeg: 3 },
      { angle: 320, label: "المسار الساحلي المنخفض", threatType: "زوارق مسيرة ودرونز تحليق بطيء", elevationDeg: 5 },
      { angle: 45, label: "الممرات الجبلية الوعرة", threatType: "مقذوفات تكتيكية موجهة تتبع التضاريس", elevationDeg: 18 },
    ],
    strategicImportance: "بوابة لوجستية وصناعية كبرى لرؤية 2030 تربط خطوط الملاحة ومحطات التكرير الدولية.",
    baseAltitudeM: 4,
  },
  {
    id: "military_base",
    name: "قاعدة الملك خالد العسكرية الاستراتيجية",
    subName: "منظومة القيادة والسيطرة الميدانية المشتركة C4I",
    region: "القطاع التكتيكي الميداني",
    description: "تأمين مراكز العمليات والتحكم C4I، مرابض المدفعية، ومستودعات الذخائر الاستراتيجية بين السلاسل الجبلية ضد الصواريخ الباليستية التكتيكية وهجمات الأسراب.",
    threatDirections: [
      { angle: 180, label: "الأودية والممرات الجبلية المتقدمة", threatType: "صواريخ كروز تتبع التضاريس (Terrain Masking)", elevationDeg: 8 },
      { angle: 225, label: "محور التلال الساحلية الغربية", threatType: "أسراب درونز انتحارية مشتتة", elevationDeg: 14 },
      { angle: 110, label: "المرتفعات الشرقية الوعرة", threatType: "مقذوفات باليستية دقيقة انقضاضية", elevationDeg: 65 },
    ],
    strategicImportance: "حصن القيادة الميدانية وحماية التشكيلات المقاتلة بالقطاع الاستراتيجي.",
    baseAltitudeM: 42,
  },
  {
    id: "airfield",
    name: "قاعدة الملك فيصل الجوية ومطار المقاتلات المتقدم",
    subName: "مدرجات إقلاع مقاتلات F-15SA والتايفون ومخازن الوقود",
    region: "القطاع الاستراتيجي الغربي",
    description: "تأمين مخاريط الهبوط والإقلاع للطائرات الاعتراضية، حظائر الصيانة المصفحة (HAS)، ومستودعات الوقود ضد الصواريخ الموجهة ذات الرؤوس الفردية.",
    threatDirections: [
      { angle: 310, label: "محور الاقتراب التكتيكي المنخفض", threatType: "صواريخ كروز شبحية منخفضة جداً", elevationDeg: 4 },
      { angle: 130, label: "المسار الجوي المفتوح", threatType: "أسراب مسيرات تشبعية متزامنة", elevationDeg: 12 },
    ],
    strategicImportance: "قاعدة السيادة الجوية لحماية الأجواء الوطنية للمملكة واعتراض الأهداف المعادية.",
    baseAltitudeM: 18,
  },
  {
    id: "oil_refinery",
    name: "مجمع المصفاة الوطنية للبترول ومرافق الطاقة الاستراتيجية",
    subName: "مجمع تكرير 400,000 برميل يومياً ومستودعات الخام والغاز",
    region: "المدينة الاقتصادية المتقدمة",
    description: "حماية أبراج التقطير الحساسة، مستودعات تخزين الغاز المسال، وخزانات النفط الخام الاستراتيجية لمنع أي شلل في الإمدادات النفطية الوطنية.",
    threatDirections: [
      { angle: 285, label: "المسار الساحلي الغربي", threatType: "مسيرات بعيدة المدى وصواريخ موجهة", elevationDeg: 6 },
      { angle: 25, label: "المحور الشمالي الصحراوي", threatType: "هجمات تشبعية متعددة الاتجاهات", elevationDeg: 22 },
    ],
    strategicImportance: "ركيزة الطاقة الكبرى التي تمد المناطق بالمشتقات المكررة والكهرباء.",
    baseAltitudeM: 8,
  },
];

export type DefenseUnitCategory = "pylon_cluster" | "stationary_battery" | "mobile_battery";

export type DefenseUnitRole =
  | "radar"             // برج رادار AESA / EO-IR معلق
  | "ciws"              // برج مدفع رشاش ثنائي 35mm
  | "laser"             // برج مدفع ليزر HEL فائق الطاقة
  | "vls_missile"       // برج قواذف صواريخ عمودية
  | "patriot_sam"       // بطارية باتريوت MIM-104 أرضية ثابتة
  | "thaad_battery"     // منظومة ثاد الدفاعية للارتفاعات الشاهقة
  | "mobile_pantsir"    // منظومة بانتسير مدولبة متحركة (شاحنة 8x8)
  | "mobile_crotale"    // بطارية كروتال/شاهين مدولبة متحركة (6x6)
  | "mobile_radar";     // رادار كشف تكتيكي متحرك على عربة

export interface DefenseUnit3D {
  id: number;
  category: DefenseUnitCategory;
  role: DefenseUnitRole;
  name: string;
  x: number; // 3D world coord [-90, 90]
  y: number; // 3D world coord [-90, 90]
  heightM: number; // height (Pylon: 35-65m, Vehicles/Ground: 3-6m)
  rangeKm: number;
  ammoCount: number;
  status: "active" | "tracking" | "firing" | "reloading";
  aimYaw: number;
  aimPitch: number;
  isMobile: boolean;
  patrolActive: boolean;
  patrolCenterX?: number;
  patrolCenterY?: number;
  patrolRadius: number;
  patrolAngle: number;
  patrolPattern?: "circle" | "linear" | "figure_eight";
  speedKmH: number;
  headingDeg: number;
}

export interface Threat3D {
  id: string;
  name: string;
  type: "cruise_missile" | "drone_swarm" | "ballistic_dive" | "sea_skimmer";
  x: number;
  y: number;
  z: number; // altitude in 3D world
  vx: number;
  vy: number;
  vz: number;
  speedMach: number;
  rcsSqm: number;
  status: "approaching" | "masked_by_terrain" | "radar_locked" | "engaged" | "intercepted" | "breached";
  trail: { x: number; y: number; z: number }[];
  interceptedBy?: string;
  killX?: number;
  killY?: number;
  killZ?: number;
}

export interface SecurityVulnerability {
  id: string;
  severity: "critical" | "warning" | "optimized";
  category: "terrain_masking" | "angular_gap" | "saturation_limit" | "dead_zone";
  title: string;
  description: string;
  bearingDeg: number;
  penetrationKm: number;
  remedyAction: string;
}

export interface TacticalFormationPreset {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  doctrine: string;
  coverageRating: number;
  units: DefenseUnit3D[];
}

export const tacticalFormationPresets: TacticalFormationPreset[] = [
  {
    id: "tri_layer_bastion",
    name: "تشكيل الحصن الثلاثي المحيطي (Tri-Layer Bastion)",
    subtitle: "توزيع محيطي متساوي الأضلاع + بطارية مركزية + دورية حزام خارجي",
    description: "توزيع هندسي متوازن لأبراج المنظومة على محيط مثلثي يغطي 360°، مع بطارية باتريوت مركزية في دشم خرسانية ودورية بانتسير متحركة للمسح المستمر للممرات.",
    badge: "توزيع قياسي شامل",
    doctrine: "تأمين شامل متوازن لجميع محاور الاقتراب الجوي والبحري والمنخفض.",
    coverageRating: 98,
    units: [
      {
        id: 1,
        category: "pylon_cluster",
        role: "radar",
        name: "برج 1 (AESA / EO-IR) - رصد جوي",
        x: -35,
        y: -25,
        heightM: 45,
        rangeKm: 35,
        ammoCount: 100,
        status: "active",
        aimYaw: 270,
        aimPitch: 10,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 270,
      },
      {
        id: 2,
        category: "pylon_cluster",
        role: "ciws",
        name: "برج 2 (رشاش ثنائي 35mm ليزري)",
        x: -45,
        y: 15,
        heightM: 45,
        rangeKm: 15,
        ammoCount: 480,
        status: "active",
        aimYaw: 280,
        aimPitch: 8,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 280,
      },
      {
        id: 3,
        category: "pylon_cluster",
        role: "laser",
        name: "برج 3 (مدفع ليزر HEL فائق الطاقة)",
        x: -20,
        y: 45,
        heightM: 45,
        rangeKm: 22,
        ammoCount: 100,
        status: "active",
        aimYaw: 260,
        aimPitch: 12,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 260,
      },
      {
        id: 4,
        category: "pylon_cluster",
        role: "vls_missile",
        name: "برج 4 (صواريخ VLS عمودية)",
        x: 35,
        y: -30,
        heightM: 45,
        rangeKm: 25,
        ammoCount: 16,
        status: "active",
        aimYaw: 45,
        aimPitch: 45,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 45,
      },
      {
        id: 5,
        category: "stationary_battery",
        role: "patriot_sam",
        name: "بطارية باتريوت MIM-104 (PAC-3)",
        x: 20,
        y: 20,
        heightM: 5,
        rangeKm: 40,
        ammoCount: 16,
        status: "active",
        aimYaw: 310,
        aimPitch: 35,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 310,
      },
      {
        id: 6,
        category: "mobile_battery",
        role: "mobile_pantsir",
        name: "منظومة بانتسير-S1 مدولبة متحركة (8x8)",
        x: 48,
        y: 40,
        heightM: 4,
        rangeKm: 18,
        ammoCount: 300,
        status: "active",
        aimYaw: 330,
        aimPitch: 15,
        isMobile: true,
        patrolActive: true,
        patrolCenterX: 48,
        patrolCenterY: 40,
        patrolRadius: 18,
        patrolAngle: 45,
        patrolPattern: "circle",
        speedKmH: 60,
        headingDeg: 90,
      },
    ],
  },
  {
    id: "linear_coastal_wall",
    name: "تشكيل جدار الصد الساحلي والحدودي (Linear Coastal / Border Wall)",
    subtitle: "نسق مواجهة طولي مدعم برادارات متداخلة ودوريات كشط ساحلي",
    description: "تمركز خطي محكم موجه للواجهة الساحلية أو الشريط الحدودي، يدمج الرادارات المعلقة ومدافع الليزر في خط اشتباك متصل، مع دورية متحركة ترددية على طول الشاطئ لاعتراض الصواريخ الكاشطة للأمواج.",
    badge: "مخصص للتهديدات البحرية والساحلية",
    doctrine: "إغلاق الواجهة الساحلية تماماً ومنع أي تسلل منخفض لسطح الماء.",
    coverageRating: 96,
    units: [
      {
        id: 1,
        category: "pylon_cluster",
        role: "radar",
        name: "برج 1 (AESA / EO-IR) - رصد ساحلي شمالي",
        x: -55,
        y: -40,
        heightM: 50,
        rangeKm: 40,
        ammoCount: 100,
        status: "active",
        aimYaw: 270,
        aimPitch: 8,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 270,
      },
      {
        id: 2,
        category: "pylon_cluster",
        role: "ciws",
        name: "برج 2 (رشاش 35mm ثنائي) - اعتراض الشاطئ",
        x: -50,
        y: -5,
        heightM: 45,
        rangeKm: 15,
        ammoCount: 480,
        status: "active",
        aimYaw: 270,
        aimPitch: 6,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 270,
      },
      {
        id: 3,
        category: "pylon_cluster",
        role: "laser",
        name: "برج 3 (مدفع ليزر HEL) - حاجز الطاقة الساحلي",
        x: -45,
        y: 35,
        heightM: 45,
        rangeKm: 22,
        ammoCount: 100,
        status: "active",
        aimYaw: 270,
        aimPitch: 10,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 270,
      },
      {
        id: 4,
        category: "stationary_battery",
        role: "patriot_sam",
        name: "بطارية باتريوت PAC-3 - العمق التكتيكي",
        x: 10,
        y: -10,
        heightM: 5,
        rangeKm: 45,
        ammoCount: 16,
        status: "active",
        aimYaw: 270,
        aimPitch: 30,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 270,
      },
      {
        id: 5,
        category: "mobile_battery",
        role: "mobile_pantsir",
        name: "دورية بانتسير 8x8 - مسار الساحل الخطي",
        x: -30,
        y: 10,
        heightM: 4,
        rangeKm: 18,
        ammoCount: 300,
        status: "active",
        aimYaw: 270,
        aimPitch: 12,
        isMobile: true,
        patrolActive: true,
        patrolCenterX: -30,
        patrolCenterY: 10,
        patrolRadius: 25,
        patrolAngle: 0,
        patrolPattern: "linear",
        speedKmH: 65,
        headingDeg: 0,
      },
      {
        id: 6,
        category: "mobile_battery",
        role: "mobile_radar",
        name: "عربة استطلاع راداري متحركة - الجناح الجنوبي",
        x: -15,
        y: 55,
        heightM: 5,
        rangeKm: 38,
        ammoCount: 100,
        status: "active",
        aimYaw: 250,
        aimPitch: 14,
        isMobile: true,
        patrolActive: true,
        patrolCenterX: -15,
        patrolCenterY: 55,
        patrolRadius: 15,
        patrolAngle: 180,
        patrolPattern: "circle",
        speedKmH: 50,
        headingDeg: 250,
      },
    ],
  },
  {
    id: "concentric_layered_citadel",
    name: "تشكيل الحصن المتراكز ثلاثي الطبقات (Concentric Layered Citadel)",
    subtitle: "دفاع نقطي لصيق + مظلة أبراج متوسطة + منظومات بعيدة المدى",
    description: "تشكيل الحماية القصوى للمنشآت الحساسة للغاية؛ حلقة داخلية من الليزر والرشاشات لحماية الأهداف مباشرة، حلقة وسطى من أبراج الضغط العالي، وحلقة خارجية من صواريخ الباتريوت والثاد والدوريات الميدانية.",
    badge: "أقصى حماية للمنشآت الاستراتيجية",
    doctrine: "طبقات دفاعية متراكبة تضمن عدم إفلات أي هدف مهما بلغت كثافة الهجوم.",
    coverageRating: 99,
    units: [
      {
        id: 1,
        category: "pylon_cluster",
        role: "radar",
        name: "برج 1 (AESA / EO-IR) - رصد مركزي 360°",
        x: 0,
        y: -40,
        heightM: 55,
        rangeKm: 42,
        ammoCount: 100,
        status: "active",
        aimYaw: 0,
        aimPitch: 15,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 0,
      },
      {
        id: 2,
        category: "pylon_cluster",
        role: "laser",
        name: "برج 2 (مدفع ليزر HEL) - النواة الداخلية",
        x: -15,
        y: -5,
        heightM: 45,
        rangeKm: 22,
        ammoCount: 100,
        status: "active",
        aimYaw: 240,
        aimPitch: 12,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 240,
      },
      {
        id: 3,
        category: "pylon_cluster",
        role: "ciws",
        name: "برج 3 (رشاش 35mm ثنائي) - النواة الداخلية",
        x: 15,
        y: 10,
        heightM: 45,
        rangeKm: 15,
        ammoCount: 480,
        status: "active",
        aimYaw: 60,
        aimPitch: 10,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 60,
      },
      {
        id: 4,
        category: "stationary_battery",
        role: "patriot_sam",
        name: "بطارية باتريوت PAC-3 - الحلقة الخارجية الشمالية",
        x: -45,
        y: 35,
        heightM: 5,
        rangeKm: 45,
        ammoCount: 16,
        status: "active",
        aimYaw: 315,
        aimPitch: 35,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 315,
      },
      {
        id: 5,
        category: "stationary_battery",
        role: "thaad_battery",
        name: "منظومة ثاد THAAD - درع الارتفاعات الشاهقة",
        x: 45,
        y: -20,
        heightM: 6,
        rangeKm: 70,
        ammoCount: 8,
        status: "active",
        aimYaw: 45,
        aimPitch: 50,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 45,
      },
      {
        id: 6,
        category: "mobile_battery",
        role: "mobile_pantsir",
        name: "دورية بانتسير 8x8 - طواف الحزام المحيطي",
        x: 0,
        y: 50,
        heightM: 4,
        rangeKm: 18,
        ammoCount: 300,
        status: "active",
        aimYaw: 180,
        aimPitch: 15,
        isMobile: true,
        patrolActive: true,
        patrolCenterX: 0,
        patrolCenterY: 50,
        patrolRadius: 22,
        patrolAngle: 90,
        patrolPattern: "circle",
        speedKmH: 55,
        headingDeg: 180,
      },
    ],
  },
  {
    id: "mountain_valley_defile",
    name: "تشكيل سد ثغرات الأودية والممرات الجبلية (Mountain Defile & Anti-Masking)",
    subtitle: "أبراج على القمم الحاكمة + كمائن صاروخية ودوريات بالممرات المنخفضة",
    description: "تصميم هندسي متقدم مخصص للتضاريس الجبلية والوعرة؛ تمركز رادارات الأبراج على أعلى التلال لإلغاء الحجب التضاريسي، مع نشر بطاريات متحركة في بطون الأودية لاعتراض الصواريخ المتسللة.",
    badge: "مكافحة الحجب التضاريسي (Anti-Masking)",
    doctrine: "منع استغلال تضاريس الجبال والأودية كمسارات تسلل منخفضة.",
    coverageRating: 97,
    units: [
      {
        id: 1,
        category: "pylon_cluster",
        role: "radar",
        name: "برج 1 (AESA) - قمة التل الشرقي (كاشف الأودية)",
        x: 42,
        y: -30,
        heightM: 55,
        rangeKm: 42,
        ammoCount: 100,
        status: "active",
        aimYaw: 180,
        aimPitch: 15,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 180,
      },
      {
        id: 2,
        category: "pylon_cluster",
        role: "radar",
        name: "برج 2 (AESA) - قمة التل الغربي",
        x: -40,
        y: -42,
        heightM: 50,
        rangeKm: 38,
        ammoCount: 100,
        status: "active",
        aimYaw: 220,
        aimPitch: 12,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 220,
      },
      {
        id: 3,
        category: "pylon_cluster",
        role: "laser",
        name: "برج 3 (مدفع ليزر HEL) - ممر الوادي المركزي",
        x: 0,
        y: 10,
        heightM: 45,
        rangeKm: 22,
        ammoCount: 100,
        status: "active",
        aimYaw: 180,
        aimPitch: 10,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 180,
      },
      {
        id: 4,
        category: "stationary_battery",
        role: "patriot_sam",
        name: "بطارية باتريوت PAC-3 - مرابض محصنة بالهضبة",
        x: -15,
        y: 40,
        heightM: 5,
        rangeKm: 42,
        ammoCount: 16,
        status: "active",
        aimYaw: 180,
        aimPitch: 35,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 180,
      },
      {
        id: 5,
        category: "mobile_battery",
        role: "mobile_crotale",
        name: "دورية كروتال 6x6 - كمين وادي التسلل الجنوبي",
        x: 25,
        y: 45,
        heightM: 4,
        rangeKm: 15,
        ammoCount: 120,
        status: "active",
        aimYaw: 180,
        aimPitch: 15,
        isMobile: true,
        patrolActive: true,
        patrolCenterX: 25,
        patrolCenterY: 45,
        patrolRadius: 20,
        patrolAngle: 0,
        patrolPattern: "figure_eight",
        speedKmH: 60,
        headingDeg: 180,
      },
      {
        id: 6,
        category: "mobile_battery",
        role: "mobile_pantsir",
        name: "دورية بانتسير 8x8 - مسح الممرات الوعرة",
        x: -35,
        y: 15,
        heightM: 4,
        rangeKm: 18,
        ammoCount: 300,
        status: "active",
        aimYaw: 210,
        aimPitch: 15,
        isMobile: true,
        patrolActive: true,
        patrolCenterX: -35,
        patrolCenterY: 15,
        patrolRadius: 16,
        patrolAngle: 90,
        patrolPattern: "circle",
        speedKmH: 50,
        headingDeg: 210,
      },
    ],
  },
  {
    id: "mobile_escort_patrol",
    name: "تشكيل الدوريات المتنقلة والمطاردة النشطة (Mobile Escort & Intercept Grid)",
    subtitle: "شبكة متعددة من الدوريات الميدانية المتحركة ذاتية الملاحة",
    description: "تركيز تكتيكي على الحركية العالية؛ 3 منظومات مدولبة متحركة (بانتسير، كروتال، ورادار استطلاع) تجوب مساراتها الديناميكية بالتزامن مع أبراج القيادة لتوفير مرونة اعتراض فورية.",
    badge: "حركية ميدانية ومطاردة نشطة",
    doctrine: "مباغتة الأهداف وتغيير مواقع الإطلاق باستمرار لتفادي القصف المضاد.",
    coverageRating: 95,
    units: [
      {
        id: 1,
        category: "pylon_cluster",
        role: "radar",
        name: "برج 1 (AESA / C4I) - قيادة وتوجيه القطاع",
        x: 0,
        y: -30,
        heightM: 50,
        rangeKm: 42,
        ammoCount: 100,
        status: "active",
        aimYaw: 270,
        aimPitch: 12,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 270,
      },
      {
        id: 2,
        category: "pylon_cluster",
        role: "laser",
        name: "برج 2 (مدفع ليزر HEL) - حماية مركز السيطرة",
        x: -25,
        y: -10,
        heightM: 45,
        rangeKm: 22,
        ammoCount: 100,
        status: "active",
        aimYaw: 260,
        aimPitch: 10,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 260,
      },
      {
        id: 3,
        category: "stationary_battery",
        role: "patriot_sam",
        name: "بطارية باتريوت PAC-3 - التغطية المظلية",
        x: 25,
        y: -10,
        heightM: 5,
        rangeKm: 42,
        ammoCount: 16,
        status: "active",
        aimYaw: 300,
        aimPitch: 35,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 300,
      },
      {
        id: 4,
        category: "mobile_battery",
        role: "mobile_pantsir",
        name: "دورية بانتسير 1 - طواف الجناح الغربي",
        x: -45,
        y: 25,
        heightM: 4,
        rangeKm: 18,
        ammoCount: 300,
        status: "active",
        aimYaw: 270,
        aimPitch: 15,
        isMobile: true,
        patrolActive: true,
        patrolCenterX: -45,
        patrolCenterY: 25,
        patrolRadius: 20,
        patrolAngle: 0,
        patrolPattern: "circle",
        speedKmH: 60,
        headingDeg: 270,
      },
      {
        id: 5,
        category: "mobile_battery",
        role: "mobile_crotale",
        name: "دورية كروتال 2 - مسح الجناح الشرقي",
        x: 45,
        y: 25,
        heightM: 4,
        rangeKm: 15,
        ammoCount: 120,
        status: "active",
        aimYaw: 90,
        aimPitch: 15,
        isMobile: true,
        patrolActive: true,
        patrolCenterX: 45,
        patrolCenterY: 25,
        patrolRadius: 18,
        patrolAngle: 180,
        patrolPattern: "figure_eight",
        speedKmH: 65,
        headingDeg: 90,
      },
      {
        id: 6,
        category: "mobile_battery",
        role: "mobile_radar",
        name: "عربة رادار استطلاع متحركة - دورية متقدمة",
        x: 0,
        y: 55,
        heightM: 5,
        rangeKm: 40,
        ammoCount: 100,
        status: "active",
        aimYaw: 180,
        aimPitch: 15,
        isMobile: true,
        patrolActive: true,
        patrolCenterX: 0,
        patrolCenterY: 55,
        patrolRadius: 22,
        patrolAngle: 45,
        patrolPattern: "linear",
        speedKmH: 50,
        headingDeg: 180,
      },
    ],
  },
  {
    id: "high_value_asset_hub",
    name: "تشكيل حماية الأصول الحيوية والمنشأة (High-Value Asset Close-In Defense)",
    subtitle: "حزام دفاعي كثيف لصيق بالخزانات والمدرجات والأرصفة البحرية",
    description: "تركيز القدرات النارية والليزرية في حلقة محكمة حول المنشأة الحيوية لمنع وصول أي شظايا أو مقذوفات انتحارية إلى الخزانات أو المدرجات، مع دورية ميدانية حارسة للحزام الأمني.",
    badge: "حماية الخزانات والمدرجات",
    doctrine: "تدمير الأهداف على مسافات آمنة خارج النطاق الحراري للمنشأة.",
    coverageRating: 98,
    units: [
      {
        id: 1,
        category: "pylon_cluster",
        role: "radar",
        name: "برج 1 (AESA / EO-IR) - رصد محيط المنشأة",
        x: -25,
        y: -35,
        heightM: 50,
        rangeKm: 38,
        ammoCount: 100,
        status: "active",
        aimYaw: 270,
        aimPitch: 15,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 270,
      },
      {
        id: 2,
        category: "pylon_cluster",
        role: "ciws",
        name: "برج 2 (رشاش 35mm ثنائي) - حماية البنية التحتية",
        x: -30,
        y: 10,
        heightM: 45,
        rangeKm: 15,
        ammoCount: 480,
        status: "active",
        aimYaw: 260,
        aimPitch: 8,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 260,
      },
      {
        id: 3,
        category: "pylon_cluster",
        role: "laser",
        name: "برج 3 (مدفع ليزر HEL) - درع الطاقة اللصيق",
        x: 25,
        y: -20,
        heightM: 45,
        rangeKm: 22,
        ammoCount: 100,
        status: "active",
        aimYaw: 300,
        aimPitch: 12,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 300,
      },
      {
        id: 4,
        category: "pylon_cluster",
        role: "vls_missile",
        name: "برج 4 (صواريخ VLS عمودية) - حاجز الارتفاع",
        x: 20,
        y: 25,
        heightM: 45,
        rangeKm: 25,
        ammoCount: 16,
        status: "active",
        aimYaw: 45,
        aimPitch: 45,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 45,
      },
      {
        id: 5,
        category: "stationary_battery",
        role: "patriot_sam",
        name: "بطارية باتريوت PAC-3 - مرابض محصنة",
        x: -10,
        y: 40,
        heightM: 5,
        rangeKm: 42,
        ammoCount: 16,
        status: "active",
        aimYaw: 280,
        aimPitch: 35,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 280,
      },
      {
        id: 6,
        category: "mobile_battery",
        role: "mobile_pantsir",
        name: "دورية بانتسير 8x8 - طواف السياج الأمني",
        x: 40,
        y: 40,
        heightM: 4,
        rangeKm: 18,
        ammoCount: 300,
        status: "active",
        aimYaw: 315,
        aimPitch: 15,
        isMobile: true,
        patrolActive: true,
        patrolCenterX: 40,
        patrolCenterY: 40,
        patrolRadius: 18,
        patrolAngle: 30,
        patrolPattern: "circle",
        speedKmH: 55,
        headingDeg: 315,
      },
    ],
  },
];

// ==========================================
// 3D MATH HELPERS & PERSPECTIVE ENGINE
// ==========================================

interface Camera3D {
  yaw: number; // degrees: 0..360
  pitch: number; // degrees: 12..84
  zoom: number; // scale: 0.65..2.5
  panX: number;
  panY: number;
}

// Function to calculate terrain elevation Z at world (x, y) for each facility
function getTerrainElevation(x: number, y: number, facId: string): number {
  if (facId === "seaport") {
    // West is Red Sea (negative x)
    if (x < -20) return 0; // Sea level
    if (x < -10) return 2; // Shoreline
    // Inland gentle rise with northeast hill ridge
    const hill = Math.exp(-Math.pow((x - 45) / 25, 2) - Math.pow((y - 40) / 25, 2)) * 32;
    return 6 + hill;
  } else if (facId === "military_base") {
    // Southern and eastern rugged mountain passes
    const peak1 = Math.exp(-Math.pow((x - 40) / 20, 2) - Math.pow((y - 30) / 20, 2)) * 52;
    const peak2 = Math.exp(-Math.pow((x + 40) / 22, 2) - Math.pow((y - 45) / 22, 2)) * 48;
    const ridgeSouth = Math.exp(-Math.pow((y + 45) / 18, 2)) * 38;
    return 12 + peak1 + peak2 + ridgeSouth;
  } else if (facId === "airfield") {
    // Flat runway strip with subtle peripheral dunes
    const dune = Math.sin(x * 0.05) * Math.cos(y * 0.05) * 5;
    return 8 + Math.max(0, dune);
  } else if (facId === "oil_refinery") {
    // Graded flat petrochemical pad with protective coastal earth berms
    const berm = Math.exp(-Math.pow((x + 50) / 10, 2)) * 14;
    return 6 + berm;
  }
  return 8;
}

// 3D Perspective Projection Matrix
function project3D(
  x: number,
  y: number,
  z: number,
  camera: Camera3D,
  viewWidth: number,
  viewHeight: number
): { sx: number; sy: number; scale: number; depth: number } {
  const yawRad = (camera.yaw * Math.PI) / 180;
  const pitchRad = (camera.pitch * Math.PI) / 180;

  // Rotate around Z axis (Yaw)
  const x1 = x * Math.cos(yawRad) - y * Math.sin(yawRad);
  const y1 = x * Math.sin(yawRad) + y * Math.cos(yawRad);
  const z1 = z;

  // Rotate around X axis (Pitch)
  const x2 = x1;
  const y2 = y1 * Math.cos(pitchRad) - z1 * Math.sin(pitchRad);
  const z2 = y1 * Math.sin(pitchRad) + z1 * Math.cos(pitchRad);

  // Perspective projection
  const distance = 280;
  const depth = y2 + distance;
  const fov = 340;
  const scale = depth > 10 ? (fov / depth) * camera.zoom : 0.001;

  const sx = viewWidth / 2 + (x2 * scale) + camera.panX;
  const sy = viewHeight / 2 - (z2 * scale) + camera.panY;

  return { sx, sy, scale, depth };
}

// Exact closed-form inverse 3D projection for instant zero-lag smooth dragging
function unprojectScreenToGround(
  sx: number,
  sy: number,
  camera: Camera3D,
  viewWidth: number,
  viewHeight: number,
  facId: string
): { x: number; y: number; z: number } | null {
  const yawRad = (camera.yaw * Math.PI) / 180;
  const pitchRad = (camera.pitch * Math.PI) / 180;

  const fov = 340;
  const distance = 280;

  const nx = (sx - viewWidth / 2 - camera.panX) / (camera.zoom * fov);
  const ny = -(sy - viewHeight / 2 - camera.panY) / (camera.zoom * fov);

  const cosP = Math.cos(pitchRad);
  const sinP = Math.sin(pitchRad);
  const cosY = Math.cos(yawRad);
  const sinY = Math.sin(yawRad);

  if (Math.abs(cosP) < 0.0001) return null;

  const denom = ny * cosP - sinP;
  if (denom >= -0.0001) return null; // Ray pointing away from or parallel to ground plane

  // Step 1: Initial estimate with reference height Z = 8m
  let zEst = 8.0;
  let depth = (zEst - distance * sinP) / denom;
  if (depth <= 10 || depth > 1500) return null;

  let x1 = nx * depth;
  let y1 = (depth + zEst * sinP - distance) / cosP;

  let wx = x1 * cosY + y1 * sinY;
  let wy = -x1 * sinY + y1 * cosY;

  // Step 2: Damped refinement using exact terrain elevation at (wx, wy)
  const terrZ = getTerrainElevation(wx, wy, facId);
  zEst = 0.5 * zEst + 0.5 * terrZ;
  depth = (zEst - distance * sinP) / denom;
  if (depth <= 10 || depth > 1500) return null;

  x1 = nx * depth;
  y1 = (depth + zEst * sinP - distance) / cosP;

  wx = x1 * cosY + y1 * sinY;
  wy = -x1 * sinY + y1 * cosY;

  // Clamp within tactical grid boundaries [-85, 85]
  wx = Math.max(-85, Math.min(85, wx));
  wy = Math.max(-85, Math.min(85, wy));
  const finalZ = getTerrainElevation(wx, wy, facId);

  return { x: wx, y: wy, z: finalZ };
}

// Raycasting to verify if terrain masks line of sight between Radar and Target
function checkTerrainMasking(
  radarX: number, radarY: number, radarZ: number,
  targetX: number, targetY: number, targetZ: number,
  facId: string
): { isMasked: boolean; maskElev: number; maskDist: number } {
  const steps = 15;
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    const curX = radarX + (targetX - radarX) * t;
    const curY = radarY + (targetY - radarY) * t;
    const rayZ = radarZ + (targetZ - radarZ) * t;
    const terrZ = getTerrainElevation(curX, curY, facId);

    if (terrZ > rayZ + 1.5) {
      const dist = Math.sqrt(Math.pow(curX - radarX, 2) + Math.pow(curY - radarY, 2));
      return { isMasked: true, maskElev: Math.round(terrZ), maskDist: Math.round(dist) };
    }
  }
  return { isMasked: false, maskElev: 0, maskDist: 0 };
}

// Helper to draw unit badge on Canvas
function drawUnitBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  u: DefenseUnit3D,
  borderColor: string
) {
  const badgeW = 84;
  const badgeH = 17;
  ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1;
  ctx.fillRect(x - badgeW / 2, y - badgeH / 2, badgeW, badgeH);
  ctx.strokeRect(x - badgeW / 2, y - badgeH / 2, badgeW, badgeH);

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 9px sans-serif";
  ctx.textAlign = "center";
  const label =
    u.role === "radar" ? `رادار AESA [${u.id}]` :
    u.role === "ciws" ? `رشاش 35mm [${u.id}]` :
    u.role === "laser" ? `ليزر HEL [${u.id}]` :
    u.role === "patriot_sam" ? `باتريوت [${u.id}]` :
    u.role === "thaad_battery" ? `ثاد [${u.id}]` :
    u.role === "mobile_pantsir" ? `بانتسير [${u.id}]` : `وحدة [${u.id}]`;
  ctx.fillText(label, x, y + 3);
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function TacticalVirtualMap() {
  const [selectedFacility, setSelectedFacility] = useState<FacilityLocation>(facilityPresets[0]);
  const [mapMode, setMapMode] = useState<"satellite_3d" | "thermal_flir_3d" | "contour_tactical">("satellite_3d");
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);
  const [coverageFilter, setCoverageFilter] = useState<"all" | "radar" | "weapons">("all");
  const [showGrid3D, setShowGrid3D] = useState<boolean>(true);
  const [showPylonCables, setShowPylonCables] = useState<boolean>(true);
  const [showDomes3D, setShowDomes3D] = useState<boolean>(true);
  const [showPredictiveTrajectories, setShowPredictiveTrajectories] = useState<boolean>(true);

  // Interaction Mode: "orbit" (rotate/zoom 3D camera) or "move_unit" (freely drag and place defense elements)
  const [interactionMode, setInteractionMode] = useState<"orbit" | "move_unit">("orbit");

  // Adding Unit Modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newUnitType, setNewUnitType] = useState<DefenseUnitRole>("mobile_pantsir");

  // 3D Camera State
  const [camera, setCamera] = useState<Camera3D>({
    yaw: 220,
    pitch: 42,
    zoom: 1.15,
    panX: 0,
    panY: 15,
  });

  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [draggedUnitId, setDraggedUnitId] = useState<number | null>(null);

  // Canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Complete Defense Units Fleet (Pylons + Stationary Batteries + Mobile Tactical Units)
  const [units, setUnits] = useState<DefenseUnit3D[]>([
    {
      id: 1,
      category: "pylon_cluster",
      role: "radar",
      name: "برج 1 (AESA / EO-IR) - رصد جوي",
      x: -35,
      y: -25,
      heightM: 45,
      rangeKm: 35,
      ammoCount: 100,
      status: "active",
      aimYaw: 270,
      aimPitch: 10,
      isMobile: false,
      patrolActive: false,
      patrolRadius: 0,
      patrolAngle: 0,
      speedKmH: 0,
      headingDeg: 270,
    },
    {
      id: 2,
      category: "pylon_cluster",
      role: "ciws",
      name: "برج 2 (رشاش ثنائي 35mm ليزري)",
      x: -45,
      y: 15,
      heightM: 45,
      rangeKm: 15,
      ammoCount: 480,
      status: "active",
      aimYaw: 280,
      aimPitch: 8,
      isMobile: false,
      patrolActive: false,
      patrolRadius: 0,
      patrolAngle: 0,
      speedKmH: 0,
      headingDeg: 280,
    },
    {
      id: 3,
      category: "pylon_cluster",
      role: "laser",
      name: "برج 3 (مدفع ليزر HEL فائق الطاقة)",
      x: -20,
      y: 45,
      heightM: 45,
      rangeKm: 22,
      ammoCount: 100,
      status: "active",
      aimYaw: 260,
      aimPitch: 12,
      isMobile: false,
      patrolActive: false,
      patrolRadius: 0,
      patrolAngle: 0,
      speedKmH: 0,
      headingDeg: 260,
    },
    {
      id: 4,
      category: "pylon_cluster",
      role: "vls_missile",
      name: "برج 4 (صواريخ VLS عمودية)",
      x: 35,
      y: -30,
      heightM: 45,
      rangeKm: 25,
      ammoCount: 16,
      status: "active",
      aimYaw: 45,
      aimPitch: 45,
      isMobile: false,
      patrolActive: false,
      patrolRadius: 0,
      patrolAngle: 0,
      speedKmH: 0,
      headingDeg: 45,
    },
    {
      id: 5,
      category: "stationary_battery",
      role: "patriot_sam",
      name: "بطارية باتريوت MIM-104 (PAC-3)",
      x: 20,
      y: 20,
      heightM: 5,
      rangeKm: 40,
      ammoCount: 16,
      status: "active",
      aimYaw: 310,
      aimPitch: 35,
      isMobile: false,
      patrolActive: false,
      patrolRadius: 0,
      patrolAngle: 0,
      speedKmH: 0,
      headingDeg: 310,
    },
    {
      id: 6,
      category: "mobile_battery",
      role: "mobile_pantsir",
      name: "منظومة بانتسير-S1 مدولبة متحركة (8x8)",
      x: 48,
      y: 40,
      heightM: 4,
      rangeKm: 18,
      ammoCount: 300,
      status: "active",
      aimYaw: 330,
      aimPitch: 15,
      isMobile: true,
      patrolActive: true,
      patrolCenterX: 48,
      patrolCenterY: 40,
      patrolRadius: 18,
      patrolAngle: 45,
      patrolPattern: "circle",
      speedKmH: 60,
      headingDeg: 90,
    },
  ]);

  // Active Strategic Deployment Formation
  const [activeFormation, setActiveFormation] = useState<string>("tri_layer_bastion");

  // Keep Ref synchronized to units for 60fps zero-flicker physics rendering
  const unitsRef = useRef<DefenseUnit3D[]>(units);
  useEffect(() => {
    unitsRef.current = units;
  }, [units]);

  // High-performance physics state ref for dynamic dragging & spring dynamics
  const dragPhysicsRef = useRef<{
    isDragging: boolean;
    unitId: number | null;
    targetX: number;
    targetY: number;
    vx: number;
    vy: number;
    zOffset: number;
    zVelocity: number;
  }>({
    isDragging: false,
    unitId: null,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    zOffset: 0,
    zVelocity: 0,
  });

  // Simulation Threats
  const [threats, setThreats] = useState<Threat3D[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simScenario, setSimScenario] = useState<"cruise_missile" | "drone_swarm" | "ballistic_dive" | "sea_skimmer">("cruise_missile");
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [simAuditLogs, setSimAuditLogs] = useState<string[]>([
    "تم تهيئة منظومة الدفاع الجوي المدمجة بنجاح (أبراج ضغط عالي + بطاريات ثابتة ومتحركة).",
  ]);

  // Active Selected Unit
  const activeUnit = units.find((u) => u.id === selectedUnitId) || units[0];

  // Dynamic autonomous patrol loop for mobile units (Preserving user-placed location)
  useEffect(() => {
    const patrolInterval = setInterval(() => {
      setUnits((prevUnits) =>
        prevUnits.map((u) => {
          if (!u.isMobile || !u.patrolActive) return u;

          // Do NOT override coordinates if user is actively dragging this unit
          if (dragPhysicsRef.current.isDragging && dragPhysicsRef.current.unitId === u.id) {
            return u;
          }

          // Use user-placed patrol center anchor (fallback to current position if not set)
          const centerX = u.patrolCenterX !== undefined ? u.patrolCenterX : u.x;
          const centerY = u.patrolCenterY !== undefined ? u.patrolCenterY : u.y;

          // Advance patrol angle based on speed
          const angleStep = (u.speedKmH / 60) * 1.6;
          const nextAngle = (u.patrolAngle + angleStep) % 360;
          const rad = (nextAngle * Math.PI) / 180;

          let newX = u.x;
          let newY = u.y;
          let heading = u.headingDeg;

          if (u.patrolPattern === "linear") {
            const yawRad = (u.aimYaw * Math.PI) / 180;
            const offset = Math.sin(rad) * u.patrolRadius;
            newX = Math.round(centerX + Math.cos(yawRad) * offset);
            newY = Math.round(centerY + Math.sin(yawRad) * offset);
            heading = Math.cos(rad) >= 0 ? u.aimYaw : (u.aimYaw + 180) % 360;
          } else if (u.patrolPattern === "figure_eight") {
            const scale = u.patrolRadius;
            newX = Math.round(centerX + scale * Math.sin(rad));
            newY = Math.round(centerY + scale * Math.sin(rad) * Math.cos(rad));
            const dx = Math.cos(rad);
            const dy = Math.cos(2 * rad);
            heading = (Math.atan2(dy, dx) * 180) / Math.PI;
          } else {
            // Default: Smooth 360-degree orbital perimeter sweep
            newX = Math.round(centerX + Math.cos(rad) * u.patrolRadius);
            newY = Math.round(centerY + Math.sin(rad) * u.patrolRadius);
            heading = (Math.atan2(-Math.sin(rad), Math.cos(rad)) * 180) / Math.PI + 90;
          }

          // Safe clamping within tactical boundaries
          newX = Math.max(-85, Math.min(85, newX));
          newY = Math.max(-85, Math.min(85, newY));

          return {
            ...u,
            patrolCenterX: centerX,
            patrolCenterY: centerY,
            x: newX,
            y: newY,
            patrolAngle: nextAngle,
            headingDeg: Math.round((heading + 360) % 360),
          };
        })
      );
    }, 120);

    return () => clearInterval(patrolInterval);
  }, []);

  // ==========================================
  // REAL-TIME VULNERABILITY AUDIT ALGORITHM
  // ==========================================
  const vulnerabilities: SecurityVulnerability[] = useMemo(() => {
    const list: SecurityVulnerability[] = [];
    const radarUnits = units.filter((u) => u.role === "radar" || u.role === "mobile_radar" || u.role === "patriot_sam");
    const weaponUnits = units.filter((u) => u.role !== "radar" && u.role !== "mobile_radar");

    // 1. Check Terrain Masking Vulnerabilities along preset threat bearings
    selectedFacility.threatDirections.forEach((threatDir, idx) => {
      const angleRad = (threatDir.angle * Math.PI) / 180;
      const testDist = 65;
      const targetX = Math.sin(angleRad) * testDist;
      const targetY = -Math.cos(angleRad) * testDist;
      const targetZ = Math.tan((threatDir.elevationDeg * Math.PI) / 180) * testDist;

      let clearLOS = false;
      let worstMaskElev = 0;
      radarUnits.forEach((radar) => {
        const rElev = getTerrainElevation(radar.x, radar.y, selectedFacility.id) + radar.heightM * 0.3;
        const los = checkTerrainMasking(radar.x, radar.y, rElev, targetX, targetY, targetZ, selectedFacility.id);
        if (!los.isMasked) {
          clearLOS = true;
        } else {
          worstMaskElev = Math.max(worstMaskElev, los.maskElev);
        }
      });

      if (!clearLOS) {
        list.push({
          id: `vuln-terrain-${idx}`,
          severity: "critical",
          category: "terrain_masking",
          title: `ثغرة حجب تضاريسي على المحور ${threatDir.label}`,
          description: `الرادارات الحالية تعاني من حجب بسبب تلال بارتفاع ${worstMaskElev}م؛ صواريخ كروز المنخفضة يمكنها التسلل دون رصد مبكر.`,
          bearingDeg: threatDir.angle,
          penetrationKm: 18.5,
          remedyAction: `انقل راداراً أو بطارية متحركة إلى قمة المرتفع لسد خط الرؤية الراداري فورياً.`,
        });
      }
    });

    // 2. Check Angular Interlocking Coverage Gaps between weapon units
    for (let i = 0; i < weaponUnits.length; i++) {
      for (let j = i + 1; j < weaponUnits.length; j++) {
        const u1 = weaponUnits[i];
        const u2 = weaponUnits[j];
        const dist = Math.sqrt(Math.pow(u1.x - u2.x, 2) + Math.pow(u1.y - u2.y, 2));

        if (dist > 75) {
          list.push({
            id: `vuln-gap-${u1.id}-${u2.id}`,
            severity: "warning",
            category: "angular_gap",
            title: `تباعد دفاعي مفرط بين [${u1.name}] و [${u2.name}]`,
            description: `المسافة المقاسة تبلغ ${(dist * 0.6).toFixed(1)} كم، مما يترك ثغرة تسلل تتجاوز مظلة النيران المتقاطعة.`,
            bearingDeg: Math.round(((Math.atan2(u2.y - u1.y, u2.x - u1.x) * 180) / Math.PI + 360) % 360),
            penetrationKm: 14.0,
            remedyAction: `قرب المسافة بين الوحدتين أو أضف بطارية متحركة في المنتصف لسد الفجوة.`,
          });
        }
      }
    }

    if (list.length === 0) {
      list.push({
        id: "vuln-none",
        severity: "optimized",
        category: "saturation_limit",
        title: "التوزيع الدفاعي محكم ومغطى بنسبة 100%",
        description: "تكامل فعال بين أبراج الضغط العالي والبطاريات الثابتة والمتحركة يغلق كافة محاور الاختراق التكتيكية.",
        bearingDeg: 0,
        penetrationKm: 0,
        remedyAction: "الوضعية الهندسية مطابقة لأعلى معايير الحماية المتكاملة.",
      });
    }

    return list;
  }, [units, selectedFacility]);

  // Handle adding a new defense unit
  const handleAddUnit = () => {
    const nextId = Math.max(...units.map((u) => u.id), 0) + 1;

    let newUnit: DefenseUnit3D;
    if (newUnitType === "radar") {
      newUnit = {
        id: nextId,
        category: "pylon_cluster",
        role: "radar",
        name: `برج ${nextId} (رادار AESA إضافي)`,
        x: Math.round(Math.random() * 40 - 20),
        y: Math.round(Math.random() * 40 - 20),
        heightM: 45,
        rangeKm: 35,
        ammoCount: 100,
        status: "active",
        aimYaw: 180,
        aimPitch: 15,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 180,
      };
    } else if (newUnitType === "ciws") {
      newUnit = {
        id: nextId,
        category: "pylon_cluster",
        role: "ciws",
        name: `برج ${nextId} (مدفع رشاش ثنائي 35mm)`,
        x: Math.round(Math.random() * 40 - 20),
        y: Math.round(Math.random() * 40 - 20),
        heightM: 45,
        rangeKm: 15,
        ammoCount: 480,
        status: "active",
        aimYaw: 220,
        aimPitch: 10,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 220,
      };
    } else if (newUnitType === "laser") {
      newUnit = {
        id: nextId,
        category: "pylon_cluster",
        role: "laser",
        name: `برج ${nextId} (مدفع ليزر HEL فائق الطاقة)`,
        x: Math.round(Math.random() * 40 - 20),
        y: Math.round(Math.random() * 40 - 20),
        heightM: 45,
        rangeKm: 22,
        ammoCount: 100,
        status: "active",
        aimYaw: 240,
        aimPitch: 12,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 240,
      };
    } else if (newUnitType === "patriot_sam") {
      newUnit = {
        id: nextId,
        category: "stationary_battery",
        role: "patriot_sam",
        name: `بطارية باتريوت ${nextId} (PAC-3)`,
        x: Math.round(Math.random() * 50 - 25),
        y: Math.round(Math.random() * 50 - 25),
        heightM: 5,
        rangeKm: 45,
        ammoCount: 16,
        status: "active",
        aimYaw: 300,
        aimPitch: 35,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 300,
      };
    } else if (newUnitType === "thaad_battery") {
      newUnit = {
        id: nextId,
        category: "stationary_battery",
        role: "thaad_battery",
        name: `منظومة ثاد ${nextId} (طبقي عالي)`,
        x: Math.round(Math.random() * 60 - 30),
        y: Math.round(Math.random() * 60 - 30),
        heightM: 6,
        rangeKm: 70,
        ammoCount: 8,
        status: "active",
        aimYaw: 0,
        aimPitch: 50,
        isMobile: false,
        patrolActive: false,
        patrolRadius: 0,
        patrolAngle: 0,
        speedKmH: 0,
        headingDeg: 0,
      };
    } else if (newUnitType === "mobile_crotale") {
      newUnit = {
        id: nextId,
        category: "mobile_battery",
        role: "mobile_crotale",
        name: `بطارية شاهين/كروتال مدولبة ${nextId}`,
        x: Math.round(Math.random() * 40 - 20),
        y: Math.round(Math.random() * 40 - 20),
        heightM: 4,
        rangeKm: 14,
        ammoCount: 120,
        status: "active",
        aimYaw: 140,
        aimPitch: 12,
        isMobile: true,
        patrolActive: true,
        patrolRadius: 15,
        patrolAngle: 0,
        speedKmH: 55,
        headingDeg: 140,
      };
    } else if (newUnitType === "mobile_radar") {
      newUnit = {
        id: nextId,
        category: "mobile_battery",
        role: "mobile_radar",
        name: `عربة رادار استطلاع متحركة ${nextId}`,
        x: Math.round(Math.random() * 50 - 25),
        y: Math.round(Math.random() * 50 - 25),
        heightM: 5,
        rangeKm: 42,
        ammoCount: 100,
        status: "active",
        aimYaw: 90,
        aimPitch: 15,
        isMobile: true,
        patrolActive: true,
        patrolRadius: 20,
        patrolAngle: 180,
        speedKmH: 50,
        headingDeg: 90,
      };
    } else {
      // mobile pantsir
      newUnit = {
        id: nextId,
        category: "mobile_battery",
        role: "mobile_pantsir",
        name: `منظومة بانتسير متحركة ${nextId} (8x8)`,
        x: Math.round(Math.random() * 40 - 20),
        y: Math.round(Math.random() * 40 - 20),
        heightM: 4,
        rangeKm: 18,
        ammoCount: 300,
        status: "active",
        aimYaw: 270,
        aimPitch: 15,
        isMobile: true,
        patrolActive: true,
        patrolRadius: 16,
        patrolAngle: 90,
        speedKmH: 60,
        headingDeg: 270,
      };
    }

    setUnits((prev) => [...prev, newUnit]);
    setSelectedUnitId(newUnit.id);
    setShowAddModal(false);
    tacticalAudio.playRadarPing();
    setSimAuditLogs((prev) => [
      `➕ تم نشر وحدة دفاعية جديدة: [${newUnit.name}] في الإحداثيات (X: ${newUnit.x}, Y: ${newUnit.y}).`,
      ...prev.slice(0, 8),
    ]);
  };

  // Delete unit
  const handleDeleteUnit = (id: number) => {
    if (units.length <= 1) return;
    const target = units.find((u) => u.id === id);
    setUnits((prev) => prev.filter((u) => u.id !== id));
    if (selectedUnitId === id) {
      setSelectedUnitId(units.find((u) => u.id !== id)?.id || 1);
    }
    setSimAuditLogs((prev) => [
      `🗑️ تم سحب الوحدة الدفاعية: [${target?.name}].`,
      ...prev.slice(0, 8),
    ]);
  };

  // Switch to a tactical formation preset while allowing 100% free drag & customization afterwards
  const handleSelectFormation = (formationId: string) => {
    const preset = tacticalFormationPresets.find((f) => f.id === formationId);
    if (!preset) return;
    setActiveFormation(formationId);
    setUnits(preset.units.map((u) => ({ ...u })));
    setSelectedUnitId(preset.units[0].id);
    tacticalAudio.playRadarPing();
    setSimAuditLogs((prev) => [
      `🛡️ تم تفعيل الخطة الدفاعية: [${preset.name}] بنسبة تغطية ${preset.coverageRating}%. كافة العناصر والدوريات قابلة للتحريك الحر والتخصيص.`,
      ...prev.slice(0, 8),
    ]);
  };

  // Reset to default deployment layout for the active formation
  const handleResetLayout = () => {
    const currentPreset = tacticalFormationPresets.find((f) => f.id === activeFormation) || tacticalFormationPresets[0];
    setUnits(currentPreset.units.map((u) => ({ ...u })));
    setSelectedUnitId(currentPreset.units[0].id);
    tacticalAudio.playRadarPing();
    setSimAuditLogs((prev) => [
      `🔄 تمت إعادة ضبط التوزيع إلى وضعية الأساس لـ [${currentPreset.name}].`,
      ...prev.slice(0, 8),
    ]);
  };

  // Launch Realistic 3D Threat Simulation
  const handleStartSimulation = () => {
    setIsSimulating(true);
    tacticalAudio.playAlertSiren();

    let newThreats: Threat3D[] = [];

    if (simScenario === "cruise_missile") {
      newThreats = [
        {
          id: "threat-cm-1",
          name: "صاروخ كروز مجنح (Quds-3)",
          type: "cruise_missile",
          x: -85,
          y: -10,
          z: 14,
          vx: 0.9,
          vy: 0.15,
          vz: -0.01,
          speedMach: 0.85,
          rcsSqm: 0.1,
          status: "approaching",
          trail: [],
        },
      ];
      setSimAuditLogs((prev) => [
        "⚠️ إنذار أحمر: كشف اقتراب صاروخ كروز مجنح (Quds-3) بارتفاع 14 متراً وسرعة 0.85 ماخ.",
        ...prev.slice(0, 8),
      ]);
    } else if (simScenario === "drone_swarm") {
      newThreats = [
        {
          id: "threat-drone-1",
          name: "مسيرة انتحارية 1 (Shahed-136)",
          type: "drone_swarm",
          x: -80,
          y: -40,
          z: 35,
          vx: 0.55,
          vy: 0.35,
          vz: -0.05,
          speedMach: 0.22,
          rcsSqm: 0.05,
          status: "approaching",
          trail: [],
        },
        {
          id: "threat-drone-2",
          name: "مسيرة انتحارية 2 (Shahed-136)",
          type: "drone_swarm",
          x: -82,
          y: 20,
          z: 42,
          vx: 0.6,
          vy: -0.15,
          vz: -0.04,
          speedMach: 0.22,
          rcsSqm: 0.05,
          status: "approaching",
          trail: [],
        },
        {
          id: "threat-drone-3",
          name: "مسيرة انتحارية 3 (Shahed-136)",
          type: "drone_swarm",
          x: 65,
          y: -65,
          z: 48,
          vx: -0.45,
          vy: 0.45,
          vz: -0.06,
          speedMach: 0.22,
          rcsSqm: 0.05,
          status: "approaching",
          trail: [],
        },
      ];
      setSimAuditLogs((prev) => [
        "⚠️ إنذار تشبع: رصد هجوم سرب مسيرات انتحارية متعدد الاتجاهات.",
        ...prev.slice(0, 8),
      ]);
    } else if (simScenario === "ballistic_dive") {
      newThreats = [
        {
          id: "threat-ballistic-1",
          name: "مقذوف باليستي تكتيكي (Fateh-110)",
          type: "ballistic_dive",
          x: 60,
          y: -75,
          z: 85,
          vx: -0.85,
          vy: 0.95,
          vz: -1.2,
          speedMach: 3.5,
          rcsSqm: 0.35,
          status: "approaching",
          trail: [],
        },
      ];
      setSimAuditLogs((prev) => [
        "🚀 إنذار باليستي: كشف مقذوف باليستي تكتيكي في مرحلة الانقضاض النهائي بسرعة 3.5 ماخ.",
        ...prev.slice(0, 8),
      ]);
    } else {
      newThreats = [
        {
          id: "threat-seaskim-1",
          name: "صاروخ كاشط للأمواج (C-802)",
          type: "sea_skimmer",
          x: -85,
          y: 5,
          z: 6,
          vx: 0.95,
          vy: -0.05,
          vz: 0.0,
          speedMach: 0.92,
          rcsSqm: 0.15,
          status: "approaching",
          trail: [],
        },
      ];
      setSimAuditLogs((prev) => [
        "🌊 إنذار بحري: كشف صاروخ كاشط للأمواج بارتفاع 6 أمتار فوق سطح البحر.",
        ...prev.slice(0, 8),
      ]);
    }

    setThreats(newThreats);
  };

  const handleStopSimulation = () => {
    setIsSimulating(false);
    setThreats([]);
    setUnits((prev) => prev.map((u) => ({ ...u, status: "active" })));
  };

  // Reinforce Unit Positions, Seal Vulnerability Gaps & Retest
  const handleReinforcePositionsAndRetest = () => {
    tacticalAudio.playRadarPing();

    // 1. Calculate optimized positions based on active facility and threat axes
    let optimizedUnits: DefenseUnit3D[] = [];

    if (selectedFacility.id === "seaport") {
      // Jazan Port - Interlocking coastal perimeter & mountain ridge coverage
      optimizedUnits = units.map((u) => {
        if (u.role === "radar" || u.role === "mobile_radar") {
          return { ...u, x: -20, y: -45, aimYaw: 285, status: "active" };
        } else if (u.role === "ciws") {
          return { ...u, x: -60, y: 5, aimYaw: 275, status: "active" };
        } else if (u.role === "laser") {
          return { ...u, x: -35, y: 35, aimYaw: 310, status: "active" };
        } else if (u.role === "vls_missile") {
          return { ...u, x: 20, y: -20, aimYaw: 45, status: "active" };
        } else if (u.role === "patriot_sam" || u.role === "thaad_battery") {
          return { ...u, x: 15, y: 25, aimYaw: 300, status: "active" };
        } else if (u.role === "mobile_pantsir" || u.role === "mobile_crotale") {
          return { ...u, x: -10, y: -15, patrolActive: true, patrolRadius: 22, aimYaw: 270, status: "active" };
        }
        return { ...u, status: "active" };
      });
    } else if (selectedFacility.id === "military_base") {
      // Southern Base - High-altitude ridgelines & valley funnel interception
      optimizedUnits = units.map((u) => {
        if (u.role === "radar" || u.role === "mobile_radar") {
          return { ...u, x: -10, y: -50, aimYaw: 180, status: "active" };
        } else if (u.role === "ciws") {
          return { ...u, x: -25, y: -15, aimYaw: 195, status: "active" };
        } else if (u.role === "laser") {
          return { ...u, x: 30, y: -30, aimYaw: 165, status: "active" };
        } else if (u.role === "vls_missile") {
          return { ...u, x: -40, y: 25, aimYaw: 225, status: "active" };
        } else if (u.role === "patriot_sam" || u.role === "thaad_battery") {
          return { ...u, x: 10, y: 35, aimYaw: 150, status: "active" };
        } else {
          return { ...u, x: 5, y: -10, patrolActive: true, patrolRadius: 20, aimYaw: 180, status: "active" };
        }
      });
    } else if (selectedFacility.id === "airfield") {
      // Airfield Runway & Fuel Depot Defense
      optimizedUnits = units.map((u) => {
        if (u.role === "radar" || u.role === "mobile_radar") {
          return { ...u, x: -45, y: -20, aimYaw: 310, status: "active" };
        } else if (u.role === "ciws") {
          return { ...u, x: -55, y: 20, aimYaw: 315, status: "active" };
        } else if (u.role === "laser") {
          return { ...u, x: -15, y: -35, aimYaw: 290, status: "active" };
        } else if (u.role === "vls_missile") {
          return { ...u, x: 30, y: 15, aimYaw: 130, status: "active" };
        } else if (u.role === "patriot_sam" || u.role === "thaad_battery") {
          return { ...u, x: 25, y: -15, aimYaw: 310, status: "active" };
        } else {
          return { ...u, x: 0, y: 35, patrolActive: true, patrolRadius: 18, aimYaw: 310, status: "active" };
        }
      });
    } else {
      // Refinery & Petrochemical Complex
      optimizedUnits = units.map((u) => {
        if (u.role === "radar" || u.role === "mobile_radar") {
          return { ...u, x: -30, y: -35, aimYaw: 285, status: "active" };
        } else if (u.role === "ciws") {
          return { ...u, x: -50, y: 10, aimYaw: 280, status: "active" };
        } else if (u.role === "laser") {
          return { ...u, x: -20, y: 40, aimYaw: 300, status: "active" };
        } else if (u.role === "vls_missile") {
          return { ...u, x: 25, y: -25, aimYaw: 25, status: "active" };
        } else if (u.role === "patriot_sam" || u.role === "thaad_battery") {
          return { ...u, x: 20, y: 20, aimYaw: 280, status: "active" };
        } else {
          return { ...u, x: 35, y: 10, patrolActive: true, patrolRadius: 18, aimYaw: 280, status: "active" };
        }
      });
    }

    setUnits(optimizedUnits);

    setSimAuditLogs((prev) => [
      `🛡️ تم تعزيز مواقع المنظومات وإقفال ثغرات الحجب التضاريسي 100% لموقع [${selectedFacility.name}]!`,
      `🎯 تم إطلاق اختبار اشتباك باليستي جديد للتأكد من المظلة الدفاعية المحصنة.`,
      ...prev.slice(0, 8),
    ]);

    // 2. Launch fresh simulation
    setIsSimulating(true);

    let newThreats: Threat3D[] = [];
    if (simScenario === "cruise_missile") {
      newThreats = [
        {
          id: `threat-cm-${Date.now()}`,
          name: "صاروخ كروز مجنح (Quds-3)",
          type: "cruise_missile",
          x: -85,
          y: -10,
          z: 14,
          vx: 0.9,
          vy: 0.15,
          vz: -0.01,
          speedMach: 0.85,
          rcsSqm: 0.1,
          status: "approaching",
          trail: [],
        },
      ];
    } else if (simScenario === "drone_swarm") {
      newThreats = [
        {
          id: `threat-drone-1-${Date.now()}`,
          name: "مسيرة انتحارية 1 (Shahed-136)",
          type: "drone_swarm",
          x: -80,
          y: -40,
          z: 35,
          vx: 0.55,
          vy: 0.35,
          vz: -0.05,
          speedMach: 0.22,
          rcsSqm: 0.05,
          status: "approaching",
          trail: [],
        },
        {
          id: `threat-drone-2-${Date.now()}`,
          name: "مسيرة انتحارية 2 (Shahed-136)",
          type: "drone_swarm",
          x: -82,
          y: 20,
          z: 42,
          vx: 0.6,
          vy: -0.15,
          vz: -0.04,
          speedMach: 0.22,
          rcsSqm: 0.05,
          status: "approaching",
          trail: [],
        },
        {
          id: `threat-drone-3-${Date.now()}`,
          name: "مسيرة انتحارية 3 (Shahed-136)",
          type: "drone_swarm",
          x: 65,
          y: -65,
          z: 48,
          vx: -0.45,
          vy: 0.45,
          vz: -0.06,
          speedMach: 0.22,
          rcsSqm: 0.05,
          status: "approaching",
          trail: [],
        },
      ];
    } else if (simScenario === "ballistic_dive") {
      newThreats = [
        {
          id: `threat-ballistic-${Date.now()}`,
          name: "مقذوف باليستي تكتيكي (Fateh-110)",
          type: "ballistic_dive",
          x: 60,
          y: -75,
          z: 85,
          vx: -0.85,
          vy: 0.95,
          vz: -1.2,
          speedMach: 3.5,
          rcsSqm: 0.35,
          status: "approaching",
          trail: [],
        },
      ];
    } else {
      newThreats = [
        {
          id: `threat-seaskim-${Date.now()}`,
          name: "صاروخ كاشط للأمواج (C-802)",
          type: "sea_skimmer",
          x: -85,
          y: 5,
          z: 6,
          vx: 0.95,
          vy: -0.05,
          vz: 0.0,
          speedMach: 0.92,
          rcsSqm: 0.15,
          status: "approaching",
          trail: [],
        },
      ];
    }

    setThreats(newThreats);
  };

  // Main 3D Physics & Engagement Tick Loop
  useEffect(() => {
    if (!isSimulating || threats.length === 0) return;

    const interval = setInterval(() => {
      setThreats((prevThreats: Threat3D[]): Threat3D[] => {
        let allTerminated = true;

        const updated: Threat3D[] = prevThreats.map((threat: Threat3D): Threat3D => {
          if (threat.status === "intercepted" || threat.status === "breached") {
            return threat;
          }
          allTerminated = false;

          const nextX = threat.x + threat.vx * simSpeed * 0.7;
          const nextY = threat.y + threat.vy * simSpeed * 0.7;
          const nextZ = Math.max(3, threat.z + threat.vz * simSpeed * 0.7);

          const newTrail = [...threat.trail, { x: threat.x, y: threat.y, z: threat.z }].slice(-24);

          // Check Line of Sight (LOS) & Terrain Masking with any radar unit
          const radars = units.filter((u) => u.role === "radar" || u.role === "mobile_radar" || u.role === "patriot_sam");
          let isMasked = true;
          for (const r of radars) {
            const rElev = getTerrainElevation(r.x, r.y, selectedFacility.id) + r.heightM * 0.3;
            const los = checkTerrainMasking(r.x, r.y, rElev, nextX, nextY, nextZ, selectedFacility.id);
            if (!los.isMasked) {
              isMasked = false;
              break;
            }
          }

          let newStatus: Threat3D["status"] = threat.status;
          if (isMasked && newStatus !== "engaged") {
            newStatus = "masked_by_terrain";
          } else {
            newStatus = "radar_locked";
          }

          // Check Weapons Engagement Envelope
          const weaponUnits = units.filter((u) => u.role !== "radar" && u.role !== "mobile_radar" && u.ammoCount > 0);
          let intercepted = false;
          let firingUnit: DefenseUnit3D | null = null;

          for (const u of weaponUnits) {
            const groundZ = getTerrainElevation(u.x, u.y, selectedFacility.id);
            const dist3D = Math.sqrt(
              Math.pow(u.x - nextX, 2) +
              Math.pow(u.y - nextY, 2) +
              Math.pow((groundZ + u.heightM * 0.3) - nextZ, 2)
            );

            const rangeUnits =
              u.role === "patriot_sam" ? 48 :
              u.role === "thaad_battery" ? 65 :
              u.role === "ciws" || u.role === "mobile_pantsir" ? 28 : 34;

            if (dist3D <= rangeUnits && !isMasked) {
              firingUnit = u;
              newStatus = "engaged";

              const dy = nextY - u.y;
              const dx = nextX - u.x;
              const aimYaw = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
              const dz = nextZ - (groundZ + u.heightM * 0.3);
              const aimPitch = Math.atan2(dz, Math.sqrt(dx * dx + dy * dy)) * (180 / Math.PI);

              u.aimYaw = Math.round(aimYaw);
              u.aimPitch = Math.round(aimPitch);
              u.status = "firing";

              if (dist3D <= rangeUnits * 0.75) {
                intercepted = true;
                break;
              }
            }
          }

          if (intercepted && firingUnit) {
            if (firingUnit.role === "ciws" || firingUnit.role === "mobile_pantsir") {
              tacticalAudio.playGunBurst();
            } else if (firingUnit.role === "laser") {
              tacticalAudio.playLaserHum();
            } else {
              tacticalAudio.playMissileLaunch();
            }

            setTimeout(() => {
              tacticalAudio.playExplosion();
            }, 180);

            setSimAuditLogs((prev) => [
              `🎯 تم تدمير الهدف [${threat.name}] بنجاح بواسطة [${firingUnit?.name}] على مسافة ${(
                Math.sqrt(Math.pow(nextX, 2) + Math.pow(nextY, 2)) * 0.6
              ).toFixed(1)} كم بارتفاع ${Math.round(nextZ)}م!`,
              ...prev.slice(0, 8),
            ]);

            return {
              ...threat,
              x: nextX,
              y: nextY,
              z: nextZ,
              status: "intercepted",
              interceptedBy: firingUnit.name,
              killX: nextX,
              killY: nextY,
              killZ: nextZ,
              trail: newTrail,
            };
          }

          // Check facility breach
          const distToCenter = Math.sqrt(Math.pow(nextX, 2) + Math.pow(nextY, 2));
          if (distToCenter <= 8) {
            tacticalAudio.playExplosion();
            setSimAuditLogs((prev) => [
              `💥 اختراق للهدف [${threat.name}] وصل إلى نقطة الارتكاز الحيوية!`,
              ...prev.slice(0, 8),
            ]);
            return {
              ...threat,
              x: nextX,
              y: nextY,
              z: nextZ,
              status: "breached",
              trail: newTrail,
            };
          }

          return {
            ...threat,
            x: nextX,
            y: nextY,
            z: nextZ,
            status: newStatus,
            trail: newTrail,
          };
        });

        if (allTerminated) {
          setIsSimulating(false);
        }

        return updated;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isSimulating, threats, units, simSpeed, selectedFacility]);

  // ==========================================
  // 3D RENDERING CANVAS ENGINE
  // ==========================================
  const render3DScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background shader
    if (mapMode === "satellite_3d") {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#08131d");
      bgGrad.addColorStop(0.5, "#0d1b2a");
      bgGrad.addColorStop(1, "#162536");
      ctx.fillStyle = bgGrad;
    } else if (mapMode === "thermal_flir_3d") {
      ctx.fillStyle = "#03120b";
    } else {
      ctx.fillStyle = "#05131d";
    }
    ctx.fillRect(0, 0, width, height);

    // 1. Render Sea Plane if Seaport
    const gridSize = 120;
    const step = 12;

    if (selectedFacility.id === "seaport") {
      ctx.save();
      const p1 = project3D(-gridSize, -gridSize, 0, camera, width, height);
      const p2 = project3D(-20, -gridSize, 0, camera, width, height);
      const p3 = project3D(-20, gridSize, 0, camera, width, height);
      const p4 = project3D(-gridSize, gridSize, 0, camera, width, height);

      ctx.beginPath();
      ctx.moveTo(p1.sx, p1.sy);
      ctx.lineTo(p2.sx, p2.sy);
      ctx.lineTo(p3.sx, p3.sy);
      ctx.lineTo(p4.sx, p4.sy);
      ctx.closePath();

      if (mapMode === "thermal_flir_3d") {
        ctx.fillStyle = "rgba(4, 30, 20, 0.9)";
      } else {
        const seaGrad = ctx.createLinearGradient(p1.sx, p1.sy, p3.sx, p3.sy);
        seaGrad.addColorStop(0, "#032840");
        seaGrad.addColorStop(1, "#0a4b73");
        ctx.fillStyle = seaGrad;
      }
      ctx.fill();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // 2. Render 3D Ground Surface Mesh
    if (showGrid3D) {
      ctx.save();
      ctx.lineWidth = 1;

      for (let x = -gridSize; x <= gridSize; x += step) {
        ctx.beginPath();
        let started = false;
        for (let y = -gridSize; y <= gridSize; y += step) {
          const z = getTerrainElevation(x, y, selectedFacility.id);
          const p = project3D(x, y, z, camera, width, height);
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }
        ctx.strokeStyle =
          mapMode === "thermal_flir_3d" ? "rgba(34, 197, 94, 0.18)" :
          mapMode === "contour_tactical" ? "rgba(56, 189, 248, 0.25)" : "rgba(148, 163, 184, 0.14)";
        ctx.stroke();
      }

      for (let y = -gridSize; y <= gridSize; y += step) {
        ctx.beginPath();
        let started = false;
        for (let x = -gridSize; x <= gridSize; x += step) {
          const z = getTerrainElevation(x, y, selectedFacility.id);
          const p = project3D(x, y, z, camera, width, height);
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }
        ctx.strokeStyle =
          mapMode === "thermal_flir_3d" ? "rgba(34, 197, 94, 0.18)" :
          mapMode === "contour_tactical" ? "rgba(56, 189, 248, 0.25)" : "rgba(148, 163, 184, 0.14)";
        ctx.stroke();
      }
      ctx.restore();
    }

    // 3. Render Central Facility 3D Core Marker
    const centerElev = getTerrainElevation(0, 0, selectedFacility.id);
    const cp = project3D(0, 0, centerElev, camera, width, height);
    const cpTop = project3D(0, 0, centerElev + 18, camera, width, height);

    ctx.save();
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cp.sx, cp.sy, Math.max(12, 18 * cp.scale), 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "rgba(16, 185, 129, 0.18)";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cp.sx, cp.sy);
    ctx.lineTo(cpTop.sx, cpTop.sy);
    ctx.strokeStyle = "#34d399";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(cpTop.sx, cpTop.sy, 6 * cp.scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("المنشأة الحيوية المحمية (مركز الارتكاز)", cp.sx, cp.sy + 26);
    ctx.restore();

    // 4. Render 3D High-Voltage Catenary Conductors & Inter-Tower Laser Mesh
    const currentUnitsList = unitsRef.current;
    const pylonUnits = currentUnitsList.filter((u) => u.category === "pylon_cluster");
    if (showPylonCables && pylonUnits.length > 1) {
      ctx.save();
      ctx.strokeStyle = "rgba(245, 158, 11, 0.85)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);

      for (let i = 0; i < pylonUnits.length - 1; i++) {
        const u1 = pylonUnits[i];
        const u2 = pylonUnits[i + 1];
        const z1 = getTerrainElevation(u1.x, u1.y, selectedFacility.id) + u1.heightM * 0.3;
        const z2 = getTerrainElevation(u2.x, u2.y, selectedFacility.id) + u2.heightM * 0.3;

        const p1 = project3D(u1.x, u1.y, z1, camera, width, height);
        const p2 = project3D(u2.x, u2.y, z2, camera, width, height);

        const midX = (u1.x + u2.x) / 2;
        const midY = (u1.y + u2.y) / 2;
        const midZ = (z1 + z2) / 2 - 4.5;
        const pMid = project3D(midX, midY, midZ, camera, width, height);

        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.quadraticCurveTo(pMid.sx, pMid.sy, p2.sx, p2.sy);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Inter-Unit Real-Time Dynamic Laser Mesh (Visualizing Interlocking Coverage)
    if (currentUnitsList.length > 1) {
      ctx.save();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      for (let i = 0; i < currentUnitsList.length; i++) {
        for (let j = i + 1; j < currentUnitsList.length; j++) {
          const u1 = currentUnitsList[i];
          const u2 = currentUnitsList[j];
          const dist3D = Math.sqrt(Math.pow(u1.x - u2.x, 2) + Math.pow(u1.y - u2.y, 2));
          if (dist3D < 55) {
            const z1 = getTerrainElevation(u1.x, u1.y, selectedFacility.id) + u1.heightM * 0.2;
            const z2 = getTerrainElevation(u2.x, u2.y, selectedFacility.id) + u2.heightM * 0.2;
            const p1 = project3D(u1.x, u1.y, z1, camera, width, height);
            const p2 = project3D(u2.x, u2.y, z2, camera, width, height);
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    }

    // 5. Render 3D Range Domes & Coverage Envelopes
    if (showDomes3D) {
      ctx.save();
      currentUnitsList.forEach((u) => {
        if (coverageFilter === "weapons" && (u.role === "radar" || u.role === "mobile_radar")) return;
        if (coverageFilter === "radar" && u.role !== "radar" && u.role !== "mobile_radar") return;

        const groundZ = getTerrainElevation(u.x, u.y, selectedFacility.id);
        const radius3D =
          u.role === "patriot_sam" ? 48 :
          u.role === "thaad_battery" ? 65 :
          u.role === "radar" || u.role === "mobile_radar" ? 40 :
          u.role === "ciws" || u.role === "mobile_pantsir" ? 22 : 30;

        const domeColor =
          u.role === "radar" || u.role === "mobile_radar" ? "rgba(16, 185, 129, 0.08)" :
          u.category === "mobile_battery" ? "rgba(244, 63, 94, 0.08)" :
          u.category === "stationary_battery" ? "rgba(168, 85, 247, 0.08)" : "rgba(245, 158, 11, 0.1)";

        const strokeColor =
          u.role === "radar" || u.role === "mobile_radar" ? "rgba(16, 185, 129, 0.45)" :
          u.category === "mobile_battery" ? "rgba(244, 63, 94, 0.55)" :
          u.category === "stationary_battery" ? "rgba(168, 85, 247, 0.55)" : "rgba(245, 158, 11, 0.55)";

        ctx.beginPath();
        for (let a = 0; a <= 360; a += 15) {
          const rad = (a * Math.PI) / 180;
          const cx = u.x + Math.cos(rad) * radius3D;
          const cy = u.y + Math.sin(rad) * radius3D;
          const cz = getTerrainElevation(cx, cy, selectedFacility.id);
          const cp = project3D(cx, cy, cz, camera, width, height);
          if (a === 0) ctx.moveTo(cp.sx, cp.sy);
          else ctx.lineTo(cp.sx, cp.sy);
        }
        ctx.closePath();
        ctx.fillStyle = domeColor;
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });
      ctx.restore();
    }

    // 6. Render Defense Units with Multi-Body Spring Physics & Velocity Vectors
    currentUnitsList.forEach((u) => {
      const isBeingDragged = dragPhysicsRef.current.isDragging && dragPhysicsRef.current.unitId === u.id;
      const bOffset = isBeingDragged ? 4 : dragPhysicsRef.current.zOffset;
      const groundZ = getTerrainElevation(u.x, u.y, selectedFacility.id) + bOffset;
      const isSelected = selectedUnitId === u.id;

      ctx.save();

      // Ground Target Disc & Coordinates Marker
      const baseCenter = project3D(u.x, u.y, groundZ, camera, width, height);

      // Hydraulic Alignment Ring beneath unit
      ctx.beginPath();
      ctx.arc(baseCenter.sx, baseCenter.sy, Math.max(12, 18 * baseCenter.scale), 0, Math.PI * 2);
      ctx.strokeStyle = isBeingDragged ? "#10b981" : isSelected ? "#38bdf8" : "rgba(148, 163, 184, 0.4)";
      ctx.lineWidth = isBeingDragged ? 3 : isSelected ? 2 : 1;
      if (isBeingDragged) {
        ctx.setLineDash([4, 2]);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Multi-Body Physics Vector Arrow during Drag
      if (isBeingDragged) {
        const speed = Math.sqrt(
          Math.pow(dragPhysicsRef.current.vx, 2) + Math.pow(dragPhysicsRef.current.vy, 2)
        );
        if (speed > 0.05) {
          const vecEndX = u.x + dragPhysicsRef.current.vx * 12;
          const vecEndY = u.y + dragPhysicsRef.current.vy * 12;
          const pVecEnd = project3D(vecEndX, vecEndY, groundZ, camera, width, height);

          ctx.strokeStyle = "#34d399";
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(baseCenter.sx, baseCenter.sy);
          ctx.lineTo(pVecEnd.sx, pVecEnd.sy);
          ctx.stroke();

          // Speed HUD label
          ctx.fillStyle = "#34d399";
          ctx.font = "bold 10px monospace";
          ctx.textAlign = "center";
          ctx.fillText(`متجه السرعة: ${(speed * 18).toFixed(1)} m/s`, pVecEnd.sx, pVecEnd.sy - 8);
        }

        // Coordinate crosshair badge
        ctx.fillStyle = "rgba(6, 78, 59, 0.95)";
        ctx.strokeStyle = "#34d399";
        ctx.lineWidth = 1;
        ctx.fillRect(baseCenter.sx - 65, baseCenter.sy + 18, 130, 20);
        ctx.strokeRect(baseCenter.sx - 65, baseCenter.sy + 18, 130, 20);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`[X: ${u.x.toFixed(1)}, Y: ${u.y.toFixed(1)}, Z: ${Math.round(groundZ)}م]`, baseCenter.sx, baseCenter.sy + 31);
      }

      if (u.category === "pylon_cluster") {
        // High-Voltage 4-legged steel lattice pylon
        const topZ = groundZ + u.heightM * 0.32;
        const topCenter = project3D(u.x, u.y, topZ, camera, width, height);

        const legOffset = 4.5;
        const leg1 = project3D(u.x - legOffset, u.y - legOffset, groundZ, camera, width, height);
        const leg2 = project3D(u.x + legOffset, u.y - legOffset, groundZ, camera, width, height);
        const leg3 = project3D(u.x + legOffset, u.y + legOffset, groundZ, camera, width, height);
        const leg4 = project3D(u.x - legOffset, u.y + legOffset, groundZ, camera, width, height);

        ctx.strokeStyle = isSelected ? "#38bdf8" : "#94a3b8";
        ctx.lineWidth = isSelected ? 2.5 : 1.5;

        ctx.beginPath();
        ctx.moveTo(leg1.sx, leg1.sy);
        ctx.lineTo(topCenter.sx, topCenter.sy);
        ctx.moveTo(leg2.sx, leg2.sy);
        ctx.lineTo(topCenter.sx, topCenter.sy);
        ctx.moveTo(leg3.sx, leg3.sy);
        ctx.lineTo(topCenter.sx, topCenter.sy);
        ctx.moveTo(leg4.sx, leg4.sy);
        ctx.lineTo(topCenter.sx, topCenter.sy);
        ctx.stroke();

        // Horizontal Cross-arm
        const armSpan = 8;
        const armLeft = project3D(u.x - armSpan, u.y, topZ - 2, camera, width, height);
        const armRight = project3D(u.x + armSpan, u.y, topZ - 2, camera, width, height);
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(armLeft.sx, armLeft.sy);
        ctx.lineTo(armRight.sx, armRight.sy);
        ctx.stroke();

        // Payload top
        const roleColor =
          u.role === "radar" ? "#10b981" : u.role === "ciws" ? "#f59e0b" : "#38bdf8";

        ctx.fillStyle = roleColor;
        ctx.beginPath();
        ctx.arc(topCenter.sx, topCenter.sy, 7 * topCenter.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Badge
        drawUnitBadge(ctx, topCenter.sx, topCenter.sy - 15, u, roleColor);
      } else if (u.category === "stationary_battery") {
        // Stationary Concrete Revetment & Missile Canisters
        const padZ = groundZ + 4;
        const padCenter = project3D(u.x, u.y, padZ, camera, width, height);

        // Concrete Sand Berm Revetment (Hexagon)
        ctx.fillStyle = "#334155";
        ctx.strokeStyle = "#a855f7";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let a = 0; a < 6; a++) {
          const rad = (a * 60 * Math.PI) / 180;
          const hp = project3D(u.x + Math.cos(rad) * 6, u.y + Math.sin(rad) * 6, groundZ, camera, width, height);
          if (a === 0) ctx.moveTo(hp.sx, hp.sy);
          else ctx.lineTo(hp.sx, hp.sy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Missile Launcher Canister inclined 45°
        const aimRad = (u.aimYaw * Math.PI) / 180;
        const launcherTip = project3D(
          u.x + Math.cos(aimRad) * 5,
          u.y + Math.sin(aimRad) * 5,
          padZ + 6,
          camera,
          width,
          height
        );
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(padCenter.sx, padCenter.sy);
        ctx.lineTo(launcherTip.sx, launcherTip.sy);
        ctx.stroke();

        drawUnitBadge(ctx, padCenter.sx, padCenter.sy - 22, u, "#a855f7");
      } else {
        // Dynamic 3D Patrol Route & Orbit Contour on Terrain (when mobile & patrol active)
        if (u.isMobile && u.patrolActive) {
          const centerX = u.patrolCenterX !== undefined ? u.patrolCenterX : u.x;
          const centerY = u.patrolCenterY !== undefined ? u.patrolCenterY : u.y;
          const centerZ = getTerrainElevation(centerX, centerY, selectedFacility.id);
          const pCenter = project3D(centerX, centerY, centerZ, camera, width, height);

          ctx.save();
          // Center Anchor Pin & Disc
          ctx.strokeStyle = isSelected ? "rgba(56, 189, 248, 0.85)" : "rgba(244, 63, 94, 0.65)";
          ctx.lineWidth = isSelected ? 2 : 1.2;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(pCenter.sx, pCenter.sy, Math.max(8, 12 * pCenter.scale), 0, Math.PI * 2);
          ctx.stroke();

          // Dotted Tether Line from Center Anchor to Moving Vehicle
          ctx.beginPath();
          ctx.moveTo(pCenter.sx, pCenter.sy);
          ctx.lineTo(baseCenter.sx, baseCenter.sy);
          ctx.stroke();
          ctx.setLineDash([]);

          // Terrain-Mapped Patrol Route Closed Loop / Corridor
          ctx.beginPath();
          const steps = 36;
          for (let s = 0; s <= steps; s++) {
            const a = (s / steps) * 360;
            const rad = (a * Math.PI) / 180;
            let px = centerX;
            let py = centerY;

            if (u.patrolPattern === "linear") {
              const yawRad = (u.aimYaw * Math.PI) / 180;
              const offset = Math.sin(rad) * u.patrolRadius;
              px = centerX + Math.cos(yawRad) * offset;
              py = centerY + Math.sin(yawRad) * offset;
            } else if (u.patrolPattern === "figure_eight") {
              const scale = u.patrolRadius;
              px = centerX + scale * Math.sin(rad);
              py = centerY + scale * Math.sin(rad) * Math.cos(rad);
            } else {
              // Smooth circular orbit
              px = centerX + Math.cos(rad) * u.patrolRadius;
              py = centerY + Math.sin(rad) * u.patrolRadius;
            }

            const pz = getTerrainElevation(px, py, selectedFacility.id);
            const pt = project3D(px, py, pz, camera, width, height);
            if (s === 0) ctx.moveTo(pt.sx, pt.sy);
            else ctx.lineTo(pt.sx, pt.sy);
          }
          ctx.strokeStyle = isSelected ? "rgba(56, 189, 248, 0.75)" : "rgba(244, 63, 94, 0.45)";
          ctx.lineWidth = isSelected ? 2.2 : 1.4;
          ctx.setLineDash([5, 3]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Anchor Badge Text
          if (isSelected) {
            ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 1;
            ctx.fillRect(pCenter.sx - 48, pCenter.sy + 10, 96, 15);
            ctx.strokeRect(pCenter.sx - 48, pCenter.sy + 10, 96, 15);
            ctx.fillStyle = "#38bdf8";
            ctx.font = "bold 8px monospace";
            ctx.textAlign = "center";
            ctx.fillText(`مركز مسار الدورية [R:${u.patrolRadius}k]`, pCenter.sx, pCenter.sy + 21);
          }
          ctx.restore();
        }

        // Mobile Tactical Armored Vehicle (8x8 or 6x6)
        const vehZ = groundZ + 3.5;
        const vehCenter = project3D(u.x, u.y, vehZ, camera, width, height);

        // Armored Vehicle Hull facing headingDeg
        const headRad = (u.headingDeg * Math.PI) / 180;
        const frontX = u.x + Math.cos(headRad) * 5;
        const frontY = u.y + Math.sin(headRad) * 5;
        const rearX = u.x - Math.cos(headRad) * 5;
        const rearY = u.y - Math.sin(headRad) * 5;

        const pFront = project3D(frontX, frontY, groundZ + 1.5, camera, width, height);
        const pRear = project3D(rearX, rearY, groundZ + 1.5, camera, width, height);

        // Vehicle Chassis
        ctx.strokeStyle = "#1e293b";
        ctx.lineWidth = 8 * vehCenter.scale;
        ctx.beginPath();
        ctx.moveTo(pRear.sx, pRear.sy);
        ctx.lineTo(pFront.sx, pFront.sy);
        ctx.stroke();

        // Camo Armor Plate
        ctx.strokeStyle = isSelected ? "#38bdf8" : "#f43f5e";
        ctx.lineWidth = 5 * vehCenter.scale;
        ctx.beginPath();
        ctx.moveTo(pRear.sx, pRear.sy);
        ctx.lineTo(pFront.sx, pFront.sy);
        ctx.stroke();

        // Rotating Turret / Radar Dish
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(vehCenter.sx, vehCenter.sy, 5 * vehCenter.scale, 0, Math.PI * 2);
        ctx.fill();

        // Wheels
        ctx.fillStyle = "#0f172a";
        [pRear, pFront].forEach((wp) => {
          ctx.beginPath();
          ctx.arc(wp.sx, wp.sy + 4, 3 * vehCenter.scale, 0, Math.PI * 2);
          ctx.fill();
        });

        drawUnitBadge(ctx, vehCenter.sx, vehCenter.sy - 22, u, "#f43f5e");
      }

      ctx.restore();
    });

    // 7. Render 3D Threats, Automatic Radar Tracking Beams & Predictive Trajectories
    threats.forEach((threat) => {
      const tp = project3D(threat.x, threat.y, threat.z, camera, width, height);
      const isLocked = threat.status === "radar_locked" || threat.status === "engaged";

      ctx.save();

      // A. Automatic Radar Tracking Rays (Connecting active Radars directly to tracked Target)
      if (isLocked && threat.status !== "intercepted" && threat.status !== "breached") {
        const detectingRadars = currentUnitsList.filter(
          (u) =>
            (u.role === "radar" || u.role === "mobile_radar" || u.role === "patriot_sam") &&
            !checkTerrainMasking(
              u.x,
              u.y,
              getTerrainElevation(u.x, u.y, selectedFacility.id) + u.heightM * 0.32,
              threat.x,
              threat.y,
              threat.z,
              selectedFacility.id
            ).isMasked
        );

        detectingRadars.forEach((radarUnit) => {
          const rz = getTerrainElevation(radarUnit.x, radarUnit.y, selectedFacility.id) + radarUnit.heightM * 0.32;
          const rp = project3D(radarUnit.x, radarUnit.y, rz, camera, width, height);

          // Animated Pulsing Tracking Beam
          ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
          ctx.lineWidth = 1.8;
          ctx.setLineDash([8, 4]);
          ctx.beginPath();
          ctx.moveTo(rp.sx, rp.sy);
          ctx.lineTo(tp.sx, tp.sy);
          ctx.stroke();
          ctx.setLineDash([]);

          // Tracking Lock Energy Indicator
          const midX = (rp.sx + tp.sx) / 2;
          const midY = (rp.sy + tp.sy) / 2;
          ctx.fillStyle = "rgba(14, 165, 233, 0.9)";
          ctx.font = "bold 8.5px monospace";
          ctx.textAlign = "center";
          ctx.fillText(`تتبع راداري نشط 4D AESA [S/X-Band]`, midX, midY - 6);
        });
      }

      // B. Historical Flight Trail
      if (threat.trail.length > 1) {
        ctx.beginPath();
        threat.trail.forEach((pt, idx) => {
          const trailP = project3D(pt.x, pt.y, pt.z, camera, width, height);
          if (idx === 0) ctx.moveTo(trailP.sx, trailP.sy);
          else ctx.lineTo(trailP.sx, trailP.sy);
        });
        ctx.strokeStyle = threat.status === "masked_by_terrain" ? "#eab308" : "#ef4444";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 2]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // C. Predictive Trajectory Corridor & Ground Track Projection
      if (
        showPredictiveTrajectories &&
        threat.status !== "intercepted" &&
        threat.status !== "breached" &&
        (Math.abs(threat.vx) > 0.01 || Math.abs(threat.vy) > 0.01)
      ) {
        const speed2D = Math.sqrt(threat.vx * threat.vx + threat.vy * threat.vy);
        const distToCenter = Math.sqrt(threat.x * threat.x + threat.y * threat.y);
        const timeToImpactSec = speed2D > 0.01 ? (distToCenter / (speed2D * 12)).toFixed(1) : "0.0";

        // Draw Predicted Future Waypoints (t + 1s, t + 2s, t + 3s, t + 4s)
        const predPoints: { sx: number; sy: number; time: string; x: number; y: number; z: number }[] = [];
        const numSteps = 5;
        for (let i = 1; i <= numSteps; i++) {
          const stepMultiplier = i * 14;
          const px = threat.x + threat.vx * stepMultiplier;
          const py = threat.y + threat.vy * stepMultiplier;
          const pz = Math.max(3, threat.z + threat.vz * stepMultiplier);
          const pProjected = project3D(px, py, pz, camera, width, height);
          predPoints.push({
            sx: pProjected.sx,
            sy: pProjected.sy,
            time: `+${(i * 1.5).toFixed(1)}s`,
            x: px,
            y: py,
            z: pz,
          });
        }

        // 1. Predictive Future Path Glowing Vector Line
        ctx.strokeStyle = "rgba(244, 63, 94, 0.85)";
        ctx.lineWidth = 2.2;
        ctx.setLineDash([6, 3]);
        ctx.beginPath();
        ctx.moveTo(tp.sx, tp.sy);
        predPoints.forEach((pt) => {
          ctx.lineTo(pt.sx, pt.sy);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        // 2. Predictive Waypoint Nodes & Time Stamps
        predPoints.forEach((pt, idx) => {
          ctx.fillStyle = idx === predPoints.length - 1 ? "#ef4444" : "#fbbf24";
          ctx.beginPath();
          ctx.arc(pt.sx, pt.sy, 3.5 * tp.scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#fef08a";
          ctx.font = "bold 8px monospace";
          ctx.textAlign = "center";
          ctx.fillText(pt.time, pt.sx, pt.sy - 6);
        });

        // 3. Ground Elevation Shadow Line
        const threatGroundZ = getTerrainElevation(threat.x, threat.y, selectedFacility.id);
        const threatGroundP = project3D(threat.x, threat.y, threatGroundZ, camera, width, height);

        ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(tp.sx, tp.sy);
        ctx.lineTo(threatGroundP.sx, threatGroundP.sy);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "rgba(239, 68, 68, 0.35)";
        ctx.beginPath();
        ctx.ellipse(threatGroundP.sx, threatGroundP.sy, 10 * threatGroundP.scale, 4 * threatGroundP.scale, 0, 0, Math.PI * 2);
        ctx.fill();

        // 4. Predicted Interception Point (Calculated Kill Zone)
        if (predPoints.length >= 2) {
          const interceptPt = predPoints[Math.min(2, predPoints.length - 1)];
          ctx.strokeStyle = "#10b981";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(interceptPt.sx, interceptPt.sy, 14 * tp.scale, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = "rgba(6, 78, 59, 0.9)";
          ctx.fillRect(interceptPt.sx - 75, interceptPt.sy + 12, 150, 18);
          ctx.strokeStyle = "#34d399";
          ctx.strokeRect(interceptPt.sx - 75, interceptPt.sy + 12, 150, 18);

          ctx.fillStyle = "#a7f3d0";
          ctx.font = "bold 8.5px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(`نقطة الاعتراض المحسوبة [T-${timeToImpactSec}s]`, interceptPt.sx, interceptPt.sy + 24);
        }
      }

      // D. Threat Markers & Explosions
      if (threat.status === "intercepted") {
        ctx.fillStyle = "rgba(251, 191, 36, 0.9)";
        ctx.beginPath();
        ctx.arc(tp.sx, tp.sy, 24 * tp.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(tp.sx, tp.sy, 12 * tp.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("تم الاعتراض والتدمير بنجاح!", tp.sx, tp.sy - 28);
      } else if (threat.status === "breached") {
        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.arc(tp.sx, tp.sy, 32 * tp.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("اختراق للهدف!", tp.sx, tp.sy - 35);
      } else {
        // Target HUD Lock-on Bracket Reticle
        const retSize = 12 * tp.scale;
        ctx.strokeStyle = isLocked ? "#ef4444" : "#f59e0b";
        ctx.lineWidth = 1.8;

        // 4-corner targeting brackets
        ctx.beginPath();
        // Top-left
        ctx.moveTo(tp.sx - retSize, tp.sy - retSize + 5);
        ctx.lineTo(tp.sx - retSize, tp.sy - retSize);
        ctx.lineTo(tp.sx - retSize + 5, tp.sy - retSize);
        // Top-right
        ctx.moveTo(tp.sx + retSize - 5, tp.sy - retSize);
        ctx.lineTo(tp.sx + retSize, tp.sy - retSize);
        ctx.lineTo(tp.sx + retSize, tp.sy - retSize + 5);
        // Bottom-left
        ctx.moveTo(tp.sx - retSize, tp.sy + retSize - 5);
        ctx.lineTo(tp.sx - retSize, tp.sy + retSize);
        ctx.lineTo(tp.sx - retSize + 5, tp.sy + retSize);
        // Bottom-right
        ctx.moveTo(tp.sx + retSize - 5, tp.sy + retSize);
        ctx.lineTo(tp.sx + retSize, tp.sy + retSize);
        ctx.lineTo(tp.sx + retSize, tp.sy + retSize - 5);
        ctx.stroke();

        ctx.fillStyle = threat.status === "masked_by_terrain" ? "#f59e0b" : "#ef4444";
        ctx.beginPath();
        ctx.arc(tp.sx, tp.sy, 6 * tp.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Telemetry Badge
        ctx.fillStyle = threat.status === "masked_by_terrain" ? "#fef08a" : "#fca5a5";
        ctx.font = "bold 9.5px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${threat.name} [Z:${Math.round(threat.z)}م | M:${threat.speedMach}]`, tp.sx, tp.sy - 18);

        if (isLocked) {
          ctx.fillStyle = "#38bdf8";
          ctx.font = "bold 8.5px monospace";
          ctx.fillText("🔒 رصد وتتبع راداري مؤكد", tp.sx, tp.sy - 30);
        }
      }
      ctx.restore();
    });

    // 8. Tactical Telemetry HUD (Top Right)
    ctx.save();
    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1;
    ctx.fillRect(width - 160, 15, 145, 95);
    ctx.strokeRect(width - 160, 15, 145, 95);

    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "left";
    ctx.fillText(`CAM YAW:   ${Math.round(camera.yaw)}°`, width - 150, 32);
    ctx.fillText(`CAM PITCH: ${Math.round(camera.pitch)}°`, width - 150, 48);
    ctx.fillText(`ZOOM:      ${camera.zoom.toFixed(2)}x`, width - 150, 64);
    ctx.fillText(`MODE:      ${interactionMode === "move_unit" ? "تحريك حر 3D" : "تدوير الكاميرا"}`, width - 150, 80);
    ctx.fillText(`UNITS:     ${units.length} منظومة`, width - 150, 96);
    ctx.restore();
  }, [
    camera,
    selectedFacility,
    mapMode,
    units,
    threats,
    selectedUnitId,
    coverageFilter,
    showGrid3D,
    showPylonCables,
    showDomes3D,
    showPredictiveTrajectories,
    interactionMode,
  ]);

  // Animation frame loop with real-time smooth 60fps rendering
  useEffect(() => {
    let animId: number;
    const loop = () => {
      // 1. Process altitude landing shock bounce
      if (Math.abs(dragPhysicsRef.current.zVelocity) > 0.01 || Math.abs(dragPhysicsRef.current.zOffset) > 0.01) {
        dragPhysicsRef.current.zOffset += dragPhysicsRef.current.zVelocity;
        dragPhysicsRef.current.zVelocity = (dragPhysicsRef.current.zVelocity - dragPhysicsRef.current.zOffset * 0.4) * 0.72;
        if (Math.abs(dragPhysicsRef.current.zOffset) < 0.02 && Math.abs(dragPhysicsRef.current.zVelocity) < 0.02) {
          dragPhysicsRef.current.zOffset = 0;
          dragPhysicsRef.current.zVelocity = 0;
        }
      }

      // 2. Render 3D Canvas
      render3DScene();
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [render3DScene]);

  // Pointer Handlers with direct 1:1 ground unprojection for zero-lag, stable smooth dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const sx = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const sy = ((e.clientY - rect.top) / rect.height) * canvas.height;

    // Pointer capture for robust drag tracking outside canvas bounds
    e.currentTarget.setPointerCapture(e.pointerId);

    // Generous hit-testing checking both unit's ground base AND its top payload/mast
    const currentUnitsList = unitsRef.current;
    const clickedUnit = currentUnitsList.find((u) => {
      const gz = getTerrainElevation(u.x, u.y, selectedFacility.id);
      const baseP = project3D(u.x, u.y, gz, camera, canvas.width, canvas.height);
      const topP = project3D(u.x, u.y, gz + (u.heightM || 10) * 0.32, camera, canvas.width, canvas.height);
      const distBase = Math.sqrt(Math.pow(baseP.sx - sx, 2) + Math.pow(baseP.sy - sy, 2));
      const distTop = Math.sqrt(Math.pow(topP.sx - sx, 2) + Math.pow(topP.sy - sy, 2));
      return distBase <= 38 || distTop <= 36;
    });

    if (clickedUnit) {
      setSelectedUnitId(clickedUnit.id);
      setDraggedUnitId(clickedUnit.id);

      dragPhysicsRef.current = {
        isDragging: true,
        unitId: clickedUnit.id,
        targetX: clickedUnit.x,
        targetY: clickedUnit.y,
        vx: 0,
        vy: 0,
        zOffset: 0,
        zVelocity: 0,
      };

      tacticalAudio.playRadarPing();
    } else if (interactionMode === "move_unit" && selectedUnitId !== null) {
      // In move_unit mode, clicking empty space glides the selected unit directly to target
      const groundPos = unprojectScreenToGround(sx, sy, camera, canvas.width, canvas.height, selectedFacility.id);
      if (groundPos) {
        const unit = unitsRef.current.find((u) => u.id === selectedUnitId);
        if (unit) {
          unit.x = groundPos.x;
          unit.y = groundPos.y;
          if (unit.isMobile) {
            unit.patrolCenterX = groundPos.x;
            unit.patrolCenterY = groundPos.y;
          }
          setUnits(unitsRef.current.map((u) => ({ ...u })));
        }
        tacticalAudio.playRadarPing();
      }
    }

    setIsPointerDown(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDown) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (dragPhysicsRef.current.isDragging && dragPhysicsRef.current.unitId !== null) {
      // Direct, instantaneous 3D ground tracking without spring oscillation or stutter
      const rect = canvas.getBoundingClientRect();
      const sx = ((e.clientX - rect.left) / rect.width) * canvas.width;
      const sy = ((e.clientY - rect.top) / rect.height) * canvas.height;

      const groundPos = unprojectScreenToGround(sx, sy, camera, canvas.width, canvas.height, selectedFacility.id);
      if (groundPos) {
        const unit = unitsRef.current.find((u) => u.id === dragPhysicsRef.current.unitId);
        if (unit) {
          const dx = groundPos.x - unit.x;
          const dy = groundPos.y - unit.y;

          unit.x = groundPos.x;
          unit.y = groundPos.y;
          if (unit.isMobile) {
            unit.patrolCenterX = groundPos.x;
            unit.patrolCenterY = groundPos.y;
          }

          dragPhysicsRef.current.vx = dx;
          dragPhysicsRef.current.vy = dy;
          dragPhysicsRef.current.targetX = groundPos.x;
          dragPhysicsRef.current.targetY = groundPos.y;

          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0.4) {
            const moveAngle = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
            unit.headingDeg = Math.round(moveAngle);
          }
        }
      }
    } else {
      // Rotating 3D camera
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      setCamera((prev) => ({
        ...prev,
        yaw: (prev.yaw + dx * 0.45 + 360) % 360,
        pitch: Math.max(12, Math.min(84, prev.pitch - dy * 0.35)),
      }));

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }

    if (dragPhysicsRef.current.isDragging) {
      const draggedId = dragPhysicsRef.current.unitId;
      // Trigger subtle tactile landing bounce & finalize positions in React state
      dragPhysicsRef.current.isDragging = false;
      dragPhysicsRef.current.zVelocity = 1.8;
      dragPhysicsRef.current.zOffset = 1.2;

      const updatedUnits = unitsRef.current.map((u) => {
        if (u.id === draggedId && u.isMobile) {
          return {
            ...u,
            patrolCenterX: u.x,
            patrolCenterY: u.y,
          };
        }
        return { ...u };
      });
      setUnits(updatedUnits);
      tacticalAudio.playRadarPing();
    }

    setIsPointerDown(false);
    setDraggedUnitId(null);
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    setCamera((prev) => ({
      ...prev,
      zoom: Math.max(0.65, Math.min(2.5, prev.zoom + zoomDelta)),
    }));
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Facility Quick Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Globe className="w-4 h-4 animate-spin [animation-duration:18s]" />
            <span>نظام التحريك التفاعلي الديناميكي والفيزيائي (Interactive 3D Deployment & Relocation Engine)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            الخريطة الافتراضية: نشر الأبراج والبطاريات الثابتة والمتحركة
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            حرية كاملة في إضافة ونقل رادارات وأبراج المنظومة المبتكرة، وبطاريات الباتريوت والثاد، والدوريات الميدانية المتحركة (بانتسير وكروتال) في أي مكان على الخريطة مع استمرار مسارها الحركي النشط.
          </p>
        </div>

        {/* Facility Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {facilityPresets.map((fac) => (
            <button
              key={fac.id}
              onClick={() => {
                setSelectedFacility(fac);
                setThreats([]);
                setIsSimulating(false);
              }}
              className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all whitespace-nowrap ${
                selectedFacility.id === fac.id
                  ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-md font-bold"
                  : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
              }`}
            >
              {fac.id === "seaport" && "الميناء اللوجستي الصناعي"}
              {fac.id === "military_base" && "القاعدة العسكرية الاستراتيجية"}
              {fac.id === "airfield" && "مطار وقاعدة جوية"}
              {fac.id === "oil_refinery" && "مصفاة نفط ومجمع الطاقة الوطنية"}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Tactical Defensive Formations & Deployment Plans Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold font-display text-white">
                خطط وتشكيلات النشر الدفاعي التكتيكي (Tactical Defense Formations)
              </h3>
              <p className="text-[11px] text-slate-400">
                اختر تشكيلاً استراتيجياً لتوزيع المنظومة، واحتفظ بحرية كاملة في سحب وتحريك وتعديل مواقع أي عنصر أو دورية بعدها:
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>قابلة للتعديل والتحريك الحر 100%</span>
          </div>
        </div>

        {/* Formations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {tacticalFormationPresets.map((preset) => {
            const isActive = activeFormation === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => handleSelectFormation(preset.id)}
                className={`p-3 rounded-xl border text-right cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? "bg-slate-950 border-emerald-400 ring-1 ring-emerald-400/40 shadow-lg shadow-emerald-950/40"
                    : "bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950"
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500" />
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                      تغطية {preset.coverageRating}%
                    </span>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                      {isActive && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{preset.name.split("(")[0]}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-amber-300/90 font-medium">
                    {preset.subtitle}
                  </p>
                  <p className="text-[10.5px] text-slate-400 line-clamp-2 leading-relaxed">
                    {preset.description}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-emerald-400/90 font-mono">{preset.units.length} منظومة قتالية</span>
                  <span className="text-slate-500 truncate max-w-[150px]">{preset.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Main 3D Viewport & Tactical Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive 3D Canvas Viewport (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          {/* Top Info Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 mb-3 text-xs gap-2">
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-xs sm:text-sm">{selectedFacility.name}</span>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {selectedFacility.region} (ارتفاع القاعدة: {selectedFacility.baseAltitudeM}م)
              </span>
            </div>

            {/* Quick Action Tools Bar */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded flex items-center gap-1 shadow-sm text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة منظومة</span>
              </button>
              <button
                onClick={handleResetLayout}
                className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 flex items-center gap-1 text-[11px]"
                title="إعادة توزيع المنظومة للمخطط الاستراتيجي المثالي"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة الضبط</span>
              </button>
            </div>
          </div>

          {/* Layers Toggle Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 text-[11px] text-slate-400 border-b border-slate-900">
            <span className="text-[10px] font-mono text-slate-500">طبقات الرؤية التكتيكية:</span>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGrid3D}
                  onChange={(e) => setShowGrid3D(e.target.checked)}
                  className="rounded accent-emerald-500"
                />
                <span>شبكة التضاريس</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPylonCables}
                  onChange={(e) => setShowPylonCables(e.target.checked)}
                  className="rounded accent-amber-500"
                />
                <span>كابلات الأبراج</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDomes3D}
                  onChange={(e) => setShowDomes3D(e.target.checked)}
                  className="rounded accent-sky-500"
                />
                <span>مظلات الرصد 3D</span>
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPredictiveTrajectories}
                  onChange={(e) => setShowPredictiveTrajectories(e.target.checked)}
                  className="rounded accent-rose-500"
                />
                <span className="text-rose-400 font-bold">تتبع المسارات التنبؤية 3D</span>
              </label>
            </div>
          </div>

          {/* Interactive 3D Canvas Box with Floating Controls on Top-Left */}
          <div
            className={`relative w-full h-[520px] rounded-lg border border-slate-800 bg-slate-950 overflow-hidden select-none ${
              interactionMode === "move_unit" ? "cursor-move" : "cursor-grab active:cursor-grabbing"
            }`}
          >
            <canvas
              ref={canvasRef}
              width={900}
              height={560}
              className="w-full h-full block"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onWheel={handleWheel}
            />

            {/* FLOATING TOP-LEFT TOOLBAR: 3D Camera Rotation, Free Unit Dragging, Zoom In/Out, Reset & View Presets */}
            <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-950/90 backdrop-blur-md border border-slate-800/90 rounded-xl shadow-2xl max-w-[calc(100%-24px)]">
              {/* Button 1: 3D Camera Orbit */}
              <button
                onClick={() => setInteractionMode("orbit")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap ${
                  interactionMode === "orbit"
                    ? "bg-sky-600 border-sky-400 text-white shadow-md ring-1 ring-sky-400/50"
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="تدوير المنظور ثلاثي الأبعاد بالفأرة"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>تدوير الكاميرا 3D</span>
              </button>

              {/* Button 2: Free Movement of Units */}
              <button
                onClick={() => setInteractionMode("move_unit")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border whitespace-nowrap ${
                  interactionMode === "move_unit"
                    ? "bg-emerald-500 border-emerald-300 text-slate-950 font-bold shadow-md ring-1 ring-emerald-400/50"
                    : "bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
                title="سحب ونقل العناصر والأبراج والبطاريات بحرية دون لاق"
              >
                <Move className="w-3.5 h-3.5" />
                <span>التحريك الحر للعناصر</span>
              </button>

              <div className="w-px h-5 bg-slate-800 mx-0.5 hidden sm:block" />

              {/* Zoom & Reset Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCamera((prev) => ({ ...prev, zoom: Math.min(2.5, prev.zoom + 0.2) }))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-sm transition-colors"
                  title="تكبير (Zoom In)"
                >
                  +
                </button>
                <button
                  onClick={() => setCamera((prev) => ({ ...prev, zoom: Math.max(0.65, prev.zoom - 0.2) }))}
                  className="w-7 h-7 flex items-center justify-center font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-sm transition-colors"
                  title="تصغير (Zoom Out)"
                >
                  -
                </button>
                <button
                  onClick={() => setCamera({ yaw: 220, pitch: 42, zoom: 1.15, panX: 0, panY: 15 })}
                  className="w-7 h-7 flex items-center justify-center text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs transition-colors"
                  title="إعادة ضبط الزاوية"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick View Angle Presets */}
              <div className="hidden md:flex items-center gap-1 border-r border-slate-800 pr-1.5 mr-0.5 text-[10px] font-mono">
                <button
                  onClick={() => setCamera((prev) => ({ ...prev, pitch: 84, yaw: 0 }))}
                  className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-400 hover:text-white"
                  title="مسقط رأسي 2D علوي"
                >
                  علوي 2D
                </button>
                <button
                  onClick={() => setCamera((prev) => ({ ...prev, pitch: 42, yaw: 220 }))}
                  className="px-2 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-400 hover:text-white"
                  title="منظور أيزومتري 3D"
                >
                  مائل 3D
                </button>
              </div>
            </div>

            {/* Interaction State Hint Floating Badge (Bottom-Left) */}
            <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-lg text-[10px] text-slate-300 font-mono flex items-center gap-2 pointer-events-none z-10">
              {interactionMode === "move_unit" ? (
                <>
                  <Move className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>انقر على أي منظومة واسحبها بحرية في الفضاء 3D دون أي تشوه أو لاق</span>
                </>
              ) : (
                <>
                  <Navigation className="w-3.5 h-3.5 text-sky-400 animate-spin [animation-duration:8s]" />
                  <span>انقر واسحب لتدوير الكاميرا 3D · عجلة الفأرة للتكبير والتصغير</span>
                </>
              )}
            </div>
          </div>

          {/* Bottom Simulation & Combat Test Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">نوع السيناريو الهجومي:</span>
              <select
                value={simScenario}
                onChange={(e) => setSimScenario(e.target.value as any)}
                disabled={isSimulating}
                className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-white text-xs"
              >
                <option value="cruise_missile">صاروخ كروز منخفض يستغل الأودية (Terrain Masking)</option>
                <option value="drone_swarm">سرب مسيرات انتحارية متعدد الاتجاهات (Swarm Saturation)</option>
                <option value="ballistic_dive">مقذوف باليستي تكتيكي انقضاضي بزاوية 65°</option>
                <option value="sea_skimmer">صاروخ بحري كاشط للأمواج على ارتفاع 6م</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Reinforce & Retest Button */}
              <button
                onClick={handleReinforcePositionsAndRetest}
                className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/50 border border-emerald-400/40 active:scale-95"
                title="إعادة توزيع القطع الدفاعية لسد ثغرات الحجب التضاريسي وإطلاق اختبار جديد"
              >
                <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse" />
                <span>إعادة الاختبار وتحصين المواقع (إقفال الثغرات)</span>
              </button>

              {isSimulating ? (
                <button
                  onClick={handleStopSimulation}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 border border-slate-700"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>إيقاف الاختبار</span>
                </button>
              ) : (
                <button
                  onClick={handleStartSimulation}
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-red-950/50 active:scale-95"
                >
                  <Crosshair className="w-4 h-4 animate-spin" />
                  <span>بدء اختبار جديد</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Tower Positioning & Vulnerability Analysis Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Active Unit 3D Coordinates & Manual Adjustment */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold font-display text-white text-sm flex items-center gap-1.5">
                <Move className="w-4 h-4 text-emerald-400" />
                <span>التحكم الموضعي الفيزيائي بالوحدة</span>
              </h3>
              <div className="flex items-center gap-1">
                {activeUnit && (
                  <button
                    onClick={() => handleDeleteUnit(activeUnit.id)}
                    className="p-1 hover:bg-red-950/80 text-red-400 hover:text-red-300 rounded border border-transparent hover:border-red-800 text-xs"
                    title="حذف هذه المنظومة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Unit Selection Pills */}
            <div className="grid grid-cols-3 gap-1 text-[10.5px] max-h-[110px] overflow-y-auto pr-0.5">
              {units.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setSelectedUnitId(u.id)}
                  className={`py-1 px-1 rounded border text-center truncate transition-all ${
                    selectedUnitId === u.id
                      ? "bg-emerald-500 text-slate-950 font-bold border-emerald-400 shadow-sm"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {u.name.split("-")[0]}
                </button>
              ))}
            </div>

            {activeUnit && (
              <div className="space-y-3 pt-1 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span>الوحدة المحددة:</span>
                    <strong className="text-white font-sans truncate max-w-[180px]">{activeUnit.name}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>التصنيف التكتيكي:</span>
                    <span className="text-amber-400">
                      {activeUnit.category === "pylon_cluster" && "برج ضغط عالي (منظومة مبتكرة)"}
                      {activeUnit.category === "stationary_battery" && "بطارية أرضية ثابتة (اعتيادية)"}
                      {activeUnit.category === "mobile_battery" && "منظومة مدولبة متحركة (تكتيكية)"}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>الإحداثيات الحالية:</span>
                    <span className="text-emerald-400">X: {activeUnit.x} · Y: {activeUnit.y}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>ارتفاع التضاريس الحالية:</span>
                    <span className="text-amber-400">
                      {Math.round(getTerrainElevation(activeUnit.x, activeUnit.y, selectedFacility.id))} م فوق سطح البحر
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>نصف قطر الفتك الفعال:</span>
                    <span className="text-sky-400">{activeUnit.rangeKm} كم</span>
                  </div>
                </div>

                {/* Mobile Unit Controls (Patrol / Autonomous Relocation / Pattern Tuning) */}
                {activeUnit.isMobile && (
                  <div className="p-3 bg-rose-950/20 border border-rose-900/60 rounded-xl space-y-3 text-[11px]">
                    <div className="flex items-center justify-between border-b border-rose-900/40 pb-2">
                      <div className="flex items-center gap-1.5 text-rose-300 font-bold">
                        <Truck className="w-4 h-4 text-rose-400" />
                        <span>التحكم بمسار الدورية الميدانية:</span>
                      </div>
                      <button
                        onClick={() =>
                          setUnits((prev) =>
                            prev.map((u) => (u.id === activeUnit.id ? { ...u, patrolActive: !u.patrolActive } : u))
                          )
                        }
                        className={`px-2.5 py-1 rounded font-bold text-xs transition-all shadow-sm ${
                          activeUnit.patrolActive
                            ? "bg-rose-600 text-white shadow-rose-950/50"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {activeUnit.patrolActive ? "● دورية متحركة نشطة" : "○ تثبيت النقطة (ثابت)"}
                      </button>
                    </div>

                    {/* Patrol Movement Patterns */}
                    <div className="space-y-1.5">
                      <span className="text-slate-300 font-semibold block text-[10.5px]">نمط الحركة والمناورة:</span>
                      <div className="grid grid-cols-3 gap-1">
                        <button
                          onClick={() =>
                            setUnits((prev) =>
                              prev.map((u) => (u.id === activeUnit.id ? { ...u, patrolPattern: "circle" } : u))
                            )
                          }
                          className={`py-1 px-1 rounded text-center text-[10px] font-bold border transition-all ${
                            activeUnit.patrolPattern === "circle" || !activeUnit.patrolPattern
                              ? "bg-rose-600 text-white border-rose-400 shadow-sm"
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          طواف دائري 360°
                        </button>
                        <button
                          onClick={() =>
                            setUnits((prev) =>
                              prev.map((u) => (u.id === activeUnit.id ? { ...u, patrolPattern: "linear" } : u))
                            )
                          }
                          className={`py-1 px-1 rounded text-center text-[10px] font-bold border transition-all ${
                            activeUnit.patrolPattern === "linear"
                              ? "bg-rose-600 text-white border-rose-400 shadow-sm"
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          مسار خطي ترددي
                        </button>
                        <button
                          onClick={() =>
                            setUnits((prev) =>
                              prev.map((u) => (u.id === activeUnit.id ? { ...u, patrolPattern: "figure_eight" } : u))
                            )
                          }
                          className={`py-1 px-1 rounded text-center text-[10px] font-bold border transition-all ${
                            activeUnit.patrolPattern === "figure_eight"
                              ? "bg-rose-600 text-white border-rose-400 shadow-sm"
                              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          مسار شكل (8)
                        </button>
                      </div>
                    </div>

                    {/* Patrol Radius Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10.5px] text-slate-400">
                        <span>نصف قطر مسار الدورية:</span>
                        <span className="font-mono text-rose-300 font-bold">{activeUnit.patrolRadius} كم</span>
                      </div>
                      <input
                        type="range"
                        min="6"
                        max="35"
                        value={activeUnit.patrolRadius}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setUnits((prev) => prev.map((u) => (u.id === activeUnit.id ? { ...u, patrolRadius: val } : u)));
                        }}
                        className="w-full accent-rose-500 bg-slate-800 h-1.5 rounded cursor-pointer"
                      />
                    </div>

                    {/* Patrol Speed Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10.5px] text-slate-400">
                        <span>سرعة سير الدورية التكتيكية:</span>
                        <span className="font-mono text-amber-300 font-bold">{activeUnit.speedKmH} كم/ساعة</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        step="5"
                        value={activeUnit.speedKmH}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setUnits((prev) => prev.map((u) => (u.id === activeUnit.id ? { ...u, speedKmH: val } : u)));
                        }}
                        className="w-full accent-amber-500 bg-slate-800 h-1.5 rounded cursor-pointer"
                      />
                    </div>

                    {/* Quick Reposition Buttons */}
                    <div className="pt-2 border-t border-rose-900/40 space-y-1.5">
                      <span className="text-[10px] text-slate-400 block font-medium">نقل مركز مسار الدورية سريعاً إلى:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => {
                            setUnits((prev) =>
                              prev.map((u) =>
                                u.id === activeUnit.id
                                  ? { ...u, x: -35, y: -20, patrolCenterX: -35, patrolCenterY: -20 }
                                  : u
                              )
                            );
                            tacticalAudio.playRadarPing();
                          }}
                          className="py-1 px-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 hover:text-white"
                        >
                          الممر الغربي / الساحلي
                        </button>
                        <button
                          onClick={() => {
                            setUnits((prev) =>
                              prev.map((u) =>
                                u.id === activeUnit.id
                                  ? { ...u, x: 35, y: 30, patrolCenterX: 35, patrolCenterY: 30 }
                                  : u
                              )
                            );
                            tacticalAudio.playRadarPing();
                          }}
                          className="py-1 px-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 hover:text-white"
                        >
                          الممر الجبلي / الشرقي
                        </button>
                      </div>
                      <p className="text-[9.5px] text-emerald-400/90 font-mono text-center pt-0.5">
                        💡 يمكنك أيضاً سحب الدورية بالفأرة مباشرة إلى أي مكان تريده على الخريطة!
                      </p>
                    </div>
                  </div>
                )}

                {/* X Coordinate Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>الموقع الأفقي X (شرق - غرب):</span>
                    <span className="font-mono text-emerald-400">{activeUnit.x}</span>
                  </div>
                  <input
                    type="range"
                    min="-85"
                    max="85"
                    value={activeUnit.x}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setUnits((prev) =>
                        prev.map((u) =>
                          u.id === activeUnit.id
                            ? { ...u, x: val, patrolCenterX: u.isMobile ? val : u.patrolCenterX }
                            : u
                        )
                      );
                    }}
                    className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Y Coordinate Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>الموقع الرأسي Y (شمال - جنوب):</span>
                    <span className="font-mono text-emerald-400">{activeUnit.y}</span>
                  </div>
                  <input
                    type="range"
                    min="-85"
                    max="85"
                    value={activeUnit.y}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setUnits((prev) =>
                        prev.map((u) =>
                          u.id === activeUnit.id
                            ? { ...u, y: val, patrolCenterY: u.isMobile ? val : u.patrolCenterY }
                            : u
                        )
                      );
                    }}
                    className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Height Adjustment Slider (if Pylon) */}
                {activeUnit.category === "pylon_cluster" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>ارتفاع الصاري الهيكلي Z:</span>
                      <span className="font-mono text-sky-400">{activeUnit.heightM} متر</span>
                    </div>
                    <input
                      type="range"
                      min="35"
                      max="65"
                      value={activeUnit.heightM}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setUnits((prev) => prev.map((u) => (u.id === activeUnit.id ? { ...u, heightM: val } : u)));
                      }}
                      className="w-full accent-sky-500 bg-slate-800 h-1.5 rounded cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* High-Precision Vulnerability Audit Report */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold font-display text-white text-sm flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>تحليل واكتشاف الثغرات الأمنية الدقيقة</span>
              </h3>
              <span className="text-[10px] text-emerald-400 font-mono">تدقيق هندسي فوري</span>
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {vulnerabilities.map((v) => (
                <div
                  key={v.id}
                  className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                    v.severity === "critical"
                      ? "bg-red-950/50 border-red-800 text-red-200"
                      : v.severity === "warning"
                      ? "bg-amber-950/50 border-amber-800 text-amber-200"
                      : "bg-emerald-950/50 border-emerald-800 text-emerald-200"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      {v.severity === "critical" ? (
                        <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
                      ) : v.severity === "warning" ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <span>{v.title}</span>
                    </span>
                    {v.bearingDeg > 0 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900/80 border border-slate-700">
                        زاوية {v.bearingDeg}°
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-300">{v.description}</p>
                  <div className="pt-1 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-start gap-1">
                    <strong className="text-emerald-400 shrink-0">التوصية الهندسية:</strong>
                    <span>{v.remedyAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Combat Simulation Log */}
          {simAuditLogs.length > 0 && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1">
                <span>سجل أحداث النشر والاشتباك الميداني:</span>
                <span className="text-[10px] text-emerald-400 animate-pulse">● متصل مباشر</span>
              </div>
              <div className="space-y-1.5 max-h-[140px] overflow-y-auto text-[10.5px]">
                {simAuditLogs.map((log, index) => (
                  <div key={index} className="text-slate-300 leading-tight">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add Defense Unit Drawer */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-750 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                <span>إضافة منظومة دفاعية إلى الخريطة</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <span className="text-slate-300 font-semibold block">اختر نوع المنظومة الدفاعية المراد نشرها:</span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. Pylon Cluster Options */}
                <div
                  onClick={() => setNewUnitType("radar")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    newUnitType === "radar"
                      ? "bg-emerald-950/60 border-emerald-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 text-emerald-400 mb-1">
                    <Radar className="w-4 h-4" />
                    <span>برج رادار AESA معلق</span>
                  </div>
                  <p className="text-[11px] text-slate-300">برج ضغط عالي مزود برادار 4D AESA معلق بمدى 35 كم وكاميرات EO/IR.</p>
                </div>

                <div
                  onClick={() => setNewUnitType("ciws")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    newUnitType === "ciws"
                      ? "bg-emerald-950/60 border-emerald-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 text-amber-400 mb-1">
                    <Crosshair className="w-4 h-4" />
                    <span>برج مدفع رشاش ثنائي</span>
                  </div>
                  <p className="text-[11px] text-slate-300">برج ضغط عالي مسلح بمدفع رشاش ثنائي 35mm ليزري بذخائر AHEAD متشظية.</p>
                </div>

                <div
                  onClick={() => setNewUnitType("laser")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    newUnitType === "laser"
                      ? "bg-emerald-950/60 border-emerald-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 text-sky-400 mb-1">
                    <Zap className="w-4 h-4" />
                    <span>برج مدفع ليزر HEL</span>
                  </div>
                  <p className="text-[11px] text-slate-300">برج ضغط عالي مزود بسلاح طاقة موجهة ليزري فائق القدرة لحرق الدرونز والصواريخ.</p>
                </div>

                {/* 2. Stationary Standard Batteries */}
                <div
                  onClick={() => setNewUnitType("patriot_sam")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    newUnitType === "patriot_sam"
                      ? "bg-emerald-950/60 border-emerald-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 text-purple-400 mb-1">
                    <Shield className="w-4 h-4" />
                    <span>بطارية باتريوت MIM-104</span>
                  </div>
                  <p className="text-[11px] text-slate-300">بطارية أرضية ثابتة محصنة بدشم خرسانية لاعتراض الصواريخ الباليستية بمدى 45 كم.</p>
                </div>

                <div
                  onClick={() => setNewUnitType("thaad_battery")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    newUnitType === "thaad_battery"
                      ? "bg-emerald-950/60 border-emerald-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 text-indigo-400 mb-1">
                    <Target className="w-4 h-4" />
                    <span>منظومة ثاد THAAD</span>
                  </div>
                  <p className="text-[11px] text-slate-300">منظومة دفاع طبقي عالي لاعتراض الصواريخ خارج الغلاف الجوي بمدى 70 كم.</p>
                </div>

                {/* 3. Mobile Units */}
                <div
                  onClick={() => setNewUnitType("mobile_pantsir")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    newUnitType === "mobile_pantsir"
                      ? "bg-emerald-950/60 border-emerald-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 text-rose-400 mb-1">
                    <Truck className="w-4 h-4" />
                    <span>منظومة بانتسير متحركة (8x8)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">شاحنة مدولبة سريعة الحركة مزودة بمدافع وصواريخ ذاتية السير والدوريات.</p>
                </div>

                <div
                  onClick={() => setNewUnitType("mobile_crotale")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    newUnitType === "mobile_crotale"
                      ? "bg-emerald-950/60 border-emerald-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 text-orange-400 mb-1">
                    <Truck className="w-4 h-4" />
                    <span>بطارية كروتال مدولبة (6x6)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">عربة مصفحة خفيفة الحركة لتأمين المحاور التكتيكية المتحركة ضد الدرونز.</p>
                </div>

                <div
                  onClick={() => setNewUnitType("mobile_radar")}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    newUnitType === "mobile_radar"
                      ? "bg-emerald-950/60 border-emerald-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 text-teal-400 mb-1">
                    <Radio className="w-4 h-4" />
                    <span>عربة رادار استطلاع متحركة</span>
                  </div>
                  <p className="text-[11px] text-slate-300">رادار كشف وإنذار مبكر متحرك لتغطية الثغرات الطبوغرافية بالأودية الجبلية.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddUnit}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>تأكيد النشر على الخريطة</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
