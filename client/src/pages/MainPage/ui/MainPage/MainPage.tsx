import { Page } from 'widgets/Page';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/UI/Text';
import { VStack } from 'shared/UI/Stack';
import { useCallback } from 'react';
import { Button } from 'shared/UI/Button';
import classes from './MainPage.module.scss';

// @ts-ignore
const { WebApp } = window.Telegram;

const MainPage = () => {
    const closeWindow = useCallback(() => {
        WebApp.close();
    }, []);

    return (
        <Page className={classNames(classes.MainPage, {}, [])}>
            <VStack gap="32" maxW justify="center" align="center">
                <Text title="привет" />
                <Button onClick={closeWindow}>Закрыть окно</Button>
            </VStack>
        </Page>
    );
};

export default MainPage;
