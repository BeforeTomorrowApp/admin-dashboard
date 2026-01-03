import type { PropsWithChildren } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export type PopoverOption = {
  label: string;
  fn: () => void;
};

type PopoverMenuProps = {
  id: string;
  options: PopoverOption[];
} & PropsWithChildren;

export function PopoverMenu({ id, options, ...props }: PopoverMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent className="address-component__popover__body w-22">
        {options.map((item) => {
          return (
            <PopoverClose key={id + item.label} asChild>
              <Button
                variant="ghost"
                size={"sm"}
                onClick={() => item.fn()}
                className="address-component__popover__body__button text-xs"
              >
                {item.label}
              </Button>
            </PopoverClose>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
