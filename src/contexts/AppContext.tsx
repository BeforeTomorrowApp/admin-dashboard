import { useState, createContext } from "react";
import {
  getCountryAddressFormat,
  LOCALSTORAGE_KEY,
  type AddressFormat,
  type Language,
} from "@/consts/app-config";

// Types
interface AppContextType {
  language: Language;
  addressFormat: AddressFormat;
  updateLanguage: (newLanguage: Language) => void;
}

interface AppConfigLocalstorageType {
  language?: Language;
}

type AppConfigInfo = {
  language: Language;
  addressFormat: AddressFormat;
};

const DEFAULT_LANGUAGE: Language = "ZH";

// Check local AppConfig, if localStorage or field miss, fill default value
const updateLocalStorage = (newAppConfig: AppConfigLocalstorageType) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newAppConfig));
};
const localAppConfig: AppConfigLocalstorageType = JSON.parse(
  localStorage.getItem(LOCALSTORAGE_KEY) || "{}"
);
if (!localAppConfig["language"]) {
  localAppConfig["language"] = DEFAULT_LANGUAGE;
  updateLocalStorage(localAppConfig);
}
const languageConfig = localAppConfig["language"] as Language;
const addressFormat = getCountryAddressFormat(languageConfig);

// Create App context
const AppContext = createContext<AppContextType>({
  language: languageConfig,
  addressFormat: addressFormat,
  updateLanguage: () => {},
});

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
  // wrap region and address information into a single state to avoid
  // unnecessary re-renderings
  const [regionInfo, setRegionInfo] = useState<AppConfigInfo>({
    language: languageConfig,
    addressFormat: addressFormat,
  });

  const updateLanguage = (newLanguage: Language) => {
    setRegionInfo(() => ({
      language: newLanguage,
      addressFormat: getCountryAddressFormat(newLanguage),
    }));
    localAppConfig["language"] = newLanguage;
    updateLocalStorage(localAppConfig);
  };

  return (
    <AppContext.Provider
      value={{
        ...regionInfo,
        updateLanguage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
