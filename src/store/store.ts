import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});

export type InitialState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
