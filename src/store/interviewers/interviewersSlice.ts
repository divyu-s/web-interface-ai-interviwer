import { createSlice } from "@reduxjs/toolkit";
import { fetchFormProperties } from "./interviewers.thunks";

export interface JobState {
  mappingValues: Record<string, any>;
}

const initialState: JobState = {
  mappingValues: {},
};

export const jobsSlice = createSlice({
  name: "interviewers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFormProperties.fulfilled, (state, action) => {
      state.mappingValues = action.payload;
    });
  },
});

export default jobsSlice.reducer;
