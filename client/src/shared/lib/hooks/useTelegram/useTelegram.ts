import { useCallback } from 'react';

interface TelegramApi {
    initDataUnsafe: {
        user: any;
    };
    close: () => void;
    ready: any;
}

export function useTelegram() {
    // @ts-ignore
    const tg: TelegramApi = window.Telegram;

    const onClose = useCallback(() => {
        tg.close();
    }, [tg]);

    return {
        tg,
        onClose,
        user: tg.initDataUnsafe.user,
    };
}
