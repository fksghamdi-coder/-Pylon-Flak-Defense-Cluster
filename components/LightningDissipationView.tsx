"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Zap, Shield, AlertTriangle, CheckCircle, Activity, Radio, Cpu, RefreshCw } from "lucide-react";
import { tacticalAudio } from "@/lib/audio";

interface LightningDissipationViewProps {
  soundEnabled: boolean;
}

export default function LightningDissipationView({ soundEnabled }: LightningDissipationViewProps) {
  const [isLightningActive, setIsLightningActive] = useState<boolean>(false);
  const [strikeCurrent, setStrikeCurrent] = useState<number>(185); // kA
  const [groundResistance, setGroundResistance] = useState<number>(0.68); // Ohms
  const [shieldingEfficiency, setShieldingEfficiency] = useState<number>(99.98); // %

  const triggerLightningStrike = () => {
    setIsLightningActive(true);
    if (soundEnabled) {
      tacticalAudio.playExplosion();
    }
    setTimeout(() => {
      setIsLightningActive(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-2 flex-1 w-full">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
              <Zap className="w-4 h-4" />
              <span>الحماية الكهرومغناطيسية والتأريض الفائق · معايير MIL-STD-188-125</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              منظومة مشتتات الصواعق والتفريغ الأيوني والعزل عن خطوط 380kV
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              تُعد أبراج الضغط العالي التي يصل ارتفاعها إلى 120 متراً في الصحراء والسهول مصيدة طبيعية لضربات الصواعق،
              كما أنها تحمل خطوطاً بجهد كهربائي يصل إلى <strong className="text-amber-400">380,000 و 500,000 فولت</strong> تولّد حقولاً كهرومغناطيسية
              عنيفة. تم تزويد المنظومة برؤوس تفريغ شحنات أيونية استباقية (CTS) وشبكة تأريض عميقة وعوازل فاراداي تحمي الحواسب النارية والرادارات من أي تعطل أو احتراق.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={triggerLightningStrike}
              disabled={isLightningActive}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>{isLightningActive ? "تفريغ تيار الصاعقة..." : "اختبار محاكاة صاعقة 200 kA"}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Lightning & Grounding Schematic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Dissipation Graphic (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-mono text-sky-400 font-bold uppercase">
                مخطط مسار تفريغ الصاعقة وحزام فاراداي الواقي
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              مقاومة التأريض: {groundResistance} أوم (الحد الأقصى المسموح: 1.0 أوم)
            </span>
          </div>

          {/* SVG Animated Lightning Protection System */}
          <div className="flex-1 flex items-center justify-center relative min-h-[340px] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] rounded-lg border border-slate-900 overflow-hidden">
            <svg viewBox="0 0 500 340" className="w-full h-full max-h-[340px]">
              {/* Sky Lightning Bolt when active */}
              {isLightningActive && (
                <g>
                  {/* Flashes */}
                  <rect width="500" height="340" fill="#38bdf8" fillOpacity="0.1" />
                  {/* Jagged Lightning path from sky to lightning rod */}
                  <polyline
                    points="200,0 230,40 210,70 250,110 235,130 250,150"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="4"
                  />
                  <polyline
                    points="200,0 230,40 210,70 250,110 235,130 250,150"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="8"
                    strokeOpacity="0.6"
                    className="animate-pulse"
                  />
                  <circle cx="250" cy="150" r="18" fill="#ffffff" fillOpacity="0.9" className="animate-ping" />
                </g>
              )}

              {/* Apex Ion Charge Dissipation Terminal (CTS / ESE) */}
              <circle cx="250" cy="150" r="8" fill="#38bdf8" />
              <line x1="250" y1="150" x2="250" y2="120" stroke="#38bdf8" strokeWidth="3" />
              {/* Ion bristles/spikes pointing up */}
              <line x1="250" y1="120" x2="235" y2="105" stroke="#38bdf8" strokeWidth="2" />
              <line x1="250" y1="120" x2="250" y2="100" stroke="#38bdf8" strokeWidth="2" />
              <line x1="250" y1="120" x2="265" y2="105" stroke="#38bdf8" strokeWidth="2" />
              <text x="250" y="90" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">
                مشتت شحنات أيوني ESE
              </text>

              {/* Weapon Enclosure Shielded by Double Faraday Cage */}
              <rect x="180" y="160" width="140" height="50" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
              {/* Faraday Mesh Wire Pattern */}
              <line x1="180" y1="175" x2="320" y2="175" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="180" y1="195" x2="320" y2="195" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />
              <text x="250" y="188" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
                قفص فاراداي مزدوج (MIL-STD)
              </text>
              <text x="250" y="202" fill="#6ee7b7" fontSize="8" textAnchor="middle">
                حماية الحواسب 99.98% من النبضات
              </text>

              {/* Steel Transmission Lattice Body */}
              <path d="M 210 210 L 170 300 L 330 300 L 290 210 Z" fill="none" stroke="#64748b" strokeWidth="2" />
              <line x1="190" y1="255" x2="310" y2="255" stroke="#475569" strokeWidth="1.5" />

              {/* Transmission Crossarm with High Voltage Cables */}
              <line x1="100" y1="240" x2="400" y2="240" stroke="#64748b" strokeWidth="3" />
              {/* Heavy Ceramic Insulator Strings */}
              <rect x="110" y="240" width="16" height="30" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
              <circle cx="118" cy="275" r="4" fill="#ef4444" />
              <text x="118" y="295" fill="#f59e0b" fontSize="8" textAnchor="middle">380kV</text>

              <rect x="374" y="240" width="16" height="30" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
              <circle cx="382" cy="275" r="4" fill="#ef4444" />
              <text x="382" y="295" fill="#f59e0b" fontSize="8" textAnchor="middle">380kV</text>

              {/* Dedicated Heavy Copper Lightning Down-Conductor (مسار التفريغ النحاسي المستقل) */}
              <line
                x1="250"
                y1="150"
                x2="150"
                y2="300"
                stroke={isLightningActive ? "#38bdf8" : "#0284c7"}
                strokeWidth={isLightningActive ? "4" : "2.5"}
                strokeDasharray="4 2"
              />
              <line
                x1="250"
                y1="150"
                x2="350"
                y2="300"
                stroke={isLightningActive ? "#38bdf8" : "#0284c7"}
                strokeWidth={isLightningActive ? "4" : "2.5"}
                strokeDasharray="4 2"
              />

              {/* Ground Earth Plane */}
              <rect x="40" y="300" width="420" height="35" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              <text x="250" y="318" fill="#64748b" fontSize="9" textAnchor="middle">شبكة التأريض الشعاعية العميقة وآبار كيميائية</text>

              {/* Subterranean Grounding Rods into Water Table */}
              <line x1="150" y1="300" x2="150" y2="335" stroke="#38bdf8" strokeWidth="3" />
              <line x1="250" y1="300" x2="250" y2="335" stroke="#38bdf8" strokeWidth="3" />
              <line x1="350" y1="300" x2="350" y2="335" stroke="#38bdf8" strokeWidth="3" />
            </svg>
          </div>

          {/* Real-time Telemetry Metrics */}
          <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">أقصى تيار صدمة:</span>
              <span className="font-mono font-bold text-sky-400 text-sm">{strikeCurrent} kA</span>
              <span className="text-[10px] text-slate-500 block">تفريغ فوري في 25 µs</span>
            </div>

            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">مقاومة شبكة التأريض:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{groundResistance} Ω</span>
              <span className="text-[10px] text-slate-500 block">آبار كيميائية نشطة</span>
            </div>

            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-slate-400 block">كفاءة حجب النبضة EMP:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{shieldingEfficiency}%</span>
              <span className="text-[10px] text-slate-500 block">عزل تام للحواسب النارية</span>
            </div>
          </div>
        </div>

        {/* Right: Technical Protection Protocol Details (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold font-display text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>استراتيجية الحماية الكهربائية المتعددة الطبقات</span>
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-slate-200 block">
                  1. مشتتات الشحنات الأيونية المسبقة (Charge Transfer System - CTS)
                </span>
                <p className="text-slate-400 leading-relaxed">
                  على خلاف موانع الصواعق التقليدية التي تجذب الصاعقة إليها، تقوم رؤوس CTS بتفريغ الشحنات الكهربائية الساكنة المتراكمة من الأرض إلى السحاب بشكل هادئ ومستمر، مما يمنع تكوّن فرق الجهد الصاعق في محيط البرج بنسبة تتجاوز 90%.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-slate-200 block">
                  2. مسارات التفريغ النحاسية المعزولة (Isolated Down-Conductors)
                </span>
                <p className="text-slate-400 leading-relaxed">
                  في حال حدوث صاعقة مباشرة، يتم توجيه تيار الصاعقة عبر كابلات نحاسية مجدولة سميكة معزولة ببوليمير فائق، بعيداً تماماً عن الكابلات العسكرية وهيكل الرادار، لتفريغها مباشرة في الأرض.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-slate-200 block">
                  3. العزل الكهرومغناطيسي ضد خطوط 380kV / 500kV
                </span>
                <p className="text-slate-400 leading-relaxed">
                  تم تغليف غرف المعالجة الرادارية وحواسب التوجيه الليزري بصفائح مصنوعة من مادة Mu-Metal النفاذة مغناطيسياً، تمنع التيارات الحثية الضخمة الناتجة عن خطوط الطاقة من التأثير على دقة التوجيه وحساسية التتبع.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-slate-200 block">
                  4. استجرار الطاقة الهجين والآمن (Galvanic Grid Tap + APU)
                </span>
                <p className="text-slate-400 leading-relaxed">
                  تستجر المنظومة طاقتها التشغيلية عبر محولات حثية معزولة هوائياً، مع بنك بطاريات تيتانات الليثيوم (LTO) ومولد توربيني يعمل كحاجز عازل (Buffer) يمنع أي ارتداد كهربائي من الشبكة في حال حدوث ماس كهربائي.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
            <span className="text-slate-300 font-semibold block">
              الربط البصري العازل (Dielectric Fiber-Optic Links):
            </span>
            <p className="text-slate-400 leading-relaxed">
              جميع وصلات نقل البيانات بين الرادار والمدافع وغرفة التحكم هي كابلات ألياف زجاجية غير موصلة للكهرباء (Non-Conductive Glass Fiber)، مما يستحيل معه انتقال أي شحنة صاعقة من برج إلى برج آخر.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
