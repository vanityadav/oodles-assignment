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
  userData: FormData[];
};

const initialState = { status: null } as InitialState;

export const formState = createSlice({
  name: "formState",
  initialState,
  reducers: {
    send: () => initialState,
    sending: (state, action: PayloadAction<FormData>) => {},
    clearData: (state) => {
      state.userData = [];
    },
    registerUser: (state, action: PayloadAction<FormData>) => {
      state.userData = [...state.userData, action.payload];
    },
  },
});

export const { registerUser } = formState.actions;
export default formState.reducer;
