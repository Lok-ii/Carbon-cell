import { createSlice } from "@reduxjs/toolkit";

const disconnectedState = {
  accounts: [],
  balance: "",
  chainId: "",
};

const initialState = {
  hasProvider: null,
  isConnecting: false,
  errorMessage: "",
  wallet: disconnectedState,
};
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet: (state, action) => {
        if(action.payload.type === "empty"){
            state.wallet = disconnectedState;
        }else{
            state.wallet = action.payload;
        }
    },
    setHasProvider: (state, action) => {
      state.hasProvider = action.payload;
    },
    setError: (state, action) => {
        state.errorMessage = action.payload;
    },
    setIsConnecting: (state, action) => {
        state.isConnecting = action.payload;
    }

  },
});

export const { setWallet, setHasProvider, setError, setIsConnecting } = walletSlice.actions;

export default walletSlice.reducer;
