'use client';

import { useSensorReadings } from '@/hooks/useTelemetry';
import { format } from 'date-fns';
import { Activity } from 'lucide-react';

interface ReadingsTableProps {
  equipmentId: number | undefined;
}

export function ReadingsTable({ equipmentId }: ReadingsTableProps) {
  const { data, isLoading, isError } = useSensorReadings(equipmentId);

  if (!equipmentId) return null;

  if (isLoading) {
    return <div className="h-64 w-full bg-muted animate-pulse rounded-xl" />;
  }

  if (isError || !data) {
    return <div className="p-4 text-red-500">Failed to load sensor readings.</div>;
  }

  return (
    <div className="flex flex-col border border-border/50 rounded-xl bg-background/50 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-2">
           <Activity className="w-4 h-4 text-primary" />
           <h3 className="text-sm font-bold tracking-widest uppercase">Historical Logs</h3>
        </div>
        <div className="text-xs text-muted-foreground">
           Total records: {data.count}
        </div>
      </div>
      
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] text-muted-foreground uppercase bg-muted/10 sticky top-0 shadow-sm z-10">
            <tr>
              <th className="px-4 py-3 font-bold tracking-wider">Timestamp</th>
              <th className="px-4 py-3 font-bold tracking-wider text-right">Temp</th>
              <th className="px-4 py-3 font-bold tracking-wider text-right">Volt</th>
              <th className="hidden md:table-cell px-4 py-3 font-bold tracking-wider text-right">Vib X</th>
              <th className="hidden md:table-cell px-4 py-3 font-bold tracking-wider text-right">Vib Y</th>
              <th className="hidden md:table-cell px-4 py-3 font-bold tracking-wider text-right">Vib Z</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((reading) => (
              <tr key={reading.id} className="border-b border-border/50 hover:bg-muted/5 transition-colors">
                <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">
                  {format(new Date(reading.timestamp), 'HH:mm:ss')}
                </td>
                <td className="px-4 py-3 text-right font-medium text-[#ef4444]">{reading.temperature.toFixed(1)}</td>
                <td className="px-4 py-3 text-right font-medium text-[#3b82f6]">{reading.voltage.toFixed(1)}</td>
                <td className="hidden md:table-cell px-4 py-3 text-right font-medium text-[#22c55e]">{reading.vib_x.toFixed(2)}</td>
                <td className="hidden md:table-cell px-4 py-3 text-right font-medium text-[#eab308]">{reading.vib_y.toFixed(2)}</td>
                <td className="hidden md:table-cell px-4 py-3 text-right font-medium text-[#a855f7]">{reading.vib_z.toFixed(2)}</td>
              </tr>
            ))}
            {data.results.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No telemetry data found for this equipment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
