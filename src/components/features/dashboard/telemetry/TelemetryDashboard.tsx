'use client';

import { useState } from 'react';
import { EquipmentSelector } from './EquipmentSelector';
import { StatusBadge } from './StatusBadge';
import { TelemetryCharts } from './TelemetryCharts';
import { ReadingsTable } from './ReadingsTable';

export function TelemetryDashboard() {
  const [selectedEquipment, setSelectedEquipment] = useState<number | undefined>();

  return (
    <div className="flex flex-col gap-8 w-full animate-in fade-in duration-500">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-border/50 bg-muted/10">
         <EquipmentSelector 
           value={selectedEquipment} 
           onChange={setSelectedEquipment} 
         />
         <div className="flex-1" />
         {selectedEquipment && (
           <StatusBadge equipmentId={selectedEquipment} />
         )}
      </div>

      {/* Main Content Area */}
      {selectedEquipment ? (
        <div className="flex flex-col gap-8">
          <TelemetryCharts equipmentId={selectedEquipment} />
          <ReadingsTable equipmentId={selectedEquipment} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 mt-8 rounded-2xl border-2 border-dashed border-border/50 bg-muted/5 min-h-[400px]">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
             <div className="w-4 h-4 bg-primary/50 rounded-full shadow-[0_0_15px_rgba(var(--primary),0.5)] animate-pulse" />
          </div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest text-center">
            Select an equipment node to initialize telemetry stream
          </p>
        </div>
      )}

    </div>
  );
}
