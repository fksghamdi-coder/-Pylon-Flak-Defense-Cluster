"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Activity, ShieldCheck, Settings, Gauge, CheckCircle2, AlertOctagon, RotateCw } from "lucide-react";
import { tacticalAudio } from "@/lib/audio";

interface StructuralShockViewProps {
  soundEnabled: boolean;
}

export default function StructuralShockView({ soundEnabled }: StructuralShockViewProps) {
  const [isDampingActive, setIsDampingActive] = useState<boolean>(true);
  const [isSimulatingRecoil, setIsSimulatingRecoil] = useState<boolean>(false);
  const [pistonCompression, setPistonCompression] = useState<number>(0);
  const [swayDisplacement, setSwayDisplacement] = useState<number>(11); // mm

  const triggerRecoilTest = () => {
    setIsSimulatingRecoil(true);
    if (soundEnabled) {
      tacticalAudio.playGunBurst();
    }

    if (isDampingActive) {
      // Smooth damped shock absorption
      setPistonCompression(42);
      setSwayDisplacement(14);
      setTimeout(() => {
        setPistonCompression(18);
        setSwayDisplacement(12);
      }, 250);
      setTimeout(() => {
        setPistonCompression(0);
        setSwayDisplacement(11);
        setIsSimulatingRecoil(false);
      }, 500);
    } else {
      // Wild undamped shock
      setPistonCompression(95);
      setSwayDisplacement(138);
      setTimeout(() => {
        setPistonCompression(60);
        setSwayDisplacement(90);
      }, 300);
      setTimeout(() => {
        setPistonCompression(25);
        setSwayDisplacement(45);
      }, 700);
      setTimeout(() => {
        setPistonCompression(0);
        setSwayDisplacement(11);
        setIsSimulatingRecoil(false);
      }, 1200);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview & Engineering Philosophy Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-2 flex-1 w-full">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Activity className="w-4 h-4" />
              <span>هندسة الإنشاءات المتقدمة · عزل الاهتزازات وقوى الارتداد</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              القواعد الإنشائية المرنة وممتصات الصدمات والحركة الديناميكية
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              إن التحدي الهندسي الأكبر عند تثبيت مدافع رشاشة ثنائية عيار 35 ملم ورادارات حساسة على أبراج الضغط العالي
              هو أن هذه الأبراج صُممت لحمل كابلات الكهرباء وقوى الشد الساكنة فقط. تم ابتكار قواعد تثبيت هيدروليكية وإيلاستوميرية
              متطورة قابلة للتعديل ذات حركة ديناميكية تمتص <strong className="text-emerald-400">88% من قوى الارتداد الميكانيكي</strong> وتمنع
              وصول أي صدمات أو تشوهات للهيكل الفولاذي أو أسلاك الكهرباء.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsDampingActive(!isDampingActive)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                isDampingActive
                  ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                  : "bg-red-950/60 border-red-500/50 text-red-300"
              }`}
            >
              {isDampingActive ? "المخمدات الهيدروليكية: مفعّلة" : "المخمدات: معطلة (للمقارنة)"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Shock Test Visualizer & Engineering Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dynamic Recoil & Shock Absorption Simulator (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                محاكي اختبار ارتداد المدافع وقواعد الامتصاص الهيدروليكية
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {isDampingActive ? "وضع الأمان: تخميد كامل 88%" : "تحذير: إجهاد ميكانيكي حرج"}
            </span>
          </div>

          {/* SVG Animated Shock Absorption Mount Cross-Section */}
          <div className="flex-1 flex items-center justify-center relative min-h-[320px] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] rounded-lg border border-slate-900 overflow-hidden">
            <svg viewBox="0 0 500 320" className="w-full h-full max-h-[320px]">
              {/* Foundation Ground Bedrock */}
              <rect x="50" y="270" width="400" height="40" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              <text x="250" y="295" fill="#64748b" fontSize="10" textAnchor="middle">خرسانة مسلحة وأوتاد صخرية بعمق 18 متراً</text>

              {/* Adjustable Leveling Base Screws (قواعد تسوية مرنة وقابلة للتعديل) */}
              <rect x="80" y="250" width="30" height="20" fill="#334155" stroke="#475569" strokeWidth="1" />
              <line x1="95" y1="240" x2="95" y2="265" stroke="#94a3b8" strokeWidth="4" />
              <rect x="390" y="250" width="30" height="20" fill="#334155" stroke="#475569" strokeWidth="1" />
              <line x1="405" y1="240" x2="405" y2="265" stroke="#94a3b8" strokeWidth="4" />

              {/* Lower Foundation Plate */}
              <rect x="70" y="235" width="360" height="15" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />

              {/* Lead-Rubber Seismic / Elastomeric Bearings (يسار ويمين) */}
              <rect x="110" y="195" width="60" height="40" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
              <line x1="110" y1="208" x2="170" y2="208" stroke="#1e293b" strokeWidth="2" />
              <line x1="110" y1="222" x2="170" y2="222" stroke="#1e293b" strokeWidth="2" />
              <text x="140" y="218" fill="#94a3b8" fontSize="8" textAnchor="middle">إيلاستومير</text>

              <rect x="330" y="195" width="60" height="40" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
              <line x1="330" y1="208" x2="390" y2="208" stroke="#1e293b" strokeWidth="2" />
              <line x1="330" y1="222" x2="390" y2="222" stroke="#1e293b" strokeWidth="2" />
              <text x="360" y="218" fill="#94a3b8" fontSize="8" textAnchor="middle">إيلاستومير</text>

              {/* Central Dynamic Nitrogen-Hydraulic Shock Damper Piston */}
              <g transform={`translate(0, ${pistonCompression * 0.25})`}>
                {/* Cylinder Casing */}
                <rect x="225" y="175" width="50" height="60" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                {/* Internal Piston Rod */}
                <rect x="240" y="145" width="20" height="45" fill="#38bdf8" />
                {/* Nitrogen gas chamber glow */}
                <rect x="230" y="195" width="40" height="35" fill="#10b981" fillOpacity={isDampingActive ? 0.35 : 0.05} />
                <text x="250" y="215" fill="#a7f3d0" fontSize="8" fontWeight="bold" textAnchor="middle">نيتروجين</text>

                {/* Upper Floating Weapon / Lattice Platform */}
                <rect x="70" y="130" width="360" height="20" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="250" y="144" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  منصة السلاح المعزولة ديناميكياً (قاعدة كروية ثلاثية المحاور)
                </text>

                {/* Gun Turret Mounted On Platform with Recoil Vector */}
                <rect x="200" y="85" width="100" height="45" rx="6" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
                <line x1="270" y1="100" x2="360" y2="60" stroke="#f59e0b" strokeWidth="6" />
                <line x1="275" y1="110" x2="365" y2="70" stroke="#f59e0b" strokeWidth="6" />

                {/* Recoil Force Arrow pushing backwards */}
                {isSimulatingRecoil && (
                  <g>
                    <line x1="200" y1="105" x2="130" y2="135" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow)" />
                    <text x="140" y="120" fill="#ef4444" fontSize="11" fontWeight="bold">
                      قوة الارتداد {isDampingActive ? "38 kN" : "320 kN"}
                    </text>
                  </g>
                )}
              </g>

              {/* Dynamic Sway Meter Indicator */}
              <rect x="360" y="25" width="120" height="40" rx="4" fill="#020617" stroke="#334155" strokeWidth="1" />
              <text x="420" y="40" fill="#94a3b8" fontSize="9" textAnchor="middle">مستوى التأرجح الجانبي</text>
              <text x="420" y="58" fill={swayDisplacement > 50 ? "#ef4444" : "#10b981"} fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                {swayDisplacement} ملم
              </text>
            </svg>
          </div>

          {/* Test Controls & Quantitative Live Metrics */}
          <div className="mt-4 pt-3 border-t border-slate-800 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-xs block">قوة الارتداد القصوى:</span>
                <span className={`text-base font-bold font-mono ${isDampingActive ? "text-emerald-400" : "text-red-400"}`}>
                  {isDampingActive ? "38.4 kN" : "320.0 kN"}
                </span>
                <span className="text-[10px] text-slate-500 block">{isDampingActive ? "تخفيض 88%" : "خطر تشوه الفولاذ"}</span>
              </div>

              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-xs block">أقصى إزاحة للهيكل:</span>
                <span className={`text-base font-bold font-mono ${swayDisplacement > 50 ? "text-red-400" : "text-emerald-400"}`}>
                  {swayDisplacement} ملم
                </span>
                <span className="text-[10px] text-slate-500 block">{swayDisplacement <= 15 ? "ضمن الحدود الآمنة" : "تجاوز حد الخطر"}</span>
              </div>

              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 text-xs block">زمن تلاشي التذبذب:</span>
                <span className={`text-base font-bold font-mono ${isDampingActive ? "text-emerald-400" : "text-red-400"}`}>
                  {isDampingActive ? "0.35 ثانية" : "5.80 ثوانٍ"}
                </span>
                <span className="text-[10px] text-slate-500 block">ثبات الليزر والرادار</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span>قواعد موازنة جيروسكوبية مؤتمتة تقاوم رياح الصحراء حتى 180 كم/س</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={triggerRecoilTest}
                disabled={isSimulatingRecoil}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                {isSimulatingRecoil ? "جاري اختبار قوى الصدمة..." : "إجراء اختبار صدمة الارتداد"}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right: Structural Engineering Pillars & Foundations (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold font-display text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>الركائز الهندسية الأربع لتثبيت المنظومة على أبراج الطاقة</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              {/* Pillar 1 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center text-[10px] font-mono">1</span>
                  <span>القواعد المرنة وقابلة للتعديل ثلاثية المحاور (Tri-Axial Leveling Gimbal)</span>
                </div>
                <p className="text-slate-400 leading-relaxed pr-7">
                  تسمح بتركيب المنظومة بدقة أفقية تامة بغض النظر عن انحدار التضاريس الجبلية أو هبوط الرمال الصحراوية، مع إمكانية المعايرة الهيدروليكية الدقيقة بزوايا ±15 درجة.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center text-[10px] font-mono">2</span>
                  <span>أسطوانات التخميد النيتروجينية والإيلاستوميرية (Hydraulic-Elastomeric Dampers)</span>
                </div>
                <p className="text-slate-400 leading-relaxed pr-7">
                  تستقبل الدفع الارتدادي الفوري لطلقات 35 ملم وتحوله إلى طاقة حرارية مهدأة عبر صمامات خانقة وزيوت سيليكونية حرارية لا تتأثر بحرارة الصحراء حتى 60 درجة مئوية.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center text-[10px] font-mono">3</span>
                  <span>الأجزاء الديناميكية والحركة الموازنة للعزم (Counter-Torque Gyro Stabilizers)</span>
                </div>
                <p className="text-slate-400 leading-relaxed pr-7">
                  عجلات عزم دوران داخلية سريعة الدوران (Reaction Wheels) توازن رد الفعل الدوراني عند دوران البرج السريع بمعدل 95 درجة/ثانية لمنع التواء البرج الشبكي.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center text-[10px] font-mono">4</span>
                  <span>العزل الترددي الميكانيكي لحماية الليزر والرادار (Harmonic Decoupling)</span>
                </div>
                <p className="text-slate-400 leading-relaxed pr-7">
                  فصل الترددات الرنينية للمدافع (12-25 هرتز) عن قواعد أجهزة الرادار والكاميرات الحرارية لمنع تذبذب خط البصر (Line-of-Sight) والحفاظ على دقة توجيه الليزر في حدود 0.1 ملي راديان.
                </p>
              </div>
            </div>
          </div>

          {/* Geological & Soil Anchorage Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
            <span className="text-slate-300 font-semibold block">
              تثبيت الأساسات في التربة السعودية (Micro-Piling Foundation):
            </span>
            <p className="text-slate-400 leading-relaxed">
              يتم حقن أوتاد خرسانية مجهرية مسلحة بأنابيب فولاذية عالية القوة بعمق 18 متراً أسفل قوائم برج الضغط العالي
              لربطه مباشرة بطبقة الصخر السفلي في المناطق الجبلية أو استقرار الاحتكاك العميق في الكثبان الرملية للربع الخالي والدهناء.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
