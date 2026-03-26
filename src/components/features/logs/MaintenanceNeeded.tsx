'use client';

import { useEquipments, useHealthStatuses } from '@/hooks/useTelemetry';
import { AlertTriangle, Wrench } from 'lucide-react';

export function MaintenanceNeeded() {
  const { data: equipments } = useEquipments();
  const { data: healthStatuses } = useHealthStatuses();

  const hardwareNeedingMaintenance = equipments?.filter(eq => {
    const status = healthStatuses?.results?.find(h => h.equipment === eq.id)?.status;
    return status === 'WARNING' || status === 'CRITICAL';
  }) || [];

  if (hardwareNeedingMaintenance.length === 0) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm shadow-sm transition-all duration-300">
        <div className="bg-green-500/20 p-2 rounded-full">
          <Wrench className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-green-600 dark:text-green-500">All Systems Nominal</h4>
          <p className="text-xs text-green-600/80 dark:text-green-500/80 mt-0.5">No immediate physical maintenance required across the fleet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-amber-500/20 p-2 rounded-full animate-pulse">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest">Predictive Maintenance Required</h4>
          <p className="text-[10px] text-amber-600/80 dark:text-amber-500/80 mt-0.5 uppercase font-medium">ML Failure Risk: Our diagnostics models have flagged the following nodes as exhibiting high-risk behavior patterns.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {hardwareNeedingMaintenance.map(eq => {
          const status = healthStatuses?.results?.find(h => h.equipment === eq.id)?.status;
          const isCritical = status === 'CRITICAL';
          return (
            <div 
              key={eq.id} 
              className={`flex items-center justify-between p-3 rounded-lg border ${
                isCritical 
                  ? 'bg-red-500/10 border-red-500/30' 
                  : 'bg-amber-500/5 border-amber-500/20'
              }`}
            >
              <div className="flex flex-col">
                <span className={`text-sm font-bold truncate ${isCritical ? 'text-red-500' : 'text-amber-600 dark:text-amber-500'}`}>
                  {eq.name}
                </span>
                <span className="text-xs font-mono opacity-70 mt-0.5">{eq.mac_address}</span>
              </div>
              <span className={`px-2.5 py-1 text-[10px] font-black tracking-widest uppercase rounded rounded-full ${isCritical ? 'bg-red-500 text-white' : 'bg-amber-500/20 text-amber-600 dark:text-amber-500'}`}>
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
