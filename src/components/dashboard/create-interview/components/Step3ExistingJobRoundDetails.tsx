import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy, Users } from "lucide-react";
import type { InterviewFormData } from "../types";
import { useState } from "react";
import { ShareInterviewLinkModal } from "./ShareInterviewLinkModal";

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
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Get actual data from formData or use defaults
  const interviewData = {
    roundType: formData.roundType || "Behavioural",
    jobTitle: formData.jobTitle || "Senior product manager",
    duration: formData.duration || "45min.",
    interviewLink: `https://yourcompany.com/interview/INT-${Date.now()}`,
  };

  const handleCopyLink = async () => {
    if (interviewData.interviewLink) {
      try {
        await navigator.clipboard.writeText(interviewData.interviewLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-[#e0f2f1] shrink-0 mb-6">
          <CheckCircle2
            className="w-10 h-10 text-[#267e6b]"
            strokeWidth={2.5}
          />
        </div>

        {/* Main Heading */}
        <div className="mb-4">
          <h2 className="text-[24px] font-bold text-[#0a0a0a] leading-[1.2]">
            Success! Your AI interview has been created.
          </h2>
        </div>

        {/* Descriptive Text */}
        <p className="text-sm text-[#737373] leading-5 max-w-md mb-6">
          We've prepared the{" "}
          <span className="font-bold text-[#0a0a0a]">
            {interviewData.roundType}
          </span>{" "}
          round for{" "}
          <span className="font-bold text-[#0a0a0a]">
            {interviewData.jobTitle}
          </span>
          , estimated to take{" "}
          <span className="font-bold text-[#0a0a0a]">
            {interviewData.duration}
          </span>{" "}
          minutes.
        </p>

        {/* Interview Link Container */}
        <div className="w-full mb-6">
          <div className="bg-[#f5f5f5] border border-[#dcdcdc] rounded-[10px] p-4 space-y-3">
            <label className="text-sm font-normal text-[#0a0a0a] block text-left leading-5">
              Interview Link
            </label>
            <div className="flex items-center gap-3">
              <p className="flex-1 text-sm text-[#0a0a0a] truncate text-left font-normal">
                {interviewData.interviewLink}
              </p>
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-[#0a0a0a] bg-[#e5e5e5] hover:bg-[#d5d5d5] border border-[#e5e5e5] rounded-md transition-colors shrink-0"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? "Copied!" : "Copy link"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Share Button */}
        <Button
          type="button"
          onClick={() => setIsShareModalOpen(true)}
          className="w-full h-11 px-4 bg-[#02563d] hover:bg-[#02563d]/90 text-white font-semibold rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-center gap-2"
        >
          <Users className="w-5 h-5" />
          <span>Share with Applicants</span>
        </Button>
      </div>

      <ShareInterviewLinkModal
        open={isShareModalOpen}
        onOpenChange={setIsShareModalOpen}
        interviewLink={interviewData.interviewLink}
      />
    </>
  );
};
