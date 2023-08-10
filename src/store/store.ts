import { configureStore } from "@reduxjs/toolkit";
import webcamReducer from "./features/webcamSlice";
import locationReducer from "./features/locationSlice";
import formStateReducer from "./features/formStateSlice";

export const store = configureStore({
  reducer: { formStateReducer, locationReducer, webcamReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["formState/success", "webcam/saveImage"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["webcamReducer.image", "formStateReducer.userData"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
