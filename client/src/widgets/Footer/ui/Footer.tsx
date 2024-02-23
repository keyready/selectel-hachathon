import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from 'shared/UI/Stack';
import classes from './Footer.module.scss';

interface FooterProps {
    className?: string;
}

export const Footer = memo((props: FooterProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <VStack maxW className={classNames(classes.Footer, {}, [className])}>
            <h1>Это футер, кстати</h1>
        </VStack>
    );
});
