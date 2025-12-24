"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Logo } from "@/components/logo";
import { StatsPanel } from "@/components/stats-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// Zod schema for login form validation
const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, "Email or phone number is required")
    .refine(
      (value) => {
        // Check if it's a valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
          return true;
        }
        // Check if it's a valid phone number (supports various formats)
        // Allows: +1234567890, 1234567890, (123) 456-7890, 123-456-7890, etc.
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
        const digitsOnly = value.replace(/[\s\-\(\)\+\.]/g, "");
        
        // If it looks like a phone number, check the digit count
        if (phoneRegex.test(value) && /^[\d\s\-\(\)\+\.]+$/.test(value)) {
          // Phone number must be exactly 10 digits
          return digitsOnly.length === 10;
        }
        
        return false;
      },
      {
        message: "Please enter a valid email address or phone number",
      }
    )
    .refine(
      (value) => {
        // Check if it's not an email (to avoid checking phone length for emails)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
          return true; // Email is valid, skip phone validation
        }
        
        // Extract digits only from phone number
        const digitsOnly = value.replace(/[\s\-\(\)\+\.]/g, "");
        
        // If it contains digits and looks like a phone number
        if (/^[\d\s\-\(\)\+\.]+$/.test(value)) {
          // Phone number must not exceed 10 digits
          return digitsOnly.length <= 10;
        }
        
        return true; // Let the previous refine handle other validation
      },
      {
        message: "Phone number must be exactly 10 digits",
      }
    ),
  keepSignedIn: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof LoginFormData, boolean>>>({});

  const validateField = (fieldName: keyof LoginFormData, value: string | boolean) => {
    // Special handling for phone number and email validation
    if (fieldName === "emailOrPhone" && typeof value === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(value);
      const containsAtSymbol = value.includes("@");
      
      // If user is typing an email (contains @), validate email format
      if (containsAtSymbol && !isEmail && value.trim().length > 0) {
        // Check if email is incomplete or invalid
        if (value.trim().length > 0) {
          // Validate through schema to get proper error message
          // This will be handled by the schema validation below
        }
      }
      
      // If it's not an email, check if it's a phone number
      if (!containsAtSymbol && !isEmail) {
        const digitsOnly = value.replace(/[\s\-\(\)\+\.]/g, "");
        // Check if it contains only digits and phone-like characters
        if (/^[\d\s\-\(\)\+\.]+$/.test(value) && digitsOnly.length > 0) {
          // If phone number exceeds 10 digits, show error immediately
          if (digitsOnly.length > 10) {
            setErrors((prev) => ({
              ...prev,
              [fieldName]: "Phone number must be exactly 10 digits",
            }));
            return;
          }
        }
      }
    }

    const result = loginSchema.safeParse({
      emailOrPhone: fieldName === "emailOrPhone" ? value : emailOrPhone,
      keepSignedIn: fieldName === "keepSignedIn" ? value : keepSignedIn,
    });

    if (!result.success) {
      // Find error for this specific field
      const fieldError = result.error.issues.find(
        (issue) => issue.path[0] === fieldName
      );
      if (fieldError) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: fieldError.message,
        }));
      } else {
        // Clear error if validation passes for this field
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    } else {
      // Clear error if validation passes
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleBlur = (fieldName: keyof LoginFormData) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    if (fieldName === "emailOrPhone") {
      validateField(fieldName, emailOrPhone);
    }
  };

  const handleSendCode = () => {
    // Mark all fields as touched
    setTouched({ emailOrPhone: true, keepSignedIn: true });

    // Validate form data
    const result = loginSchema.safeParse({
      emailOrPhone,
      keepSignedIn,
    });

    if (!result.success) {
      // Extract field errors
      const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof LoginFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Validation passed, proceed with sending code
    console.log("Sending verification code to:", emailOrPhone);
    // In a real app, this would send the code via API call
    // For now, navigate to verification page
    router.push("/verification");
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Main Content */}
      <div className="flex min-h-screen">

         {/* Left Side - Stats Panel */}
         <div className="hidden lg:block w-1/2 h-screen sticky top-0">
          <StatsPanel />
        </div>
        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 min-h-screen">
          <div className="w-full max-w-md flex flex-col gap-8">
            <Logo />

            <div className="flex flex-col gap-1">
              <Card className="p-6 flex flex-col gap-6">
                <CardHeader className="px-0">
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>
                    Sign in to your InterviewAI account
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-0 pb-0 flex flex-col gap-4">
                  <Input
                    label="Email Address or Phone number"
                    id="email-or-phone"
                    type="text"
                    placeholder="Email or phone number"
                    required
                    value={emailOrPhone}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setEmailOrPhone(newValue);
                      
                      // Check if it's an email or phone number
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      const isEmail = emailRegex.test(newValue);
                      
                      // Check if user is typing an email (contains @ symbol)
                      const containsAtSymbol = newValue.includes("@");
                      
                      if (containsAtSymbol || isEmail) {
                        // Validate emails immediately while typing
                        validateField("emailOrPhone", newValue);
                      } else {
                        // Check if it's a phone number
                        const digitsOnly = newValue.replace(/[\s\-\(\)\+\.]/g, "");
                        // If it looks like a phone number (contains digits)
                        if (/^[\d\s\-\(\)\+\.]+$/.test(newValue) && digitsOnly.length > 0) {
                          // Validate immediately for phone numbers
                          validateField("emailOrPhone", newValue);
                        } else if (touched.emailOrPhone) {
                          // Validate if field has been touched
                          validateField("emailOrPhone", newValue);
                        } else {
                          // Clear error when user starts typing if not touched yet
                          if (errors.emailOrPhone) {
                            setErrors((prev) => ({ ...prev, emailOrPhone: undefined }));
                          }
                        }
                      }
                    }}
                    onBlur={() => handleBlur("emailOrPhone")}
                    error={errors.emailOrPhone}
                  />

                  <Checkbox
                    id="keep-signed-in"
                    label="Keep me signed in"
                    checked={keepSignedIn}
                    onCheckedChange={setKeepSignedIn}
                  />

                  <Button
                    variant="default"
                    className="w-full"
                    onClick={handleSendCode}
                  >
                    Send a verification code
                  </Button>

                  {/* Divider */}
                  <div className="relative h-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative bg-white px-2">
                      <span className="text-xs text-[#62748e] uppercase">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="social" className="w-full">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#1C1C1C"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#1C1C1C"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#1C1C1C"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#1C1C1C"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="social" className="w-full">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z"
                          fill="#1C1C1C"
                        />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="text-sm text-[#45556c]">
                  Don&apos;t have an account?
                </span>
                <Link href="/signup" className="text-sm text-[#02563d] font-medium hover:underline">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
