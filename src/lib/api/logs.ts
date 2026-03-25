import { apiClient } from '../axios';

export interface MaintenanceLog {
  id: number;
  equipment: number;
  author: number | null;
  author_name: string;
  description: string;
  action_taken: string;
  timestamp: string;
}

export const getLogs = async (equipmentId?: number, startDate?: string, endDate?: string): Promise<MaintenanceLog[]> => {
  try {
    const params: Record<string, any> = {};
    if (equipmentId) params.equipment = equipmentId;
    if (startDate) params.start_date = startDate;
    if (endDate) {
      if (endDate.length === 10) {
        params.end_date = `${endDate}T23:59:59.999Z`;
      } else {
        params.end_date = endDate;
      }
    }

    const response = await apiClient.get<MaintenanceLog[]>('/maintenance-logs/', { params });
    // Handle Django paginated responses if enabled, otherwise raw array
    if (response.data && typeof response.data === 'object' && 'results' in response.data) {
      return (response.data as any).results;
    }
    return response.data;
  } catch (error) {
    console.error('Failed to fetch maintenance logs:', error);
    return [];
  }
};

export const createLog = async (data: Partial<MaintenanceLog>): Promise<MaintenanceLog> => {
  const response = await apiClient.post<MaintenanceLog>('/maintenance-logs/', data);
  return response.data;
};

export const updateLog = async (id: number, data: Partial<MaintenanceLog>): Promise<MaintenanceLog> => {
  const response = await apiClient.patch<MaintenanceLog>(`/maintenance-logs/${id}/`, data);
  return response.data;
};

export const deleteLog = async (id: number): Promise<void> => {
  await apiClient.delete(`/maintenance-logs/${id}/`);
};
