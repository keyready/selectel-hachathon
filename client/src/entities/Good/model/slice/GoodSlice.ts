import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GoodSchema } from '../types/GoodSchema';

const initialState: GoodSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const GoodSlice = createSlice({
    name: 'GoodSlice',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchGood.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchGood.fulfilled, (state, action: PayloadAction<any>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //         })
    //         .addCase(fetchGood.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: GoodActions } = GoodSlice;
export const { reducer: GoodReducer } = GoodSlice;
