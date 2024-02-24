import React, { memo } from 'react';
import { Toaster } from 'react-hot-toast';

interface NotificationProps {}

export const Notification = memo((props: NotificationProps) => (
    <Toaster
        toastOptions={{
            style: {
                background: 'linear-gradient(rgb(101, 178, 160) 0%, rgb(66, 31, 130) 100%)',
                color: '#fff',
                border: '1px solid var(--primary-color)',
                fontSize: '14px',
            },
        }}
        position="top-center"
        reverseOrder
    />
));
