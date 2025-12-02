"use client";

import * as React from "react";
import { useFormikContext, getIn, FormikValues } from "formik";
import { Check, ChevronsUpDown, X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CustomMultiSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

/**
 * ✅ Multi-select using shadcn components
 * ✅ Works with Formik
 * ✅ Keeps values not in options
 */
export default function CustomMultiSelect({
  name,
  label,
  placeholder = "Select options...",
  options,
}: CustomMultiSelectProps) {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<FormikValues>();

  const [open, setOpen] = React.useState(false);

  const value: string[] = getIn(values, name) || [];
  const error = getIn(errors, name);
  const isTouched = getIn(touched, name);

  const missingValues = value.filter(
    (v) => !options.some((opt) => opt.value === v)
  );

  const allOptions = [
    ...options,
    ...missingValues.map((v) => ({ value: v, label: v })),
  ];

  const toggleValue = (v: string) => {
    if (value.includes(v)) {
      setFieldValue(
        name,
        value.filter((val) => val !== v)
      );
    } else {
      setFieldValue(name, [...value, v]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <p className="text-sm font-medium text-gray-700">{label}</p>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full justify-between h-fit min-h-[39px] text-left",
              isTouched && error ? "border-destructive" : ""
            )}
          >
            <div className="flex flex-wrap gap-1 items-center">
              {value.length > 0 ? (
                value.map((v) => (
                  <Badge
                    key={v}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {allOptions.find((o) => o.value === v)?.label || v}
                    <X
                      size={12}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleValue(v);
                      }}
                    />
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown size={16} className="opacity-50 shrink-0 ml-2" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {allOptions.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={() => toggleValue(opt.value)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      value.includes(opt.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50"
                    )}
                  >
                    {value.includes(opt.value) && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {isTouched && error && (
        <p className="text-sm text-destructive mt-0.5">{error}</p>
      )}
    </div>
  );
}
