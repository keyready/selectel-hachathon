import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from 'shared/UI/Stack';
import MainLogoIcon from 'shared/assets/icons/logo.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import { AppLink } from 'shared/UI/AppLink';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

// @ts-ignore
const { WebApp } = window.Telegram;

export const Navbar = memo(({ className }: NavbarProps) => {
    const closeWindow = useCallback(() => {
        WebApp.close();
    }, []);

    return (
        <HStack
            maxW
            align="center"
            justify="between"
            className={classNames(classes.Navbar, {}, [className])}
        >
            <AppLink to="//donorsearch.org">
                <Icon Svg={MainLogoIcon} className={classes.logo} />
            </AppLink>
            <Button variant="danger" className={classes.button} onClick={closeWindow}>
                Выйти
            </Button>
        </HStack>
    );
});
