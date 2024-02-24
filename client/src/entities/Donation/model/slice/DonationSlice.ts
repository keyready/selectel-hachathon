import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DonationSchema } from '../types/DonationSchema';
import { fetchDonation } from '../service/fetchDonation';

const initialState: DonationSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const DonationSlice = createSlice({
    name: 'DonationSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDonation.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchDonation.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchDonation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: DonationActions } = DonationSlice;
export const { reducer: DonationReducer } = DonationSlice;
