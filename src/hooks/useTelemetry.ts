import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getHealthStatuses,
  getSensorReadings,
  getEquipments,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  HealthStatus,
  SensorReading,
  Equipment,
} from '@/lib/api/telemetry';

export const POLLING_INTERVAL = 30 * 1000; // 30 seconds

export function useEquipments(search?: string) {
  return useQuery<Equipment[]>({
    queryKey: ['equipments', search],
    queryFn: () => getEquipments(search),
    refetchInterval: POLLING_INTERVAL,
  });
}

export function useHealthStatuses(equipmentId?: number, startDate?: string, endDate?: string) {
  return useQuery<HealthStatus[]>({
    queryKey: ['health-statuses', equipmentId, startDate, endDate],
    queryFn: () => getHealthStatuses(equipmentId, startDate, endDate),
    refetchInterval: POLLING_INTERVAL,
  });
}

export function useSensorReadings(equipmentId: number | undefined) {
  return useQuery<SensorReading[]>({
    queryKey: ['sensor-readings', equipmentId],
    queryFn: () => getSensorReadings(equipmentId as number),
    enabled: !!equipmentId,
    refetchInterval: POLLING_INTERVAL,
  });
}

export function useCreateEquipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEquipment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['equipments'] }),
  });
}

export function useUpdateEquipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Equipment> }) => updateEquipment(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['equipments'] }),
  });
}

export function useDeleteEquipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEquipment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['equipments'] }),
  });
}
