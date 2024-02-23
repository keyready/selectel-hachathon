import { Good } from './Good';

export interface GoodSchema {
    data?: Good;
    isLoading: boolean;
    error?: string;
}
