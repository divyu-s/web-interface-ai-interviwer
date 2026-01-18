import { API_ENDPOINTS } from "@/lib/constant";
import serverInterfaceService from "@/services/server-interface.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFormProperties = createAsyncThunk(
  "interviewers/fetchFormProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Promise.allSettled([
        serverInterfaceService.get(API_ENDPOINTS.INTERVIEWER.FORM_PROPERTIES),
      ]);

      // Extract options for jobLevel, industry, and jobType fields

      const result: Record<string, Record<string, any[]>> = {};
      response.forEach((item, index) => {
        if (item.status === "fulfilled") {
          result["interviewers"] = extractFormProperties(item.value, [
            "roundType",
            "language",
            "voice",
          ]);
        }
      });

      return result;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch Form Properties"
      );
    }
  }
);

const extractFormProperties = (formProperties: any[], targets: string[]) => {
  if (!Array.isArray(formProperties)) {
    return {};
  }
  const result: Record<string, any[]> = {};

  for (const section of formProperties) {
    if (Array.isArray(section?.fields || [])) {
      for (const field of section?.fields || []) {
        if (targets.includes(field?.key || "")) {
          result[field?.key || ""] = Array.isArray(
            field?.optionsConfig?.values || []
          )
            ? field?.optionsConfig?.values
            : [];
        }
      }
    }
  }

  return result;
};
