"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import {
  ChartColumn,
  Briefcase,
  CircleUser,
  FileText,
  Users,
  CreditCard,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: ChartColumn },
  { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
  {
    name: "AI Interviewers",
    href: "/dashboard/interviewers",
    icon: CircleUser,
  },
  { name: "Interviews", href: "/dashboard/interviews", icon: FileText },
  { name: "Role Management", href: "/dashboard/role-management", icon: Users },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-[rgba(0,0,0,0.1)] flex flex-col">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-[rgba(0,0,0,0.1)]">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pt-4">
        <div className="flex flex-col gap-1">
          {navigation?.map((item: any) => {
            const isActive = pathname === item?.href;
            const Icon = item?.icon;

            return (
              <Link
                key={item?.name}
                href={item?.href}
                className={cn(
                  "flex items-center gap-3 px-4 h-12 rounded-[10px] text-base transition-colors",
                  isActive
                    ? "bg-[rgba(2,86,61,0.1)] text-[#02563d]"
                    : "text-[#737373] hover:bg-[rgba(0,0,0,0.05)]"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="tracking-tight">{item?.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
