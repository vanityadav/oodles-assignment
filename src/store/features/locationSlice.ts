import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Position = {
  latitude: number;
  longitude: number;
} | null;

type InitialState = {
  locationAccess: boolean;
  location: Position;
  supported: boolean;
};

const initialState = {
  locationAccess: true,
  location: null,
  supported: true,
} as InitialState;

export const location = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (_, action: PayloadAction<Position>) => {
      return {
        location: action.payload,
        locationAccess: true,
        supported: true,
      };
    },
    notAllowed: () => {
      return { location: null, locationAccess: false, supported: true };
    },
    notSupported: () => {
      return { location: null, locationAccess: false, supported: false };
    },
  },
});

export const { setLocation, notAllowed, notSupported } = location.actions;
export default location.reducer;
