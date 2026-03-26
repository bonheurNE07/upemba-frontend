'use client';

import { useSensorReadings } from '@/hooks/useTelemetry';
import { format } from 'date-fns';

// Note: Ensure `npm install recharts` is executed in the project.
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface TelemetryChartsProps {
  equipmentId: number | undefined;
}

export function TelemetryCharts({ equipmentId }: TelemetryChartsProps) {
  const { data, isLoading } = useSensorReadings(equipmentId);

  if (!equipmentId) return null;

  if (isLoading) {
    return <div className="h-[400px] w-full bg-muted animate-pulse rounded-xl" />;
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="h-[400px] flex items-center justify-center border border-border/50 rounded-xl bg-background/50 text-muted-foreground">
        No telemetry data to display charts.
      </div>
    );
  }

  // We want to show chronological order, so reverse the descending results for the chart
  // Only show the last 20 readings for better chart clarity
  const chartData = [...data.results].slice(0, 20).reverse().map(reading => ({
    time: format(new Date(reading.timestamp), 'HH:mm:ss'),
    temperature: reading.temperature,
    voltage: reading.voltage,
    vib_x: reading.vib_x,
    vib_y: reading.vib_y,
    vib_z: reading.vib_z,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Temperature & Voltage Chart */}
      <div className="flex flex-col border border-border/50 rounded-xl bg-background/50 p-4 shadow-sm">
        <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-muted-foreground">Thermodynamics & Power</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="time" stroke="#888" fontSize={12} tickMargin={10} />
              <YAxis yAxisId="left" stroke="#888" fontSize={12} />
              <YAxis yAxisId="right" orientation="right" stroke="#888" fontSize={12} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line yAxisId="left" type="monotone" dataKey="temperature" name="Temperature (°C)" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
              <Line yAxisId="right" type="stepAfter" dataKey="voltage" name="Voltage (V)" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vibration Matrix Chart */}
      <div className="flex flex-col border border-border/50 rounded-xl bg-background/50 p-4 shadow-sm">
        <h3 className="text-sm font-bold tracking-widest uppercase mb-4 text-muted-foreground">Vibration Matrix</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="time" stroke="#888" fontSize={12} tickMargin={10} />
              <YAxis stroke="#888" fontSize={12} domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #333', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="vib_x" name="Vib X" stroke="#22c55e" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="vib_y" name="Vib Y" stroke="#eab308" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="vib_z" name="Vib Z" stroke="#a855f7" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
