'use client';

import { useState } from 'react';
import { MaintenanceNeeded } from '@/components/features/logs/MaintenanceNeeded';
import { LogFilters } from '@/components/features/logs/LogFilters';
import { LogsTable } from '@/components/features/logs/LogsTable';

export default function MaintenanceLogsPage() {
  const [selectedEquipment, setSelectedEquipment] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Maintenance Hub
          </h1>
          <p className="text-muted-foreground mt-1 tracking-wide">
            Track hardware events, file physical maintenance reports, and monitor critical node alerts.
          </p>
        </div>
      </div>

      <MaintenanceNeeded />

      <LogFilters 
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <LogsTable 
        equipmentId={selectedEquipment} 
        startDate={startDate} 
        endDate={endDate} 
      />
    </div>
  );
}
