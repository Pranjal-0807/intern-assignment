import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStockMetadata = createAsyncThunk(
    "stockMetadata/fetchStockMetadata",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:3000/api/stocks");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    stockMetadata: [],
    loading: false,
    error: null,
};

const stockMetadataSlice = createSlice({
    name: "stockMetadata",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchStockMetadata.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStockMetadata.fulfilled, (state, action) => {
                state.stockMetadata = action.payload;
                state.loading = false;
            })
            .addCase(fetchStockMetadata.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default stockMetadataSlice.reducer;
