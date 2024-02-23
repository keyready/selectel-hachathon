import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import classes from './GoodCard.module.scss';

interface GoodCardProps {
    className?: string;
}

export const GoodCard = memo((props: GoodCardProps) => {
    const { t } = useTranslation();

    const { className } = props;

    return <div className={classNames(classes.GoodCard, {}, [className])}>{t('GoodCard')}</div>;
});
