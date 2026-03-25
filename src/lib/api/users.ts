import { apiClient } from '../axios';

export interface UserProfile {
  id?: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  name?: string; // Sometimes returned instead of first/last
}

export const getCurrentUser = async (): Promise<UserProfile | null> => {
  try {
    const response = await apiClient.get<UserProfile>('/users/me/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch current user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  const response = await apiClient.patch<UserProfile>('/users/me/', data);
  return response.data;
};
