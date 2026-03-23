import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  // Extract strictly the Server Component localized JSON arrays inherently mapped in 'messages/en.json'
  const t = await getTranslations("Index");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 relative overflow-hidden">
      {/* Decorative Minimalist Lighting Vectors - Severely Translucent to perfectly match the Nova aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] sm:w-[800px] sm:h-[600px] bg-primary/5 rounded-[100%] blur-[100px] pointer-events-none" />

      <div className="z-10 w-full max-w-4xl text-center flex flex-col items-center">
        {/* Radar/Telemetry Minimalist Pulsing Icon strictly adhering to IoT themes */}
        <div className="mb-8 inline-flex p-4 rounded-full bg-primary/10">
          <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary),1)] animate-ping" />
          </div>
        </div>

        {/* Global Translated Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-foreground mb-6 drop-shadow-sm">
          {t("title")}
        </h1>
        
        {/* Global Translated Description text gracefully omitting visual clatter */}
        <p className="text-xl sm:text-2xl text-muted-foreground font-medium max-w-2xl mx-auto mb-14 leading-relaxed">
          {t("description")}
        </p>

        {/* Action Group Routing Geometry completely isolating standard Nav bars */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
          <Button asChild size="lg" className="h-16 px-10 text-xl font-bold w-full sm:w-auto shadow-xl shadow-primary/20 transition-transform active:scale-95">
            <Link href="/login">Initialize Session</Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="h-16 px-10 text-xl font-bold w-full sm:w-auto bg-transparent border-2 border-primary/20 hover:bg-primary/5 transition-all active:scale-95">
            <Link href="/register">Request Clearance</Link>
          </Button>
        </div>

        {/* Hardware Acknowledgment Subtext */}
        <div className="mt-24 text-sm font-semibold tracking-widest text-muted-foreground uppercase opacity-40">
          Powered by Scikit-Learn Isolation Forests & Mosquitto MQTT
        </div>
      </div>
    </main>
  );
}
