import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/AppRouter';
import { Suspense } from 'react';
import { Navbar } from 'widgets/Navbar';
import { Searchbar } from 'widgets/Searchbar';
import { Footer } from 'widgets/Footer';

export const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <AppRouter />
                <Footer />
            </Suspense>
        </div>
    );
};
