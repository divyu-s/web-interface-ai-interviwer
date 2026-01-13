"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import {
  Loader2,
  Check,
  Monitor,
  Clock,
  HelpCircle,
  ChevronRight,
  Info,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Logo } from "@/components/logo";
import { ApplicantAuthFormValues } from "./interfaces/applicant-auth.interface";
import { applicantAuthService } from "./services/applicant-auth.service";
import { validateApplicantAuthForm } from "./utils/applicant-auth.utils";

const initialValues: ApplicantAuthFormValues = {
  fullName: "",
  email: "",
  countryCode: "+91",
  phone: "",
};

// Interview flow states
type InterviewFlowState =
  | "auth"
  | "guidelines"
  | "verification-instructions"
  | "verification-ready"
  | "verification-recording"
  | "verification-completed"
  | "interview-tips"
  | "interview-active"
  | "interview-complete";

export default function ApplicantAuthPage() {
  const router = useRouter();
  const params = useParams();
  const interviewId = params?.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [flowState, setFlowState] = useState<InterviewFlowState>("auth");
  const [applicantName, setApplicantName] = useState("Rohan Sharma");
  const [companyName, setCompanyName] = useState("[company name]");

  // Guidelines state
  const [checklistItems, setChecklistItems] = useState({
    camera: false,
    microphone: false,
    connection: false,
    environment: false,
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Verification state
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Interview state
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [interviewTimer, setInterviewTimer] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(false);

  // Feedback state
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  // Check authentication on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("applicantAuthToken");
      if (token) {
        setIsAuthenticated(true);
        setFlowState("guidelines");
      }
    }
  }, []);

  // Timer for interview
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInterviewActive && flowState === "interview-active") {
      interval = setInterval(() => {
        setInterviewTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInterviewActive, flowState]);

  // Recording progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && flowState === "verification-recording") {
      interval = setInterval(() => {
        setRecordingProgress((prev) => {
          if (prev >= 100) {
            setIsRecording(false);
            setFlowState("verification-completed");
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, flowState]);

  // Get camera access
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      toast.error(
        "Failed to access camera/microphone. Please check permissions."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const formik = useFormik<ApplicantAuthFormValues>({
    initialValues,
    validate: validateApplicantAuthForm,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: async (values) => {
      if (!interviewId) {
        toast.error(
          "Invalid interview link. Please check your link and try again.",
          {
            duration: 5000,
          }
        );
        return;
      }

      setIsSubmitting(true);

      try {
        setApplicantName(values.fullName);
        setIsAuthenticated(true);
        setFlowState("guidelines");
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "An error occurred. Please try again.";

        toast.error(errorMessage, {
          duration: 5000,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Render Authentication Screen
  if (!isAuthenticated && flowState === "auth") {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex min-h-screen">
          <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 bg-gradient-to-b from-[#02563d] to-[#052e16] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.35] overflow-hidden pointer-events-none">
              <Image
                src="/LoginLeftImage.svg"
                alt="AI Interview Graphic"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center bg-white min-h-screen">
            <div className="w-full max-w-[448px] flex flex-col gap-8 px-8">
              <Logo />

              <div className="flex flex-col gap-0">
                <form onSubmit={formik.handleSubmit}>
                  <Card className="border border-[#e5e5e5] rounded-[14px] p-0 flex flex-col gap-6 bg-white shadow-sm">
                    <CardHeader className="px-6 pt-6 pb-0 flex flex-col gap-[6px]">
                      <CardTitle className="text-base font-bold leading-5 text-[#0a0a0a]">
                        Welcome to AI Interviewer
                      </CardTitle>
                      <CardDescription className="text-sm font-normal leading-5 text-[#717182]">
                        Let's begin with you interview journey with AI
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 pb-6 flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <Input
                          id="fullName"
                          name="fullName"
                          type="text"
                          label="Full name"
                          placeholder="Email or phone number"
                          required
                          value={formik.values.fullName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={isSubmitting}
                          error={
                            formik.touched.fullName && formik.errors.fullName
                              ? formik.errors.fullName
                              : undefined
                          }
                          className="h-9 w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-1 text-sm leading-5 text-[#0a0a0a] placeholder:text-[#737373] shadow-[0_1px_2px_0_rgba(2,86,61,0.12)] outline-none focus:border-[#A3A3A3] focus:shadow-[0_0_0_3px_rgba(2,86,61,0.50)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          label="Email Address"
                          placeholder="Email or phone number"
                          required
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          disabled={isSubmitting}
                          error={
                            formik.touched.email && formik.errors.email
                              ? formik.errors.email
                              : undefined
                          }
                          className="h-9 w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-1 text-sm leading-5 text-[#0a0a0a] placeholder:text-[#737373] shadow-[0_1px_2px_0_rgba(2,86,61,0.12)] outline-none focus:border-[#A3A3A3] focus:shadow-[0_0_0_3px_rgba(2,86,61,0.50)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        />
                      </div>

                      <PhoneInput
                        label="Phone number"
                        required
                        placeholder="Email or phone number"
                        countryCode={formik.values.countryCode}
                        phoneNumber={formik.values.phone}
                        onCountryCodeChange={(value) => {
                          formik.setFieldValue("countryCode", value);
                        }}
                        onPhoneNumberChange={(e) => {
                          const phoneValue = e.target.value;
                          formik.setFieldValue("phone", phoneValue);
                          const digitsOnly = phoneValue.replace(
                            /[\s\-\(\)\+\.]/g,
                            ""
                          );
                          if (digitsOnly.length > 10 || formik.touched.phone) {
                            formik.setFieldTouched("phone", true, false);
                          }
                        }}
                        onFocus={(e) => {
                          if (!formik.touched.phone) {
                            formik.setFieldTouched("phone", true, false);
                          }
                        }}
                        onBlur={(e) => {
                          formik.setFieldTouched("phone", true);
                        }}
                        id="phone"
                        error={
                          formik.touched.phone && formik.errors.phone
                            ? formik.errors.phone
                            : undefined
                        }
                      />

                      <Button
                        type="submit"
                        variant="default"
                        className="w-full h-9 bg-[#02563d] text-white font-medium text-sm rounded-md shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:bg-[#02563d]/90 disabled:opacity-50 flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            Continue
                            <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Interview Guidelines Screen
  if (flowState === "guidelines") {
    const canContinue =
      checklistItems.camera &&
      checklistItems.microphone &&
      checklistItems.connection &&
      checklistItems.environment &&
      agreedToTerms;

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="pt-8 pb-8">
            <Logo />
          </div>

          <div className="flex flex-col items-center gap-8">
            {/* Main Title Section */}
            <div className="w-full max-w-2xl text-center">
              <h1 className="text-3xl font-bold text-[#0a0a0a] mb-3 leading-[1.2]">
                Interview guidelines
              </h1>
              <p className="text-base font-normal text-[#0a0a0a] leading-6">
                Before we begin, please review these guidelines and complete the
                checklist to ensure the best interview experience.
              </p>
            </div>

            {/* Job Details Card */}
            <Card className="w-full max-w-2xl border border-[#e5e5e5] rounded-[14px] p-6 bg-white shadow-[0_1px_2px_0_rgba(2,86,61,0.12)] !py-6 !gap-0">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-[#0a0a0a] leading-7">
                  Senior Product Manager
                </h2>
                <p className="text-base font-normal text-[#737373] leading-5">
                  Product management
                </p>
                <div className="flex flex-row flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-sm font-normal text-[#0a0a0a] leading-5">
                    <Monitor className="w-4 h-4 shrink-0 text-[#737373]" />
                    <span>Type: Behavioral round</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-normal text-[#0a0a0a] leading-5">
                    <Clock className="w-4 h-4 shrink-0 text-[#737373]" />
                    <span>Duration: 30 - 40 min.</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-normal text-[#0a0a0a] leading-5">
                    <HelpCircle className="w-4 h-4 shrink-0 text-[#737373]" />
                    <span>Question: 8 - 10</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pre-interview Checklist Section */}
            <div className="w-full max-w-2xl">
              <h3 className="text-xl font-bold text-[#0a0a0a] mb-4 leading-7">
                Pre - interview checklist
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  {
                    key: "camera",
                    title: "Camera Setup",
                    description:
                      "Ensure your camera is working and you are well-lit",
                  },
                  {
                    key: "microphone",
                    title: "Microphone check",
                    description: "Test your microphone for clear audio",
                  },
                  {
                    key: "connection",
                    title: "Stable Connection",
                    description:
                      "Verify you have a reliable internet connection",
                  },
                  {
                    key: "environment",
                    title: "Quiet Environment",
                    description: "Find a quiet space with minimal distractions",
                  },
                ].map((item) => (
                  <Card
                    key={item.key}
                    className="border border-[#e5e5e5] rounded-[14px] p-4 bg-white shadow-[0_1px_2px_0_rgba(2,86,61,0.12)] !py-4 !gap-0"
                  >
                    <div className="flex items-start gap-3">
                      <div className="pt-0.5 shrink-0">
                        <Checkbox
                          id={item.key}
                          checked={
                            checklistItems[
                              item.key as keyof typeof checklistItems
                            ]
                          }
                          onCheckedChange={(checked) => {
                            setChecklistItems((prev) => ({
                              ...prev,
                              [item.key]: checked,
                            }));
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor={item.key}
                          className="text-sm font-bold text-[#0a0a0a] block mb-1 cursor-pointer leading-5"
                        >
                          {item.title}
                        </label>
                        <p className="text-sm font-normal text-[#737373] leading-5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Privacy Notice Card */}
            <Card className="w-full max-w-2xl border border-[#e5e5e5] rounded-[14px] p-4 bg-white shadow-[0_1px_2px_0_rgba(2,86,61,0.12)] !py-4 !gap-0">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-[#737373]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-3.5 h-3.5 text-[#737373]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0a0a0a] mb-1 leading-5">
                    Privacy Notice:
                  </p>
                  <p className="text-sm font-normal text-[#737373] leading-5">
                    This interview will be recorded and analyzed to provide
                    feedback. Your data is encrypted and handled according to
                    our privacy policy.
                  </p>
                </div>
              </div>
            </Card>

            {/* Terms Checkbox */}
            <div className="w-full max-w-2xl">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={setAgreedToTerms}
                label="I have reviewed the guidelines and agree to the terms and conditions of this interview session"
              />
            </div>

            {/* Continue Button */}
            <Button
              onClick={() => setFlowState("verification-instructions")}
              disabled={!canContinue}
              className="w-full max-w-2xl h-9 bg-[#02563d] text-white font-bold text-base leading-5 rounded-md hover:bg-[#02563d]/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_1px_2px_0_rgba(2,86,61,0.12)]"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render Voice & Video Verification - Instructions
  if (flowState === "verification-instructions") {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="pt-8 pb-8">
            <Logo />
          </div>

          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-full max-w-2xl border border-[#e5e5e5] rounded-[14px] p-8 bg-white">
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-[#0a0a0a] mb-2">
                    Voice & video verification
                  </h1>
                  <p className="text-base text-[#717182]">
                    Let's test your microphone and camera before starting the
                    interview
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#0a0a0a] mb-4">
                    How it works
                  </h2>
                  <div className="flex flex-col gap-4">
                    {[
                      {
                        step: 1,
                        title: "Permission access",
                        description: "Give access for microphone and camera",
                      },
                      {
                        step: 2,
                        title: "Stay steady and keep you eye towards camera",
                        description:
                          "We'll play back your recording to verify audio quality",
                      },
                      {
                        step: 3,
                        title: "Read the phrase aloud",
                        description:
                          "Speak clearly when recording the verification phrase",
                      },
                      {
                        step: 4,
                        title: "Confirm or retry",
                        description:
                          "If everything sounds good, proceed to the interview",
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#02563d]/10 text-[#02563d] font-semibold text-sm shrink-0">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-[#0a0a0a] mb-1">
                            {item.title}
                          </p>
                          <p className="text-sm text-[#717182]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={async () => {
                    await startCamera();
                    setFlowState("verification-ready");
                  }}
                  className="w-full h-11 bg-[#02563d] text-white font-medium rounded-md hover:bg-[#02563d]/90"
                >
                  Continue
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Render Voice & Video Verification - Ready/Recording/Completed
  if (
    flowState === "verification-ready" ||
    flowState === "verification-recording" ||
    flowState === "verification-completed"
  ) {
    const authorizationStatement = `I, ${applicantName}, authorize ${companyName} to record and use my voice for verification, as per the platform's privacy policy.`;

    return (
      <div className="min-h-screen bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="pt-8 pb-8">
            <Logo />
          </div>

          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-2xl">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-[#0a0a0a] mb-2">
                  Voice & video verification
                </h1>
                <p className="text-base text-[#717182]">
                  Let's test your microphone and camera before starting the
                  interview
                </p>
              </div>

              <Card className="w-full border border-[#e5e5e5] rounded-[14px] p-6 bg-white">
                <div className="flex flex-col gap-6">
                  {flowState === "verification-recording" && (
                    <div>
                      <p className="text-[#02563d] font-semibold mb-1">
                        Recording in progress
                      </p>
                      <p className="text-sm text-[#02563d]/70">
                        {recordingProgress}% completed
                      </p>
                    </div>
                  )}

                  {flowState === "verification-completed" && (
                    <div>
                      <p className="text-[#02563d] font-semibold mb-1">
                        Recording in progress
                      </p>
                      <p className="text-sm text-[#02563d]/70">
                        100% completed
                      </p>
                    </div>
                  )}

                  {flowState === "verification-ready" && (
                    <div>
                      <h3 className="font-semibold text-[#0a0a0a] mb-2">
                        Start Recording
                      </h3>
                      <p className="text-sm text-[#717182] mb-4">
                        0% completed
                      </p>
                    </div>
                  )}

                  <div className="relative w-full aspect-video bg-[#f5f5f5] rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {flowState === "verification-completed" && (
                    <div className="flex gap-1 justify-center">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#717182]"
                        />
                      ))}
                    </div>
                  )}

                  <div className="text-center">
                    <p className="text-base font-semibold text-[#0a0a0a] mb-4">
                      {authorizationStatement}
                    </p>
                  </div>

                  <Card className="border border-[#e5e5e5] rounded-md p-4 bg-[#fafafa]">
                    <p className="text-sm text-[#717182] mb-2">
                      Tap{" "}
                      <span className="font-semibold text-[#0a0a0a]">
                        "Start recording"
                      </span>{" "}
                      to begin, and read the statement shown.
                    </p>
                    <p className="text-sm text-[#717182]">
                      {authorizationStatement}
                    </p>
                  </Card>
                </div>
              </Card>

              <div className="flex gap-4 mt-6">
                {flowState === "verification-completed" && (
                  <Button
                    onClick={() => {
                      setRecordingProgress(0);
                      setIsRecording(false);
                      setFlowState("verification-ready");
                    }}
                    variant="outline"
                    className="flex-1 h-11"
                  >
                    Retry
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (flowState === "verification-ready") {
                      setIsRecording(true);
                      setFlowState("verification-recording");
                    } else if (flowState === "verification-completed") {
                      stopCamera();
                      setFlowState("interview-active");
                      setShowTipsModal(true);
                    }
                  }}
                  className={`${
                    flowState === "verification-completed" ? "flex-1" : "w-full"
                  } h-11 bg-[#02563d] text-white font-medium rounded-md hover:bg-[#02563d]/90`}
                >
                  {flowState === "verification-ready"
                    ? "Start recording"
                    : flowState === "verification-recording"
                    ? "Recording..."
                    : "Continue"}
                  {flowState === "verification-completed" && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Active Interview Screen
  if (flowState === "interview-active") {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex h-screen">
          {/* Left Panel */}
          <div className="w-1/2 border-r border-[#e5e5e5] p-6 flex flex-col">
            <div className="pt-2 pb-6">
              <Logo />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-[#0a0a0a] mb-2">
                  Skills round
                </h2>
                <p className="text-sm text-[#717182]">
                  Duration of this round: 30 min.
                </p>
              </div>

              <div className="relative w-full max-w-md aspect-video bg-[#f5f5f5] rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2 px-4 py-2 bg-[#f5f5f5] rounded-full">
                <Clock className="w-4 h-4 text-[#717182]" />
                <span className="text-sm font-medium text-[#0a0a0a]">
                  {formatTime(interviewTimer)}
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-1/2 p-6 flex flex-col">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-[#f5f5f5] rounded-md">
                <span className="text-sm font-medium text-[#717182]">
                  Question {currentQuestion}/{totalQuestions}
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-6">
              <Card className="border border-[#e5e5e5] rounded-lg p-4 bg-white">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#02563d]/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-[#02563d]">
                      AI
                    </span>
                  </div>
                  <div>
                    <p className="text-base text-[#0a0a0a]">
                      Hey {applicantName.split(" ")[0]}, give a brief
                      introduction about yourself.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border border-[#e5e5e5] rounded-lg p-4 bg-white flex-1 flex flex-col">
                <p className="text-sm font-medium text-[#717182] mb-2">
                  Recording your response...
                </p>
                <div className="flex-1 border-b-2 border-dashed border-[#e5e5e5]"></div>
              </Card>

              <Button
                onClick={() => {
                  if (currentQuestion < totalQuestions) {
                    setCurrentQuestion(currentQuestion + 1);
                  } else {
                    setFlowState("interview-complete");
                    stopCamera();
                  }
                }}
                className="self-end h-11 bg-[#02563d] text-white font-medium rounded-md hover:bg-[#02563d]/90"
              >
                Go to next question <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Interview Tips Modal */}
        <Dialog open={showTipsModal} onOpenChange={setShowTipsModal}>
          <DialogContent className="max-w-md" showCloseButton={false}>
            <DialogHeader>
              <DialogTitle>Interview tips</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-4">
              {[
                "Speak clearly and at a moderate pace",
                "Look at the camera when responding",
                "Don't switch tabs while interview is in progress",
                "Take a moment to think before answering",
                "Be authentic and honest in your responses",
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#02563d] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#0a0a0a]">{tip}</p>
                </div>
              ))}
            </div>
            <Button
              onClick={() => {
                setShowTipsModal(false);
                setIsInterviewActive(true);
              }}
              className="w-full h-11 bg-[#02563d] text-white font-medium rounded-md hover:bg-[#02563d]/90"
            >
              Start interview <ChevronRight className="w-4 h-4" />
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Render Interview Complete Screen
  if (flowState === "interview-complete") {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="pt-8 pb-8">
            <Logo />
          </div>

          <div className="flex flex-col items-center gap-8">
            <Card className="w-full max-w-2xl border border-[#e5e5e5] rounded-[14px] p-12 bg-white text-center">
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#0a0a0a] mb-3">
                    Interview Complete!
                  </h1>
                  <p className="font-semibold text-[#0a0a0a] mb-2">
                    We appreciate your time!
                  </p>
                  <p className="text-sm text-[#717182] mb-1">
                    Your responses have been successfully submitted.
                  </p>
                  <p className="text-sm text-[#717182]">
                    Our team will review your interview and share next steps
                    with you soon.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="w-full max-w-2xl border border-[#e5e5e5] rounded-[14px] p-6 bg-white">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#0a0a0a]">
                    How was your experience with AI interviewer?
                  </label>
                  <Textarea
                    placeholder="Write text here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-32"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#0a0a0a]">
                    Rate AI interviewer
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="w-8 h-8 flex items-center justify-center"
                      >
                        <svg
                          className={`w-6 h-6 ${
                            star <= rating
                              ? "fill-[#02563d] text-[#02563d]"
                              : "fill-none stroke-[#e5e5e5] text-[#e5e5e5]"
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => {
                    toast.success("Feedback submitted successfully!");
                    // Could navigate away or show confirmation
                  }}
                  className="self-end h-11 bg-[#02563d] text-white font-medium rounded-md hover:bg-[#02563d]/90"
                >
                  Submit
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
