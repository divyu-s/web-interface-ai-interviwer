"use client";

import * as React from "react";
import { X, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
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

interface EditJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: EditJobFormData) => void;
  initialData?: Partial<EditJobFormData>;
}

export interface EditJobFormData {
  title: string;
  industry: string;
  jobLevel: string;
  userType: string;
  minExperience: string;
  maxExperience: string;
  minSalary: string;
  maxSalary: string;
  description: string;
  attachment: File | null;
  status: string;
  skills: string[];
}

const industryOptions = [
  { value: "technical", label: "Technical" },
  { value: "engineering", label: "Engineering" },
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
  { value: "0", label: "0 years" },
  { value: "1", label: "1 year" },
  { value: "2", label: "2 years" },
  { value: "3", label: "3 years" },
  { value: "4", label: "4 years" },
  { value: "5", label: "5 years" },
  { value: "6", label: "6 years" },
  { value: "7", label: "7 years" },
  { value: "8", label: "8 years" },
  { value: "10", label: "10+ years" },
];

const salaryOptions = [
  { value: "5", label: "5 LPA" },
  { value: "8", label: "8 LPA" },
  { value: "10", label: "10 LPA" },
  { value: "12", label: "12 LPA" },
  { value: "15", label: "15 LPA" },
  { value: "20", label: "20 LPA" },
  { value: "25", label: "25 LPA" },
  { value: "30", label: "30 LPA" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "closed", label: "Closed" },
];

export function EditJobModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: EditJobModalProps) {
  const [formData, setFormData] = React.useState<EditJobFormData>({
    title: initialData?.title || "Senior product manager",
    industry: initialData?.industry || "technical",
    jobLevel: initialData?.jobLevel || "senior",
    userType: initialData?.userType || "full-time",
    minExperience: initialData?.minExperience || "5",
    maxExperience: initialData?.maxExperience || "8",
    minSalary: initialData?.minSalary || "10",
    maxSalary: initialData?.maxSalary || "12",
    description:
      initialData?.description ||
      "Lead product strategy, manage end-to-end lifecycle, align cross-functional teams, define roadmaps, drive feature delivery, analyze market needs, optimize user experience, and ensure successful product outcomes to support business growth.",
    attachment: null,
    status: initialData?.status || "",
    skills: initialData?.skills || ["Collaboration", "Problem solving"],
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
        <DialogHeader className="gap-0">
          <DialogTitle className="text-lg font-semibold text-[#0a0a0a]">
            Edit job details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic job details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#0a0a0a]">
              Basic job details
            </h3>

            {/* Parse job documentation */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-[#000000]">
                Parse job documentation
              </Label>
              <div className="border border-dashed border-[#d1d1d1] rounded bg-transparent h-[114px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 px-4 py-8">
                  <p className="text-sm text-[#02563d] text-center leading-5">
                    Drag and drop files here or
                    <br />
                    <span className="cursor-pointer">click to upload</span>
                  </p>
                  <p className="text-xs text-[#747474] text-center">
                    Max file size is 500kb. Supported file types are .jpg and
                    .png.
                  </p>
                </div>
              </div>
            </div>

            {/* Or divider */}
            <div className="flex items-center gap-2.5">
              <div className="flex-1 h-px bg-[#e5e5e5]" />
              <span className="text-sm text-[#737373]">or</span>
              <div className="flex-1 h-px bg-[#e5e5e5]" />
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-[#0a0a0a]"
              >
                Job title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e?.target?.value }))
                }
                className="h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]"
              />
            </div>

            {/* Industry, Job Level, User Type */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a]">
                  Industry
                </Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, industry: value }))
                  }
                >
                  <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {industryOptions?.map((option) => (
                      <SelectItem key={option?.value} value={option?.value}>
                        {option?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a]">
                  Job level
                </Label>
                <Select
                  value={formData.jobLevel}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, jobLevel: value }))
                  }
                >
                  <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
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
                <Label className="text-sm font-medium text-[#0a0a0a]">
                  User type
                </Label>
                <Select
                  value={formData.userType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, userType: value }))
                  }
                >
                  <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
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

            {/* Experience Range and Salary Range - Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Experience Range */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-[#0a0a0a]">
                  Experience range
                </Label>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-2">
                    <Label className="text-xs font-normal text-[#404040]">
                      Min
                    </Label>
                    <Select
                      value={formData.minExperience}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          minExperience: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
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
                    <Label className="text-xs font-normal text-[#404040]">
                      Max
                    </Label>
                    <Select
                      value={formData.maxExperience}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          maxExperience: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
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
              </div>

              {/* Salary Range */}
              <div className="space-y-2.5">
                <Label className="text-sm font-medium text-[#0a0a0a]">
                  Salary Range
                </Label>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-2">
                    <Label className="text-xs font-normal text-[#404040]">
                      Min
                    </Label>
                    <Select
                      value={formData.minSalary}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, minSalary: value }))
                      }
                    >
                      <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {salaryOptions?.map((option) => (
                          <SelectItem key={option?.value} value={option?.value}>
                            {option?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-normal text-[#404040]">
                      Max
                    </Label>
                    <Select
                      value={formData.maxSalary}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, maxSalary: value }))
                      }
                    >
                      <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {salaryOptions?.map((option) => (
                          <SelectItem key={option?.value} value={option?.value}>
                            {option?.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-[#0a0a0a]"
                >
                  Job description
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
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e?.target?.value,
                  }))
                }
                className="min-h-[80px] shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] text-[#737373]"
              />
            </div>

            {/* Attachment and Job Status */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a]">
                  Attachment
                </Label>
                <div className="h-9 border border-[#e5e5e5] rounded-md shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] bg-white px-3 flex items-center">
                  <button
                    type="button"
                    className="text-sm font-medium text-[#0a0a0a] px-1.5 py-px"
                  >
                    Choose file
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#0a0a0a]">
                  Job status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)]">
                    <SelectValue placeholder="Select" />
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
                className="text-sm font-medium text-[#0a0a0a]"
              >
                Required skills
              </Label>
              <div className="flex flex-wrap gap-1 p-2 border border-[#e5e5e5] rounded-md shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] min-h-[36px] bg-white">
                {formData.skills?.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="flex items-center gap-0.5 h-[18px] bg-[#e5e5e5] text-[#000000] text-xs font-normal rounded-full px-2 py-0"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-0.5 hover:bg-[rgba(0,0,0,0.1)] rounded-full p-px"
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

          {/* Footer */}
          <div className="flex justify-end">
            <Button type="submit" className="h-9">
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
