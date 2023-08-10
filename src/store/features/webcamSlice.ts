import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  deviceId: null | string;
  image: Blob | null;
  supported: boolean;
  cameraAccess: boolean;
};

const initialState = {
  deviceId: null,
  supported: true,
  image: null,
  cameraAccess: true,
} as InitialState;

export const webcam = createSlice({
  name: "webcam",
  initialState,
  reducers: {
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
    },
    notAllowed: (state) => {
      return {
        deviceId: null,
        cameraAccess: false,
        supported: true,
        image: null,
      };
    },
    notDevicesFound: (state) => {
      return {
        deviceId: null,
        cameraAccess: false,
        supported: false,
        image: null,
      };
    },
    deleteImage: (state) => {
      state.image = null;
    },
    saveImage: (state, action: PayloadAction<Blob>) => {
      state.image = action.payload;
    },
  },
});

export const {
  saveImage,
  deleteImage,
  notDevicesFound,
  setDeviceId,
  notAllowed,
} = webcam.actions;
export default webcam.reducer;
