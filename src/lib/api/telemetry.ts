import { apiClient } from '../axios';
import { z } from 'zod';

export interface HealthStatus {
  id: number;
  equipment: number;
  equipment_name: string;
  anomaly_score: number;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL';
  prediction_timestamp: string;
}

export interface SensorReading {
  id: number;
  equipment: number;
  temperature: number;
  voltage: number;
  vib_x: number;
  vib_y: number;
  vib_z: number;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Fetch all health statuses
export const getHealthStatuses = async (): Promise<HealthStatus[]> => {
  const response = await apiClient.get<HealthStatus[]>('/telemetry/health-statuses/');
  // Django ViewSets often return paginated endpoints unless unpaginated
  // Let's assume standard unpaginated or handle results if paginated:
  if ('results' in response.data) {
    return (response.data as any).results;
  }
  return response.data;
};

// Fetch sensor readings for a specific equipment with pagination
export const getSensorReadings = async (
  equipmentId: number,
  page: number = 1
): Promise<PaginatedResponse<SensorReading>> => {
  const response = await apiClient.get<PaginatedResponse<SensorReading>>('/telemetry/sensor-readings/', {
    params: {
      equipment: equipmentId,
      page,
      ordering: '-timestamp', // Expect newest first
    },
  });
  // Since we assume simple ViewSet without explicitly defined django-filter yet,
  // we might need to handle filtering by equipment on the frontend if the backend doesn't support the param,
  // but it's best practice to pass it as a query param.
  return response.data;
};
