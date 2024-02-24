import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { FormEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Text } from 'shared/UI/Text';
import { useURLParams } from 'shared/url/useSearchParams/useSearchParams';
import { VStack } from 'shared/UI/Stack';
import { InputText } from 'primereact/inputtext';
import { Button } from 'shared/UI/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import toast from 'react-hot-toast';
import { Loader } from 'shared/UI/Loader';
import classes from './RegisterPage.module.scss';

interface RegisterPageProps {
    className?: string;
}

const RegisterPage = memo((props: RegisterPageProps) => {
    const { className } = props;

    const { getSearchParams } = useURLParams();

    const [registerType, setRegisterType] = useState<'new' | 'continue'>('new');
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isButtonDisabled = useMemo<boolean>(() => {
        if (registerType === 'new') {
            return !password || !email || !email.includes('@') || isLoading;
        }
        return !email || !email.includes('@') || isLoading;
    }, [email, isLoading, password, registerType]);

    useEffect(() => {
        const params = getSearchParams();
        if (params.find((param) => param.param === 'username')) {
            setRegisterType('continue');
            setUsername(params.find((param) => param.param === 'username')?.value);
        }
    }, []);

    const navigate = useNavigate();

    const handleRegisterFinish = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsLoading(true);
            fetch('http://localhost:5000/api/sign_up/telegram/email', {
                method: 'post',
                body: JSON.stringify({ email, username }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then(() => navigate(RoutePath.menu))
                .catch(() => {
                    setIsLoading(false);
                    return toast.error('Произошла ошибка, попробуйте позже');
                });
        },
        [email, navigate, username],
    );
    const handleRegisterFinishNew = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsLoading(true);
            fetch('http://localhost:5000/api/sign_up/custom', {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then(() => navigate(RoutePath.menu))
                .catch(() => {
                    setIsLoading(false);
                    return toast.error('Произошла ошибка, попробуйте позже');
                });
        },
        [email, navigate, password],
    );

    return (
        <Page className={classNames(classes.RegisterPage, {}, [className])}>
            {isLoading && (
                <div className={classes.loaderWrapper}>
                    <Loader />
                </div>
            )}

            <Text
                title={registerType === 'new' ? 'Зарегистрируйтесь' : 'Завершите регистрацию'}
                size="large"
                align="center"
            />

            {registerType === 'continue' && (
                <form onSubmit={handleRegisterFinish}>
                    <VStack
                        align="stretch"
                        gap="24"
                        maxW
                        className={classes.continueRegisterWrapper}
                    >
                        <InputText
                            placeholder="Введите почту"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            type="submit"
                            disabled={!email || !email.includes('@') || isLoading}
                        >
                            Завершить регистрацию
                        </Button>
                    </VStack>
                </form>
            )}

            {registerType === 'new' && (
                <form onSubmit={handleRegisterFinishNew}>
                    <VStack
                        align="stretch"
                        gap="24"
                        maxW
                        className={classes.continueRegisterWrapper}
                    >
                        <InputText
                            placeholder="Введите почту"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <InputText
                            placeholder="Введите пароль"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button type="submit" disabled={isButtonDisabled}>
                            Завершить регистрацию
                        </Button>
                    </VStack>
                </form>
            )}
        </Page>
    );
});

export default RegisterPage;
