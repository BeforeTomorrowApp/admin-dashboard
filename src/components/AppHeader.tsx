import { SidebarTrigger } from "@/components/ui/sidebar";
import LanguageSelector from "@/components/LanguageSelector";

export default function AppHeader() {
  return (
    <header className="w-full flex items-center">
      <SidebarTrigger />
      <LanguageSelector />
    </header>
  );
}
