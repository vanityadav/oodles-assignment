import { configureStore } from "@reduxjs/toolkit";
import webcamReducer from "./features/webcamSlice";
import locationReducer from "./features/locationSlice";
import formStateReducer from "./features/formStateSlice";

export const store = configureStore({
  reducer: { formStateReducer, locationReducer, webcamReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
