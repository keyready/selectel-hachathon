import { Page } from 'widgets/Page';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/UI/Text';
import { HStack, VStack } from 'shared/UI/Stack';
import { Button } from 'shared/UI/Button';
import { Icon } from 'shared/UI/Icon/Icon';
import MainLogoIcon from 'shared/assets/icons/logo.svg';
import TelegramIcon from 'shared/assets/icons/telegram.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useTelegram } from 'shared/lib/hooks/useTelegram/useTelegram';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import classes from './MainPage.module.scss';

const MainPage = () => {
    const { user } = useTelegram();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location?.hash) {
            const regex = /tgAuthResult=([^&]*)/;
            const match = location?.hash.match(regex);

            if (match && match[1]) {
                console.log('Значение параметра tgAuthResult:', match[1]);
                fetch('http://localhost:5000/api/sign_up/telegram', {
                    method: 'post',
                    body: atob(match[1]),
                    headers: { 'Content-Type': 'application/json' },
                }).catch((res) => {
                    switch (202) {
                        case 202: {
                            navigate(
                                `${RoutePath.register}?username=${
                                    JSON.parse(atob(match[1])).username
                                }`,
                            );
                            break;
                        }
                        default: {
                            navigate(RoutePath.menu);
                        }
                    }
                });
            } else {
                console.log('Параметр tgAuthResult не найден');
            }
        }
    }, [location.hash, navigate]);

    const handleTelegramLoginClick = useCallback(() => {
        const yourBotId: string = '7107142378';
        const authUrl = `https://oauth.telegram.org/auth/url?bot_id=${yourBotId}&origin=${encodeURIComponent(
            window.location.origin,
        )}`;
        window.location.href = authUrl;
    }, []);

    return (
        <Page className={classNames(classes.MainPage, {}, [])}>
            <VStack gap="0" maxW justify="center" align="center">
                <Text align="center" size="large" title="Приветствуем тебя," />
                <Text align="center" size="large" title={user?.first_name || 'дорогой донор!'} />
            </VStack>

            <VStack gap="8" maxW justify="center" align="center">
                <Text align="center" title="Войти с помощью" />
                <Button onClick={() => navigate(RoutePath.menu)} maxW variant="telegram">
                    <HStack maxW justify="center" gap="8">
                        <Icon Svg={TelegramIcon} className={classes.tgIcon} />
                        <Text align="center" title="Телеграм" />
                    </HStack>
                </Button>
                <Text size="large" text="или" />
                <Button onClick={handleTelegramLoginClick} maxW variant="donorSearch">
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
