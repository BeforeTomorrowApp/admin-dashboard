import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppContextProvider from "@/contexts/AppContextProvider";
import AppHeader from "@/components/AppHeader";

export default function AppLayout() {
  return (
    <AppContextProvider>
      <SidebarProvider>
        <nav>
          <AppSidebar />
        </nav>
        <main className="flex flex-col w-full">
          <AppHeader />
          <div className="flex-1">Body</div>
        </main>
      </SidebarProvider>
    </AppContextProvider>
  );
}
