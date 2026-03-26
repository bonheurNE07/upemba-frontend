"use client";

import { useEffect, useState } from "react";
import { useFormatter } from "next-intl";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlobalHealthLeds } from "./telemetry/GlobalHealthLeds";

export function TopNav() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme, setTheme } = useTheme();
  const format = useFormatter();

  // Mathematically protect against Next 16 Server-Client Hydration payload mismatches natively
  useEffect(() => {
    setMounted(true);
    // Explicitly sync the Edge UI clock cleanly every 60 seconds
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-4 h-10">
         <div className="w-40 h-4 bg-muted animate-pulse rounded-md" />
         <div className="w-10 h-10 bg-muted animate-pulse rounded-md" />
      </div>
    );
  }

  // Gracefully orchestrate cycle logic traversing Dark -> Light -> System sequentially
  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <GlobalHealthLeds />
      
      {/* Natively utilize next-intl to format live dates adapting securely to EN/FR locales */}
      <div className="hidden sm:flex items-center text-sm font-bold tracking-wider text-muted-foreground mr-2 capitalize">
        {format.dateTime(currentTime, {
          year: "numeric", 
          month: "short", 
          day: "2-digit",
          hour: "2-digit", 
          minute: "2-digit",
          hour12: false // Strict military tracking for Edge Telemetry displays
        })}
      </div>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={toggleTheme}
        className="w-10 h-10 rounded-md border-border/40 bg-background/50 hover:bg-accent shadow-sm transition-all duration-300"
        title="Cycle Operational Theme"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5 text-primary transition-all animate-in fade-in" />
        ) : theme === "light" ? (
          <Sun className="h-5 w-5 text-amber-500 transition-all animate-in fade-in" />
        ) : (
          <Monitor className="h-5 w-5 text-muted-foreground transition-all animate-in fade-in" />
        )}
        <span className="sr-only">Toggle theme protocol</span>
      </Button>
    </div>
  );
}
