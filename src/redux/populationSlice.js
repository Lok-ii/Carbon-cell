import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarToggle: true,
  populationData: [],
};

const populationSlice = createSlice({
  name: "population",
  initialState,
  reducers: {
    setPopulation: (state, action) => {
      state.populationData = [...action.payload];
    },
    setToggle: (state) => {
      state.sidebarToggle = !state.sidebarToggle;
    },
  },
});

export const { setPopulation, setToggle, setChartData, setChartInstance } =
  populationSlice.actions;

export default populationSlice.reducer;
