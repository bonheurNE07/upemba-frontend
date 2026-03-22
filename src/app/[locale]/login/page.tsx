import { LoginForm } from "@/components/features/auth/LoginForm";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function LoginPage() {
  const t = await getTranslations("Index");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-lg z-10 relative">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground">
            {t("title")}
          </h1>
          <p className="text-lg font-medium text-muted-foreground max-w-sm mx-auto">
            {t("description")}
          </p>
        </div>
        
        <LoginForm />
        
        <div className="mt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground font-medium">
            Strictly authorized edge personnel only.
          </p>
          <p className="text-sm text-muted-foreground">
            No gateway access? <Link href="/register" className="text-primary hover:underline font-semibold">Request Clearance</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
