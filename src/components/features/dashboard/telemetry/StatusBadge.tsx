'use client';

import { useHealthStatuses } from '@/hooks/useTelemetry';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';

interface StatusBadgeProps {
  equipmentId: number | undefined;
}

export function StatusBadge({ equipmentId }: StatusBadgeProps) {
  const { data: statuses, isLoading } = useHealthStatuses();

  if (!equipmentId) return null;
  if (isLoading) {
    return <div className="h-20 w-full md:w-[300px] bg-muted animate-pulse rounded-xl" />;
  }

  const equipmentStatus = statuses?.results?.find((s) => s.equipment === equipmentId);

  if (!equipmentStatus) {
    return (
      <div className="flex p-4 border border-border/50 rounded-xl bg-background/50 items-center justify-center text-muted-foreground">
        No status data available
      </div>
    );
  }

  const isCritical = equipmentStatus.status === 'CRITICAL';
  const isWarning = equipmentStatus.status === 'WARNING';
  const isNormal = equipmentStatus.status === 'NORMAL';

  return (
    <div className={cn(
      "flex items-center gap-4 p-4 border rounded-xl shadow-sm transition-all duration-300",
      isCritical ? "bg-red-500/10 border-red-500/50" :
      isWarning ? "bg-yellow-500/10 border-yellow-500/50" :
      "bg-green-500/10 border-green-500/50"
    )}>
      <div className="shrink-0">
        {isCritical && <ShieldAlert className="w-10 h-10 text-red-500 animate-pulse" />}
        {isWarning && <AlertTriangle className="w-10 h-10 text-yellow-500" />}
        {isNormal && <CheckCircle className="w-10 h-10 text-green-500" />}
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "text-xs font-bold tracking-widest uppercase",
          isCritical ? "text-red-500" :
          isWarning ? "text-yellow-500" : "text-green-500"
        )}>
          {equipmentStatus.status}
        </span>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-black tracking-tight text-foreground">
             {(equipmentStatus.anomaly_score * 100).toFixed(1)}%
          </span>
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest bg-muted/30 px-1.5 py-0.5 rounded leading-none">ML Prediction</span>
        </div>
      </div>
    </div>
  );
}
