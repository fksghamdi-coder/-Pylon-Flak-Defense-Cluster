import React from "react";

interface MinistryOfDefenseLogoProps {
  className?: string;
  size?: number; // size in px for the emblem badge
  showText?: boolean;
  textPosition?: "bottom" | "side";
}

export default function MinistryOfDefenseLogo({
  className = "",
  size = 42,
  showText = true,
  textPosition = "side",
}: MinistryOfDefenseLogoProps) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none transition-all duration-300 hover:brightness-110 ${
        textPosition === "bottom" ? "flex-col text-center" : "flex-row"
      } ${className}`}
      title="وزارة الدفاع - المملكة العربية السعودية | Ministry of Defense"
    >
      {/* Official Saudi Ministry of Defense Vector Crest */}
      <div
        className="relative shrink-0 flex items-center justify-center drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Ambient Glow */}
          <circle cx="100" cy="100" r="95" fill="rgba(16, 185, 129, 0.08)" />

          {/* Concentric Radar Grid Rings */}
          <circle cx="100" cy="104" r="70" stroke="#94a3b8" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="3 3" />
          <circle cx="100" cy="104" r="54" stroke="#cbd5e1" strokeWidth="1.2" strokeOpacity="0.5" />
          <circle cx="100" cy="104" r="38" stroke="#94a3b8" strokeWidth="1.2" strokeOpacity="0.6" />
          <circle cx="100" cy="104" r="22" stroke="#64748b" strokeWidth="1" strokeOpacity="0.5" />

          {/* Radar Bearing Crosshairs */}
          <line x1="100" y1="36" x2="100" y2="172" stroke="#cbd5e1" strokeWidth="0.9" strokeOpacity="0.4" />
          <line x1="32" y1="104" x2="168" y2="104" stroke="#cbd5e1" strokeWidth="0.9" strokeOpacity="0.4" />
          <line x1="52" y1="56" x2="148" y2="152" stroke="#94a3b8" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 2" />
          <line x1="148" y1="56" x2="52" y2="152" stroke="#94a3b8" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 2" />

          {/* Defense Elements - Missiles & Cannons (Silver / Metallic Steel) */}
          {/* Central Vertical Missile */}
          <path
            d="M97 42 L100 28 L103 42 L103 82 L97 82 Z"
            fill="url(#missileGrad)"
            stroke="#475569"
            strokeWidth="0.8"
          />
          <path d="M94 72 L97 68 L97 82 L93 84 Z" fill="#64748b" />
          <path d="M106 72 L103 68 L103 82 L107 84 Z" fill="#64748b" />

          {/* Diagonal Defense Missiles / Artillery Barrels */}
          <path d="M68 62 L60 48 L65 46 L76 62 Z" fill="#94a3b8" stroke="#475569" strokeWidth="0.6" />
          <path d="M132 62 L140 48 L135 46 L124 62 Z" fill="#94a3b8" stroke="#475569" strokeWidth="0.6" />

          {/* Diagonal Heavy Cannon Barrels / Tubes */}
          <path d="M72 136 L48 106 L56 100 L80 130 Z" fill="#64748b" stroke="#334155" strokeWidth="0.8" />
          <path d="M128 136 L152 106 L144 100 L120 130 Z" fill="#64748b" stroke="#334155" strokeWidth="0.8" />

          {/* Air Force Wings (Left & Right) */}
          <path
            d="M52 104 C62 98 74 100 84 106 C72 110 60 114 52 104 Z"
            fill="#cbd5e1"
            stroke="#64748b"
            strokeWidth="0.8"
          />
          <path
            d="M148 104 C138 98 126 100 116 106 C128 110 140 114 148 104 Z"
            fill="#cbd5e1"
            stroke="#64748b"
            strokeWidth="0.8"
          />

          {/* Naval Anchor (Bottom) */}
          <path
            d="M98 124 L102 124 L102 144 C108 143 114 140 118 134 L120 137 C115 144 108 148 100 148 C92 148 85 144 80 137 L82 134 C86 140 92 143 98 144 Z"
            fill="#94a3b8"
            stroke="#475569"
            strokeWidth="0.8"
          />
          <circle cx="100" cy="122" r="3.5" stroke="#94a3b8" strokeWidth="1.2" fill="none" />

          {/* Outer Laurel / Palm Leaves Wreath (Green) */}
          {/* Left Palm Fronds */}
          <path
            d="M90 162 C64 158 38 136 34 100 C32 72 48 46 64 34 C60 42 56 52 54 64 C50 82 54 106 68 126 C74 136 82 146 90 152 Z"
            fill="url(#palmLeavesGrad)"
          />
          <path d="M46 54 L36 48 L48 64 Z" fill="#15803d" />
          <path d="M38 72 L26 68 L40 82 Z" fill="#16a34a" />
          <path d="M34 94 L22 92 L36 104 Z" fill="#15803d" />
          <path d="M34 116 L24 118 L38 126 Z" fill="#16a34a" />
          <path d="M40 136 L30 142 L46 144 Z" fill="#15803d" />
          <path d="M52 152 L44 160 L60 158 Z" fill="#16a34a" />

          {/* Right Palm Fronds */}
          <path
            d="M110 162 C136 158 162 136 166 100 C168 72 152 46 136 34 C140 42 144 52 146 64 C150 82 146 106 132 126 C126 136 118 146 110 152 Z"
            fill="url(#palmLeavesGrad)"
          />
          <path d="M154 54 L164 48 L152 64 Z" fill="#15803d" />
          <path d="M162 72 L174 68 L160 82 Z" fill="#16a34a" />
          <path d="M166 94 L178 92 L164 104 Z" fill="#15803d" />
          <path d="M166 116 L176 118 L162 126 Z" fill="#16a34a" />
          <path d="M160 136 L170 142 L154 144 Z" fill="#15803d" />
          <path d="M148 152 L156 160 L140 158 Z" fill="#16a34a" />

          {/* Central Medallion (White Circle with Green Border) */}
          <circle cx="100" cy="104" r="21" fill="#f8fafc" stroke="#16a34a" strokeWidth="2.5" />

          {/* Saudi Emblem: Green Palm Tree and Crossed Swords */}
          {/* Palm Trunk & Fronds */}
          <path
            d="M99 98 L101 98 L101.5 106 L98.5 106 Z"
            fill="#15803d"
          />
          {/* Palm Top Leaves */}
          <path
            d="M100 91 C97 91 93 93 92 96 C95 96 98 95 100 93 C102 95 105 96 108 96 C107 93 103 91 100 91 Z"
            fill="#16a34a"
          />
          <path
            d="M100 93 C96 94 91 98 90 102 C93 101 97 99 99 96 Z"
            fill="#15803d"
          />
          <path
            d="M100 93 C104 94 109 98 110 102 C107 101 103 99 101 96 Z"
            fill="#15803d"
          />

          {/* Crossed Scimitar Swords */}
          {/* Sword 1: Top-Left to Bottom-Right */}
          <path
            d="M92 108 Q98 111 108 116"
            stroke="#15803d"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M91 107 L90 110" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />
          {/* Sword 2: Top-Right to Bottom-Left */}
          <path
            d="M108 108 Q102 111 92 116"
            stroke="#15803d"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M109 107 L110 110" stroke="#15803d" strokeWidth="1.5" strokeLinecap="round" />

          {/* Red Ribbon Bow at Bottom of Wreath */}
          <path
            d="M92 158 C96 156 100 156 104 158 C106 161 104 165 100 166 C96 165 94 161 92 158 Z"
            fill="#dc2626"
            stroke="#b91c1c"
            strokeWidth="0.8"
          />
          {/* Ribbon Tails */}
          <path d="M96 163 L91 176 L96 172 L100 165 Z" fill="#b91c1c" />
          <path d="M104 163 L109 176 L104 172 L100 165 Z" fill="#dc2626" />

          {/* Royal Crown on Top (Gold / Golden Hue) */}
          {/* Crown Base Band */}
          <path
            d="M86 28 C95 26 105 26 114 28 L113 31 C105 29 95 29 87 31 Z"
            fill="#eab308"
            stroke="#ca8a04"
            strokeWidth="0.8"
          />
          {/* Crown Jewels on Base */}
          <circle cx="92" cy="29" r="1" fill="#ffffff" />
          <circle cx="100" cy="28.5" r="1.2" fill="#22c55e" />
          <circle cx="108" cy="29" r="1" fill="#ffffff" />
          {/* Crown Arches & Spikes */}
          <path
            d="M87 28 C85 20 90 17 93 21 C96 15 104 15 107 21 C110 17 115 20 113 28 Z"
            fill="url(#crownGrad)"
            stroke="#ca8a04"
            strokeWidth="0.8"
          />
          {/* Crown Top Cross / Finial Plume */}
          <path d="M100 14 L100 18" stroke="#ca8a04" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="100" cy="13" r="1.5" fill="#facc15" />

          {/* Gradients */}
          <defs>
            <linearGradient id="crownGrad" x1="86" y1="15" x2="114" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
            <linearGradient id="palmLeavesGrad" x1="40" y1="40" x2="160" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="50%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
            <linearGradient id="missileGrad" x1="97" y1="28" x2="103" y2="82" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Official Typography */}
      {showText && (
        <div className="flex flex-col text-right leading-tight">
          <span className="text-xs sm:text-sm font-black tracking-wide text-white font-serif drop-shadow-sm flex items-center gap-1.5">
            <span>وزارة الدفاع</span>
            <span className="hidden xl:inline text-[10px] font-sans font-medium text-emerald-400/90 border border-emerald-500/30 px-1.5 py-0.2 rounded bg-emerald-950/40">
              المملكة العربية السعودية
            </span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-300/90 font-mono uppercase">
            MINISTRY OF DEFENSE
          </span>
        </div>
      )}
    </div>
  );
}
