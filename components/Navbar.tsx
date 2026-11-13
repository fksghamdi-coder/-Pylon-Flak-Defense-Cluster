"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Volume2, VolumeX, Lock,
  Home, History, Layers, MapPin, Activity,
  Zap, Compass, Calculator
} from "lucide-react";
import { tacticalAudio } from "@/lib/audio";
import MinistryOfDefenseLogo from "@/components/MinistryOfDefenseLogo";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  alertMode: boolean;
  setAlertMode?: (v: boolean) => void;
  onLockGate?: () => void;
  userClearance?: { name: string; role: string; level: string; code: string } | null;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  alertMode,
  onLockGate,
}: NavbarProps) {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    tacticalAudio.enabled = next;
    if (next) {
      tacticalAudio.playRadarPing();
    }
  };

  const navItems = [
    { id: "home_overview", label: "الرئيسية والتحليل", icon: Home },
    { id: "historical_origin", label: "أصل الفكرة WW2", icon: History },
    { id: "blueprint", label: "المخطط الهيكلي", icon: Layers },
    { id: "tactical_map", label: "الخريطة 3D", icon: MapPin },
    { id: "structural", label: "ممتصات الصدمات", icon: Activity },
    { id: "lightning", label: "مانعات الصواعق", icon: Zap },
    { id: "simulator", label: "محاكي الاشتباك", icon: Compass },
    { id: "calculator", label: "حاسبة الحمولات", icon: Calculator },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          <div className="flex items-center gap-2.5 z-10 shrink-0">
            <span className={`w-3 h-3 rounded-full shrink-0 ${alertMode ? "bg-red-500 animate-ping" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"}`} />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm lg:text-base font-bold tracking-tight text-white font-display">
                مشروع حصون الدفاع الجوي
              </span>
              <span className="text-[10px] text-emerald-400/80 hidden sm:inline">
                PYLON-FLAK DEFENSE BASTION
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center z-10 py-1">
            <div className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 shadow-[0_0_22px_rgba(16,185,129,0.18)] backdrop-blur-md hover:border-emerald-400/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300">
              <MinistryOfDefenseLogo size={44} showText={true} textPosition="side" />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 z-10">
            {onLockGate && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLockGate}
                title="قفل المنظومة"
                className="p-2 rounded-lg border border-slate-800 bg-slate-900 hover:border-red-500/60 text-slate-400 hover:text-red-400 transition-colors text-xs flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden md:inline text-[11px]">قفل الجلسة</span>
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSound}
              title={soundEnabled ? "كتم المؤثرات الصوتية" : "تفعيل المؤثرات التكتيكية"}
              className={`p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                soundEnabled
                  ? "bg-emerald-950/70 border-emerald-500/70 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        <div className="py-2 border-t border-slate-800/80">
          <nav className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 relative">
            {navItems.map((item) => {
              const active = activeTab === item.id;
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (soundEnabled) tacticalAudio.playRadarPing();
                  }}
                  className={`relative w-full text-center px-1.5 py-1.5 text-[10.5px] sm:text-[11px] font-semibold rounded-lg truncate whitespace-nowrap transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    active
                      ? "text-emerald-300 font-bold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                  title={item.label}
                >
                  {active && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-emerald-500/20 border border-emerald-500/80 rounded-lg shadow-[0_0_12px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/40"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-1 truncate">
                    <IconComp className={`w-3 h-3 shrink-0 ${active ? "text-emerald-400" : "text-slate-500"}`} />
                    <span className="truncate">{item.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
