import { ActivationForm } from "@/components/features/auth/ActivationForm";

export default async function ActivationPage() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none" />
      <div className="z-10 w-full max-w-lg">
        <ActivationForm />
      </div>
    </main>
  );
}
