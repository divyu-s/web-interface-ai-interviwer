"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  ArrowRight,
  Zap,
  Sparkles,
  Users,
  BarChart3,
  Shield,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/components/header";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    website: "",
    industry: "",
    companySize: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const industries = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "education", label: "Education" },
    { value: "other", label: "Other" },
  ];

  const companySizes = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-500", label: "201-500 employees" },
    { value: "501-1000", label: "501-1000 employees" },
    { value: "1000+", label: "1000+ employees" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex pt-[73px] min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 bg-[#fafafa]">
          <div className="w-full max-w-[448px] space-y-8">
            <Logo />

            {/* Progress Indicator */}
            <div className="flex items-center justify-between w-full">
              <div className="flex-1 flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 1
                        ? "bg-[#02563d] text-white"
                        : "bg-slate-200 text-[#45556c]"
                    }`}
                  >
                    {step >= 1 ? <CheckCircle className="w-4 h-4" /> : "1"}
                  </div>
                  <span className="text-xs text-[#45556c]">Your Info</span>
                </div>
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    step >= 2 ? "bg-[#02563d]" : "bg-slate-200"
                  }`}
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2
                      ? "bg-[#02563d] text-white"
                      : "bg-slate-200 text-[#45556c]"
                  }`}
                >
                  2
                </div>
                <span className="text-xs text-[#45556c]">Company Setup</span>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white border-2 border-[rgba(0,0,0,0.1)] rounded-[14px] p-6 space-y-6">
              <div>
                <h1 className="text-base font-medium text-neutral-950 mb-1">
                  {step === 1 ? "Welcome Back" : "Setup Your Organisation"}
                </h1>
                <p className="text-base text-[#717182]">
                  {step === 1
                    ? "Sign in to your InterviewAI account"
                    : "Help us customize your experience"}
                </p>
              </div>

              <div className="space-y-4">
                {step === 1 ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="First name"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      <Input
                        label="Last name"
                        name="lastName"
                        placeholder="Dow"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="johndoe@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Phone number"
                      name="phone"
                      type="tel"
                      placeholder="+9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      label="Organisation name"
                      name="companyName"
                      placeholder="HROne company"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="Organisation website"
                      name="website"
                      type="url"
                      placeholder="www.hrone.com"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                    <Select
                      label="Industry"
                      name="industry"
                      options={industries}
                      value={formData.industry}
                      onChange={handleInputChange}
                    />
                    <Select
                      label="Organisation size"
                      name="companySize"
                      options={companySizes}
                      value={formData.companySize}
                      onChange={handleInputChange}
                    />
                  </>
                )}

                <div className="flex gap-3">
                  {step === 2 && (
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={handleContinue}
                  >
                    {step === 1 ? "Continue" : "Complete Setup"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-xs text-[#62748e] uppercase">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="social" className="w-full">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="social" className="w-full">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-[#45556c]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#02563d] font-medium hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Feature Panel */}
        <div className="hidden lg:flex lg:w-[614px] bg-linear-to-b from-[#02563d] to-[#034d35] p-12 flex-col gap-12 overflow-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/20 border border-white/30">
              <Zap className="w-3 h-3 text-white" />
              <span className="text-xs font-medium text-white">
                AI-Powered Hiring Platform
              </span>
            </div>

            <h2 className="text-[36px] font-normal leading-[40px] text-white">
              Transform Your Hiring with Intelligent AI Interviews
            </h2>

            <p className="text-lg text-white/90 leading-7">
              Join 500+ companies conducting 10,000+ AI interviews monthly.
              Screen candidates faster, reduce bias, and make data-driven hiring
              decisions.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 border border-white/20 rounded-[10px] p-4 flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-[10px] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-normal text-white mb-1">
                  Adaptive AI Interviewers
                </h3>
                <p className="text-sm text-white/80">
                  Smart follow-up questions based on candidate responses
                </p>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-[10px] p-4 flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-[10px] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-normal text-white mb-1">
                  Multi-Modal Interviews
                </h3>
                <p className="text-sm text-white/80">
                  Text, voice, or video - let candidates choose
                </p>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-[10px] p-4 flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-[10px] flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-normal text-white mb-1">
                  Instant Scoring & Insights
                </h3>
                <p className="text-sm text-white/80">
                  AI-powered evaluation with detailed scorecards
                </p>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-[10px] p-4 flex items-start gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-[10px] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-normal text-white mb-1">
                  Bias-Free Assessment
                </h3>
                <p className="text-sm text-white/80">
                  Fair, consistent evaluation for every candidate
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-[30px] font-normal text-white mb-1">
                500+
              </div>
              <div className="text-sm text-white/80">Companies</div>
            </div>
            <div>
              <div className="text-[30px] font-normal text-white mb-1">
                10K+
              </div>
              <div className="text-sm text-white/80">Interviews</div>
            </div>
            <div>
              <div className="text-[30px] font-normal text-white mb-1">87%</div>
              <div className="text-sm text-white/80">Time Saved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
