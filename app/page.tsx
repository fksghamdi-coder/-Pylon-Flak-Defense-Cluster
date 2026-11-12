"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import SecurityAuthGate from "@/components/SecurityAuthGate";
import HomeOverviewView from "@/components/HomeOverviewView";
import HistoricalInspirationView from "@/components/HistoricalInspirationView";
import UnifiedBlueprintAndSpecsView from "@/components/UnifiedBlueprintAndSpecsView";
import TacticalVirtualMap from "@/components/TacticalVirtualMap";
import StructuralShockView from "@/components/StructuralShockView";
import LightningDissipationView from "@/components/LightningDissipationView";
import EngagementSimulator from "@/components/EngagementSimulator";
import LoadCalculatorView from "@/components/LoadCalculatorView";
import PrintDossierView from "@/components/PrintDossierView";
import { generateAndDownloadPDF } from "@/lib/pdfGenerator";
import { Download, Printer, FileText } from "lucide-react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userClearance, setUserClearance] = useState<{ name: string; role: string; level: string; code: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("home_overview");
  const [towerThreeChoice, setTowerThreeChoice] = useState<"laser" | "missiles" | "ciws">("laser");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [alertMode, setAlertMode] = useState<boolean>(false);

  // Restore clearance from session after client mount to prevent SSR hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        try {
          const saved = sessionStorage.getItem("mod_ksA_pylon_flak_clearance");
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.name) {
              setUserClearance(parsed);
              setIsAuthenticated(true);
            }
          }
        } catch {
          // ignore
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAuthentication = (clearanceData: { name: string; role: string; level: string; code: string }) => {
    setUserClearance(clearanceData);
    setIsAuthenticated(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("mod_ksA_pylon_flak_clearance", JSON.stringify(clearanceData));
    }
  };

  const handleLockGate = () => {
    setIsAuthenticated(false);
    setUserClearance(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("mod_ksA_pylon_flak_clearance");
    }
  };

  // If not authenticated, show the advanced military Security Auth Gate
  if (!isAuthenticated) {
    return (
      <SecurityAuthGate
        onAuthenticate={handleAuthentication}
        soundEnabled={soundEnabled}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${alertMode ? "border-t-4 border-red-600" : ""}`}>
      {/* Top Bar Navigation with Clearance Badge */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        alertMode={alertMode}
        setAlertMode={setAlertMode}
        onLockGate={handleLockGate}
        userClearance={userClearance}
      />

      {/* Main Content Area with Fluid Motion View Transitions */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-16 sm:pb-20 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {activeTab === "home_overview" && (
              <HomeOverviewView onNavigateTab={(tab) => setActiveTab(tab)} />
            )}

            {activeTab === "historical_origin" && (
              <HistoricalInspirationView onNavigateTab={(tab) => setActiveTab(tab)} />
            )}

            {(activeTab === "blueprint" || activeTab === "specs" || activeTab === "pylon_engineering") && (
              <UnifiedBlueprintAndSpecsView
                towerThreeChoice={towerThreeChoice}
                setTowerThreeChoice={setTowerThreeChoice}
                onNavigateToSimulator={() => setActiveTab("simulator")}
                soundEnabled={soundEnabled}
              />
            )}

            {activeTab === "tactical_map" && (
              <TacticalVirtualMap />
            )}

            {activeTab === "structural" && (
              <StructuralShockView soundEnabled={soundEnabled} />
            )}

            {activeTab === "lightning" && (
              <LightningDissipationView soundEnabled={soundEnabled} />
            )}

            {activeTab === "simulator" && (
              <EngagementSimulator
                towerThreeChoice={towerThreeChoice}
                soundEnabled={soundEnabled}
              />
            )}

            {activeTab === "calculator" && (
              <LoadCalculatorView
                towerThreeChoice={towerThreeChoice}
                setTowerThreeChoice={setTowerThreeChoice}
              />
            )}

            {activeTab === "print_dossier" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">تصدير المخططات الهندسية</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 print:hidden">
                  <button
                    onClick={() => generateAndDownloadPDF({ towerThreeChoice, optionType: "full_dossier" })}
                    className="p-6 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/60 rounded-xl text-center transition-all cursor-pointer"
                  >
                    <FileText className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                    <span className="text-sm font-semibold text-white">مخطط كامل</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-6 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/60 rounded-xl text-center transition-all cursor-pointer"
                  >
                    <Printer className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                    <span className="text-sm font-semibold text-white">للطباعة</span>
                  </button>
                  <button
                    onClick={() => generateAndDownloadPDF({ towerThreeChoice, optionType: "executive_brief" })}
                    className="p-6 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/60 rounded-xl text-center transition-all cursor-pointer"
                  >
                    <Download className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                    <span className="text-sm font-semibold text-white">تنزيل PDF</span>
                  </button>
                </div>

                <PrintDossierView towerThreeChoice={towerThreeChoice} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed compact bottom bar with subtle neon border */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800/90 bg-slate-950/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.6)] py-1.5 sm:py-2 text-[11px] sm:text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-8 sm:h-9">
          <div className="flex items-center gap-2 text-right whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
            <span className="font-bold text-white shrink-0">منظومة درع الأبراج التكتيكي</span>
            <span aria-hidden="true" className="text-slate-600 shrink-0">·</span>
            <span className="text-slate-300 truncate hidden sm:inline">مبادرات تعزيز الدفاع الجوي وحماية البنى الحيوية</span>
            <span aria-hidden="true" className="text-slate-600 shrink-0 hidden sm:inline">·</span>
            <span className="text-slate-400 shrink-0 hidden md:inline">المملكة العربية السعودية</span>
          </div>

          {/* Proposer Attribution Bar */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-emerald-900/60 shadow-sm shrink-0 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-slate-200 text-[10px] sm:text-xs">
              مقدم المبادرة: فهد خالد الغامدي - الهيئة الملكية - المدينة الاقتصادية - جازان
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
