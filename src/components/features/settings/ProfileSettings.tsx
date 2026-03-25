'use client';

import { useState, useEffect } from 'react';
import { useCurrentUser, useUpdateProfile } from '@/hooks/useUsers';
import { UserProfile } from '@/lib/api/users';
import { User, Mail, Shield } from 'lucide-react';

export function ProfileSettings() {
  const { data: user, isLoading } = useCurrentUser();
  const updateMutation = useUpdateProfile();

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || user.first_name || user.username || '',
        email: user.email || '',
      });
    }
  }, [user]);

  if (isLoading) {
    return <div className="animate-pulse flex flex-col gap-6"><div className="h-32 bg-muted rounded-xl w-full" /></div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const isPending = updateMutation.isPending;

  return (
    <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Decorative Header */}
      <div className="flex items-center gap-6 p-6 rounded-xl border border-border/50 bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden backdrop-blur-sm">
        <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-3xl font-black text-primary-foreground shadow-xl ring-4 ring-background z-10">
           {formData.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className="z-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{user?.username}</h2>
          <p className="text-sm font-medium text-muted-foreground flex items-center gap-1 mt-1">
            <Shield className="w-3.5 h-3.5" /> Edge Node Administrator
          </p>
        </div>
        
        {/* Abstract Background Design */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute right-20 -bottom-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5"><User className="w-3.5 h-3.5"/> Full Name</label>
              <input
                required
                className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all shadow-sm"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> Email Address</label>
              <input
                required
                type="email"
                className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all shadow-sm"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="operator@upemba.local"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50 flex justify-end">
          <button
            type="submit"
            disabled={isPending || (formData.name === user?.name && formData.email === user?.email)}
            className="inline-flex items-center justify-center rounded-md text-sm font-bold transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
          >
           {isPending ? 'Syncing Profile...' : 'Save Changes'}
          </button>
        </div>
        
        {updateMutation.isSuccess && (
          <p className="text-sm text-green-500 text-right animate-pulse">Profile updated successfully. Navigation synced.</p>
        )}
      </form>
    </div>
  );
}
