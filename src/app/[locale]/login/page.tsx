import { LoginForm } from "@/components/features/auth/LoginForm";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  // Dynamically extract Server Component Translations explicitly for the Authentication Wrapper
  const t = await getTranslations("Index");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Decorative Minimal Framer Motion/Tailwind Lighting Effects mimicking Premium Enterprise dashboards */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      <div className="w-full max-w-lg z-10 relative">
        <div className="mb-12 text-center space-y-4">
          <div className="inline-block p-4 rounded-full bg-primary/10 mb-2">
            <div className="w-12 h-12 bg-primary rounded-full shadow-[0_0_30px_rgba(var(--primary),0.5)] animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground drop-shadow-sm">
            {t("title")}
          </h1>
          <p className="text-lg font-medium text-muted-foreground max-w-sm mx-auto">
            {t("description")}
          </p>
        </div>
        
        <LoginForm />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground font-medium">
            Strictly authorized edge personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
