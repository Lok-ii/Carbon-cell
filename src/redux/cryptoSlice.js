import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cryptoData: {},
  }

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCrypto: (state, action) => {
        state.cryptoData = action.payload;
    },
  },
});

export const { setCrypto } = cryptoSlice.actions;

export default cryptoSlice.reducer;
