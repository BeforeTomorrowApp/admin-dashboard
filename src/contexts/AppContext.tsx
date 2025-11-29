import { useState, createContext } from "react";
import {
  getCountryAddressFormat,
  type AddressFormat,
  type Language,
} from "@/consts/app-config";

interface AppContextType {
  language: Language;
  addressFormat: AddressFormat;
  updateRegion: (newLanguage: Language) => void;
}

type AppConfigInfo = {
  language: Language;
  addressFormat: AddressFormat;
};

// first check the localStorage, if exists, set service region, else default CN
const DEFAULT_LANGUAGE: Language = "ZH";
const DEFAULT_ADDRESS_FORMAT: AddressFormat = getCountryAddressFormat(DEFAULT_LANGUAGE);

// service region content
const AppContext = createContext<AppContextType>({
  language: DEFAULT_LANGUAGE,
  addressFormat: DEFAULT_ADDRESS_FORMAT,
  updateRegion: () => {},
});

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
  // wrap region and address information into a single state to avoid
  // unnecessary re-renderings
  const [regionInfo, setRegionInfo] = useState<AppConfigInfo>({
    language: DEFAULT_LANGUAGE,
    addressFormat: DEFAULT_ADDRESS_FORMAT,
  });

  const updateRegion = (newLanguage: Language) => {
    setRegionInfo(() => ({
      language: newLanguage,
      addressFormat: getCountryAddressFormat(newLanguage),
    }));
  };

  return (
    <AppContext.Provider
      value={{
        ...regionInfo,
        updateRegion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
