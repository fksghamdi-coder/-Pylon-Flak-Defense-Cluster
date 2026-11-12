"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Calculator, MapPin, Wind, ShieldAlert, CheckCircle2, Sliders, ArrowUpRight } from "lucide-react";

interface LoadCalculatorViewProps {
  towerThreeChoice: "laser" | "missiles" | "ciws";
  setTowerThreeChoice: (choice: "laser" | "missiles" | "ciws") => void;
}

export default function LoadCalculatorView({
  towerThreeChoice,
  setTowerThreeChoice,
}: LoadCalculatorViewProps) {
  const [towerHeight, setTowerHeight] = useState<number>(95); // meters
  const [windSpeed, setWindSpeed] = useState<number>(140); // km/h
  const [soilType, setSoilType] = useState<"rock" | "sand" | "coastal">("sand");
  const [gridVoltage, setGridVoltage] = useState<number>(380); // kV
  const [selectedPreset, setSelectedPreset] = useState<string>("eastern");

  // Physics & Engineering Math Calculations
  const payloadWeightTons = towerThreeChoice === "laser" ? 6.2 : towerThreeChoice === "missiles" ? 7.8 : 8.4;
  const radarWeightTons = 4.5;
  const ciwsWeightTons = 8.1;
  const platformStructureWeightTons = (towerHeight / 100) * 14.5;
  const totalWeightTons = Number((payloadWeightTons + radarWeightTons + ciwsWeightTons + platformStructureWeightTons).toFixed(1));

  // Dynamic recoil peak force
  const recoilForceKn = towerThreeChoice === "ciws" ? 76.8 : 38.4; // kN with 88% dampening

  // Wind load moment (Bending moment M = 0.5 * rho * v^2 * Cd * Area * H)
  const windPressure = 0.5 * 1.225 * Math.pow((windSpeed * 1000) / 3600, 2); // N/m²
  const bendingMomentKnM = Number(((windPressure * 22 * towerHeight) / 1000).toFixed(0));

  // Foundation depth recommendation
  const foundationDepthM = soilType === "rock" ? 12 : soilType === "sand" ? 18 : 22;

  // Structural Safety Factor (FS)
  const safetyFactor = Number((3.6 - (windSpeed / 180) * 0.8 - (towerHeight / 120) * 0.5).toFixed(2));

  // Coverage Area Envelope
  const coverageRadiusKm = Number((Math.sqrt(2 * 6371 * (towerHeight / 1000)) * 1.25 + 30).toFixed(0));
  const coverageAreaSqKm = Number((Math.PI * Math.pow(coverageRadiusKm, 2)).toFixed(0));

  const applyPreset = (presetKey: string) => {
    setSelectedPreset(presetKey);
    if (presetKey === "eastern") {
      setTowerHeight(85);
      setWindSpeed(120);
      setSoilType("sand");
      setGridVoltage(380);
      setTowerThreeChoice("ciws");
    } else if (presetKey === "western") {
      setTowerHeight(95);
      setWindSpeed(140);
      setSoilType("coastal");
      setGridVoltage(380);
      setTowerThreeChoice("laser");
    } else if (presetKey === "southern") {
      setTowerHeight(110);
      setWindSpeed(160);
      setSoilType("rock");
      setGridVoltage(500);
      setTowerThreeChoice("missiles");
    } else if (presetKey === "neom") {
      setTowerHeight(100);
      setWindSpeed(150);
      setSoilType("rock");
      setGridVoltage(500);
      setTowerThreeChoice("laser");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            حاسبة الحمولات الإنشائية وجدوى نشر المواقع بالمملكة
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            حسابات هندسية فورية للأوزان، عزم الرياح، قوى الارتداد، وأبعاد الأساسات الخرسانية بحسب تضاريس مناطق المملكة.
          </p>
        </div>
      </div>

      {/* Preset Region Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => applyPreset("eastern")}
          className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
            selectedPreset === "eastern"
              ? "bg-emerald-950/60 border-emerald-500/60 text-white shadow-md ring-1 ring-emerald-500/40"
              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-xs">منشآت النفط والغاز</span>
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-[11px] text-slate-400 block">بقيق · الجبيل · رأس تنورة</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => applyPreset("western")}
          className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
            selectedPreset === "western"
              ? "bg-sky-950/60 border-sky-500/60 text-white shadow-md ring-1 ring-sky-500/40"
              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-xs">الساحل الغربي ومحطات التحلية</span>
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <span className="text-[11px] text-slate-400 block">رابغ · ينبع · الشعيبة</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => applyPreset("southern")}
          className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
            selectedPreset === "southern"
              ? "bg-purple-950/60 border-purple-500/60 text-white shadow-md ring-1 ring-purple-500/40"
              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-xs">الممرات الجبلية والحدودية</span>
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <span className="text-[11px] text-slate-400 block">عسير · جازان · نجران</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => applyPreset("neom")}
          className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
            selectedPreset === "neom"
              ? "bg-amber-950/60 border-amber-500/60 text-white shadow-md ring-1 ring-amber-500/40"
              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-xs">محاور الطاقة لمدينة نيوم</span>
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span className="text-[11px] text-slate-400 block">تبوك · شرما · ضباء</span>
        </motion.button>
      </div>

      {/* Main Parameters & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Input Sliders (6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="font-bold font-display text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>متغيرات الموقع والتصميم الإنشائي</span>
          </h3>

          {/* Tower Height */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">ارتفاع برج الضغط العالي (Mast Elevation)</span>
              <span className="font-mono text-emerald-400 font-bold">{towerHeight} متر</span>
            </div>
            <input
              type="range"
              min="45"
              max="120"
              value={towerHeight}
              onChange={(e) => setTowerHeight(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>45م (أبراج فرعية)</span>
              <span>85م (معياري 380kV)</span>
              <span>120م (معابر الأودية الكبرى)</span>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">سرعة هبات الرياح التصميمية (عواصف الهبوب)</span>
              <span className="font-mono text-amber-400 font-bold">{windSpeed} كم/س</span>
            </div>
            <input
              type="range"
              min="60"
              max="180"
              value={windSpeed}
              onChange={(e) => setWindSpeed(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 h-2 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>60 كم/س (رياح اعتيادية)</span>
              <span>120 كم/س (رياح صحراوية)</span>
              <span>180 كم/س (عاصفة قصوى)</span>
            </div>
          </div>

          {/* Soil Type */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 block">طبيعة التربة والأساسات الجيولوجية</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSoilType("rock")}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-colors ${
                  soilType === "rock"
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                صخور جبلية صلبة
              </button>
              <button
                type="button"
                onClick={() => setSoilType("sand")}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-colors ${
                  soilType === "sand"
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                كثبان رملية صحراوية
              </button>
              <button
                type="button"
                onClick={() => setSoilType("coastal")}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-colors ${
                  soilType === "coastal"
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                سبخة ساحلية رطبة
              </button>
            </div>
          </div>

          {/* Grid Voltage */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 block">جهد خط النقل الكهربائي المار بالبرج</label>
            <div className="grid grid-cols-3 gap-2">
              {[220, 380, 500].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setGridVoltage(v)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-colors ${
                    gridVoltage === v
                      ? "bg-sky-950/80 border-sky-500 text-sky-300"
                      : "bg-slate-950 border-slate-800 text-slate-400"
                  }`}
                >
                  {v} كيلو فولت
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Real-time Mathematical Output Cards (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold font-display text-white text-base border-b border-slate-800 pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>نتائج التحليل الإنشائي والجدوى الهندسية</span>
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                الحالة: تصميم معتمد
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 block">الوزن الساكن الإجمالي:</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{totalWeightTons} طن</span>
                <span className="text-[10px] text-slate-500 block">شاملاً المنصة والأسلحة والرادار</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 block">عزم انحناء الرياح (Bending Moment):</span>
                <span className="text-xl font-bold font-mono text-amber-400">{bendingMomentKnM} kN.m</span>
                <span className="text-[10px] text-slate-500 block">يشتت عبر العمود الفولاذي الداخلي</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 block">قوة ارتداد المدافع المخمدة:</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{recoilForceKn} kN</span>
                <span className="text-[10px] text-slate-500 block">تخفيض 88% عبر الأسطوانات</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 block">عمق أوتاد الأساسات المطلوبة:</span>
                <span className="text-xl font-bold font-mono text-sky-400">{foundationDepthM} متر</span>
                <span className="text-[10px] text-slate-500 block">حقن خرسانة وأنابيب فولاذية</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 block">معامل الأمان الإنشائي (Safety Factor):</span>
                <span className={`text-xl font-bold font-mono ${safetyFactor >= 2.0 ? "text-emerald-400" : "text-amber-400"}`}>
                  {safetyFactor}
                </span>
                <span className="text-[10px] text-slate-500 block">المعيار العسكري الأدنى: 2.00</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 block">مساحة المظلة النارية المحمية:</span>
                <span className="text-xl font-bold font-mono text-purple-400">{coverageAreaSqKm} كم²</span>
                <span className="text-[10px] text-slate-500 block">نصف قطر الرصد: {coverageRadiusKm} كم</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs space-y-2">
            <span className="text-slate-300 font-semibold block">
              توصية الإدارة الهندسية العامة للدفاع الجوي:
            </span>
            <p className="text-slate-400 leading-relaxed">
              وفقاً للمعطيات المحددة، يُنصح بتثبيت الهيكل الداخلي الأنبوبي المفرغ (Internal Tubular Monocoque) لربط رأس البرج مباشرة بالأساسات الخرسانية مع استخدام مانعات الصواعق الأيونية المزدوجة ومخمدات الاهتزازات النيتروجينية لمقاومة زوابع الرمال الصحراوية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
