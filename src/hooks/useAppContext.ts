import { useContext } from "react";
import { AppContext } from "@/contexts/AppContextProvider";

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
