'use client';

import { useHealthStatuses } from '@/hooks/useTelemetry';

interface EquipmentSelectorProps {
  value: number | undefined;
  onChange: (value: number) => void;
}

export function EquipmentSelector({ value, onChange }: EquipmentSelectorProps) {
  const { data: statuses, isLoading } = useHealthStatuses();

  if (isLoading) {
    return <div className="h-10 w-[200px] bg-muted animate-pulse rounded-md" />;
  }

  const equipments = statuses || [];

  return (
    <div className="flex flex-col gap-1.5 min-w-[200px]">
      <label className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
        Target Node
      </label>
      <select
        value={value?.toString() || ""}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="h-10 px-3 py-2 w-full rounded-md border border-border/50 bg-background/50 text-foreground transition-colors focus:ring-2 focus:ring-primary outline-none cursor-pointer"
      >
        <option value="" disabled>Select Equipment...</option>
        {equipments.map((status) => (
           <option key={status.equipment} value={status.equipment.toString()}>
             {status.equipment_name || `Equipment #${status.equipment}`}
           </option>
        ))}
      </select>
    </div>
  );
}
