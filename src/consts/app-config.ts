// We currently only support these two regions. Will expand in the future
export type Language = "EN" | "ZH";
export type AddressFormat = "building-first" | "country-first";
export type CountryAddressFormat = Record<Language, AddressFormat>;

export function getCountryAddressFormat(language: Language): AddressFormat {
  switch (language) {
    case "ZH":
      return "country-first";
    case "EN":
      return "building-first";
    default:
      return "building-first";
  }
}
