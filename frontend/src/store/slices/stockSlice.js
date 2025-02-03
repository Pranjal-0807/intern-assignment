import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStocks = createAsyncThunk(
    "stock/fetchStocks",
    async ({ id, duration }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`https://intern-assignment-6fw5.onrender.com/api/stocks/${id}`, { duration });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    stocks: [],
    loading: false,
    error: null,
};

const stockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStocks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStocks.fulfilled, (state, action) => {
                state.stocks = action.payload;
                state.loading = false;
            })
            .addCase(fetchStocks.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default stockSlice.reducer;
