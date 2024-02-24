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
import { BreadCrumbs } from 'shared/UI/BreadCrumbs';
import classes from './RegisterPage.module.scss';

interface RegisterPageProps {
    className?: string;
}

type RegisterTypes = 'new' | 'continue' | 'donor-search-login' | 'donor-search-reg';

const RegisterPage = memo((props: RegisterPageProps) => {
    const { className } = props;

    const { getParam } = useURLParams();

    const [registerType, setRegisterType] = useState<RegisterTypes>('new');
    const [username, setUsername] = useState<string>();
    const [firstName, setFirstName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isButtonDisabled = useMemo<boolean>(() => {
        if (registerType === 'new') {
            return !password || !email || !email.includes('@') || isLoading;
        }
        if (registerType === 'continue') return !email || !email.includes('@') || isLoading;
        if (registerType === 'donor-search-reg')
            return !firstName || !password || !email || !email.includes('@') || isLoading;
        return !password || !email || !email.includes('@') || isLoading;
    }, [email, firstName, isLoading, password, registerType]);

    const items = useMemo<string[]>(() => ['Авторизация'], []);

    useEffect(() => {
        if (getParam('username')) {
            setRegisterType('continue');
            setUsername(getParam('username'));
        } else if (getParam('register-type')) {
            setRegisterType(getParam('register-type') as RegisterTypes);
        }
    }, []);

    const navigate = useNavigate();

    const titleMapper = useMemo(() => {
        switch (registerType) {
            case 'new':
                return 'Зарегистрируйтесь';
            case 'continue':
                return 'Завершите регистрацию';
            case 'donor-search-login':
                return 'Войдите с учетной записью DonorSearch';
            case 'donor-search-reg':
                return 'Зарегистрируйтесь через DonorSearch';
            default:
                return 'Зарегистрируйтесь';
        }
    }, [registerType]);

    const handleRegisterFinish = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsLoading(true);
            fetch('http://31.129.48.233:5000/api/sign_up/telegram/email', {
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
            fetch('http://31.129.48.233:5000/api/sign_up/custom', {
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

    const handleRegisterFinishDonorSearch = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsLoading(true);
            fetch('http://31.129.48.233:5000/api/sign_up/donor-search', {
                method: 'post',
                body: JSON.stringify({ email, password, first_name: firstName }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then(() => navigate(RoutePath.menu))
                .catch(() => {
                    setIsLoading(false);
                    return toast.error('Произошла ошибка, попробуйте позже');
                });
        },
        [email, firstName, navigate, password],
    );

    const handleLoginFinishDonorSearch = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setIsLoading(true);
            fetch('http://31.129.48.233:5000/api/sign_in/donor-search', {
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
            <BreadCrumbs homeSource={RoutePath.main} items={items} />

            {isLoading && (
                <div className={classes.loaderWrapper}>
                    <Loader />
                </div>
            )}

            <Text title={titleMapper} size="large" align="center" />

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
                            type="email"
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
                            type="email"
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

            {registerType === 'donor-search-reg' && (
                <form onSubmit={handleRegisterFinishDonorSearch}>
                    <VStack
                        align="stretch"
                        gap="24"
                        maxW
                        className={classes.continueRegisterWrapper}
                    >
                        <InputText
                            placeholder="Введите почту"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <InputText
                            placeholder="Введите Ваше имя"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
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

                        <Button
                            type="button"
                            onClick={() => setRegisterType('donor-search-login')}
                            variant="clear"
                        >
                            <Text align="center" text="Уже есть аккаунт на DonorSearch?" />
                        </Button>
                    </VStack>
                </form>
            )}

            {registerType === 'donor-search-login' && (
                <form onSubmit={handleLoginFinishDonorSearch}>
                    <VStack
                        align="stretch"
                        gap="24"
                        maxW
                        className={classes.continueRegisterWrapper}
                    >
                        <InputText
                            placeholder="Введите почту"
                            type="email"
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

                        <Button
                            type="button"
                            onClick={() => setRegisterType('donor-search-reg')}
                            variant="clear"
                        >
                            <Text align="center" text="Еще нет учетной записи DonorSearch?" />
                        </Button>
                    </VStack>
                </form>
            )}
        </Page>
    );
});

export default RegisterPage;
