import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormData = {
  deviceid: string;
  photo: Blob;
  lat: string;
  log: string;
};

type FormStatus = null | "INVALID" | "PENDING" | "SENT" | "SERVER ERROR";

type InitialState = {
  status: FormStatus;
  statusText: string;
};

const initialState = { status: null } as InitialState;

export const formState = createSlice({
  name: "formState",
  initialState,
  reducers: {
    reset: () => initialState,
    send: () => initialState,
    sending: (state, action: PayloadAction<FormData>) => {},
  },
});

export const { reset } = formState.actions;
export default formState.reducer;
