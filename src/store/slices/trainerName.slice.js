import { createSlice } from "@reduxjs/toolkit";

const trainerNameSlice = createSlice({
  initialState: localStorage.getItem("trainerName") ?? "",
  name: "trainerName",
  reducers: {
    setTrainerName: (state, action) => {
      localStorage.setItem("trainerName", action.payload)
      return action.payload;
    },
  },
});

export const { setTrainerName } = trainerNameSlice.actions;

export default trainerNameSlice.reducer;
