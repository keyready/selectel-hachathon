import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack } from 'shared/UI/Stack';
import { Icon } from 'shared/UI/Icon/Icon';
import CartIcon from 'shared/assets/icons/cart.svg';
import ComparisonIcon from 'shared/assets/icons/comparison.svg';
import FavouriteIcon from 'shared/assets/icons/favorite.svg';
import { Button } from 'shared/UI/Button';
import { useSelector } from 'react-redux';
import { getUserData } from 'entities/User';
import { Menu } from 'shared/UI/Menu';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import classes from './Searchbar.module.scss';

interface SearchbarProps {
    className?: string;
}

export const Searchbar = memo((props: SearchbarProps) => {
    const { className } = props;
    const { t } = useTranslation('searchbar');

    const user = useSelector(getUserData);

    return (
        <HStack
            className={classNames(classes.Searchbar, {}, [className])}
            maxW
            gap="16"
            align="center"
            justify="center"
        >
            <div className={classes.logo} />
            <div className={classes.searchField} />

            <HStack gap="8">
                <Button variant="clear">
                    <Icon className={classes.icon} Svg={CartIcon} />
                </Button>

                <Button variant="clear">
                    <Icon className={classes.icon} Svg={ComparisonIcon} />
                </Button>
                <Button variant="clear">
                    <Icon className={classes.icon} Svg={FavouriteIcon} />
                </Button>
            </HStack>

            <Menu
                title={
                    <Button variant="clear">
                        {user?.avatar ? (
                            <img alt={t('avatar')} src={user.avatar} className={classes.avatar} />
                        ) : (
                            <img
                                alt={t('avatar')}
                                src="./static/webp/avatar-placeholder.webp"
                                className={classes.avatar}
                            />
                        )}
                    </Button>
                }
                items={[
                    { content: <h1>привет мир</h1> },
                    { content: <h2>Это ссылка</h2>, href: RoutePath.authorization },
                ]}
            />
        </HStack>
    );
});
