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
        <h1 className="text-xl font-bold text-black">Hello {userName} !</h1>
        <p className="text-xs text-black">
          Manage your job openings and hiring pipeline
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button variant="secondary" size="default">
          Create job
        </Button>

        <Button variant="default" size="default">
          <Plus className="w-4 h-4" />
          Create interview
        </Button>

        <button className="p-2 hover:bg-[rgba(0,0,0,0.05)] rounded-lg transition-colors">
          <Bell className="w-6 h-6 text-[#02563d]" />
        </button>

        {/* User Avatar */}
        <div className="w-9 h-9 bg-[rgba(2,86,61,0.1)] rounded-full flex items-center justify-center">
          <span className="text-sm font-normal text-[#02563d]">JD</span>
        </div>
      </div>
    </header>
  );
}

