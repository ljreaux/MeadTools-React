"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { de, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";

export function DatePickerWithRange({
  className,
  date,
  setDate,
}: React.HTMLAttributes<HTMLDivElement> & {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}) {
  const { i18n } = useTranslation();
  const defaultLocale = i18n.resolvedLanguage?.includes("de") ? de : enUS;
  let loc = enUS;
  const { options, localize, formatLong } = defaultLocale;
  if (options && localize && formatLong) {
    loc = {
      ...enUS,
      options,
      localize,
      formatLong,
    };
  }
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"secondary"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "P", { locale: loc })} -{" "}
                  {format(date.to, "P", { locale: loc })}
                </>
              ) : (
                format(date.from, "P", { locale: loc })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={loc}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
