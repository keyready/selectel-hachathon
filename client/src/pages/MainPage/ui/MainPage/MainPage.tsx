import { Page } from 'widgets/Page';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/UI/Text';
import { VStack } from 'shared/UI/Stack';
import { useCallback, useEffect, useMemo } from 'react';
import { Button } from 'shared/UI/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import MainLogoIcon from 'shared/assets/icons/logo.svg';
import classes from './MainPage.module.scss';

// @ts-ignore
const { WebApp, initDataUnsafe } = window.Telegram;

const MainPage = () => {
    const username = useMemo<string>(
        () => initDataUnsafe?.user?.first_name || initDataUnsafe?.user?.username || '',
        [],
    );

    return (
        <Page className={classNames(classes.MainPage, {}, [])}>
            <VStack gap="0" maxW justify="center" align="center">
                <Text align="center" size="large" title="Приветствуем тебя," />
                <Text align="center" size="large" title={username || 'дорогой донор!'} />
            </VStack>

            <VStack gap="8" maxW justify="center" align="center">
                <Text align="center" title="Войти с помощью" />
                <Button maxW variant="telegram">
                    <Text align="center" title="Телеграм" />
                </Button>
                <Text size="large" text="или" />
                <Button maxW variant="donorSearch">
                    <Icon Svg={MainLogoIcon} className={classes.logo} />
                </Button>
                <Text size="large" text="или" />
                <Button maxW>
                    <Text align="center" title="Зарегистрироваться" />
                </Button>
            </VStack>
        </Page>
    );
};

export default MainPage;
