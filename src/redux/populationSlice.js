import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarToggle: false,
  populationData: {},
  chartData: [],
  labels: [],
};

const populationSlice = createSlice({
  name: "population",
  initialState,
  reducers: {
    setPopulation: (state, action) => {
      state.populationData = { ...action.payload };
      state.chartData = state.populationData.data
        .map((item) => item.Population)
        .reverse();
      state.labels = state.populationData.data
        .map((item) => item.Year)
        .reverse();
    },
    setToggle: (state) => {
      state.sidebarToggle = !state.sidebarToggle;
    },
  },
});

export const {
  setPopulation,
  setToggle,
  setChartData,
  setChartInstance,
  setXAxis,
  setYAxis,
  setDirection,
} = populationSlice.actions;

export default populationSlice.reducer;
