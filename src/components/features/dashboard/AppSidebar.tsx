"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Activity, TerminalSquare, Cpu, Settings, LogOut, RadioTower } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();

  const navItems = [
    { title: t("telemetry"), url: "/dashboard", icon: Activity },
    { title: t("logs"), url: "/dashboard/logs", icon: TerminalSquare },
    { title: t("equipment"), url: "/dashboard/equipment", icon: Cpu },
  ];

  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-border/40 bg-background/50 backdrop-blur-md transition-all duration-300">
      <SidebarHeader className="h-16 flex justify-center border-b border-border/40 px-4 md:px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent cursor-default hover:bg-transparent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <RadioTower className="size-4 animate-pulse" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none px-2 overflow-hidden truncate">
                <span className="font-bold tracking-widest">{t("title")}</span>
                <span className="text-xs text-muted-foreground font-medium">{t("subtitle")}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="px-2 mt-6">
        <SidebarGroup>
          <SidebarMenu className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />} isActive={isActive} tooltip={item.title} className="h-10 transition-colors">
                    <item.icon className={isActive ? "text-primary shadow-sm" : "text-muted-foreground"} />
                    <span className={isActive ? "font-bold text-foreground" : "font-medium text-muted-foreground"}>
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4 space-y-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/dashboard/settings" />} tooltip={t("settings")} className="h-10 data-[active=true]:bg-sidebar-accent">
              <Settings className={pathname === "/dashboard/settings" ? "text-primary" : "text-muted-foreground"} />
              <span className={pathname === "/dashboard/settings" ? "font-bold" : "font-medium text-muted-foreground"}>
                {t("settings")}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={t("logout")} className="h-10 text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors">
              <LogOut className="text-destructive mt-0.5" />
              <span className="font-bold tracking-wide">{t("logout")}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
