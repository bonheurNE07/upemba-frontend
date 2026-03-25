'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

export function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 animate-pulse bg-muted rounded-xl" />;
  }

  const themeOptions = [
    { id: 'light', name: 'Light Mode', icon: <Sun className="w-6 h-6 mb-3 text-amber-500" />, desc: 'Optimized for daylight visibility in the field.' },
    { id: 'dark', name: 'Dark Mode', icon: <Moon className="w-6 h-6 mb-3 text-primary" />, desc: 'Sleek, low-light interface for command centers.' },
    { id: 'system', name: 'System Auto', icon: <Monitor className="w-6 h-6 mb-3 text-muted-foreground" />, desc: 'Syncs automatically with your OS preference.' },
  ];

  return (
    <div className="space-y-8 max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Interface Theme</h3>
          <p className="text-sm text-muted-foreground">Customize the visual appearance of the dashboard.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themeOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTheme(opt.id)}
              className={`flex flex-col items-start p-4 border rounded-xl transition-all duration-200 text-left ${
                theme === opt.id 
                  ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-md' 
                  : 'border-border/50 bg-background/50 hover:bg-muted/50 hover:border-border'
              }`}
            >
              {opt.icon}
              <span className="font-bold text-sm text-foreground">{opt.name}</span>
              <span className="text-xs text-muted-foreground mt-1 leading-relaxed">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
