"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { z } from 'zod'
import { Logo } from '@/components/logo'
import { StatsPanel } from '@/components/stats-panel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

// Zod schema for verification code validation
const verificationSchema = z.object({
  verificationCode: z
    .string()
    .min(1, "Verification code is required")
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d+$/, "Verification code must contain only numbers"),
})

type VerificationFormData = z.infer<typeof verificationSchema>

export default function VerificationPage() {
  const [verificationCode, setVerificationCode] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof VerificationFormData, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof VerificationFormData, boolean>>>({})

  const validateField = (fieldName: keyof VerificationFormData, value: string) => {
    const result = verificationSchema.safeParse({
      verificationCode: fieldName === "verificationCode" ? value : verificationCode,
    })

    if (!result.success) {
      const fieldError = result.error.issues.find(
        (issue) => issue.path[0] === fieldName
      )
      if (fieldError) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: fieldError.message,
        }))
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[fieldName]
          return newErrors
        })
      }
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }

  const handleBlur = (fieldName: keyof VerificationFormData) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }))
    if (fieldName === "verificationCode") {
      validateField(fieldName, verificationCode)
    }
  }

  const handleVerify = () => {
    // Mark field as touched
    setTouched({ verificationCode: true })

    // Validate form data
    const result = verificationSchema.safeParse({
      verificationCode,
    })

    if (!result.success) {
      // Extract field errors
      const fieldErrors: Partial<Record<keyof VerificationFormData, string>> = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof VerificationFormData] = issue.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    // Validation passed, proceed with verification
    console.log('Verifying code:', verificationCode)
    // In a real app, this would verify the code and log the user in
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Main Content */}
      <div className="flex min-h-screen">
        {/* Left Side - Stats Panel */}
        <div className="hidden lg:block w-1/2 h-screen sticky top-0">
          <StatsPanel />
        </div>
        {/* Right Side - Verification Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 min-h-screen">
          <div className="w-full max-w-md flex flex-col gap-8">
            <Logo />

            <div className="flex flex-col gap-1">
              <Card className="p-6 flex flex-col gap-6">
                <CardHeader className="px-0">
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Sign in to your InterviewAI account</CardDescription>
                </CardHeader>

                <CardContent className="px-0 pb-0 flex flex-col gap-4">
                  <Input
                    label="Verification code"
                    id="verification-code"
                    type="text"
                    placeholder="000000"
                    required
                    value={verificationCode}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/\D/g, '') // Only allow digits
                      setVerificationCode(newValue)
                      
                      // Validate immediately while typing if field has been touched
                      if (touched.verificationCode) {
                        validateField("verificationCode", newValue)
                      } else if (errors.verificationCode) {
                        // Clear error when user starts typing if not touched yet
                        setErrors((prev) => ({ ...prev, verificationCode: undefined }))
                      }
                    }}
                    onBlur={() => handleBlur("verificationCode")}
                    error={errors.verificationCode}
                    maxLength={6}
                  />

                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={handleVerify}
                  >
                    Verify
                  </Button>

                  {/* Divider */}
                  <div className="relative h-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative bg-white px-2">
                      <span className="text-xs text-[#62748e] uppercase">Or continue with</span>
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
  )
}


