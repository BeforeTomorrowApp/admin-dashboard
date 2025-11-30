import { render } from "@testing-library/react";
import AppContextProvider from "@/contexts/AppContextProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

export function renderWithProviders(children: React.ReactNode) {
  return render(
    <AppContextProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </AppContextProvider>
  );
}
