import type { ReactNode } from "react";
import {
  type GeneratedAddressSchema,
  type AddressItemSchema,
} from "@/schemas/address-schema";
import TagBadge from "@/components/address/TagBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AddressCardProps = {
  addressItem: GeneratedAddressSchema;
  actions: ReactNode;
};

// Address will be in the international format
// because the user will send the letter to the person in different country/era
const formatAddressLines = (addressItem: AddressItemSchema) => {
  const lines = [];
  const { line1, line2, city, country, buildingName, postalCode, region } =
    addressItem.address;
  if (buildingName) lines.push(buildingName);
  lines.push(line1);
  if (line2) lines.push(line2);
  lines.push([city, region, postalCode].filter(Boolean).join(", "));
  lines.push(country);
  return lines;
};

export default function AddressCard({ addressItem, actions }: AddressCardProps) {
  const addressLines = formatAddressLines(addressItem as AddressItemSchema);

  return (
    <Card className="gap-3 p-2.5 h-full">
      <CardHeader className="px-1">
        <CardTitle className="w-full flex justify-between gap-2 items-center">
          <p>{addressItem.name}</p>
          {actions}
        </CardTitle>
        <CardDescription className="text-xs text-primary/50">
          {addressItem.briefIntro}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-1">
        <div className="text-sm text-primary/60">
          {addressLines.map((line) => {
            return <p key={`${addressItem.id}-${line}`}>{line}</p>;
          })}
        </div>
        <div className="flex flex-wrap gap-1">
          {addressItem.tags.map((tag) => (
            <TagBadge key={`${addressItem.id}-${tag}`} value={tag} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
