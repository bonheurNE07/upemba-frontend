import { RegisterForm } from "@/components/features/auth/RegisterForm";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function RegisterPage() {
  const t = await getTranslations("Auth");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-2xl z-10 relative">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
            {t("registerTitle")}
          </h1>
          <p className="text-lg font-medium text-muted-foreground max-w-sm mx-auto">
            {t("registerDesc")}
          </p>
        </div>
        
        <RegisterForm />
        
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground font-medium">
            {t("unauthorizedText")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("haveAccessText")} <Link href="/login" className="text-primary hover:underline font-semibold">{t("loginTitle")}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
