import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import MainLogoIcon from 'shared/assets/icons/logo.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import { Button } from 'shared/UI/Button';
import { AppLink } from 'shared/UI/AppLink';
import { useTelegram } from 'shared/lib/hooks/useTelegram/useTelegram';
import classes from './Navbar.module.scss';

export interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { onClose } = useTelegram();

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
            <Button variant="danger" className={classes.button} onClick={onClose}>
                Выйти
            </Button>
        </HStack>
    );
});
