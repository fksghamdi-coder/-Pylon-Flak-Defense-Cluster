import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'منظومة أبراج الحصن للدفاع الجوي | Pylon-Flak Defense Cluster',
  description: 'مخطط هيكلي ومنظومة قيادة وتحكم هندسية متطورة لتشييد شبكات الدفاع الجوي ثلاثية الأبراج المدمجة على أبراج الضغط العالي مع امتصاص الصدمات وتشتيت الصواعق',
  openGraph: {
    title: 'منظومة أبراج الحصن للدفاع الجوي | Pylon-Flak Defense Cluster',
    description: 'مخطط هيكلي ومنظومة قيادة وتحكم هندسية متطورة لتشييد شبكات الدفاع الجوي ثلاثية الأبراج المدمجة على أبراج الضغط العالي مع امتصاص الصدمات وتشتيت الصواعق',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'منظومة أبراج الحصن للدفاع الجوي | Pylon-Flak Defense Cluster',
    description: 'مخطط هيكلي ومنظومة قيادة وتحكم هندسية متطورة لتشييد شبكات الدفاع الجوي ثلاثية الأبراج المدمجة على أبراج الضغط العالي مع امتصاص الصدمات وتشتيت الصواعق',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950 min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
