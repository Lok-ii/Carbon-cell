import { configureStore } from "@reduxjs/toolkit";
import populationSlice from "./populationSlice";
import cryptoSlice from "./cryptoSlice";
import walletSlice from "./walletSlice";

export const store = configureStore({
    reducer: {
        population: populationSlice,
        crypto: cryptoSlice,
        wallet: walletSlice
    },
})