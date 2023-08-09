import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  cameraAccess: boolean;
  image: Blob | null;
};

const initialState = {
  cameraAccess: true,
  image: null,
} as InitialState;

export const webcam = createSlice({
  name: "webcam",
  initialState,
  reducers: {
    cameraError: (state) => {
      state.cameraAccess = false;
    },
    deleteImage: () => initialState,
    saveImage: (state, action: PayloadAction<Blob>) => {
      state.image = action.payload;
    },
  },
});

export const { saveImage, deleteImage, cameraError } = webcam.actions;
export default webcam.reducer;
