import { StateSchema } from 'app/providers/StoreProvider';

export const getGoodData = (state: StateSchema) => state.good?.data;
export const getGoodIsLoading = (state: StateSchema) => state.good?.isLoading;
export const getGoodError = (state: StateSchema) => state.good?.error;
