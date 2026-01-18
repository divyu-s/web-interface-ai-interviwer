import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./jobs/jobsSlice";
import interviewersReducer from "./interviewers/interviewersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      jobs: jobsReducer,
      interviewers: interviewersReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
