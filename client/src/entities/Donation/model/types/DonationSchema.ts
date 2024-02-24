import { Donation } from './Donation';

export interface DonationSchema {
    data?: Donation;
    isLoading: boolean;
    error?: string;
}
