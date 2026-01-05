"use client";

import { useState, useEffect } from "react";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface JobFilterState {
  status: string[];
}

interface JobFilterDropdownProps {
  onApplyFilters: (filters: JobFilterState) => void;
  initialFilters?: JobFilterState;
}

export function JobFilterDropdown({
  onApplyFilters,
  initialFilters = { status: [] },
}: JobFilterDropdownProps) {
  const [tempFilters, setTempFilters] =
    useState<JobFilterState>(initialFilters);
  const [open, setOpen] = useState(false);

  // Sync tempFilters with initialFilters when they change
  useEffect(() => {
    setTempFilters(initialFilters);
  }, [initialFilters]);

  const handleFilterChange = (type: "status", value: string) => {
    setTempFilters((prev) => {
      const current = prev[type];
      if (current.includes(value)) {
        return {
          ...prev,
          [type]: current.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [type]: [...current, value],
        };
      }
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(tempFilters);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="h-9 px-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        >
          <ListFilter className="w-4 h-4" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[207px] p-0 shadow-md border border-[#e5e5e5] rounded-md overflow-hidden"
      >
        <div>
          {/* Status Filter Section */}
          <div className="py-[6px]">
            <DropdownMenuLabel className="px-[8px] py-[6px] text-xs font-semibold text-[#0A0A0A] tracking-[0.5px] leading-[16px]">
              Status
            </DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={tempFilters.status.includes("Active")}
              onCheckedChange={() => handleFilterChange("status", "Active")}
              onSelect={(e) => e.preventDefault()}
              className="pl-8 pr-2 py-[6px] text-sm text-[#1a1a1a] leading-[20px] hover:bg-[#f5f5f5] rounded-sm cursor-pointer data-highlighted:bg-[#f5f5f5] focus:bg-[#f5f5f5]"
            >
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={tempFilters.status.includes("Closed")}
              onCheckedChange={() => handleFilterChange("status", "Closed")}
              onSelect={(e) => e.preventDefault()}
              className="pl-8 pr-2 py-[6px] text-sm text-[#1a1a1a] leading-[20px] hover:bg-[#f5f5f5] rounded-sm cursor-pointer data-highlighted:bg-[#f5f5f5] focus:bg-[#f5f5f5]"
            >
              Closed
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={tempFilters.status.includes("Draft")}
              onCheckedChange={() => handleFilterChange("status", "Draft")}
              onSelect={(e) => e.preventDefault()}
              className="pl-8 pr-2 py-[6px] text-sm text-[#1a1a1a] leading-[20px] hover:bg-[#f5f5f5] rounded-sm cursor-pointer data-highlighted:bg-[#f5f5f5] focus:bg-[#f5f5f5]"
            >
              Draft
            </DropdownMenuCheckboxItem>
          </div>
        </div>

        {/* Apply Filters Button */}
        <div className="border-t border-[#e5e5e5] bg-[#fafafa]">
          <div className="p-[4px]">
            <Button
              variant="ghost"
              className="w-full h-9 justify-center text-[#02563d] hover:text-[#02563d] hover:bg-[#02563d]/5 active:bg-[#02563d]/10 font-medium text-sm rounded-sm transition-colors"
              onClick={handleApplyFilters}
            >
              Apply filters
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
