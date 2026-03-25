'use client';

import { useState } from 'react';
import { User, Palette, ShieldCheck } from 'lucide-react';
import { ProfileSettings } from '@/components/features/settings/ProfileSettings';
import { AppearanceSettings } from '@/components/features/settings/AppearanceSettings';
import { SecuritySettings } from '@/components/features/settings/SecuritySettings';

type SettingsTab = 'profile' | 'appearance' | 'security';

export default function SettingsDashboardPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Metrics', icon: <User className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
    { id: 'security', label: 'Account Security', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-6xl w-full flex flex-col pt-2">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          System Configuration
        </h1>
        <p className="text-muted-foreground mt-1.5 tracking-wide">
          Manage your operational profile, environment aesthetics, and account security.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start mt-4">
        
        {/* SettingsSidebar (inline for tight coupling) */}
        <aside className="w-full md:w-64 shrink-0 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          <nav className="flex md:flex-col gap-1.5 md:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-md ring-1 ring-primary/50'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Dynamic Pane Renderer */}
        <main className="flex-1 min-w-0 w-full">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'security' && <SecuritySettings />}
        </main>

      </div>
    </div>
  );
}
