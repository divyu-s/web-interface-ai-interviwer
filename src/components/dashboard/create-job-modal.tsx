"use client";

import * as React from "react";
import { X, Upload } from "lucide-react";
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
      <DialogContent className="sm:max-w-[779px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create new job opening</DialogTitle>
          <DialogDescription>Add job details</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic job details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0a0a0a]">
              Basic job details
            </h3>

            {/* Parse job documentation */}
            <div className="space-y-2">
              <Label>Parse job documentation</Label>
              <div className="border-2 border-dashed border-[#e5e5e5] rounded-lg p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-[#737373]" />
                  <p className="text-sm text-[#02563d]">
                    Drag and drop files here or{" "}
                    <span className="underline cursor-pointer">
                      click to upload
                    </span>
                  </p>
                  <p className="text-xs text-[#737373]">
                    Max file size is 500kb. Supported file types are .jpg and
                    .png.
                  </p>
                </div>
              </div>
              <div className="text-center text-sm text-[#737373]">or</div>
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="title">
                Job title <span className="text-neutral-950">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g. senior product manager"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e?.target?.value }))
                }
                className="shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]"
              />
            </div>

            {/* Domain, Job Level, User Type */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Domain</Label>
                <Select
                  value={formData.domain}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, domain: value }))
                  }
                >
                  <SelectTrigger className="w-full shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
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
                <Label>Job level</Label>
                <Select
                  value={formData.jobLevel}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, jobLevel: value }))
                  }
                >
                  <SelectTrigger className="w-full shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
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
                <Label>User type</Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, userType: value }))
                  }
                >
                  <SelectTrigger className="w-full shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Min experience <span className="text-neutral-950">*</span>
                </Label>
                <Select
                  value={formData.minExperience}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, minExperience: value }))
                  }
                >
                  <SelectTrigger className="w-full shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
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
                <Label>
                  Max experience <span className="text-neutral-950">*</span>
                </Label>
                <Select
                  value={formData.maxExperience}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, maxExperience: value }))
                  }
                >
                  <SelectTrigger className="w-full shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">
                  Job description <span className="text-neutral-950">*</span>
                </Label>
                <button
                  type="button"
                  className="text-sm text-[#02563d] underline hover:text-[#02563d]/80"
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
                className="min-h-[80px] shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]"
              />
            </div>

            {/* No. of openings, Attachment, Job status */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>No. of openings</Label>
                <Select
                  value={formData.noOfOpenings}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, noOfOpenings: value }))
                  }
                >
                  <SelectTrigger className="w-full shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
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
                <Label>Attachment</Label>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full justify-start shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]"
                >
                  Choose file
                </Button>
              </div>

              <div className="space-y-2">
                <Label>
                  Job status <span className="text-neutral-950">*</span>
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-full shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
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
              <Label htmlFor="skills">
                Required skills <span className="text-neutral-950">*</span>
              </Label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] min-h-[36px]">
                {formData.skills?.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="flex items-center gap-1 pr-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 hover:bg-[rgba(0,0,0,0.1)] rounded-full p-0.5"
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
                  className="flex-1 min-w-[120px] border-0 shadow-none focus-visible:ring-0 p-0 h-auto"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Create job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
