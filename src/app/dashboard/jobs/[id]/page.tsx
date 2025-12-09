"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Building2, Clock, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  JobStatsGrid,
  type JobStat,
} from "@/components/dashboard/job-stats-card";
import { EditJobModal } from "@/components/dashboard/edit-job-modal";

// Mock job data - in real app this would come from an API
const mockJobData = {
  id: "1",
  title: "Senior Product Manager",
  status: "active" as const,
  department: "Engineering",
  type: "Full-time",
  postedDate: "Nov 15, 2025",
  description:
    "We are looking for an experienced product manager to join our team and help build amazing user experiences. We are looking for an experienced product manager to join our team and help build amazing user experiences.",
  skills: ["Collaboration", "Problem solving"],
  jobLevel: "Senior",
  userType: "Full-time",
  experience: "5-8 years",
  salaryRange: "10 LPA - 12 LPA",
};

const stats: JobStat[] = [
  { label: "Total Applicants", value: 143, icon: "applicants" },
  { label: "In screening", value: 90, icon: "completed" },
  { label: "Final round", value: 7, icon: "hired" },
  { label: "Hired", value: 82.2, icon: "score" },
];

export default function JobDetailsPage() {
  const params = useParams();
  const [whatsappReminder, setWhatsappReminder] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // In real app, fetch job data based on params.id
  const job = mockJobData;

  return (
    <div className="space-y-8">
      {/* Job Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2.5">
          {/* Title + Badge */}
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-black leading-7">
              {job.title}
            </h1>
            <Badge className="bg-[#def2eb] text-[#0e4230] border-0 rounded-full px-2 h-6 text-xs font-normal hover:bg-[#def2eb]">
              Active
            </Badge>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 h-5">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4 text-[#45556c]" />
              <span className="text-sm text-[#45556c] leading-5">
                {job.department}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#45556c]" />
              <span className="text-sm text-[#45556c] leading-5">
                {job.type}
              </span>
            </div>
            <span className="text-sm text-[#45556c] leading-5">
              Posted {job.postedDate}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <Switch
              checked={whatsappReminder}
              onCheckedChange={setWhatsappReminder}
            />
            <span className="text-sm font-medium text-[#0a0a0a]">
              Whatsapp reminder
            </span>
          </div>
          <Button
            variant="secondary"
            className="h-9 px-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            Share
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <JobStatsGrid stats={stats} />

      {/* Main Content Card */}
      <div className="bg-white border border-[#e5e5e5] p-4 space-y-4">
        <Tabs defaultValue="details" className="w-full">
          {/* Tabs Header Row */}
          <div className="flex items-center justify-between">
            <TabsList className="bg-[#f5f5f5] h-9 p-[3px] rounded-[10px] w-[551px]">
              <TabsTrigger
                value="details"
                className="flex-1 h-[30px] rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Job details
              </TabsTrigger>
              <TabsTrigger
                value="rounds"
                className="flex-1 h-[30px] rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Rounds
              </TabsTrigger>
              <TabsTrigger
                value="applicants"
                className="flex-1 h-[30px] rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Applicants
              </TabsTrigger>
            </TabsList>

            <Button
              variant="default"
              className="h-9 px-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Edit job detils
            </Button>
          </div>

          {/* Job Details Tab Content */}
          <TabsContent value="details" className="mt-4">
            <div className="flex gap-8">
              {/* Left Column - Job Description & Skills */}
              <div className="flex-1 space-y-8">
                {/* Job Description Card */}
                <div className="bg-white rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] py-6 pl-6 pr-0">
                  <h3 className="text-base font-medium text-neutral-950 mb-3 leading-4 tracking-[-0.3px]">
                    Job Description
                  </h3>
                  <p className="text-base text-[#314158] leading-[26px] tracking-[-0.3px] max-w-[652px]">
                    {job.description}
                  </p>
                </div>

                {/* Skills Required Card */}
                <div className="bg-white rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] py-6 pl-6 pr-0">
                  <h3 className="text-base font-normal text-neutral-950 mb-3 leading-4 tracking-[-0.3px]">
                    Skills required
                  </h3>
                  <div className="space-y-2">
                    {job.skills?.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 h-6">
                        <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                        <span className="text-base text-[#314158] leading-6 tracking-[-0.3px]">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Job Information */}
              <div className="w-[372px] shrink-0">
                <div className="bg-white rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] h-[329px]">
                  {/* Card Title */}
                  <div className="px-6 pt-6 pb-0">
                    <h3 className="text-base font-normal text-neutral-950 leading-4 tracking-[-0.3px]">
                      Job Information
                    </h3>
                  </div>

                  {/* Card Content */}
                  <div className="px-6 pt-[30px] space-y-3">
                    {/* Job Level */}
                    <div className="space-y-1 h-10">
                      <p className="text-xs text-[#62748e] leading-4">
                        Job Level
                      </p>
                      <p className="text-sm text-neutral-950 leading-5 tracking-[-0.15px]">
                        {job.jobLevel}
                      </p>
                    </div>

                    <div className="h-px bg-slate-200" />

                    {/* User Type */}
                    <div className="space-y-1 h-10">
                      <p className="text-xs text-[#62748e] leading-4">
                        User Type
                      </p>
                      <p className="text-sm text-neutral-950 leading-5 tracking-[-0.15px]">
                        {job.userType}
                      </p>
                    </div>

                    <div className="h-px bg-slate-200" />

                    {/* Experience */}
                    <div className="space-y-1 h-10">
                      <p className="text-xs text-[#62748e] leading-4">
                        Experience
                      </p>
                      <p className="text-sm text-neutral-950 leading-5 tracking-[-0.15px]">
                        {job.experience}
                      </p>
                    </div>

                    <div className="h-px bg-slate-200" />

                    {/* Salary Range */}
                    <div className="space-y-1 h-10">
                      <p className="text-xs text-[#62748e] leading-4">
                        Salary range
                      </p>
                      <p className="text-sm text-neutral-950 leading-5 tracking-[-0.15px]">
                        {job.salaryRange}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Rounds Tab Content */}
          <TabsContent value="rounds" className="mt-4">
            <div className="bg-white rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] p-6">
              <p className="text-sm text-[#737373]">
                Interview rounds configuration will appear here.
              </p>
            </div>
          </TabsContent>

          {/* Applicants Tab Content */}
          <TabsContent value="applicants" className="mt-4">
            <div className="bg-white rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] p-6">
              <p className="text-sm text-[#737373]">
                Applicants list will appear here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Job Modal */}
      <EditJobModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        initialData={{
          title: job.title,
          industry: "technical",
          jobLevel: "senior",
          userType: "full-time",
          minExperience: "5",
          maxExperience: "8",
          minSalary: "10",
          maxSalary: "12",
          description: job.description,
          skills: job.skills,
        }}
        onSubmit={(data) => {
          console.log("Job updated:", data);
        }}
      />
    </div>
  );
}
