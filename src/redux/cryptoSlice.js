import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cryptoData: {},
    bitCoinData: [],
    cryptoLiked : []
  }

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCrypto: (state, action) => {
        state.cryptoData = action.payload;
    },
    setBitCoinData: (state, action) => {
        state.bitCoinData = action.payload;
    },
    setCryptoLiked : (state, action) => {
      state.cryptoLiked = action.payload.splice(0, 8);
    }
  },
});

export const { setCrypto, setBitCoinData, setCryptoLiked } = cryptoSlice.actions;

export default cryptoSlice.reducer;
