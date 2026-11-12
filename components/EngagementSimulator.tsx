"use client";

import React, { useState, useEffect, useRef } from "react";
import { Radar, Crosshair, Play, RotateCcw, AlertTriangle, ShieldCheck, Zap, Activity, Eye, Radio, Target, Flame, Sliders } from "lucide-react";
import { tacticalAudio } from "@/lib/audio";

interface TargetItem {
  id: number;
  trackId: string;
  type: "drone" | "cruise" | "stealth" | "ballistic";
  name: string;
  x: number; // -100 to 100 on radar grid
  y: number;
  speed: number; // km/h
  altitude: number; // meters
  heading: number; // degrees
  rcs: number; // radar cross section in m²
  distanceKm: number;
  lastSweptAngle: number;
  isIlluminated: boolean;
  status: "incoming" | "detected" | "tracked" | "locked" | "engaging" | "destroyed";
  engagedBy?: "ciws" | "laser" | "missile" | null;
  targetTempC: number; // for laser heating simulation
  timeToImpactSec: number;
}

interface EngagementSimulatorProps {
  towerThreeChoice: "laser" | "missiles" | "ciws";
  soundEnabled: boolean;
}

function buildScenarioTargets(type: "swarm" | "cruise" | "stealth" | "mixed"): TargetItem[] {
  const baseTime = Date.now();
  if (type === "swarm") {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: baseTime + i,
      trackId: `TRK-0${i + 1}`,
      type: "drone",
      name: `مسيرة انتحارية Shahed-#${i + 1}`,
      x: -78 + (i % 3) * 15 + Math.random() * 6,
      y: -65 - Math.floor(i / 3) * 18,
      speed: 185,
      altitude: 80 + i * 10,
      heading: 135,
      rcs: 0.05,
      distanceKm: 34 + i * 2,
      lastSweptAngle: 0,
      isIlluminated: false,
      status: "incoming",
      targetTempC: 38,
      timeToImpactSec: Math.round(((34 + i * 2) * 3600) / 185),
    }));
  } else if (type === "cruise") {
    return [
      {
        id: baseTime,
        trackId: "TRK-CRZ-1",
        type: "cruise",
        name: "صاروخ كروز مجنح منخفض (Quds-3)",
        x: 85,
        y: -42,
        speed: 880,
        altitude: 35,
        heading: 245,
        rcs: 0.22,
        distanceKm: 42,
        lastSweptAngle: 0,
        isIlluminated: false,
        status: "incoming",
        targetTempC: 110,
        timeToImpactSec: Math.round((42 * 3600) / 880),
      },
    ];
  } else if (type === "stealth") {
    return [
      {
        id: baseTime,
        trackId: "TRK-STL-9",
        type: "stealth",
        name: "مسيرة استطلاع شبحية خفيفة (Micro UAV)",
        x: -12,
        y: -85,
        speed: 110,
        altitude: 420,
        heading: 180,
        rcs: 0.003,
        distanceKm: 28,
        lastSweptAngle: 0,
        isIlluminated: false,
        status: "incoming",
        targetTempC: 29,
        timeToImpactSec: Math.round((28 * 3600) / 110),
      },
    ];
  } else {
    // Mixed
    return [
      {
        id: baseTime,
        trackId: "TRK-CRZ-1",
        type: "cruise",
        name: "صاروخ كروز منخفض",
        x: 72,
        y: -48,
        speed: 860,
        altitude: 40,
        heading: 235,
        rcs: 0.25,
        distanceKm: 36,
        lastSweptAngle: 0,
        isIlluminated: false,
        status: "incoming",
        targetTempC: 120,
        timeToImpactSec: 15,
      },
      {
        id: baseTime + 1,
        trackId: "TRK-DRN-1",
        type: "drone",
        name: "مسيرة انتحارية دلتا #1",
        x: -60,
        y: -60,
        speed: 190,
        altitude: 85,
        heading: 135,
        rcs: 0.04,
        distanceKm: 28,
        lastSweptAngle: 0,
        isIlluminated: false,
        status: "incoming",
        targetTempC: 45,
        timeToImpactSec: 52,
      },
      {
        id: baseTime + 2,
        trackId: "TRK-DRN-2",
        type: "drone",
        name: "مسيرة انتحارية دلتا #2",
        x: -72,
        y: -48,
        speed: 190,
        altitude: 90,
        heading: 135,
        rcs: 0.04,
        distanceKm: 31,
        lastSweptAngle: 0,
        isIlluminated: false,
        status: "incoming",
        targetTempC: 45,
        timeToImpactSec: 58,
      },
    ];
  }
}

export default function EngagementSimulator({
  towerThreeChoice,
  soundEnabled,
}: EngagementSimulatorProps) {
  const [targets, setTargets] = useState<TargetItem[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [radarAngle, setRadarAngle] = useState<number>(0);
  const [selectedTargetId, setSelectedTargetId] = useState<number | null>(null);
  const [operationalMode, setOperationalMode] = useState<"auto" | "semi_manual">("auto");
  const [thermalPalette, setThermalPalette] = useState<"white_hot" | "black_hot" | "flir_green">("white_hot");
  const [opticalZoom] = useState<number>(4);
  const [logs, setLogs] = useState<{ time: string; text: string; type: "info" | "alert" | "kill" }[]>([]);
  const [stats, setStats] = useState({ intercepted: 0, roundsFired: 0, laserSeconds: 0, missilesLaunched: 0 });

  // Initialize targets on client mount to prevent SSR hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialTargets = buildScenarioTargets("swarm");
      setTargets(initialTargets);
      if (initialTargets.length > 0) {
        setSelectedTargetId(initialTargets[0].id);
      }
      const time = new Date().toLocaleTimeString("ar-SA", { hour12: false });
      setLogs([
        {
          time,
          text: "بدء منظومة الرصد بالاشعة تحت الحمراء والرادار 4D AESA - رصد سرب مسيرات انتحارية",
          type: "alert",
        },
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const addLog = (text: string, type: "info" | "alert" | "kill" = "info") => {
    const time = new Date().toLocaleTimeString("ar-SA", { hour12: false });
    setLogs((prev) => [{ time, text, type }, ...prev.slice(0, 28)]);
  };

  const spawnScenario = (type: "swarm" | "cruise" | "stealth" | "mixed") => {
    const newTargets = buildScenarioTargets(type);

    if (type === "swarm") {
      addLog("إنذار مبكر: رصد قطاعي لسرب طائرات مسيرة انتحارية (Shahed-136) من زاوية 315°", "alert");
      if (soundEnabled) tacticalAudio.playAlertSiren();
    } else if (type === "cruise") {
      addLog("خطر داهم: رصد صاروخ كروز يطير بمحاذاة التضاريس بارتفاع 35 متراً وبسرعة 880 كم/س", "alert");
      if (soundEnabled) tacticalAudio.playAlertSiren();
    } else if (type === "stealth") {
      addLog("رصد حراري EO/IR: هدف شبحي فائق الصغر بمقطع راداري 0.003 م²", "info");
      if (soundEnabled) tacticalAudio.playRadarPing();
    } else {
      addLog("هجوم تشبعي منسق: صواريخ كروز ومسيرات انتحارية في اتجاهات متزامنة", "alert");
      if (soundEnabled) tacticalAudio.playAlertSiren();
    }

    setTargets(newTargets);
    setSelectedTargetId(newTargets[0]?.id || null);
    setIsRunning(true);
  };

  const resetSimulator = () => {
    setTargets([]);
    setSelectedTargetId(null);
    addLog("تمت إعادة ضبط المنظومة وتطهير مصفوفة التتبع الراداري للموقع", "info");
  };

  // Manual Trigger Action by Operator
  const executeManualEngagement = (targetId: number, weaponType: "ciws" | "laser" | "missile") => {
    setTargets((prev) =>
      prev.map((t) => {
        if (t.id === targetId) {
          addLog(`أمر اشتباك يدوي من القائد: توجيه ${weaponType === "ciws" ? "البرج 2 (الرشاش الثنائي)" : weaponType === "laser" ? "البرج 3 (الليزر)" : "البرج 3 (الصواريخ)"} ضد ${t.name}`, "alert");
          if (soundEnabled) {
            if (weaponType === "ciws") tacticalAudio.playGunBurst();
            if (weaponType === "laser") tacticalAudio.playLaserHum();
            if (weaponType === "missile") tacticalAudio.playMissileLaunch();
          }
          return { ...t, status: "engaging" as const, engagedBy: weaponType };
        }
        return t;
      })
    );
  };

  // Main Radar Sweep & Physics Loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // 1. Advance radar angle
      let currentNextAngle = 0;
      setRadarAngle((prevAngle) => {
        currentNextAngle = (prevAngle + 5) % 360;
        return currentNextAngle;
      });

      // 2. Physics & target kinetics
      setTargets((prevTargets) => {
        if (prevTargets.length === 0) return prevTargets;

        return prevTargets.map((t: TargetItem): TargetItem => {
          if (t.status === "destroyed") return t;

          // Target bearing angle relative to center (0° is top, 90° right, 180° bottom, 270° left)
          let targetAzimuth = (Math.atan2(t.x, -t.y) * 180) / Math.PI;
          if (targetAzimuth < 0) targetAzimuth += 360;

          // Check if radar beam passed over target in this tick
          const angleDiff = Math.abs(currentNextAngle - targetAzimuth);
          const isSweptNow = angleDiff <= 6 || angleDiff >= 354;

          // Physical movement towards center (0,0)
          const angleToCenter = Math.atan2(0 - t.y, 0 - t.x);
          const moveStep = (t.speed / 600) * 0.85;
          const newX = t.x + Math.cos(angleToCenter) * moveStep;
          const newY = t.y + Math.sin(angleToCenter) * moveStep;
          const currentDist = Math.sqrt(newX * newX + newY * newY);
          const distKm = Math.max(0.5, Number((currentDist * 0.45).toFixed(1)));
          const tti = Math.max(1, Math.round((distKm * 3600) / t.speed));

          let currentStatus = t.status;
          let currentTemp = t.targetTempC;
          let engagedWeapon = t.engagedBy;

          // When swept by radar:
          if (isSweptNow && currentStatus === "incoming") {
            currentStatus = "detected";
            addLog(`البرج 1 (AESA): رصد الهدف ${t.trackId} على سمت ${Math.round(targetAzimuth)}° ومسافة ${distKm} كم`, "info");
            if (soundEnabled) tacticalAudio.playRadarPing();
          } else if (isSweptNow && currentStatus === "detected") {
            currentStatus = "tracked";
            addLog(`البرج 1 (EO/IR): إقفال تتبع كهروبصري وحساب سرعة دوبلر للهدف ${t.trackId}`, "info");
          }

          // Autonomous engagement logic
          if (operationalMode === "auto") {
            // Long/Medium Range engagement by Tower 3
            if (currentDist <= 65 && (currentStatus === "tracked" || currentStatus === "detected")) {
              currentStatus = "locked";
              if (towerThreeChoice === "missiles" && !engagedWeapon) {
                engagedWeapon = "missile";
                currentStatus = "engaging";
                addLog(`البرج 3 (صواريخ VLS): إطلاق اعتراضي ضد ${t.name}`, "alert");
                if (soundEnabled) tacticalAudio.playMissileLaunch();
                setStats((s) => ({ ...s, missilesLaunched: s.missilesLaunched + 1 }));
              } else if (towerThreeChoice === "laser" && !engagedWeapon) {
                engagedWeapon = "laser";
                currentStatus = "engaging";
                addLog(`البرج 3 (مدفع ليزر HEL): تركيز حزمة طاقة 100kW على الهيكل`, "alert");
                if (soundEnabled) tacticalAudio.playLaserHum();
                setStats((s) => ({ ...s, laserSeconds: s.laserSeconds + 2 }));
              }
            }

            // Close In Range (CIWS 35mm airburst) by Tower 2
            if (currentDist <= 42 && engagedWeapon !== "missile") {
              if (engagedWeapon !== "laser" || currentDist <= 28) {
                engagedWeapon = "ciws";
                currentStatus = "engaging";
                addLog(`البرج 2 (الرشاش الثنائي 35mm): إطلاق رشق مدفعي AHEAD ذكي`, "alert");
                if (soundEnabled) tacticalAudio.playGunBurst();
                setStats((s) => ({ ...s, roundsFired: s.roundsFired + 54 }));
              }
            }
          }

          // Laser heating kinetics
          if (currentStatus === "engaging" && engagedWeapon === "laser") {
            currentTemp += 140; // Heat up rapidly
            if (currentTemp >= 820) {
              // Structural thermal destruction
              addLog(`تدمير ليزري مؤكد: انصهار أجنحة ${t.name} واحتراق خزان الوقود في الجو!`, "kill");
              if (soundEnabled) tacticalAudio.playExplosion();
              setStats((s) => ({ ...s, intercepted: s.intercepted + 1 }));
              return { ...t, x: newX, y: newY, status: "destroyed" as const, targetTempC: currentTemp };
            }
          }

          // Kinetic destruction by CIWS or Missile
          if (currentStatus === "engaging" && (engagedWeapon === "ciws" || engagedWeapon === "missile")) {
            if (currentDist <= 26 || (engagedWeapon === "missile" && currentDist <= 45)) {
              addLog(`تأكيد إصابة فتاكة: تم اعتراض وتفتيت ${t.name} عبر شظايا ${engagedWeapon === "ciws" ? "AHEAD 35mm" : "صاروخ VLS"}!`, "kill");
              if (soundEnabled) tacticalAudio.playExplosion();
              setStats((s) => ({ ...s, intercepted: s.intercepted + 1 }));
              return { ...t, x: newX, y: newY, status: "destroyed" as const };
            }
          }

          return {
            ...t,
            x: newX,
            y: newY,
            distanceKm: distKm,
            timeToImpactSec: tti,
            lastSweptAngle: isSweptNow ? currentNextAngle : t.lastSweptAngle,
            isIlluminated: isSweptNow,
            status: currentStatus,
            targetTempC: currentTemp,
            engagedBy: engagedWeapon,
          };
        });
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isRunning, operationalMode, towerThreeChoice, soundEnabled]);

  const activeLockedTarget = targets.find((t) => t.id === selectedTargetId) || targets.find((t) => t.status !== "destroyed") || targets[0];

  return (
    <div className="space-y-6">
      {/* Top Tactical Command Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>نظام إدارة النيران الآلي · منظومة الرصد بالاشعة تحت الحمراء والرادار</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
            محاكي الرصد الكهروبصري والاشتباك التكتيكي المتقدم
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            رادار مسح نشط بزاوية 360° متزامن مع منظار الرصد الحراري (FLIR) وغرفة توزيع النيران للتعامل مع الأسراب والكروز.
          </p>
        </div>

        {/* Operational Mode Toggle + Scenarios */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setOperationalMode("auto")}
              className={`px-3 py-1.5 font-bold rounded-md transition-colors ${
                operationalMode === "auto"
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              وضع آلي كامل (Auto-Fire)
            </button>
            <button
              onClick={() => setOperationalMode("semi_manual")}
              className={`px-3 py-1.5 font-bold rounded-md transition-colors ${
                operationalMode === "semi_manual"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              تعيين يدوي وتوجيه (Manual)
            </button>
          </div>

          <button
            onClick={() => spawnScenario("swarm")}
            className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
          >
            سرب درونز (6)
          </button>
          <button
            onClick={() => spawnScenario("cruise")}
            className="px-2.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
          >
            كروز منخفض
          </button>
          <button
            onClick={() => spawnScenario("stealth")}
            className="px-2.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
          >
            هدف شبحي
          </button>
          <button
            onClick={() => spawnScenario("mixed")}
            className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg transition-colors shadow-sm"
          >
            هجوم مركب
          </button>
          <button
            onClick={resetSimulator}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700"
            title="تطهير الرادار"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Dual Tactical Display: Tactical PPI Radar (Left) + EO/IR FLIR Thermal Scope (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar PPI Display Screen (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-xs font-mono">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Radar className="w-4 h-4 animate-spin [animation-duration:8s]" />
              رادار المسح التكتيكي AESA 360° (PPI Display)
            </span>
            <div className="flex items-center gap-3 text-slate-400">
              <span>السمت: {Math.round(radarAngle)}°</span>
              <span className="text-emerald-400">التردد: 9.8 GHz</span>
            </div>
          </div>

          {/* SVG Tactical Radar Display with Sweep & Blips */}
          <div className="flex-1 flex items-center justify-center relative min-h-[360px] bg-[#020d09] rounded-lg border border-emerald-950/70 overflow-hidden cursor-crosshair">
            <svg viewBox="0 0 500 500" className="w-full h-full max-h-[380px]">
              {/* Range Rings */}
              <circle cx="250" cy="250" r="220" fill="none" stroke="#065f46" strokeWidth="1" strokeDasharray="3 3" />
              <text x="250" y="38" fill="#047857" fontSize="9" fontFamily="monospace" textAnchor="middle">50 KM</text>

              <circle cx="250" cy="250" r="160" fill="none" stroke="#065f46" strokeWidth="1" strokeDasharray="3 3" />
              <text x="250" y="98" fill="#047857" fontSize="9" fontFamily="monospace" textAnchor="middle">35 KM</text>

              <circle cx="250" cy="250" r="100" fill="none" stroke="#047857" strokeWidth="1.2" />
              <text x="250" y="158" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="middle">20 KM (منطقة القتل)</text>

              <circle cx="250" cy="250" r="45" fill="none" stroke="#059669" strokeWidth="1.5" />
              <text x="250" y="212" fill="#34d399" fontSize="8" fontFamily="monospace" textAnchor="middle">5 KM</text>

              {/* Azimuth Ray Lines (0, 45, 90, 135, 180, 225, 270, 315) */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={deg}
                  x1="250"
                  y1="250"
                  x2={250 + Math.cos(((deg - 90) * Math.PI) / 180) * 220}
                  y2={250 + Math.sin(((deg - 90) * Math.PI) / 180) * 220}
                  stroke="#064e3b"
                  strokeWidth="0.8"
                  strokeDasharray="2 4"
                />
              ))}

              {/* High Voltage Grid Line Passing Through */}
              <line x1="60" y1="360" x2="440" y2="140" stroke="#d97706" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.6" />
              <text x="420" y="155" fill="#f59e0b" fontSize="9" fontFamily="monospace">مسار خط 380kV</text>

              {/* Dynamic Radar Sweeping Beam */}
              <line
                x1="250"
                y1="250"
                x2={250 + Math.cos(((radarAngle - 90) * Math.PI) / 180) * 220}
                y2={250 + Math.sin(((radarAngle - 90) * Math.PI) / 180) * 220}
                stroke="#34d399"
                strokeWidth="2.5"
                opacity="0.9"
              />
              <path
                d={`M 250 250 L ${250 + Math.cos(((radarAngle - 125) * Math.PI) / 180) * 220} ${
                  250 + Math.sin(((radarAngle - 125) * Math.PI) / 180) * 220
                } A 220 220 0 0 1 ${250 + Math.cos(((radarAngle - 90) * Math.PI) / 180) * 220} ${
                  250 + Math.sin(((radarAngle - 90) * Math.PI) / 180) * 220
                } Z`}
                fill="#10b981"
                fillOpacity="0.14"
              />

              {/* Center 3-Tower Cluster Node Marker */}
              <circle cx="245" cy="245" r="4.5" fill="#10b981" />
              <circle cx="255" cy="255" r="4.5" fill="#f59e0b" />
              <circle cx="250" cy="260" r="4.5" fill="#38bdf8" />
              <circle cx="250" cy="250" r="16" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" />

              {/* Targets on Radar Screen */}
              {targets.map((t) => {
                const screenX = 250 + (t.x / 100) * 220;
                const screenY = 250 + (t.y / 100) * 220;
                const isSelected = t.id === selectedTargetId;

                if (t.status === "destroyed") {
                  return (
                    <g key={t.id}>
                      <circle cx={screenX} cy={screenY} r="18" fill="#ef4444" fillOpacity="0.6" className="animate-ping" />
                      <circle cx={screenX} cy={screenY} r="6" fill="#fbbf24" />
                      <text x={screenX} y={screenY - 10} fill="#fca5a5" fontSize="8" fontWeight="bold" textAnchor="middle">
                        DESTROYED
                      </text>
                    </g>
                  );
                }

                return (
                  <g
                    key={t.id}
                    onClick={() => setSelectedTargetId(t.id)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    {/* Interception Fire Beam from center to target */}
                    {t.status === "engaging" && (
                      <g>
                        {t.engagedBy === "laser" && (
                          <line x1="250" y1="260" x2={screenX} y2={screenY} stroke="#38bdf8" strokeWidth="3" opacity="0.9" />
                        )}
                        {t.engagedBy === "ciws" && (
                          <line x1="255" y1="255" x2={screenX} y2={screenY} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                        )}
                        {t.engagedBy === "missile" && (
                          <line x1="250" y1="260" x2={screenX} y2={screenY} stroke="#c084fc" strokeWidth="2.5" strokeDasharray="6 3" />
                        )}
                      </g>
                    )}

                    {/* Target Radar Blip & Lock-on Ring */}
                    {isSelected && (
                      <circle cx={screenX} cy={screenY} r="14" fill="none" stroke="#38bdf8" strokeWidth="1.5" className="animate-pulse" />
                    )}

                    <circle
                      cx={screenX}
                      cy={screenY}
                      r={t.type === "cruise" ? "6" : "4.5"}
                      fill={t.status === "engaging" ? "#f59e0b" : t.status === "locked" ? "#ef4444" : "#f87171"}
                      className={t.isIlluminated ? "animate-ping" : ""}
                    />
                    <circle cx={screenX} cy={screenY} r="8" fill="none" stroke="#ef4444" strokeWidth="1" />

                    {/* Vector velocity tail line */}
                    <line
                      x1={screenX}
                      y1={screenY}
                      x2={screenX + Math.cos(((t.heading + 90) * Math.PI) / 180) * 12}
                      y2={screenY + Math.sin(((t.heading + 90) * Math.PI) / 180) * 12}
                      stroke="#ef4444"
                      strokeWidth="1"
                    />

                    {/* Track Tag Label */}
                    <text x={screenX + 9} y={screenY - 3} fill="#fca5a5" fontSize="8" fontFamily="monospace">
                      {t.trackId} ({t.distanceKm}km)
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Radar Telemetry Bar */}
          <div className="mt-3 pt-2 border-t border-slate-800 grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">الأهداف المحيدة:</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">{stats.intercepted}</span>
            </div>
            <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">طلقات CIWS:</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{stats.roundsFired}</span>
            </div>
            <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">طاقة الليزر HEL:</span>
              <span className="font-mono font-bold text-sky-400 text-sm">{stats.laserSeconds}s</span>
            </div>
            <div className="p-1.5 bg-slate-900 rounded border border-slate-800">
              <span className="text-slate-400 block text-[10px]">صواريخ VLS:</span>
              <span className="font-mono font-bold text-purple-400 text-sm">{stats.missilesLaunched}</span>
            </div>
          </div>
        </div>

        {/* Right: Live FLIR Thermal Camera Scope & Target Telemetry (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* EO/IR Thermal Camera Viewport */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs font-mono">
              <span className="text-sky-400 font-bold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                منظار الرصد الكهروبصري والحراري المبرد (EO/IR FLIR Mast)
              </span>

              {/* Thermal Mode Select */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setThermalPalette("white_hot")}
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    thermalPalette === "white_hot" ? "bg-slate-200 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  W-HOT
                </button>
                <button
                  onClick={() => setThermalPalette("black_hot")}
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    thermalPalette === "black_hot" ? "bg-slate-700 text-white font-bold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  B-HOT
                </button>
                <button
                  onClick={() => setThermalPalette("flir_green")}
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    thermalPalette === "flir_green" ? "bg-emerald-600 text-white font-bold" : "text-slate-400 hover:text-white"
                  }`}
                >
                  NVG
                </button>
              </div>
            </div>

            {/* FLIR Visualizer Canvas */}
            <div
              className={`relative rounded-lg h-56 flex items-center justify-center border overflow-hidden transition-colors ${
                thermalPalette === "white_hot"
                  ? "bg-slate-900 border-slate-700"
                  : thermalPalette === "black_hot"
                  ? "bg-slate-950 border-slate-800"
                  : "bg-[#031c12] border-emerald-800"
              }`}
            >
              {/* Scanline Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

              {/* Military Crosshair Reticle & Lead Angle Predictor */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Horizontal & Vertical Crosshair */}
                <div className={`w-32 h-[1px] ${thermalPalette === "flir_green" ? "bg-emerald-400" : "bg-sky-400"} opacity-70`} />
                <div className={`h-32 w-[1px] absolute ${thermalPalette === "flir_green" ? "bg-emerald-400" : "bg-sky-400"} opacity-70`} />

                {/* Stadiametric Range Boresight Ring */}
                <div className="w-20 h-20 rounded-full border border-dashed border-sky-400/50 absolute" />
                <div className="w-10 h-10 border border-sky-400/80 absolute" />

                {/* Lead-Angle Computing Dot */}
                <div className="absolute translate-x-6 -translate-y-4 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </div>

              {/* Target Thermal Wireframe / Infrared Exhaust Silhouette */}
              {activeLockedTarget && activeLockedTarget.status !== "destroyed" ? (
                <div className="relative text-center space-y-1">
                  {/* Delta-wing or missile silhouette with heat signature */}
                  <div className="relative inline-block">
                    <svg viewBox="0 0 100 60" className="w-28 h-18 mx-auto">
                      {/* Body */}
                      <polygon
                        points="50,10 75,50 50,42 25,50"
                        fill={thermalPalette === "white_hot" ? "#cbd5e1" : thermalPalette === "black_hot" ? "#0f172a" : "#10b981"}
                        stroke={thermalPalette === "flir_green" ? "#34d399" : "#ffffff"}
                        strokeWidth="1.5"
                      />
                      {/* Engine Heat Glow */}
                      <circle
                        cx="50"
                        cy="42"
                        r={activeLockedTarget.engagedBy === "laser" ? "12" : "6"}
                        fill={activeLockedTarget.engagedBy === "laser" ? "#ef4444" : "#f59e0b"}
                        className="animate-pulse"
                      />
                    </svg>
                  </div>

                  <div className="font-mono text-xs text-sky-300 font-bold">
                    [ إقفال ليزري LRF: {activeLockedTarget.trackId} ]
                  </div>
                </div>
              ) : (
                <div className="text-center font-mono text-xs text-slate-500">
                  البحث عن مسار حراري في الأفق...
                </div>
              )}

              {/* HUD Corner Data Readouts */}
              <div className="absolute top-2 right-2 text-[10px] font-mono text-sky-400 leading-tight">
                <div>FOV: 3.2° · ZOOM: {opticalZoom}x</div>
                <div>FLIR SENSOR: MWIR 3-5µm</div>
              </div>
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-emerald-400 leading-tight">
                <div>LRF: {activeLockedTarget?.distanceKm || 0} KM</div>
                <div>TTI: {activeLockedTarget?.timeToImpactSec || 0} SEC</div>
              </div>
            </div>

            {/* Target Telemetry Breakdown & Manual Firing Controls */}
            {activeLockedTarget && (
              <div className="space-y-2 pt-1 text-xs">
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-400 block">اسم الهدف:</span>
                    <span className="font-bold text-white truncate block">{activeLockedTarget.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">المسافة والسرعة:</span>
                    <span className="font-bold text-emerald-400">{activeLockedTarget.distanceKm} كم · {activeLockedTarget.speed} كم/س</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">المقطع الراداري (RCS):</span>
                    <span className="font-bold text-sky-400">{activeLockedTarget.rcs} م²</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">الحرارة الهيكلية:</span>
                    <span className={`font-bold ${activeLockedTarget.targetTempC > 300 ? "text-red-400 animate-pulse" : "text-amber-400"}`}>
                      {activeLockedTarget.targetTempC} °C
                    </span>
                  </div>
                </div>

                {/* Operator Manual Firing Action Buttons */}
                {operationalMode === "semi_manual" && activeLockedTarget.status !== "destroyed" && (
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    <button
                      onClick={() => executeManualEngagement(activeLockedTarget.id, "ciws")}
                      className="py-1.5 px-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] rounded transition-colors text-center"
                    >
                      إطلاق مدفع البرج 2
                    </button>
                    {towerThreeChoice === "laser" && (
                      <button
                        onClick={() => executeManualEngagement(activeLockedTarget.id, "laser")}
                        className="py-1.5 px-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-[11px] rounded transition-colors text-center"
                      >
                        حرق ليزر البرج 3
                      </button>
                    )}
                    {towerThreeChoice === "missiles" && (
                      <button
                        onClick={() => executeManualEngagement(activeLockedTarget.id, "missile")}
                        className="py-1.5 px-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] rounded transition-colors text-center"
                      >
                        إطلاق صاروخ البرج 3
                      </button>
                    )}
                    {towerThreeChoice === "ciws" && (
                      <button
                        onClick={() => executeManualEngagement(activeLockedTarget.id, "ciws")}
                        className="py-1.5 px-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] rounded transition-colors text-center"
                      >
                        إطلاق رشاش البرج 3
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Millisecond Military Event Feed */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
            <span className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              سجل إشارات التتبع والاشتباك الحية (Sensor-to-Shooter Log)
            </span>

            <div className="max-h-44 overflow-y-auto space-y-1 text-xs font-mono">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`py-1 px-2 rounded border-r-2 text-[11px] flex items-start gap-1.5 ${
                    log.type === "kill"
                      ? "bg-emerald-950/40 border-r-emerald-400 text-emerald-300"
                      : log.type === "alert"
                      ? "bg-amber-950/40 border-r-amber-400 text-amber-300"
                      : "bg-slate-950 border-r-slate-700 text-slate-300"
                  }`}
                >
                  <span className="text-slate-500 shrink-0">{log.time}</span>
                  <span className="truncate">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
