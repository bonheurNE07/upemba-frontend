import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, updateUserProfile, UserProfile } from '@/lib/api/users';

export function useCurrentUser() {
  return useQuery<UserProfile | null>({
    queryKey: ['user', 'me'], // Matches AppSidebar queryKey exactly for instant cache sync
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (updatedUser) => {
      // Instantly inject the updated user into the cache so the sidebar updates seamlessly
      queryClient.setQueryData(['user', 'me'], updatedUser);
    },
  });
}
