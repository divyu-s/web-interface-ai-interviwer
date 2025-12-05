import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  Calendar,
  TrendingUp,
} from "lucide-react";

const quickStats = [
  { label: "Active Jobs", value: "12", icon: Briefcase, color: "bg-blue-50 text-blue-600" },
  { label: "Total Candidates", value: "248", icon: Users, color: "bg-green-50 text-green-600" },
  { label: "Interviews", value: "36", icon: Calendar, color: "bg-purple-50 text-purple-600" },
  { label: "Completed", value: "89%", icon: TrendingUp, color: "bg-orange-50 text-orange-600" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-black">Dashboard</h2>
        <p className="text-sm text-[#737373] mt-1">
          Overview of your hiring pipeline and activities
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-5"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-[10px] flex items-center justify-center ${stat.color.split(" ")[0]}`}
                >
                  <Icon className={`w-6 h-6 ${stat.color.split(" ")[1]}`} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-neutral-950">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#45556c]">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">
          Quick Actions
        </h3>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/dashboard/jobs">Create New Job</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/dashboard/interviews">Schedule Interview</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/dashboard/role-management">Manage Team</Link>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-[rgba(0,0,0,0.1)] rounded-lg p-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-[#fafafa] rounded-lg">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-950">
                New candidate application
              </p>
              <p className="text-xs text-[#737373]">
                John Doe applied for Senior Developer position
              </p>
            </div>
            <span className="text-xs text-[#737373]">2 hours ago</span>
          </div>

          <div className="flex items-center gap-4 p-3 bg-[#fafafa] rounded-lg">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-950">
                Interview completed
              </p>
              <p className="text-xs text-[#737373]">
                AI Interview with Sarah Johnson - Product Manager
              </p>
            </div>
            <span className="text-xs text-[#737373]">5 hours ago</span>
          </div>

          <div className="flex items-center gap-4 p-3 bg-[#fafafa] rounded-lg">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-950">
                New job posted
              </p>
              <p className="text-xs text-[#737373]">
                UX Designer - Remote position published
              </p>
            </div>
            <span className="text-xs text-[#737373]">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

