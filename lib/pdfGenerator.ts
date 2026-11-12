import { jsPDF } from "jspdf";

export interface PDFExportOptions {
  towerThreeChoice: "laser" | "missiles" | "ciws";
  optionType: "full_dossier" | "structural_cad" | "bill_of_materials" | "executive_brief";
  paperSize?: "a4_portrait" | "a4_landscape" | "a3_blueprint";
  include3DViews?: boolean;
}

// Helper: Draw standard official header band
function drawOfficialHeader(doc: jsPDF, pageWidth: number, title: string, subtitle: string, pageNum: number, totalPages: number) {
  // Slate dark header banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 26, "F");

  // Emerald accent stripe
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.rect(0, 26, pageWidth, 2, "F");

  // Header Typography
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("KINGDOM OF SAUDI ARABIA - MINISTRY OF DEFENSE", pageWidth / 2, 10, { align: "center" });

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text(title, pageWidth / 2, 16.5, { align: "center" });

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(subtitle, pageWidth / 2, 22, { align: "center" });

  // Page numbering in header top right
  doc.setFontSize(7.5);
  doc.setTextColor(203, 213, 225);
  doc.text(`PAGE ${pageNum} OF ${totalPages}`, pageWidth - 14, 10, { align: "right" });
}

// Helper: Draw standard footer
function drawOfficialFooter(doc: jsPDF, pageWidth: number, pageHeight: number, pageNum: number, totalPages: number) {
  const footerY = pageHeight - 10;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(14, footerY, pageWidth - 14, footerY);

  doc.setFontSize(6.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("KINGDOM OF SAUDI ARABIA | HIGH COMMISSION FOR INDUSTRIAL SECURITY (HCIS) & SBC 301 COMPLIANT", 14, footerY + 4.5);
  doc.text(`CONFIDENTIAL ENGINEERING STUDY | PAGE ${pageNum} OF ${totalPages}`, pageWidth - 14, footerY + 4.5, { align: "right" });
}

// Helper: Draw vector CAD technical drawing of the Pylon Bastion Elevation
function drawVectorCADBlueprint(doc: jsPDF, x: number, y: number, w: number, h: number) {
  doc.saveGraphicsState();

  // Blueprint background (subtle blueprint grid)
  doc.setFillColor(241, 245, 249); // light slate background
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.rect(x, y, w, h, "FD");

  // Grid lines
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  for (let gx = x + 10; gx < x + w; gx += 10) {
    doc.line(gx, y, gx, y + h);
  }
  for (let gy = y + 8; gy < y + h; gy += 8) {
    doc.line(x, gy, x + w, gy);
  }

  const cx = x + w / 2;
  const groundY = y + h - 18;
  const apexY = y + 14;

  // 1. Bedrock & Micro-Piles (underground)
  doc.setDrawColor(100, 116, 139);
  doc.setLineWidth(0.8);
  doc.line(x + 10, groundY, x + w - 10, groundY); // Ground line

  doc.setFontSize(5.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 116, 139);
  doc.text("GROUND LEVEL: EL +0.00 m (Bedrock Foundation)", x + 12, groundY - 2);

  // Micro-piles (4 piles into rock)
  doc.setFillColor(148, 163, 184);
  doc.setDrawColor(71, 85, 105);
  const pileOffsets = [-24, -10, 10, 24];
  pileOffsets.forEach((pOff) => {
    doc.rect(cx + pOff - 1.5, groundY, 3, 14, "FD");
  });
  doc.text("Deep Micro-Piles (-18.0m Rock Pockets)", cx + 28, groundY + 8);

  // 2. Central Steel Hollow Mast (Dia 450mm)
  doc.setFillColor(16, 185, 129, 0.2);
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.6);
  doc.rect(cx - 3, apexY, 6, groundY - apexY, "FD");

  // 3. Steel Lattice Pylon Legs & Bracing
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);

  // Outer legs
  doc.line(cx - 24, groundY, cx - 7, apexY + 12);
  doc.line(cx + 24, groundY, cx + 7, apexY + 12);

  // Cross bracing
  const levels = 5;
  for (let i = 0; i < levels; i++) {
    const t1 = i / levels;
    const t2 = (i + 1) / levels;
    const y1 = groundY - t1 * (groundY - (apexY + 12));
    const y2 = groundY - t2 * (groundY - (apexY + 12));
    const x1L = cx - (24 - t1 * 17);
    const x1R = cx + (24 - t1 * 17);
    const x2L = cx - (24 - t2 * 17);
    const x2R = cx + (24 - t2 * 17);

    doc.line(x1L, y1, x1R, y1); // horizontal bar
    doc.line(x1L, y1, x2R, y2); // X cross
    doc.line(x1R, y1, x2L, y2); // X cross
  }

  // 4. High-Voltage Cross-Arms & Conductors (380kV)
  const armY = apexY + 24;
  doc.setDrawColor(217, 119, 6); // amber-600
  doc.setLineWidth(0.8);
  doc.line(cx - 36, armY, cx + 36, armY); // 380kV cross-arm

  // Ceramic Isolators & Catenary Cables
  doc.setDrawColor(180, 83, 9);
  doc.line(cx - 32, armY, cx - 32, armY + 6);
  doc.line(cx + 32, armY, cx + 32, armY + 6);
  doc.circle(cx - 32, armY + 6.5, 1.2, "S");
  doc.circle(cx + 32, armY + 6.5, 1.2, "S");

  doc.setFontSize(5.5);
  doc.setTextColor(180, 83, 9);
  doc.text("380kV Conductors (8.5m Clearance Zone)", cx - 36, armY - 2);

  // 5. Top Combat Platform & Hardox Shielding (Apex)
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.8);
  doc.rect(cx - 15, apexY, 30, 4.5, "FD"); // 4.2m x 4.2m Platform

  // Deflection shields
  doc.line(cx - 15, apexY, cx - 18, apexY - 4);
  doc.line(cx + 15, apexY, cx + 18, apexY - 4);

  // 6. Apex Payload (Radar Dome & Gun Mounts)
  doc.setFillColor(16, 185, 129);
  doc.circle(cx, apexY - 3, 3.5, "FD"); // Radar Sphere
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.6);
  doc.line(cx, apexY - 6.5, cx, apexY - 11); // Lightning Mast / ESE Rod

  // Callout tags
  doc.setFontSize(5.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(6, 95, 70);
  doc.text("COMBAT APEX: EL +110.00 m", cx + 20, apexY - 2);
  doc.text("4D AESA Radar & Twin 35mm CIWS", cx + 20, apexY + 2.5);

  // Elevation Dimension Arrow (Left side)
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.3);
  doc.line(x + 6, apexY, x + 6, groundY);
  doc.line(x + 4, apexY, x + 8, apexY);
  doc.line(x + 4, groundY, x + 8, groundY);

  doc.setFontSize(6);
  doc.setTextColor(15, 23, 42);
  doc.text("H = 110.0 m", x + 1, (apexY + groundY) / 2, { angle: 90 });

  doc.restoreGraphicsState();
}

// Helper: Draw dedicated CAD Zoom Detail of Central Mast & Deep Foundation
function drawCentralMastFoundationDetail(doc: jsPDF, x: number, y: number, w: number, h: number) {
  doc.saveGraphicsState();

  // Background
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.rect(x, y, w, h, "FD");

  // Title in diagram
  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("DETAIL: CENTRAL MAST & DEEP BEDROCK FOUNDATION (CUTAWAY)", x + 3, y + 4.5);

  const cx = x + w / 2;
  const groundY = y + 20;

  // Ground stratum lines (Granite bedrock vs top soil)
  doc.setFillColor(226, 232, 240);
  doc.rect(x + 2, groundY, w - 4, h - 22, "F");
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.6);
  doc.line(x + 2, groundY, x + w - 2, groundY);

  doc.setFontSize(5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("GROUND LEVEL 0.00 m (Bedrock)", x + 4, groundY - 1.5);
  doc.text("IGNEOUS GRANITE BEDROCK FORMATION", x + 4, groundY + 5);

  // 1. Concrete Pile Caps & Socketing (C40 Concrete)
  doc.setFillColor(203, 213, 225);
  doc.setDrawColor(71, 85, 105);
  doc.setLineWidth(0.5);
  doc.rect(cx - 22, groundY - 4, 44, 7, "FD"); // Pile cap
  doc.text("Reinforced Concrete Cap (Dia 600mm Piles)", cx - 21, groundY - 5.5);

  // 4 Micro-piles deep into bedrock (-18.0m)
  const piles = [-18, -6, 6, 18];
  piles.forEach((px) => {
    doc.setFillColor(148, 163, 184);
    doc.rect(cx + px - 2, groundY + 3, 4, h - 26, "FD");
    // Rebar hatching
    doc.setDrawColor(100, 116, 139);
    doc.line(cx + px, groundY + 3, cx + px, groundY + h - 23);
  });

  // 2. Central Steel Mast (Dia 450mm, 28mm wall)
  doc.setFillColor(16, 185, 129, 0.15);
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.8);
  doc.rect(cx - 4.5, y + 6, 9, groundY - y - 10, "FD");

  // Mast internal nitrogen recoil conduit & OPGW fiber
  doc.setDrawColor(6, 95, 70);
  doc.setLineWidth(0.3);
  doc.line(cx, y + 6, cx, groundY - 4);

  // Titanium Ti-6Al-4V Base Flange & Anchor Bolts
  doc.setFillColor(15, 23, 42);
  doc.rect(cx - 8, groundY - 4, 16, 2.5, "F");

  // Callouts & Dimensions
  doc.setFontSize(5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(6, 95, 70);
  doc.text("• Hollow Mast: Dia 450 mm x 28 mm", cx + 6, y + 10);
  doc.text("• S355 / Ti-6Al-4V High-Yield Alloy", cx + 6, y + 14);

  doc.setTextColor(15, 23, 42);
  doc.text("• Quad Micro-Piles: -18,000 mm Depth", cx + 22, groundY + 12);
  doc.text("• C40 Sulfate-Resistant Concrete", cx + 22, groundY + 16);
  doc.text("• 88% Recoil Dissipation Path", cx + 22, groundY + 20);

  doc.restoreGraphicsState();
}

// MAIN EXPORT FUNCTION
export function generateAndDownloadPDF(options: PDFExportOptions): boolean {
  try {
    const isLandscape = options.paperSize === "a4_landscape" || options.paperSize === "a3_blueprint";
    const format = options.paperSize === "a3_blueprint" ? "a3" : "a4";

    const doc = new jsPDF({
      orientation: isLandscape ? "landscape" : "portrait",
      unit: "mm",
      format: format,
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;

    const tower3Label =
      options.towerThreeChoice === "laser"
        ? "100kW HEL Fiber Laser"
        : options.towerThreeChoice === "missiles"
        ? "12-Cell VLS SAM Pods"
        : "Twin 35mm Dual Guns";

    const tower3Weight =
      options.towerThreeChoice === "laser" ? 6.2 : options.towerThreeChoice === "missiles" ? 7.8 : 8.1;

    const totalDeadLoad = (4.5 + 8.1 + tower3Weight + 14.8).toFixed(1);

    // ROUTE BASED ON OPTION TYPE
    if (options.optionType === "full_dossier") {
      // ==========================================
      // PAGE 1: BLUEPRINT SCHEMA & GEOMETRIC SPECS
      // ==========================================
      drawOfficialHeader(
        doc,
        pageWidth,
        "PROJECT PYLON-FLAK BASTION | 380kV / 500kV AIR DEFENSE CLUSTER",
        "SECTION 1: ARCHITECTURAL BLUEPRINT & GEOMETRIC SPECIFICATIONS",
        1,
        3
      );

      let currentY = 32;

      // Metadata Banner Box
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, currentY, pageWidth - margin * 2, 13, 1.5, 1.5, "FD");

      doc.setFontSize(7.5);
      doc.setTextColor(30, 41, 59);
      doc.setFont("helvetica", "bold");
      doc.text("DOCUMENT REF: KSA-MOD-PYLON-FLAK-2026-REV3", margin + 4, currentY + 5);
      doc.text(`DATE OF ISSUE: ${new Date().toLocaleDateString("en-GB")}`, margin + 4, currentY + 9.5);

      doc.text("SECURITY CLASSIFICATION: CONFIDENTIAL ENGINEERING STUDY", pageWidth - margin - 4, currentY + 5, { align: "right" });
      doc.text("INITIATIVE PROPOSER: FAHAD KHALID AL-GHAMDI - ROYAL COMMISSION", pageWidth - margin - 4, currentY + 9.5, { align: "right" });

      currentY += 16;

      // Dual Schematics Grid: Left Elevation (1:500) + Right Mast/Foundations Detail
      const cadHalfW = (pageWidth - margin * 2 - 4) / 2;
      const cadH = 68;

      drawVectorCADBlueprint(doc, margin, currentY, cadHalfW, cadH);
      drawCentralMastFoundationDetail(doc, margin + cadHalfW + 4, currentY, cadHalfW, cadH);

      currentY += cadH + 6;

      // Section Title: Geometric & Sizing Specifications
      doc.setFillColor(16, 185, 129);
      doc.rect(margin, currentY, 3, 6, "F");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("2. GEOMETRIC DIMENSIONS, MAST SPECS & FOUNDATION SIZING", margin + 5, currentY + 4.8);

      currentY += 8;

      // Box 1: Top Combat Platform
      const colWidth = (pageWidth - margin * 2) / 2 - 2;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, currentY, colWidth, 48, 1.5, 1.5, "FD");

      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Top Combat Platform (Pylon Apex EL +110.0m)", margin + 3.5, currentY + 6);

      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text("• Platform Footprint: 4,200 mm x 4,200 mm (Square Heavy Base)", margin + 3.5, currentY + 12);
      doc.text("• Armor Plating: 18 mm Hardox 500 Quenched Steel (Yield 1,500 MPa)", margin + 3.5, currentY + 17.5);
      doc.text("• Radar Deflection Shields: 1,400 mm @ 12-deg slope for RCS Reduction", margin + 3.5, currentY + 23);
      doc.text("• High-Voltage Clearance: 8,500 mm Dielectric Zone above 380kV lines", margin + 3.5, currentY + 28.5);
      doc.text("• Damping Mounts: 4-Axis Magnetorheological Fluid Pistons", margin + 3.5, currentY + 34);
      doc.text("• Ultimate Safety Factor: 2.45 (Severe Firing Shock & 180 km/h Wind)", margin + 3.5, currentY + 39.5);
      doc.text("• Structural Live Payload Capacity: 14.50 Metric Tons continuous load", margin + 3.5, currentY + 45);

      // Box 2: Central Mast & Deep Foundations (COMPLETE DATA)
      const box2X = margin + colWidth + 4;
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.roundedRect(box2X, currentY, colWidth, 48, 1.5, 1.5, "FD");

      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Central Mast & Deep Foundations (Complete System)", box2X + 3.5, currentY + 6);

      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text("• Internal Hollow Mast: Dia 450 mm (Heavy Tubular Alloy S355 / Ti-6Al-4V)", box2X + 3.5, currentY + 12);
      doc.text("• Mast Wall Thickness: 28 mm High-Yield Alloy (Yield Strength > 550 MPa)", box2X + 3.5, currentY + 17.5);
      doc.text("• Bedrock Micro-Piles Depth: 18,000 mm (18.0 Meters Socketed in Rock)", box2X + 3.5, currentY + 23);
      doc.text("• Concrete Micro-Piles: Quad Dia 600 mm Sulfate-Resistant C40 Concrete", box2X + 3.5, currentY + 28.5);
      doc.text("• Base Mounting Flange: Titanium Ti-6Al-4V Collar with 12x M36 Anchor Bolts", box2X + 3.5, currentY + 34);
      doc.text("• Recoil Load Conduit: Internal nitrogen-hydraulic conduits routing 88% thrust", box2X + 3.5, currentY + 39.5);
      doc.text("• Soil-Structure Interaction: Overturning Bending Moment 410 kN.m rated", box2X + 3.5, currentY + 45);

      drawOfficialFooter(doc, pageWidth, pageHeight, 1, 3);

      // ==========================================
      // PAGE 2: MASS BUDGET, WEIGHTS & DYNAMICS
      // ==========================================
      doc.addPage();
      drawOfficialHeader(
        doc,
        pageWidth,
        "PROJECT PYLON-FLAK BASTION | MASS BUDGET & STRUCTURAL DYNAMICS",
        "SECTION 2: MASS DISTRIBUTION, FIRING RECOIL & WIND STABILITY",
        2,
        3
      );

      currentY = 34;

      // Section Title: Mass Budget Table
      doc.setFillColor(16, 185, 129);
      doc.rect(margin, currentY, 3, 6, "F");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("3. STRUCTURAL MASS BUDGET & WEIGHT DISTRIBUTION TABLE", margin + 5, currentY + 4.8);

      currentY += 9;

      // Table Header
      const tableW = pageWidth - margin * 2;
      const c1 = 70;
      const c2 = 32;
      const c3 = 45;
      const c4 = tableW - c1 - c2 - c3;

      doc.setFillColor(15, 23, 42);
      doc.rect(margin, currentY, tableW, 7, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.text("EQUIPMENT / COMPONENT", margin + 3, currentY + 4.8);
      doc.text("MASS (METRIC TON)", margin + c1 + 2, currentY + 4.8);
      doc.text("MOUNTING LOCATION", margin + c1 + c2 + 2, currentY + 4.8);
      doc.text("DYNAMIC DAMPING BEHAVIOR", margin + c1 + c2 + c3 + 2, currentY + 4.8);

      currentY += 7;

      const rowsPage2 = [
        ["Tower 1: 4D AESA Radar + Dual EO/IR Mast Pod", "4.50 Tons", "110m Pylon Apex", "Balanced Gyroscopic Damping Ring"],
        ["Tower 2: Twin 35mm CIWS Gun + 1,200 Rounds", "8.10 Tons", "Apex Shock Platform", "88% Hydraulic Absorption into Central Mast"],
        [`Tower 3: ${tower3Label}`, `${tower3Weight.toFixed(2)} Tons`, "Apex Modular Cradle", "Symmetric Center of Gravity Placement"],
        ["Steel Platforms, Isolators & Hydraulic Pistons", "14.80 Tons", "Apex to Bedrock Base", "Lowers Total CG Height by 35%"],
        ["Central Mast (Dia 450mm) & Foundation Flanges", "6.20 Tons", "Internal Core -18m to +110m", "Direct Ground Vector Dissipation"],
      ];

      rowsPage2.forEach((r, idx) => {
        doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
        doc.rect(margin, currentY, tableW, 6.5, "F");
        doc.setDrawColor(226, 232, 240);
        doc.rect(margin, currentY, tableW, 6.5, "S");

        doc.setTextColor(15, 23, 42);
        doc.setFontSize(7.2);
        doc.setFont("helvetica", "bold");
        doc.text(r[0], margin + 3, currentY + 4.5);

        doc.setTextColor(6, 95, 70);
        doc.text(r[1], margin + c1 + 2, currentY + 4.5);

        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
        doc.text(r[2], margin + c1 + c2 + 2, currentY + 4.5);
        doc.text(r[3], margin + c1 + c2 + c3 + 2, currentY + 4.5);

        currentY += 6.5;
      });

      // Total Static Row
      doc.setFillColor(236, 253, 245);
      doc.rect(margin, currentY, tableW, 7.5, "F");
      doc.setDrawColor(52, 211, 153);
      doc.setLineWidth(0.4);
      doc.rect(margin, currentY, tableW, 7.5, "S");

      doc.setTextColor(6, 95, 70);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.8);
      doc.text("TOTAL STATIC DEAD LOAD (ALL TOWERS + FOUNDATIONS):", margin + 3, currentY + 5);
      doc.text(`${(parseFloat(totalDeadLoad) + 6.2).toFixed(1)} METRIC TONS`, margin + c1 + 2, currentY + 5);
      doc.text("FULLY COMPLIANT WITH SBC 301 & HCIS LIMITS (SAFETY FACTOR 2.45)", margin + c1 + c2 + 2, currentY + 5);

      currentY += 14;

      // Section Title: Firing Recoil Stabilization
      doc.setFillColor(16, 185, 129);
      doc.rect(margin, currentY, 3, 6, "F");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("4. FIRING RECOIL STABILIZATION & FORCE DISSIPATION", margin + 5, currentY + 4.8);

      currentY += 8;

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, currentY, tableW, 36, 1.5, 1.5, "FD");

      doc.setFontSize(7.5);
      doc.setTextColor(30, 41, 59);
      doc.setFont("helvetica", "normal");
      doc.text("• Instantaneous Firing Recoil: 320 kN peak thrust generated during twin 35mm burst (1,600 rds/min).", margin + 4, currentY + 6.5);
      doc.text("• 88% Dynamic Hydraulic Reduction: Thrust reduced from 320 kN to 38.4 kN via 4-axis nitrogen-hydraulic pistons.", margin + 4, currentY + 13);
      doc.text("• Direct Ground Energy Dissipation: Residual force routed through internal 450mm mast directly into -18m bedrock micro-piles.", margin + 4, currentY + 19.5);
      doc.text("• Catenary Wire Zero-Harm Isolation: Transmission conductors remain unaffected by cyclic weapon recoil frequency.", margin + 4, currentY + 26);
      doc.text("• Harmonic Resonance Damping: Tuned mass dampers (TMD) eliminate low-frequency secondary oscillations at 12 Hz.", margin + 4, currentY + 32.5);

      currentY += 42;

      // Section Title: Aerodynamic Wind Resilience
      doc.setFillColor(16, 185, 129);
      doc.rect(margin, currentY, 3, 6, "F");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("5. AERODYNAMIC WIND LOAD & SEVERE GUST RESILIENCE", margin + 5, currentY + 4.8);

      currentY += 8;

      // 4 Metric Tiles Grid
      const tileW = (tableW - 6) / 4;
      const tiles = [
        { label: "MAX WIND VELOCITY", val: "180 km/h", sub: "Category 5 Gust Peak" },
        { label: "BENDING MOMENT", val: "410 kN.m", sub: "Apex Overturning Limit" },
        { label: "MAX APEX SWAY", val: "< 11.0 mm", sub: "High-Precision Aiming" },
        { label: "SAFETY COEFFICIENT", val: "2.45 (Optimal)", sub: "AISC / SBC Structural" },
      ];

      tiles.forEach((t, i) => {
        const tx = margin + i * (tileW + 2);
        doc.setFillColor(241, 245, 249);
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(tx, currentY, tileW, 20, 1.5, 1.5, "FD");

        doc.setFontSize(6.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 116, 139);
        doc.text(t.label, tx + tileW / 2, currentY + 5, { align: "center" });

        doc.setFontSize(9.5);
        doc.setTextColor(6, 95, 70);
        doc.text(t.val, tx + tileW / 2, currentY + 11.5, { align: "center" });

        doc.setFontSize(6);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(t.sub, tx + tileW / 2, currentY + 16.5, { align: "center" });
      });

      drawOfficialFooter(doc, pageWidth, pageHeight, 2, 3);

      // ==========================================
      // PAGE 3: ELECTRICAL, MACHINERY & ENDORSEMENT
      // ==========================================
      doc.addPage();
      drawOfficialHeader(
        doc,
        pageWidth,
        "PROJECT PYLON-FLAK BASTION | ELECTRICAL, MACHINERY & BOM",
        "SECTION 3: LIGHTNING PROTECTION, CONSTRUCTION RIGS & ENDORSEMENT",
        3,
        3
      );

      currentY = 34;

      // Section Title: Lightning Protection & EMP Hardening
      doc.setFillColor(16, 185, 129);
      doc.rect(margin, currentY, 3, 6, "F");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("6. LIGHTNING PROTECTION, EMP HARDENING & EARTHING (< 0.8 Ohm)", margin + 5, currentY + 4.8);

      currentY += 8;

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, currentY, tableW, 36, 1.5, 1.5, "FD");

      doc.setFontSize(7.5);
      doc.setTextColor(30, 41, 59);
      doc.setFont("helvetica", "normal");
      doc.text("• Direct Lightning Stroke Capacity: Withstands 250 kA surges (10/350 us wave) via Early Streamer Emission (CTS/ESE).", margin + 4, currentY + 6.5);
      doc.text("• Deep Chemical Earthing Grid: Radial copper array with earthing resistance < 0.8 Ohm completely isolated from 380kV lines.", margin + 4, currentY + 13);
      doc.text("• Dual MIL-STD-188-125 Faraday Enclosure: Mu-Metal shielding against high electromagnetic field induction from power conductors.", margin + 4, currentY + 19.5);
      doc.text("• Inductive Power Tap-Off & Lithium Titanate Backup: Continuous 380kV induction charging backed by LTO batteries.", margin + 4, currentY + 26);
      doc.text("• High-Speed C4I Linkage: 100 Gbps dielectric OPGW fiber optic interconnect between bastion clusters.", margin + 4, currentY + 32.5);

      currentY += 42;

      // Section Title: Heavy Construction Machinery & Tools
      doc.setFillColor(16, 185, 129);
      doc.rect(margin, currentY, 3, 6, "F");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("7. HEAVY CONSTRUCTION MACHINERY & 3D LASER ALIGNMENT TOOLS", margin + 5, currentY + 4.8);

      currentY += 8;

      const machW = (tableW - 4) / 3;
      const machinery = [
        {
          name: "160-Ton Crawler Cranes",
          desc: "All-terrain telescopic 135m reach for zero-contact platform hoisting above power lines.",
        },
        {
          name: "Hydraulic Bedrock Drill Rigs",
          desc: "High-torque rotary rigs drilling 18m deep x 600mm dia piles into igneous granite bedrock.",
        },
        {
          name: "3D Total Station Laser Systems",
          desc: "Optical laser alignment calibrating combat platforms to sub-millimeter precision (+-0.05 mm).",
        },
      ];

      machinery.forEach((m, i) => {
        const mx = margin + i * (machW + 2);
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(mx, currentY, machW, 26, 1.5, 1.5, "FD");

        doc.setFontSize(7.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(m.name, mx + 3, currentY + 6);

        doc.setFontSize(6.8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(m.desc, mx + 3, currentY + 11.5, { maxWidth: machW - 6 });
      });

      currentY += 32;

      // Section Title: Endorsement & Signature Block
      doc.setFillColor(16, 185, 129);
      doc.rect(margin, currentY, 3, 6, "F");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("8. OFFICIAL ENGINEERING VALIDATION & ENDORSEMENT", margin + 5, currentY + 4.8);

      currentY += 8;

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.4);
      doc.roundedRect(margin, currentY, tableW, 24, 1.5, 1.5, "FD");

      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("INITIATIVE AUTHOR: FAHAD KHALID AL-GHAMDI", margin + 4, currentY + 6.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text("Royal Commission for Jubail and Yanbu | Strategic Infrastructure Defense Initiative", margin + 4, currentY + 12);
      doc.text("Certified compliant with High Commission for Industrial Security (HCIS) Directives and Saudi Building Code (SBC 301).", margin + 4, currentY + 17.5);

      doc.setFontSize(7.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(6, 95, 70);
      doc.text("OFFICIAL STAMP / CERTIFICATION: APPROVED", pageWidth - margin - 4, currentY + 12, { align: "right" });

      drawOfficialFooter(doc, pageWidth, pageHeight, 3, 3);
    } else if (options.optionType === "structural_cad") {
      // ==========================================
      // OPTION 2: STRUCTURAL CAD BLUEPRINT SHEET
      // ==========================================
      drawOfficialHeader(
        doc,
        pageWidth,
        "PROJECT PYLON-FLAK BASTION | STRUCTURAL CAD & ELEVATION BLUEPRINT",
        "HIGH-RESOLUTION CAD BLUEPRINT SHEET & FOUNDATION CUTAWAYS",
        1,
        1
      );

      let currentY = 32;

      // Draw Dual Large Blueprint Viewports
      const cadWidth = pageWidth - margin * 2;
      const cadHalfW = (cadWidth - 4) / 2;
      const cadHeight = isLandscape ? pageHeight - 75 : 95;

      drawVectorCADBlueprint(doc, margin, currentY, cadHalfW, cadHeight);
      drawCentralMastFoundationDetail(doc, margin + cadHalfW + 4, currentY, cadHalfW, cadHeight);

      currentY += cadHeight + 6;

      // Add Specs Table below
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(margin, currentY, cadWidth, 38, 1.5, 1.5, "FD");

      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("Key CAD Elevation Benchmarks, Central Mast & Foundation Specifications", margin + 4, currentY + 6.5);

      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text("• EL +110.00 m (Combat Apex Platform): 4,200 x 4,200 mm with 18mm Hardox 500 armor plating and MR damping.", margin + 4, currentY + 13);
      doc.text("• EL +95.00 m (380kV Cross-Arm): 8,500 mm clearance zone insulating weapon systems from electrical induction.", margin + 4, currentY + 19.5);
      doc.text("• Central Mast (Dia 450 mm x 28 mm): Titanium Ti-6Al-4V / S355 alloy routes 88% of 320 kN recoil to ground bedrock.", margin + 4, currentY + 26);
      doc.text("• EL +0.00 m to -18.00 m (Bedrock Foundation): Quad 600mm dia C40 sulfate-resistant concrete micro-piles socketed in rock.", margin + 4, currentY + 32.5);

      drawOfficialFooter(doc, pageWidth, pageHeight, 1, 1);
    } else if (options.optionType === "bill_of_materials") {
      // ==========================================
      // OPTION 3: BILL OF MATERIALS & BOQ
      // ==========================================
      drawOfficialHeader(
        doc,
        pageWidth,
        "PROJECT PYLON-FLAK BASTION | BILL OF MATERIALS & PROCUREMENT (BOM)",
        "ITEMIZED SPECIFICATION OF METALS, ALLOYS, HYDRAULICS & RIGS",
        1,
        1
      );

      let currentY = 32;

      // Section Title
      doc.setFillColor(16, 185, 129);
      doc.rect(margin, currentY, 3, 6, "F");
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.text("ITEMIZED BILL OF MATERIALS & CERTIFICATION STANDARDS", margin + 5, currentY + 4.8);

      currentY += 8;

      const bomRows = [
        ["1", "Combat Platform Plating", "Hardox 500 Quenched Armor Steel", "18 mm Plating", "24 Metric Tons", "MIL-A-46100"],
        ["2", "Internal Hollow Mast", "S355 Heavy Steel / Titanium Ti-6Al-4V", "Dia 450 mm x 28 mm", "18 Metric Tons", "EN 10025-2"],
        ["3", "Bedrock Micro-Piles", "Sulfate-Resistant C40 Concrete + Rebar", "Dia 600 mm x 18 m", "120 m3 Grout", "SBC 304 / ACI 318"],
        ["4", "Recoil Damping Pistons", "Nitrogen-Hydraulic Cylinders (4-Axis)", "320 kN Damping", "12 Units", "ISO 6020-2"],
        ["5", "AESA Radar Array", "Gallium Nitride (GaN) Dual-Band S/X", "360-deg Azimuth", "3 Systems", "MIL-STD-810H"],
        ["6", "Twin CIWS Autocannon", "35mm x 228 Oerlikon / AHEAD Ammunition", "1,600 rds/min", "3 Mounts", "NATO STANAG 4516"],
        ["7", "Lightning Dissipation Rods", "Early Streamer Emission (CTS/ESE)", "250 kA (10/350 us)", "6 Sets", "NFC 17-102 / IEC 62305"],
        ["8", "Ground Earthing Grid", "Solid Copper Radial Array + Chemical Wells", "Resistance < 0.8 Ohm", "1,800 Meters", "IEEE 80 / SBC 401"],
        ["9", "EMP Faraday Enclosure", "Double Mu-Metal Permeability Plating", "MIL-STD-188-125", "6 Enclosures", "MIL-STD-188-125"],
        ["10", "160-Ton Crawler Cranes", "All-Terrain Telescopic Jib (135m reach)", "Zero-touch hoist", "2 Fleet Rigs", "OSHA 1926.1400"],
      ];

      const tableW = pageWidth - margin * 2;
      const bCols = [10, 45, 60, 30, 20, 25];

      // Header
      doc.setFillColor(15, 23, 42);
      doc.rect(margin, currentY, tableW, 6.5, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text("NO", margin + 2, currentY + 4.5);
      doc.text("COMPONENT", margin + bCols[0] + 2, currentY + 4.5);
      doc.text("MATERIAL / SPECIFICATION", margin + bCols[0] + bCols[1] + 2, currentY + 4.5);
      doc.text("DIMENSIONS", margin + bCols[0] + bCols[1] + bCols[2] + 2, currentY + 4.5);
      doc.text("QTY / MASS", margin + bCols[0] + bCols[1] + bCols[2] + bCols[3] + 2, currentY + 4.5);
      doc.text("CERTIFICATION", margin + bCols[0] + bCols[1] + bCols[2] + bCols[3] + bCols[4] + 2, currentY + 4.5);

      currentY += 6.5;

      bomRows.forEach((r, idx) => {
        doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
        doc.rect(margin, currentY, tableW, 6.5, "F");
        doc.setDrawColor(226, 232, 240);
        doc.rect(margin, currentY, tableW, 6.5, "S");

        doc.setTextColor(15, 23, 42);
        doc.setFontSize(6.8);
        doc.setFont("helvetica", "normal");
        doc.text(r[0], margin + 2, currentY + 4.5);
        doc.setFont("helvetica", "bold");
        doc.text(r[1], margin + bCols[0] + 2, currentY + 4.5);
        doc.setFont("helvetica", "normal");
        doc.text(r[2], margin + bCols[0] + bCols[1] + 2, currentY + 4.5);
        doc.text(r[3], margin + bCols[0] + bCols[1] + bCols[2] + 2, currentY + 4.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(6, 95, 70);
        doc.text(r[4], margin + bCols[0] + bCols[1] + bCols[2] + bCols[3] + 2, currentY + 4.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(r[5], margin + bCols[0] + bCols[1] + bCols[2] + bCols[3] + bCols[4] + 2, currentY + 4.5);

        currentY += 6.5;
      });

      drawOfficialFooter(doc, pageWidth, pageHeight, 1, 1);
    } else {
      // ==========================================
      // OPTION 4: EXECUTIVE TECHNICAL BRIEF (1 PAGE)
      // ==========================================
      drawOfficialHeader(
        doc,
        pageWidth,
        "PROJECT PYLON-FLAK BASTION | EXECUTIVE TECHNICAL BRIEFING",
        "STRATEGIC STUDY & HIGH-LEVEL INFRASTRUCTURE DEFENSE PROPOSAL",
        1,
        1
      );

      let currentY = 32;

      // Executive Summary Box
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.4);
      doc.roundedRect(margin, currentY, pageWidth - margin * 2, 26, 1.5, 1.5, "FD");

      doc.setFontSize(8.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(6, 95, 70);
      doc.text("STRATEGIC VISION & VALUE PROPOSITION", margin + 4, currentY + 6);

      doc.setFontSize(7.2);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 41, 59);
      doc.text("Pylon-Flak Bastion re-engineers the proven World War II Flak Tower air defense paradigm into a cutting-edge,", margin + 4, currentY + 11.5);
      doc.text("cost-effective, multi-layered defense umbrella by retrofitting high-voltage transmission pylons (380kV / 500kV).", margin + 4, currentY + 16.5);
      doc.text("It provides continuous, 360-degree point defense for critical petrochemical refineries, desalination plants and seaports.", margin + 4, currentY + 21.5);

      currentY += 32;

      // 6 Strategic Metrics Grid
      const mColW = (pageWidth - margin * 2 - 4) / 3;
      const metrics = [
        { title: "RADAR HORIZON", val: "120 km (4D AESA)", sub: "4x over ground-based radar" },
        { title: "ELEVATION APEX", val: "110 Meters", sub: "Surpasses terrain masking" },
        { title: "REACTION LATENCY", val: "< 1.4 Seconds", sub: "Instant C4I laser lock-on" },
        { title: "COST REDUCTION", val: "> 85% Savings", sub: "Vs isolated military bases" },
        { title: "RECOIL ABSORPTION", val: "88% Damping", sub: "320 kN thrust neutralized" },
        { title: "NETWORK REACH", val: "90,000+ km", sub: "National 380kV grid backbone" },
      ];

      metrics.forEach((m, idx) => {
        const mx = margin + (idx % 3) * (mColW + 2);
        const my = currentY + Math.floor(idx / 3) * 22;

        doc.setFillColor(241, 245, 249);
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(mx, my, mColW, 19, 1.5, 1.5, "FD");

        doc.setFontSize(6.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(100, 116, 139);
        doc.text(m.title, mx + mColW / 2, my + 5, { align: "center" });

        doc.setFontSize(9);
        doc.setTextColor(6, 95, 70);
        doc.text(m.val, mx + mColW / 2, my + 11, { align: "center" });

        doc.setFontSize(6);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(m.sub, mx + mColW / 2, my + 15.5, { align: "center" });
      });

      currentY += 48;

      // Brief Key Takeaways
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(margin, currentY, pageWidth - margin * 2, 34, 1.5, 1.5, "FD");

      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text("KEY IMPLEMENTATION ADVANTAGES:", margin + 4, currentY + 6);

      doc.setFontSize(7.2);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text("1. Immediate Strategic Deployment: Leverages existing transmission lattice infrastructure with zero land acquisition delays.", margin + 4, currentY + 12);
      doc.text("2. Unrivaled High-Angle Coverage: Elevated 110m combat platform completely neutralizes low-altitude terrain-masking cruise missiles.", margin + 4, currentY + 17.5);
      doc.text("3. Unlimited Power & Resilient Comms: Continuous 380kV induction charging backed by 100 Gbps OPGW optical fiber grid.", margin + 4, currentY + 23);
      doc.text("4. Modular Flexibility: Modular apex cradle accepts AESA Radars, Twin 35mm CIWS, 100kW HEL Fiber Lasers or VLS SAM pods.", margin + 4, currentY + 28.5);

      drawOfficialFooter(doc, pageWidth, pageHeight, 1, 1);
    }

    // Save and download actual PDF file
    doc.save(`KSA_Pylon_Flak_Engineering_Dossier_${options.optionType}_${Date.now()}.pdf`);
    return true;
  } catch (err) {
    console.error("PDF generation failed:", err);
    return false;
  }
}
