"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { ApplicantAuthFormValues } from "./interfaces/applicant-auth.interface";
import { applicantAuthService } from "./services/applicant-auth.service";
import { validateApplicantAuthForm } from "./utils/applicant-auth.utils";

const initialValues: ApplicantAuthFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+91",
  phone: "",
};

export default function ApplicantAuthPage() {
  const router = useRouter();
  const params = useParams();
  const interviewId = params?.id as string;
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        // Call API to verify if user is authenticated for interview
        const response = await applicantAuthService.verifyApplicantForInterview(
          interviewId,
          {
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            email: values.email.trim(),
            phone: values.phone.replace(/[\s\-\(\)\+\.]/g, ""),
            countryCode: values.countryCode,
          }
        );

        if (response?.success || response?.authenticated) {
          toast.success("Authentication successful! Redirecting...", {
            duration: 2000,
          });

          // Store authentication data if needed
          if (response?.token || response?.data?.token) {
            const token = response?.token || response?.data?.token;
            if (typeof window !== "undefined") {
              localStorage.setItem("applicantAuthToken", token);
            }
          }

          // Redirect to interview call page or next step
          setTimeout(() => {
            // You can redirect to the same page or a different route
            // For now, we'll stay on the same page but could navigate to interview interface
            router.refresh();
          }, 1000);
        } else {
          toast.error(
            response?.message ||
              "You are not authorized for this interview. Please contact the recruiter.",
            {
              duration: 5000,
            }
          );
        }
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

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Side - Gradient Background with Decorative Elements */}
        <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 bg-gradient-to-b from-[#02563d] to-[#052e16] relative overflow-hidden">
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

        {/* Right Side - Authentication Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#fafafa] min-h-screen">
          <div className="w-full max-w-[448px] flex flex-col gap-8 px-8">
            <Logo />

            <div className="flex flex-col gap-0">
              <form onSubmit={formik.handleSubmit}>
                <Card className="border-2 border-[rgba(0,0,0,0.1)] rounded-[14px] p-0 flex flex-col gap-6 bg-white">
                  <CardHeader className="px-6 pt-6 pb-0 flex flex-col gap-[6px]">
                    <CardTitle className="text-base font-medium leading-4 text-[#0a0a0a] tracking-[-0.3125px]">
                      Interview Authentication
                    </CardTitle>
                    <CardDescription className="text-base font-normal leading-6 text-[#717182] tracking-[-0.3125px]">
                      Please enter your details to verify your identity for the
                      interview
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-6 pb-6 flex flex-col gap-4">
                    {/* First Name Input */}
                    <div className="flex flex-col gap-2">
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        label="First name"
                        placeholder="John"
                        required
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isSubmitting}
                        error={
                          formik.touched.firstName && formik.errors.firstName
                            ? formik.errors.firstName
                            : undefined
                        }
                        className="h-9 w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-1 text-sm leading-5 text-[#0a0a0a] placeholder:text-[#737373] shadow-[0_1px_2px_0_rgba(2,86,61,0.12)] outline-none focus:border-[#A3A3A3] focus:shadow-[0_0_0_3px_rgba(2,86,61,0.50)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      />
                    </div>

                    {/* Last Name Input */}
                    <div className="flex flex-col gap-2">
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        label="Last name"
                        placeholder="Doe"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={isSubmitting}
                        error={
                          formik.touched.lastName && formik.errors.lastName
                            ? formik.errors.lastName
                            : undefined
                        }
                        className="h-9 w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-1 text-sm leading-5 text-[#0a0a0a] placeholder:text-[#737373] shadow-[0_1px_2px_0_rgba(2,86,61,0.12)] outline-none focus:border-[#A3A3A3] focus:shadow-[0_0_0_3px_rgba(2,86,61,0.50)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        placeholder="johndoe@example.com"
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

                    {/* Phone Input */}
                    <PhoneInput
                      label="Phone number"
                      required
                      countryCode={formik.values.countryCode}
                      phoneNumber={formik.values.phone}
                      onCountryCodeChange={(value) => {
                        formik.setFieldValue("countryCode", value);
                      }}
                      onPhoneNumberChange={(e) => {
                        const phoneValue = e.target.value;
                        formik.setFieldValue("phone", phoneValue);

                        // Remove all non-digit characters to check length
                        const digitsOnly = phoneValue.replace(
                          /[\s\-\(\)\+\.]/g,
                          ""
                        );

                        // Show error immediately if more than 10 digits or if field was already touched
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

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="default"
                      className="w-full h-9 bg-[#02563d] text-[#fafafa] font-medium text-sm rounded-md shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] hover:bg-[#02563d]/90 disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        "Continue to Interview"
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
