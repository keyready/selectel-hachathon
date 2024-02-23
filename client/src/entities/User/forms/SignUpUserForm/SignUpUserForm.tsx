import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'shared/UI/Input';
import { Button } from 'shared/UI/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Text } from 'shared/UI/Text';
import { getUserError } from '../../model/selectors/UserSelectors';
import { signUpUser } from '../../model/services/SignUpUser';
import classes from './SignUpUserForm.module.scss';
import { User } from '../../model/types/User';
import { UserValidationSchema } from '../../model/types/UserValidationSchema';

interface SignUpUserFormProps {
    className?: string;
}

export const SignUpUserForm = memo((props: SignUpUserFormProps) => {
    const { className } = props;
    const { t } = useTranslation('user-sign-up-form');

    const dispatch = useAppDispatch();
    const UserSignUpError = useSelector(getUserError);

    const {
        handleSubmit,
        control,
        formState: { errors },
        setError,
        reset,
    } = useForm<User>({ mode: 'onBlur', resolver: yupResolver(UserValidationSchema) });

    const handleSubmitForm = useCallback(
        async (newUser: User) => {
            const result = await dispatch(signUpUser(newUser));

            if (result.meta.requestStatus === 'fulfilled') {
                reset();
            }
        },
        [dispatch, reset],
    );

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className={classNames(classes.SignUpUserForm, {}, [className])}
        >
            <Controller
                control={control}
                name="username"
                render={({ field }) => (
                    <Input
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        placeholder={t('Введите имя пользователя')}
                        error={errors.username?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field }) => (
                    <Input
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        placeholder={t('Придумайте пароль')}
                        error={errors.password?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="firstname"
                render={({ field }) => (
                    <Input
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        placeholder={t('Введите ваше имя')}
                        error={errors.firstname?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="lastname"
                render={({ field }) => (
                    <Input
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        placeholder={t('Введите вашу фамилию')}
                        error={errors.lastname?.message}
                    />
                )}
            />

            <Button type="submit">{t('Отправить')}</Button>

            {UserSignUpError && <Text variant="error" text={UserSignUpError} />}
        </form>
    );
});
