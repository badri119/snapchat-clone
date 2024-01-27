import { createSlice } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "app",
  initialState: {
    cameraImage: 0,
  },
  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage += action.payload;
    },
    resetCameraImage: (state, action) => {
      state.cameraImage = null;
    },
  },
});

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const selectCameraImage = (state) => state.camera.cameraImage;

export default cameraSlice.reducer;
