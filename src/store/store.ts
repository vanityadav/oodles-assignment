import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./features/locationSlice";
import submittedDataReducer from "./features/submittedDataSlice";

export const store = configureStore({
  reducer: { submittedDataReducer, locationReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
