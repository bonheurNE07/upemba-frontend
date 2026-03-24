import { useQuery } from '@tanstack/react-query';
import {
  getHealthStatuses,
  getSensorReadings,
  HealthStatus,
  SensorReading,
  PaginatedResponse,
} from '@/lib/api/telemetry';

export const POLLING_INTERVAL = 40 * 1000; // 40 seconds

export function useHealthStatuses() {
  return useQuery<HealthStatus[]>({
    queryKey: ['health-statuses'],
    queryFn: getHealthStatuses,
    refetchInterval: POLLING_INTERVAL,
  });
}

export function useSensorReadings(equipmentId: number | undefined, page: number = 1) {
  return useQuery<PaginatedResponse<SensorReading>>({
    queryKey: ['sensor-readings', equipmentId, page],
    queryFn: () => getSensorReadings(equipmentId as number, page),
    enabled: !!equipmentId,
    refetchInterval: POLLING_INTERVAL,
  });
}
