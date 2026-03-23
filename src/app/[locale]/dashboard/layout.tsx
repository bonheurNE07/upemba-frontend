import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/features/dashboard/AppSidebar";
import { TopNav } from "@/components/features/dashboard/TopNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col transition-all duration-300 ease-in-out bg-background relative">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/40 bg-background/95 backdrop-blur px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-2 hover:bg-primary/10 transition-colors" />
            <div className="hidden sm:flex items-center text-sm font-bold tracking-widest gap-2">
              <span className="text-foreground uppercase">UPEMBA</span>
              <span className="text-muted-foreground/40">//</span>
              <span className="text-muted-foreground uppercase">Edge Node</span>
            </div>
          </div>
          
          <TopNav />
        </header>
        
        <div className="flex-1 p-6 md:p-10">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
