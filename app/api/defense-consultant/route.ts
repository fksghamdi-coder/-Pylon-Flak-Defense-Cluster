import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query, siteParams, towerConfig } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "مفتاح الربط مع الذكاء الاصطناعي غير متوفر في الخادم" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemPrompt = `أنت كبير مهندسي واستشاريي الدفاع الجوي والإنشاءات العسكرية المتقدمة المتخصص في مبادرات حماية البنى التحتية الحيوية بالمملكة العربية السعودية (مثل المنشآت البترولية الحيوية، محطات التحلية بالجبيل ورابغ، نيوم، خطوط نقل الطاقة 380/500 ك.ف، ومحاور الممرات الجبلية والحدودية).
أنت تقدم استشارات هندسية فائقة الدقة حول مشروع: "منظومة أبراج الحصن للدفاع الجوي المستوحاة من أبراج الفلاك التاريخية والمدمجة على أبراج الضغط العالي للكهرباء".
المنظومة تتكون من مجموعات ثلاثية الأبراج (Cluster of 3 Towers):
- البرج 1: رادار 4D AESA مع مستشعر كهروبصري حراري EO/IR عالي الدقة.
- البرج 2: رشاش مدفعي ثنائي الإطلاق عيار 35mm أو 30mm موجه آلياً بالليزر مع ذخائر شظايا مبرمجة لمكافحة الأسراب.
- البرج 3 (خياري): إما مدفع ليزر عالي الطاقة 100kW، أو صواريخ عمودية VLS متوسطة وقصيرة المدى (15-40 كم)، أو مدفع رشاش ثنائي إضافي.
المعايير الهندسية الحاكمة:
1. امتصاص الارتداد والصدمات (Shock Absorbers & Dampers) لحماية الأبراج الشبكية ذات الجهد العالي من الانهيار الإنشائي.
2. مشتتات الصواعق والتأريض العميق وعوازل فاراداي لحماية الإلكترونيات والحواسب من التيارات العالية والمجالات الكهرومغناطيسية الصادرة عن خطوط 380kV/500kV.
3. التوافق مع البيئة الصحراوية السعودية القاسية (الحرارة حتى 55 مئوية، العواصف الرملية "الهبوب"، الرطوبة الملحية الساحلية).

قدم تحليلاً هندسياً عسكرياً دقيقاً، مدعماً بالأرقام، ومعادلات التحمل الإنشائي، وتوصيات التكتيك العملياتي. اكتب بلغة عربية عسكرية وتقنية فصيحة ومتقنة.`;

    const promptText = `
استفسار القيادة الهندسية: ${query || "قدم تقييماً شاملاً لجدوى تثبيت المنظومة الثلاثية على أبراج الضغط العالي ومقارنة البرج الثالث"}

المعطيات الميدانية الحالية:
- ارتفاع البرج: ${towerConfig?.height || 95} متر
- تكوين البرج الثالث المختار: ${towerConfig?.towerThreeType || "مدفع ليزر عالي الطاقة (High-Energy Laser)"}
- جهد خط الكهرباء: ${towerConfig?.voltage || "380 kV"}
- سرعة الرياح التصميمية: ${towerConfig?.windSpeed || "140 km/h"}
- المنطقة / الموقع المستهدف: ${siteParams?.region || "القطاع الشرقي (بقيق والجبيل)"}
- نوع التهديد الأساسي: ${siteParams?.threatType || "أسراب طائرات مسيرة انتحارية وصواريخ كروز منخفضة"}

المطلوب:
1. التقييم الإنشائي وتحليل عزم الارتداد وقدرة التحمل الميكانيكي.
2. خطة العزل الكهرومغناطيسي وتشتيت الصواعق والتأريض.
3. تقدير نطاق الاشتباك والتغطية ومعدل الفتك (Kill Probability Pk).
4. التوصية العملياتية النهائية لتكوين البرج الثالث الأنسب لهذا القطاع.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const analysis = response.text || "لم يتم استلام رد من النموذج";

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    console.error("Defense consultant API error:", err);
    const errorMessage = err instanceof Error ? err.message : "خطأ غير متوقع في معالجة الاستشارة الهندسية";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
