import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FormData = {
  deviceid: string;
  photo: Blob;
  lat: string;
  log: string;
};

const initialState = {} as FormData;

export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    reset: () => initialState,
    add: (state, action: PayloadAction<FormData>) => {
      state= {...state , action.payload};
    },
 
  },
});

export const { add, reset } = dataSlice.actions;
export default dataSlice.reducer;
