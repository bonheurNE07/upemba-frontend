'use client';

import { useEquipments } from '@/hooks/useTelemetry';
import { Filter, Calendar, Cpu } from 'lucide-react';

interface LogFiltersProps {
  selectedEquipment: number | undefined;
  setSelectedEquipment: (id: number | undefined) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export function LogFilters({
  selectedEquipment,
  setSelectedEquipment,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}: LogFiltersProps) {
  const { data: equipments } = useEquipments();

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-border/50 rounded-xl bg-muted/10 shadow-sm backdrop-blur-sm">
      
      {/* Equipment Dropdown */}
      <div className="flex-1 space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5" /> Target Node
        </label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={selectedEquipment || ""}
          onChange={(e) => setSelectedEquipment(e.target.value ? Number(e.target.value) : undefined)}
        >
          <option value="">All Fleet Equipments</option>
          {equipments?.map((eq) => (
            <option key={eq.id} value={eq.id}>
              {eq.name} ({eq.equipment_type})
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Selectors */}
      <div className="flex-1 space-y-1.5">
         <label className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" /> Start Date
        </label>
        <input
          type="date"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="flex-1 space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" /> End Date
        </label>
        <input
          type="date"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Clear Filters Utility */}
      <div className="flex items-end">
         <button
            onClick={() => {
              setSelectedEquipment(undefined);
              setStartDate('');
              setEndDate('');
            }}
            disabled={!selectedEquipment && !startDate && !endDate}
            className="flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-input bg-background hover:bg-muted px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
         >
           <Filter className="w-4 h-4" />
           Clear
         </button>
      </div>

    </div>
  );
}
