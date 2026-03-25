'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/axios';
import { Lock, ShieldAlert, KeyRound } from 'lucide-react';

export function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setErrorMessage("New passwords do not match.");
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // Best-effort execution against standard dj-rest-auth endpoints
      // Could be /auth/password/change/ or /password/change/ depending on urls.py registration
      await apiClient.post('/users/change-password/', {
        old_password: currentPassword,
        new_password1: newPassword,
        new_password2: confirmPassword
      });
      setStatus('success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.response?.data?.detail || "An error occurred attempting to change your password. Please verify your current password.");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-start gap-4 p-4 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive backdrop-blur-sm">
        <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold">Account Security</h4>
          <p className="text-xs leading-relaxed opacity-90 mt-1">
            Changing your password will immediately terminate all active sessions across other devices. Ensure you use a strong alphanumeric combination.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Lock className="w-3.5 h-3.5"/> Current Password</label>
            <input
              required
              type="password"
              className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all shadow-sm"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5"><KeyRound className="w-3.5 h-3.5"/> New Password</label>
            <input
              required
              type="password"
              className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all shadow-sm"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5"><KeyRound className="w-3.5 h-3.5"/> Confirm New Password</label>
            <input
              required
              type="password"
              className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all shadow-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

        </div>

        {status === 'error' && (
          <p className="text-sm font-medium text-destructive animate-pulse">{errorMessage}</p>
        )}
        
        {status === 'success' && (
          <p className="text-sm font-medium text-green-500 animate-pulse">Password changed securely.</p>
        )}

        <div className="pt-4 border-t border-border/50 flex justify-end gap-3">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex items-center justify-center rounded-md text-sm font-bold transition-all bg-destructive text-destructive-foreground hover:bg-destructive/90 h-11 px-8 shadow-md hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
          >
           {status === 'loading' ? 'Authenticating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}
