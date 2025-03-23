import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSearchParams } from "@remix-run/react";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { groupedRegions } from "../types/aws";
import { CheckIcon } from "lucide-react";
import { cn } from "~/lib/utils";

export default function SelectRegion() {
  const DEFAULT_REGION = "ap-southeast-1";
  const [open, setOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentRegion = searchParams.get("region");
  const detail = searchParams.get("detail");

  const queryParam = React.useMemo(() => {
    const params = new URLSearchParams();
    params.set("region", currentRegion || DEFAULT_REGION);
    return params.toString();
  }, [detail, currentRegion]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentRegion}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search region..." className="h-9" />
          <CommandEmpty>No region found.</CommandEmpty>
          <CommandList>
            {groupedRegions.map((area) => (
              <CommandGroup heading={area.area} key={area.key}>
                {area.regions.map((region) => (
                  <CommandItem
                    key={region.value}
                    value={region.value}
                    onSelect={(currentValue) => {
                      setOpen(false);
                      setSearchParams((prev) => {
                        prev.set("region", currentValue);
                        return prev;
                      });
                    }}
                  >
                    {region.value}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        currentRegion === region.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
