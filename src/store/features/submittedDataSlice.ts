import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormData = {
  deviceid: string;
  photo: Blob;
  lat: string;
  log: string;
};
type InitialState = {
  value: FormData[];
};

const initialState = { value: [] } as InitialState;

export const submittedData = createSlice({
  name: "data",
  initialState,
  reducers: {
    reset: () => initialState,
    add: (state, action: PayloadAction<FormData>) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { add, reset } = submittedData.actions;
export default submittedData.reducer;
