import { useCallback } from 'react';

// @ts-ignore
const tg: any = window.Telegram.WebApp;

export function useTelegram() {
    const onClose = useCallback(() => {
        tg.close();
    }, []);

    return {
        tg,
        onClose,
        user: tg.initDataUnsafe?.user,
    };
}
