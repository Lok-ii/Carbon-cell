import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarToggle: false,
  populationData: [],
  xAxis: "Population",
  yAxis: "Year",
  direction: "x"
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
    setXAxis: (state, action) => {
      state.xAxis = action.payload;
    },
    setYAxis: (state, action) => {
      state.yAxis = action.payload;
    },
    setDirection: (state, action) => {
      state.direction = action.payload;
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
  setDirection
} = populationSlice.actions;

export default populationSlice.reducer;
