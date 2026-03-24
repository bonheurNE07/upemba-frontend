import { TelemetryDashboard } from "@/components/features/dashboard/telemetry";

export default async function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto h-full animate-in fade-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground uppercase">
          Telemetry Overview
        </h1>
        <p className="text-base font-medium text-muted-foreground max-w-2xl">
          Global diagnostic metrics and synchronized Mosquitto node arrays will dynamically render onto this grid horizontally.
        </p>
      </div>
      
      
      <TelemetryDashboard />
    </div>
  );
}
