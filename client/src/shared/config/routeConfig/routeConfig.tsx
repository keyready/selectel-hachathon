import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { NotFound } from 'pages/NotFound';
import { AuthPage } from 'pages/AuthPage';
import { MenuPage } from 'pages/MenuPage';
import { CreateDonationPage } from 'pages/CreateDonationPage';
import { MyDonationsPage } from 'pages/MyDonationsPage';
import { RegisterPage } from 'pages/RegisterPage';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    MENU = 'menu',
    CREATEDONATION = 'createdonation',
    MYDONATION = 'mydonation',
    REGISTER = 'register',
    AUTHORIZATION = 'authorization',

    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CREATEDONATION]: '/create_donation',
    [AppRoutes.MENU]: '/menu',
    [AppRoutes.REGISTER]: '/register',
    [AppRoutes.MYDONATION]: '/my-donation',
    [AppRoutes.AUTHORIZATION]: '/forbidden',

    // last
    [AppRoutes.NOT_FOUND]: '*',
};

export const routerConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.MENU]: {
        path: RoutePath.menu,
        element: <MenuPage />,
    },
    [AppRoutes.MYDONATION]: {
        path: RoutePath.mydonation,
        element: <MyDonationsPage />,
    },
    [AppRoutes.REGISTER]: {
        path: RoutePath.register,
        element: <RegisterPage />,
    },
    [AppRoutes.CREATEDONATION]: {
        path: RoutePath.createdonation,
        element: <CreateDonationPage />,
    },
    [AppRoutes.AUTHORIZATION]: {
        path: RoutePath.authorization,
        element: <AuthPage />,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
