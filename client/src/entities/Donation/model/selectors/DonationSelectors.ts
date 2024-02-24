import { StateSchema } from 'app/providers/StoreProvider';

export const getDonationData = (state: StateSchema) => state.donation?.data;
export const getDonationIsLoading = (state: StateSchema) => state.donation?.isLoading;
export const getDonationError = (state: StateSchema) => state.donation?.error;
