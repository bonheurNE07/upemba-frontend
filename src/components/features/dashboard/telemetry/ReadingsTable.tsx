'use client';

import { useSensorReadings } from '@/hooks/useTelemetry';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Activity } from 'lucide-react';

interface ReadingsTableProps {
  equipmentId: number | undefined;
}

export function ReadingsTable({ equipmentId }: ReadingsTableProps) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useSensorReadings(equipmentId, page);

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
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/10">
            <tr>
              <th className="px-6 py-3 font-bold tracking-wider">Timestamp</th>
              <th className="px-6 py-3 font-bold tracking-wider text-right">Temperature (°C)</th>
              <th className="px-6 py-3 font-bold tracking-wider text-right">Voltage (V)</th>
              <th className="px-6 py-3 font-bold tracking-wider text-right">Vib X</th>
              <th className="px-6 py-3 font-bold tracking-wider text-right">Vib Y</th>
              <th className="px-6 py-3 font-bold tracking-wider text-right">Vib Z</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((reading) => (
              <tr key={reading.id} className="border-b border-border/50 hover:bg-muted/5 transition-colors">
                <td className="px-6 py-4 font-mono text-muted-foreground">
                  {format(new Date(reading.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                </td>
                <td className="px-6 py-4 text-right font-medium">{reading.temperature.toFixed(2)}</td>
                <td className="px-6 py-4 text-right font-medium">{reading.voltage.toFixed(2)}</td>
                <td className="px-6 py-4 text-right font-medium">{reading.vib_x.toFixed(2)}</td>
                <td className="px-6 py-4 text-right font-medium">{reading.vib_y.toFixed(2)}</td>
                <td className="px-6 py-4 text-right font-medium">{reading.vib_z.toFixed(2)}</td>
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

      {/* Pagination Controls */}
      <div className="flex items-center justify-between p-4 border-t border-border/50 bg-muted/10">
        <div className="text-xs text-muted-foreground">
          Page <span className="font-bold text-foreground">{page}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!data.previous}
            className="h-8 shadow-none"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={!data.next}
            className="h-8 shadow-none"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
