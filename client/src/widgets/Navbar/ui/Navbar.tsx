import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import { AppLink } from 'shared/UI/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainLogoIcon from 'shared/assets/icons/logo.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => (
    <HStack
        maxW
        align="center"
        justify="start"
        className={classNames(classes.Navbar, {}, [className])}
    >
        <Icon Svg={MainLogoIcon} className={classes.logo} />
    </HStack>
));
