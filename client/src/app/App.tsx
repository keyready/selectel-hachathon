import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/AppRouter';
import { Suspense, useEffect } from 'react';
import { Navbar } from 'widgets/Navbar';
import { useTelegram } from 'shared/lib/hooks/useTelegram/useTelegram';

export const App = () => {
    const { theme } = useTheme();

    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [tg]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <AppRouter />
            </Suspense>
        </div>
    );
};
