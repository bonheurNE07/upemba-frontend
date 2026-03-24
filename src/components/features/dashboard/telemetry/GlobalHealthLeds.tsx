'use client';

import { useHealthStatuses } from '@/hooks/useTelemetry';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

export function GlobalHealthLeds() {
  const { data: statuses, isLoading, isError } = useHealthStatuses();

  if (isLoading || isError) {
    return <div className="flex h-5 items-center justify-center animate-pulse space-x-2">
      <div className="w-3 h-3 rounded-full bg-muted"></div>
      <div className="w-3 h-3 rounded-full bg-muted"></div>
      <div className="w-3 h-3 rounded-full bg-muted"></div>
    </div>;
  }

  const hasCritical = statuses?.some((s) => s.status === 'CRITICAL') || false;
  const hasWarning = statuses?.some((s) => s.status === 'WARNING') || false;
  // If no critical or warning, it's green (or if no statuses at all? assume green for empty)
  const isAllGood = !hasCritical && !hasWarning;

  return (
    <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-border/40 bg-background/50 shadow-sm backdrop-blur-sm">
      <div className="text-xs font-bold tracking-widest text-muted-foreground mr-2">SYS_STATUS</div>
      
      {/* GREEN LED */}
      <div className={cn(
        "flex shrink-0 items-center justify-center w-5 h-5 rounded-full transition-all duration-500",
        isAllGood ? "bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.6)]" : "bg-muted"
      )}>
        <div className={cn("w-2.5 h-2.5 rounded-full", isAllGood ? "bg-green-500" : "bg-neutral-600")} />
      </div>

      {/* YELLOW LED */}
      <div className={cn(
        "flex shrink-0 items-center justify-center w-5 h-5 rounded-full transition-all duration-500",
        hasWarning && !hasCritical ? "bg-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.6)]" : "bg-muted"
      )}>
        <div className={cn("w-2.5 h-2.5 rounded-full", hasWarning && !hasCritical ? "bg-yellow-500" : "bg-neutral-600")} />
      </div>

      {/* RED LED */}
      <div className={cn(
        "flex shrink-0 items-center justify-center w-5 h-5 rounded-full transition-all duration-500",
        hasCritical ? "bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.6)]" : "bg-muted"
      )}>
        <div className={cn("w-2.5 h-2.5 rounded-full", hasCritical ? "bg-red-500" : "bg-neutral-600")} />
      </div>
    </div>
  );
}
