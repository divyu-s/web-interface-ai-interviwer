"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";

import { toast } from "sonner";
import { fetchFormProperties } from "@/store/interviewers/interviewers.thunks";

export default function InterviewersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFormProperties())
      .unwrap()
      .catch((error: any) => {
        toast.error(error || "Failed to fetch Form Properties");
      });
  }, []);

  return <>{children}</>;
}
