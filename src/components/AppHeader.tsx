import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { SidebarTrigger } from "./ui/sidebar";

export default function AppHeader() {
  const { language } = useContext(AppContext);
  return (
    <header className="w-full flex items-center">
      <SidebarTrigger />
      <h3>{language}</h3>
    </header>
  );
}
