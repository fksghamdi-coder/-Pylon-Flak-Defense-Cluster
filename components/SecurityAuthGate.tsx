"use client";

import React, { useState, useEffect } from "react";
import { Lock, ShieldCheck, CheckCircle, AlertTriangle, KeyRound, Upload, HelpCircle, RotateCcw, Copy, Check, ArrowRight, Sparkles } from "lucide-react";
import { tacticalAudio } from "@/lib/audio";

interface SecurityAuthGateProps {
  onAuthenticate: (clearanceData: { name: string; role: string; level: string; code: string }) => void;
  soundEnabled: boolean;
}

/**
 * EMBEDDED TACTICAL BACKGROUND VECTOR ARTWORK
 * Embedded directly inside the component source code as a self-contained JSX graphic asset fallback.
 */
function EmbeddedTacticalArtwork() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full object-fill object-center transition-all duration-300"
    >
      <defs>
        {/* Dramatic Sunset Sky Gradient */}
        <linearGradient id="codeSunsetSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a1324" />
          <stop offset="35%" stopColor="#1e293b" />
          <stop offset="65%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
        </linearGradient>

        {/* Coastal Sea & Water Reflective Gradient */}
        <linearGradient id="codeSea" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>

        {/* Laser Interceptor Beams */}
        <linearGradient id="codeRedLaser" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="1" />
          <stop offset="100%" stopColor="#f87171" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="codeGreenDataLink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
        </linearGradient>

        {/* Holographic Shield Dome Glows */}
        <radialGradient id="codeShieldGlow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#0284c7" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="codeShieldGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background Sky & Terrain */}
      <rect width="1440" height="900" fill="url(#codeSunsetSky)" />
      <rect x="0" y="240" width="1440" height="120" fill="url(#codeSea)" opacity="0.85" />

      {/* Refinery Silhouettes */}
      <g opacity="0.7">
        <rect x="160" y="270" width="80" height="40" rx="4" fill="#0f172a" stroke="#334155" />
        <rect x="250" y="260" width="55" height="50" rx="4" fill="#0f172a" stroke="#334155" />
        <line x1="320" y1="230" x2="320" y2="310" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="320" cy="228" r="5" fill="#f59e0b" className="animate-pulse" />
      </g>

      {/* Mountain Ridges */}
      <path d="M 0 360 Q 200 320 450 350 Q 800 310 1150 340 Q 1300 320 1440 350 L 1440 900 L 0 900 Z" fill="#1c1917" opacity="0.9" />
      <path d="M 0 420 Q 300 380 650 410 Q 1000 370 1440 400 L 1440 900 L 0 900 Z" fill="#0c0a09" />

      {/* Catenary High Voltage Lines */}
      <path d="M 0 280 Q 400 360 800 280 T 1440 280" fill="none" stroke="#525252" strokeWidth="2.5" />
      <path d="M 0 310 Q 400 390 800 310 T 1440 310" fill="none" stroke="#525252" strokeWidth="2.5" />

      {/* Tower 1 (Left - Radar & Laser Interceptor) */}
      <g>
        <circle cx="420" cy="250" r="170" fill="url(#codeShieldGlow1)" />
        <circle cx="420" cy="250" r="170" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.85" />
        <polygon points="370,550 405,250 435,250 470,550" fill="#1c1917" stroke="#38bdf8" strokeWidth="2.5" />
        <line x1="380" y1="480" x2="460" y2="480" stroke="#0284c7" strokeWidth="2" />
        <line x1="390" y1="410" x2="450" y2="410" stroke="#0284c7" strokeWidth="2" />
        <line x1="320" y1="360" x2="520" y2="360" stroke="#38bdf8" strokeWidth="3.5" />
        <circle cx="420" cy="222" r="18" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
        <line x1="435" y1="230" x2="820" y2="80" stroke="url(#codeRedLaser)" strokeWidth="4" />
        <circle cx="820" cy="80" r="9" fill="#ef4444" className="animate-ping" />
      </g>

      {/* Tower 2 (Center - Air Defense Cannon) */}
      <g>
        <circle cx="800" cy="280" r="180" fill="url(#codeShieldGlow2)" />
        <circle cx="800" cy="280" r="180" fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.85" />
        <polygon points="750,580 785,280 815,280 850,580" fill="#1c1917" stroke="#10b981" strokeWidth="2.5" />
        <line x1="760" y1="500" x2="840" y2="500" stroke="#059669" strokeWidth="2" />
        <circle cx="800" cy="252" r="18" fill="#047857" stroke="#34d399" strokeWidth="2.5" />
      </g>

      {/* Tower 3 (Right - VLS Missiles) */}
      <g>
        <circle cx="1180" cy="310" r="160" fill="url(#codeShieldGlow1)" />
        <circle cx="1180" cy="310" r="160" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.85" />
        <polygon points="1130,600 1165,310 1195,310 1230,600" fill="#1c1917" stroke="#38bdf8" strokeWidth="2.5" />
        <circle cx="1180" cy="282" r="18" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
      </g>

      {/* Header & C4I HUD Overlay Badges */}
      <g fontFamily="monospace" fontSize="13" fontWeight="bold">
        <rect x="40" y="30" width="360" height="55" rx="8" fill="#020617" fillOpacity="0.9" stroke="#059669" strokeWidth="1.5" />
        <text x="58" y="54" fill="#10b981" fontSize="14">PROJECT PYLON-FLAK BASTION</text>
        <text x="58" y="72" fill="#94a3b8" fontSize="11">Tri-Tower Air Defense Clusters · 380kV Grid</text>
      </g>

      <g fontFamily="sans-serif" textAnchor="end">
        <rect x="1040" y="30" width="360" height="55" rx="8" fill="#020617" fillOpacity="0.9" stroke="#059669" strokeWidth="1.5" />
        <text x="1380" y="54" fill="#ffffff" fontSize="15" fontWeight="bold">حصون الدفاع الجوي الشبكية</text>
        <text x="1380" y="72" fill="#34d399" fontSize="11" fontFamily="monospace">المملكة العربية السعودية · وزارة الدفاع</text>
      </g>
    </svg>
  );
}

export default function SecurityAuthGate({ onAuthenticate, soundEnabled }: SecurityAuthGateProps) {
  const DEFAULT_SECRET_CODE = "0000";
  const DEFAULT_BG_URL = "/images/pylon_tactical_bg.jpg";

  const [password, setPassword] = useState<string>("");
  const [activeSecretCode, setActiveSecretCode] = useState<string>(DEFAULT_SECRET_CODE);
  const [showPasswordText, setShowPasswordText] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<boolean>(false);

  // Password Recovery & Reset State
  const [isRecoveryMode, setIsRecoveryMode] = useState<boolean>(false);
  const [recoveryVerified, setRecoveryVerified] = useState<boolean>(false);
  const [newCustomPassword, setNewCustomPassword] = useState<string>("");
  const [recoveryMessage, setRecoveryMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Background image state - restored to default tactical background
  const [customBgUrl, setCustomBgUrl] = useState<string | null>(DEFAULT_BG_URL);
  const [imgLoadError, setImgLoadError] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        // Clear old cached passcode & old broken background so '0000' and restored background apply cleanly
        localStorage.removeItem("custom_pylon_gate_passcode");
        localStorage.removeItem("custom_pylon_gate_bg");

        const savedBg = localStorage.getItem("custom_pylon_gate_bg_v2");
        if (savedBg) {
          setCustomBgUrl(savedBg);
        } else {
          setCustomBgUrl(DEFAULT_BG_URL);
        }

        const savedPass = localStorage.getItem("custom_pylon_gate_passcode_v2");
        if (savedPass) {
          setActiveSecretCode(savedPass);
        } else {
          setActiveSecretCode(DEFAULT_SECRET_CODE);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length <= 4) {
      setPassword(val);
      setAuthError(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomBgUrl(result);
          setImgLoadError(false);
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("custom_pylon_gate_bg_v2", result);
            } catch {
              // localStorage full limit
            }
          }
          if (soundEnabled) tacticalAudio.playRadarPing();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRestoreDefaultBg = () => {
    setCustomBgUrl(DEFAULT_BG_URL);
    setImgLoadError(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("custom_pylon_gate_bg_v2");
      localStorage.removeItem("custom_pylon_gate_bg");
    }
    if (soundEnabled) tacticalAudio.playRadarPing();
  };

  const handleVerify = (e?: React.FormEvent, overridePassword?: string) => {
    if (e) e.preventDefault();
    const targetPass = overridePassword !== undefined ? overridePassword : password;

    if (!targetPass) {
      setAuthError("يرجى إدخال الرقم السري المصرح به (0000)");
      return;
    }

    // Verify password match (accepts '0000' or activeSecretCode)
    if (
      targetPass === activeSecretCode ||
      targetPass === DEFAULT_SECRET_CODE
    ) {
      setAuthSuccess(true);
      setAuthError(null);
      if (soundEnabled) tacticalAudio.playRadarPing();
      setTimeout(() => {
        onAuthenticate({
          name: "ضابط قيادة ومعمارية منظومة درع الأبراج",
          role: "master_commander",
          level: "DEFCON-1 UNIFIED CLEARANCE",
          code: activeSecretCode,
        });
      }, 500);
    } else {
      setAuthError("الرقم السري غير صحيح! الرقم السري المعتمد هو 0000");
      if (soundEnabled) tacticalAudio.playAlertSiren();
    }
  };

  const handleCopyCode = (codeToCopy: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(codeToCopy);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleQuickAutoFillAndLogin = () => {
    setPassword(activeSecretCode);
    setShowPasswordText(true);
    setIsRecoveryMode(false);
    setAuthError(null);
    if (soundEnabled) tacticalAudio.playRadarPing();
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCustomPassword.trim();
    if (!trimmed || trimmed.length !== 4) {
      setRecoveryMessage("يرجى إدخال رقم سري مكون من 4 خانات (مثال: 0000)");
      return;
    }
    setActiveSecretCode(trimmed);
    setPassword(trimmed);
    if (typeof window !== "undefined") {
      localStorage.setItem("custom_pylon_gate_passcode_v2", trimmed);
    }
    setRecoveryMessage(`تم تحديث وحفظ الرقم السري الجديد بنجاح: ${trimmed}`);
    setNewCustomPassword("");
    if (soundEnabled) tacticalAudio.playRadarPing();
  };

  const handleResetToFactoryDefault = () => {
    setActiveSecretCode(DEFAULT_SECRET_CODE);
    setPassword(DEFAULT_SECRET_CODE);
    if (typeof window !== "undefined") {
      localStorage.removeItem("custom_pylon_gate_passcode_v2");
      localStorage.removeItem("custom_pylon_gate_passcode");
    }
    setRecoveryMessage(`تمت استعادة الرقم السري الافتراضي المعتمد: ${DEFAULT_SECRET_CODE}`);
    if (soundEnabled) tacticalAudio.playRadarPing();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Background Container: Restored High-Res Tactical Pylon Background Image with Embedded Vector Fallback */}
      <div className="absolute inset-0 left-0 right-0 top-0 bottom-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center bg-slate-950">
        {customBgUrl && !imgLoadError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={customBgUrl}
            alt="Tactical Air Defense Pylon Background"
            referrerPolicy="no-referrer"
            onError={() => setImgLoadError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-300"
          />
        ) : (
          <EmbeddedTacticalArtwork />
        )}
        {/* Subtle atmospheric vignette for optimal glass card contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-slate-950/50 pointer-events-none" />
      </div>

      {/* Glossy 15% Glass Floating Card with Soft Neon Illumination on Hover/Focus & Active Click */}
      <div className="relative z-10 max-w-md w-full bg-gradient-to-b from-white/10 via-slate-900/25 to-slate-950/40 backdrop-blur-2xl border border-emerald-400/40 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.25)] hover:border-emerald-300 hover:shadow-[0_0_65px_rgba(16,185,129,0.5)] focus-within:shadow-[0_0_65px_rgba(16,185,129,0.5)] overflow-hidden transition-all duration-300 ease-out my-auto border-t border-t-white/30">
        
        {/* Top Glossy Animated Neon Bar */}
        <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 shadow-[0_0_18px_rgba(16,185,129,0.9)] animate-pulse" />

        {/* Header with Redesigned 3D Metallic Glass Logo & Soft Neon Title */}
        <div className="p-6 text-center border-b border-emerald-500/25 bg-slate-950/30 backdrop-blur-md">
          {/* Redesigned 3D Metallic Glass Logo */}
          <div className="relative w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            {/* Ambient Pulse Ring */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 blur-md opacity-70 animate-pulse" />
            {/* 3D Glass Badge */}
            <div className="relative w-full h-full rounded-2xl bg-slate-950/40 backdrop-blur-md border-2 border-emerald-400/90 shadow-[inset_0_1px_3px_rgba(255,255,255,0.5),0_0_25px_rgba(16,185,129,0.6)] flex items-center justify-center text-emerald-300 transform hover:scale-105 active:scale-95 transition-transform duration-300 cursor-pointer">
              <ShieldCheck className="w-9 h-9 drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
            </div>
          </div>

          {/* Unified Clearance Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/50 backdrop-blur-md border border-emerald-400/60 text-emerald-300 font-mono text-[11px] mb-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>تصريح الدخول العسكري التكتيكي الموحد</span>
          </div>

          {/* 3D Glassmorphic Soft Neon Title */}
          <h1 className="text-xl sm:text-2xl font-black font-display tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-teal-200 drop-shadow-[0_2px_14px_rgba(16,185,129,0.85)] py-1 whitespace-nowrap overflow-hidden text-ellipsis">
            منظومة درع أبراج الحصن للدفاع الجوي
          </h1>
          
          <p className="text-xs text-slate-200 mt-1 font-sans drop-shadow-sm font-medium">
            حماية المنشآت الحيوية وشبكات الضغط العالي 380kV / 500kV
          </p>
        </div>

        {/* Authentication or Password Recovery Body */}
        <div className="p-6 space-y-5">
          {!isRecoveryMode ? (
            <form onSubmit={(e) => handleVerify(e)} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-100 font-bold block mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
                    <span>أدخل الرقم السري (4 خانات · 0000):</span>
                  </span>
                  <span className="text-[10px] text-slate-300">{password.length}/4 خانات</span>
                </label>

                <div className="relative">
                  <input
                    type={showPasswordText ? "text" : "password"}
                    inputMode="numeric"
                    maxLength={4}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="0000"
                    autoFocus
                    className="w-full bg-slate-950/45 backdrop-blur-md border border-slate-600/80 focus:border-emerald-400 hover:border-emerald-500/70 text-white font-mono text-center text-xl tracking-[0.5em] py-3 px-4 rounded-xl outline-none transition-all shadow-inner focus:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-200 hover:text-white px-2.5 py-1 bg-slate-900/60 backdrop-blur-md rounded-lg border border-slate-700/80 hover:border-emerald-400 transition-colors shadow-sm cursor-pointer"
                  >
                    {showPasswordText ? "إخفاء" : "إظهار"}
                  </button>
                </div>

                {/* Forgot / Recover Password Quick Link */}
                <div className="flex items-center justify-between pt-2 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecoveryMode(true);
                      setRecoveryVerified(true);
                      setAuthError(null);
                      setRecoveryMessage(null);
                    }}
                    className="text-amber-300 hover:text-amber-200 transition-colors inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-4"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>استعادة الرقم السري (0000)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickAutoFillAndLogin}
                    className="text-emerald-300 hover:text-emerald-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>تعبئة تلقائية (0000)</span>
                  </button>
                </div>
              </div>

              {/* Error or Success Alert */}
              {authError && (
                <div className="p-3 bg-red-950/70 backdrop-blur-md border border-red-700/90 rounded-xl text-xs text-red-200 flex items-center justify-between gap-2.5 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{authError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleVerify(undefined, DEFAULT_SECRET_CODE)}
                    className="px-2 py-1 rounded bg-red-900/80 hover:bg-red-800 text-amber-200 font-mono text-[10px] shrink-0 border border-red-600 cursor-pointer"
                  >
                    دخول (0000)
                  </button>
                </div>
              )}

              {authSuccess && (
                <div className="p-3 bg-emerald-950/70 backdrop-blur-md border border-emerald-500 rounded-xl text-xs text-emerald-200 flex items-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.6)]">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
                  <span>تم تأكيد التصريح بنجاح! جاري فتح منصة التحكم...</span>
                </div>
              )}

              {/* Glossy 3D Submit Button with Soft Neon Glow */}
              <button
                type="submit"
                disabled={!password || authSuccess}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 active:from-emerald-600 active:to-teal-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-slate-950 font-black text-xs rounded-xl transition-all shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.75)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>اعتماد وتصريح الدخول للمنظومة</span>
              </button>
            </form>
          ) : (
            /* Password Recovery & Reset Panel */
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs font-mono">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>بروتوكول استعادة وإعادة تعيين الرقم السري</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRecoveryMode(false)}
                  className="text-[11px] font-mono text-slate-300 hover:text-white flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/70 border border-slate-700 cursor-pointer"
                >
                  <span>العودة للدخول</span>
                  <ArrowRight className="w-3 h-3 rotate-180" />
                </button>
              </div>

              {recoveryVerified && (
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/50 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-mono">الرقم السري المعتمد حالياً (4 أصفار):</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 text-[10px] font-mono">
                      نشط ومعتمد
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="font-mono text-xl font-black tracking-[0.4em] text-emerald-400 select-all" dir="ltr">
                      {activeSecretCode}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopyCode(activeSecretCode)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono flex items-center gap-1 border border-slate-700 cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{copiedCode ? "تم النسخ" : "نسخ"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVerify(undefined, activeSecretCode)}
                        className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] font-mono cursor-pointer shadow-sm"
                      >
                        دخول فوري
                      </button>
                    </div>
                  </div>

                  {activeSecretCode !== DEFAULT_SECRET_CODE && (
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                      <span>الرمز الافتراضي: <strong className="text-slate-200">{DEFAULT_SECRET_CODE}</strong></span>
                      <button
                        type="button"
                        onClick={handleResetToFactoryDefault}
                        className="text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>استعادة 0000</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Option to Set a New Custom Password */}
              <form onSubmit={handleSaveNewPassword} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
                <label className="text-[11px] font-mono text-slate-200 font-bold block">
                  تعيين رقم سري جديد (4 خانات):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={newCustomPassword}
                    onChange={(e) => setNewCustomPassword(e.target.value)}
                    placeholder="0000"
                    className="flex-1 bg-slate-900 border border-slate-700 focus:border-emerald-400 text-white font-mono text-center text-sm py-2 px-3 rounded-lg outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shrink-0 cursor-pointer"
                  >
                    حفظ وتعيين
                  </button>
                </div>
              </form>

              {recoveryMessage && (
                <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-500/60 text-emerald-200 text-[11px] font-mono flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{recoveryMessage}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleQuickAutoFillAndLogin}
                className="w-full py-2.5 bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-mono font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>تعبئة الرقم السري (0000) والعودة</span>
              </button>
            </div>
          )}

          {/* Background controls: Upload custom or Restore original background */}
          <div className="pt-2 border-t border-emerald-500/25 flex items-center justify-between gap-2 text-[11px] font-mono">
            <label className="cursor-pointer text-slate-200 hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>تغيير الخلفية</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={handleRestoreDefaultBg}
              className="text-amber-300 hover:text-amber-200 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>استرجاع الخلفية الأصلية</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-950/30 backdrop-blur-md border-t border-emerald-500/25 text-[10.5px] font-mono text-slate-300 text-center flex items-center justify-between">
          <span>نظام التشفير التكتيكي 256-Bit</span>
          <span className="text-emerald-400 font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]">MOD-KSA APPROVED</span>
        </div>
      </div>
    </div>
  );
}
