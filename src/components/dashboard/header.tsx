"use client";

import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName?: string;
}

export function DashboardHeader({ userName = "Rahul" }: DashboardHeaderProps) {
  return (
    <header className="h-[72px] bg-[rgba(255,255,255,0.8)] backdrop-blur-sm border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between px-8">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-bold text-black leading-7">
          Hello {userName} !
        </h1>
        <p className="text-xs text-black leading-4">
          Manage your job openings and hiring pipeline
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 h-9">
        <Button
          variant="secondary"
          size="default"
          className="h-9 px-4 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        >
          Create job
        </Button>

        <Button
          variant="default"
          size="default"
          className="h-9 px-4 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] bg-[#02563d] hover:bg-[#02563d]/90"
        >
          <Plus className="w-4 h-4" />
          Create interview
        </Button>

        <button className="p-0 hover:bg-[rgba(0,0,0,0.05)] rounded-lg transition-colors">
          <Bell className="w-6 h-6 text-[#02563d]" strokeWidth={1.5} />
        </button>

        {/* User Avatar */}
        <div className="px-1">
          <div className="w-9 h-9 bg-[rgba(2,86,61,0.1)] rounded-full flex items-center justify-center">
            <span className="text-sm font-normal text-[#02563d] tracking-[-0.15px]">
              JD
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
