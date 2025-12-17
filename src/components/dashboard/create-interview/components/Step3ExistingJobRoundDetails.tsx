import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { InterviewFormData } from "../types";
import {
  DURATION_OPTIONS,
  LANGUAGE_OPTIONS,
  MOCK_INTERVIEWERS,
  MOCK_EXISTING_JOBS,
  MOCK_ROUNDS,
} from "../constants";

interface Step3ExistingJobRoundDetailsProps {
  formData: InterviewFormData;
  onFieldChange: <K extends keyof InterviewFormData>(
    field: K,
    value: InterviewFormData[K]
  ) => void;
}

export const Step3ExistingJobRoundDetails = ({
  formData,
  onFieldChange,
}: Step3ExistingJobRoundDetailsProps) => {
  const selectedJob = MOCK_EXISTING_JOBS.find(
    (job) => job.id === formData.selectedJobId
  );
  const selectedRound = MOCK_ROUNDS.find(
    (round) => round.value === formData.selectedRoundId
  );

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-bold text-[#0a0a0a] leading-none">
        Interview configuration
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
            Selected job opening
          </Label>
          <div className="px-3 py-2 bg-[#f5f5f5] rounded border border-[#e5e5e5] text-sm text-[#0a0a0a]">
            {selectedJob?.title || "Not selected"}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
            Selected interview round
          </Label>
          <div className="px-3 py-2 bg-[#f5f5f5] rounded border border-[#e5e5e5] text-sm text-[#0a0a0a]">
            {selectedRound?.label || "Not selected"}
          </div>
        </div>

        <div className="flex gap-[10px]">
          <div className="flex-1 flex flex-col gap-2">
            <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
              Duration <span className="text-[#0a0a0a]">*</span>
            </Label>
            <Select
              value={formData.duration}
              onValueChange={(value) => onFieldChange("duration", value)}
            >
              <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] border-[#e5e5e5]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {DURATION_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
              Language <span className="text-[#0a0a0a]">*</span>
            </Label>
            <Select
              value={formData.language}
              onValueChange={(value) => onFieldChange("language", value)}
            >
              <SelectTrigger className="w-full h-9 shadow-[0px_1px_2px_0px_rgba(2,86,61,0.12)] border-[#e5e5e5]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-sm font-medium text-[#0a0a0a] leading-none">
            Select Interviewer
          </Label>
          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="border border-dashed border-[#d1d1d1] rounded p-1 flex flex-col items-center gap-1 w-[70px] h-[98px]"
            >
              <div className="flex flex-col gap-1 h-[90px] items-center">
                <div className="bg-[#e5e5e5] rounded w-[62px] h-[62px] relative">
                  <Plus className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-black" />
                </div>
                <p className="text-xs text-[#737373] leading-none text-center w-[62px]">
                  + Add new
                </p>
              </div>
            </button>
            {MOCK_INTERVIEWERS.map((interviewer) => (
              <button
                key={interviewer.id}
                type="button"
                onClick={() => onFieldChange("interviewerId", interviewer.id)}
                className={`border rounded p-1 flex flex-col items-center gap-1 w-[70px] h-[98px] transition-all ${
                  formData.interviewerId === interviewer.id
                    ? "border-[#02563d] bg-[#f0f5f2] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
                    : "border-[#d1d1d1]"
                }`}
              >
                <div className="flex flex-col gap-1 h-[90px] items-center">
                  <div className="relative rounded w-[62px] h-[62px] overflow-hidden">
                    <img
                      src={interviewer.image}
                      alt={interviewer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-[#737373] leading-none text-center w-[62px]">
                    {interviewer.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
