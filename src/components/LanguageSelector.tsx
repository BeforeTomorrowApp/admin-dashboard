import { SUPPORTED_LANGUAGES, type Language } from "@/consts/app-config";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function LanguageSelector() {
  const { language, updateLanguage } = useContext(AppContext);
  return (
    <section className="flex items-center justify-center gap-2">
      <Label>Service Language</Label>
      <Select
        defaultValue={language}
        onValueChange={(value) => updateLanguage(value as Language)}
      >
        <SelectTrigger className="w-20 focus-visible:ring-0">
          <SelectValue>{language}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {SUPPORTED_LANGUAGES.map((language) => {
            return (
              <SelectItem key={`language-selector-${language}`} value={language}>
                {language}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </section>
  );
}
