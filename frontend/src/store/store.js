import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./slices/stockSlice";
import stockMetadataReducer from "./slices/stockMetadataSlice"

const store = configureStore({
    reducer: {
        stock: stockReducer,
        stockMetadata: stockMetadataReducer,
    },
});

export default store;
