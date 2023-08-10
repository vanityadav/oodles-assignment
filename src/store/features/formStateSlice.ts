import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FormData = {
  deviceid: string;
  photo: Blob;
  lat: string;
  log: string;
};

type FormStatus =
  | null
  | "LOCATION ERROR"
  | "CAMERA ERROR"
  | "DEVICE ID ERROR"
  | "PENDING"
  | "SENT"
  | "SERVER ERROR";

type InitialState = {
  status: FormStatus;
  statusText: string;
  userData: FormData[];
};

const initialState = {
  status: null,
  statusText: " ",
  userData: [],
} as InitialState;

export const formState = createSlice({
  name: "formState",
  initialState,
  reducers: {
    reset: (state) => {
      state.status = null;
      state.statusText = "";
    },
    sending: (state) => {
      state.status = "PENDING";
    },
    clearData: (state) => {
      state.userData = [];
    },
    serverError: (state) => {
      state.status = "SERVER ERROR";
      state.statusText = "User information is not saved";
    },
    deviceIdError: (state) => {
      state.status = "DEVICE ID ERROR";
      state.statusText = "There was an error accessing your device id";
    },
    imageError: (state) => {
      state.status = "CAMERA ERROR";
      state.statusText = "Photo is required";
    },
    locationError: (state) => {
      state.status = "LOCATION ERROR";
      state.statusText = "Allow location access to this site";
    },
    success: (state, action: PayloadAction<FormData>) => {
      return {
        userData: [...state.userData, action.payload],
        status: "SENT",
        statusText: "User information saved successfully",
      };
    },
  },
});

export const {
  success,
  sending,
  clearData,
  imageError,
  serverError,
  locationError,
  deviceIdError,
  reset,
} = formState.actions;
export default formState.reducer;
