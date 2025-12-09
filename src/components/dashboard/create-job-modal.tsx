"use client";

import * as React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface CreateJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: JobFormData) => void;
}

export interface JobFormData {
  title: string;
  domain: string;
  jobLevel: string;
  userType: string;
  minExperience: string;
  maxExperience: string;
  description: string;
  noOfOpenings: string;
  attachment: File | null;
  status: string;
  skills: string[];
}

const domainOptions = [
  { value: "engineering", label: "Engineering" },
  { value: "technical", label: "Technical" },
  { value: "product", label: "Product" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "hr", label: "Human Resources" },
];

const jobLevelOptions = [
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead" },
  { value: "manager", label: "Manager" },
  { value: "director", label: "Director" },
];

const userTypeOptions = [
  { value: "full-time", label: "Full time" },
  { value: "part-time", label: "Part time" },
  { value: "contract", label: "Contract" },
  { value: "intern", label: "Intern" },
];

const experienceOptions = [
  { value: "0", label: "0 year" },
  { value: "1", label: "1 year" },
  { value: "2", label: "2 years" },
  { value: "3", label: "3 years" },
  { value: "4", label: "4 years" },
  { value: "5", label: "5 years" },
  { value: "6", label: "6 years" },
  { value: "7", label: "7 years" },
  { value: "8", label: "8+ years" },
];

const openingsOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "10", label: "10" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "closed", label: "Closed" },
];

export function CreateJobModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateJobModalProps) {
  const [formData, setFormData] = React.useState<JobFormData>({
    title: "",
    domain: "",
    jobLevel: "",
    userType: "",
    minExperience: "",
    maxExperience: "",
    description: "",
    noOfOpenings: "",
    attachment: null,
    status: "active",
    skills: [],
  });

  const [skillInput, setSkillInput] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    onOpenChange(false);
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()],
        }));
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[779px] max-h-[90vh] overflow-y-auto p-6 gap-4">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-lg font-semibold text-[#0a0a0a] leading-none">
            Create new job opening
          </DialogTitle>
          <DialogDescription className="text-sm text-[#737373] leading-5">
            Add job details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic job details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0a0a0a] leading-none">
              Basic job details
            </h3>

            {/* Parse job documentation */}
            <div className="space-y-2">
              <Label className="font-semibold text-sm text-[#000000]">
                Parse job documentation
              </Label>
              <div className="border border-dashed border-[#d1d1d1] rounded bg-transparent h-[114px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
                  <p className="text-sm text-[#02563d] leading-5 w-[188px]">
                    Drag and drop files here or click to upload
                  </p>
                  <p className="text-xs text-[#747474] leading-none">
                    Max file size is 500kb. Supported file types are .jpg and
                    .png.
                  </p>
                </div>
              </div>
            </div>

            {/* Or divider */}
            <div className="flex items-center justify-center gap-2.5 w-full">
              <div className="flex-1 h-px bg-[#e5e5e5]" />
              <span className="text-sm text-[#737373] leading-none">or</span>
              <div className="flex-1 h-px bg-[#e5e5e5]" />
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-[#0a0a0a] leading-none"
              >
                Job title <span className="text-red-700">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g. senior product manager"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e?.target?.value }))
                }
                className="h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] border-[#e5e5e5]"
              />
            </div>

            {/* Domain, Job Level, User Type */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
                  Domain
                </Label>
                <Select
                  value={formData.domain}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, domain: value }))
                  }
                >
                  <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] border-[#e5e5e5]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {domainOptions?.map((option) => (
                      <SelectItem key={option?.value} value={option?.value}>
                        {option?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
                  Job level
                </Label>
                <Select
                  value={formData.jobLevel}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, jobLevel: value }))
                  }
                >
                  <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] border-[#e5e5e5]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobLevelOptions?.map((option) => (
                      <SelectItem key={option?.value} value={option?.value}>
                        {option?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
                  User type
                </Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, userType: value }))
                  }
                >
                  <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] border-[#e5e5e5]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypeOptions?.map((option) => (
                      <SelectItem key={option?.value} value={option?.value}>
                        {option?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Min/Max Experience */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
                  Min experience <span className="text-red-700">*</span>
                </Label>
                <Select
                  value={formData.minExperience}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, minExperience: value }))
                  }
                >
                  <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] border-[#e5e5e5]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceOptions?.map((option) => (
                      <SelectItem key={option?.value} value={option?.value}>
                        {option?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
                  Max experience <span className="text-red-700">*</span>
                </Label>
                <Select
                  value={formData.maxExperience}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, maxExperience: value }))
                  }
                >
                  <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] border-[#e5e5e5]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceOptions?.map((option) => (
                      <SelectItem key={option?.value} value={option?.value}>
                        {option?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-[#0a0a0a] leading-none"
                >
                  Job description <span className="text-red-700">*</span>
                </Label>
                <button
                  type="button"
                  className="text-sm text-[#02563d] underline leading-none hover:text-[#02563d]/80 absolute right-0 top-0"
                >
                  Generate from AI
                </button>
              </div>
              <Textarea
                id="description"
                placeholder="Write a short description of the job"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e?.target?.value,
                  }))
                }
                className="min-h-[75px] shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] border-[#e5e5e5] resize-none"
              />
            </div>

            {/* No. of openings, Attachment, Job status */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
                  No. of openings
                </Label>
                <Select
                  value={formData.noOfOpenings}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, noOfOpenings: value }))
                  }
                >
                  <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] border-[#e5e5e5]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {openingsOptions?.map((option) => (
                      <SelectItem key={option?.value} value={option?.value}>
                        {option?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
                  Attachment
                </Label>
                <div className="h-9 bg-white border border-[#e5e5e5] rounded-lg shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] flex items-center px-3">
                  <button
                    type="button"
                    className="text-sm font-medium text-[#0a0a0a] px-1.5 py-px"
                  >
                    Choose file
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
                  Job status <span className="text-red-700">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] border-[#e5e5e5]">
                    <SelectValue placeholder="Active" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions?.map((option) => (
                      <SelectItem key={option?.value} value={option?.value}>
                        {option?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Required Skills */}
            <div className="space-y-2">
              <Label
                htmlFor="skills"
                className="text-sm font-medium text-[#0a0a0a] leading-none"
              >
                Required skills <span className="text-red-700">*</span>
              </Label>
              <div className="flex flex-wrap gap-1 p-3 border border-[#e5e5e5] rounded-lg shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] min-h-[36px] bg-white items-center">
                {formData.skills?.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="flex items-center gap-0.5 h-[18px] bg-[#e5e5e5] text-[#000000] text-xs font-normal tracking-[0.3px] rounded-full px-2 border-0"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-0.5 hover:bg-[rgba(0,0,0,0.1)] rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                <Input
                  id="skills"
                  placeholder={formData.skills.length === 0 ? "Add skills" : ""}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e?.target?.value)}
                  onKeyDown={handleAddSkill}
                  className="flex-1 min-w-[120px] border-0 shadow-none focus-visible:ring-0 p-0 h-auto text-sm"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-end">
            <Button
              type="submit"
              className="bg-[#02563d] hover:bg-[#02563d]/90 text-white h-9 px-4 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
              disabled={!formData.title}
            >
              Create job
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
